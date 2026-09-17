import type { CandidatePlaceholder, RaceGuide, StateCode } from "./types";

const DEMO_NOTE =
  "Placeholder line only. Not a filed candidate, not an endorsement, and not a prediction. Replace when certified nominee lists exist.";

function demoPair(): CandidatePlaceholder[] {
  return [
    {
      label: "Democratic nominee (TBD — demo)",
      party: "DEM",
      partyLabel: "Democratic",
      isDemo: true,
      note: DEMO_NOTE,
    },
    {
      label: "Republican nominee (TBD — demo)",
      party: "REP",
      partyLabel: "Republican",
      isDemo: true,
      note: DEMO_NOTE,
    },
  ];
}

const RATING_NOTE =
  "Illustrative / editorial demo rating for layout only. Not a live forecast and not labeled as a house rating product.";

export const RACES: RaceGuide[] = [
  {
    slug: "ga-senate-2026",
    state: "GA",
    chamber: "senate",
    office: "U.S. Senate",
    title: "Georgia U.S. Senate — 2026 (Class 2)",
    shortTitle: "GA Senate",
    featured: true,
    currentOfficeholderNote:
      "This Class 2 seat is publicly identified with the current officeholder for orientation only. 2026 nominees are not presented as certified on this page.",
    overview:
      "Georgia’s Class 2 Senate seat is on the 2026 cycle. This guide is a structured template: office, calendar, and how to read later poll or results modules. It is not a voting recommendation.",
    whatIsOnTheLine:
      "One of Georgia’s two U.S. Senate seats. The winner serves a six-year term if certified by official authorities after the election.",
    howToRead:
      "Use this page to understand the office and to jump to the Georgia ballot hub, demo poll table, and results shell. Party labels identify tickets only.",
    candidates: demoPair(),
    rating: "Tossup",
    ratingIsDemo: true,
    ratingNote: RATING_NOTE,
    relatedPollSlugs: ["ga-senate-demo-1", "ga-senate-demo-2"],
    ballotSections: ["federal"],
  },
  {
    slug: "mi-senate-2026",
    state: "MI",
    chamber: "senate",
    office: "U.S. Senate",
    title: "Michigan U.S. Senate — 2026 (Class 2)",
    shortTitle: "MI Senate",
    featured: true,
    currentOfficeholderNote:
      "This Class 2 seat is publicly identified with the current officeholder for orientation only. 2026 nominees are not presented as certified on this page.",
    overview:
      "Michigan’s Class 2 Senate seat is on the 2026 cycle. Midterm Map lists the office and links related tools. Candidate rows below are demo placeholders.",
    whatIsOnTheLine:
      "One U.S. Senate seat for Michigan. Certification and any recounts are handled by Michigan election authorities, not this site.",
    howToRead:
      "Cross-check the Michigan state hub and your county sample ballot. Ratings on this site are editorial illustrations until labeled otherwise.",
    candidates: demoPair(),
    rating: "Lean D",
    ratingIsDemo: true,
    ratingNote: RATING_NOTE,
    relatedPollSlugs: ["mi-senate-demo-1"],
    ballotSections: ["federal"],
  },
  {
    slug: "nc-senate-2026",
    state: "NC",
    chamber: "senate",
    office: "U.S. Senate",
    title: "North Carolina U.S. Senate — 2026 (Class 2)",
    shortTitle: "NC Senate",
    featured: true,
    currentOfficeholderNote:
      "This Class 2 seat is publicly identified with the current officeholder for orientation only. 2026 nominees are not presented as certified on this page.",
    overview:
      "North Carolina’s Class 2 Senate seat is on the 2026 ballot. This page is a race-guide template with demo rating and poll hooks.",
    whatIsOnTheLine:
      "One U.S. Senate seat. North Carolina’s State Board of Elections is the official source for candidate lists and results.",
    howToRead:
      "Treat names below as layout fixtures. When real certified lists exist, they should replace this module and keep the demo label off.",
    candidates: demoPair(),
    rating: "Lean R",
    ratingIsDemo: true,
    ratingNote: RATING_NOTE,
    relatedPollSlugs: ["nc-senate-demo-1"],
    ballotSections: ["federal"],
  },
  {
    slug: "tx-senate-2026",
    state: "TX",
    chamber: "senate",
    office: "U.S. Senate",
    title: "Texas U.S. Senate — 2026 (Class 2)",
    shortTitle: "TX Senate",
    featured: true,
    currentOfficeholderNote:
      "This Class 2 seat is publicly identified with the current officeholder for orientation only. 2026 nominees are not presented as certified on this page.",
    overview:
      "Texas’s Class 2 Senate seat is on the 2026 cycle. Midterm Map provides a neutral office explainer and links into ballot, polls, and results shells.",
    whatIsOnTheLine:
      "One U.S. Senate seat for Texas. Official canvass is a state function.",
    howToRead:
      "Party labels are nominative. Nothing here is an endorsement or a fundraising ask.",
    candidates: demoPair(),
    rating: "Likely R",
    ratingIsDemo: true,
    ratingNote: RATING_NOTE,
    relatedPollSlugs: ["tx-senate-demo-1"],
    ballotSections: ["federal"],
  },
  {
    slug: "az-governor-2026",
    state: "AZ",
    chamber: "governor",
    office: "Governor",
    title: "Arizona Governor — 2026",
    shortTitle: "AZ Governor",
    featured: true,
    overview:
      "Arizona elects a governor in 2026. This template covers the office and points you to official county sample ballots for the certified candidate list.",
    whatIsOnTheLine:
      "The state’s chief executive for a four-year term, subject to Arizona’s official election and certification process.",
    howToRead:
      "Statewide executive races often share a ballot with other constitutional offices. Confirm the full slate with your county recorder.",
    candidates: demoPair(),
    rating: "Tossup",
    ratingIsDemo: true,
    ratingNote: RATING_NOTE,
    relatedPollSlugs: ["az-gov-demo-1"],
    ballotSections: ["statewide"],
  },
  {
    slug: "ga-governor-2026",
    state: "GA",
    chamber: "governor",
    office: "Governor",
    title: "Georgia Governor — 2026",
    shortTitle: "GA Governor",
    featured: false,
    overview:
      "Georgia’s governor is on the 2026 cycle. Use this page as a hub into Georgia ballot structure and the results shell.",
    whatIsOnTheLine:
      "Georgia’s chief executive. Primary calendars and runoff rules are official Georgia procedures.",
    howToRead:
      "If Georgia uses a runoff in a given contest, official sources — not this site — determine qualification and dates.",
    candidates: demoPair(),
    rating: "Likely R",
    ratingIsDemo: true,
    ratingNote: RATING_NOTE,
    relatedPollSlugs: ["ga-gov-demo-1"],
    ballotSections: ["statewide"],
  },
  {
    slug: "mi-governor-2026",
    state: "MI",
    chamber: "governor",
    office: "Governor",
    title: "Michigan Governor — 2026",
    shortTitle: "MI Governor",
    featured: false,
    overview:
      "Michigan elects a governor in 2026. This guide is informational and does not rank candidates for your vote.",
    whatIsOnTheLine:
      "Michigan’s chief executive, together with separately elected statewide offices that may appear on the same ballot.",
    howToRead:
      "Compare this page with the Michigan ballot hub. Local clerks publish the contests that actually appear in your precinct.",
    candidates: demoPair(),
    rating: "Lean D",
    ratingIsDemo: true,
    ratingNote: RATING_NOTE,
    relatedPollSlugs: ["mi-gov-demo-1"],
    ballotSections: ["statewide"],
  },
  {
    slug: "nv-governor-2026",
    state: "NV",
    chamber: "governor",
    office: "Governor",
    title: "Nevada Governor — 2026",
    shortTitle: "NV Governor",
    featured: false,
    overview:
      "Nevada’s governor is on the 2026 cycle. County clerks mail or issue the ballot that controls what you see.",
    whatIsOnTheLine:
      "Nevada’s chief executive. Term and eligibility rules are in the Nevada Constitution and statutes.",
    howToRead:
      "Demo ratings are layout examples. Do not treat them as a forecast service.",
    candidates: demoPair(),
    rating: "Tossup",
    ratingIsDemo: true,
    ratingNote: RATING_NOTE,
    relatedPollSlugs: ["nv-gov-demo-1"],
    ballotSections: ["statewide"],
  },
  {
    slug: "oh-governor-2026",
    state: "OH",
    chamber: "governor",
    office: "Governor",
    title: "Ohio Governor — 2026",
    shortTitle: "OH Governor",
    featured: true,
    overview:
      "Ohio elects a governor in 2026, typically on a ticket with lieutenant governor under state law. Confirm pairing on the official ballot.",
    whatIsOnTheLine:
      "Ohio’s chief executive. Certification is performed by Ohio election authorities.",
    howToRead:
      "This page links polls and results shells for the same office. All three remain demo until live feeds exist.",
    candidates: demoPair(),
    rating: "Likely R",
    ratingIsDemo: true,
    ratingNote: RATING_NOTE,
    relatedPollSlugs: ["oh-gov-demo-1"],
    ballotSections: ["statewide"],
  },
  {
    slug: "pa-governor-2026",
    state: "PA",
    chamber: "governor",
    office: "Governor",
    title: "Pennsylvania Governor — 2026",
    shortTitle: "PA Governor",
    featured: true,
    overview:
      "Pennsylvania’s governor is on the 2026 cycle. County election offices produce the precinct ballot you will actually use.",
    whatIsOnTheLine:
      "Pennsylvania’s chief executive. Other row offices may appear on the same statewide ballot.",
    howToRead:
      "Use the Pennsylvania state hub for voting-process notes. This race page is not legal advice.",
    candidates: demoPair(),
    rating: "Tossup",
    ratingIsDemo: true,
    ratingNote: RATING_NOTE,
    relatedPollSlugs: ["pa-gov-demo-1"],
    ballotSections: ["statewide"],
  },
  {
    slug: "wi-governor-2026",
    state: "WI",
    chamber: "governor",
    office: "Governor",
    title: "Wisconsin Governor — 2026",
    shortTitle: "WI Governor",
    featured: true,
    overview:
      "Wisconsin elects a governor in 2026. Municipal clerks are the official source for your ward’s sample ballot.",
    whatIsOnTheLine:
      "Wisconsin’s chief executive, alongside other constitutional offices that may share the ballot.",
    howToRead:
      "Party labels identify tickets. Midterm Map does not endorse any candidate or party.",
    candidates: demoPair(),
    rating: "Tossup",
    ratingIsDemo: true,
    ratingNote: RATING_NOTE,
    relatedPollSlugs: ["wi-gov-demo-1"],
    ballotSections: ["statewide"],
  },
  {
    slug: "fl-governor-2026",
    state: "FL",
    chamber: "governor",
    office: "Governor",
    title: "Florida Governor — 2026",
    shortTitle: "FL Governor",
    featured: false,
    overview:
      "Florida elects a governor in 2026. Supervisors of elections publish county sample ballots and polling information.",
    whatIsOnTheLine:
      "Florida’s chief executive. Cabinet offices may also appear statewide.",
    howToRead:
      "Verify amendment summaries and candidate names on the official Florida ballot, not on this template.",
    candidates: demoPair(),
    rating: "Likely R",
    ratingIsDemo: true,
    ratingNote: RATING_NOTE,
    relatedPollSlugs: ["fl-gov-demo-1"],
    ballotSections: ["statewide"],
  },
  {
    slug: "ca-governor-2026",
    state: "CA",
    chamber: "governor",
    office: "Governor",
    title: "California Governor — 2026",
    shortTitle: "CA Governor",
    featured: false,
    overview:
      "California elects a governor in 2026. County elections officials issue the vote-by-mail and polling-place ballots that control contests.",
    whatIsOnTheLine:
      "California’s chief executive. Statewide constitutional offices often share the ballot.",
    howToRead:
      "Proposition text, if any, is official state language. This site will not rewrite certified measure titles as if they were ours.",
    candidates: demoPair(),
    rating: "Likely D",
    ratingIsDemo: true,
    ratingNote: RATING_NOTE,
    relatedPollSlugs: ["ca-gov-demo-1"],
    ballotSections: ["statewide"],
  },
  {
    slug: "ny-governor-2026",
    state: "NY",
    chamber: "governor",
    office: "Governor",
    title: "New York Governor — 2026",
    shortTitle: "NY Governor",
    featured: false,
    overview:
      "New York elects a governor in 2026. County boards of elections (and the New York City Board of Elections) are the official ballot source.",
    whatIsOnTheLine:
      "New York’s chief executive. Lieutenant governor pairing, if any, follows New York law and the official ballot.",
    howToRead:
      "Fusion or additional party lines, if they appear, will be shown on the official ballot — not invented here.",
    candidates: demoPair(),
    rating: "Likely D",
    ratingIsDemo: true,
    ratingNote: RATING_NOTE,
    relatedPollSlugs: ["ny-gov-demo-1"],
    ballotSections: ["statewide"],
  },
  {
    slug: "tx-governor-2026",
    state: "TX",
    chamber: "governor",
    office: "Governor",
    title: "Texas Governor — 2026",
    shortTitle: "TX Governor",
    featured: false,
    overview:
      "Texas elects a governor in 2026. County election administrators publish the precinct-level sample ballot.",
    whatIsOnTheLine:
      "Texas’s chief executive. Other statewide offices may appear on the same ballot.",
    howToRead:
      "Primary calendars in Texas are official party and state processes. This page does not list primary fields.",
    candidates: demoPair(),
    rating: "Solid R",
    ratingIsDemo: true,
    ratingNote: RATING_NOTE,
    relatedPollSlugs: ["tx-gov-demo-1"],
    ballotSections: ["statewide"],
  },
  {
    slug: "az-01-house-2026",
    state: "AZ",
    chamber: "house",
    office: "U.S. House",
    district: "1",
    title: "Arizona 1st Congressional District — 2026",
    shortTitle: "AZ-01",
    featured: false,
    overview:
      "A sample U.S. House district page for Arizona. District lines are defined by official maps. Your address — not this site — determines the district on your ballot.",
    whatIsOnTheLine:
      "One seat in the U.S. House of Representatives for a two-year term.",
    howToRead:
      "House pages on Midterm Map are templates. Confirm the district number on your county sample ballot.",
    candidates: demoPair(),
    rating: "Lean R",
    ratingIsDemo: true,
    ratingNote: RATING_NOTE,
    relatedPollSlugs: ["az-01-demo-1"],
    ballotSections: ["federal"],
  },
  {
    slug: "ga-07-house-2026",
    state: "GA",
    chamber: "house",
    office: "U.S. House",
    district: "7",
    title: "Georgia 7th Congressional District — 2026",
    shortTitle: "GA-07",
    featured: false,
    overview:
      "A sample U.S. House district page for Georgia. Treat the district number as a routing example until address-level lookup exists.",
    whatIsOnTheLine: "One U.S. House seat for two years.",
    howToRead:
      "Do not assume you live in GA-07 because you opened this page. Use official lookup tools.",
    candidates: demoPair(),
    rating: "Tossup",
    ratingIsDemo: true,
    ratingNote: RATING_NOTE,
    relatedPollSlugs: ["ga-07-demo-1"],
    ballotSections: ["federal"],
  },
  {
    slug: "mi-07-house-2026",
    state: "MI",
    chamber: "house",
    office: "U.S. House",
    district: "7",
    title: "Michigan 7th Congressional District — 2026",
    shortTitle: "MI-07",
    featured: false,
    overview:
      "A sample Michigan House district guide. Michigan’s maps are official public records; this page does not assign you a district.",
    whatIsOnTheLine: "One U.S. House seat for two years.",
    howToRead:
      "Open the Michigan ballot hub and your clerk’s sample ballot for the district that matches your registration.",
    candidates: demoPair(),
    rating: "Tossup",
    ratingIsDemo: true,
    ratingNote: RATING_NOTE,
    relatedPollSlugs: ["mi-07-demo-1"],
    ballotSections: ["federal"],
  },
  {
    slug: "nc-01-house-2026",
    state: "NC",
    chamber: "house",
    office: "U.S. House",
    district: "1",
    title: "North Carolina 1st Congressional District — 2026",
    shortTitle: "NC-01",
    featured: false,
    overview:
      "A sample North Carolina House district page. Maps can change through official legal processes; always verify the current map.",
    whatIsOnTheLine: "One U.S. House seat for two years.",
    howToRead:
      "The State Board of Elections and your county board confirm district assignment.",
    candidates: demoPair(),
    rating: "Lean D",
    ratingIsDemo: true,
    ratingNote: RATING_NOTE,
    relatedPollSlugs: ["nc-01-demo-1"],
    ballotSections: ["federal"],
  },
  {
    slug: "nv-03-house-2026",
    state: "NV",
    chamber: "house",
    office: "U.S. House",
    district: "3",
    title: "Nevada 3rd Congressional District — 2026",
    shortTitle: "NV-03",
    featured: false,
    overview:
      "A sample Nevada House district page. Clark County and other clerks publish the district that appears on your mail ballot.",
    whatIsOnTheLine: "One U.S. House seat for two years.",
    howToRead:
      "Demo poll rows attached to this race are labeled and are not a polling average.",
    candidates: demoPair(),
    rating: "Tossup",
    ratingIsDemo: true,
    ratingNote: RATING_NOTE,
    relatedPollSlugs: ["nv-03-demo-1"],
    ballotSections: ["federal"],
  },
  {
    slug: "oh-09-house-2026",
    state: "OH",
    chamber: "house",
    office: "U.S. House",
    district: "9",
    title: "Ohio 9th Congressional District — 2026",
    shortTitle: "OH-09",
    featured: false,
    overview:
      "A sample Ohio House district page. County boards of elections assign the district printed on your ballot.",
    whatIsOnTheLine: "One U.S. House seat for two years.",
    howToRead:
      "This is not a claim that OH-09 is the most competitive Ohio district. It is a template route.",
    candidates: demoPair(),
    rating: "Tossup",
    ratingIsDemo: true,
    ratingNote: RATING_NOTE,
    relatedPollSlugs: ["oh-09-demo-1"],
    ballotSections: ["federal"],
  },
  {
    slug: "pa-07-house-2026",
    state: "PA",
    chamber: "house",
    office: "U.S. House",
    district: "7",
    title: "Pennsylvania 7th Congressional District — 2026",
    shortTitle: "PA-07",
    featured: true,
    overview:
      "A sample Pennsylvania House district page used to demonstrate race-guide layout and cross-links.",
    whatIsOnTheLine: "One U.S. House seat for two years.",
    howToRead:
      "Confirm district lines with official Pennsylvania or county tools before treating this page as your race.",
    candidates: demoPair(),
    rating: "Tossup",
    ratingIsDemo: true,
    ratingNote: RATING_NOTE,
    relatedPollSlugs: ["pa-07-demo-1"],
    ballotSections: ["federal"],
  },
  {
    slug: "wi-03-house-2026",
    state: "WI",
    chamber: "house",
    office: "U.S. House",
    district: "3",
    title: "Wisconsin 3rd Congressional District — 2026",
    shortTitle: "WI-03",
    featured: false,
    overview:
      "A sample Wisconsin House district page. Your municipal clerk’s sample ballot is the authority for district and candidate names.",
    whatIsOnTheLine: "One U.S. House seat for two years.",
    howToRead:
      "Ratings are editorial illustrations. They are not a Wisconsin Elections Commission product.",
    candidates: demoPair(),
    rating: "Lean R",
    ratingIsDemo: true,
    ratingNote: RATING_NOTE,
    relatedPollSlugs: ["wi-03-demo-1"],
    ballotSections: ["federal"],
  },
  {
    slug: "tx-15-house-2026",
    state: "TX",
    chamber: "house",
    office: "U.S. House",
    district: "15",
    title: "Texas 15th Congressional District — 2026",
    shortTitle: "TX-15",
    featured: false,
    overview:
      "A sample Texas House district page. Texas has many districts; this one is included as a template, not as your assigned district.",
    whatIsOnTheLine: "One U.S. House seat for two years.",
    howToRead:
      "Use the Texas Secretary of State or your county elections site for official district lookup.",
    candidates: demoPair(),
    rating: "Lean R",
    ratingIsDemo: true,
    ratingNote: RATING_NOTE,
    relatedPollSlugs: ["tx-15-demo-1"],
    ballotSections: ["federal"],
  },
  {
    slug: "fl-13-house-2026",
    state: "FL",
    chamber: "house",
    office: "U.S. House",
    district: "13",
    title: "Florida 13th Congressional District — 2026",
    shortTitle: "FL-13",
    featured: false,
    overview:
      "A sample Florida House district page. Supervisors of elections print the district that matches your registration.",
    whatIsOnTheLine: "One U.S. House seat for two years.",
    howToRead:
      "Florida’s official sample ballot — not this guide — lists qualified candidates.",
    candidates: demoPair(),
    rating: "Likely R",
    ratingIsDemo: true,
    ratingNote: RATING_NOTE,
    relatedPollSlugs: ["fl-13-demo-1"],
    ballotSections: ["federal"],
  },
  {
    slug: "ca-13-house-2026",
    state: "CA",
    chamber: "house",
    office: "U.S. House",
    district: "13",
    title: "California 13th Congressional District — 2026",
    shortTitle: "CA-13",
    featured: false,
    overview:
      "A sample California House district page. California’s top-two primary can send two candidates of the same party to the general; that outcome is official, not something this demo invents.",
    whatIsOnTheLine: "One U.S. House seat for two years.",
    howToRead:
      "When real certified lists exist, replace the demo pair and describe the actual November matchup without endorsement language.",
    candidates: demoPair(),
    rating: "Lean D",
    ratingIsDemo: true,
    ratingNote: RATING_NOTE,
    relatedPollSlugs: ["ca-13-demo-1"],
    ballotSections: ["federal"],
  },
  {
    slug: "ny-22-house-2026",
    state: "NY",
    chamber: "house",
    office: "U.S. House",
    district: "22",
    title: "New York 22nd Congressional District — 2026",
    shortTitle: "NY-22",
    featured: false,
    overview:
      "A sample New York House district page. County boards of elections assign the district on your ballot.",
    whatIsOnTheLine: "One U.S. House seat for two years.",
    howToRead:
      "Additional party lines, if any, will appear on the official New York ballot.",
    candidates: demoPair(),
    rating: "Tossup",
    ratingIsDemo: true,
    ratingNote: RATING_NOTE,
    relatedPollSlugs: ["ny-22-demo-1"],
    ballotSections: ["federal"],
  },
];

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
