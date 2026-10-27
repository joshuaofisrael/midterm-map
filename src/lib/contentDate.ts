import { ballotCycleFor } from "@/data/ballotCycle";
import { candidateFile } from "@/data/candidates/load";
import { CENSUS_PLACES_UPDATED } from "@/data/censusSources";
import { ESSAY_UPDATED } from "@/data/essays/text";
import { getLearnArticle } from "@/data/learn/articles";
import { localFile } from "@/data/local/load";
import liveSources from "@/data/live-sources.json";
import { ELECTION_DATES, electionDatesFor } from "@/data/electionDates";
import { pollsForRace } from "@/data/polls";
import { getRace, RACES, racesForState } from "@/data/races";
import { ADDITIONAL_RESULT_SLUGS, KEY_RESULT_SLUGS } from "@/data/results";
import { getState, isStateCode, STARTER_STATES } from "@/data/states";
import type { Citation, RaceGuide, StateCode } from "@/data/types";

/**
 * Visible "Last updated" dates.
 *
 * A date is used only when the page already stores it: a deadline `checkedOn`,
 * a state `cycleCheckedOn`, or a citation `accessed` value. The page date is
 * the latest of those dates for the facts that page renders. Nothing here is
 * stamped with the day this trust line was added.
 */

const MONTH_INDEX: Record<string, number> = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12,
};

export function contentLabelToIso(label: string): string | null {
  const match = /^([A-Z][a-z]+) (\d{1,2}), (\d{4})$/.exec(label.trim());
  if (!match) return null;
  const month = MONTH_INDEX[match[1]];
  if (!month) return null;
  const day = Number(match[2]);
  if (!Number.isInteger(day) || day < 1 || day > 31) return null;
  return `${match[3]}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function accessed(citations: Citation[]): string[] {
  return citations.flatMap((citation) => (citation.accessed ? [citation.accessed] : []));
}

/** Dates on the race-guide facts (sources and candidate citations), not poll rows. */
export function raceFactLabels(race: RaceGuide): string[] {
  return [
    ...accessed(race.sources),
    ...race.candidates.flatMap((candidate) => accessed(candidate.sources)),
  ];
}

function resultFactLabels(race: RaceGuide): string[] {
  const labels = race.candidates.flatMap((candidate) => accessed(candidate.sources));
  if (race.officialResults) labels.push(...accessed(race.sources));
  return labels;
}

function stateHubLabels(code: StateCode): string[] {
  const dates = electionDatesFor(code);
  const state = getState(code);
  return [
    dates.checkedOn,
    ...dates.facts.flatMap((fact) => (fact.checkedOn ? [fact.checkedOn] : [])),
    ...(state?.cycleCheckedOn ? [state.cycleCheckedOn] : []),
    ...racesForState(code).flatMap(raceFactLabels),
  ];
}

/**
 * Ballot sketches render the office list (`cycleCheckedOn`) and, for Senate
 * and governor rows, the candidate citations under the nominee line.
 * House guides are linked, not quoted, so their later citations are not
 * treated as this page's content date.
 */
function ballotStateLabels(code: StateCode): string[] {
  const state = getState(code);
  const labels = state?.cycleCheckedOn ? [state.cycleCheckedOn] : [];
  if (ballotCycleFor(code)) {
    const dates = electionDatesFor(code);
    labels.push(dates.checkedOn, ...dates.facts.flatMap((fact) => (fact.checkedOn ? [fact.checkedOn] : [])));
  }
  for (const race of racesForState(code)) {
    if (race.chamber !== "senate" && race.chamber !== "governor") continue;
    labels.push(...race.candidates.flatMap((candidate) => accessed(candidate.sources)));
  }
  const local = localFile(code);
  if (local?.accessed) labels.push(local.accessed);
  return labels;
}

function cityFactLabels(code: string): string[] {
  const labels = [CENSUS_PLACES_UPDATED];
  if (isStateCode(code)) {
    const dates = electionDatesFor(code);
    labels.push(dates.checkedOn, ...dates.facts.flatMap((fact) => (fact.checkedOn ? [fact.checkedOn] : [])));
  }
  const candidates = candidateFile(code);
  if (candidates) {
    for (const source of candidates.sources) {
      if (source.accessed) labels.push(source.accessed);
    }
  }
  const local = localFile(code);
  if (local?.accessed) labels.push(local.accessed);
  return labels;
}

function votingDeadlineLabels(): string[] {
  return ELECTION_DATES.flatMap((dates) => [
    dates.checkedOn,
    ...dates.facts.flatMap((fact) => (fact.checkedOn ? [fact.checkedOn] : [])),
  ]);
}

export function latestContentLabel(labels: Array<string | undefined>): string {
  let bestIso = "";
  let bestLabel = "";
  for (const label of labels) {
    if (!label) continue;
    const iso = contentLabelToIso(label);
    if (!iso) continue;
    if (iso > bestIso) {
      bestIso = iso;
      bestLabel = label;
    }
  }
  if (!bestLabel) {
    throw new Error("No stored content date for this page");
  }
  return bestLabel;
}

function racePageLabels(race: RaceGuide): string[] {
  return [
    ...raceFactLabels(race),
    ...pollsForRace(race.slug).flatMap((row) =>
      [row.source.accessed, row.nameSource?.accessed].filter((value): value is string => Boolean(value)),
    ),
  ];
}

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/** Long date stored on the live-sources catalog (`checkedOn`). */
function liveSourcesCheckedLabel(): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(liveSources.checkedOn);
  if (!match) {
    throw new Error("live-sources.json checkedOn is not YYYY-MM-DD");
  }
  const month = MONTH_NAMES[Number(match[2]) - 1];
  if (!month) throw new Error("live-sources.json checkedOn has a bad month");
  return `${month} ${Number(match[3])}, ${match[1]}`;
}

/** Long date for a site path, or null when this path has no trust-line date. */
export function contentUpdatedLabelForPath(path: string): string | null {
  const clean = path.replace(/\/+$/, "") || "/";

  if (clean === "/learn") return ESSAY_UPDATED;
  if (clean.startsWith("/learn/")) {
    return getLearnArticle(clean.slice("/learn/".length)) ? ESSAY_UPDATED : null;
  }
  if (clean === "/about") return ESSAY_UPDATED;

  if (clean === "/") return latestContentLabel(votingDeadlineLabels());
  if (clean === "/live") return liveSourcesCheckedLabel();
  if (clean === "/cities") return CENSUS_PLACES_UPDATED;
  const cityState = /^\/cities\/([A-Za-z]{2})(?:\/|$)/.exec(clean);
  if (cityState) return latestContentLabel(cityFactLabels(cityState[1].toUpperCase()));
  if (clean === "/voting-deadlines") return latestContentLabel(votingDeadlineLabels());
  if (clean === "/ballot") {
    return latestContentLabel(STARTER_STATES.flatMap((state) => ballotStateLabels(state.code)));
  }
  if (clean === "/races") return latestContentLabel(RACES.flatMap(raceFactLabels));
  if (clean === "/results") {
    return latestContentLabel([
      liveSourcesCheckedLabel(),
      ...[...KEY_RESULT_SLUGS, ...ADDITIONAL_RESULT_SLUGS].flatMap((slug) => {
        const race = getRace(slug);
        return race ? resultFactLabels(race) : [];
      }),
    ]);
  }

  const stateResults = /^\/results\/state\/([A-Za-z]{2})$/.exec(clean);
  if (stateResults && isStateCode(stateResults[1].toUpperCase())) {
    const code = stateResults[1].toUpperCase() as StateCode;
    return latestContentLabel([liveSourcesCheckedLabel(), getState(code)?.cycleCheckedOn]);
  }

  const stateHub = /^\/states\/([A-Za-z]{2})$/.exec(clean);
  if (stateHub && isStateCode(stateHub[1].toUpperCase())) {
    return latestContentLabel(stateHubLabels(stateHub[1].toUpperCase() as StateCode));
  }

  const ballot = /^\/ballot\/([A-Za-z]{2})$/.exec(clean);
  if (ballot && isStateCode(ballot[1].toUpperCase())) {
    return latestContentLabel(ballotStateLabels(ballot[1].toUpperCase() as StateCode));
  }

  const racePath = /^\/races\/([^/]+)$/.exec(clean);
  if (racePath) {
    const race = getRace(racePath[1]);
    return race ? latestContentLabel(racePageLabels(race)) : null;
  }

  const resultPath = /^\/results\/([^/]+)$/.exec(clean);
  if (resultPath) {
    const race = getRace(resultPath[1]);
    return race ? latestContentLabel(resultFactLabels(race)) : null;
  }

  return null;
}

export function contentUpdatedIsoForPath(path: string): string | null {
  const label = contentUpdatedLabelForPath(path);
  return label ? contentLabelToIso(label) : null;
}

export function contentUpdatedLabel(path: string): string {
  const label = contentUpdatedLabelForPath(path);
  if (!label) {
    throw new Error(`No stored content date for ${path}`);
  }
  return label;
}
