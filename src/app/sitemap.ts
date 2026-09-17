import type { MetadataRoute } from "next";
import { RACES } from "@/data/races";
import { SITE } from "@/data/site";
import { STARTER_STATES } from "@/data/states";

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

  const racePaths = RACES.flatMap((race) => [`/races/${race.slug}`, `/results/${race.slug}`]);

  return [...staticPaths, ...statePaths, ...racePaths].map((path) => ({
    url: new URL(path || "/", SITE.url).toString(),
    lastModified,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path.startsWith("/races/") ? 0.8 : 0.6,
  }));
}
