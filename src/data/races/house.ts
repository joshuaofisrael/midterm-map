import type { RaceGuide } from "../types";
import { cite } from "../sources";
import {
  ballotpedia,
  houseAggregators,
  houseOfficeExplainer,
  officialSite,
  person,
  standardFaqs,
  wiki,
} from "./helpers";

export const HOUSE_RACES: RaceGuide[] = [
  {
    slug: "az-01-house-2026",
    state: "AZ",
    chamber: "house",
    office: "U.S. House",
    district: "1",
    title: "Arizona 1st Congressional District — 2026",
    shortTitle: "AZ-01",
    featured: true,
    incumbentNote:
      "The seat is open. Rep. David Schweikert ran for governor instead of seeking another House term.",
    overview:
      "Arizona’s 1st District (northeast Phoenix, Scottsdale, Fountain Hills, and nearby communities) elects a U.S. representative on November 3, 2026. Democrat Amish Shah faces Republican Jay Feely. Ballotpedia also lists a Libertarian candidate.",
    officeExplainer: houseOfficeExplainer,
    whyItMatters:
      "Ballotpedia News (July 29, 2026) reported that major forecasters rated the open seat Lean Democratic or a toss-up. The district voted for Schweikert and Trump in 2024 while also supporting Democrat Ruben Gallego for Senate. Your address — not this page — determines whether AZ-01 appears on your ballot.",
    howToRead:
      "Confirm the district number with the Arizona Secretary of State or your county recorder before treating this page as your race.",
    candidates: [
      person({
        name: "Amish Shah",
        party: "DEM",
        partyLabel: "Democratic",
        statusNote: "Democratic nominee after the July 21, 2026 primary",
        bio: "Shah is an emergency physician and former Arizona state representative. He was the 2024 Democratic nominee in this district. He won the 2026 Democratic primary over Marlene Galán-Woods and others.",
        links: [
          wiki("Amish Shah", "Amish_Shah"),
          ballotpedia("Amish Shah", "Amish_Shah"),
        ],
        sources: [
          cite(
            "Ballotpedia News, Amish Shah, Jay Feely, and Monica Alponte are running",
            "https://news.ballotpedia.org/2026/07/29/amish-shah-d-jay-feely-r-and-monica-alponte-l-are-running-for-the-open-seat-in-arizonas-1st-congressional-district/",
            "September 17, 2026",
            "July 29, 2026",
          ),
          cite(
            "Arizona’s Family, Amish Shah wins Democratic primary for CD1",
            "https://www.azfamily.com/2026/07/23/amish-shah-wins-democratic-primary-cd1-will-face-ex-cardinals-kicker-jay-feely/",
          ),
        ],
      }),
      person({
        name: "Jay Feely",
        party: "REP",
        partyLabel: "Republican",
        statusNote: "Republican nominee; former NFL kicker",
        bio: "Feely is a former NFL kicker who won the 2026 Republican primary with President Trump’s endorsement. Local reporting notes he and Shah once worked on the same New York Jets sideline — Feely as a player, Shah as a team physician.",
        links: [ballotpedia("Jay Feely", "Jay_Feely")],
        sources: [
          cite(
            "Arizona’s Family, Amish Shah wins Democratic primary for CD1",
            "https://www.azfamily.com/2026/07/23/amish-shah-wins-democratic-primary-cd1-will-face-ex-cardinals-kicker-jay-feely/",
          ),
        ],
      }),
    ],
    ratings: [],
    sources: [
      cite(
        "Ballotpedia, United States House elections in Arizona, 2026",
        "https://ballotpedia.org/United_States_House_of_Representatives_elections_in_Arizona,_2026",
      ),
    ],
    aggregatorLinks: houseAggregators("https://ballotpedia.org/Arizona%27s_1st_Congressional_District_election,_2026"),
    relatedPollSlugs: [],
    ballotSections: ["federal"],
    faqs: standardFaqs("this House race", "your county recorder"),
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
      "Georgia’s 7th District elects a U.S. representative on November 3, 2026. Republican incumbent Rich McCormick faces Democrat Tony Kozycki, according to Decision Desk HQ’s public race page.",
    officeExplainer: houseOfficeExplainer,
    whyItMatters:
      "Decision Desk HQ’s September 16, 2026 forecast treated the district as Safe Republican. That is a named-outlet forecast, not a Map the Midterms rating. Confirm your district on the official Georgia lookup tools.",
    howToRead:
      "Do not assume you live in GA-07 because you opened this page.",
    candidates: [
      person({
        name: "Rich McCormick",
        party: "REP",
        partyLabel: "Republican",
        incumbent: true,
        bio: "McCormick has represented Georgia’s 7th District since 2023. He is an emergency physician and Marine veteran. House records list him as seeking another term in 2026.",
        image: {
          src: "/candidates/rich-mccormick.jpg",
          alt: "Official portrait of Rep. Rich McCormick",
          attribution: "U.S. House / public domain",
          license: "Public domain (U.S. government work)",
          sourceUrl: "https://commons.wikimedia.org/wiki/File:Rep._Rich_McCormick_official_photo,_118th_Congress_(cropped).jpg",
        },
        links: [
          officialSite("House office", "https://mccormick.house.gov/"),
          wiki("Rich McCormick", "Rich_McCormick"),
          ballotpedia("Rich McCormick", "Rich_McCormick"),
        ],
        sources: [
          cite("Biographical Directory of the U.S. Congress, Rich McCormick", "https://bioguide.congress.gov/search/bio/M000194"),
          cite(
            "Decision Desk HQ, 2026 Georgia US House 7",
            "https://newsnation-votes.decisiondeskhq.com/races/2026-11-03/georgia-us-house-7-general-election/forecast",
          ),
        ],
      }),
      person({
        name: "Tony Kozycki",
        party: "DEM",
        partyLabel: "Democratic",
        bio: "Kozycki is the Democratic nominee listed on Decision Desk HQ’s public GA-07 forecast page as of September 16, 2026. Confirm spelling and ballot status with the Georgia Secretary of State.",
        links: [ballotpedia("Georgia's 7th Congressional District election, 2026", "Georgia%27s_7th_Congressional_District_election,_2026")],
        sources: [
          cite(
            "Decision Desk HQ, 2026 Georgia US House 7",
            "https://newsnation-votes.decisiondeskhq.com/races/2026-11-03/georgia-us-house-7-general-election/forecast",
          ),
        ],
      }),
    ],
    ratings: [],
    sources: [
      cite(
        "Decision Desk HQ, 2026 Georgia US House 7",
        "https://newsnation-votes.decisiondeskhq.com/races/2026-11-03/georgia-us-house-7-general-election/forecast",
        "September 17, 2026",
        "September 16, 2026",
      ),
    ],
    aggregatorLinks: houseAggregators("https://ballotpedia.org/Georgia%27s_7th_Congressional_District_election,_2026"),
    relatedPollSlugs: [],
    ballotSections: ["federal"],
    faqs: standardFaqs("this House race", "the Georgia Secretary of State"),
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
      "Michigan’s 7th District elects a U.S. representative on November 3, 2026. Republican incumbent Tom Barrett faces Democrat William Lawrence. Ballotpedia also lists a Green Party candidate.",
    officeExplainer: houseOfficeExplainer,
    whyItMatters:
      "Ballotpedia included MI-07 on its 2026 House battlegrounds list. The district covers part of mid-Michigan; your clerk’s sample ballot is the authority for district assignment.",
    howToRead:
      "Lawrence won the August 4, 2026 Democratic primary. Confirm the November slate with the Michigan Secretary of State.",
    candidates: [
      person({
        name: "Tom Barrett",
        party: "REP",
        partyLabel: "Republican",
        incumbent: true,
        bio: "Barrett has represented Michigan’s 7th District since 2025. He is an Army veteran and former state senator. He advanced from the 2026 Republican primary.",
        image: {
          src: "/candidates/tom-barrett.jpg",
          alt: "Official portrait of Rep. Tom Barrett",
          attribution: "U.S. House / public domain",
          license: "Public domain (U.S. government work)",
          sourceUrl: "https://commons.wikimedia.org/wiki/File:Rep._Tom_Barrett_official_photo,_119th_Congress_(3x4_close).jpg",
        },
        links: [
          officialSite("House office", "https://barrett.house.gov/"),
          wiki("Tom Barrett", "Tom_Barrett_(Michigan_politician)"),
          ballotpedia("Tom Barrett", "Tom_Barrett_(Michigan)"),
        ],
        sources: [
          cite("Ballotpedia, Michigan's 7th Congressional District election, 2026", "https://ballotpedia.org/Michigan%27s_7th_Congressional_District_election,_2026"),
        ],
      }),
      person({
        name: "William Lawrence",
        party: "DEM",
        partyLabel: "Democratic",
        statusNote: "Democratic nominee after the August 4, 2026 primary",
        bio: "Lawrence won the 2026 Democratic primary with 42.4% against Bridget Brink and Matt Maasdam, according to Ballotpedia’s certified primary table. Confirm biography details on his Ballotpedia and campaign pages.",
        links: [ballotpedia("William Lawrence", "William_Lawrence_(Michigan)")],
        sources: [
          cite("Ballotpedia, Michigan's 7th Congressional District election, 2026", "https://ballotpedia.org/Michigan%27s_7th_Congressional_District_election,_2026"),
        ],
      }),
    ],
    ratings: [],
    sources: [
      cite("Ballotpedia, Michigan's 7th Congressional District election, 2026", "https://ballotpedia.org/Michigan%27s_7th_Congressional_District_election,_2026"),
    ],
    aggregatorLinks: houseAggregators("https://ballotpedia.org/Michigan%27s_7th_Congressional_District_election,_2026"),
    relatedPollSlugs: [],
    ballotSections: ["federal"],
    faqs: standardFaqs("this House race", "your city or county clerk"),
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
      "North Carolina’s 1st District elects a U.S. representative on November 3, 2026. Democratic incumbent Don Davis is seeking another term. Confirm the Republican and any third-party nominees on the State Board of Elections candidate list.",
    officeExplainer: houseOfficeExplainer,
    whyItMatters:
      "Ballotpedia’s original 2026 House battlegrounds list included NC-01. Maps can change through official legal processes. The State Board of Elections and your county board confirm district assignment.",
    howToRead:
      "This page lists the sitting member. The full November field should be read from ncsbe.gov or Ballotpedia, not assumed from a template.",
    candidates: [
      person({
        name: "Don Davis",
        party: "DEM",
        partyLabel: "Democratic",
        incumbent: true,
        bio: "Davis has represented North Carolina’s 1st District since 2023. He is a former Air Force officer, mayor of Snow Hill, and state senator. House records list him as the incumbent seeking re-election in 2026.",
        links: [
          officialSite("House office", "https://dondavis.house.gov/"),
          wiki("Don Davis", "Don_Davis_(North_Carolina_politician)"),
          ballotpedia("Don Davis", "Don_Davis_(North_Carolina_politician)"),
        ],
        sources: [
          cite("U.S. House, Rep. Don Davis", "https://dondavis.house.gov/"),
          cite("Ballotpedia, North Carolina's 1st Congressional District election, 2026", "https://ballotpedia.org/North_Carolina%27s_1st_Congressional_District_election,_2026"),
        ],
      }),
    ],
    ratings: [],
    sources: [
      cite("Ballotpedia, U.S. House battlegrounds, 2026", "https://ballotpedia.org/U.S._House_battlegrounds,_2026"),
    ],
    aggregatorLinks: houseAggregators("https://ballotpedia.org/North_Carolina%27s_1st_Congressional_District_election,_2026"),
    relatedPollSlugs: [],
    ballotSections: ["federal"],
    faqs: standardFaqs("this House race", "the North Carolina State Board of Elections"),
  },
  {
    slug: "nv-03-house-2026",
    state: "NV",
    chamber: "house",
    office: "U.S. House",
    district: "3",
    title: "Nevada 3rd Congressional District — 2026",
    shortTitle: "NV-03",
    featured: true,
    overview:
      "Nevada’s 3rd District (southern Clark County) elects a U.S. representative on November 3, 2026. Democratic incumbent Susie Lee faces Republican Marty O’Donnell. Ballotpedia also lists an Independent American Party candidate.",
    officeExplainer: houseOfficeExplainer,
    whyItMatters:
      "Cook’s Partisan Voter Index for the district is D+1, per Ballotpedia. The seat has been a recurring national target. Clark County’s sample ballot is the authority for your district number.",
    howToRead:
      "Lee won the June 9 Democratic primary; O’Donnell won the Republican primary the same day.",
    candidates: [
      person({
        name: "Susie Lee",
        party: "DEM",
        partyLabel: "Democratic",
        incumbent: true,
        bio: "Lee has represented Nevada’s 3rd District since 2019. She is a former education nonprofit executive. She won the 2026 Democratic primary with 69.2% of the vote, according to Ballotpedia.",
        image: {
          src: "/candidates/susie-lee.jpg",
          alt: "Official portrait of Rep. Susie Lee",
          attribution: "U.S. House / public domain",
          license: "Public domain (U.S. government work)",
          sourceUrl: "https://commons.wikimedia.org/wiki/File:Susie_Lee_official_portrait.jpg",
        },
        links: [
          officialSite("House office", "https://susielee.house.gov/"),
          wiki("Susie Lee", "Susie_Lee"),
          ballotpedia("Susie Lee", "Susie_Lee"),
        ],
        sources: [
          cite("Ballotpedia, Nevada's 3rd Congressional District", "https://ballotpedia.org/Nevada%27s_3rd_Congressional_District"),
        ],
      }),
      person({
        name: "Marty O'Donnell",
        party: "REP",
        partyLabel: "Republican",
        statusNote: "Republican nominee after the June 9, 2026 primary",
        bio: "O’Donnell won the 2026 Republican primary with 42.3% against Tera Anderson, Jeff Gunter, and Aury Nagy, according to Ballotpedia. Confirm biography details on Ballotpedia and official filings.",
        links: [ballotpedia("Marty O'Donnell", "Marty_O%27Donnell")],
        sources: [
          cite("Ballotpedia, Nevada's 3rd Congressional District", "https://ballotpedia.org/Nevada%27s_3rd_Congressional_District"),
        ],
      }),
    ],
    ratings: [],
    sources: [
      cite("Ballotpedia, Nevada's 3rd Congressional District", "https://ballotpedia.org/Nevada%27s_3rd_Congressional_District"),
    ],
    aggregatorLinks: houseAggregators("https://ballotpedia.org/Nevada%27s_3rd_Congressional_District_election,_2026"),
    relatedPollSlugs: [],
    ballotSections: ["federal"],
    faqs: standardFaqs("this House race", "your county clerk"),
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
      "Ohio’s 9th District elects a U.S. representative on November 3, 2026. Democratic incumbent Marcy Kaptur faces Republican Derek Merrin in a rematch of 2024.",
    officeExplainer: houseOfficeExplainer,
    whyItMatters:
      "Roll Call reported on May 6, 2026 that Kaptur, the longest-serving woman in congressional history, is among the House’s most vulnerable incumbents after winning 2024 by less than a point. Redistricting made the seat a shade more Republican. Your county board prints the district on your ballot.",
    howToRead:
      "Merrin won a five-way May 2026 Republican primary. Confirm the November slate with the Ohio Secretary of State.",
    candidates: [
      person({
        name: "Marcy Kaptur",
        party: "DEM",
        partyLabel: "Democratic",
        incumbent: true,
        bio: "Kaptur has represented a northwest Ohio House district since 1983. She is seeking a 23rd term. Official biographies emphasize Great Lakes, manufacturing, and veterans’ work.",
        image: {
          src: "/candidates/marcy-kaptur.jpg",
          alt: "Official portrait of Rep. Marcy Kaptur",
          attribution: "U.S. House / public domain",
          license: "Public domain (U.S. government work)",
          sourceUrl: "https://commons.wikimedia.org/wiki/File:Marcy_Kaptur_official_photo.jpg",
        },
        links: [
          officialSite("House office", "https://kaptur.house.gov/"),
          wiki("Marcy Kaptur", "Marcy_Kaptur"),
          ballotpedia("Marcy Kaptur", "Marcy_Kaptur"),
        ],
        sources: [
          cite("Biographical Directory of the U.S. Congress, Marcy Kaptur", "https://bioguide.congress.gov/search/bio/K000009"),
          cite(
            "Roll Call, Ohio’s Kaptur set for rematch with Merrin",
            "https://rollcall.com/2026/05/06/ohios-kaptur-set-for-rematch-with-merrin-in-bid-for-23rd-house-term/",
            "September 17, 2026",
            "May 6, 2026",
          ),
        ],
      }),
      person({
        name: "Derek Merrin",
        party: "REP",
        partyLabel: "Republican",
        statusNote: "Republican nominee after the May 2026 primary",
        bio: "Merrin is a former Ohio state representative. He was the 2024 Republican nominee in this district and won the 2026 GOP primary with 43% of the vote, according to Roll Call.",
        links: [
          wiki("Derek Merrin", "Derek_Merrin"),
          ballotpedia("Derek Merrin", "Derek_Merrin"),
        ],
        sources: [
          cite(
            "Roll Call, Ohio’s Kaptur set for rematch with Merrin",
            "https://rollcall.com/2026/05/06/ohios-kaptur-set-for-rematch-with-merrin-in-bid-for-23rd-house-term/",
          ),
        ],
      }),
    ],
    ratings: [],
    sources: [
      cite(
        "Roll Call, Ohio’s Kaptur set for rematch with Merrin",
        "https://rollcall.com/2026/05/06/ohios-kaptur-set-for-rematch-with-merrin-in-bid-for-23rd-house-term/",
      ),
    ],
    aggregatorLinks: houseAggregators("https://ballotpedia.org/Ohio%27s_9th_Congressional_District_election,_2026"),
    relatedPollSlugs: [],
    ballotSections: ["federal"],
    faqs: standardFaqs("this House race", "your county board of elections"),
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
      "Pennsylvania’s 7th District (Lehigh Valley) elects a U.S. representative on November 3, 2026. Republican incumbent Ryan Mackenzie faces Democrat Bob Brooks.",
    officeExplainer: houseOfficeExplainer,
    whyItMatters:
      "Ballotpedia lists PA-07 among 2026 House battlegrounds. Mackenzie won the seat in 2024. Confirm district lines with official Pennsylvania or county tools before treating this page as your race.",
    howToRead:
      "Brooks won the May 19, 2026 Democratic primary with 41.0%. Mackenzie was unopposed in the Republican primary.",
    candidates: [
      person({
        name: "Ryan Mackenzie",
        party: "REP",
        partyLabel: "Republican",
        incumbent: true,
        bio: "Mackenzie has represented Pennsylvania’s 7th District since 2025 after serving in the state House. He advanced from the 2026 Republican primary unopposed, according to Ballotpedia.",
        image: {
          src: "/candidates/ryan-mackenzie.jpg",
          alt: "Official portrait of Rep. Ryan Mackenzie",
          attribution: "U.S. House / public domain",
          license: "Public domain (U.S. government work)",
          sourceUrl: "https://commons.wikimedia.org/wiki/File:Rep._Ryan_Mackenzie_official_photo.jpg",
        },
        links: [
          officialSite("House office", "https://mackenzie.house.gov/"),
          wiki("Ryan Mackenzie", "Ryan_Mackenzie"),
          ballotpedia("Ryan Mackenzie", "Ryan_Mackenzie"),
        ],
        sources: [
          cite("Ballotpedia, Pennsylvania's 7th Congressional District", "https://ballotpedia.org/Pennsylvania%27s_7th_Congressional_District"),
        ],
      }),
      person({
        name: "Bob Brooks",
        party: "DEM",
        partyLabel: "Democratic",
        statusNote: "Democratic nominee after the May 19, 2026 primary",
        bio: "Brooks won the 2026 Democratic primary with 41.0% against Ryan Crosswell, Lamont McClure, and Carol Obando-Derstine, according to Ballotpedia. Confirm biography details on Ballotpedia and official filings.",
        links: [ballotpedia("Bob Brooks", "Bob_Brooks_(Pennsylvania)")],
        sources: [
          cite("Ballotpedia, Pennsylvania's 7th Congressional District", "https://ballotpedia.org/Pennsylvania%27s_7th_Congressional_District"),
        ],
      }),
    ],
    ratings: [],
    sources: [
      cite("Ballotpedia, Pennsylvania's 7th Congressional District", "https://ballotpedia.org/Pennsylvania%27s_7th_Congressional_District"),
    ],
    aggregatorLinks: houseAggregators("https://ballotpedia.org/Pennsylvania%27s_7th_Congressional_District_election,_2026"),
    relatedPollSlugs: [],
    ballotSections: ["federal"],
    faqs: standardFaqs("this House race", "your county election office"),
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
      "Wisconsin’s 3rd District elects a U.S. representative on November 3, 2026. Republican incumbent Derrick Van Orden faces Democrat Rebecca Cooke. Ballotpedia also lists independent candidates.",
    officeExplainer: houseOfficeExplainer,
    whyItMatters:
      "Ballotpedia includes WI-03 among 2026 House battlegrounds. Van Orden flipped the seat in 2022. Your municipal clerk’s sample ballot is the authority for district and candidate names.",
    howToRead:
      "Van Orden won the August 11, 2026 Republican primary. Confirm the full November field with the Wisconsin Elections Commission.",
    candidates: [
      person({
        name: "Derrick Van Orden",
        party: "REP",
        partyLabel: "Republican",
        incumbent: true,
        bio: "Van Orden has represented Wisconsin’s 3rd District since 2023. He is a retired Navy SEAL. He advanced from the 2026 Republican primary.",
        image: {
          src: "/candidates/derrick-van-orden.jpg",
          alt: "Official portrait of Rep. Derrick Van Orden",
          attribution: "U.S. House / public domain",
          license: "Public domain (U.S. government work)",
          sourceUrl: "https://commons.wikimedia.org/wiki/File:Derrick_Van_Orden_117th_Congress.jpeg",
        },
        links: [
          officialSite("House office", "https://vanorden.house.gov/"),
          wiki("Derrick Van Orden", "Derrick_Van_Orden"),
          ballotpedia("Derrick Van Orden", "Derrick_Van_Orden"),
        ],
        sources: [
          cite("Ballotpedia, Derrick Van Orden", "https://ballotpedia.org/Derrick_Van_Orden"),
        ],
      }),
      person({
        name: "Rebecca Cooke",
        party: "DEM",
        partyLabel: "Democratic",
        bio: "Cooke is the Democratic nominee listed on Ballotpedia’s 2026 general-election table for Wisconsin’s 3rd District. Confirm biography details on Ballotpedia and official filings.",
        links: [ballotpedia("Rebecca Cooke", "Rebecca_Cooke")],
        sources: [
          cite("Ballotpedia, Derrick Van Orden", "https://ballotpedia.org/Derrick_Van_Orden"),
          cite("Ballotpedia, U.S. House battlegrounds, 2026", "https://ballotpedia.org/U.S._House_battlegrounds,_2026"),
        ],
      }),
    ],
    ratings: [],
    sources: [
      cite("Ballotpedia, Derrick Van Orden", "https://ballotpedia.org/Derrick_Van_Orden"),
    ],
    aggregatorLinks: houseAggregators("https://ballotpedia.org/Wisconsin%27s_3rd_Congressional_District_election,_2026"),
    relatedPollSlugs: [],
    ballotSections: ["federal"],
    faqs: standardFaqs("this House race", "your municipal clerk"),
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
      "Texas’s 15th District elects a U.S. representative on November 3, 2026. Republican incumbent Monica De La Cruz faces Democrat Bobby Pulido. Texas redrew congressional lines in 2025; voters will use the map in force for 2026.",
    officeExplainer: houseOfficeExplainer,
    whyItMatters:
      "Ballotpedia lists TX-15 among 2026 House battlegrounds and notes the August 2025 remap. Your county elections site is the authority for the district printed on your ballot.",
    howToRead:
      "De La Cruz won the March 3, 2026 Republican primary. Confirm the Democratic nominee and any additional lines with the Texas Secretary of State.",
    candidates: [
      person({
        name: "Monica De La Cruz",
        party: "REP",
        partyLabel: "Republican",
        incumbent: true,
        bio: "De La Cruz has represented Texas’s 15th District since 2023. She advanced from the March 2026 Republican primary. Official biographies emphasize small-business and border-district work.",
        image: {
          src: "/candidates/monica-de-la-cruz.jpg",
          alt: "Official portrait of Rep. Monica De La Cruz",
          attribution: "U.S. House / public domain",
          license: "Public domain (U.S. government work)",
          sourceUrl: "https://commons.wikimedia.org/wiki/File:Rep._Monica_De_La_Cruz_official_photo.jpg",
        },
        links: [
          officialSite("House office", "https://delacruz.house.gov/"),
          wiki("Monica De La Cruz", "Monica_De_La_Cruz"),
          ballotpedia("Monica De La Cruz", "Monica_De_La_Cruz"),
        ],
        sources: [
          cite(
            "Ballotpedia, Texas' 15th Congressional District election, 2026 (March 3 Republican primary)",
            "https://ballotpedia.org/Texas%27_15th_Congressional_District_election,_2026_(March_3_Republican_primary)",
          ),
        ],
      }),
      person({
        name: "Bobby Pulido",
        party: "DEM",
        partyLabel: "Democratic",
        bio: "Pulido is the Democratic nominee listed on Ballotpedia’s 2026 Texas House battlegrounds table for District 15. Confirm biography details on Ballotpedia and official filings.",
        links: [ballotpedia("Bobby Pulido", "Bobby_Pulido")],
        sources: [
          cite("Ballotpedia, U.S. House battlegrounds, 2026", "https://ballotpedia.org/U.S._House_battlegrounds,_2026"),
        ],
      }),
    ],
    ratings: [],
    sources: [
      cite("Ballotpedia, U.S. House battlegrounds, 2026", "https://ballotpedia.org/U.S._House_battlegrounds,_2026"),
    ],
    aggregatorLinks: houseAggregators("https://ballotpedia.org/Texas%27_15th_Congressional_District_election,_2026"),
    relatedPollSlugs: [],
    ballotSections: ["federal"],
    faqs: standardFaqs("this House race", "the Texas Secretary of State"),
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
      "Florida’s 13th District (Pinellas County) elects a U.S. representative on November 3, 2026. Republican incumbent Anna Paulina Luna faces Democrat Leela Gray. A no-party candidate has also been reported as qualified.",
    officeExplainer: houseOfficeExplainer,
    whyItMatters:
      "The district is a Tampa Bay seat whose lines are set by official Florida maps. Supervisors of elections print the district that matches your registration. National party committees have treated the race as a general-election target after Gray’s August primary.",
    howToRead:
      "Gray won the August 18, 2026 Democratic primary. Confirm every qualified name with your supervisor of elections.",
    candidates: [
      person({
        name: "Anna Paulina Luna",
        party: "REP",
        partyLabel: "Republican",
        incumbent: true,
        bio: "Luna has represented Florida’s 13th District since 2023. She is an Air Force veteran. House records list her as seeking a third term in 2026.",
        image: {
          src: "/candidates/anna-paulina-luna.jpg",
          alt: "Official portrait of Rep. Anna Paulina Luna",
          attribution: "U.S. House / public domain",
          license: "Public domain (U.S. government work)",
          sourceUrl: "https://commons.wikimedia.org/wiki/File:Rep._Anna_Paulina_Luna_official_photo.jpg",
        },
        links: [
          officialSite("House office", "https://luna.house.gov/"),
          wiki("Anna Paulina Luna", "Anna_Paulina_Luna"),
          ballotpedia("Anna Paulina Luna", "Anna_Paulina_Luna"),
        ],
        sources: [
          cite("Biographical Directory of the U.S. Congress, Anna Paulina Luna", "https://bioguide.congress.gov/search/bio/L000598"),
          cite("Ballotpedia, Florida's 13th Congressional District election, 2026", "https://ballotpedia.org/Florida%27s_13th_Congressional_District_election,_2026"),
        ],
      }),
      person({
        name: "Leela Gray",
        party: "DEM",
        partyLabel: "Democratic",
        statusNote: "Democratic nominee after the August 18, 2026 primary",
        bio: "Gray is a retired U.S. Army brigadier general and attorney. She won the August 2026 Democratic primary. Contemporaneous reporting says national Democrats later added her to a recruitment list; that is a party decision, not an endorsement by this site.",
        links: [ballotpedia("Leela Gray", "Leela_Gray")],
        sources: [
          cite("Smarter.Vote, 2026 Florida's 13th Congressional District Election", "https://smarter.vote/races/fl-house-13-2026/"),
        ],
      }),
    ],
    ratings: [],
    sources: [
      cite("Smarter.Vote, 2026 Florida's 13th Congressional District Election", "https://smarter.vote/races/fl-house-13-2026/"),
    ],
    aggregatorLinks: houseAggregators("https://ballotpedia.org/Florida%27s_13th_Congressional_District_election,_2026"),
    relatedPollSlugs: [],
    ballotSections: ["federal"],
    faqs: standardFaqs("this House race", "your supervisor of elections"),
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
      "California’s 13th District (San Joaquin Valley) elects a U.S. representative on November 3, 2026. Democratic incumbent Adam Gray and Republican Kevin Lincoln II advanced from the June 2 top-two primary.",
    officeExplainer: `${houseOfficeExplainer} California’s top-two primary can send two candidates of the same party to November; in 2026 this district advanced one Democrat and one Republican.`,
    whyItMatters:
      "Gray flipped the seat in 2024. Ballotpedia included CA-13 on its 2026 House battlegrounds list. County elections officials assign the district on your mail ballot.",
    howToRead:
      "Primary percentages: Gray 42.0%, Lincoln 27.7%, with two other candidates eliminated, per Ballotpedia’s certified table.",
    candidates: [
      person({
        name: "Adam Gray",
        party: "DEM",
        partyLabel: "Democratic",
        incumbent: true,
        bio: "Gray has represented California’s 13th District since 2025 after serving in the state Assembly. He finished first in the June 2026 top-two primary.",
        image: {
          src: "/candidates/adam-gray.jpg",
          alt: "Official portrait of Rep. Adam Gray",
          attribution: "U.S. House / public domain",
          license: "Public domain (U.S. government work)",
          sourceUrl: "https://commons.wikimedia.org/wiki/File:Rep._Adam_Gray_official_photo.jpg",
        },
        links: [
          officialSite("House office", "https://gray.house.gov/"),
          wiki("Adam Gray", "Adam_Gray"),
          ballotpedia("Adam Gray", "Adam_Gray"),
        ],
        sources: [
          cite(
            "Ballotpedia, California's 13th Congressional District election, 2026 (June 2 top-two primary)",
            "https://ballotpedia.org/California%27s_13th_Congressional_District_election,_2026_(June_2_top-two_primary)",
          ),
        ],
      }),
      person({
        name: "Kevin Lincoln II",
        party: "REP",
        partyLabel: "Republican",
        statusNote: "Advanced from the June 2, 2026 top-two primary",
        bio: "Lincoln is a former mayor of Stockton. He finished second in the 2026 top-two primary and advanced to November. Confirm biography details on Ballotpedia and official filings.",
        links: [
          wiki("Kevin Lincoln", "Kevin_Lincoln_(politician)"),
          ballotpedia("Kevin Lincoln", "Kevin_Lincoln"),
        ],
        sources: [
          cite(
            "Ballotpedia, California's 13th Congressional District election, 2026 (June 2 top-two primary)",
            "https://ballotpedia.org/California%27s_13th_Congressional_District_election,_2026_(June_2_top-two_primary)",
          ),
        ],
      }),
    ],
    ratings: [],
    sources: [
      cite(
        "Ballotpedia, California's 13th Congressional District election, 2026 (June 2 top-two primary)",
        "https://ballotpedia.org/California%27s_13th_Congressional_District_election,_2026_(June_2_top-two_primary)",
      ),
    ],
    aggregatorLinks: houseAggregators("https://ballotpedia.org/California%27s_13th_Congressional_District_election,_2026"),
    relatedPollSlugs: [],
    ballotSections: ["federal"],
    faqs: standardFaqs("this House race", "your county elections office"),
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
      "New York’s 22nd District (central New York) elects a U.S. representative on November 3, 2026. Democratic incumbent John Mannion is seeking another term. Confirm the Republican and any additional party lines with your county board of elections.",
    officeExplainer: houseOfficeExplainer,
    whyItMatters:
      "The district has changed parties in recent cycles. County boards of elections assign the district on your ballot. Fusion lines, if any, are official New York ballot design.",
    howToRead:
      "This page lists the sitting member. Read the official sample ballot for every qualified line.",
    candidates: [
      person({
        name: "John Mannion",
        party: "DEM",
        partyLabel: "Democratic",
        incumbent: true,
        bio: "Mannion has represented New York’s 22nd District since 2025 after serving in the state Senate. He is a former science teacher. House records list him as the incumbent seeking re-election in 2026.",
        image: {
          src: "/candidates/john-mannion.jpg",
          alt: "Official portrait of Rep. John Mannion",
          attribution: "U.S. House / public domain",
          license: "Public domain (U.S. government work)",
          sourceUrl: "https://commons.wikimedia.org/wiki/File:John_Mannion,_official_portrait_(119th_Congress)_(cropped).jpg",
        },
        links: [
          officialSite("House office", "https://mannion.house.gov/"),
          wiki("John Mannion", "John_Mannion_(New_York_politician)"),
          ballotpedia("John Mannion", "John_W._Mannion"),
        ],
        sources: [
          cite("Ballotpedia, New York's 22nd Congressional District election, 2026", "https://ballotpedia.org/New_York%27s_22nd_Congressional_District_election,_2026"),
        ],
      }),
    ],
    ratings: [],
    sources: [
      cite("Ballotpedia, New York's 22nd Congressional District election, 2026", "https://ballotpedia.org/New_York%27s_22nd_Congressional_District_election,_2026"),
    ],
    aggregatorLinks: houseAggregators("https://ballotpedia.org/New_York%27s_22nd_Congressional_District_election,_2026"),
    relatedPollSlugs: [],
    ballotSections: ["federal"],
    faqs: standardFaqs("this House race", "your county board of elections"),
  },
];
