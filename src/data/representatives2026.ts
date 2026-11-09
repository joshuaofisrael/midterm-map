import data from "./representatives2026.json";
import { getRace, winnerOf, type WinnerRace } from "./winners2026";

export type Member = { name: string; party: string; bioguide: string; class?: string; website?: string };
export type HouseSeat = { district: string; current: Member | null; race: string };
export type SenateSeat = { current: Member; race: string | null };
export type RepState = { code: string; name: string; senate: SenateSeat[]; house: HouseSeat[] };

const RAW = data as unknown as {
  sources: { senate: { url: string; updated: string }; house: { url: string; updated: string } };
  states: Record<string, Omit<RepState, "code">>;
};

export const REP_SOURCES = RAW.sources;
export const REP_STATES: RepState[] = Object.entries(RAW.states)
  .map(([code, s]) => ({ code, ...s }))
  .sort((a, b) => a.name.localeCompare(b.name));

/** Census: these nine states delineated new congressional boundaries for the 2026 election. */
export const REDRAWN_2026 = new Set(["AL", "CA", "FL", "LA", "NC", "OH", "TN", "TX", "UT"]);

export const repState = (code: string) => REP_STATES.find((s) => s.code === code.toUpperCase());
export const districtSlug = (d: string) => (d === "at-large" ? "at-large" : `district-${d}`);
export const districtFromSlug = (slug: string) => (slug === "at-large" ? "at-large" : slug.replace(/^district-/, ""));
export const repStatePath = (code: string) => `/representatives/${code}`;
export const repDistrictPath = (code: string, d: string) => `/representatives/${code}/${districtSlug(d)}`;

function ordinal(n: number) {
  const s = ["th", "st", "nd", "rd"], v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}
export const districtName = (s: { name: string }, d: string) =>
  d === "at-large" ? `${s.name} at-large congressional district` : `${s.name}'s ${ordinal(Number(d))} congressional district`;
export const districtShort = (code: string, d: string) => (d === "at-large" ? `${code} at-large` : `${code}-${d}`);

export const raceFor = (slug: string | null): WinnerRace | undefined => (slug ? getRace(slug) : undefined);

/** One line on the 2027 holder of a seat, from AP calls only. */
export function electLine(race: WinnerRace | undefined): string {
  if (!race) return "Not on the 2026 ballot";
  const w = winnerOf(race);
  if (!w) return race.status === "runoff" ? "Heads to a runoff (AP)" : "Not yet called (AP)";
  return `${w.name} (${w.party})`;
}

export const bioguideUrl = (id: string) => `https://bioguide.congress.gov/search/bio/${id}`;
export const HOUSE_FIND_URL = "https://www.house.gov/representatives/find-your-representative";
export const SENATE_LIST_URL = "https://www.senate.gov/senators/";
export const repsUpdatedLabel = () => REP_SOURCES.house.updated;
