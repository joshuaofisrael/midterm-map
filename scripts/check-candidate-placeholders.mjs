/**
 * Fail the build when a state, ballot, or city page still carries a
 * candidate-list placeholder instead of the November 3, 2026 names.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const files = [
  "src/data/states.ts",
  "src/data/statesMore.ts",
  "src/data/ballotCycle.ts",
  "src/data/ballotCycleMore.ts",
  "src/data/electionDates.ts",
  "src/data/ballots.ts",
  "src/data/stateFaqs.ts",
  "src/data/ballotFaqs.ts",
  "src/components/StateCandidates.tsx",
  "src/components/BallotCandidates.tsx",
  "src/components/CityCandidates.tsx",
  "src/components/CountyCandidates.tsx",
  "src/components/CandidateContestList.tsx",
];

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = statSync(full);
    if (stat.isDirectory()) walk(full);
    else if (/\.(tsx|ts)$/.test(name)) files.push(path.relative(root, full));
  }
}

walk(path.join(root, "src/app/(site)/states"));
walk(path.join(root, "src/app/(site)/ballot"));
walk(path.join(root, "src/app/cities"));

const patterns = [
  /not retrieved/i,
  /does not list federal or statewide/i,
  /does not name candidate offices/i,
  /this page does not list federal/i,
];

const errors = [];
for (const rel of files) {
  const text = readFileSync(path.join(root, rel), "utf8");
  for (const pattern of patterns) {
    if (pattern.test(text)) errors.push(`${rel} matches ${pattern}`);
  }
}

const required = [
  ..."AK AL AR AZ CA CO CT DC DE FL GA HI IA ID IL IN KS KY LA MA MD ME MI MN MO MS MT NC ND NE NH NJ NM NV NY OH OK OR PA RI SC SD TN TX UT VA VT WA WI WV WY".split(" "),
];
for (const code of required) {
  const data = JSON.parse(readFileSync(path.join(root, "src/data/candidates", `${code}.json`), "utf8"));
  if (data.status !== "published") errors.push(`${code} candidate file is ${data.status}`);
  if (!Array.isArray(data.contests) || data.contests.length === 0) errors.push(`${code} candidate file has no contests`);
  for (const contest of data.contests ?? []) {
    if (!contest.source?.url) errors.push(`${code} contest ${contest.office} has no source URL`);
    if (!Array.isArray(contest.candidates) || contest.candidates.length === 0) {
      errors.push(`${code} contest ${contest.office} has no candidates`);
    }
  }
}

if (errors.length) {
  console.error(`candidate placeholders: ${errors.length} problem(s)`);
  for (const line of errors) console.error(`  - ${line}`);
  process.exit(1);
}
console.log(`candidate placeholders: ${required.length} states have published contests and a source URL; placeholder phrases are absent.`);
