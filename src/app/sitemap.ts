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
  if (LEGAL_BRAND_PATHS.has(path)) return LEGAL_BRAND_UPDATED;
  if (path === "/voting-deadlines" || monetizationChanged(path)) return MONETIZATION_UPDATED;
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
