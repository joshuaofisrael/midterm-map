/**
 * City pages stay in the sitemap when they are not the 3,061 already-redirected
 * places and they are not a thin template with zero Search Console impressions.
 * A thin page with any impressions stays indexable.
 */
import impressions from "@/data/places/gsc-city-impressions.json";
import { placeStates, placesForState, type PlaceRecord } from "@/data/places/load";
import { cityIsThin } from "@/lib/cityThin";
import { placeIsStandalone } from "@/lib/placeNames";
import { isPrunedCity, linkedPlaceHref } from "@/lib/prunedPlaces";

export { placeSearchHref, thinZeroRedirectTarget } from "@/lib/thinRedirect";

const CITY_IMPRESSIONS = new Set<string>(impressions as string[]);

export function cityHasImpressions(code: string, slug: string): boolean {
  return CITY_IMPRESSIONS.has(`${code.toUpperCase()}/${slug}`);
}

/** True when this standalone place page is kept, indexed, and listed in the sitemap. */
export function cityIsIndexable(code: string, place: PlaceRecord): boolean {
  if (!placeIsStandalone(place)) return false;
  const upper = code.toUpperCase();
  if (isPrunedCity(upper, place.slug)) return false;
  if (!cityIsThin(upper, place)) return true;
  return cityHasImpressions(upper, place.slug);
}

/** Index and related-place links skip redirect stubs. */
export function livePlaceHref(code: string, place: PlaceRecord): string | null {
  if (placeIsStandalone(place) && !cityIsIndexable(code, place)) return null;
  return linkedPlaceHref(code, place);
}

export function countIndexableCities(): number {
  let count = 0;
  for (const state of placeStates()) {
    for (const place of placesForState(state.code)) {
      if (cityIsIndexable(state.code, place)) count += 1;
    }
  }
  return count;
}
