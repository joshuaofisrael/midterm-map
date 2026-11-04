import { localFile } from "@/data/local/load";
import type { PlaceRecord } from "@/data/places/load";
import visitedSince1028 from "@/data/places/visited-since-2026-10-28.json";

/**
 * 4 Nov 2026 AdSense cleanup: place pages with at least one Cloudflare RUM
 * pageview from 28 Oct to 4 Nov 2026 stay indexable. Every other templated
 * place page is noindex, left out of the sitemap, and carries no ad code.
 */
const VISITED = new Set<string>(visitedSince1028 as string[]);
export function cityWasVisited(code: string, place: PlaceRecord): boolean {
  return VISITED.has(`${code}/${place.slug}`);
}

/**
 * AdSense / quality policy: a templated census-place page is "thin" when it has no
 * place- or county-level local contest content and a population under this floor.
 * Thin pages are noindex, left out of the sitemap, and never load ad code.
 */
export const CITY_INDEX_MIN_POP = 10000;

/** True when the place page has its own local-contest content (not only templated text). */
export function cityHasLocalContent(code: string, place: PlaceRecord): boolean {
  const data = localFile(code);
  if (!data) return false;
  const placeLocal = data.local?.[place.geoid] ?? [];
  const placeMeta = data.localPlace?.[place.geoid];
  const readCounties = place.counties.filter((county) => data.countyRead?.[county]);
  const unpublishedCounties = place.counties.filter((county) => data.countyUnpublished?.[county]);
  const countyContests = readCounties.flatMap((county) => data.localByCounty?.[county] ?? []);
  return (
    placeLocal.length > 0 ||
    Boolean(placeMeta?.empty || placeMeta?.note) ||
    countyContests.length > 0 ||
    unpublishedCounties.length > 0 ||
    readCounties.some((county) => {
      const listing = data.countyRead?.[county];
      return Boolean(listing?.note || listing?.empty || (data.localByCounty?.[county] ?? []).length);
    }));
}

export function cityIsThin(code: string, place: PlaceRecord): boolean {
  // Owner rule 4 Nov 2026: index only pages people actually visited since 28 Oct.
  return !cityWasVisited(code, place);
}
