import { localFile } from "@/data/local/load";
import type { PlaceRecord } from "@/data/places/load";
import visited from "@/data/places/visited-2026-10-28-to-11-09.json";

/**
 * City-page index rule (Joshua, relayed 9 Nov 2026: noindex only truly thin pages).
 *
 * A Census place page stays indexable, in the sitemap and eligible for ads when either:
 *  1. it had at least one non-bot Cloudflare RUM pageview from 28 Oct to 9 Nov 2026
 *     (the 4 Nov list from PR #128, plus pages first visited 4–9 Nov), or
 *  2. it lists at least one city-level local contest of its own (unique local race data).
 * Every other place page is templated boilerplate shared with its county neighbours:
 * noindex, left out of the sitemap, no ad code.
 */
const VISITED = new Set<string>(visited as string[]);
export function cityWasVisited(code: string, place: PlaceRecord): boolean {
  return VISITED.has(`${code}/${place.slug}`);
}

/** True when the place page lists contests for this place itself (not only shared county contests). */
export function cityHasOwnContests(code: string, place: PlaceRecord): boolean {
  return (localFile(code)?.local?.[place.geoid] ?? []).length > 0;
}


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
  return !cityWasVisited(code, place) && !cityHasOwnContests(code, place);
}
