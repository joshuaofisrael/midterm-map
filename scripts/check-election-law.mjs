/**
 * Build-time election-law guard for Map the Midterms.
 *
 * US law has no general ban on publishing polls or early results, so the rules
 * enforced here are the site's own election-night rules (docs/COMPLIANCE.md):
 *  1. src/data/pollClose.ts lists all 51 jurisdictions, each closing on the
 *     night of 3 November 2026 (between 23:00 UTC on 3 Nov and 07:00 UTC on 4 Nov).
 *  2. The committed fallback public/live/results.json carries no returns
 *     for a state whose last polls have not closed at build time.
 *  3. No poll row is an exit poll.
 */
import { readFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const errors = [];
const now = Date.now();

const pollClose = readFileSync(path.join(root, "src/data/pollClose.ts"), "utf8");
const closes = new Map();
for (const m of pollClose.matchAll(/code:\s*"([A-Z]{2})"[\s\S]*?allPollsClosedAt:\s*"([^"]+)"/g)) closes.set(m[1], m[2]);
if (closes.size !== 51) errors.push(`pollClose.ts lists ${closes.size} jurisdictions; expected 51`);
const lo = Date.parse("2026-11-03T23:00:00Z");
const hi = Date.parse("2026-11-04T07:00:00Z");
for (const [code, iso] of closes) {
  const t = Date.parse(iso);
  if (Number.isNaN(t) || t < lo || t > hi) errors.push(`${code}: allPollsClosedAt ${iso} is outside election night`);
}

const results = JSON.parse(readFileSync(path.join(root, "public/live/results.json"), "utf8"));
for (const chamber of ["house", "senate"]) {
  const counts = results.chambers?.[chamber];
  if (!counts || counts.dem !== null || counts.rep !== null || counts.other !== null) {
    errors.push(`${chamber} needle counts in results.json must stay null until an official file states them`);
  }
}
for (const [code, state] of Object.entries(results.states ?? {})) {
  const close = Date.parse(closes.get(code) ?? "");
  const races = Array.isArray(state.races) ? state.races : [];
  if (races.length > 0 && !(now >= close)) errors.push(`${code}: results.json has returns before polls close (${closes.get(code)})`);
}

const polls = readFileSync(path.join(root, "src/data/polls.ts"), "utf8");
if (/exit[\s-]?poll/i.test(polls)) errors.push("polls.ts mentions an exit poll; the site publishes none");

if (errors.length) {
  console.error(`election-law: ${errors.length} problem(s)`);
  for (const line of errors) console.error(`  - ${line}`);
  process.exit(1);
}
console.log(`election-law: ${closes.size} poll-close times on election night; results.json has no early returns.`);
