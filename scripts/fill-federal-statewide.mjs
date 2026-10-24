/**
 * Append November 3, 2026 general-election contests that the stored official
 * list does not already contain. Names and parties come from Ballotpedia's
 * 2026 state elections pages (those lists cite official filings). Existing
 * official contests are left in place, in their original order, so a running
 * link pass can still match them by index.
 *
 * Usage: node scripts/fill-federal-statewide.mjs [--write]
 */
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import path from "node:path";
import { classifyBallotpediaOffice, isGeneralBallot, parseCandidateRows, electionsTitle } from "./ballotpedia-lib.mjs";

const root = process.cwd();
const write = process.argv.includes("--write");
const ACCESSED = "October 24, 2026";

const pollClose = readFileSync(path.join(root, "src/data/pollClose.ts"), "utf8");
const stateNames = new Map();
for (const match of pollClose.matchAll(/code:\s*"([A-Z]{2})"[\s\S]*?name:\s*"([^"]+)"/g)) {
  stateNames.set(match[1], match[2]);
}

const cache = JSON.parse(readFileSync(path.join(root, "src/data/ballotpedia/cache.json"), "utf8"));
const extraDir = "/tmp/bp-pages";
const extraFiles = {
  AR: "Ar.html",
  RI: "Rh.html",
  WV: "We.html",
  DC: "Di.html",
};

function rowsFor(code) {
  const cached = cache.states?.[code]?.candidates;
  if (Array.isArray(cached) && cached.length > 0) return cached;
  const file = extraFiles[code];
  if (!file) return cached ?? [];
  const htmlPath = path.join(extraDir, file);
  if (!existsSync(htmlPath)) return cached ?? [];
  return parseCandidateRows(readFileSync(htmlPath, "utf8"));
}

function pageFor(code) {
  if (cache.states?.[code]?.page) return cache.states[code].page;
  const name = stateNames.get(code);
  if (!name) return "";
  return `https://ballotpedia.org/${electionsTitle(name)}`;
}

function targetOf(office) {
  const s = String(office).toLowerCase();
  if (/county|parish|borough|\bcity\b|mayor|sheriff|constable|school board|select board|planning board|water district|precinct|\bward\b/.test(s)) {
    return null;
  }
  if (/court of appeals|district court|circuit court|superior court|chancery|probate|municipal court/.test(s)) return null;
  if (/governor'?s council/.test(s)) return null;
  const stateLeg = /house of representatives|state senate|state house|house of delegates|state assembly|state representative|state senator/.test(s);
  const federal = /united states|\bu\.s\b|\bu\. ?s\.?/.test(s);
  if (stateLeg && !federal) return null;

  const cls = classifyBallotpediaOffice(office);
  if (cls.kind === "legislature") return null;
  if (cls.kind === "senate") {
    const special = /special|unexpired/.test(s) ? "special" : "regular";
    return { kind: "senate", district: null, role: `senate:${special}` };
  }
  if (cls.kind === "house") {
    if (!cls.district) return null;
    return { kind: "house", district: cls.district, role: `house:${cls.district}` };
  }
  if (cls.kind === "governor") return { kind: "governor", district: null, role: "governor" };

  if (/lieutenant governor|\blt\.?\s*governor\b/.test(s)) return { kind: "statewide", district: null, role: "ltgov" };
  if (/attorney general/.test(s)) return { kind: "statewide", district: null, role: "ag" };
  if (/secretary of (the )?state/.test(s)) return { kind: "statewide", district: null, role: "sos" };
  if (/\btreasurer\b/.test(s) && !/county/.test(s)) return { kind: "statewide", district: null, role: "treasurer" };
  if (/\bauditor\b/.test(s)) return { kind: "statewide", district: null, role: "auditor" };
  if (/comptroller|\bcontroller\b/.test(s)) return { kind: "statewide", district: null, role: "comptroller" };
  if (/superintendent/.test(s)) return { kind: "statewide", district: null, role: "superintendent" };
  if (/agriculture/.test(s)) return { kind: "statewide", district: null, role: "agriculture" };
  if (/insurance commissioner|commissioner of insurance/.test(s)) return { kind: "statewide", district: null, role: "insurance" };
  if (/labor commissioner|commissioner of labor/.test(s)) return { kind: "statewide", district: null, role: "labor" };
  if (/land commissioner/.test(s)) return { kind: "statewide", district: null, role: "land" };
  if (/railroad commission/.test(s) && !/district\s+\d+/.test(s)) return { kind: "statewide", district: null, role: "railroad" };
  if (/corporation commission/.test(s)) return { kind: "statewide", district: null, role: "corporation" };
  if (/mine inspector/.test(s)) return { kind: "statewide", district: null, role: "mine" };
  if (/public utilities/.test(s) && !/district\s+\d+/.test(s)) return { kind: "statewide", district: null, role: "puc" };
  if (/public service comm/.test(s) && !/district\s+\d+/.test(s)) return { kind: "statewide", district: null, role: "psc" };
  if (/tax commissioner/.test(s)) return { kind: "statewide", district: null, role: "tax" };
  if (/supreme court/.test(s) && !/judicial district/.test(s)) {
    return { kind: "statewide", district: null, role: `supreme:${s.replace(/\s+/g, " ").trim()}` };
  }
  if (/court of criminal appeals/.test(s)) return { kind: "statewide", district: null, role: `cca:${s.replace(/\s+/g, " ").trim()}` };
  return null;
}

function existingRole(contest) {
  if (contest.kind === "senate") {
    const special = /special|unexpired/i.test(contest.office) ? "special" : "regular";
    return `senate:${special}`;
  }
  if (contest.kind === "house") {
    const district = String(contest.district ?? "");
    const match = district.match(/\d+/);
    const number = /at large/i.test(district) ? "0" : match ? String(parseInt(match[0], 10)) : "";
    return number ? `house:${number}` : "";
  }
  if (contest.kind === "governor" || /lieutenant|lt\.?\s*gov/i.test(contest.office) && /governor/i.test(contest.office) && contest.kind === "governor") {
    return "governor";
  }
  return targetOf(contest.office)?.role ?? "";
}

function covered(contests, role) {
  if (role === "ltgov" && contests.some((contest) => /lieutenant|lt\.?\s*gov/i.test(contest.office))) return true;
  if (role.startsWith("supreme:") && contests.some((contest) => /supreme court/i.test(contest.office))) return true;
  if (role.startsWith("cca:") && contests.some((contest) => /court of criminal appeals/i.test(contest.office))) return true;
  return contests.some((contest) => existingRole(contest) === role);
}

const report = [];

for (const file of readdirSync(path.join(root, "src/data/candidates")).filter((name) => name.endsWith(".json")).sort()) {
  const code = file.slice(0, -5);
  if (code === "PR") {
    report.push({ code, added: 0, people: 0, offices: [], reason: "Puerto Rico is outside the 50 states and the District of Columbia." });
    continue;
  }
  const rel = path.join(root, "src/data/candidates", file);
  const data = JSON.parse(readFileSync(rel, "utf8"));
  const rows = rowsFor(code).filter((row) => isGeneralBallot(row.status) && row.name);
  const groups = new Map();
  for (const row of rows) {
    const target = targetOf(row.office);
    if (!target) continue;
    if (covered(data.contests, target.role)) continue;
    if (!groups.has(target.role)) {
      groups.set(target.role, { ...target, office: row.office, sourceUrl: "", candidates: [] });
    }
    const group = groups.get(target.role);
    if (!group.sourceUrl && row.officeUrl && String(row.officeUrl).startsWith("https://ballotpedia.org/")) {
      group.sourceUrl = row.officeUrl;
    }
    const key = `${row.name}\n${row.party ?? ""}`;
    if (group.candidates.some((candidate) => `${candidate.name}\n${candidate.party}` === key)) continue;
    group.candidates.push({ name: row.name, party: row.party || "" });
  }
  const added = [];
  for (const group of groups.values()) {
    if (group.candidates.length === 0) continue;
    const sourceUrl = group.sourceUrl || pageFor(code);
    data.contests.push({
      office: group.office,
      kind: group.kind,
      district: group.kind === "house" ? group.district : null,
      candidates: group.candidates,
      source: {
        name: `Ballotpedia, ${group.office}, 2026 general-election candidate list`,
        url: sourceUrl,
        accessed: ACCESSED,
      },
    });
    added.push({ office: group.office, kind: group.kind, n: group.candidates.length });
  }
  if (added.length > 0) {
    data.status = "published";
    const page = pageFor(code);
    if (page && !(data.sources ?? []).some((source) => source.url === page)) {
      data.sources.push({
        name: `Ballotpedia — ${stateNames.get(code) ?? code} elections, 2026`,
        url: page,
        accessed: ACCESSED,
      });
    }
    if (write) writeFileSync(rel, `${JSON.stringify(data, null, 2)}\n`);
  }
  const people = (data.contests ?? []).reduce((sum, contest) => sum + contest.candidates.length, 0);
  const reason = rows.length === 0
    ? data.contests.length > 0
      ? "Ballotpedia’s 2026 page did not include a parseable general-election table. The stored official candidate list is unchanged."
      : "Ballotpedia’s 2026 elections page had no general-election candidate rows in the stored fetch."
    : added.length === 0
      ? "Stored list already covers the federal and statewide offices found on that page."
      : "";
  report.push({
    code,
    status: data.status,
    contests: data.contests.length,
    people,
    added: added.length,
    addedPeople: added.reduce((sum, row) => sum + row.n, 0),
    offices: added.map((row) => `${row.office} (${row.n})`),
    bpRows: rows.length,
    reason,
  });
}

const lines = ["# November 3, 2026 candidate coverage", "", `Mode: ${write ? "wrote" : "dry-run"}`, ""];
for (const row of report) {
  lines.push(`## ${row.code}`);
  lines.push("");
  lines.push(`- Contests: ${row.contests ?? 0}`);
  lines.push(`- Candidates: ${row.people ?? 0}`);
  lines.push(`- Added contests: ${row.added}`);
  if (row.offices?.length) lines.push(`- Added offices: ${row.offices.join("; ")}`);
  if (row.reason) lines.push(`- Note: ${row.reason}`);
  lines.push("");
}
if (write) {
  for (const [code, fileName] of Object.entries(extraFiles)) {
    const htmlPath = path.join(extraDir, fileName);
    if (!existsSync(htmlPath)) continue;
    const parsed = parseCandidateRows(readFileSync(htmlPath, "utf8"));
    if (parsed.length === 0) continue;
    const page = pageFor(code);
    cache.states[code] = {
      page,
      status: 200,
      finalUrl: page,
      fetched: new Date().toISOString(),
      candidates: parsed,
      counties: cache.states[code]?.counties ?? [],
    };
  }
  writeFileSync(path.join(root, "src/data/ballotpedia/cache.json"), JSON.stringify(cache));
  writeFileSync(path.join(root, "docs/candidate-coverage.md"), lines.join("\n"));
}
console.log(lines.join("\n"));
