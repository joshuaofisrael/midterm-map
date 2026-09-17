import type { RaceGuide, StateCode } from "./types";
import { GOVERNOR_RACES } from "./races/governors";
import { HOUSE_RACES } from "./races/house";
import { SENATE_RACES } from "./races/senate";

export const RACES: RaceGuide[] = [...SENATE_RACES, ...GOVERNOR_RACES, ...HOUSE_RACES];

export function getRace(slug: string): RaceGuide | undefined {
  return RACES.find((race) => race.slug === slug);
}

export function racesForState(code: StateCode): RaceGuide[] {
  return RACES.filter((race) => race.state === code);
}

export function featuredRaces(): RaceGuide[] {
  return RACES.filter((race) => race.featured);
}

export function racesByChamber(chamber: RaceGuide["chamber"]): RaceGuide[] {
  return RACES.filter((race) => race.chamber === chamber);
}

export function racesWithRatings(): RaceGuide[] {
  return RACES.filter((race) => race.ratings.length > 0);
}
