import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";
import { runLegalHold } from "./check-legal-hold.ts";

function repo(): string {
  const root = mkdtempSync(path.join(tmpdir(), "legal-hold-"));
  mkdirSync(path.join(root, "data/review"), { recursive: true });
  mkdirSync(path.join(root, "src/data/candidates"), { recursive: true });
  mkdirSync(path.join(root, "src/app"), { recursive: true });
  mkdirSync(path.join(root, "public/candidates"), { recursive: true });
  writeFileSync(path.join(root, "data/review/holds.jsonl"), "");
  writeFileSync(path.join(root, "data/review/approvals.jsonl"), "");
  writeFileSync(
    path.join(root, "data/review/asset-rights.json"),
    JSON.stringify({
      entries: [
        { path: "public/candidates/ok.webp", basis: "generated", by: "this site" },
        { path: "public/candidates/fair.webp", basis: "licensed", license: "fair use", sourceUrl: "https://example.gov/a.jpg" },
      ],
    }),
  );
  return root;
}

const cleanCandidate = {
  status: "published",
  sources: [
    {
      name: "Example Secretary of State",
      url: "https://example.gov/candidates",
      accessed: "October 27, 2026",
    },
  ],
  contests: [],
};

test("a sourced candidate file passes and an allegation is held", () => {
  const root = repo();
  writeFileSync(path.join(root, "src/data/candidates/OK.json"), `${JSON.stringify(cleanCandidate, null, 2)}\n`);
  writeFileSync(
    path.join(root, "src/app/page.tsx"),
    "export const copy = \"Not an official election website. Not affiliated with any government.\";\n",
  );
  writeFileSync(path.join(root, "public/candidates/ok.webp"), "generated");
  const pass = runLegalHold({ root, writeQueue: false });
  assert.equal(pass.exitCode, 0, JSON.stringify(pass.blocking, null, 2));

  writeFileSync(
    path.join(root, "src/app/bad.tsx"),
    "export const copy = \"Fraud charges against Jane Doe were filed on Tuesday.\";\n",
  );
  const held = runLegalHold({ root });
  assert.equal(held.exitCode, 1);
  const allegation = held.blocking.find((item) => item.rule === 1);
  assert.ok(allegation);
  assert.match(allegation.flagged, /Jane Doe/);
  const queue = readFileSync(path.join(root, "data/review/hold-queue.jsonl"), "utf8").trim().split("\n");
  const row = JSON.parse(queue[0]) as Record<string, unknown>;
  assert.equal(row.bot, "Politics Bot");
  assert.equal(row.status, "HOLD_REVIEW");
  assert.equal(row.site, "Map the Midterms");
  for (const key of ["ts", "site", "bot", "title", "flagged", "rule", "sources", "suggestion", "draft_path", "status"]) {
    assert.ok(key in row, key);
  }
  const again = runLegalHold({ root });
  const lines = readFileSync(path.join(root, "data/review/hold-queue.jsonl"), "utf8").trim().split("\n");
  assert.equal(lines.length, queue.length);
  assert.equal(again.exitCode, 1);
});

test("a manual hold blocks until the sha256 of that exact file is approved", () => {
  const root = repo();
  const rel = "src/data/candidates/HOLD.json";
  const file = path.join(root, rel);
  writeFileSync(file, `${JSON.stringify(cleanCandidate, null, 2)}\n`);
  writeFileSync(path.join(root, "src/app/page.tsx"), "export const copy = \"Routine schedule.\";\n");
  writeFileSync(
    path.join(root, "data/review/holds.jsonl"),
    `${JSON.stringify({ path: rel, status: "HOLD_REVIEW", rule: 8, title: "Complaint received", reason: "Rights complaint on file." })}\n`,
  );
  const blocked = runLegalHold({ root, writeQueue: false });
  assert.equal(blocked.exitCode, 1);
  assert.equal(blocked.blocking[0]?.rule, 8);

  const wrong = createHash("sha256").update("different bytes").digest("hex");
  writeFileSync(
    path.join(root, "data/review/approvals.jsonl"),
    `${JSON.stringify({ path: rel, sha256: wrong })}\n`,
  );
  assert.equal(runLegalHold({ root, writeQueue: false }).exitCode, 1);

  const hash = createHash("sha256").update(readFileSync(file)).digest("hex");
  writeFileSync(
    path.join(root, "data/review/approvals.jsonl"),
    `${JSON.stringify({ path: rel, sha256: hash, approver: "Joshua" })}\n`,
  );
  assert.equal(runLegalHold({ root, writeQueue: false }).exitCode, 0);

  writeFileSync(file, `${JSON.stringify({ ...cleanCandidate, note: "edited after approval" }, null, 2)}\n`);
  assert.equal(runLegalHold({ root, writeQueue: false }).exitCode, 1);
});

test("private contact details are held and placeholders are not", () => {
  const root = repo();
  writeFileSync(
    path.join(root, "src/data/candidates/PII.json"),
    `${JSON.stringify({
      ...cleanCandidate,
      note: "Call 415-555-0134 or write private.person@gmail.com at 18 Secret Lane, Austin, TX 78701.",
    })}\n`,
  );
  writeFileSync(path.join(root, "src/app/form.tsx"), 'export const placeholder = "you@example.com";\n');
  const result = runLegalHold({ root, writeQueue: false });
  assert.equal(result.exitCode, 1);
  const rules = result.blocking.filter((item) => item.rule === 2).map((item) => item.flagged);
  assert.ok(rules.some((item) => item.includes("private.person@gmail.com")));
  assert.ok(rules.some((item) => item.includes("415-555-0134")));
  assert.ok(rules.some((item) => item.includes("78701")));
  assert.equal(rules.some((item) => item.includes("example.com")), false);
});

test("charter text, disclaimers, and a fair-use credit do not slip through the wrong way", () => {
  const root = repo();
  writeFileSync(
    path.join(root, "src/app/charter.tsx"),
    [
      'export const measure = "Shall the charter provide that if he or she is convicted of a felony, the office is forfeited?";',
      'export const stripe = "Stripe collects payment details to prevent fraud."',
      'export const disclaimer = "Not an official election website. This site is not affiliated with any government."',
      'export const results = "Election-night results are not the certified results. A projection is not a certificate."',
    ].join("\n"),
  );
  writeFileSync(path.join(root, "public/candidates/fair.webp"), "borrowed");
  const result = runLegalHold({ root, writeQueue: false });
  assert.equal(
    result.blocking.some((item) => item.rule === 1 || item.rule === 7),
    false,
    JSON.stringify(result.blocking, null, 2),
  );
  assert.ok(result.blocking.some((item) => item.rule === 3 && item.draft_path.endsWith("fair.webp")));
});

test("final results and a missing election-authority source are held", () => {
  const root = repo();
  writeFileSync(
    path.join(root, "src/app/call.tsx"),
    'export const call = "These results are certified.";\n',
  );
  mkdirSync(path.join(root, "src/data"), { recursive: true });
  writeFileSync(
    path.join(root, "src/data/electionDates.ts"),
    `
      export const ELECTION_DATES = [{
        code: "ZZ",
        faqAnswer: "Tuesday.",
        facts: [{ id: "zz-register", category: "registration", label: "Voter registration", text: "October 5.", sources: [] }],
        omitted: [],
      }];
    `,
  );
  const result = runLegalHold({ root, writeQueue: false });
  assert.ok(result.blocking.some((item) => item.rule === 6 && /certified/.test(item.flagged)));
  assert.ok(result.blocking.some((item) => item.rule === 6 && item.draft_path.endsWith("electionDates.ts")));
});

test("a results file with an official source and retrieval time passes the source check", () => {
  const root = repo();
  mkdirSync(path.join(root, "public/live"), { recursive: true });
  writeFileSync(
    path.join(root, "public/live/results.json"),
    JSON.stringify({
      generatedAt: "2026-10-27T18:00:00.000Z",
      states: {
        ZZ: {
          resultsUrl: "https://example.gov/results",
          races: [{ certified: true, officialStatus: true }],
        },
      },
    }),
  );
  const result = runLegalHold({ root, paths: ["public/live/results.json"], writeQueue: false });
  assert.equal(result.exitCode, 0, JSON.stringify(result.blocking, null, 2));
});

test("generated Open Graph cards match a directory provenance entry", () => {
  const root = repo();
  mkdirSync(path.join(root, "public/og/states"), { recursive: true });
  writeFileSync(path.join(root, "public/og/states/AZ.png"), "card");
  writeFileSync(
    path.join(root, "data/review/asset-rights.json"),
    JSON.stringify({
      entries: [{ path: "public/og/**", basis: "generated", by: "scripts/write-og-images.mjs" }],
    }),
  );
  const result = runLegalHold({ root, writeQueue: false });
  assert.equal(result.exitCode, 0, JSON.stringify(result.blocking, null, 2));
});

test("the gate does not write an approval", () => {
  const root = repo();
  writeFileSync(path.join(root, "src/app/bad.tsx"), 'export const copy = "This site is the official election website.";\n');
  runLegalHold({ root, writeQueue: false });
  const approvals = readFileSync(path.join(root, "data/review/approvals.jsonl"), "utf8");
  assert.equal(approvals.trim(), "");
  const source = readFileSync(new URL("./check-legal-hold.ts", import.meta.url), "utf8");
  assert.equal(source.includes("approvals.jsonl"), true);
  assert.equal(/appendFileSync\([^)]*approvals/.test(source), false);
  assert.equal(/writeFileSync\([^)]*approvals/.test(source), false);
});
