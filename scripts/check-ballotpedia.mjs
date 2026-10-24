/**
 * Every stored Ballotpedia profile URL must be an https://ballotpedia.org/ link.
 */
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const errors = [];
const PREFIX = "https://ballotpedia.org/";

function check(value, where) {
  if (typeof value !== "string" || value.length === 0) {
    errors.push(`${where} is empty`);
    return;
  }
  if (!value.startsWith(PREFIX) || /\s/.test(value)) {
    errors.push(`${where} is not an https://ballotpedia.org/ URL`);
  }
}

function walkCandidates(node, where) {
  if (!node || typeof node !== "object") return;
  if (Array.isArray(node)) {
    node.forEach((item, index) => walkCandidates(item, `${where}[${index}]`));
    return;
  }
  if (Object.prototype.hasOwnProperty.call(node, "ballotpedia")) {
    check(node.ballotpedia, `${where}.ballotpedia`);
  }
  for (const [key, value] of Object.entries(node)) {
    if (key === "ballotpedia") continue;
    if (value && typeof value === "object") walkCandidates(value, `${where}.${key}`);
  }
}

for (const dir of ["src/data/candidates", "src/data/local"]) {
  for (const file of readdirSync(path.join(root, dir))) {
    if (!file.endsWith(".json")) continue;
    const rel = path.join(dir, file);
    walkCandidates(JSON.parse(readFileSync(path.join(root, rel), "utf8")), rel);
  }
}

const linksPath = path.join(root, "src/data/ballotpedia/race-links.json");
const links = JSON.parse(readFileSync(linksPath, "utf8"));
for (const [slug, names] of Object.entries(links)) {
  for (const [name, url] of Object.entries(names)) check(url, `race-links ${slug} ${name}`);
}

if (errors.length) {
  console.error(`ballotpedia: ${errors.length} problem(s)`);
  for (const line of errors) console.error(`  - ${line}`);
  process.exit(1);
}
console.log("ballotpedia: stored profile URLs use https://ballotpedia.org/.");
