import { NATIONAL_GENERIC_BALLOT, POLLS } from "./polls";
import { RACES, getRace, racesByChamber } from "./races";
import { SITE } from "./site";

export type PollsFaq = {
  question: string;
  answer: string;
};

/**
 * Polls-hub FAQ copy. The same strings render on /polls and in FAQPage JSON-LD.
 * Answers only restate surveys, generic-ballot rows, rating outlets, and
 * race-guide titles already shown on the page.
 */
export function pollsHubFaqs(): PollsFaq[] {
  const outlets = uniqueInOrder(RACES.flatMap((race) => race.ratings.map((rating) => rating.outlet)));
  const house = racesByChamber("house");
  const houseWithRatings = house.filter((race) => race.ratings.length > 0);
  const taggedSlugs: string[] = [];
  for (const poll of POLLS) {
    if (!taggedSlugs.includes(poll.raceSlug)) taggedSlugs.push(poll.raceSlug);
  }
  const taggedTitles = taggedSlugs.map((slug) => getRace(slug)?.shortTitle ?? slug);
  const untagged = RACES.filter((race) => !taggedSlugs.includes(race.slug));
  const accessed = uniqueInOrder(
    [...POLLS, ...NATIONAL_GENERIC_BALLOT]
      .map((row) => row.source.accessed)
      .filter((date): date is string => Boolean(date)),
  );

  const surveyCount =
    POLLS.length === 0
      ? `The table does not currently list an individual published survey. ${SITE.name} does not publish a polling average on this page and does not forecast House, Senate, or governor control.`
      : `The table lists ${POLLS.length} individual published ${POLLS.length === 1 ? "survey" : "surveys"} we can cite. Each row shows the pollster, field dates, sample, and a source link. ${SITE.name} does not average those rows and does not turn them into a forecast of House, Senate, or governor control.`;

  const houseRatingNote =
    house.length === 0
      ? ""
      : houseWithRatings.length === 0
        ? ` None of the ${house.length} U.S. House ${house.length === 1 ? "guide" : "guides"} in this set ${house.length === 1 ? "stores" : "store"} a linkable rating, so ${house.length === 1 ? "that district does" : "those districts do"} not appear on the board.`
        : houseWithRatings.length === house.length
          ? " U.S. House guides appear on the board only in the column that matches a stored rating."
          : ` ${house.length - houseWithRatings.length} of the ${house.length} U.S. House guides do not store a linkable rating, so they do not appear on the board.`;

  const ratings =
    outlets.length === 0
      ? `No named-outlet rating is stored on the guides this site publishes, so the rating board has nothing to quote. That absence is not a ${SITE.name} forecast.`
      : `A guide appears on the rating board only when it stores a placement from a named outlet we can link. Outlets in the current set are ${joinList(outlets)}. The date under a rating is that outlet’s as-of date, not a rating assigned by ${SITE.name}.${houseRatingNote} A missing card is not an endorsement and not a claim that every outlet agrees.`;

  const generic =
    NATIONAL_GENERIC_BALLOT.length === 0
      ? `This page does not currently list a national generic-ballot survey. A generic congressional ballot, when a public source publishes one, asks which party someone would support for the U.S. House nationally. It is not a prediction of House control. For live aggregations, use RealClearPolitics and FiveThirtyEight / ABC News.`
      : `The national generic ballot section shows ${countWord(NATIONAL_GENERIC_BALLOT.length)} recent public ${NATIONAL_GENERIC_BALLOT.length === 1 ? "survey" : "surveys"} compiled via PollingSource: ${joinList(
          NATIONAL_GENERIC_BALLOT.map(
            (row) => `${row.label} (Dem ${row.dem}, Rep ${row.rep}; ${row.dates}; ${row.sample})`,
          ),
        )}. A generic congressional ballot asks which party someone would support for the U.S. House, nationally. These rows are not a ${SITE.name} average, not a prediction of which party will control the House, and not a result in any state or district. Check RealClearPolitics and FiveThirtyEight / ABC News for live aggregations.`;

  const accessedPhrase =
    accessed.length === 0
      ? "the access date stored on each citation"
      : accessed.length === 1
        ? accessed[0]
        : `the dates stored with each citation (${joinList(accessed)})`;

  const untaggedAreHouseOnly =
    taggedTitles.length > 0 &&
    untagged.length > 0 &&
    untagged.every((race) => race.chamber === "house") &&
    house.length > 0 &&
    house.every((race) => untagged.some((item) => item.slug === race.slug));

  const relation =
    POLLS.length === 0
      ? "No individual published survey is tagged to a race guide on this page. An empty table is not a forecast. Race guides still point to RealClearPolitics and FiveThirtyEight / ABC News for live aggregations."
      : untaggedAreHouseOnly
        ? `Each survey is tagged to one race guide. Senate and governor guides in this set are the ones with at least one cited survey here: ${joinList(taggedTitles)}. The ${untagged.length} U.S. House district ${untagged.length === 1 ? "guide" : "guides"} (${joinList(untagged.map((race) => race.shortTitle))}) ${untagged.length === 1 ? "does" : "do"} not have a cited survey on this page. The race name in the table opens the matching guide, where the same survey can appear under Published polls. On a House guide, an empty poll table is not a forecast. The guide points to RealClearPolitics and FiveThirtyEight / ABC News instead.`
        : untagged.length === 0
          ? `Each survey is tagged to one race guide. Every guide in the race index has at least one cited survey here: ${joinList(taggedTitles)}. The race name in the table opens that guide, where the same survey can appear under Published polls.`
          : `Each survey is tagged to one race guide. Guides with at least one cited survey on this page are ${joinList(taggedTitles)}. The race name in the table opens that guide, where the same survey can appear under Published polls. Guides without a cited survey here are ${joinList(untagged.map((race) => race.shortTitle))}. On a guide with no individual survey we can cite, the empty table is not a forecast. That guide points to RealClearPolitics and FiveThirtyEight / ABC News instead.`;

  return [
    {
      question: "Is this page a polling average or a forecast of control?",
      answer: `No. ${surveyCount} The rating board is separate. It quotes named outlets. It is not a prediction from this site. For live aggregations, use RealClearPolitics and FiveThirtyEight / ABC News, which this page already links.`,
    },
    {
      question: "Whose race ratings appear here, and what do the dates mean?",
      answer: ratings,
    },
    {
      question: "What does the national generic ballot section mean?",
      answer: generic,
    },
    {
      question: "How current are these polls, and where are live aggregations?",
      answer: `This page is not a live feed, and ${SITE.name} does not refresh it on a fixed schedule. The surveys and generic-ballot rows cite public sources accessed ${accessedPhrase}. A newer poll can show up at the source link on a row, or at the live aggregators already linked here: RealClearPolitics, including its generic congressional ballot, and FiveThirtyEight / ABC News. Those sites are independent of this page. A figure you see there is not a ${SITE.name} average.`,
    },
    {
      question: "How do these polls relate to individual race guides?",
      answer: relation,
    },
    {
      question: "Is Map the Midterms an official election website or a pollster?",
      answer: `No. ${SITE.name} is an informational site operated by ${SITE.legalName}, a ${SITE.entityType}. It does not conduct polls. It is not a campaign, and it is not a government, secretary of state, or county election website. Verify registration, sample ballots, and voting rules with your state or county election office or with Vote.gov.`,
    },
  ];
}

export const POLLS_HUB_FAQS: PollsFaq[] = pollsHubFaqs();

function countWord(count: number): string {
  const words = ["zero", "one", "two", "three", "four", "five", "six"];
  return words[count] ?? String(count);
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
