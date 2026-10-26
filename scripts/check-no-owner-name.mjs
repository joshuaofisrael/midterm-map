/**
 * Fail the build if the operating company's name or street address appears in
 * the export outside the legal pages. Candidate given names and the Texas
 * place named Joshua are not the company name and are not flagged.
 *
 * Contact pages use the brand name; they may mention the company but are not
 * required to.
 * Allowed pages for the company name and mailing address: /terms, /disclaimer,
 * /privacy, /copyright, /advertising, /contact (including /contact/thanks).
 *
 * The copyright line is allowed only on terms, disclaimer, privacy, copyright,
 * and advertising. A © line anywhere else, including the site footer, Census
 * city pages, and county pages, fails the build.
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
const COPYRIGHT_DIRS = new Set([
  "terms",
  "disclaimer",
  "privacy",
  "copyright",
  "advertising",
]);
const COPYRIGHT_NOTICE =
  "© 2026 Joshua Israel Ventures LLC. All rights reserved. Map the Midterms is a trade name of Joshua Israel Ventures LLC, a Florida limited liability company.";
const COPYRIGHT_MARKS = ["©", "&copy;", "&#169;", "&#xA9;", "&#xa9;", "All rights reserved"];
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
];
const ADDRESS_PAGES = [
  "terms/index.html",
  "disclaimer/index.html",
  "privacy/index.html",
  "copyright/index.html",
  "advertising/index.html",
];
const COPYRIGHT_PAGES = [
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

function topDir(rel) {
  return rel.split(path.sep)[0];
}

function isAllowed(rel) {
  return ALLOWED_DIRS.has(topDir(rel));
}

function noticeVariants() {
  return [
    COPYRIGHT_NOTICE,
    COPYRIGHT_NOTICE.replace("©", "&copy;"),
    COPYRIGHT_NOTICE.replace("©", "&#169;"),
    COPYRIGHT_NOTICE.replace("©", "&#xA9;"),
    COPYRIGHT_NOTICE.replace("©", "&#xa9;"),
  ];
}

function includesNotice(text) {
  return noticeVariants().some((variant) => text.includes(variant));
}

function withoutNotice(text) {
  let stripped = text;
  for (const variant of noticeVariants()) stripped = stripped.split(variant).join("");
  return stripped;
}

/** core-js license string shipped inside Next's polyfill chunk. It is not a page line. */
function stripThirdParty(text) {
  return text.replace(/© 2014-\d{4} Denis Pushkarev \(zloirock\.ru\)/g, "");
}

const files = [];
walk(OUT, files);

const leaks = [];
const copyrightLeaks = [];
for (const file of files) {
  const rel = path.relative(OUT, file);
  const text = fs.readFileSync(file, "utf8");
  const scanned = stripThirdParty(COPYRIGHT_DIRS.has(topDir(rel)) ? withoutNotice(text) : text);
  const marks = COPYRIGHT_MARKS.filter((mark) => scanned.includes(mark));
  if (marks.length > 0) copyrightLeaks.push({ rel, hits: marks });
  if (isAllowed(rel)) continue;
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
const missingNotice = COPYRIGHT_PAGES.filter((rel) => {
  const file = path.join(OUT, rel);
  return !fs.existsSync(file) || !includesNotice(fs.readFileSync(file, "utf8"));
});

if (
  leaks.length > 0 ||
  copyrightLeaks.length > 0 ||
  missingName.length > 0 ||
  missingAddress.length > 0 ||
  missingNotice.length > 0
) {
  console.error("owner name check failed");
  for (const leak of leaks.slice(0, 30)) {
    console.error(`  ${leak.rel}: ${leak.hits.join(", ")}`);
  }
  if (leaks.length > 30) console.error(`  ... ${leaks.length - 30} more name leaks`);
  for (const leak of copyrightLeaks.slice(0, 30)) {
    console.error(`  copyright line on ${leak.rel}: ${leak.hits.join(", ")}`);
  }
  if (copyrightLeaks.length > 30) console.error(`  ... ${copyrightLeaks.length - 30} more copyright lines`);
  if (missingName.length > 0) {
    console.error(`  legal pages missing the company name: ${missingName.join(", ")}`);
  }
  if (missingAddress.length > 0) {
    console.error(`  legal pages missing the mailing address: ${missingAddress.join(", ")}`);
  }
  if (missingNotice.length > 0) {
    console.error(`  legal pages missing the copyright line: ${missingNotice.join(", ")}`);
  }
  process.exit(1);
}

console.log(
  `export: owner name and mailing address only on legal pages; copyright line only on terms, privacy, disclaimer, copyright, and advertising (${files.length} text files checked)`,
);
