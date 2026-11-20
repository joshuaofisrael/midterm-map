import { localFile, type LocalContest } from "@/data/local/load";
import { countiesForState, placeStates, placesForState, type PlaceRecord } from "@/data/places/load";
import { placeIsStandalone } from "@/lib/placeNames";
import { isPrunedCity, isPrunedCounty } from "@/lib/prunedPlaces";

/**
 * Index rule for census place pages and county pages.
 *
 * A page stays indexable only when the stored local-election file has a
 * contest for that place or that county. A contest qualifies when it has an
 * office or question line, a named candidate, or an incumbent line. That is
 * the jurisdiction's own ballot content.
 *
 * These do not qualify. The page is noindex, follow, left out of the sitemap,
 * and kept live:
 *  - county contests and county notes repeated on every place in the county
 *  - U.S. House and statewide candidate lists (those live on the race and ballot pages)
 *  - census population, GEOID, and district-name rows
 *  - rotated intro sentences built from those shared facts
 *  - a source citation with no contest
 *  - a note that a contest exists but its wording or names were not copied
 *  - an empty-list line or a "no official listing" line
 *
 * Search traffic is not an input. Redirect stubs from the zero-impression
 * prune stay redirects and are not decided here.
 */
export function contestHasSubstance(contest: LocalContest): boolean {
  if ((contest.office ?? "").trim()) return true;
  if ((contest.incumbentLine ?? "").trim()) return true;
  return (contest.candidates ?? []).some((candidate) => (candidate.name ?? "").trim());
}

/** True when the place page lists at least one contest stored for this place itself. */
export function cityHasOwnContests(code: string, place: PlaceRecord): boolean {
  const contests = localFile(code)?.local?.[place.geoid] ?? [];
  return contests.some(contestHasSubstance);
}

/** True when the county page lists at least one contest stored for this county itself. */
export function countyHasOwnContests(code: string, countyName: string): boolean {
  const contests = localFile(code)?.localByCounty?.[countyName] ?? [];
  return contests.some(contestHasSubstance);
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
  return !cityHasOwnContests(code, place);
}

export function countyIsThin(code: string, countyName: string): boolean {
  return !countyHasOwnContests(code, countyName);
}

/**
 * Live city and county pages that are noindex under the substance rule.
 * Paths are site-relative and have no trailing slash. Redirect stubs are omitted.
 */
export function collectNoindexPaths(): string[] {
  const paths: string[] = [];
  for (const state of placeStates()) {
    for (const county of countiesForState(state.code)) {
      if (isPrunedCounty(state.code, county.slug)) continue;
      if (!countyIsThin(state.code, county.name)) continue;
      paths.push(`/cities/${state.code}/county/${county.slug}`);
    }
    for (const place of placesForState(state.code)) {
      if (!placeIsStandalone(place) || isPrunedCity(state.code, place.slug)) continue;
      if (!cityIsThin(state.code, place)) continue;
      paths.push(`/cities/${state.code}/${place.slug}`);
    }
  }
  return paths;
}

/** Live city and county pages that stay indexable. Redirect stubs are omitted. */
export function collectIndexablePlacePaths(): string[] {
  const paths: string[] = [];
  for (const state of placeStates()) {
    for (const county of countiesForState(state.code)) {
      if (isPrunedCounty(state.code, county.slug) || countyIsThin(state.code, county.name)) continue;
      paths.push(`/cities/${state.code}/county/${county.slug}`);
    }
    for (const place of placesForState(state.code)) {
      if (!placeIsStandalone(place) || isPrunedCity(state.code, place.slug) || cityIsThin(state.code, place)) continue;
      paths.push(`/cities/${state.code}/${place.slug}`);
    }
  }
  return paths;
}
