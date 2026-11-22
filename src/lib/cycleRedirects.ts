/**
 * Dated 2026-cycle URLs that become HTML redirect stubs.
 * Targets are the state hub when the page is about one state, otherwise a hub.
 */
import mergeFile from "@/data/cycle2026Merge.json";
import { RACES } from "@/data/races";
import { getState, STARTER_STATES } from "@/data/states";
import { RACES_2026 } from "@/data/winners2026";

export type CycleMerge = {
  winnerSlugs: string[];
  stateResultCodes: string[];
  raceShellSlugs: string[];
  hub: boolean;
};

const merge = mergeFile as CycleMerge;

const winnerSet = new Set(merge.winnerSlugs);
const stateResultSet = new Set(merge.stateResultCodes);
const shellSet = new Set(merge.raceShellSlugs);

export function mergedWinnerSlugs(): Set<string> {
  return winnerSet;
}

export function mergedStateResultCodes(): Set<string> {
  return stateResultSet;
}

export function mergedRaceShellSlugs(): Set<string> {
  return shellSet;
}

export function cycleHubMerged(): boolean {
  return merge.hub;
}

/** True when this state hub received 2026 count text from a page that had impressions. */
export function stateHasCycle2026(code: string): boolean {
  const upper = code.toUpperCase();
  if (stateResultSet.has(upper)) return true;
  if (RACES_2026.some((race) => race.state === upper && winnerSet.has(race.slug))) return true;
  if (RACES.some((race) => race.state === upper && shellSet.has(race.slug))) return true;
  return false;
}

/** State-hub anchor for a merged winner page, or null when that page was not merged. */
export function mergedWinnerHref(slug: string): string | null {
  if (!winnerSet.has(slug)) return null;
  const race = RACES_2026.find((item) => item.slug === slug);
  if (!race) return null;
  if (getState(race.state)) return `/states/${race.state}/#cycle-2026`;
  return "/races/#cycle-2026";
}

export type CycleRedirect = {
  path: string;
  target: string;
  label: string;
};

function withSlash(path: string): string {
  if (path === "/") return "/";
  const hash = path.includes("#") ? `#${path.split("#")[1]}` : "";
  const base = path.split("#")[0].replace(/\/+$/, "");
  return `${base}/${hash}`;
}

export function cycleRedirects(): CycleRedirect[] {
  const rows: CycleRedirect[] = [
    { path: "/polls/", target: "/races/", label: "Polls and ratings" },
    { path: "/election-night-tv/", target: "/", label: "Election night" },
    { path: "/updates/thanks/", target: "/", label: "Election updates" },
    { path: "/results/", target: "/races/#cycle-2026", label: "2026 results" },
    { path: "/results/2026/", target: "/races/#cycle-2026", label: "Who won in 2026" },
  ];
  for (const state of STARTER_STATES) {
    rows.push({
      path: `/results/state/${state.code}/`,
      target: `/states/${state.code}/#cycle-2026`,
      label: `${state.name} 2026 results`,
    });
  }
  for (const race of RACES) {
    const state = getState(race.state);
    rows.push({
      path: `/results/${race.slug}/`,
      target: state ? `/states/${state.code}/#cycle-2026` : `/races/${race.slug}/`,
      label: `${race.title} results`,
    });
  }
  for (const winner of RACES_2026) {
    const state = getState(winner.state);
    rows.push({
      path: `/results/2026/${winner.slug}/`,
      target: state ? `/states/${winner.state}/#cycle-2026` : "/races/#cycle-2026",
      label: winner.label,
    });
  }
  return rows.map((row) => ({ ...row, target: withSlash(row.target) }));
}

export function cycleRedirectPaths(): Set<string> {
  return new Set(cycleRedirects().map((row) => row.path));
}
