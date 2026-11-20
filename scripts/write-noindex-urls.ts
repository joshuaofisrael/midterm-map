/**
 * Write the absolute URLs of live city and county pages that are noindex
 * under the substance rule. One URL per line, for an IndexNow submission.
 * Redirect stubs are not included.
 */
import { writeFileSync } from "node:fs";
import path from "node:path";
import { absoluteUrl } from "../src/data/site.ts";
import { collectNoindexPaths } from "../src/lib/cityThin.ts";

const urls = collectNoindexPaths()
  .map((item) => absoluteUrl(item))
  .sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
const out = path.join(process.cwd(), "src/data/places/noindex-urls.txt");
writeFileSync(out, `${urls.join("\n")}\n`);
console.log(`Wrote ${urls.length} URLs to ${out}`);
