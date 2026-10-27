/**
 * Tiny HTML redirects for spelling-variant slugs. Not listed in the sitemap.
 * A variant that matches two places in one state is skipped.
 */
import fs from "node:fs";
import path from "node:path";
import { ADSENSE_META_TAG } from "../src/lib/adsense.ts";
import { placeDisplayName, placeTargetPath, redirectSlugTargets, type VariantPlace } from "../src/lib/placeNames.ts";

const root = process.cwd();
const outDir = path.join(root, "out");
const base = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://mapthemidterms.com").replace(/\/+$/, "");

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function redirectHtml(targetPath: string, label: string, canonicalUrl: string): string {
  const href = escapeHtml(targetPath);
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(label)}</title>
<link rel="canonical" href="${escapeHtml(canonicalUrl)}">
<meta name="robots" content="noindex, follow">
<meta http-equiv="refresh" content="0; url=${href}">
${ADSENSE_META_TAG}
</head>
<body>
<p><a href="${href}">${escapeHtml(label)}</a></p>
<script>location.replace(${JSON.stringify(targetPath)});</script>
</body>
</html>
`;
}

let redirects = 0;
let bytes = 0;
let farmington = "";

for (const file of fs.readdirSync(path.join(root, "src/data/places"))) {
  if (!/^[A-Z]{2}\.json$/.test(file)) continue;
  const code = file.slice(0, 2);
  const places = JSON.parse(fs.readFileSync(path.join(root, "src/data/places", file), "utf8")) as VariantPlace[];
  const targets = redirectSlugTargets(code, places);
  const names = new Map(places.map((place) => [place.slug, place.name]));
  for (const [slug, target] of targets) {
    const dir = path.join(outDir, "cities", code, slug);
    const htmlPath = path.join(dir, "index.html");
    if (slug === "county") continue;
    if (fs.existsSync(htmlPath)) {
      throw new Error(`Redirect ${code}/${slug} would overwrite an existing page`);
    }
    const canonicalPath = target.split("#")[0];
    const owner = places.find((place) => placeTargetPath(code, place) === target);
    const label = `${placeDisplayName(owner?.name ?? names.get(slug) ?? slug)}, ${code}`;
    const html = redirectHtml(target, label, `${base}${canonicalPath.endsWith("/") ? canonicalPath : `${canonicalPath}/`}`);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(htmlPath, html);
    redirects += 1;
    bytes += Buffer.byteLength(html);
    if (code === "MI" && slug === "farmington-hills") farmington = target;
  }
}

if (farmington !== "/cities/MI/farmington-hills-city/") {
  throw new Error(`Farmington Hills redirect target was ${farmington || "missing"}`);
}

function walkBytes(dir: string): number {
  let total = 0;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) total += walkBytes(full);
    else total += fs.statSync(full).size;
  }
  return total;
}

const outBytes = walkBytes(outDir);
console.log(
  `Redirects: ${redirects} (${(bytes / (1024 * 1024)).toFixed(1)} MiB). out/ is ${(outBytes / (1024 * 1024)).toFixed(1)} MiB.`,
);
if (outBytes >= 1024 * 1024 * 1024) {
  throw new Error("out/ is at least 1 GiB");
}
