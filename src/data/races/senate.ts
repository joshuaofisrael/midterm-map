import type { RaceGuide } from "../types";
import { cite } from "../sources";
import { photo } from "../candidateImages";
import {
  clerkNominees,
  gaRunoff,
  gaWriteIn,
  listCandidate,
  miList,
  ncList,
  txCert,
} from "../officialLists";
import {
  BP_GA_SENATE,
  BP_MI_SENATE,
  BP_NC_SENATE,
  BP_TX_SENATE,
  cook,
  cookSenatePrint,
  decisionDesk,
  insideElections,
  sabato,
  senateAggregators,
  senateOfficeExplainer,
  standardFaqs,
} from "./helpers";

const cookSenateUrl = "https://www.cookpolitical.com/print/ratings/races/senate";

const NAMES =
  "Names below are taken from the election-office list cited on each card. Party labels follow that list. This page is not a certification.";

export const SENATE_RACES: RaceGuide[] = [
  {
    slug: "ga-senate-2026",
    state: "GA",
    chamber: "senate",
    office: "U.S. Senate",
    title: "Georgia U.S. Senate — 2026 (Class 2)",
    shortTitle: "GA Senate",
    featured: true,
    incumbentNote:
      "The Clerk’s nominee list marks Jon Ossoff with an asterisk for an incumbent in the 119th Congress.",
    overview:
      "Georgia’s Class 2 Senate seat is on the November 3, 2026 ballot. The Clerk of the House nominee list names Mike Collins (Republican) and Jon Ossoff (Democrat). The Secretary of State’s official June 16, 2026 Republican runoff results list Mike Collins with 390,174 votes (55.54 percent) and Derek Dooley with 312,339 votes (44.46 percent). The certified write-in list names Elbert Arthur Bartell, Christina Clement, and Cassandra Easton.",
    officeExplainer: senateOfficeExplainer,
    whyItMatters:
      "Georgia is one of a small set of 2026 Senate contests that nonpartisan analysts treat as competitive. Control of the 100-seat Senate in 2027 depends on several states, not this race alone. Official candidate lists and any runoff calendar are set by Georgia election law, not by this site.",
    howToRead: NAMES,
    candidatesIntro: NAMES,
    candidates: [
      listCandidate({
        name: "Jon Ossoff",
        party: "DEM",
        partyLabel: "Democrat",
        incumbent: true,
        bio: "The Clerk of the House nominee list for the November 3, 2026 election names Jon Ossoff, Democrat, for U.S. senator from Georgia, and marks him as an incumbent in the 119th Congress.",
        image: photo("jon-ossoff"),
        sources: [clerkNominees],
      }),
      listCandidate({
        name: "Mike Collins",
        party: "REP",
        partyLabel: "Republican",
        bio: "The Clerk of the House nominee list names Mike Collins, Republican, for U.S. senator from Georgia. The Secretary of State’s official results for the June 16, 2026 Republican primary runoff list him with 390,174 votes (55.54 percent) and Derek Dooley with 312,339 votes (44.46 percent).",
        image: photo("mike-collins"),
        sources: [clerkNominees, gaRunoff],
      }),
      listCandidate({
        name: "Elbert Arthur Bartell",
        party: "OTH",
        partyLabel: "Certified write-in",
        bio: "The Secretary of State’s certified write-in list for the November 3, 2026 general election names Elbert Arthur Bartell for U.S. Senate.",
        sources: [gaWriteIn],
      }),
      listCandidate({
        name: "Christina Clement",
        party: "OTH",
        partyLabel: "Certified write-in",
        bio: "The Secretary of State’s certified write-in list for the November 3, 2026 general election names Christina Clement for U.S. Senate.",
        sources: [gaWriteIn],
      }),
      listCandidate({
        name: "Cassandra Easton",
        party: "OTH",
        partyLabel: "Certified write-in",
        bio: "The Secretary of State’s certified write-in list for the November 3, 2026 general election names Cassandra Easton for U.S. Senate.",
        sources: [gaWriteIn],
      }),
    ],
    ratings: [
      cook("Lean D", "September 8, 2026", cookSenateUrl),
      insideElections("Tilt D", "September 8, 2026", "https://www.insideelections.com/"),
      sabato("Likely D", "September 8, 2026", "https://centerforpolitics.org/crystalball/"),
      decisionDesk("Likely D", "September 8, 2026", "https://decisiondeskhq.com/"),
    ],
    sources: [clerkNominees, gaRunoff, gaWriteIn, cookSenatePrint],
    aggregatorLinks: senateAggregators(
      BP_GA_SENATE,
      "https://www.realclearpolitics.com/epolls/2026/senate/ga/2026_georgia_senate_collins_vs_ossoff-8718.html",
    ),
    relatedPollSlugs: [
      "ga-senate-quantus-2026-09",
      "ga-senate-tipp-2026-08",
      "ga-senate-aarp-2026-07",
      "ga-senate-fox-2026-06",
      "ga-senate-cygnal-2026-05",
      "ga-senate-trafalgar-2026-04",
    ],
    ballotSections: ["federal"],
    ballotNomineeNote:
      "Names on the GA Senate race guide are the Clerk of the House nominee list for November 3, 2026, the Secretary of State’s official June 16, 2026 Republican runoff results, and the certified write-in list. That is not a vote total for November.",
    faqs: standardFaqs("this Senate race", "the Georgia Secretary of State"),
  },
  {
    slug: "mi-senate-2026",
    state: "MI",
    chamber: "senate",
    office: "U.S. Senate",
    title: "Michigan U.S. Senate — 2026 (Class 2)",
    shortTitle: "MI Senate",
    featured: true,
    incumbentNote:
      "The Bureau of Elections candidate listing for U.S. Senate does not include Gary Peters.",
    overview:
      "Michigan’s Class 2 Senate seat is on the November 3, 2026 ballot. The Bureau of Elections official candidate listing names Abdul El-Sayed (Democratic Party), Mike Rogers (Republican Party), Lydia Christensen (Libertarian Party), Tim Long (U.S. Taxpayers Party), Douglas P. Marsh (Green Party), and Walter P. Kristy (Natural Law Party).",
    officeExplainer: senateOfficeExplainer,
    whyItMatters:
      "Cook Political Report rated the Michigan seat a toss-up as of its August 20, 2026 print chart. A change here would affect the 2027 Senate math. Names on this page are the Bureau of Elections listing.",
    howToRead: NAMES,
    candidatesIntro: NAMES,
    candidates: [
      listCandidate({
        name: "Abdul El-Sayed",
        party: "DEM",
        partyLabel: "Democratic Party",
        bio: "The Bureau of Elections official candidate listing for the November 3, 2026 general election names El-Sayed, Abdul, for U.S. Senate, Democratic Party.",
        image: photo("abdul-el-sayed"),
        sources: [miList],
      }),
      listCandidate({
        name: "Mike Rogers",
        party: "REP",
        partyLabel: "Republican Party",
        bio: "The Bureau of Elections official candidate listing for the November 3, 2026 general election names Rogers, Mike, for U.S. Senate, Republican Party.",
        image: photo("mike-rogers"),
        sources: [miList],
      }),
      listCandidate({
        name: "Lydia Christensen",
        party: "LIB",
        partyLabel: "Libertarian Party",
        bio: "The Bureau of Elections official candidate listing for the November 3, 2026 general election names Christensen, Lydia, for U.S. Senate, Libertarian Party.",
        sources: [miList],
      }),
      listCandidate({
        name: "Tim Long",
        party: "OTH",
        partyLabel: "U.S. Taxpayers Party",
        bio: "The Bureau of Elections official candidate listing for the November 3, 2026 general election names Long, Tim, for U.S. Senate, U.S. Taxpayers Party.",
        sources: [miList],
      }),
      listCandidate({
        name: "Douglas P. Marsh",
        party: "GRN",
        partyLabel: "Green Party",
        bio: "The Bureau of Elections official candidate listing for the November 3, 2026 general election names Marsh, Douglas P., for U.S. Senate, Green Party.",
        sources: [miList],
      }),
      listCandidate({
        name: "Walter P. Kristy",
        party: "OTH",
        partyLabel: "Natural Law Party",
        bio: "The Bureau of Elections official candidate listing for the November 3, 2026 general election names Kristy, Walter P., for U.S. Senate, Natural Law Party.",
        sources: [miList],
      }),
    ],
    ratings: [cook("Tossup", "August 20, 2026", cookSenateUrl)],
    sources: [miList, cookSenatePrint],
    aggregatorLinks: senateAggregators(BP_MI_SENATE),
    relatedPollSlugs: ["mi-senate-emerson-2026-09"],
    ballotSections: ["federal"],
    ballotNomineeNote:
      "Names on the MI Senate race guide are the U.S. Senate rows on the Michigan Bureau of Elections official candidate listing for the November 3, 2026 general election.",
    faqs: standardFaqs("this Senate race", "the Michigan Secretary of State"),
  },
  {
    slug: "nc-senate-2026",
    state: "NC",
    chamber: "senate",
    office: "U.S. Senate",
    title: "North Carolina U.S. Senate — 2026 (Class 2)",
    shortTitle: "NC Senate",
    featured: true,
    incumbentNote:
      "The State Board of Elections general candidate list for U.S. Senate does not include Thom Tillis.",
    overview:
      "North Carolina’s Class 2 Senate seat is on the November 3, 2026 ballot. The State Board of Elections general candidate list names Roy Cooper (DEM), Michael Whatley (REP), Shannon W. Bray (LIB), and Michael Dublin (GRE).",
    officeExplainer: senateOfficeExplainer,
    whyItMatters:
      "Cook’s August 20, 2026 print chart placed the North Carolina seat in Lean Democratic. Official results will come from the State Board of Elections.",
    howToRead: NAMES,
    candidatesIntro: NAMES,
    candidates: [
      listCandidate({
        name: "Roy Cooper",
        party: "DEM",
        partyLabel: "DEM",
        bio: "The State Board of Elections 2026 general candidate list names Roy Cooper for U.S. Senate with party code DEM.",
        image: photo("roy-cooper"),
        sources: [ncList],
      }),
      listCandidate({
        name: "Michael Whatley",
        party: "REP",
        partyLabel: "REP",
        bio: "The State Board of Elections 2026 general candidate list names Michael Whatley for U.S. Senate with party code REP.",
        sources: [ncList],
      }),
      listCandidate({
        name: "Shannon W. Bray",
        party: "LIB",
        partyLabel: "LIB",
        bio: "The State Board of Elections 2026 general candidate list names Shannon W. Bray for U.S. Senate with party code LIB.",
        sources: [ncList],
      }),
      listCandidate({
        name: "Michael Dublin",
        party: "GRN",
        partyLabel: "GRE",
        bio: "The State Board of Elections 2026 general candidate list names Michael Dublin for U.S. Senate with party code GRE.",
        sources: [ncList],
      }),
    ],
    ratings: [cook("Lean D", "August 20, 2026", cookSenateUrl)],
    sources: [ncList, cookSenatePrint],
    aggregatorLinks: senateAggregators(BP_NC_SENATE),
    relatedPollSlugs: ["nc-senate-elon-2026-08"],
    ballotSections: ["federal"],
    ballotNomineeNote:
      "Names on the NC Senate race guide are the U.S. Senate rows on the State Board of Elections 2026 general candidate list. Street addresses on that file are not reprinted here.",
    faqs: standardFaqs("this Senate race", "the North Carolina State Board of Elections"),
  },
  {
    slug: "tx-senate-2026",
    state: "TX",
    chamber: "senate",
    office: "U.S. Senate",
    title: "Texas U.S. Senate — 2026 (Class 2)",
    shortTitle: "TX Senate",
    featured: true,
    incumbentNote:
      "The Secretary of State’s 2026 ballot certification for U.S. Senator does not include John Cornyn.",
    overview:
      "Texas’s Class 2 Senate seat is on the November 3, 2026 ballot. The Secretary of State’s ballot certification names Ken Paxton (REP), James Talarico (DEM), and Ted Brown (LIB).",
    officeExplainer: senateOfficeExplainer,
    whyItMatters:
      "Cook moved Texas from Lean Republican to Toss Up on August 20, 2026. Official canvass remains a Texas function.",
    howToRead: NAMES,
    candidatesIntro: NAMES,
    candidates: [
      listCandidate({
        name: "Ken Paxton",
        party: "REP",
        partyLabel: "REP",
        bio: "The Texas Secretary of State’s 2026 ballot certification names Ken Paxton, REP, for U.S. Senator.",
        image: photo("ken-paxton"),
        sources: [txCert],
      }),
      listCandidate({
        name: "James Talarico",
        party: "DEM",
        partyLabel: "DEM",
        bio: "The Texas Secretary of State’s 2026 ballot certification names James Talarico, DEM, for U.S. Senator.",
        sources: [txCert],
      }),
      listCandidate({
        name: "Ted Brown",
        party: "LIB",
        partyLabel: "LIB",
        bio: "The Texas Secretary of State’s 2026 ballot certification names Ted Brown, LIB, for U.S. Senator.",
        sources: [txCert],
      }),
    ],
    ratings: [cook("Tossup", "August 20, 2026", cookSenateUrl)],
    sources: [
      txCert,
      cite(
        "Cook Political Report, Texas and Iowa Senate races move to Toss Up",
        "https://www.cookpolitical.com/analysis/senate/senate-overview/texas-and-iowa-senate-races-move-toss-races-governor-also-move",
        "September 17, 2026",
        "August 20, 2026",
      ),
    ],
    aggregatorLinks: senateAggregators(
      BP_TX_SENATE,
      "https://www.realclearpolling.com/polls/senate/general/2026/texas/talarico-vs-paxton",
    ),
    relatedPollSlugs: [
      "tx-senate-emerson-2026-09",
      "tx-senate-emerson-2026-08",
      "tx-senate-siena-2026-06",
      "tx-senate-quantus-2026-06",
      "tx-senate-tsuyougov-2026-05",
    ],
    ballotSections: ["federal"],
    ballotNomineeNote:
      "Names on the TX Senate race guide are the U.S. Senator rows in the Texas Secretary of State’s 2026 ballot certification.",
    faqs: standardFaqs("this Senate race", "the Texas Secretary of State"),
  },
];
