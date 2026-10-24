import { ballotCycleFor } from "@/data/ballotCycle";
import { getState } from "@/data/states";
import type { RaceGuide, StateCode } from "@/data/types";

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;
export const OG_DATE = "Nov 3, 2026";
export const OG_BRAND = "Map the Midterms";

const MAX_LINES = 5;
const MAX_LINE = 72;

export type OgCard = {
  /** Path under public/, no leading slash. */
  file: string;
  /** Site path used in og:image. */
  url: string;
  alt: string;
  kicker: string;
  title: string;
  contests: string[];
  more: number;
};

function clip(line: string): string {
  const clean = line
    .replace(/\s*\([^)]*\)/g, "")
    .replace(/\s+/g, " ")
    .trim();
  if (clean.length <= MAX_LINE) return clean;
  return `${clean.slice(0, MAX_LINE - 1).trimEnd()}…`;
}

/** Office names only. No candidate names, ratings, or projections. */
export function contestsForState(code: StateCode): string[] {
  const cycle = ballotCycleFor(code);
  const lines: string[] = [];
  if (cycle) {
    lines.push(...cycle.federal, ...cycle.statewide);
    if (cycle.measures.length > 0) lines.push("Statewide measures");
  } else {
    const state = getState(code);
    if (state && state.statewideOffices2026.length > 0) {
      lines.push(...state.statewideOffices2026);
    }
  }
  const unique = [...new Set(lines.map(clip).filter(Boolean))];
  if (unique.length === 0) return ["U.S. House and state contests"];
  return unique;
}

function card(input: {
  file: string;
  kicker: string;
  title: string;
  contests: string[];
}): OgCard {
  const shown = input.contests.slice(0, MAX_LINES);
  const more = Math.max(0, input.contests.length - shown.length);
  const contestAlt = shown.join(", ");
  const moreAlt = more > 0 ? `, and ${more} more` : "";
  return {
    file: input.file,
    url: `/${input.file}`,
    alt: `${input.title}, ${OG_DATE}. ${input.kicker}. ${contestAlt}${moreAlt}. ${OG_BRAND}.`,
    kicker: input.kicker,
    title: input.title,
    contests: shown,
    more,
  };
}

export function stateHubOg(code: StateCode, name: string): OgCard {
  return card({
    file: `og/states/${code}.png`,
    kicker: "State hub",
    title: name,
    contests: contestsForState(code),
  });
}

export function ballotOg(code: StateCode, name: string): OgCard {
  return card({
    file: `og/ballot/${code}.png`,
    kicker: "Ballot",
    title: name,
    contests: contestsForState(code),
  });
}

export function raceOg(race: Pick<RaceGuide, "slug" | "office" | "state">, stateName: string): OgCard {
  return card({
    file: `og/races/${race.slug}.png`,
    kicker: stateName,
    title: race.office,
    contests: [race.office],
  });
}
