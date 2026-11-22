/**
 * Join the 19 Nov 2026 Search Console audit with place pages and write:
 * - src/data/places/gsc-city-impressions.json
 * - src/data/cycle2026Merge.json
 * - seo/data/evergreen-prune-2026-11-21.csv
 *
 * Run before the app imports those JSON files, or re-run after the audit changes.
 * This process writes the JSON first, then imports the helpers so they see the new files.
 */
import { writeFileSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const auditPath = path.join(root, "seo/data/mtm-pruning-audit-2026-11-19-verified.csv");
const impressionsPath = path.join(root, "src/data/places/gsc-city-impressions.json");
const thinPath = path.join(root, "src/data/places/thin-zero-slugs.json");
const mergePath = path.join(root, "src/data/cycle2026Merge.json");
const csvPath = path.join(root, "seo/data/evergreen-prune-2026-11-21.csv");

type AuditRow = {
  url: string;
  clicks: number;
  impressions: number;
  group: string;
};

function parseCsv(text: string): AuditRow[] {
  const lines = text.split(/\n/);
  const header = lines.shift();
  if (!header?.startsWith("url,")) throw new Error("audit CSV header missing");
  const rows: AuditRow[] = [];
  for (const line of lines) {
    if (!line.trim()) continue;
    const match = line.match(/^([^,]*),([^,]*),([^,]*),[^,]*,[^,]*,([^,]*),/);
    if (!match) throw new Error(`unparsed audit row: ${line.slice(0, 180)}`);
    rows.push({
      url: match[1],
      clicks: Number(match[2] || 0),
      impressions: Number(match[3] || 0),
      group: match[6],
    });
  }
  return rows;
}

function pathnameOf(url: string): string {
  const pathName = new URL(url).pathname;
  return pathName.endsWith("/") ? pathName : `${pathName}/`;
}

const auditText = await import("node:fs").then((fs) => fs.readFileSync(auditPath, "utf8"));
const audit = parseCsv(auditText);

const byPath = new Map<string, { clicks: number; impressions: number }>();
let totalClicks = 0;
let totalImpressions = 0;
for (const row of audit) {
  totalClicks += row.clicks;
  totalImpressions += row.impressions;
  const key = pathnameOf(row.url);
  const prev = byPath.get(key) ?? { clicks: 0, impressions: 0 };
  prev.clicks += row.clicks;
  prev.impressions += row.impressions;
  byPath.set(key, prev);
}

const impressionCities: string[] = [];
for (const [pathname, stats] of byPath) {
  if (stats.impressions <= 0) continue;
  const city = pathname.match(/^\/cities\/([A-Z]{2})\/([^/]+)\/$/);
  if (!city || city[2] === "county") continue;
  impressionCities.push(`${city[1]}/${city[2]}`);
}
impressionCities.sort();
writeFileSync(impressionsPath, `${JSON.stringify(impressionCities, null, 2)}\n`);

const { placeBySlug, placeStates, placesForState } = await import("../src/data/places/load.ts");
const { placeIsStandalone } = await import("../src/lib/placeNames.ts");
const { isPrunedCity, stateCitiesPath } = await import("../src/lib/prunedPlaces.ts");
const { cityIsIndexable } = await import("../src/lib/cityIndexable.ts");
const { cycleRedirects } = await import("../src/lib/cycleRedirects.ts");
const { RACES_2026 } = await import("../src/data/winners2026.ts");
const { RACES } = await import("../src/data/races.ts");

const winnerSlugs = RACES_2026.filter((race) => (byPath.get(`/results/2026/${race.slug}/`)?.impressions ?? 0) > 0).map(
  (race) => race.slug,
);
const stateResultCodes = [...byPath.keys()]
  .filter((pathname) => /^\/results\/state\/[A-Z]{2}\/$/.test(pathname) && (byPath.get(pathname)?.impressions ?? 0) > 0)
  .map((pathname) => pathname.split("/")[3])
  .sort();
const raceShellSlugs = RACES.filter((race) => (byPath.get(`/results/${race.slug}/`)?.impressions ?? 0) > 0).map(
  (race) => race.slug,
);
const hub =
  (byPath.get("/results/")?.impressions ?? 0) > 0 || (byPath.get("/results/2026/")?.impressions ?? 0) > 0;
writeFileSync(
  mergePath,
  `${JSON.stringify({ winnerSlugs, stateResultCodes, raceShellSlugs, hub }, null, 2)}\n`,
);

type Removed = {
  url: string;
  action: "redirect" | "merge";
  target: string;
  clicks: number;
  impressions: number;
};

const removed: Removed[] = [];
const base = "https://mapthemidterms.com";

for (const row of cycleRedirects()) {
  const stats = byPath.get(row.path) ?? { clicks: 0, impressions: 0 };
  const canonical = row.target.split("#")[0];
  removed.push({
    url: `${base}${row.path}`,
    action: stats.impressions > 0 ? "merge" : "redirect",
    target: `${base}${canonical}`,
    clicks: stats.clicks,
    impressions: stats.impressions,
  });
}

let thin = 0;
const thinSlugs: string[] = [];
const seenPlaces = new Set<string>();
for (const state of placeStates()) {
  for (const place of placesForState(state.code)) {
    if (!placeIsStandalone(place) || isPrunedCity(state.code, place.slug)) continue;
    if (cityIsIndexable(state.code, place)) continue;
    const pathname = `/cities/${state.code}/${place.slug}/`;
    if (seenPlaces.has(pathname)) continue;
    seenPlaces.add(pathname);
    thinSlugs.push(`${state.code}/${place.slug}`);
    const stats = byPath.get(pathname) ?? { clicks: 0, impressions: 0 };
    if (stats.impressions > 0) {
      throw new Error(`${pathname} has impressions and was classified as a thin redirect`);
    }
    thin += 1;
    removed.push({
      url: `${base}${pathname}`,
      action: "redirect",
      target: `${base}${stateCitiesPath(state.code)}`,
      clicks: stats.clicks,
      impressions: stats.impressions,
    });
  }
}

thinSlugs.sort();
writeFileSync(thinPath, `${JSON.stringify(thinSlugs, null, 0)}\n`);

removed.sort((a, b) => b.clicks - a.clicks || b.impressions - a.impressions || a.url.localeCompare(b.url));

const lines = ["url,action,target,clicks,impressions"];
for (const row of removed) {
  lines.push(`${row.url},${row.action},${row.target},${row.clicks},${row.impressions}`);
}
writeFileSync(csvPath, `${lines.join("\n")}\n`);

const redirectClicks = removed.reduce((sum, row) => sum + row.clicks, 0);
const redirectImpressions = removed.reduce((sum, row) => sum + row.impressions, 0);
const merged = removed.filter((row) => row.action === "merge");
const redirected = removed.filter((row) => row.action === "redirect");
const orphanCities = [...byPath.keys()].filter((pathname) => {
  const city = pathname.match(/^\/cities\/([A-Z]{2})\/([^/]+)\/$/);
  if (!city || city[2] === "county") return false;
  return !placeBySlug(city[1], city[2]);
});

const summary = {
  auditRows: audit.length,
  totalClicks,
  totalImpressions,
  removedPages: removed.length,
  redirectPages: redirected.length,
  mergePages: merged.length,
  redirectClicks,
  redirectImpressions,
  clickShare: redirectClicks / totalClicks,
  thinZeroCities: thin,
  impressionCities: impressionCities.length,
  winnerMerges: winnerSlugs.length,
  stateResultMerges: stateResultCodes.length,
  shellMerges: raceShellSlugs.length,
  hub,
  orphanCityUrls: orphanCities.length,
  sample: removed.filter((row) => row.clicks > 0).slice(0, 8),
};
console.log(JSON.stringify(summary, null, 2));
