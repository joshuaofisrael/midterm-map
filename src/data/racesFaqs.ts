import { RACES, racesByChamber } from "./races";
import { SITE } from "./site";
import { STARTER_STATES } from "./states";
import type { StateCode } from "./types";

export type RacesFaq = {
  question: string;
  answer: string;
};

/**
 * Race-index FAQ copy. The same strings render on /races and in FAQPage JSON-LD.
 * Answers only restate the guide inventory, starter states, and rating outlets
 * already stored on the race guides.
 */
export function racesHubFaqs(): RacesFaq[] {
  const senate = racesByChamber("senate");
  const governor = racesByChamber("governor");
  const house = racesByChamber("house");
  const stateNames = STARTER_STATES.map((state) => state.name);
  const outlets = uniqueInOrder(RACES.flatMap((race) => race.ratings.map((rating) => rating.outlet)));
  const oneHouseEach =
    STARTER_STATES.length > 0 &&
    STARTER_STATES.every((state) => house.filter((race) => race.state === state.code).length === 1);
  const houseTitles = joinList(house.map((race) => race.shortTitle));
  const housePhrase =
    house.length === 0
      ? ""
      : oneHouseEach
        ? ` — one selected district in each starter state (${houseTitles})`
        : house.length === 1
          ? ` — one selected district (${houseTitles})`
          : ` (${houseTitles})`;

  const coverage =
    RACES.length === 0
      ? "This hub does not yet publish a 2026 race guide. Use a state hub and the official sample ballot for every contest on your address."
      : `This hub lists ${RACES.length} race guides for the 2026 midterms across ${STARTER_STATES.length} starter states: ${joinList(stateNames)}. The set is ${senate.length} Class 2 U.S. Senate ${senate.length === 1 ? "guide" : "guides"}${senate.length ? ` (${joinList(senate.map((race) => stateName(race.state)))})` : ""}, ${governor.length} governor ${governor.length === 1 ? "guide" : "guides"}${governor.length ? ` (${joinList(governor.map((race) => stateName(race.state)))})` : ""}, and ${house.length} U.S. House ${house.length === 1 ? "guide" : "guides"}${housePhrase}. It is not a national list of every Senate, governor, or House contest. A House guide is an example district, not a lookup of your district. Local contests and the other House districts in these states are not covered in depth. Open a guide here, then confirm your official ballot with that state’s election office or its sample-ballot sketch.`;

  const ratings =
    outlets.length === 0
      ? `No named-outlet rating is stored on these guides. Party labels still only identify a ticket. They are not a ${SITE.name} endorsement.`
      : `No. Party labels identify which ticket a candidate is reported on. They are not a recommendation. A rating appears on a guide only when a named outlet has published a placement we can link. Outlets cited in this set are ${joinList(outlets)}. Each placement is a quotation of that outlet, with the date stored on the guide. It is not a ${SITE.name} endorsement and not a forecast. ${SITE.name} is operated by ${SITE.legalName}. It is not a campaign.`;

  return [
    {
      question: "What races does this hub cover for 2026?",
      answer: coverage,
    },
    {
      question: "Are party labels or ratings endorsements?",
      answer: ratings,
    },
    {
      question: "Where do candidate names come from, and how current are they?",
      answer:
        "Candidate names and short bios are compiled from cited public sources such as Ballotpedia, Wikipedia, and official pages. Each guide reports those names as declared or nominated figures as of mid-September 2026. They are not a certified candidate list from an election office. Other qualified names, including minor-party and write-in lines, may appear only on the official ballot. Confirm the final names with the state election office linked from the state hub or the sample-ballot page. Vote.gov is the federal starting point for registration and election-office links.",
    },
    {
      question: "How do I get from a race guide to a sample ballot, state hub, or polls?",
      answer:
        "Open a guide from this index. Each guide connects to its state hub and to that state’s sample-ballot sketch. State hubs link to the official election office. The sample-ballot pages are sectioned sketches, not the ballot your county issues. When a guide has a published survey we can cite, that survey is also on the polls hub, tagged to the same race. The results tracker is a separate page and does not certify winners. Start with the ballot lookup if you need the sketch for your starter state.",
    },
    {
      question: "Does this site predict who will win?",
      answer: `No. ${SITE.name} does not predict winners, average polls, or forecast control of the U.S. House, the U.S. Senate, or any governor’s office. Ratings stay attributed to the outlet that published them, even when the label says Tossup, Tilt, Lean, Likely, or Solid. Poll rows are individual published surveys. Election Day is ${SITE.electionDayLabel}. Nothing here becomes an official result until the state or county certifies the contest.`,
    },
    {
      question: "Is Map the Midterms an official election website?",
      answer: `No. ${SITE.name} is an informational site operated by ${SITE.legalName}, a ${SITE.entityType}. It is not a government, secretary of state, or county election website. Verify registration, sample ballots, districts, and voting rules with your state or county election office or with Vote.gov.`,
    },
  ];
}

export const RACES_HUB_FAQS: RacesFaq[] = racesHubFaqs();

function stateName(code: StateCode): string {
  return STARTER_STATES.find((state) => state.code === code)?.name ?? code;
}

function uniqueInOrder(items: string[]): string[] {
  const seen = new Set<string>();
  const unique: string[] = [];
  for (const item of items) {
    if (seen.has(item)) continue;
    seen.add(item);
    unique.push(item);
  }
  return unique;
}

function joinList(items: string[]): string {
  if (items.length === 0) return "none listed";
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}
