import type { RaceGuide } from "../types";
import { cite } from "../sources";
import {
  ballotpedia,
  cook,
  govAggregators,
  governorOfficeExplainer,
  officialSite,
  person,
  sabato,
  standardFaqs,
  wiki,
} from "./helpers";

const cookGovUrl = "https://www.cookpolitical.com/ratings/governor-race-ratings";
const cookGovPrintAug20 = cite(
  "Cook Political Report, 2026 governor race ratings",
  cookGovUrl,
  "September 17, 2026",
  "August 20, 2026",
);

export const GOVERNOR_RACES: RaceGuide[] = [
  {
    slug: "az-governor-2026",
    state: "AZ",
    chamber: "governor",
    office: "Governor",
    title: "Arizona Governor — 2026",
    shortTitle: "AZ Governor",
    featured: true,
    incumbentNote:
      "Democratic Gov. Katie Hobbs is seeking a second term. Arizona is pairing gubernatorial nominees with lieutenant-governor running mates for the first time.",
    overview:
      "Arizona elects a governor on November 3, 2026. Incumbent Democrat Katie Hobbs faces Republican Rep. Andy Biggs. Green and No Labels candidates have also been reported on the general-election field.",
    officeExplainer: `${governorOfficeExplainer} Arizona’s 2026 ballot is the first to list a lieutenant-governor running mate with each gubernatorial nominee.`,
    whyItMatters:
      "Cook rated the race Lean Democratic as of late August 2026; Sabato’s Crystal Ball listed Lean D as of September 3, while Inside Elections had it as a toss-up the same week. The winner will share a ballot with other statewide offices and will appoint to some vacancies. Official pairing of running mates is printed by county recorders.",
    howToRead:
      "Third-party lines are listed because contemporaneous local reporting placed them on the November field. Confirm every name on your county sample ballot.",
    candidates: [
      person({
        name: "Katie Hobbs",
        party: "DEM",
        partyLabel: "Democratic",
        incumbent: true,
        statusNote: "Running mate: John Giles (independent), former Mesa mayor",
        bio: "Hobbs has been Arizona governor since 2023 after serving as secretary of state. She won the 2022 election and is seeking a second term. Before statewide office she served in the Arizona Legislature and as a social worker.",
        image: {
          src: "/candidates/katie-hobbs.jpg",
          alt: "Official portrait of Gov. Katie Hobbs",
          attribution: "Gage Skidmore, CC BY-SA 3.0",
          license: "CC BY-SA 3.0",
          sourceUrl: "https://commons.wikimedia.org/wiki/File:Katie_Hobbs_by_Gage_Skidmore.jpg",
        },
        links: [
          officialSite("Office of the Governor", "https://azgovernor.gov/"),
          wiki("Katie Hobbs", "Katie_Hobbs"),
          ballotpedia("Katie Hobbs", "Katie_Hobbs"),
        ],
        sources: [
          cite("Office of the Governor of Arizona", "https://azgovernor.gov/governor/about"),
          cite("Wikipedia, 2026 Arizona gubernatorial election", "https://en.wikipedia.org/wiki/2026_Arizona_gubernatorial_election"),
        ],
      }),
      person({
        name: "Andy Biggs",
        party: "REP",
        partyLabel: "Republican",
        statusNote: "Running mate: Sine Kerr, former state senator",
        bio: "Biggs has represented Arizona’s 5th Congressional District in the U.S. House since 2017. He won the July 2026 Republican primary over Rep. David Schweikert and other candidates. He previously served as president of the Arizona Senate.",
        image: {
          src: "/candidates/andy-biggs.jpg",
          alt: "Official portrait of Rep. Andy Biggs",
          attribution: "U.S. Congress / public domain",
          license: "Public domain (U.S. government work)",
          sourceUrl: "https://commons.wikimedia.org/wiki/File:Andy_Biggs_official_portrait_(headshot).jpg",
        },
        links: [
          officialSite("House office", "https://biggs.house.gov/"),
          wiki("Andy Biggs", "Andy_Biggs"),
          ballotpedia("Andy Biggs", "Andy_Biggs"),
        ],
        sources: [
          cite("Biographical Directory of the U.S. Congress, Andy Biggs", "https://bioguide.congress.gov/search/bio/B001302"),
          cite(
            "Arizona’s Family, The fight for Arizona governor is on",
            "https://www.azfamily.com/2026/09/15/fight-arizona-governor-is-what-separates-hobbs-biggs/",
            "September 17, 2026",
            "September 15, 2026",
          ),
        ],
      }),
    ],
    ratings: [
      cook("Lean D", "August 27, 2026", cookGovUrl),
      sabato("Lean D", "September 3, 2026", "https://centerforpolitics.org/crystalball/"),
    ],
    sources: [
      cite("Wikipedia, 2026 Arizona gubernatorial election", "https://en.wikipedia.org/wiki/2026_Arizona_gubernatorial_election"),
      cite("Ballotpedia, Arizona gubernatorial election, 2026", "https://ballotpedia.org/Arizona_gubernatorial_election,_2026"),
      cookGovPrintAug20,
    ],
    aggregatorLinks: govAggregators("https://ballotpedia.org/Arizona_gubernatorial_election,_2026"),
    relatedPollSlugs: ["az-gov-highground-2026-08"],
    ballotSections: ["statewide"],
    faqs: standardFaqs("this governor’s race", "the Arizona Secretary of State"),
  },
  {
    slug: "ga-governor-2026",
    state: "GA",
    chamber: "governor",
    office: "Governor",
    title: "Georgia Governor — 2026",
    shortTitle: "GA Governor",
    featured: true,
    incumbentNote: "Republican Gov. Brian Kemp is term-limited. The seat is open.",
    overview:
      "Georgia elects a governor on November 3, 2026. Democrat Keisha Lance Bottoms, a former Atlanta mayor, faces Republican businessman Rick Jackson after party primaries and a Republican runoff.",
    officeExplainer: `${governorOfficeExplainer} Georgia can require a majority in a statewide general election; if no candidate reaches that threshold, official runoff rules apply.`,
    whyItMatters:
      "Cook listed the open Georgia governorship as a toss-up on its August 2026 chart. The winner will sit over a Republican-held legislature entering the next redistricting decade and will share a ballot with Georgia’s U.S. Senate race. Primary vote totals are historical records on Ballotpedia; November certification is a state function.",
    howToRead:
      "Use this page for the major-party November pairing. Other statewide constitutional offices appear on the same Georgia ballot.",
    candidates: [
      person({
        name: "Keisha Lance Bottoms",
        party: "DEM",
        partyLabel: "Democratic",
        statusNote: "Democratic nominee after the May 2026 primary",
        bio: "Bottoms was mayor of Atlanta from 2018 to 2022 and later served in the Biden White House as a senior adviser. She won the 2026 Democratic nomination for governor. Public biographies emphasize city executive work and federal service.",
        image: {
          src: "/candidates/keisha-lance-bottoms.jpg",
          alt: "Official portrait of Keisha Lance Bottoms",
          attribution: "White House / public domain",
          license: "Public domain (U.S. government work)",
          sourceUrl: "https://commons.wikimedia.org/wiki/File:Keisha_Lance_Bottoms_official_portrait.jpg",
        },
        links: [
          wiki("Keisha Lance Bottoms", "Keisha_Lance_Bottoms"),
          ballotpedia("Keisha Lance Bottoms", "Keisha_Lance_Bottoms"),
        ],
        sources: [
          cite("Ballotpedia, Georgia gubernatorial election, 2026", "https://ballotpedia.org/Georgia_gubernatorial_election,_2026"),
          cite("White House alumni biography materials via Wikimedia Commons", "https://commons.wikimedia.org/wiki/Category:Keisha_Lance_Bottoms"),
        ],
      }),
      person({
        name: "Rick Jackson",
        party: "REP",
        partyLabel: "Republican",
        statusNote: "Republican nominee after the 2026 primary runoff",
        bio: "Jackson is a Georgia health-care executive and founder of Jackson Healthcare. Ballotpedia records him as the Republican nominee after a runoff that included Lt. Gov. Burt Jones and Secretary of State Brad Raffensperger among the primary field.",
        links: [
          ballotpedia("Rick Jackson", "Rick_Jackson_(Georgia)"),
        ],
        sources: [
          cite("Ballotpedia, Georgia gubernatorial election, 2026", "https://ballotpedia.org/Georgia_gubernatorial_election,_2026"),
          cite("Ballotpedia, Georgia election preview, 2026", "https://ballotpedia.org/Georgia_election_preview,_2026"),
        ],
      }),
    ],
    ratings: [cook("Tossup", "August 20, 2026", cookGovUrl)],
    sources: [
      cite("Ballotpedia, Georgia gubernatorial election, 2026", "https://ballotpedia.org/Georgia_gubernatorial_election,_2026"),
      cookGovPrintAug20,
    ],
    aggregatorLinks: govAggregators("https://ballotpedia.org/Georgia_gubernatorial_election,_2026"),
    relatedPollSlugs: ["ga-gov-aarp-2026-07"],
    ballotSections: ["statewide"],
    faqs: standardFaqs("this governor’s race", "the Georgia Secretary of State"),
  },
  {
    slug: "mi-governor-2026",
    state: "MI",
    chamber: "governor",
    office: "Governor",
    title: "Michigan Governor — 2026",
    shortTitle: "MI Governor",
    featured: true,
    incumbentNote: "Democratic Gov. Gretchen Whitmer is term-limited. The seat is open.",
    overview:
      "Michigan elects a governor on November 3, 2026. Democrat Jocelyn Benson, the secretary of state, faces Republican John James, a former U.S. representative. Minor-party candidates are also listed on Ballotpedia.",
    officeExplainer: governorOfficeExplainer,
    whyItMatters:
      "Cook rated the open Michigan governorship Lean Democratic as of August 2026. The office sets the state’s executive agenda and shares a ballot with Michigan’s open U.S. Senate race. Lieutenant-governor pairing follows Michigan law and the official ballot.",
    howToRead:
      "Green, Libertarian, and U.S. Taxpayers Party candidates appear on Ballotpedia’s general-election table. Confirm the printed slate with your clerk.",
    candidates: [
      person({
        name: "Jocelyn Benson",
        party: "DEM",
        partyLabel: "Democratic",
        statusNote: "Democratic nominee; current secretary of state",
        bio: "Benson has been Michigan secretary of state since 2019. She is a former law-school dean. She is the Democratic nominee for the open governorship in 2026.",
        image: {
          src: "/candidates/jocelyn-benson.jpg",
          alt: "Portrait of Michigan Secretary of State Jocelyn Benson",
          attribution: "Michigan Department of State / public domain",
          license: "Public domain (U.S. government work)",
          sourceUrl: "https://commons.wikimedia.org/wiki/File:Jocelyn_Benson.jpg",
        },
        links: [
          officialSite("Michigan Secretary of State", "https://www.michigan.gov/sos"),
          wiki("Jocelyn Benson", "Jocelyn_Benson"),
          ballotpedia("Jocelyn Benson", "Jocelyn_Benson"),
        ],
        sources: [
          cite("Ballotpedia, Michigan gubernatorial election, 2026", "https://ballotpedia.org/Michigan_gubernatorial_election,_2026"),
          cite(
            "Emerson College Polling, Michigan 2026 poll",
            "https://emersoncollegepolling.com/michigan-2026-poll-el-sayed-and-rogers-locked-in-close-election/",
          ),
        ],
      }),
      person({
        name: "John James",
        party: "REP",
        partyLabel: "Republican",
        bio: "James represented Michigan’s 10th Congressional District from 2023 to 2025. He is an Army veteran and business executive who previously ran statewide Senate campaigns. He is the 2026 Republican nominee for governor.",
        image: {
          src: "/candidates/john-james.jpg",
          alt: "Official portrait of former Rep. John James",
          attribution: "U.S. House / public domain",
          license: "Public domain (U.S. government work)",
          sourceUrl: "https://commons.wikimedia.org/wiki/File:Rep._John_James_official_photo.jpg",
        },
        links: [
          wiki("John James", "John_James_(Michigan_politician)"),
          ballotpedia("John James", "John_James_(Michigan_politician)"),
        ],
        sources: [
          cite("Biographical Directory of the U.S. Congress, John James", "https://bioguide.congress.gov/search/bio/J000307"),
          cite("Ballotpedia, Michigan gubernatorial election, 2026", "https://ballotpedia.org/Michigan_gubernatorial_election,_2026"),
        ],
      }),
    ],
    ratings: [cook("Lean D", "August 20, 2026", cookGovUrl)],
    sources: [
      cite("Ballotpedia, Michigan gubernatorial election, 2026", "https://ballotpedia.org/Michigan_gubernatorial_election,_2026"),
      cookGovPrintAug20,
    ],
    aggregatorLinks: govAggregators("https://ballotpedia.org/Michigan_gubernatorial_election,_2026"),
    relatedPollSlugs: ["mi-gov-emerson-2026-09"],
    ballotSections: ["statewide"],
    faqs: standardFaqs("this governor’s race", "the Michigan Secretary of State"),
  },
  {
    slug: "nv-governor-2026",
    state: "NV",
    chamber: "governor",
    office: "Governor",
    title: "Nevada Governor — 2026",
    shortTitle: "NV Governor",
    featured: true,
    incumbentNote: "Republican Gov. Joe Lombardo is seeking a second term.",
    overview:
      "Nevada elects a governor on November 3, 2026. Incumbent Republican Joe Lombardo faces Democratic Attorney General Aaron Ford after June primaries.",
    officeExplainer: governorOfficeExplainer,
    whyItMatters:
      "Cook rated the race a toss-up as of August 2026. Nevada’s governor can veto bills from a Legislature that has often been Democratic-controlled. County clerks administer Nevada’s mail-ballot system; this site does not.",
    howToRead:
      "Nevada ballots can include a “None of These Candidates” option. Read the official sample ballot for the printed choices.",
    candidates: [
      person({
        name: "Joe Lombardo",
        party: "REP",
        partyLabel: "Republican",
        incumbent: true,
        bio: "Lombardo has been Nevada governor since 2023 after serving as Clark County sheriff. He won the June 2026 Republican primary. His official biography emphasizes public-safety and executive experience in southern Nevada.",
        image: {
          src: "/candidates/joe-lombardo.jpg",
          alt: "Official portrait of Gov. Joe Lombardo",
          attribution: "Office of Glenn Youngkin, CC BY 2.0",
          license: "CC BY 2.0",
          sourceUrl: "https://commons.wikimedia.org/wiki/File:Governor_Joe_Lombardo.jpg",
        },
        links: [
          officialSite("Office of the Governor", "https://gov.nv.gov/"),
          wiki("Joe Lombardo", "Joe_Lombardo"),
          ballotpedia("Joe Lombardo", "Joe_Lombardo"),
        ],
        sources: [
          cite("Wikipedia, 2026 Nevada gubernatorial election", "https://en.wikipedia.org/wiki/2026_Nevada_gubernatorial_election"),
          cite("Office of the Governor of Nevada", "https://gov.nv.gov/"),
        ],
      }),
      person({
        name: "Aaron Ford",
        party: "DEM",
        partyLabel: "Democratic",
        statusNote: "Democratic nominee; current attorney general",
        bio: "Ford has been Nevada attorney general since 2019 and previously served in the state Senate. He won the June 2026 Democratic primary. Term limits prevent him from seeking another term as attorney general.",
        links: [
          officialSite("Nevada Attorney General", "https://ag.nv.gov/"),
          wiki("Aaron Ford", "Aaron_Ford_(Nevada_politician)"),
          ballotpedia("Aaron Ford", "Aaron_Ford"),
        ],
        sources: [
          cite("Wikipedia, 2026 Nevada gubernatorial election", "https://en.wikipedia.org/wiki/2026_Nevada_gubernatorial_election"),
          cite(
            "The Nevada Independent, 2026 statewide voter guide",
            "https://thenevadaindependent.com/elections/2026/general/statewide",
          ),
        ],
      }),
    ],
    ratings: [cook("Tossup", "August 20, 2026", cookGovUrl)],
    sources: [
      cite("Wikipedia, 2026 Nevada gubernatorial election", "https://en.wikipedia.org/wiki/2026_Nevada_gubernatorial_election"),
      cookGovPrintAug20,
      cite(
        "Emerson College Polling, Nevada 2026 poll",
        "https://emersoncollegepolling.com/nevada-2026-poll-ford-and-lombardo/",
        "September 17, 2026",
        "September 2026",
      ),
    ],
    aggregatorLinks: govAggregators("https://ballotpedia.org/Nevada_gubernatorial_election,_2026"),
    relatedPollSlugs: ["nv-gov-emerson-2026-09"],
    ballotSections: ["statewide"],
    faqs: standardFaqs("this governor’s race", "the Nevada Secretary of State"),
  },
  {
    slug: "oh-governor-2026",
    state: "OH",
    chamber: "governor",
    office: "Governor",
    title: "Ohio Governor — 2026",
    shortTitle: "OH Governor",
    featured: true,
    incumbentNote: "Republican Gov. Mike DeWine is term-limited. The seat is open.",
    overview:
      "Ohio elects a governor on November 3, 2026. Republican entrepreneur Vivek Ramaswamy faces Democrat Amy Acton, a former state health director. Ohio lists governor and lieutenant governor as a joint ticket.",
    officeExplainer: `${governorOfficeExplainer} Ohio prints the governor and lieutenant governor as one ticket.`,
    whyItMatters:
      "Cook rated the open Ohio governorship a toss-up as of August 2026. The office directs a large state government and shares a ballot with other statewide executive races. Wikipedia lists Rob McColley (R) and David Pepper (D) as running mates; confirm pairing on the official ballot.",
    howToRead:
      "Treat running-mate names as reported pairings until you see them on a county sample ballot.",
    candidates: [
      person({
        name: "Vivek Ramaswamy",
        party: "REP",
        partyLabel: "Republican",
        statusNote: "Republican nominee; running mate Rob McColley reported on Wikipedia",
        bio: "Ramaswamy is a biotechnology entrepreneur and author who sought the 2024 Republican presidential nomination. He is the 2026 Republican nominee for Ohio governor. Public biographies emphasize his business career and national campaign.",
        image: {
          src: "/candidates/vivek-ramaswamy.jpg",
          alt: "Vivek Ramaswamy speaking at a public event",
          attribution: "Gage Skidmore, CC BY-SA 2.0",
          license: "CC BY-SA 2.0",
          sourceUrl: "https://commons.wikimedia.org/wiki/File:Vivek_Ramaswamy_by_Gage_Skidmore.jpg",
        },
        links: [
          wiki("Vivek Ramaswamy", "Vivek_Ramaswamy"),
          ballotpedia("Vivek Ramaswamy", "Vivek_Ramaswamy"),
        ],
        sources: [
          cite("Wikipedia, 2026 Ohio gubernatorial election", "https://en.wikipedia.org/wiki/2026_Ohio_gubernatorial_election"),
          cite("Ballotpedia, Vivek Ramaswamy", "https://ballotpedia.org/Vivek_Ramaswamy"),
        ],
      }),
      person({
        name: "Amy Acton",
        party: "DEM",
        partyLabel: "Democratic",
        statusNote: "Democratic nominee; running mate David Pepper reported on Wikipedia",
        bio: "Acton directed the Ohio Department of Health in 2019–2020. She is a physician. She is the 2026 Democratic nominee for the open governorship.",
        links: [
          wiki("Amy Acton", "Amy_Acton"),
          ballotpedia("Amy Acton", "Amy_Acton"),
        ],
        sources: [
          cite("Wikipedia, 2026 Ohio gubernatorial election", "https://en.wikipedia.org/wiki/2026_Ohio_gubernatorial_election"),
        ],
      }),
    ],
    ratings: [cook("Tossup", "August 20, 2026", cookGovUrl)],
    sources: [
      cite("Wikipedia, 2026 Ohio gubernatorial election", "https://en.wikipedia.org/wiki/2026_Ohio_gubernatorial_election"),
      cookGovPrintAug20,
    ],
    aggregatorLinks: govAggregators(
      "https://ballotpedia.org/Ohio_gubernatorial_and_lieutenant_gubernatorial_election,_2026",
      "https://www.realclearpolitics.com/epolls/2026/governor/oh/2026_ohio_governor_ramaswamy_vs_acton-8720.html",
    ),
    relatedPollSlugs: [],
    ballotSections: ["statewide"],
    faqs: standardFaqs("this governor’s race", "the Ohio Secretary of State"),
  },
  {
    slug: "pa-governor-2026",
    state: "PA",
    chamber: "governor",
    office: "Governor",
    title: "Pennsylvania Governor — 2026",
    shortTitle: "PA Governor",
    featured: true,
    incumbentNote: "Democratic Gov. Josh Shapiro is seeking a second term.",
    overview:
      "Pennsylvania elects a governor on November 3, 2026. Incumbent Democrat Josh Shapiro faces Republican Treasurer Stacy Garrity. Ballotpedia also lists a Libertarian candidate.",
    officeExplainer: governorOfficeExplainer,
    whyItMatters:
      "Cook rated the race Solid Democratic as of August 2026. Pennsylvania’s governor is a high-visibility executive in a state that often decides national narratives, even when a particular contest is not rated as a toss-up. County election offices print the precinct ballot.",
    howToRead:
      "Other row offices (attorney general, auditor general, treasurer) typically share the midterm ballot. Confirm each office with your county.",
    candidates: [
      person({
        name: "Josh Shapiro",
        party: "DEM",
        partyLabel: "Democratic",
        incumbent: true,
        bio: "Shapiro has been Pennsylvania governor since 2023 after serving as attorney general. He is seeking a second term. Official biographies emphasize statewide executive and law-enforcement work.",
        image: {
          src: "/candidates/josh-shapiro.jpg",
          alt: "Official portrait of Gov. Josh Shapiro",
          attribution: "Commonwealth of Pennsylvania / public domain",
          license: "Public domain (U.S. government work)",
          sourceUrl: "https://commons.wikimedia.org/wiki/File:Governor_Josh_Shapiro_official_photo.jpg",
        },
        links: [
          officialSite("Office of the Governor", "https://www.governor.pa.gov/"),
          wiki("Josh Shapiro", "Josh_Shapiro"),
          ballotpedia("Josh Shapiro", "Josh_Shapiro"),
        ],
        sources: [
          cite("Office of the Governor of Pennsylvania", "https://www.governor.pa.gov/about/"),
          cite("Ballotpedia, Pennsylvania gubernatorial election, 2026", "https://ballotpedia.org/Pennsylvania_gubernatorial_election,_2026"),
        ],
      }),
      person({
        name: "Stacy Garrity",
        party: "REP",
        partyLabel: "Republican",
        statusNote: "Republican nominee; current state treasurer",
        bio: "Garrity has been Pennsylvania treasurer since 2021. She is an Army veteran. She is the 2026 Republican nominee for governor.",
        image: {
          src: "/candidates/stacy-garrity.jpg",
          alt: "Official portrait of Treasurer Stacy Garrity",
          attribution: "Pennsylvania Treasury / public domain",
          license: "Public domain (U.S. government work)",
          sourceUrl: "https://commons.wikimedia.org/wiki/File:Stacy_Garrity_official_photo.jpg",
        },
        links: [
          officialSite("Pennsylvania Treasury", "https://www.patreasury.gov/"),
          wiki("Stacy Garrity", "Stacy_Garrity"),
          ballotpedia("Stacy Garrity", "Stacy_Garrity"),
        ],
        sources: [
          cite("Ballotpedia, State executive official elections, 2026", "https://ballotpedia.org/State_executive_official_elections,_2026"),
        ],
      }),
    ],
    ratings: [cook("Solid D", "August 20, 2026", cookGovUrl)],
    sources: [
      cite("Ballotpedia, State executive official elections, 2026", "https://ballotpedia.org/State_executive_official_elections,_2026"),
      cookGovPrintAug20,
    ],
    aggregatorLinks: govAggregators("https://ballotpedia.org/Pennsylvania_gubernatorial_election,_2026"),
    relatedPollSlugs: [],
    ballotSections: ["statewide"],
    faqs: standardFaqs("this governor’s race", "the Pennsylvania Department of State"),
  },
  {
    slug: "wi-governor-2026",
    state: "WI",
    chamber: "governor",
    office: "Governor",
    title: "Wisconsin Governor — 2026",
    shortTitle: "WI Governor",
    featured: true,
    incumbentNote: "Democratic Gov. Tony Evers is term-limited after two terms. The seat is open.",
    overview:
      "Wisconsin elects a governor on November 3, 2026. Democrat David Crowley, the Milwaukee County executive, faces Republican Rep. Tom Tiffany.",
    officeExplainer: governorOfficeExplainer,
    whyItMatters:
      "Cook rated the open Wisconsin governorship a toss-up as of August 2026. The office is central to state budget fights and appointments in a closely divided state. Municipal clerks issue ward sample ballots.",
    howToRead:
      "Wisconsin prints several constitutional offices on the same cycle. Use your clerk’s sample ballot for the full slate.",
    candidates: [
      person({
        name: "David Crowley",
        party: "DEM",
        partyLabel: "Democratic",
        statusNote: "Democratic nominee; Milwaukee County executive",
        bio: "Crowley has been Milwaukee County executive since 2020 after serving in the Wisconsin Legislature. He is the 2026 Democratic nominee for the open governorship.",
        links: [
          officialSite("Milwaukee County Executive", "https://county.milwaukee.gov/EN/County-Executive"),
          wiki("David Crowley", "David_Crowley_(Wisconsin_politician)"),
          ballotpedia("David Crowley", "David_Crowley"),
        ],
        sources: [
          cite("Ballotpedia, Wisconsin gubernatorial election, 2026", "https://ballotpedia.org/Wisconsin_gubernatorial_election,_2026"),
        ],
      }),
      person({
        name: "Tom Tiffany",
        party: "REP",
        partyLabel: "Republican",
        statusNote: "Republican nominee; U.S. representative, WI-07",
        bio: "Tiffany has represented Wisconsin’s 7th Congressional District since 2020. He previously served in the Wisconsin Legislature. He is the 2026 Republican nominee for governor.",
        image: {
          src: "/candidates/tom-tiffany.jpg",
          alt: "Official portrait of Rep. Tom Tiffany",
          attribution: "U.S. House / public domain",
          license: "Public domain (U.S. government work)",
          sourceUrl: "https://commons.wikimedia.org/wiki/File:Tom_Tiffany_official_portrait.jpg",
        },
        links: [
          officialSite("House office", "https://tiffany.house.gov/"),
          wiki("Tom Tiffany", "Tom_Tiffany"),
          ballotpedia("Tom Tiffany", "Tom_Tiffany"),
        ],
        sources: [
          cite("Biographical Directory of the U.S. Congress, Tom Tiffany", "https://bioguide.congress.gov/search/bio/T000165"),
        ],
      }),
    ],
    ratings: [cook("Tossup", "August 20, 2026", cookGovUrl)],
    sources: [
      cite("Ballotpedia, Wisconsin gubernatorial election, 2026", "https://ballotpedia.org/Wisconsin_gubernatorial_election,_2026"),
      cookGovPrintAug20,
    ],
    aggregatorLinks: govAggregators("https://ballotpedia.org/Wisconsin_gubernatorial_election,_2026"),
    relatedPollSlugs: [],
    ballotSections: ["statewide"],
    faqs: standardFaqs("this governor’s race", "the Wisconsin Elections Commission"),
  },
  {
    slug: "fl-governor-2026",
    state: "FL",
    chamber: "governor",
    office: "Governor",
    title: "Florida Governor — 2026",
    shortTitle: "FL Governor",
    featured: false,
    incumbentNote: "Republican Gov. Ron DeSantis is term-limited. The seat is open.",
    overview:
      "Florida elects a governor on November 3, 2026. Republican Rep. Byron Donalds faces Democrat David Jolly, a former Republican U.S. representative, after the August 18 primary. Ballotpedia lists additional no-party and Libertarian candidates.",
    officeExplainer: `${governorOfficeExplainer} Florida’s gubernatorial nominee selects a lieutenant-governor running mate for the general-election ticket.`,
    whyItMatters:
      "Cook published an August 27, 2026 analysis moving Florida’s open governorship from Solid to Likely Republican. Cabinet offices also appear statewide. Supervisors of elections print county sample ballots.",
    howToRead:
      "This page highlights the two major-party nominees. Confirm every qualified line, including running mates, on your county sample ballot.",
    candidates: [
      person({
        name: "Byron Donalds",
        party: "REP",
        partyLabel: "Republican",
        statusNote: "Republican nominee; U.S. representative, FL-19",
        bio: "Donalds has represented Florida’s 19th Congressional District since 2021. He won the August 2026 Republican primary for governor. House biographies list prior work in finance and the Florida House.",
        image: {
          src: "/candidates/byron-donalds.jpg",
          alt: "Official portrait of Rep. Byron Donalds",
          attribution: "U.S. House / public domain",
          license: "Public domain (U.S. government work)",
          sourceUrl: "https://commons.wikimedia.org/wiki/File:Rep._Byron_Donalds_official_photo.jpg",
        },
        links: [
          officialSite("House office", "https://donalds.house.gov/"),
          wiki("Byron Donalds", "Byron_Donalds"),
          ballotpedia("Byron Donalds", "Byron_Donalds"),
        ],
        sources: [
          cite("Biographical Directory of the U.S. Congress, Byron Donalds", "https://bioguide.congress.gov/search/bio/D000032"),
          cite("Ballotpedia, Florida gubernatorial election, 2026", "https://ballotpedia.org/Florida_gubernatorial_and_lieutenant_gubernatorial_election,_2026"),
        ],
      }),
      person({
        name: "David Jolly",
        party: "DEM",
        partyLabel: "Democratic",
        statusNote: "Democratic nominee; former Republican U.S. representative",
        bio: "Jolly represented Florida’s 13th Congressional District as a Republican from 2014 to 2017. He is the 2026 Democratic nominee for governor. Public biographies describe later work as a commentator and attorney.",
        image: {
          src: "/candidates/david-jolly.jpg",
          alt: "Official portrait of former Rep. David Jolly",
          attribution: "U.S. House / public domain",
          license: "Public domain (U.S. government work)",
          sourceUrl: "https://commons.wikimedia.org/wiki/File:David_Jolly_official_portrait.jpg",
        },
        links: [
          wiki("David Jolly", "David_Jolly"),
          ballotpedia("David Jolly", "David_Jolly"),
        ],
        sources: [
          cite("Biographical Directory of the U.S. Congress, David Jolly", "https://bioguide.congress.gov/search/bio/J000296"),
          cite("Ballotpedia, Florida gubernatorial election, 2026", "https://ballotpedia.org/Florida_gubernatorial_and_lieutenant_gubernatorial_election,_2026"),
        ],
      }),
    ],
    ratings: [cook("Likely R", "August 27, 2026", "https://www.cookpolitical.com/analysis/national/florida-governor/florida-governor-moves-solid-likely-republican")],
    sources: [
      cite("Ballotpedia, Florida gubernatorial election, 2026", "https://ballotpedia.org/Florida_gubernatorial_and_lieutenant_gubernatorial_election,_2026"),
      cite(
        "Cook Political Report, Florida Governor Moves From Solid to Likely Republican",
        "https://www.cookpolitical.com/analysis/national/florida-governor/florida-governor-moves-solid-likely-republican",
        "September 17, 2026",
        "August 27, 2026",
      ),
    ],
    aggregatorLinks: govAggregators("https://ballotpedia.org/Florida_gubernatorial_and_lieutenant_gubernatorial_election,_2026"),
    relatedPollSlugs: [],
    ballotSections: ["statewide"],
    faqs: standardFaqs("this governor’s race", "the Florida Division of Elections"),
  },
  {
    slug: "ca-governor-2026",
    state: "CA",
    chamber: "governor",
    office: "Governor",
    title: "California Governor — 2026",
    shortTitle: "CA Governor",
    featured: false,
    incumbentNote: "Democratic Gov. Gavin Newsom is term-limited. The seat is open.",
    overview:
      "California elects a governor on November 3, 2026. Democrat Xavier Becerra and Republican Steve Hilton advanced from the June 2 top-two primary.",
    officeExplainer: `${governorOfficeExplainer} California uses a top-two primary: the two highest vote-getters advance regardless of party.`,
    whyItMatters:
      "Cook rated the open California governorship Solid Democratic as of August 2026. The office directs the largest U.S. state government and shares a ballot with other constitutional offices and qualified propositions. County elections officials mail vote-by-mail ballots to registered voters.",
    howToRead:
      "Primary percentages below are certified results reported by Ballotpedia. Proposition text, if any, is official state language — not rewritten here.",
    candidates: [
      person({
        name: "Xavier Becerra",
        party: "DEM",
        partyLabel: "Democratic",
        statusNote: "Advanced from the June 2, 2026 top-two primary (28.0%)",
        bio: "Becerra served as U.S. secretary of health and human services from 2021 to 2025 and as California attorney general before that. He also represented a Los Angeles-area House district. He is one of two candidates in the November governor’s race.",
        image: {
          src: "/candidates/xavier-becerra.jpg",
          alt: "Official portrait of Xavier Becerra",
          attribution: "U.S. Department of Health and Human Services / public domain",
          license: "Public domain (U.S. government work)",
          sourceUrl: "https://commons.wikimedia.org/wiki/File:Xavier_Becerra_HHS_portrait.jpg",
        },
        links: [
          wiki("Xavier Becerra", "Xavier_Becerra"),
          ballotpedia("Xavier Becerra", "Xavier_Becerra"),
        ],
        sources: [
          cite("Ballotpedia, California gubernatorial election, 2026", "https://ballotpedia.org/California_gubernatorial_election,_2026"),
          cite("HHS, Secretary Xavier Becerra biography (archived official)", "https://www.hhs.gov/about/leadership/xavier-becerra/index.html"),
        ],
      }),
      person({
        name: "Steve Hilton",
        party: "REP",
        partyLabel: "Republican",
        statusNote: "Advanced from the June 2, 2026 top-two primary (24.6%)",
        bio: "Hilton is a television commentator and former adviser to U.K. Prime Minister David Cameron. He advanced from California’s June 2026 top-two primary to the November gubernatorial election.",
        links: [
          wiki("Steve Hilton", "Steve_Hilton"),
          ballotpedia("Steve Hilton", "Steve_Hilton"),
        ],
        sources: [
          cite("Ballotpedia, California gubernatorial election, 2026", "https://ballotpedia.org/California_gubernatorial_election,_2026"),
        ],
      }),
    ],
    ratings: [cook("Solid D", "August 20, 2026", cookGovUrl)],
    sources: [
      cite("Ballotpedia, California gubernatorial election, 2026", "https://ballotpedia.org/California_gubernatorial_election,_2026"),
      cookGovPrintAug20,
    ],
    aggregatorLinks: govAggregators("https://ballotpedia.org/California_gubernatorial_election,_2026"),
    relatedPollSlugs: [],
    ballotSections: ["statewide"],
    faqs: standardFaqs("this governor’s race", "the California Secretary of State"),
  },
  {
    slug: "ny-governor-2026",
    state: "NY",
    chamber: "governor",
    office: "Governor",
    title: "New York Governor — 2026",
    shortTitle: "NY Governor",
    featured: false,
    incumbentNote: "Democratic Gov. Kathy Hochul is seeking another term.",
    overview:
      "New York elects a governor on November 3, 2026. Incumbent Democrat Kathy Hochul faces Republican Bruce Blakeman, the Nassau County executive. Additional party lines, if any, appear on the official ballot.",
    officeExplainer: `${governorOfficeExplainer} New York often prints fusion or additional party lines; those lines are official ballot design, not something this site invents.`,
    whyItMatters:
      "Cook rated the race Solid Democratic as of August 2026. New York’s governor proposes the state budget and appoints to many offices. County boards of elections (and the New York City Board of Elections) issue sample ballots.",
    howToRead:
      "Lieutenant-governor pairing follows New York law. Confirm the printed ticket with your county board.",
    candidates: [
      person({
        name: "Kathy Hochul",
        party: "DEM",
        partyLabel: "Democratic",
        incumbent: true,
        bio: "Hochul became New York governor in 2021 and won a full term in 2022. She previously served as lieutenant governor and as a member of Congress. She is seeking another term in 2026.",
        image: {
          src: "/candidates/kathy-hochul.jpg",
          alt: "Official portrait of Gov. Kathy Hochul",
          attribution: "Office of the Governor of New York / public domain",
          license: "Public domain (U.S. government work)",
          sourceUrl: "https://commons.wikimedia.org/wiki/File:Kathy_Hochul_official_portrait.jpg",
        },
        links: [
          officialSite("Office of the Governor", "https://www.governor.ny.gov/"),
          wiki("Kathy Hochul", "Kathy_Hochul"),
          ballotpedia("Kathy Hochul", "Kathy_Hochul"),
        ],
        sources: [
          cite("Office of the Governor of New York", "https://www.governor.ny.gov/"),
          cite("Ballotpedia, New York gubernatorial election, 2026", "https://ballotpedia.org/New_York_gubernatorial_election,_2026"),
        ],
      }),
      person({
        name: "Bruce Blakeman",
        party: "REP",
        partyLabel: "Republican",
        statusNote: "Republican nominee; Nassau County executive",
        bio: "Blakeman has been Nassau County executive since 2022. He previously served on the county legislature and the MTA board. He is the 2026 Republican nominee for governor.",
        links: [
          officialSite("Nassau County Executive", "https://www.nassaucountyny.gov/3345/County-Executive"),
          wiki("Bruce Blakeman", "Bruce_Blakeman"),
          ballotpedia("Bruce Blakeman", "Bruce_Blakeman"),
        ],
        sources: [
          cite("Ballotpedia, New York gubernatorial election, 2026", "https://ballotpedia.org/New_York_gubernatorial_election,_2026"),
        ],
      }),
    ],
    ratings: [cook("Solid D", "August 20, 2026", cookGovUrl)],
    sources: [
      cite("Ballotpedia, New York gubernatorial election, 2026", "https://ballotpedia.org/New_York_gubernatorial_election,_2026"),
      cookGovPrintAug20,
    ],
    aggregatorLinks: govAggregators("https://ballotpedia.org/New_York_gubernatorial_election,_2026"),
    relatedPollSlugs: [],
    ballotSections: ["statewide"],
    faqs: standardFaqs("this governor’s race", "the New York State Board of Elections"),
  },
  {
    slug: "tx-governor-2026",
    state: "TX",
    chamber: "governor",
    office: "Governor",
    title: "Texas Governor — 2026",
    shortTitle: "TX Governor",
    featured: false,
    incumbentNote: "Republican Gov. Greg Abbott is seeking another term.",
    overview:
      "Texas elects a governor on November 3, 2026. Incumbent Republican Greg Abbott faces Democratic state Rep. Gina Hinojosa. Recent Emerson surveys also report a Libertarian candidate.",
    officeExplainer: governorOfficeExplainer,
    whyItMatters:
      "Cook moved Texas’s gubernatorial rating from Solid to Likely Republican on August 20, 2026, in the same analysis that moved the Senate race to a toss-up. The governor shares a ballot with Texas’s U.S. Senate race and other statewide offices. County administrators print precinct sample ballots.",
    howToRead:
      "Primary calendars in Texas are official party and state processes. This page lists the November major-party pairing reported in September 2026 coverage.",
    candidates: [
      person({
        name: "Greg Abbott",
        party: "REP",
        partyLabel: "Republican",
        incumbent: true,
        bio: "Abbott has been Texas governor since 2015 after serving as attorney general and as a state supreme court justice. He is seeking another term. Official biographies emphasize statewide executive tenure.",
        image: {
          src: "/candidates/greg-abbott.jpg",
          alt: "Official portrait of Gov. Greg Abbott",
          attribution: "Gage Skidmore, CC BY-SA 3.0",
          license: "CC BY-SA 3.0",
          sourceUrl: "https://commons.wikimedia.org/wiki/File:Greg_Abbott_by_Gage_Skidmore.jpg",
        },
        links: [
          officialSite("Office of the Governor", "https://gov.texas.gov/"),
          wiki("Greg Abbott", "Greg_Abbott"),
          ballotpedia("Greg Abbott", "Greg_Abbott"),
        ],
        sources: [
          cite("Office of the Governor of Texas", "https://gov.texas.gov/governor-abbott"),
          cite(
            "Emerson College Polling, Texas 2026 poll (Sept. 12–14)",
            "https://emersoncollegepolling.com/texas-2026-poll-talarico-and-paxton-in-dead-heat-abbott-maintains-edge/",
          ),
        ],
      }),
      person({
        name: "Gina Hinojosa",
        party: "DEM",
        partyLabel: "Democratic",
        statusNote: "Democratic nominee; Texas state representative",
        bio: "Hinojosa represents a Travis County district in the Texas House. She is the 2026 Democratic nominee for governor. Legislative biographies list education and local-government work before the House.",
        links: [
          officialSite("Texas House member page", "https://house.texas.gov/members/3080"),
          wiki("Gina Hinojosa", "Gina_Hinojosa"),
          ballotpedia("Gina Hinojosa", "Gina_Hinojosa"),
        ],
        sources: [
          cite("Texas House of Representatives, Rep. Gina Hinojosa", "https://house.texas.gov/members/3080"),
          cite(
            "Emerson College Polling, Texas 2026 poll (Sept. 12–14)",
            "https://emersoncollegepolling.com/texas-2026-poll-talarico-and-paxton-in-dead-heat-abbott-maintains-edge/",
          ),
        ],
      }),
    ],
    ratings: [cook("Likely R", "August 20, 2026", "https://www.cookpolitical.com/analysis/senate/senate-overview/texas-and-iowa-senate-races-move-toss-races-governor-also-move")],
    sources: [
      cite(
        "Cook Political Report, Texas and Iowa Senate races move to Toss Up",
        "https://www.cookpolitical.com/analysis/senate/senate-overview/texas-and-iowa-senate-races-move-toss-races-governor-also-move",
        "September 17, 2026",
        "August 20, 2026",
      ),
      cite(
        "Emerson College Polling, Texas 2026 poll (Sept. 12–14)",
        "https://emersoncollegepolling.com/texas-2026-poll-talarico-and-paxton-in-dead-heat-abbott-maintains-edge/",
      ),
    ],
    aggregatorLinks: govAggregators("https://ballotpedia.org/Texas_gubernatorial_election,_2026"),
    relatedPollSlugs: ["tx-gov-emerson-2026-09"],
    ballotSections: ["statewide"],
    faqs: standardFaqs("this governor’s race", "the Texas Secretary of State"),
  },
];
