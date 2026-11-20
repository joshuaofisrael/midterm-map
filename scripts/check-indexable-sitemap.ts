/**
 * After the static export, the sitemap lists only indexable URLs.
 * Every sitemap URL has an HTML page with no noindex robots tag.
 * Every URL in src/data/places/noindex-urls.txt is a live city or county
 * page with noindex, follow, and is absent from the sitemap.
 * Indexable city and county pages stay in the sitemap.
 */
import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { ADS_TXT_LINE } from "../src/lib/adsense.ts";
import { absoluteUrl, SITE } from "../src/data/site.ts";
import { collectIndexablePlacePaths, collectNoindexPaths } from "../src/lib/cityThin.ts";

const OUT = path.join(process.cwd(), "out");
const NOINDEX_FILE = path.join(process.cwd(), "src/data/places/noindex-urls.txt");
const errors: string[] = [];

type Parsed = {
  errors: string[];
  files: { file: string; kind: "index" | "urlset"; locs: string[] }[];
};

function parseSitemaps(): Parsed {
  const py = `
import json, pathlib, xml.etree.ElementTree as ET
NS = "{http://www.sitemaps.org/schemas/sitemap/0.9}"
root = pathlib.Path("out")
errors = []
files = []
paths = [root / "sitemap.xml"]
sitemap_dir = root / "sitemap"
if sitemap_dir.is_dir():
    paths += sorted(sitemap_dir.glob("*.xml"))
for path in paths:
    try:
        tree = ET.parse(path)
    except ET.ParseError as exc:
        errors.append(f"{path}: {exc}")
        continue
    tag = tree.getroot().tag
    locs = [el.text.strip() for el in tree.iter(NS + "loc") if el.text and el.text.strip()]
    if tag == NS + "sitemapindex":
        kind = "index"
    elif tag == NS + "urlset":
        kind = "urlset"
    else:
        errors.append(f"{path}: unexpected root {tag}")
        continue
    files.append({"file": str(path), "kind": kind, "locs": locs})
print(json.dumps({"errors": errors, "files": files}))
`;
  const result = spawnSync("python3", ["-c", py], { encoding: "utf8" });
  if (result.status !== 0) {
    throw new Error(result.stderr || "sitemap XML parse failed");
  }
  return JSON.parse(result.stdout) as Parsed;
}

function htmlPathForUrl(loc: string): string | null {
  let url: URL;
  try {
    url = new URL(loc);
  } catch {
    return null;
  }
  if (url.origin !== SITE.url) return null;
  if (url.pathname === "/") return path.join(OUT, "index.html");
  const rel = url.pathname.replace(/^\//, "").replace(/\/$/, "");
  return path.join(OUT, rel, "index.html");
}

function isRedirect(html: string): boolean {
  return /http-equiv\s*=\s*["']refresh["']/i.test(html);
}

function isNoindex(html: string): boolean {
  const tags = html.match(/<meta\b[^>]*>/gi) ?? [];
  return tags.some((tag) => /name\s*=\s*["']robots["']/i.test(tag) && /content\s*=\s*["'][^"']*noindex/i.test(tag));
}

function hasFollow(html: string): boolean {
  const tags = html.match(/<meta\b[^>]*>/gi) ?? [];
  return tags.some(
    (tag) =>
      /name\s*=\s*["']robots["']/i.test(tag) &&
      /content\s*=\s*["']noindex,\s*follow["']/i.test(tag),
  );
}

const parsed = parseSitemaps();
errors.push(...parsed.errors);

const pageLocs: string[] = [];
for (const file of parsed.files) {
  if (file.kind === "index") continue;
  pageLocs.push(...file.locs);
}
const sitemapPages = new Set<string>();
for (const loc of pageLocs) {
  if (sitemapPages.has(loc)) errors.push(`duplicate sitemap URL ${loc}`);
  sitemapPages.add(loc);
  if (!loc.endsWith("/")) errors.push(`sitemap URL has no trailing slash: ${loc}`);
}

for (const loc of sitemapPages) {
  const htmlPath = htmlPathForUrl(loc);
  if (!htmlPath || !existsSync(htmlPath)) {
    errors.push(`sitemap URL has no page: ${loc}`);
    continue;
  }
  const html = readFileSync(htmlPath, "utf8");
  if (isRedirect(html)) errors.push(`sitemap URL is a redirect: ${loc}`);
  if (isNoindex(html)) errors.push(`sitemap URL is noindex: ${loc}`);
}

const expectedNoindex = collectNoindexPaths()
  .map((item) => absoluteUrl(item))
  .sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
const listed = existsSync(NOINDEX_FILE) ? readFileSync(NOINDEX_FILE, "utf8") : "";
if (listed !== `${expectedNoindex.join("\n")}\n`) {
  errors.push("src/data/places/noindex-urls.txt does not match the substance rule");
}

let noindexPages = 0;
for (const loc of expectedNoindex) {
  if (sitemapPages.has(loc)) errors.push(`noindex URL still in sitemap: ${loc}`);
  const htmlPath = htmlPathForUrl(loc);
  if (!htmlPath || !existsSync(htmlPath)) {
    errors.push(`noindex URL has no page: ${loc}`);
    continue;
  }
  const html = readFileSync(htmlPath, "utf8");
  if (isRedirect(html)) errors.push(`noindex URL is a redirect: ${loc}`);
  if (!isNoindex(html)) errors.push(`noindex URL is indexable: ${loc}`);
  if (!hasFollow(html)) errors.push(`noindex URL robots tag is not noindex, follow: ${loc}`);
  noindexPages += 1;
}

let indexablePlaces = 0;
for (const item of collectIndexablePlacePaths()) {
  const loc = absoluteUrl(item);
  if (!sitemapPages.has(loc)) errors.push(`indexable place missing from sitemap: ${loc}`);
  const htmlPath = htmlPathForUrl(loc);
  if (!htmlPath || !existsSync(htmlPath)) {
    errors.push(`indexable place has no page: ${loc}`);
    continue;
  }
  const html = readFileSync(htmlPath, "utf8");
  if (isRedirect(html) || isNoindex(html)) errors.push(`indexable place is not indexable: ${loc}`);
  indexablePlaces += 1;
}

function assertTrackers(rel: string) {
  const htmlPath = path.join(OUT, rel);
  if (!existsSync(htmlPath)) {
    errors.push(`tracker sample missing: ${rel}`);
    return;
  }
  const html = readFileSync(htmlPath, "utf8");
  if (!html.includes("G-Q9FB3RS751")) errors.push(`${rel} lost GA4`);
  if (!html.includes("/consent.js")) errors.push(`${rel} lost consent.js`);
  if (!html.includes("static.cloudflareinsights.com")) errors.push(`${rel} lost Cloudflare Web Analytics`);
  if (!html.includes("google-adsense-account")) errors.push(`${rel} lost the AdSense account tag`);
}

const noindexCity = expectedNoindex.find((loc) => !loc.includes("/county/"));
const noindexCounty = expectedNoindex.find((loc) => loc.includes("/county/"));
const indexableCity = collectIndexablePlacePaths().find((item) => !item.includes("/county/"));
const indexableCounty = collectIndexablePlacePaths().find((item) => item.includes("/county/"));
for (const loc of [noindexCity, noindexCounty, indexableCity ? absoluteUrl(indexableCity) : undefined, indexableCounty ? absoluteUrl(indexableCounty) : undefined]) {
  if (!loc) {
    errors.push("missing a tracker sample URL");
    continue;
  }
  const htmlPath = htmlPathForUrl(loc);
  if (!htmlPath) continue;
  assertTrackers(path.relative(OUT, htmlPath));
}
assertTrackers("index.html");

const home = readFileSync(path.join(OUT, "index.html"), "utf8");
if (!home.includes("adsbygoogle.js")) errors.push("homepage lost the AdSense loader");

const adsPath = path.join(OUT, "ads.txt");
if (!existsSync(adsPath)) errors.push("ads.txt is missing from out/");
else if (readFileSync(adsPath, "utf8").replace(/\r\n/g, "\n").trim() !== ADS_TXT_LINE) {
  errors.push("ads.txt changed");
}

if (errors.length) {
  console.error(`indexable sitemap: ${errors.length} problem(s)`);
  for (const line of errors.slice(0, 40)) console.error(`  - ${line}`);
  process.exit(1);
}

console.log(
  `indexable sitemap: ${sitemapPages.size} sitemap URLs are indexable; ${noindexPages} noindex city/county URLs are absent; ${indexablePlaces} substance city/county pages stay listed.`,
);
