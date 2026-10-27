import { localFile } from "@/data/local/load";
import type { PlaceRecord } from "@/data/places/load";

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
  if (cityHasLocalContent(code, place)) return false;
  return (place.pop ?? 0) < CITY_INDEX_MIN_POP;
}
