/**
 * After the AdSense stamp, insert the Consent Mode default at the start of <head>
 * on every exported HTML document. Does not move the AdSense meta tag or loader,
 * and does not add ad placeholders.
 */
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import { insertConsentHead } from "../src/lib/consentHead.ts";

const OUT = path.join(process.cwd(), "out");

if (!existsSync(OUT)) {
  console.error("consent head stamp: out/ is missing. Run next build first.");
  process.exit(1);
}

let scanned = 0;
let updated = 0;
let skipped = 0;

function walk(dir: string) {
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) {
      if (name !== "_next") walk(full);
      continue;
    }
    if (!name.endsWith(".html")) continue;
    scanned++;
    const before = readFileSync(full, "utf8");
    const rel = path.relative(OUT, full).split(path.sep).join("/");
    const after = insertConsentHead(before, rel);
    if (after === before) {
      skipped++;
      continue;
    }
    writeFileSync(full, after);
    updated++;
  }
}

walk(OUT);
console.log(`consent head stamp: ${updated} pages updated, ${skipped} unchanged, ${scanned} html files.`);
