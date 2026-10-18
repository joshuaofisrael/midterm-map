import fs from "node:fs";
import path from "node:path";
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
