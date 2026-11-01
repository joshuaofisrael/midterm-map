import type { MetadataRoute } from "next";
import { countiesForState, placeState, placeStates, placesForState } from "@/data/places/load";
import { placeIsStandalone } from "@/lib/placeNames";
import { cityIsThin } from "@/lib/cityThin";
import { RACES } from "@/data/races";
import { resultShellForRace, resultShellHasReturns } from "@/data/results";
import { absoluteUrl, SITE } from "@/data/site";
import { STARTER_STATES } from "@/data/states";
import { LEARN_ARTICLES } from "@/data/learn/articles";
import { contentUpdatedIsoForPath } from "@/lib/contentDate";

/** Sitemap protocol limit is 50,000 URLs per file. Stay under it. */
const SITEMAP_URL_LIMIT = 50000;

export const dynamic = "force-static";

/**
 * Per-race /results/{slug} URLs stay out of the sitemap while those pages
 * are empty pre-election shells. Flip this (or rely on resultShellHasReturns)
 * near Election Day (2026-11-03) when unofficial returns have real data.
 */
const INCLUDE_PER_RACE_RESULTS_IN_SITEMAP = true; // owner rule 11 Oct 2026: every page indexable

/** Date of the October 7, 2026 compliance edit. Unchanged pages keep SITE.lastUpdated. */
const CONTENT_UPDATED = "2026-10-07";

/**
 * October 8, 2026. Used for the monetization edit and, the same day, the
 * voting-deadlines title, anchors, and cross-links. State hubs were already
 * on this date. Other pages stay on CONTENT_UPDATED or SITE.lastUpdated.
 */
const MONETIZATION_UPDATED = "2026-10-08";

/**
 * October 10, 2026 voting-deadlines recheck. Applies only to pages whose
 * deadline copy changed. Arizona's dates were not re-read, so /states/AZ
 * stays on the earlier date.
 */
const DEADLINES_UPDATED = "2026-10-10";

/**
 * October 11, 2026. Minnesota state hub, its ballot sketch, and the pages
 * that gained a Minnesota link or a rechecked Minnesota date.
 */
const MINNESOTA_HUB_UPDATED = "2026-10-11";
const MINNESOTA_HUB_PATHS = new Set(["", "/voting-deadlines", "/ballot", "/states/MN", "/ballot/MN"]);

/**
 * October 12, 2026. Maine state hub, its ballot sketch, and the pages that
 * gained a Maine link or a Maine date.
 */
const MAINE_HUB_UPDATED = "2026-10-12";
const MAINE_HUB_PATHS = new Set(["", "/voting-deadlines", "/ballot", "/states/ME", "/ballot/ME"]);

/**
 * October 13, 2026. Iowa state hub, its ballot sketch, and the pages that
 * gained an Iowa link or an Iowa date.
 */
const IOWA_HUB_UPDATED = "2026-10-13";
const IOWA_HUB_PATHS = new Set(["", "/voting-deadlines", "/ballot", "/states/IA", "/ballot/IA"]);

/**
 * October 16, 2026. Kansas state hub, its ballot sketch, and the pages that
 * gained a Kansas link or a Kansas date.
 */
const KANSAS_HUB_UPDATED = "2026-10-16";
const KANSAS_HUB_PATHS = new Set(["", "/voting-deadlines", "/ballot", "/states/KS", "/ballot/KS"]);

/**
 * October 14, 2026. Alaska state hub, its ballot sketch, and the pages that
 * gained an Alaska link or an Alaska date.
 */
const ALASKA_HUB_UPDATED = "2026-10-14";
const ALASKA_HUB_PATHS = new Set(["", "/voting-deadlines", "/ballot", "/states/AK", "/ballot/AK"]);

/**
 * October 17, 2026. Kansas statewide Senate and governor results pages,
 * their race guides, and the indexes that list them.
 */
const KANSAS_RESULTS_UPDATED = "2026-10-17";
const KANSAS_RESULTS_PATHS = new Set([
  "/results",
  "/races",
  "/polls",
  "/states/KS",
  "/ballot/KS",
  "/races/ks-senate-2026",
  "/results/ks-senate-2026",
  "/races/ks-governor-2026",
  "/results/ks-governor-2026",
]);

/**
 * October 15, 2026. Results pages and race guides for the statewide Senate
 * and governor contests in Minnesota, Maine, Iowa, and Alaska, plus the
 * hubs and indexes that link them.
 */
const RESULTS_EXPANSION_UPDATED = "2026-10-15";
const RESULTS_EXPANSION_SLUGS = [
  "mn-senate-2026",
  "mn-governor-2026",
  "me-senate-2026",
  "me-governor-2026",
  "ia-senate-2026",
  "ia-governor-2026",
  "ak-senate-2026",
  "ak-governor-2026",
];
const RESULTS_EXPANSION_PATHS = new Set([
  "/results",
  "/races",
  "/polls",
  "/states/MN",
  "/ballot/MN",
  "/states/ME",
  "/ballot/ME",
  "/states/IA",
  "/ballot/IA",
  "/states/AK",
  "/ballot/AK",
  ...RESULTS_EXPANSION_SLUGS.flatMap((slug) => [`/races/${slug}`, `/results/${slug}`]),
]);
const DEADLINE_RECHECK_STATE_HUBS = new Set([
  "/states/GA",
  "/states/MI",
  "/states/NC",
  "/states/NV",
  "/states/OH",
  "/states/PA",
  "/states/WI",
  "/states/TX",
  "/states/FL",
  "/states/CA",
  "/states/NY",
]);

function pageChanged(path: string): boolean {
  if (path === "" || path === "/ballot" || path === "/voting-deadlines" || path === "/races" || path === "/polls") {
    return true;
  }
  return path.startsWith("/states/") || path.startsWith("/ballot/") || path.startsWith("/races/");
}

function monetizationChanged(path: string): boolean {
  if (path === "" || path === "/about" || path === "/privacy" || path === "/terms") {
    return true;
  }
  return path.startsWith("/states/") || path.startsWith("/races/");
}

/** October 8, 2026 legal "brand of the LLC" pass: About, Disclaimer, Privacy, Terms, new Contact page. */
const LEGAL_BRAND_UPDATED = "2026-10-08";
const LEGAL_BRAND_PATHS = new Set(["/about", "/disclaimer", "/privacy", "/terms", "/contact"]);

/** October 22, 2026. County hubs, place-name search, and spelling redirects. */
const CITY_PAGES_UPDATED = "2026-10-22";

/** October 24, 2026. Copyright line on the legal pages, not the public footer. */
const COPYRIGHT_NOTICE_UPDATED = "2026-10-24";
const COPYRIGHT_NOTICE_PATHS = new Set([
  "/terms",
  "/privacy",
  "/disclaimer",
  "/copyright",
  "/advertising",
]);

/** October 23, 2026. Contact form, and the pages that now point to it instead of an inbox. */
const CONTACT_FORM_UPDATED = "2026-10-23";
const CONTACT_FORM_PATHS = new Set([
  "/contact",
  "/contact/thanks",
  "/privacy",
  "/about",
  "/disclaimer",
  "/terms",
  "/copyright",
  "/advertising",
]);

/** October 27, 2026. Editorial explainers and the methods section on About. */
const EDITORIAL_UPDATED = "2026-10-27";

function lastModifiedFor(path: string): string {
  if (path === "/advertise") return "2026-10-27";
  if (path === "/about" || path === "/learn" || path.startsWith("/learn/")) return EDITORIAL_UPDATED;
  if (COPYRIGHT_NOTICE_PATHS.has(path)) return COPYRIGHT_NOTICE_UPDATED;
  if (CONTACT_FORM_PATHS.has(path)) return CONTACT_FORM_UPDATED;
  if (path === "/sources") return CITY_PAGES_UPDATED;
  const contentDate = contentUpdatedIsoForPath(path);
  if (contentDate) return contentDate;
  if (path === "/cities" || path.startsWith("/cities/")) return CITY_PAGES_UPDATED;
  if (KANSAS_RESULTS_PATHS.has(path)) return KANSAS_RESULTS_UPDATED;
  if (KANSAS_HUB_PATHS.has(path)) return KANSAS_HUB_UPDATED;
  if (RESULTS_EXPANSION_PATHS.has(path)) return RESULTS_EXPANSION_UPDATED;
  if (ALASKA_HUB_PATHS.has(path)) return ALASKA_HUB_UPDATED;
  if (IOWA_HUB_PATHS.has(path)) return IOWA_HUB_UPDATED;
  if (MAINE_HUB_PATHS.has(path)) return MAINE_HUB_UPDATED;
  if (MINNESOTA_HUB_PATHS.has(path)) return MINNESOTA_HUB_UPDATED;
  if (path === "/voting-deadlines" || path === "" || path === "/ballot" || DEADLINE_RECHECK_STATE_HUBS.has(path)) {
    return DEADLINES_UPDATED;
  }
  if (LEGAL_BRAND_PATHS.has(path)) return LEGAL_BRAND_UPDATED;
  if (monetizationChanged(path)) return MONETIZATION_UPDATED;
  return pageChanged(path) ? CONTENT_UPDATED : SITE.lastUpdated;
}

function changeFrequencyFor(path: string): "hourly" | "weekly" | "monthly" {
  if (path === "/live" || path === "/results") return "hourly";
  if (
    path === "" ||
    path === "/voting-deadlines" ||
    path.startsWith("/states/") ||
    path.startsWith("/results/state/")
  ) {
    return "weekly";
  }
  return "monthly";
}

function sitemapEntry(path: string, priority: number): MetadataRoute.Sitemap[number] {
  return {
    url: absoluteUrl(path || "/"),
    lastModified: new Date(lastModifiedFor(path)),
    changeFrequency: changeFrequencyFor(path),
    priority,
  };
}

function priorityFor(path: string): number {
  if (path === "") return 1;
  if (path === "/live" || path === "/election-night-tv" || path.startsWith("/results/state/")) return 0.8;
  if (path === "/cities") return 0.7;
  if (path === "/voting-deadlines" || path.startsWith("/states/")) return 0.8;
  if (path.startsWith("/races/") || path.startsWith("/learn")) return 0.8;
  if (path === "/contact/thanks") return 0.3;
  return 0.6;
}

function coreSitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "",
    "/cities",
    "/sources",
    "/ballot",
    "/voting-deadlines",
    "/races",
    "/polls",
    "/results",
    "/election-night-tv",
    "/learn",
    "/about",
    "/disclaimer",
    "/privacy",
    "/terms",
    "/copyright",
    "/advertising",
    "/advertise",
    "/contact",
    "/contact/thanks",
    "/updates/thanks",
    "/embed/map",
  ];

  const statePaths = STARTER_STATES.flatMap((state) => [
    `/states/${state.code}`,
    `/ballot/${state.code}`,
    `/results/state/${state.code}`,
  ]);

  const learnPaths = LEARN_ARTICLES.map((article) => `/learn/${article.slug}`);

  const racePaths = RACES.flatMap((race) => {
    const paths = [`/races/${race.slug}`];
    const hasReturns = resultShellHasReturns(resultShellForRace(race.slug));
    if (INCLUDE_PER_RACE_RESULTS_IN_SITEMAP || hasReturns) {
      paths.push(`/results/${race.slug}`);
    }
    return paths;
  });

  return [...staticPaths, ...learnPaths, ...statePaths, ...racePaths].map((path) =>
    sitemapEntry(path, priorityFor(path)),
  );
}

function stateSitemap(code: string): MetadataRoute.Sitemap {
  const places = placesForState(code).filter((place) => placeIsStandalone(place) && !cityIsThin(code, place));
  const counties = countiesForState(code);
  const entries = [
    sitemapEntry(`/cities/${code}`, 0.6),
    ...counties.map((county) => sitemapEntry(`/cities/${code}/county/${county.slug}`, 0.55)),
    ...places.map((place) => sitemapEntry(`/cities/${code}/${place.slug}`, 0.5)),
  ];
  if (entries.length >= SITEMAP_URL_LIMIT) {
    throw new Error(`Sitemap ${code} has ${entries.length} URLs`);
  }
  return entries;
}

export async function generateSitemaps(): Promise<{ id: string }[]> {
  const codes = placeStates()
    .map((state) => state.code)
    .sort();
  return [{ id: "core" }, ...codes.map((id) => ({ id }))];
}

export default async function sitemap({
  id,
}: {
  id: Promise<string> | string;
}): Promise<MetadataRoute.Sitemap> {
  const sitemapId = await id;
  if (sitemapId === "core") return coreSitemap();
  if (!placeState(sitemapId)) {
    throw new Error(`Unknown sitemap id ${sitemapId}`);
  }
  return stateSitemap(sitemapId);
}
