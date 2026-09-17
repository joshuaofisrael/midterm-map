import type { RaceGuide } from "../types";
import { cite } from "../sources";
import {
  BP_GA_SENATE,
  BP_MI_SENATE,
  BP_NC_SENATE,
  BP_TX_SENATE,
  ballotpedia,
  cook,
  cookSenatePrint,
  decisionDesk,
  insideElections,
  officialSite,
  person,
  sabato,
  senateAggregators,
  senateOfficeExplainer,
  standardFaqs,
  wiki,
} from "./helpers";

const cookSenateUrl = "https://www.cookpolitical.com/print/ratings/races/senate";
const gaBpCite = cite("Ballotpedia, United States Senate election in Georgia, 2026", BP_GA_SENATE);
const reutersCite = cite(
  "Reuters, Factbox: The nine midterm races that will decide control of the U.S. Senate",
  "https://www.reuters.com/world/us/nine-midterm-races-that-will-decide-control-us-senate-2026-09-07/",
  "September 17, 2026",
  "September 7, 2026",
);
const cbsCite = cite(
  "CBS News, 12 key races that will determine who controls the Senate",
  "https://www.cbsnews.com/news/key-senate-races-2026/",
  "September 17, 2026",
);

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
      "Democratic Sen. Jon Ossoff, first elected in the January 2021 runoff, is seeking a second term. Georgia’s Class 2 seat is on the regular 2026 cycle.",
    overview:
      "Georgia’s Class 2 Senate seat is on the November 3, 2026 ballot. Incumbent Democrat Jon Ossoff faces Republican Rep. Mike Collins. Other qualified candidates may appear on the official Georgia ballot.",
    officeExplainer: senateOfficeExplainer,
    whyItMatters:
      "Georgia is one of a small set of 2026 Senate contests that nonpartisan analysts treat as competitive. Democrats are defending the seat in a state Donald Trump carried in 2024. Control of the 100-seat Senate in 2027 depends on several such states, not this race alone. Official candidate lists and any runoff calendar are set by Georgia election law, not by this site.",
    howToRead:
      "Candidate names below are major-party general-election figures reported by Ballotpedia and contemporaneous news as of mid-September 2026. Party labels identify tickets only. Ratings are quotations of named outlets. Poll rows are individual published surveys — not a Map the Midterms average.",
    candidates: [
      person({
        name: "Jon Ossoff",
        party: "DEM",
        partyLabel: "Democratic",
        incumbent: true,
        bio: "Ossoff is Georgia’s junior U.S. senator. He won a January 2021 runoff and took office that month. Before the Senate he worked as a documentary producer and congressional aide. His public biography emphasizes oversight, economic development, and constituent casework.",
        image: {
          src: "/candidates/jon-ossoff.jpg",
          alt: "Official portrait of Sen. Jon Ossoff",
          attribution: "U.S. Senate Photographic Studio",
          license: "Public domain (U.S. government work)",
          sourceUrl: "https://commons.wikimedia.org/wiki/File:Jon_Ossoff_Senate_Portrait_2021_(cropped).jpg",
        },
        links: [
          officialSite("Senate office", "https://www.ossoff.senate.gov/"),
          wiki("Jon Ossoff", "Jon_Ossoff"),
          ballotpedia("Jon Ossoff", "Jon_Ossoff"),
        ],
        sources: [
          cite("Biographical Directory of the U.S. Congress, Jon Ossoff", "https://bioguide.congress.gov/search/bio/O000174"),
          gaBpCite,
        ],
      }),
      person({
        name: "Mike Collins",
        party: "REP",
        partyLabel: "Republican",
        bio: "Collins represents Georgia’s 10th Congressional District in the U.S. House and is the Republican Senate nominee. He is a small-business owner from Jackson County. House records list him as serving since January 2023.",
        image: {
          src: "/candidates/mike-collins.jpg",
          alt: "Official portrait of Rep. Mike Collins",
          attribution: "U.S. House / public domain",
          license: "Public domain (U.S. government work)",
          sourceUrl: "https://commons.wikimedia.org/wiki/File:Rep._Mike_Collins_official_photo,_118th_Congress_(cropped).jpg",
        },
        links: [
          officialSite("House office", "https://collins.house.gov/"),
          wiki("Mike Collins", "Mike_Collins_(Georgia_politician)"),
          ballotpedia("Mike Collins", "Mike_Collins"),
        ],
        sources: [
          cite("Biographical Directory of the U.S. Congress, Mike Collins", "https://bioguide.congress.gov/search/bio/C001129"),
          gaBpCite,
        ],
      }),
    ],
    ratings: [
      cook("Lean D", "September 8, 2026", cookSenateUrl),
      insideElections("Tilt D", "September 8, 2026", "https://www.insideelections.com/"),
      sabato("Likely D", "September 8, 2026", "https://centerforpolitics.org/crystalball/"),
      decisionDesk("Likely D", "September 8, 2026", "https://decisiondeskhq.com/"),
    ],
    sources: [
      gaBpCite,
      cookSenatePrint,
      reutersCite,
      cbsCite,
    ],
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
      "Democratic Sen. Gary Peters is not seeking another term. The Class 2 seat is open on the regular 2026 cycle.",
    overview:
      "Michigan’s open Class 2 Senate seat is on the November 3, 2026 ballot. Democrat Abdul El-Sayed, who won the August Democratic primary, faces Republican Mike Rogers, a former U.S. representative.",
    officeExplainer: senateOfficeExplainer,
    whyItMatters:
      "Cook Political Report rated the open Michigan seat a toss-up as of its August 20, 2026 print chart. Democrats are defending a seat in a state that has swung between parties in recent statewide races. A change here would affect the 2027 Senate math. Official nominees are those certified by Michigan election authorities.",
    howToRead:
      "Names below are the major-party nominees reported after the August 4, 2026 Michigan primary. Additional party or write-in lines, if any, appear only on the official ballot.",
    candidates: [
      person({
        name: "Abdul El-Sayed",
        party: "DEM",
        partyLabel: "Democratic",
        statusNote: "Democratic nominee after the August 4, 2026 primary",
        bio: "El-Sayed is a physician and former Detroit health director. He previously ran for Michigan governor in 2018. After winning the 2026 Democratic Senate primary he became the party’s nominee for the open Peters seat.",
        image: {
          src: "/candidates/abdul-el-sayed.jpg",
          alt: "Portrait of Abdul El-Sayed",
          attribution: "U.S. Department of Health and Human Services / public domain",
          license: "Public domain (U.S. government work)",
          sourceUrl: "https://commons.wikimedia.org/wiki/File:Abdul_El-Sayed_HHS.jpg",
        },
        links: [
          wiki("Abdul El-Sayed", "Abdul_El-Sayed"),
          ballotpedia("Abdul El-Sayed", "Abdul_El-Sayed"),
        ],
        sources: [
          cite(
            "CBS News, Senate Democrats meet with Abdul El-Sayed",
            "https://www.cbsnews.com/news/abdul-el-sayed-senate-democrats-meeting/",
          ),
          cite("Ballotpedia, United States Senate election in Michigan, 2026", BP_MI_SENATE),
        ],
      }),
      person({
        name: "Mike Rogers",
        party: "REP",
        partyLabel: "Republican",
        statusNote: "Republican nominee; former U.S. representative",
        bio: "Rogers represented a mid-Michigan House district from 2001 to 2015 and later chaired the House Intelligence Committee. He was the 2024 Republican Senate nominee against Elissa Slotkin. He is the 2026 Republican nominee for this open seat.",
        image: {
          src: "/candidates/mike-rogers.jpg",
          alt: "Official portrait of former Rep. Mike Rogers",
          attribution: "U.S. House / public domain",
          license: "Public domain (U.S. government work)",
          sourceUrl: "https://commons.wikimedia.org/wiki/File:Mike_Rogers_official_photo.jpg",
        },
        links: [
          wiki("Mike Rogers", "Mike_Rogers_(Michigan_politician)"),
          ballotpedia("Mike Rogers", "Mike_Rogers_(Michigan)"),
        ],
        sources: [
          cite("Biographical Directory of the U.S. Congress, Mike Rogers", "https://bioguide.congress.gov/search/bio/R000572"),
          reutersCite,
        ],
      }),
    ],
    ratings: [cook("Tossup", "August 20, 2026", cookSenateUrl)],
    sources: [
      cite("Ballotpedia, United States Senate election in Michigan, 2026", BP_MI_SENATE),
      cookSenatePrint,
      reutersCite,
      cbsCite,
    ],
    aggregatorLinks: senateAggregators(BP_MI_SENATE),
    relatedPollSlugs: ["mi-senate-emerson-2026-09"],
    ballotSections: ["federal"],
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
      "Republican Sen. Thom Tillis is not seeking re-election. The Class 2 seat is open.",
    overview:
      "North Carolina’s open Class 2 Senate seat is on the November 3, 2026 ballot. Former Democratic Gov. Roy Cooper faces Republican Michael Whatley, a former Republican National Committee chair.",
    officeExplainer: senateOfficeExplainer,
    whyItMatters:
      "Cook’s August 20, 2026 print chart placed the open North Carolina seat in Lean Democratic. CBS News and Reuters have described it as Democrats’ clearest 2026 pickup opportunity among Republican-held seats. North Carolina last elected a Democratic U.S. senator in 2008. Official results will come from the State Board of Elections.",
    howToRead:
      "Libertarian and Green candidates have appeared in some published polls. Confirm every qualified name on the official North Carolina ballot.",
    candidates: [
      person({
        name: "Roy Cooper",
        party: "DEM",
        partyLabel: "Democratic",
        bio: "Cooper served two terms as North Carolina governor (2017–2025) after a long tenure as state attorney general. He is the Democratic nominee for the open Tillis seat. Public biographies emphasize his statewide executive record and prior work as a legislator.",
        image: {
          src: "/candidates/roy-cooper.jpg",
          alt: "Official portrait of former Gov. Roy Cooper",
          attribution: "RadioFan, CC BY-SA 4.0",
          license: "CC BY-SA 4.0",
          sourceUrl: "https://commons.wikimedia.org/wiki/File:NC_Governor_Roy_Cooper.jpg",
        },
        links: [
          wiki("Roy Cooper", "Roy_Cooper"),
          ballotpedia("Roy Cooper", "Roy_Cooper"),
        ],
        sources: [
          cite("National Governors Association, Roy Cooper", "https://www.nga.org/governor/roy-cooper/"),
          cbsCite,
        ],
      }),
      person({
        name: "Michael Whatley",
        party: "REP",
        partyLabel: "Republican",
        bio: "Whatley is a North Carolina Republican operative who chaired the Republican National Committee and previously led the state party. He entered the Senate race with President Trump’s encouragement after Tillis retired. He is the Republican nominee for the open seat.",
        links: [
          wiki("Michael Whatley", "Michael_Whatley"),
          ballotpedia("Michael Whatley", "Michael_Whatley"),
        ],
        sources: [cbsCite, reutersCite],
      }),
    ],
    ratings: [cook("Lean D", "August 20, 2026", cookSenateUrl)],
    sources: [
      cite("Ballotpedia, United States Senate election in North Carolina, 2026", BP_NC_SENATE),
      cookSenatePrint,
      reutersCite,
      cbsCite,
      cite(
        "Elon University Poll, Cooper maintains double-digit lead",
        "https://www.elon.edu/u/news/2026/09/10/elon-university-poll-cooper-maintains-double-digit-lead-in-north-carolina-u-s-senate-race/",
        "September 17, 2026",
        "September 10, 2026",
      ),
    ],
    aggregatorLinks: senateAggregators(BP_NC_SENATE),
    relatedPollSlugs: ["nc-senate-elon-2026-08"],
    ballotSections: ["federal"],
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
      "The Class 2 seat is open after Sen. John Cornyn lost the 2026 Republican primary to Attorney General Ken Paxton.",
    overview:
      "Texas’s Class 2 Senate seat is on the November 3, 2026 ballot. Republican Ken Paxton, the state attorney general, faces Democratic state Rep. James Talarico. A Libertarian candidate has also appeared in recent published surveys.",
    officeExplainer: senateOfficeExplainer,
    whyItMatters:
      "Cook moved Texas from Lean Republican to Toss Up on August 20, 2026, citing public and private polling in a state Trump won by a double-digit margin in 2024. Reuters and CBS have treated the race as a surprise battleground. Official canvass remains a Texas function.",
    howToRead:
      "Primary outcomes are historical facts reported by news outlets and Ballotpedia. November names must still be confirmed on the official Texas ballot.",
    candidates: [
      person({
        name: "Ken Paxton",
        party: "REP",
        partyLabel: "Republican",
        statusNote: "Republican nominee; Texas attorney general",
        bio: "Paxton has been Texas attorney general since 2015. He defeated incumbent Sen. John Cornyn in the 2026 Republican primary with President Trump’s endorsement. His official biography emphasizes law-enforcement and litigation work on behalf of the state.",
        image: {
          src: "/candidates/ken-paxton.jpg",
          alt: "Official portrait of Texas Attorney General Ken Paxton",
          attribution: "Office of the Texas Attorney General / public domain",
          license: "Public domain (U.S. government work)",
          sourceUrl: "https://commons.wikimedia.org/wiki/File:Ken_Paxton_official_photo.jpg",
        },
        links: [
          officialSite("Texas Attorney General", "https://www.texasattorneygeneral.gov/"),
          wiki("Ken Paxton", "Ken_Paxton"),
          ballotpedia("Ken Paxton", "Ken_Paxton"),
        ],
        sources: [
          cite("Texas Attorney General, About the Attorney General", "https://www.texasattorneygeneral.gov/about"),
          reutersCite,
        ],
      }),
      person({
        name: "James Talarico",
        party: "DEM",
        partyLabel: "Democratic",
        statusNote: "Democratic nominee; Texas state representative",
        bio: "Talarico represents a central Texas district in the Texas House. He is a former teacher and seminary student. National coverage of the 2026 cycle has treated him as the Democratic Senate nominee against Paxton.",
        links: [
          officialSite("Texas House member page", "https://house.texas.gov/members/3075"),
          wiki("James Talarico", "James_Talarico"),
          ballotpedia("James Talarico", "James_Talarico"),
        ],
        sources: [
          cite("Texas House of Representatives, Rep. James Talarico", "https://house.texas.gov/members/3075"),
          cbsCite,
        ],
      }),
    ],
    ratings: [cook("Tossup", "August 20, 2026", cookSenateUrl)],
    sources: [
      cite("Ballotpedia, United States Senate election in Texas, 2026", BP_TX_SENATE),
      cite(
        "Cook Political Report, Texas and Iowa Senate races move to Toss Up",
        "https://www.cookpolitical.com/analysis/senate/senate-overview/texas-and-iowa-senate-races-move-toss-races-governor-also-move",
        "September 17, 2026",
        "August 20, 2026",
      ),
      reutersCite,
      cite(
        "Emerson College Polling, Texas 2026 poll (Sept. 12–14)",
        "https://emersoncollegepolling.com/texas-2026-poll-talarico-and-paxton-in-dead-heat-abbott-maintains-edge/",
        "September 17, 2026",
        "September 17, 2026",
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
    faqs: standardFaqs("this Senate race", "the Texas Secretary of State"),
  },
];
