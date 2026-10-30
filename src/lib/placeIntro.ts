/**
 * Short original intros for county and city pages, built only from data the
 * site already stores (Census places, stored candidate lists, stored local
 * contests). Sentence shapes rotate on a hash of the page slug so neighbouring
 * pages do not read alike. Nonpartisan: no party counts, no names, no forecasts.
 */
import { contestsForPlace, contestsForPlaces, houseDistrictNumbers, type CandidateContest } from "@/data/candidates/load";
import { localFile } from "@/data/local/load";
import { countiesForState, placesForState, type CountyBucket, type PlaceRecord } from "@/data/places/load";
import { placeDisplayName, placeIsStandalone } from "@/lib/placeNames";

function hash(text: string): number {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 16777619);
  return h >>> 0;
}
function pick<T>(seed: number, salt: number, options: T[]): T {
  return options[(seed >>> (salt * 3)) % options.length];
}
const n = (v: number) => v.toLocaleString("en-US");
function ordinal(v: number): string {
  const s = ["th", "st", "nd", "rd"], m = v % 100;
  return `${v}${s[(m - 20) % 10] || s[m] || s[0]}`;
}
function list(items: string[]): string {
  if (items.length <= 1) return items.join("");
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}
function districtPhrase(nums: string[], stateName: string): string {
  if (nums.length === 0) return "";
  const labels = nums.map((d) => (d === "0" || d.toLowerCase() === "al" ? "the at-large seat" : `the ${ordinal(Number(d))}`));
  if (labels.length === 1 && labels[0] === "the at-large seat") return `${stateName}'s at-large seat`;
  return `${stateName}'s ${list(labels.map((l) => l.replace(/^the /, "")))} ${labels.length === 1 ? "District" : "Districts"}`;
}
function topOffices(contests: CandidateContest[]): string[] {
  const out: string[] = [];
  if (contests.some((c) => c.kind === "senate")) out.push("a U.S. Senate seat");
  if (contests.some((c) => c.kind === "governor")) out.push("governor");
  const statewide = contests.filter((c) => c.kind === "statewide").length;
  if (statewide > 0) out.push(`${statewide} other statewide ${statewide === 1 ? "office" : "offices"}`);
  return out;
}
function houseNums(contests: CandidateContest[]): string[] {
  const nums = contests
    .filter((c) => c.kind === "house" && c.district)
    .map((c) => (c.district ?? "").replace(/\D+/g, "") || "0");
  return [...new Set(nums)].sort((a, b) => Number(a) - Number(b));
}
function countyPop(c: CountyBucket): number {
  return c.places.reduce((s, p) => s + (p.pop ?? 0), 0);
}

export function countyIntro(code: string, stateName: string, county: CountyBucket): string[] {
  const seed = hash(`${code}/${county.slug}`);
  const all = countiesForState(code);
  const ranked = [...all].sort((a, b) => countyPop(b) - countyPop(a));
  const rank = ranked.findIndex((c) => c.slug === county.slug) + 1;
  const pop = countyPop(county);
  const pages = county.places.filter((p) => placeIsStandalone(p));
  const largest = [...county.places].filter((p) => p.pop != null).sort((a, b) => (b.pop ?? 0) - (a.pop ?? 0))[0];
  const { contests } = contestsForPlaces(code, county.places);
  const house = houseNums(contests);
  const offices = topOffices(contests);
  const local = localFile(code);
  const localCount = local?.localByCounty?.[county.name]?.length ?? 0;
  const out: string[] = [];

  // Sentence 1: size and place in the state.
  const placeWord = county.places.length === 1 ? "Census place" : "Census places";
  out.push(
    pick(seed, 0, [
      `${county.name} holds ${n(county.places.length)} ${placeWord} on this site, with a combined 2020 population of ${n(pop)} across places that report one.`,
      `By the sum of its Census places, ${county.name} ranks ${ordinal(rank)} of ${n(all.length)} counties listed for ${stateName}, at ${n(pop)} residents in 2020.`,
      `This guide covers ${n(county.places.length)} ${placeWord} in ${county.name}, ${stateName}; ${n(pages.length)} of them have their own page.`,
    ]),
  );
  // Sentence 2: largest place.
  if (largest) {
    const name = placeDisplayName(largest.name);
    out.push(
      pick(seed, 1, [
        `${name} is the largest, with ${n(largest.pop ?? 0)} people at the 2020 Census.`,
        `The biggest community is ${name} (${n(largest.pop ?? 0)} residents in 2020).`,
        `Its most populous place on the Census file is ${name}, home to ${n(largest.pop ?? 0)} people.`,
      ]),
    );
  }
  // Sentence 3: what is on the ballot.
  if (contests.length > 0) {
    const top = offices.length ? list(offices) : "";
    const dist = districtPhrase(house, stateName);
    out.push(
      pick(seed, 2, [
        `The stored 2026 list gives voters here ${n(contests.length)} federal and statewide ${contests.length === 1 ? "contest" : "contests"}${top ? `, including ${top}` : ""}${dist ? `, with U.S. House races in ${dist}` : ""}.`,
        `${dist ? `U.S. House voting here falls in ${dist}. ` : ""}Across federal and statewide offices, ${n(contests.length)} ${contests.length === 1 ? "contest is" : "contests are"} listed below${top ? `, among them ${top}` : ""}.`,
        `On the 2026 midterm ballot this page shows ${n(contests.length)} ${contests.length === 1 ? "contest" : "contests"} above the local level${dist ? ` (House: ${dist})` : ""}${top ? `; the top of the ticket includes ${top}` : ""}.`,
      ]),
    );
  }
  // Sentence 4: local contests and results status.
  if (localCount > 0) {
    out.push(
      pick(seed, 3, [
        `The county's own official list adds ${n(localCount)} local ${localCount === 1 ? "contest" : "contests"}, shown with the federal races.`,
        `${n(localCount)} county-level ${localCount === 1 ? "contest comes" : "contests come"} from the county election office's published list.`,
      ]),
    );
  } else {
    out.push(
      pick(seed, 3, [
        `Results for ${stateName} appear on the state results page once official counts are posted after polls close on November 3, 2026.`,
        `After polls close on November 3, 2026, check the ${stateName} results page for counts as the state posts them.`,
        `No county-level local contest list is stored here yet, so confirm local races with the official election office.`,
      ]),
    );
  }
  return out;
}

export function cityIntro(code: string, stateName: string, place: PlaceRecord): string[] {
  const seed = hash(`${code}/${place.slug}`);
  const name = placeDisplayName(place.name);
  const peers = placesForState(code).filter((p) => p.pop != null).sort((a, b) => (b.pop ?? 0) - (a.pop ?? 0));
  const rank = place.pop == null ? 0 : peers.findIndex((p) => p.geoid === place.geoid) + 1;
  const county = place.counties[0];
  const sameCounty = county ? placesForState(code).filter((p) => p.counties.includes(county)).length : 0;
  const { contests } = contestsForPlace(code, place);
  const house = houseDistrictNumbers(code, place);
  const offices = topOffices(contests);
  const local = localFile(code);
  const localCount = local?.local?.[place.geoid]?.length ?? 0;
  const out: string[] = [];

  if (place.pop != null) {
    out.push(
      pick(seed, 0, [
        `${name} had ${n(place.pop)} residents at the 2020 Census, ${ordinal(rank)} of ${n(peers.length)} ${stateName} places with a population on file.`,
        `With ${n(place.pop)} people in 2020, ${name} ranks ${ordinal(rank)} by population among ${n(peers.length)} Census places in ${stateName}.`,
        `Ranked by 2020 population, ${name} is ${ordinal(rank)} of ${n(peers.length)} places in ${stateName} (${n(place.pop)} residents).`,
      ]),
    );
  }
  if (county) {
    const extra = place.counties.length > 1 ? ` and extends into ${list(place.counties.slice(1))}` : "";
    out.push(
      pick(seed, 1, [
        `It sits in ${county}${extra}, which has ${n(sameCounty)} Census places on this site.`,
        `${county}${extra ? ` (the place also extends into ${list(place.counties.slice(1))})` : ""} is its county; ${n(sameCounty)} Census places there are listed.`,
        `The Census file places it in ${county}${extra}.`,
      ]),
    );
  }
  if (contests.length > 0 || house.length > 0) {
    const dist = districtPhrase(house, stateName);
    const top = offices.length ? list(offices) : "";
    out.push(
      pick(seed, 2, [
        `Voters here see ${n(contests.length)} federal and statewide ${contests.length === 1 ? "contest" : "contests"} on the stored 2026 list${top ? `, including ${top}` : ""}${dist ? `; the U.S. House race is in ${dist}` : ""}.`,
        `${dist ? `For the U.S. House, ${name} is in ${dist}. ` : ""}The 2026 list below has ${n(contests.length)} ${contests.length === 1 ? "contest" : "contests"} above the local level${top ? `, among them ${top}` : ""}.`,
        `${top ? `The top of the 2026 ticket here includes ${top}` : `The 2026 list here has ${n(contests.length)} contests`}${dist ? `, and House voting falls in ${dist}` : ""}.`,
      ]),
    );
  }
  if (localCount > 0) {
    out.push(
      pick(seed, 3, [
        `The official local list adds ${n(localCount)} city ${localCount === 1 ? "contest" : "contests"}.`,
        `${n(localCount)} local ${localCount === 1 ? "contest is" : "contests are"} copied from the city's official list.`,
      ]),
    );
  }
  return out.slice(0, 4);
}
