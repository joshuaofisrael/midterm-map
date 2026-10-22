import fs from "node:fs";
import path from "node:path";
import {
  countySlug,
  placeDisplayName,
  placeIsStandalone,
  type TitleKind,
} from "@/lib/placeNames";
import manifestJson from "./manifest.json";

export type CountySource = "grf2026" | "place2020";

export type PlaceRecord = {
  geoid: string;
  slug: string;
  name: string;
  pop: number | null;
  counties: string[];
  countySource: CountySource;
  districts?: string[];
};

export type PlaceState = {
  code: string;
  name: string;
  count: number;
};

type Manifest = {
  accessed: string;
  placeCount: number;
  withPopulation: number;
  withoutPopulation: number;
  countiesFromGrf2026: number;
  countiesFromPlace2020: number;
  states: PlaceState[];
};

const manifest = manifestJson as Manifest;

const byCode = new Map(manifest.states.map((state) => [state.code, state]));
const placesCache = new Map<string, PlaceRecord[]>();
const slugCache = new Map<string, Map<string, PlaceRecord>>();
const sharedNameCache = new Map<string, Set<string>>();
const titleKindCache = new Map<string, Map<string, TitleKind>>();

export type CountyBucket = {
  name: string;
  slug: string;
  places: PlaceRecord[];
};

const countyCache = new Map<string, CountyBucket[]>();

function readPlaces(code: string): PlaceRecord[] {
  const cached = placesCache.get(code);
  if (cached) return cached;
  const file = path.join(process.cwd(), "src/data/places", `${code}.json`);
  const places = JSON.parse(fs.readFileSync(file, "utf8")) as PlaceRecord[];
  placesCache.set(code, places);
  return places;
}

export function placeManifest(): Manifest {
  return manifest;
}

export function placeStates(): PlaceState[] {
  return manifest.states;
}

export function placeState(code: string): PlaceState | undefined {
  return byCode.get(code.toUpperCase());
}

export function placesForState(code: string): PlaceRecord[] {
  const upper = code.toUpperCase();
  if (!byCode.has(upper)) return [];
  return readPlaces(upper);
}

export function placeBySlug(code: string, slug: string): PlaceRecord | undefined {
  const upper = code.toUpperCase();
  if (!byCode.has(upper)) return undefined;
  let index = slugCache.get(upper);
  if (!index) {
    index = new Map();
    for (const place of readPlaces(upper)) index.set(place.slug, place);
    slugCache.set(upper, index);
  }
  return index.get(slug);
}

export function countiesForState(code: string): CountyBucket[] {
  const upper = code.toUpperCase();
  const cached = countyCache.get(upper);
  if (cached) return cached;
  const grouped = new Map<string, PlaceRecord[]>();
  for (const place of placesForState(upper)) {
    for (const county of place.counties) {
      const list = grouped.get(county);
      if (list) list.push(place);
      else grouped.set(county, [place]);
    }
  }
  const buckets: CountyBucket[] = [...grouped.entries()].map(([name, places]) => ({
    name,
    slug: countySlug(name),
    places: [...places].sort((a, b) => {
      const byName = placeDisplayName(a.name).localeCompare(placeDisplayName(b.name), "en");
      return byName === 0 ? a.name.localeCompare(b.name, "en") || a.geoid.localeCompare(b.geoid) : byName;
    }),
  }));
  buckets.sort((a, b) => a.name.localeCompare(b.name, "en"));
  countyCache.set(upper, buckets);
  return buckets;
}

export function countyBySlug(code: string, slug: string): CountyBucket | undefined {
  return countiesForState(code).find((county) => county.slug === slug);
}

/**
 * How much of the place name the title needs so it does not match another
 * standalone page in the same state.
 */
export function placeTitleKind(code: string, place: PlaceRecord): TitleKind {
  const upper = code.toUpperCase();
  let kinds = titleKindCache.get(upper);
  if (!kinds) {
    kinds = new Map();
    const standalone = placesForState(upper).filter(placeIsStandalone);
    const byDisplay = new Map<string, PlaceRecord[]>();
    for (const item of standalone) {
      const display = placeDisplayName(item.name);
      const list = byDisplay.get(display);
      if (list) list.push(item);
      else byDisplay.set(display, [item]);
    }
    for (const item of standalone) {
      const same = byDisplay.get(placeDisplayName(item.name)) ?? [item];
      if (same.length === 1) {
        kinds.set(item.geoid, "unique");
        continue;
      }
      const county = item.counties[0] ?? "";
      const sameCounty = same.filter((other) => (other.counties[0] ?? "") === county);
      kinds.set(item.geoid, sameCounty.length === 1 ? "county" : "class");
    }
    titleKindCache.set(upper, kinds);
  }
  return kinds.get(place.geoid) ?? "unique";
}

/** Census names that appear more than once in the same jurisdiction. */
export function sharedPlaceNames(code: string): Set<string> {
  const upper = code.toUpperCase();
  const cached = sharedNameCache.get(upper);
  if (cached) return cached;
  const counts = new Map<string, number>();
  for (const place of placesForState(upper)) {
    counts.set(place.name, (counts.get(place.name) ?? 0) + 1);
  }
  const shared = new Set<string>();
  for (const [name, count] of counts) {
    if (count > 1) shared.add(name);
  }
  sharedNameCache.set(upper, shared);
  return shared;
}
