import { racesForState } from "./races";
import { getState, isStateCode } from "./states";
import type { StateCode } from "./types";

export type SiteLink = {
  href: string;
  label: string;
};

/**
 * State hub, and statewide 2026 Senate and governor race and results pages,
 * when this site already publishes them. House pages are not included.
 */
export function publishedStateLinks(code: string): SiteLink[] {
  if (!isStateCode(code)) return [];
  const stateCode = code as StateCode;
  const state = getState(stateCode);
  const links: SiteLink[] = [];
  if (state) {
    links.push({ href: `/states/${state.code}`, label: `${state.name} state hub` });
  }
  for (const race of racesForState(stateCode)) {
    if (race.chamber !== "senate" && race.chamber !== "governor") continue;
    links.push({ href: `/races/${race.slug}`, label: race.title });
    links.push({ href: `/results/${race.slug}`, label: `${race.title} results` });
  }
  return links;
}
