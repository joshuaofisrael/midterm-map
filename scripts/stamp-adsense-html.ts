/**
 * After `next build`, the city/county slim, and the redirect writer, insert the
 * AdSense meta tag and loader into any exported HTML page that does not already
 * have the exact tags in <head>. That includes static city pages, county pages,
 * and spelling-variant redirect stubs. Non-documents (for example a Google
 * verification token with no head) are skipped.
 */
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import { adsAllowedForPath, isRedirectStub, stampAdsenseHead } from "../src/lib/adsense.ts";

const OUT = path.join(process.cwd(), "out");

if (!existsSync(OUT)) {
  console.error("adsense stamp: out/ is missing. Run next build first.");
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
    const rel = "/" + path.relative(OUT, full).split(path.sep).join("/");
    const sitePath = rel.endsWith("/index.html") ? rel.slice(0, -"index.html".length) : rel;
    const allow = !isRedirectStub(before) && adsAllowedForPath(sitePath);
    const after = stampAdsenseHead(before, allow);
    if (after === before) {
      skipped++;
      continue;
    }
    writeFileSync(full, after);
    updated++;
  }
}

walk(OUT);
console.log(`adsense stamp: ${updated} pages updated, ${skipped} unchanged, ${scanned} html files.`);
