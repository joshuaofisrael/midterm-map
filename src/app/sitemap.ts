import type { MetadataRoute } from "next";
import { RACES } from "@/data/races";
import { resultShellForRace, resultShellHasReturns } from "@/data/results";
import { absoluteUrl, SITE } from "@/data/site";
import { STARTER_STATES } from "@/data/states";

export const dynamic = "force-static";

/**
 * Per-race /results/{slug} URLs stay out of the sitemap while those pages
 * are empty pre-election shells. Flip this (or rely on resultShellHasReturns)
 * near Election Day (2026-11-03) when unofficial returns have real data.
 */
const INCLUDE_PER_RACE_RESULTS_IN_SITEMAP = false;

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

function lastModifiedFor(path: string): string {
  if (MINNESOTA_HUB_PATHS.has(path)) return MINNESOTA_HUB_UPDATED;
  if (path === "/voting-deadlines" || path === "" || path === "/ballot" || DEADLINE_RECHECK_STATE_HUBS.has(path)) {
    return DEADLINES_UPDATED;
  }
  if (LEGAL_BRAND_PATHS.has(path)) return LEGAL_BRAND_UPDATED;
  if (monetizationChanged(path)) return MONETIZATION_UPDATED;
  return pageChanged(path) ? CONTENT_UPDATED : SITE.lastUpdated;
}

export default function sitemap(): MetadataRoute.Sitemap {

  const staticPaths = [
    "",
    "/ballot",
    "/voting-deadlines",
    "/races",
    "/polls",
    "/results",
    "/about",
    "/disclaimer",
    "/privacy",
    "/terms",
    "/contact",
  ];

  const statePaths = STARTER_STATES.flatMap((state) => [
    `/states/${state.code}`,
    `/ballot/${state.code}`,
  ]);

  const racePaths = RACES.flatMap((race) => {
    const paths = [`/races/${race.slug}`];
    const hasReturns = resultShellHasReturns(resultShellForRace(race.slug));
    if (INCLUDE_PER_RACE_RESULTS_IN_SITEMAP || hasReturns) {
      paths.push(`/results/${race.slug}`);
    }
    return paths;
  });

  return [...staticPaths, ...statePaths, ...racePaths].map((path) => ({
    url: absoluteUrl(path || "/"),
    lastModified: new Date(lastModifiedFor(path)),
    changeFrequency:
      path === "" || path === "/voting-deadlines" || path.startsWith("/states/")
        ? "weekly"
        : "monthly",
    priority:
      path === "" ? 1 : path === "/voting-deadlines" || path.startsWith("/states/") ? 0.8 : path.startsWith("/races/") ? 0.8 : 0.6,
  }));
}
