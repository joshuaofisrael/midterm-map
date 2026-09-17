import type { StateCode, StateProfile } from "./types";

export const STARTER_STATES: StateProfile[] = [
  {
    code: "AZ",
    name: "Arizona",
    slug: "AZ",
    fips: "04",
    capital: "Phoenix",
    timezoneNote: "Most of Arizona does not observe daylight saving time; the Navajo Nation does.",
    summary:
      "Arizona voters in 2026 will see statewide executive offices, a U.S. House map, and local contests. Confirm your legislative and congressional districts on your county sample ballot.",
    officialElectionOffice: {
      label: "Arizona Secretary of State — Elections",
      href: "https://azsos.gov/elections",
    },
    voteGov: { label: "Vote.gov Arizona", href: "https://www.vote.gov/register/arizona/" },
    registrationNote:
      "Arizona registration deadlines and rules are set by state law. Check the Secretary of State and your county recorder.",
    earlyVotingNote:
      "Arizona uses a mail-ballot system in many counties and offers early in-person options. Hours and drop-box rules are county-specific.",
    mailNote:
      "Request or status tools for mail ballots are handled by county recorders, not this site.",
    idNote:
      "Arizona may ask for identification at the polling place. Acceptable ID lists are published by the state, not by Midterm Map.",
    hasSenateClass2: false,
    hasGovernor2026: true,
    sampleBallotNotes: [
      "Governor, secretary of state, attorney general, and other statewide offices may appear.",
      "U.S. House district lines depend on your address.",
      "County, municipal, school, and judicial contests vary by jurisdiction.",
    ],
  },
  {
    code: "GA",
    name: "Georgia",
    slug: "GA",
    fips: "13",
    capital: "Atlanta",
    timezoneNote: "Most of Georgia is on Eastern Time.",
    summary:
      "Georgia’s 2026 ballot is expected to include a U.S. Senate Class 2 seat, statewide executive offices, and U.S. House races. Use your official county sample ballot for the final list.",
    officialElectionOffice: {
      label: "Georgia Secretary of State — Elections",
      href: "https://sos.ga.gov/elections-division-georgia-secretary-states-office",
    },
    voteGov: { label: "Vote.gov Georgia", href: "https://www.vote.gov/register/georgia/" },
    registrationNote:
      "Georgia voter registration is administered by the Secretary of State and county election offices. Deadlines are official-only.",
    earlyVotingNote:
      "Advance voting locations and hours are published by county election superintendents.",
    mailNote:
      "Absentee-by-mail eligibility and request windows are set by Georgia law. Apply through official channels.",
    idNote:
      "Georgia requires photo identification for in-person voting. See the Secretary of State’s published ID list.",
    hasSenateClass2: true,
    hasGovernor2026: true,
    sampleBallotNotes: [
      "U.S. Senate (Class 2) is scheduled for the 2026 cycle.",
      "Governor and other statewide constitutional offices may appear.",
      "State House, State Senate, and local offices depend on your precinct.",
    ],
  },
  {
    code: "MI",
    name: "Michigan",
    slug: "MI",
    fips: "26",
    capital: "Lansing",
    timezoneNote: "Most of Michigan is on Eastern Time; four western Upper Peninsula counties use Central Time.",
    summary:
      "Michigan’s 2026 cycle includes a U.S. Senate Class 2 seat, statewide offices, and congressional districts drawn under the state’s independent process. Precinct ballots differ.",
    officialElectionOffice: {
      label: "Michigan Secretary of State — Elections",
      href: "https://www.michigan.gov/sos/elections",
    },
    voteGov: { label: "Vote.gov Michigan", href: "https://www.vote.gov/register/michigan/" },
    registrationNote:
      "Michigan offers online, mail, and in-person registration, including same-day options in many cases. Confirm current rules with the state.",
    earlyVotingNote:
      "Early in-person voting is administered locally. County and city clerks publish sites and hours.",
    mailNote:
      "Absent voter ballots can be requested through official Michigan tools. This site does not process requests.",
    idNote:
      "Michigan election ID rules are published by the Secretary of State. Bring the ID the state lists as acceptable.",
    hasSenateClass2: true,
    hasGovernor2026: true,
    sampleBallotNotes: [
      "U.S. Senate (Class 2) is scheduled for the 2026 cycle.",
      "Governor and other statewide offices may appear.",
      "Proposal language, if any, will appear on your official sample ballot — not as final text here.",
    ],
  },
  {
    code: "NC",
    name: "North Carolina",
    slug: "NC",
    fips: "37",
    capital: "Raleigh",
    timezoneNote: "North Carolina is on Eastern Time.",
    summary:
      "North Carolina’s 2026 ballot includes a U.S. Senate Class 2 seat and U.S. House races. The governor’s office is not on the 2026 cycle. County boards of elections publish sample ballots.",
    officialElectionOffice: {
      label: "North Carolina State Board of Elections",
      href: "https://www.ncsbe.gov/",
    },
    voteGov: {
      label: "Vote.gov North Carolina",
      href: "https://www.vote.gov/register/north-carolina/",
    },
    registrationNote:
      "Registration is handled through the State Board of Elections and county boards. Check the official deadline calendar.",
    earlyVotingNote:
      "One-stop early voting sites are set by county boards. Hours can vary by county and by day.",
    mailNote:
      "Absentee-by-mail request forms and witness rules are official North Carolina procedures.",
    idNote:
      "Photo ID rules for voting are published by the State Board of Elections.",
    hasSenateClass2: true,
    hasGovernor2026: false,
    sampleBallotNotes: [
      "U.S. Senate (Class 2) is scheduled for the 2026 cycle.",
      "Governor is not on the 2026 North Carolina ballot.",
      "County, municipal, and judicial contests vary widely.",
    ],
  },
  {
    code: "NV",
    name: "Nevada",
    slug: "NV",
    fips: "32",
    capital: "Carson City",
    timezoneNote: "Most of Nevada is on Pacific Time; a few communities near Idaho use Mountain Time.",
    summary:
      "Nevada’s 2026 cycle includes statewide executive offices and U.S. House races. Nevada generally mails ballots to active registered voters — confirm with your county clerk.",
    officialElectionOffice: {
      label: "Nevada Secretary of State — Elections",
      href: "https://www.nvsos.gov/sos/elections",
    },
    voteGov: { label: "Vote.gov Nevada", href: "https://www.vote.gov/register/nevada/" },
    registrationNote:
      "Nevada registration options include online and same-day in many circumstances. County clerks administer the rolls.",
    earlyVotingNote:
      "In-person early voting locations are published by county clerks.",
    mailNote:
      "Nevada’s mail-ballot program is administered by counties. Track your ballot through official county or state tools.",
    idNote:
      "Identification practices can differ for first-time and in-person voters. Use the Secretary of State’s published guidance.",
    hasSenateClass2: false,
    hasGovernor2026: true,
    sampleBallotNotes: [
      "Governor and other statewide offices may appear.",
      "U.S. Senate is not a Class 2 (2026) Nevada seat.",
      "Ballot questions, if qualified, appear on official sample ballots.",
    ],
  },
  {
    code: "OH",
    name: "Ohio",
    slug: "OH",
    fips: "39",
    capital: "Columbus",
    timezoneNote: "Most of Ohio is on Eastern Time.",
    summary:
      "Ohio’s 2026 cycle includes statewide executive offices and U.S. House races. County boards of elections issue sample ballots for each precinct.",
    officialElectionOffice: {
      label: "Ohio Secretary of State — Elections",
      href: "https://www.ohiosos.gov/elections/",
    },
    voteGov: { label: "Vote.gov Ohio", href: "https://www.vote.gov/register/ohio/" },
    registrationNote:
      "Ohio voter registration is processed by county boards of elections. Confirm deadlines on the Secretary of State site.",
    earlyVotingNote:
      "Early in-person voting is typically offered at county board offices, with hours set locally.",
    mailNote:
      "Absentee applications are official county forms. This site cannot request a ballot for you.",
    idNote:
      "Ohio photo ID requirements for voting are published by the Secretary of State.",
    hasSenateClass2: false,
    hasGovernor2026: true,
    sampleBallotNotes: [
      "Governor and other statewide offices may appear.",
      "U.S. Senate is not a Class 2 (2026) Ohio seat.",
      "State Issue language, if any, must be read on the official ballot.",
    ],
  },
  {
    code: "PA",
    name: "Pennsylvania",
    slug: "PA",
    fips: "42",
    capital: "Harrisburg",
    timezoneNote: "Most of Pennsylvania is on Eastern Time.",
    summary:
      "Pennsylvania’s 2026 cycle includes the governor’s office, other statewide row offices, and U.S. House races. County election offices print precinct-specific ballots.",
    officialElectionOffice: {
      label: "Pennsylvania Department of State — Voting",
      href: "https://www.pa.gov/agencies/vote",
    },
    voteGov: {
      label: "Vote.gov Pennsylvania",
      href: "https://www.vote.gov/register/pennsylvania/",
    },
    registrationNote:
      "Register or update through official Pennsylvania tools. County election offices maintain the lists.",
    earlyVotingNote:
      "Pennsylvania’s in-person options and mail-ballot timelines are set by state law and county practice.",
    mailNote:
      "Mail and civilian absentee ballots are requested through official county or state applications.",
    idNote:
      "Some voters may be asked for ID. See the Department of State’s current identification guidance.",
    hasSenateClass2: false,
    hasGovernor2026: true,
    sampleBallotNotes: [
      "Governor and other statewide offices may appear.",
      "U.S. Senate is not a Class 2 (2026) Pennsylvania seat.",
      "Judicial retention or local referenda appear only if certified for your ballot.",
    ],
  },
  {
    code: "WI",
    name: "Wisconsin",
    slug: "WI",
    fips: "55",
    capital: "Madison",
    timezoneNote: "Most of Wisconsin is on Central Time.",
    summary:
      "Wisconsin’s 2026 cycle includes statewide constitutional offices and U.S. House races. Municipal clerks are the front line for sample ballots and polling places.",
    officialElectionOffice: {
      label: "Wisconsin Elections Commission",
      href: "https://elections.wi.gov/",
    },
    voteGov: { label: "Vote.gov Wisconsin", href: "https://www.vote.gov/register/wisconsin/" },
    registrationNote:
      "Wisconsin allows several registration methods, including election-day registration in many cases. Confirm with your municipal clerk.",
    earlyVotingNote:
      "In-person absentee voting hours are set by municipal clerks and can differ by city or town.",
    mailNote:
      "Absentee ballot requests go through your municipal clerk. Photo ID is often required for the request.",
    idNote:
      "Wisconsin generally requires an acceptable photo ID to vote. The Elections Commission publishes the list.",
    hasSenateClass2: false,
    hasGovernor2026: true,
    sampleBallotNotes: [
      "Governor and other statewide offices may appear.",
      "U.S. Senate is not a Class 2 (2026) Wisconsin seat.",
      "County and municipal contests depend on your ward.",
    ],
  },
  {
    code: "TX",
    name: "Texas",
    slug: "TX",
    fips: "48",
    capital: "Austin",
    timezoneNote: "Most of Texas is on Central Time; El Paso and a few western counties use Mountain Time.",
    summary:
      "Texas’s 2026 cycle includes a U.S. Senate Class 2 seat, statewide executive offices, and a large U.S. House map. County election administrators publish sample ballots.",
    officialElectionOffice: {
      label: "Texas Secretary of State — Elections",
      href: "https://www.sos.texas.gov/elections/",
    },
    voteGov: { label: "Vote.gov Texas", href: "https://www.vote.gov/register/texas/" },
    registrationNote:
      "Texas registration is processed by county voter registrars. Check the official deadline before Election Day.",
    earlyVotingNote:
      "Early voting locations and weekend hours are set by each county.",
    mailNote:
      "Texas mail-ballot eligibility is limited. Apply only through official county or state forms if you qualify.",
    idNote:
      "Texas requires an acceptable form of photo ID, with listed exceptions. See the Secretary of State.",
    hasSenateClass2: true,
    hasGovernor2026: true,
    sampleBallotNotes: [
      "U.S. Senate (Class 2) is scheduled for the 2026 cycle.",
      "Governor and other statewide offices may appear.",
      "State Board of Education, legislature, and local races vary by address.",
    ],
  },
  {
    code: "FL",
    name: "Florida",
    slug: "FL",
    fips: "12",
    capital: "Tallahassee",
    timezoneNote: "Most of Florida is on Eastern Time; the Panhandle west of the Apalachicola River is on Central Time.",
    summary:
      "Florida’s 2026 cycle includes statewide executive offices and U.S. House races. Supervisors of elections in each county issue sample ballots.",
    officialElectionOffice: {
      label: "Florida Division of Elections",
      href: "https://www.dos.fl.gov/elections/",
    },
    voteGov: { label: "Vote.gov Florida", href: "https://www.vote.gov/register/florida/" },
    registrationNote:
      "Florida registration is handled by county supervisors of elections. Book-closing deadlines are official.",
    earlyVotingNote:
      "Early voting sites and hours are set by each supervisor of elections within state windows.",
    mailNote:
      "Vote-by-mail requests are made through your county supervisor. This site does not request ballots.",
    idNote:
      "Florida photo ID and signature requirements are published by the Division of Elections and your supervisor.",
    hasSenateClass2: false,
    hasGovernor2026: true,
    sampleBallotNotes: [
      "Governor and other statewide offices, including Cabinet races, may appear.",
      "U.S. Senate is not a Class 2 (2026) Florida seat.",
      "Constitutional amendments, if certified, appear with official ballot summaries.",
    ],
  },
  {
    code: "CA",
    name: "California",
    slug: "CA",
    fips: "06",
    capital: "Sacramento",
    timezoneNote: "Most of California is on Pacific Time.",
    summary:
      "California’s 2026 cycle includes statewide constitutional offices and U.S. House races. County elections officials mail vote-by-mail ballots to registered voters.",
    officialElectionOffice: {
      label: "California Secretary of State — Elections",
      href: "https://www.sos.ca.gov/elections",
    },
    voteGov: { label: "Vote.gov California", href: "https://www.vote.gov/register/california/" },
    registrationNote:
      "California offers online, same-day, and conditional registration in many cases. Confirm with your county elections office.",
    earlyVotingNote:
      "In-person early voting and ballot drop-off locations are published by counties.",
    mailNote:
      "Vote-by-mail ballots are generally mailed to active registered voters. Track them through official county tools.",
    idNote:
      "Most California voters are not asked for ID at the polls; first-time rules and exceptions are official-only.",
    hasSenateClass2: false,
    hasGovernor2026: true,
    sampleBallotNotes: [
      "Governor and other statewide offices may appear.",
      "U.S. Senate is not a Class 2 (2026) California seat.",
      "State propositions and local measures appear only if qualified for your ballot.",
    ],
  },
  {
    code: "NY",
    name: "New York",
    slug: "NY",
    fips: "36",
    capital: "Albany",
    timezoneNote: "Most of New York is on Eastern Time.",
    summary:
      "New York’s 2026 cycle includes statewide executive offices and U.S. House races. County boards of elections (and the New York City Board of Elections) publish sample ballots.",
    officialElectionOffice: {
      label: "New York State Board of Elections",
      href: "https://elections.ny.gov/",
    },
    voteGov: { label: "Vote.gov New York", href: "https://www.vote.gov/register/new-york/" },
    registrationNote:
      "New York registration is processed by county boards of elections. Deadlines differ for primary and general elections.",
    earlyVotingNote:
      "Early voting sites are designated by county boards. Hours are published before each election.",
    mailNote:
      "Absentee and early-mail options are official applications. Use your county board or the state portal.",
    idNote:
      "Some New York voters may be asked for ID. Follow the State Board of Elections guidance for your situation.",
    hasSenateClass2: false,
    hasGovernor2026: true,
    sampleBallotNotes: [
      "Governor and other statewide offices may appear.",
      "U.S. Senate is not a Class 2 (2026) New York seat.",
      "Judicial, municipal, and ballot-proposal contests are county- and city-specific.",
    ],
  },
];

export const STATE_CODES = STARTER_STATES.map((s) => s.code);

export function getState(code: string): StateProfile | undefined {
  return STARTER_STATES.find((s) => s.code === code.toUpperCase());
}

export function isStateCode(value: string): value is StateCode {
  return STATE_CODES.includes(value.toUpperCase() as StateCode);
}
