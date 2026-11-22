/**
 * After the static export, confirm the zero-impression prune:
 * redirect stubs, sitemap membership, and no links to those URLs.
 */
import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { countiesForState, placeStates, placesForState } from "../src/data/places/load.ts";
import { SITE, absoluteUrl } from "../src/data/site.ts";
import { cityIsIndexable, thinZeroRedirectTarget } from "../src/lib/cityIndexable.ts";
import { cityIsThin } from "../src/lib/cityThin.ts";
import { cycleRedirectPaths } from "../src/lib/cycleRedirects.ts";
import { placeIsStandalone } from "../src/lib/placeNames.ts";
import {
  PRUNED_PAGE_COUNT,
  isPrunedCity,
  isPrunedCounty,
  stateCitiesPath,
} from "../src/lib/prunedPlaces.ts";

const OUT = path.join(process.cwd(), "out");
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
  const result = spawnSync("python3", ["-c", py], { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
  if (result.error) throw new Error(result.error.message);
  if (result.status !== 0) {
    throw new Error(result.stderr || "sitemap XML parse failed");
  }
  return JSON.parse(result.stdout) as Parsed;
}

function pathOf(loc: string): string {
  const url = new URL(loc);
  const pathname = url.pathname.endsWith("/") ? url.pathname : `${url.pathname}/`;
  return pathname;
}

const prunedPaths = new Set<string>();
for (const state of placeStates()) {
  for (const county of countiesForState(state.code)) {
    if (isPrunedCounty(state.code, county.slug)) prunedPaths.add(`/cities/${state.code}/county/${county.slug}/`);
  }
  for (const place of placesForState(state.code)) {
    if (isPrunedCity(state.code, place.slug)) prunedPaths.add(`/cities/${state.code}/${place.slug}/`);
  }
}
if (prunedPaths.size !== PRUNED_PAGE_COUNT) {
  errors.push(`prune path set is ${prunedPaths.size}, list is ${PRUNED_PAGE_COUNT}`);
}

let oldStateUrls = 0;
let newStateUrls = 0;
let addedThin = 0;
const expectedByFile = new Map<string, Set<string>>();
const cyclePaths = cycleRedirectPaths();
for (const state of placeStates()) {
  const expected = new Set<string>();
  expected.add(absoluteUrl(`/cities/${state.code}`));
  oldStateUrls += 1;
  newStateUrls += 1;
  for (const county of countiesForState(state.code)) {
    oldStateUrls += 1;
    if (isPrunedCounty(state.code, county.slug)) continue;
    newStateUrls += 1;
    expected.add(absoluteUrl(`/cities/${state.code}/county/${county.slug}`));
  }
  for (const place of placesForState(state.code)) {
    if (!placeIsStandalone(place)) continue;
    if (!cityIsThin(state.code, place)) {
      oldStateUrls += 1;
      if (isPrunedCity(state.code, place.slug)) continue;
    } else if (!cityIsIndexable(state.code, place)) {
      continue;
    } else {
      addedThin += 1;
    }
    newStateUrls += 1;
    expected.add(absoluteUrl(`/cities/${state.code}/${place.slug}`));
  }
  expectedByFile.set(`sitemap/${state.code}.xml`, expected);
}

const parsed = parseSitemaps();
errors.push(...parsed.errors);

const pageLocs: string[] = [];
let coreCount = 0;
for (const file of parsed.files) {
  if (file.kind === "index") continue;
  const rel = path.relative(OUT, file.file).split(path.sep).join("/");
  pageLocs.push(...file.locs);
  if (rel === "sitemap/core.xml") {
    coreCount = file.locs.length;
    for (const loc of file.locs) {
      const pathname = pathOf(loc);
      if (prunedPaths.has(pathname) || pathname === "/live/" || cyclePaths.has(pathname)) {
        errors.push(`core sitemap lists ${loc}`);
      }
    }
    continue;
  }
  const expected = expectedByFile.get(rel);
  if (!expected) {
    errors.push(`unexpected sitemap file ${rel}`);
    continue;
  }
  const actual = new Set(file.locs);
  if (actual.size !== file.locs.length) errors.push(`${rel} has duplicate URLs`);
  for (const loc of actual) {
    if (!expected.has(loc)) errors.push(`${rel} has extra URL ${loc}`);
  }
  for (const loc of expected) {
    if (!actual.has(loc)) errors.push(`${rel} is missing ${loc}`);
  }
  expectedByFile.delete(rel);
}
for (const rel of expectedByFile.keys()) errors.push(`sitemap file not written: ${rel}`);

const removed = oldStateUrls - (newStateUrls - addedThin);
if (removed !== PRUNED_PAGE_COUNT) errors.push(`removed ${removed} state URLs, expected ${PRUNED_PAGE_COUNT}`);
if (newStateUrls !== oldStateUrls - removed + addedThin) {
  errors.push("state sitemap is not the previous set minus pruned URLs plus impression cities");
}

const seen = new Set<string>();
for (const loc of pageLocs) {
  if (seen.has(loc)) errors.push(`duplicate sitemap URL ${loc}`);
  seen.add(loc);
  const pathname = pathOf(loc);
  if (!loc.endsWith("/")) errors.push(`sitemap URL has no trailing slash: ${loc}`);
  if (prunedPaths.has(pathname)) errors.push(`pruned URL still in sitemap: ${loc}`);
  if (cyclePaths.has(pathname)) errors.push(`cycle redirect still in sitemap: ${loc}`);
  if (thinZeroRedirectTarget(pathname)) errors.push(`thin redirect still in sitemap: ${loc}`);
}

let stubs = 0;
for (const pathname of prunedPaths) {
  const htmlPath = path.join(OUT, pathname, "index.html");
  if (!existsSync(htmlPath)) {
    errors.push(`missing redirect stub for ${pathname}`);
    continue;
  }
  const html = readFileSync(htmlPath, "utf8");
  const target = stateCitiesPath(pathname.split("/")[2] ?? "");
  if (!html.includes(`http-equiv="refresh" content="0; url=${target}"`)) {
    errors.push(`${pathname} stub does not refresh to ${target}`);
  }
  if (!html.includes(`rel="canonical" href="${absoluteUrl(target)}"`)) {
    errors.push(`${pathname} stub canonical is not ${absoluteUrl(target)}`);
  }
  if (!/noindex/i.test(html)) errors.push(`${pathname} stub is not noindex`);
  stubs += 1;
}

const hrefRe = /(?:href|url)=["']([^"']+)["']/gi;
let linked = 0;
function noteLink(file: string, raw: string) {
  let pathname = raw;
  if (pathname.startsWith(SITE.url)) pathname = pathname.slice(SITE.url.length);
  pathname = pathname.split("#")[0].split("?")[0];
  if (!pathname.endsWith("/")) pathname += "/";
  if (cyclePaths.has(pathname) || thinZeroRedirectTarget(pathname)) {
    linked += 1;
    if (linked <= 20) errors.push(`${file} links to redirect ${pathname}`);
    return;
  }
  if (!pathname.startsWith("/cities/")) return;
  if (!prunedPaths.has(pathname)) return;
  linked += 1;
  if (linked <= 20) errors.push(`${file} links to pruned ${pathname}`);
}
function walkHtml(dir: string) {
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) {
      if (name !== "_next") walkHtml(full);
      continue;
    }
    if (!name.endsWith(".html")) continue;
    const html = readFileSync(full, "utf8");
    const rel = path.relative(OUT, full);
    hrefRe.lastIndex = 0;
    let match: RegExpExecArray | null;
    while ((match = hrefRe.exec(html))) noteLink(rel, match[1]);
  }
}
walkHtml(OUT);

const searchDir = path.join(OUT, "place-search");
if (existsSync(searchDir)) {
  for (const name of readdirSync(searchDir)) {
    if (!name.endsWith(".json")) continue;
    const rows = JSON.parse(readFileSync(path.join(searchDir, name), "utf8")) as string[][];
    for (const row of rows) {
      const target = row[5] ?? "";
      const normalized = target.split("#")[0].endsWith("/") ? target.split("#")[0] : `${target.split("#")[0]}/`;
      if (prunedPaths.has(normalized) || thinZeroRedirectTarget(normalized)) {
        errors.push(`place-search/${name} points at redirect ${target}`);
      }
    }
  }
}

function assertKept(rel: string) {
  const htmlPath = path.join(OUT, rel);
  if (!existsSync(htmlPath)) {
    errors.push(`kept page missing: ${rel}`);
    return;
  }
  const html = readFileSync(htmlPath, "utf8");
  if (/http-equiv=["']refresh["']/i.test(html)) errors.push(`${rel} was turned into a redirect`);
  if (!html.includes("G-Q9FB3RS751")) errors.push(`${rel} lost the GA4 measurement id`);
  if (!html.includes("static.cloudflareinsights.com")) errors.push(`${rel} lost Cloudflare Web Analytics`);
  if (!html.includes("/consent.js")) errors.push(`${rel} lost consent.js`);
}

assertKept("index.html");
assertKept("cities/NY/new-york-city/index.html");
assertKept("cities/NY/index.html");

const sitemapPages = new Set(pageLocs.map(pathOf));
let indexableMissing = 0;
let externalCanonical = 0;
function walkCanonical(dir: string) {
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) {
      if (name !== "_next") walkCanonical(full);
      continue;
    }
    if (!name.endsWith(".html")) continue;
    const html = readFileSync(full, "utf8");
    if (!html.includes("<html")) continue;
    if (/http-equiv=["']refresh["']/i.test(html)) continue;
    const robots = html.match(/<meta\b[^>]*name=["']robots["'][^>]*>/gi) ?? [];
    if (robots.some((tag) => /noindex/i.test(tag))) continue;
    const canonicalTag = html.match(/<link[^>]*rel=["']canonical["'][^>]*>/i);
    const href = canonicalTag?.[0].match(/href=["']([^"']+)["']/i)?.[1];
    if (!href) {
      errors.push(`${path.relative(OUT, full)} is indexable and has no canonical`);
      continue;
    }
    let url: URL;
    try {
      url = new URL(href);
    } catch {
      errors.push(`${path.relative(OUT, full)} has an invalid canonical`);
      continue;
    }
    if (url.origin !== SITE.url) {
      externalCanonical += 1;
      continue;
    }
    const pathname = url.pathname.endsWith("/") ? url.pathname : `${url.pathname}/`;
    if (!sitemapPages.has(pathname)) {
      indexableMissing += 1;
      if (indexableMissing <= 30) errors.push(`indexable canonical missing from sitemap: ${pathname}`);
    }
  }
}
walkCanonical(OUT);

if (errors.length) {
  console.error(`gsc prune: ${errors.length} problem(s)`);
  for (const line of errors.slice(0, 40)) console.error(`  - ${line}`);
  process.exit(1);
}

console.log(
  `gsc prune: redirected ${stubs}; sitemap removed ${removed}; sitemap added ${addedThin}; sitemap URLs ${pageLocs.length} (core ${coreCount}, state ${newStateUrls}); indexable pages missing from sitemap ${indexableMissing}; external canonicals skipped ${externalCanonical}.`,
);
