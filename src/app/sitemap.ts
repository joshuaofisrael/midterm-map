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

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(SITE.lastUpdated);

  const staticPaths = [
    "",
    "/ballot",
    "/races",
    "/polls",
    "/results",
    "/about",
    "/disclaimer",
    "/privacy",
    "/terms",
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
    lastModified,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path.startsWith("/races/") ? 0.8 : 0.6,
  }));
}
