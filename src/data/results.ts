import type { RaceGuide, RaceResultShell, StateCode } from "./types";
import { RACES } from "./races";
import { SITE } from "./site";

export { HOUSE_METER, SENATE_METER } from "./chamberMeters";

export const ELECTION_DAY_ISO = SITE.electionDayIso;

export function electionDayUtc(): Date {
  return new Date(`${SITE.electionDayIso}T05:00:00.000Z`);
}

export function isPreElection(now: Date = new Date()): boolean {
  return now.getTime() < electionDayUtc().getTime();
}

export const KEY_RESULT_SLUGS = [
  "ga-senate-2026",
  "mi-senate-2026",
  "nc-senate-2026",
  "tx-senate-2026",
  "az-governor-2026",
  "pa-governor-2026",
  "wi-governor-2026",
  "oh-governor-2026",
  "pa-07-house-2026",
  "nv-03-house-2026",
  "nc-01-house-2026",
] as const;

/**
 * Statewide 2026 Senate and governor contests added for Minnesota, Maine,
 * Iowa, Alaska, and Kansas. Separate from KEY_RESULT_SLUGS so that list stays as it was.
 */
export const ADDITIONAL_RESULT_SLUGS = [
  "mn-senate-2026",
  "mn-governor-2026",
  "me-senate-2026",
  "me-governor-2026",
  "ia-senate-2026",
  "ia-governor-2026",
  "ak-senate-2026",
  "ak-governor-2026",
  "ks-senate-2026",
  "ks-governor-2026",
] as const;

export function resultShellForRace(slug: string): RaceResultShell {
  const race = RACES.find((item) => item.slug === slug);
  const lines = (race?.candidates ?? []).map((candidate) => ({
    candidateLabel: candidate.name,
    party: candidate.party,
    percent: null,
    votes: null,
  }));

  return {
    raceSlug: slug,
    status: "awaiting",
    reportingNote: `Awaiting unofficial returns. Any later numbers shown here will be unofficial until a state or county certifies the contest. ${SITE.name} does not certify results.`,
    lines,
  };
}

/** True once a shell has unofficial vote totals, not just candidate names. */
export function resultShellHasReturns(shell: RaceResultShell): boolean {
  return shell.lines.some((line) => line.votes != null || line.percent != null);
}

/**
 * Where an indexable page should send someone for a race.
 * Empty /results/{slug} shells stay routable. They are the link target once
 * unofficial returns exist, or when the guide sets resultsShellLinked.
 * Unknown slugs fall back to the results hub.
 */
export function indexableRaceHref(raceSlug?: string): string {
  const race = raceSlug ? RACES.find((item) => item.slug === raceSlug) : undefined;
  if (!race) return "/results";
  if (race.resultsShellLinked || resultShellHasReturns(resultShellForRace(race.slug))) {
    return `/results/${race.slug}`;
  }
  return `/races/${race.slug}`;
}

export function allResultShells(): RaceResultShell[] {
  return RACES.map((race) => resultShellForRace(race.slug));
}

export function stateResultsPath(code: StateCode): string {
  return `/results/state/${code}`;
}

/** Other results pages for the same state, or the previous and next race in site order. */
export function neighbouringResultRaces(slug: string): RaceGuide[] {
  const index = RACES.findIndex((race) => race.slug === slug);
  if (index < 0) return [];
  const race = RACES[index];
  const sameState = RACES.filter((item) => item.state === race.state && item.slug !== slug);
  if (sameState.length > 0) return sameState;
  const previous = RACES[(index - 1 + RACES.length) % RACES.length];
  const next = RACES[(index + 1) % RACES.length];
  return [previous, next].filter(
    (item, itemIndex, list) =>
      item.slug !== slug && list.findIndex((other) => other.slug === item.slug) === itemIndex,
  );
}
