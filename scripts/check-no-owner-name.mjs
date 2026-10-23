/**
 * Fail the build if the operating company's name or street address appears in
 * the export outside the legal pages. Candidate given names and the Texas
 * place named Joshua are not the company name and are not flagged.
 *
 * Allowed pages: /terms, /disclaimer, /privacy, /copyright, /advertising, /contact
 * (including /contact/thanks).
 */
import fs from "node:fs";
import path from "node:path";

const OUT = "out";
const NAME_NEEDLES = ["Joshua Israel Ventures", "Joshua Israel", "JI Ventures"];
const ADDRESS_NEEDLE = "5640 W Maple Rd";
const NEEDLES = [...NAME_NEEDLES, ADDRESS_NEEDLE];
const ALLOWED_DIRS = new Set([
  "terms",
  "disclaimer",
  "privacy",
  "copyright",
  "advertising",
  "contact",
]);
const TEXT_EXT = new Set([
  ".html",
  ".htm",
  ".txt",
  ".js",
  ".mjs",
  ".css",
  ".json",
  ".xml",
  ".webmanifest",
  ".map",
]);
const NAME_PAGES = [
  "terms/index.html",
  "disclaimer/index.html",
  "privacy/index.html",
  "copyright/index.html",
  "advertising/index.html",
  "contact/index.html",
];
const ADDRESS_PAGES = [
  "terms/index.html",
  "disclaimer/index.html",
  "privacy/index.html",
  "copyright/index.html",
  "advertising/index.html",
];

function walk(dir, files) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, files);
      continue;
    }
    if (TEXT_EXT.has(path.extname(entry.name))) files.push(full);
  }
}

function isAllowed(rel) {
  return ALLOWED_DIRS.has(rel.split(path.sep)[0]);
}

const files = [];
walk(OUT, files);

const leaks = [];
for (const file of files) {
  const rel = path.relative(OUT, file);
  if (isAllowed(rel)) continue;
  const text = fs.readFileSync(file, "utf8");
  const hits = NEEDLES.filter((needle) => text.includes(needle));
  if (hits.length > 0) leaks.push({ rel, hits });
}

const missingName = NAME_PAGES.filter((rel) => {
  const file = path.join(OUT, rel);
  return !fs.existsSync(file) || !fs.readFileSync(file, "utf8").includes("Joshua Israel Ventures LLC");
});
const missingAddress = ADDRESS_PAGES.filter((rel) => {
  const file = path.join(OUT, rel);
  return !fs.existsSync(file) || !fs.readFileSync(file, "utf8").includes(ADDRESS_NEEDLE);
});

if (leaks.length > 0 || missingName.length > 0 || missingAddress.length > 0) {
  console.error("owner name check failed");
  for (const leak of leaks.slice(0, 30)) {
    console.error(`  ${leak.rel}: ${leak.hits.join(", ")}`);
  }
  if (leaks.length > 30) console.error(`  ... ${leaks.length - 30} more files`);
  if (missingName.length > 0) {
    console.error(`  legal pages missing the company name: ${missingName.join(", ")}`);
  }
  if (missingAddress.length > 0) {
    console.error(`  legal pages missing the mailing address: ${missingAddress.join(", ")}`);
  }
  process.exit(1);
}

console.log(
  `export: owner name and mailing address only on legal pages (${files.length} text files checked)`,
);
