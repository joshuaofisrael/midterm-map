import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { BALLOT_ZIP_BOOT_SCRIPT } from "./ballotZip.ts";
import { CONSENT_HEAD_BLOCK, consentHeadProblems, insertConsentHead } from "./consentHead.ts";

const SAMPLE = `<!DOCTYPE html><html lang="en"><head>\n<meta charset="utf-8">\n<title>S</title>\n</head><body></body></html>`;

test("consent default is first after charset and idempotent", () => {
  const once = insertConsentHead(SAMPLE, "index.html");
  assert.equal(insertConsentHead(once, "index.html"), once);
  assert.ok(once.indexOf(CONSENT_HEAD_BLOCK) > once.indexOf("charset"));
  const head = once.match(/<head[^>]*>([\s\S]*?)<\/head>/i)![1];
  assert.deepEqual(consentHeadProblems(head, once, false), []);
});

test("ballot pages boot the ZIP strip first", () => {
  const out = insertConsentHead(SAMPLE, "ballot/OH/index.html");
  assert.ok(out.indexOf(BALLOT_ZIP_BOOT_SCRIPT) < out.indexOf(CONSENT_HEAD_BLOCK));
  const head = out.match(/<head[^>]*>([\s\S]*?)<\/head>/i)![1];
  assert.deepEqual(consentHeadProblems(head, out, true), []);
});

test("Ezoic code is flagged", () => {
  const bad = insertConsentHead(SAMPLE).replace("</head>", '<script src="//www.ezojs.com/ezoic/sa.min.js"></script></head>');
  const head = bad.match(/<head[^>]*>([\s\S]*?)<\/head>/i)![1];
  assert.ok(consentHeadProblems(head, bad).some((p) => p.includes("third-party")));
});

test("consent.js loads GA only after a grant", () => {
  const js = readFileSync("public/consent.js", "utf8");
  assert.match(js, /mtm-analytics-consent/);
  assert.doesNotMatch(js, /adsbygoogle/);
});
