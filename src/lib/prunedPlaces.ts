/**
 * Confirmed zero-impression place and county pages from the 28 Sep–17 Nov 2026
 * Search Console audit. Each one redirects to that state's /cities/XX/ index.
 * Kept pages and the refresh list are not in this file.
 */
import pruneFile from "@/data/places/gsc-prune-2026-11-19.json";
import { countyPath, countySlug, placeIsStandalone, placeTargetPath, type VariantPlace } from "@/lib/placeNames";

type PruneFile = {
  cities: Record<string, string[]>;
  counties: Record<string, string[]>;
};

const file = pruneFile as PruneFile;

function pair(code: string, slug: string): string {
  return `${code.toUpperCase()}/${slug}`;
}

const cityKeys = new Set<string>();
const countyKeys = new Set<string>();

for (const [code, slugs] of Object.entries(file.cities)) {
  for (const slug of slugs) cityKeys.add(pair(code, slug));
}
for (const [code, slugs] of Object.entries(file.counties)) {
  for (const slug of slugs) countyKeys.add(pair(code, slug));
}

export const PRUNED_CITY_COUNT = cityKeys.size;
export const PRUNED_COUNTY_COUNT = countyKeys.size;
export const PRUNED_PAGE_COUNT = cityKeys.size + countyKeys.size;

export function isPrunedCity(code: string, slug: string): boolean {
  return cityKeys.has(pair(code, slug));
}

export function isPrunedCounty(code: string, slug: string): boolean {
  return countyKeys.has(pair(code, slug));
}

/** State cities index. Pruned place and county URLs redirect here. */
export function stateCitiesPath(code: string): string {
  return `/cities/${code.toUpperCase()}/`;
}

/**
 * When `pathname` is one of the pruned pages, the state cities index.
 * Hash and a missing trailing slash are ignored. Other paths return null.
 */
export function prunedRedirectTarget(pathname: string): string | null {
  const path = pathname.split("#")[0].replace(/\/+$/, "");
  const county = path.match(/^\/cities\/([A-Za-z]{2})\/county\/([^/]+)$/);
  if (county && isPrunedCounty(county[1], county[2])) return stateCitiesPath(county[1]);
  const city = path.match(/^\/cities\/([A-Za-z]{2})\/([^/]+)$/);
  if (city && isPrunedCity(city[1], city[2])) return stateCitiesPath(city[1]);
  return null;
}

/** County page href, or null when that county page redirects. */
export function countyHrefByName(code: string, countyName: string): string | null {
  const upper = code.toUpperCase();
  if (isPrunedCounty(upper, countySlug(countyName))) return null;
  return countyPath(upper, countyName);
}

/** Same href the state index already uses for a live county page, or null. */
export function countyHrefBySlug(code: string, slug: string): string | null {
  const upper = code.toUpperCase();
  if (isPrunedCounty(upper, slug)) return null;
  return `/cities/${upper}/county/${slug}/`;
}

/**
 * Href for a place row on a state or county index, or null when that URL redirects.
 * Live pages keep the same href they had before the prune.
 */
export function linkedPlaceHref(code: string, place: VariantPlace): string | null {
  const upper = code.toUpperCase();
  if (placeIsStandalone(place)) {
    if (isPrunedCity(upper, place.slug)) return null;
    return `/cities/${upper}/${place.slug}`;
  }
  const county = place.counties[0];
  if (!county || isPrunedCounty(upper, countySlug(county))) return null;
  return placeTargetPath(upper, place);
}

/** ZIP and place-search hit. Pruned places go to the state index instead of the redirect. */
export function searchPlaceHref(code: string, slug: string, fallbackPath: string): string {
  return prunedRedirectTarget(fallbackPath) ?? prunedRedirectTarget(`/cities/${code}/${slug}/`) ?? fallbackPath;
}
