import fs from "node:fs";
import path from "node:path";
import { placeBySlug, placesForState, type PlaceRecord } from "@/data/places/load";

export type NearbyPlace = {
  lat: number;
  lon: number;
  slugs: string[];
};

const nearbyCache = new Map<string, Record<string, NearbyPlace>>();
const countyCache = new Map<string, Map<string, PlaceRecord[]>>();

function nearbyFile(code: string): Record<string, NearbyPlace> {
  const upper = code.toUpperCase();
  const cached = nearbyCache.get(upper);
  if (cached) return cached;
  const file = path.join(process.cwd(), "src/data/places/nearby", `${upper}.json`);
  if (!fs.existsSync(file)) {
    nearbyCache.set(upper, {});
    return {};
  }
  const raw = JSON.parse(fs.readFileSync(file, "utf8")) as Record<string, [number, number, ...string[]]>;
  const parsed: Record<string, NearbyPlace> = {};
  for (const [geoid, row] of Object.entries(raw)) {
    const [lat, lon, ...slugs] = row;
    parsed[geoid] = { lat, lon, slugs };
  }
  nearbyCache.set(upper, parsed);
  return parsed;
}

export function nearbyFor(code: string, geoid: string): NearbyPlace | undefined {
  return nearbyFile(code)[geoid];
}

function countiesFor(code: string): Map<string, PlaceRecord[]> {
  const upper = code.toUpperCase();
  const cached = countyCache.get(upper);
  if (cached) return cached;
  const index = new Map<string, PlaceRecord[]>();
  for (const place of placesForState(upper)) {
    for (const county of place.counties) {
      const list = index.get(county);
      if (list) list.push(place);
      else index.set(county, [place]);
    }
  }
  countyCache.set(upper, index);
  return index;
}

/** Other places that share a Census county, largest population first. */
export function countyNeighbors(code: string, place: PlaceRecord, limit = 5): PlaceRecord[] {
  const seen = new Set<string>();
  const pool: PlaceRecord[] = [];
  const index = countiesFor(code);
  for (const county of place.counties) {
    for (const other of index.get(county) ?? []) {
      if (other.geoid === place.geoid || seen.has(other.geoid)) continue;
      seen.add(other.geoid);
      pool.push(other);
    }
  }
  pool.sort((a, b) => (b.pop ?? -1) - (a.pop ?? -1) || a.slug.localeCompare(b.slug));
  return pool.slice(0, limit);
}

export function placesForSlugs(code: string, slugs: string[]): PlaceRecord[] {
  const places: PlaceRecord[] = [];
  for (const slug of slugs) {
    const place = placeBySlug(code, slug);
    if (place) places.push(place);
  }
  return places;
}
