import { MORE_STATE_PROFILES } from "./statesMore";
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
      "Arizona’s November 3, 2026 publicity pamphlet lists eight propositions. The candidate list on this page names each U.S. House district, governor, lieutenant governor, attorney general, secretary of state, state treasurer, superintendent of public instruction, state mine inspector, the corporation commission, and the Arizona Supreme Court.",
    officialElectionOffice: {
      label: "Arizona Secretary of State — Elections",
      href: "https://azsos.gov/elections",
    },
    voteGov: { label: "Vote.gov: Arizona registration information", href: "https://vote.gov/register/arizona" },
    officialVoterLinks: [
      {
        label: "Arizona Secretary of State — Elections",
        href: "https://azsos.gov/elections",
      },
      {
        label: "Arizona Voter Information Portal — registration, polling place, and ballot status",
        href: "https://my.arizona.vote/PortalList.aspx",
      },
      {
        label: "Register or update voter registration online (AZ MVD Now)",
        href: "https://azmvdnow.gov/vr",
      },
      {
        label: "Request a one-time ballot-by-mail",
        href: "https://my.arizona.vote/Early/ApplicationLogin.aspx",
      },
      {
        label: "Vote.gov: Arizona registration information",
        href: "https://vote.gov/register/arizona",
      },
    ],
    ballotpedia: { label: "Ballotpedia — Arizona elections 2026", href: "https://ballotpedia.org/Arizona_elections,_2026" },
    statewideOffices2026: [
      "Governor",
      "Lieutenant Governor",
      "Attorney General",
      "Secretary of State",
      "State Treasurer",
      "Superintendent of Public Instruction",
      "State Mine Inspector",
      "Corporation Commission",
      "Arizona Supreme Court",
    ],
    cycleCheckedOn: "October 18, 2026",
    cycleSources: [
      {
        label: "Arizona Secretary of State — 2026 election information",
        href: "https://azsos.gov/elections/election-information/2026-election-info",
      },
      {
        label: "Arizona Secretary of State — ballot measures",
        href: "https://azsos.gov/elections/ballot-measures",
      },
      {
        label: "Arizona Secretary of State — 2026 general election publicity pamphlet",
        href: "https://apps.azsos.gov/election/BallotMeasures/2026/2026-AZ-Publicity-Pamphlet.pdf",
      },
    ],
    sampleBallotOfficial: { label: "Arizona Secretary of State — Elections", href: "https://azsos.gov/elections" },
    registrationNote:
      "Arizona registration deadlines for the November 3, 2026 general election are on the voting-deadlines page, with the Secretary of State calendar linked there.",
    earlyVotingNote:
      "Early-voting dates for the November 3, 2026 general election are on the voting-deadlines page. Hours and drop-off rules are county-specific.",
    mailNote:
      "Request or status tools for mail ballots are handled by county recorders, not this site.",
    idNote:
      "Identification rules are published by the Arizona Secretary of State.",
    hasSenateClass2: false,
    hasGovernor2026: true,
    sampleBallotNotes: [
      "The 2026 ballot-measures page lists eight propositions. Those proposition numbers are in the November 3, 2026 publicity pamphlet.",
      "U.S. House districts, governor, lieutenant governor, attorney general, secretary of state, treasurer, superintendent of public instruction, mine inspector, corporation commission, and the Arizona Supreme Court are in the candidate list on this page.",
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
      "Georgia’s November 2026 federal and state candidate file lists a U.S. Senate seat, statewide executive offices, and U.S. House contests by district. The file does not list a statewide ballot question.",
    officialElectionOffice: {
      label: "Georgia Secretary of State — Elections",
      href: "https://sos.ga.gov/elections-division-georgia-secretary-states-office",
    },
    voteGov: {
      label: "Vote.gov: Georgia registration information",
      href: "https://vote.gov/register/georgia",
    },
    officialVoterLinks: [
      {
        label: "Georgia Secretary of State — Elections Division",
        href: "https://sos.ga.gov/elections-division-georgia-secretary-states-office",
      },
      {
        label: "My Voter Page — registration, polling place, and ballot status",
        href: "https://mvp.sos.ga.gov/s/",
      },
      {
        label: "Register to vote online (Georgia)",
        href: "https://registertovote.sos.ga.gov/GAOLVR/",
      },
      {
        label: "Request or manage an absentee ballot",
        href: "https://securemyabsenteeballot.sos.ga.gov/s/",
      },
      {
        label: "Vote.gov: Georgia registration information",
        href: "https://vote.gov/register/georgia",
      },
    ],
    ballotpedia: { label: "Ballotpedia — Georgia elections 2026", href: "https://ballotpedia.org/Georgia_elections,_2026" },
    statewideOffices2026: [
      "U.S. Senate",
      "Governor",
      "Lieutenant Governor",
      "Secretary of State",
      "Attorney General",
      "Agriculture Commissioner",
      "Insurance and Fire Safety Commissioner",
      "State School Superintendent",
      "Labor Commissioner",
    ],
    cycleCheckedOn: "October 18, 2026",
    cycleSources: [
      {
        label: "Georgia Secretary of State — November 2026 federal and state candidates",
        href: "https://sos.ga.gov/sites/default/files/2026-09/November%202026%20Federal%20and%20State%20Candidates%202026.zip",
      },
      {
        label: "Georgia.gov — election guide",
        href: "https://georgia.gov/georgia-election-guide",
      },
    ],
    sampleBallotOfficial: { label: "Georgia My Voter Page", href: "https://mvp.sos.ga.gov/s/" },
    registrationNote:
      "Georgia voter registration is administered by the Secretary of State and county election offices. Dates for the November 3, 2026 general election are on the voting-deadlines page.",
    earlyVotingNote:
      "Advance voting locations and hours are published by county election superintendents.",
    mailNote:
      "Absentee-by-mail dates for the November 3, 2026 general election are on the voting-deadlines page, with the Georgia.gov election calendar linked there.",
    idNote:
      "Identification rules are published by the Georgia Secretary of State.",
    hasSenateClass2: true,
    hasGovernor2026: true,
    sampleBallotNotes: [
      "The November 2026 candidate file lists U.S. Senate and the statewide executive offices named above.",
      "U.S. House contests in that file are by district.",
      "That file does not list a statewide ballot question.",
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
      "Michigan’s 2026 general-election candidate report lists U.S. Senate, governor and lieutenant governor, other statewide offices, education and university boards, and two Supreme Court seats. The Secretary of State’s ballot-questions document lists Proposals 2026-1 and 2026-2.",
    officialElectionOffice: {
      label: "Michigan Secretary of State — Elections",
      href: "https://www.michigan.gov/sos/elections",
    },
    voteGov: { label: "Vote.gov: Michigan registration information", href: "https://vote.gov/register/michigan" },
    officialVoterLinks: [
      {
        label: "Michigan Secretary of State — Elections",
        href: "https://www.michigan.gov/sos/elections",
      },
      {
        label: "Michigan Voter Information Center — registration, polling place, sample ballot, and ballot tracking",
        href: "https://mvic.sos.state.mi.us/Voter/Index",
      },
      {
        label: "Register to vote online (Michigan)",
        href: "https://mvic.sos.state.mi.us/RegisterVoter/Index",
      },
      {
        label: "Apply for an absentee ballot online",
        href: "https://mvic.sos.state.mi.us/AVApplication",
      },
      {
        label: "Absentee voting (Michigan SOS)",
        href: "https://www.michigan.gov/sos/elections/voting/absentee-voting",
      },
      {
        label: "Vote.gov: Michigan registration information",
        href: "https://vote.gov/register/michigan",
      },
    ],
    ballotpedia: { label: "Ballotpedia — Michigan elections 2026", href: "https://ballotpedia.org/Michigan_elections,_2026" },
    statewideOffices2026: [
      "Governor / Lt. Governor 4 Year Term (1) Position",
      "Secretary of State 4 Year Term (1) Position",
      "Attorney General 4 Year Term (1) Position",
      "U.S. Senate 6 Year Term (1) Position",
      "Member of the State Board of Education 8 Year Terms (2) Positions",
      "Regent of the University of Michigan 8 Year Terms (2) Positions",
      "Trustee of Michigan State University 8 Year Terms (2) Positions",
      "Governor of Wayne State University 8 Year Terms (2) Positions",
      "Justice of Supreme Court 8 Year Terms (2) Positions",
    ],
    cycleCheckedOn: "October 18, 2026",
    cycleSources: [
      {
        label: "Michigan Bureau of Elections — 2026 general candidate report",
        href: "https://mi-boe.entellitrak.com/etk-mi-boe-prod/page.request.do?electionType=GEN&electionYear=2026&page=page.miboePublicReport",
      },
      {
        label: "Michigan Secretary of State — November 2026 ballot questions",
        href: "https://www.michigan.gov/sos/-/media/Project/Websites/sos/Elections/Home/Documents/2026-November-ballot-questions.pdf",
      },
    ],
    sampleBallotOfficial: { label: "Michigan Voter Information Center", href: "https://mvic.sos.state.mi.us/Voter/Index" },
    registrationNote:
      "Michigan registration dates for the November 3, 2026 general election are on the voting-deadlines page, with Secretary of State pages linked there.",
    earlyVotingNote:
      "Early in-person voting is administered locally. County and city clerks publish sites and hours.",
    mailNote:
      "Absent-voter ballot dates for the November 3, 2026 general election are on the voting-deadlines page. This site does not process ballot requests.",
    idNote:
      "Identification rules are published by the Michigan Secretary of State.",
    hasSenateClass2: true,
    hasGovernor2026: true,
    sampleBallotNotes: [
      "The 2026 general candidate report lists the statewide offices named above.",
      "The Secretary of State’s November 2026 ballot-questions document lists Proposal 2026-1 and Proposal 2026-2.",
      "U.S. House, legislative, and trial-court contests on that report are not statewide.",
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
      "North Carolina’s November 3, 2026 candidate list includes U.S. Senate, one Supreme Court associate-justice seat, and three Court of Appeals seats. Governor is not on that list. The state referendum file lists three constitutional amendments.",
    officialElectionOffice: {
      label: "North Carolina State Board of Elections",
      href: "https://www.ncsbe.gov/",
    },
    voteGov: {
      label: "Vote.gov: North Carolina registration information",
      href: "https://vote.gov/register/north-carolina",
    },
    officialVoterLinks: [
      {
        label: "North Carolina State Board of Elections",
        href: "https://www.ncsbe.gov/",
      },
      {
        label: "Voter Search — registration status, polling place, and sample ballot tools",
        href: "https://vt.ncsbe.gov/RegLkup/",
      },
      {
        label: "Register or update voter registration online (NCDMV)",
        href: "https://www.ncdot.gov/dmv/offices-services/online/Pages/voter-registration-application.aspx",
      },
      {
        label: "Request an absentee ballot (NC Absentee Ballot Portal)",
        href: "https://votebymail.ncsbe.gov/app/home",
      },
      {
        label: "Vote.gov: North Carolina registration information",
        href: "https://vote.gov/register/north-carolina",
      },
    ],
    ballotpedia: { label: "Ballotpedia — North Carolina elections 2026", href: "https://ballotpedia.org/North_Carolina_elections,_2026" },
    statewideOffices2026: [
      "U.S. Senate",
      "North Carolina Supreme Court Associate Justice Seat 01",
      "North Carolina Court of Appeals Judge Seat 01",
      "North Carolina Court of Appeals Judge Seat 02",
      "North Carolina Court of Appeals Judge Seat 03",
    ],
    cycleCheckedOn: "October 18, 2026",
    cycleSources: [
      {
        label: "North Carolina State Board of Elections — 2026 general candidate list, federal and state",
        href: "https://dl.ncsbe.gov/Elections/2026/Candidate%20Filing/2026_general_candidate_list_by_contest_federal_and_state.pdf",
      },
      {
        label: "North Carolina State Board of Elections — statewide referendums, November 3, 2026",
        href: "https://dl.ncsbe.gov/Elections/2026/Candidate%20Filing/statewide_referendums_20261103.pdf",
      },
    ],
    sampleBallotOfficial: { label: "North Carolina Voter Search", href: "https://vt.ncsbe.gov/RegLkup/" },
    registrationNote:
      "Registration is handled through the State Board of Elections and county boards. Dates for the November 3, 2026 general election are on the voting-deadlines page.",
    earlyVotingNote:
      "One-stop early voting sites are set by county boards. Hours can vary by county and by day.",
    mailNote:
      "Absentee-by-mail dates for the November 3, 2026 general election are on the voting-deadlines page, with the State Board of Elections calendar linked there.",
    idNote:
      "Identification rules are published by the North Carolina State Board of Elections.",
    hasSenateClass2: true,
    hasGovernor2026: false,
    sampleBallotNotes: [
      "The federal and state candidate list includes U.S. Senate, Supreme Court Associate Justice Seat 01, and Court of Appeals Judge Seats 01, 02, and 03.",
      "Governor is not an office on that list.",
      "The statewide referendum file dated September 2, 2026 lists three constitutional amendments.",
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
      "Clark County’s notice of the November 3, 2026 general election lists six statewide executive offices and two Nevada Supreme Court seats.",
    officialElectionOffice: {
      label: "Nevada Secretary of State — Elections",
      href: "https://www.nvsos.gov/sos/elections",
    },
    voteGov: { label: "Vote.gov: Nevada registration information", href: "https://vote.gov/register/nevada" },
    officialVoterLinks: [
      {
        label: "Nevada Secretary of State — Elections",
        href: "https://www.nvsos.gov/sos/elections",
      },
      {
        label: "Check voter registration, sample ballot, and polling place",
        href: "https://www.nvsos.gov/votersearch/",
      },
      {
        label: "Register or update voter registration online",
        href: "https://registertovote.nv.gov/",
      },
      {
        label: "Track your mail ballot (MyBallot.NV.gov)",
        href: "https://myballot.nv.gov/",
      },
      {
        label: "Vote.gov: Nevada registration information",
        href: "https://vote.gov/register/nevada",
      },
    ],
    ballotpedia: { label: "Ballotpedia — Nevada elections 2026", href: "https://ballotpedia.org/Nevada_elections,_2026" },
    statewideOffices2026: [
      "Governor",
      "Lieutenant Governor",
      "Secretary of State",
      "State Treasurer",
      "State Controller",
      "Attorney General",
      "Justice of the Supreme Court, Seat B",
      "Justice of the Supreme Court, Seat D",
    ],
    cycleCheckedOn: "October 18, 2026",
    cycleSources: [
      {
        label: "Clark County Registrar of Voters — notice of the November 3, 2026 general election",
        href: "https://www.clarkcountynv.gov/adobe/assets/urn:aaid:aem:46b035ca-1d1f-4a0a-b748-a0f42dd45794/original/as/notice-general-election-26g.pdf",
      },
    ],
    sampleBallotOfficial: {
      label: "Nevada Voter Search",
      href: "https://www.nvsos.gov/votersearch/",
    },
    registrationNote:
      "County clerks administer Nevada’s voter rolls. Dates for the November 3, 2026 general election are on the voting-deadlines page.",
    earlyVotingNote:
      "In-person early voting locations are published by county clerks.",
    mailNote:
      "Nevada’s mail-ballot program is administered by counties. Dates for the November 3, 2026 general election are on the voting-deadlines page.",
    idNote:
      "Identification rules are published by the Nevada Secretary of State.",
    hasSenateClass2: false,
    hasGovernor2026: true,
    sampleBallotNotes: [
      "The Clark County notice lists Representative in Congress, State Senate, and State Assembly by district.",
      "That notice does not include a United States Senator heading and does not list a statewide ballot question.",
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
      "The Henry County official ballot for November 3, 2026 prints Ohio’s statewide executive offices, two Supreme Court terms, and a U.S. Senate contest for an unexpired term ending January 3, 2029. The Secretary of State certified Issue 3 for that election.",
    officialElectionOffice: {
      label: "Ohio Secretary of State — Elections",
      href: "https://www.ohiosos.gov/elections/",
    },
    voteGov: { label: "Vote.gov: Ohio registration information", href: "https://vote.gov/register/ohio" },
    officialVoterLinks: [
      {
        label: "Ohio Secretary of State — Elections",
        href: "https://www.ohiosos.gov/elections/",
      },
      {
        label: "Voter lookup (registration status)",
        href: "https://voterlookup.ohiosos.gov/voterlookup.aspx",
      },
      {
        label: "Find my polling location",
        href: "https://www.ohiosos.gov/directories/find-my-polling-location",
      },
      {
        label: "Register or update online",
        href: "https://olvr.ohiosos.gov/",
      },
      {
        label: "Request an absentee ballot",
        href: "https://www.ohiosos.gov/elections/request-an-absentee-ballot",
      },
      {
        label: "Track my ballot",
        href: "https://www.ohiosos.gov/directories/ballot-tracking",
      },
      {
        label: "Vote.gov: Ohio registration information",
        href: "https://vote.gov/register/ohio",
      },
    ],
    ballotpedia: { label: "Ballotpedia — Ohio elections 2026", href: "https://ballotpedia.org/Ohio_elections,_2026" },
    statewideOffices2026: [
      "Governor and Lieutenant Governor",
      "Attorney General",
      "Auditor of State",
      "Secretary of State",
      "Treasurer of State",
      "Justice of the Supreme Court (full term commencing 1-1-2027)",
      "Justice of the Supreme Court (full term commencing 1-2-2027)",
      "U.S. Senator (unexpired term ending 1-3-2029)",
    ],
    cycleCheckedOn: "October 18, 2026",
    cycleSources: [
      {
        label: "Ohio Secretary of State — Issue 3 certification report, August 3, 2026",
        href: "https://www.ohiosos.gov/assets/2026-11-statewide-issue-3-report.pdf",
      },
      {
        label: "Henry County, Ohio — official general election ballot, November 3, 2026 (county source)",
        href: "https://henrycountyohio.gov/DocumentCenter/View/4380/November-3-2026-General",
      },
    ],
    sampleBallotOfficial: {
      label: "Ohio voter lookup",
      href: "https://voterlookup.ohiosos.gov/voterlookup.aspx",
    },
    registrationNote:
      "Ohio voter registration is processed by county boards of elections. Dates for the November 3, 2026 general election are on the voting-deadlines page.",
    earlyVotingNote:
      "Early in-person voting is offered through each county board of elections. Locations and daily hours are published by the county board.",
    mailNote:
      "Absentee applications are official county forms. This site does not request ballots.",
    idNote:
      "Identification rules are published by the Ohio Secretary of State.",
    hasSenateClass2: false,
    hasGovernor2026: true,
    sampleBallotNotes: [
      "The Henry County official ballot prints the statewide offices named above, including U.S. Senator for an unexpired term ending 1-3-2029.",
      "That contest is the office printed on the county ballot. This page does not label it a Class 2 seat.",
      "The Secretary of State’s August 3, 2026 certification places Issue 3 on the statewide ballot.",
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
      "Pennsylvania’s November 3, 2026 voter-services candidate list includes governor and lieutenant governor as the statewide offices. U.S. House contests on that list are by district.",
    officialElectionOffice: {
      label: "Pennsylvania Department of State — Voting",
      href: "https://www.pa.gov/agencies/vote",
    },
    voteGov: {
      label: "Vote.gov: Pennsylvania registration information",
      href: "https://vote.gov/register/pennsylvania",
    },
    officialVoterLinks: [
      {
        label: "Pennsylvania Department of State — voting and elections",
        href: "https://www.pa.gov/agencies/vote",
      },
      {
        label: "Check your voter registration status",
        href: "https://www.pavoterservices.pa.gov/pages/voterregistrationstatus.aspx",
      },
      {
        label: "Find your polling place",
        href: "https://www.pavoterservices.pa.gov/Pages/PollingPlaceInfo.aspx",
      },
      {
        label: "Track your mail or absentee ballot",
        href: "https://www.pavoterservices.pa.gov/Pages/BallotTracking.aspx",
      },
      {
        label: "Vote.gov: Pennsylvania registration information",
        href: "https://vote.gov/register/pennsylvania",
      },
    ],
    ballotpedia: { label: "Ballotpedia — Pennsylvania elections 2026", href: "https://ballotpedia.org/Pennsylvania_elections,_2026" },
    statewideOffices2026: ["Governor", "Lieutenant Governor"],
    cycleCheckedOn: "October 18, 2026",
    cycleSources: [
      {
        label: "Pennsylvania Department of State — PA Voter Services candidate list, 2026 general election",
        href: "https://www.pavoterservices.pa.gov/electioninfo/ElectionInfo.aspx",
      },
      {
        label: "Pennsylvania Department of State — voting and elections",
        href: "https://www.pa.gov/agencies/dos/programs/voting-and-elections",
      },
    ],
    sampleBallotOfficial: { label: "Pennsylvania Department of State — Voting", href: "https://www.pa.gov/agencies/vote" },
    registrationNote:
      "County election offices maintain Pennsylvania registration lists. Dates for the November 3, 2026 general election are on the voting-deadlines page.",
    earlyVotingNote:
      "Pennsylvania’s in-person options and mail-ballot timelines are set by state law and county practice.",
    mailNote:
      "Mail and civilian absentee dates for the November 3, 2026 general election are on the voting-deadlines page.",
    idNote:
      "Identification rules are published by the Pennsylvania Department of State.",
    hasSenateClass2: false,
    hasGovernor2026: true,
    sampleBallotNotes: [
      "The voter-services candidate list read October 18, 2026 includes Governor and Lieutenant Governor as the statewide offices.",
      "The same file lists U.S. House, General Assembly, and state-committee contests. Those are not statewide offices.",
      "The Department of State voting-and-elections page read the same day does not print a statewide ballot question.",
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
      "Wisconsin’s August 25, 2026 candidates-on-ballot report lists governor, attorney general, secretary of state, and state treasurer for November 3, 2026.",
    officialElectionOffice: {
      label: "Wisconsin Elections Commission",
      href: "https://elections.wi.gov/",
    },
    voteGov: {
      label: "Vote.gov: Wisconsin registration information",
      href: "https://vote.gov/register/wisconsin",
    },
    officialVoterLinks: [
      {
        label: "Wisconsin Elections Commission",
        href: "https://elections.wi.gov/",
      },
      {
        label: "MyVote Wisconsin — registration status, sample ballot, and municipal clerk tools",
        href: "https://myvote.wi.gov/",
      },
      {
        label: "Register or update voter registration (MyVote)",
        href: "https://myvote.wi.gov/en-us/Voter-Registration",
      },
      {
        label: "Request an absentee ballot (MyVote)",
        href: "https://myvote.wi.gov/en-us/Request-An-Absentee-Ballot",
      },
      {
        label: "Vote.gov: Wisconsin registration information",
        href: "https://vote.gov/register/wisconsin",
      },
    ],
    ballotpedia: { label: "Ballotpedia — Wisconsin elections 2026", href: "https://ballotpedia.org/Wisconsin_elections,_2026" },
    statewideOffices2026: ["Governor", "Attorney General", "Secretary of State", "State Treasurer"],
    cycleCheckedOn: "October 18, 2026",
    cycleSources: [
      {
        label: "Wisconsin Elections Commission — candidates on the ballot, November 3, 2026 general election",
        href: "https://elections.wi.gov/sites/default/files/documents/Candidates%20on%20Ballot%20By%20Election_November%203%202026%20General%20Election.pdf",
      },
    ],
    sampleBallotOfficial: { label: "MyVote Wisconsin", href: "https://myvote.wi.gov/" },
    registrationNote:
      "Wisconsin registration dates for the November 3, 2026 general election are on the voting-deadlines page, with the Elections Commission calendar linked there.",
    earlyVotingNote:
      "In-person absentee voting hours are set by municipal clerks and can differ by city or town.",
    mailNote:
      "Absentee ballot requests are handled by the municipal clerk. Dates for the November 3, 2026 general election are on the voting-deadlines page.",
    idNote:
      "Identification rules are published by the Wisconsin Elections Commission.",
    hasSenateClass2: false,
    hasGovernor2026: true,
    sampleBallotNotes: [
      "The candidates-on-ballot report lists Representative in Congress, State Senator, and Representative to the Assembly by district.",
      "That report does not include a United States Senator heading and does not list a referendum.",
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
      "The Texas Secretary of State’s August 28, 2026 ballot certification places a U.S. Senate seat, statewide executive offices, and statewide judicial offices on the ballot in all 254 counties. The current-elections page does not list a statewide constitutional-amendment proclamation.",
    officialElectionOffice: {
      label: "Texas Secretary of State — Elections",
      href: "https://www.sos.texas.gov/elections/index.shtml",
    },
    voteGov: { label: "Vote.gov: Texas registration information", href: "https://vote.gov/register/texas" },
    officialVoterLinks: [
      {
        label: "Texas Secretary of State — Elections",
        href: "https://www.sos.texas.gov/elections/index.shtml",
      },
      {
        label: "VoteTexas.gov (official state voter site)",
        href: "https://www.votetexas.gov/",
      },
      {
        label: "Am I Registered? / Where's my polling place",
        href: "https://goelect.txelections.civixapps.com/ivis-mvp-ui/#/login",
      },
      {
        label: "Track my mail ballot",
        href: "https://www.votetexas.gov/voting-by-mail/track-my-ballot.html",
      },
      {
        label: "Vote.gov: Texas registration information",
        href: "https://vote.gov/register/texas",
      },
    ],
    ballotpedia: { label: "Ballotpedia — Texas elections 2026", href: "https://ballotpedia.org/Texas_elections,_2026" },
    statewideOffices2026: [
      "U.S. Senator",
      "Governor",
      "Lieutenant Governor",
      "Attorney General",
      "Comptroller of Public Accounts",
      "Commissioner of the General Land Office",
      "Commissioner of Agriculture",
      "Railroad Commissioner",
      "Chief Justice, Supreme Court",
      "Justice, Supreme Court, Place 2 (unexpired term)",
      "Justice, Supreme Court, Place 7",
      "Justice, Supreme Court, Place 8",
      "Judge, Court of Criminal Appeals, Place 3",
      "Judge, Court of Criminal Appeals, Place 4",
      "Judge, Court of Criminal Appeals, Place 9",
      "Chief Justice, 15th Court of Appeals District",
      "Justice, 15th Court of Appeals District, Place 2",
      "Justice, 15th Court of Appeals District, Place 3",
    ],
    cycleCheckedOn: "October 18, 2026",
    cycleSources: [
      {
        label: "Texas Secretary of State — 2026 general election ballot certification",
        href: "https://www.sos.texas.gov/elections/forms/2026-ballot-cert.pdf",
      },
      {
        label: "Texas Secretary of State — November 3, 2026 general election",
        href: "https://www.sos.texas.gov/elections/laws/2026-november-general-election.shtml",
      },
    ],
    sampleBallotOfficial: {
      label: "Am I Registered? / Where's my polling place",
      href: "https://goelect.txelections.civixapps.com/ivis-mvp-ui/#/login",
    },
    registrationNote:
      "Texas registration is processed by county voter registrars. Dates for the November 3, 2026 general election are on the voting-deadlines page.",
    earlyVotingNote:
      "Early voting locations and weekend hours are set by each county.",
    mailNote:
      "Mail-ballot dates for the November 3, 2026 general election are on the voting-deadlines page, with the Texas Secretary of State calendar linked there.",
    idNote:
      "Identification rules are published by the Texas Secretary of State.",
    hasSenateClass2: true,
    hasGovernor2026: true,
    sampleBallotNotes: [
      "The August 28, 2026 ballot certification lists the offices above in all 254 counties, including the 15th Court of Appeals contests.",
      "U.S. House, the Legislature, other courts of appeals, and the State Board of Education are certified by district. County offices in that certification, including county judge, are not statewide.",
      "The current-elections page does not list a statewide constitutional-amendment proclamation.",
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
      "Florida’s November 3, 2026 candidate listing includes United States Senator, Governor, Attorney General, Chief Financial Officer, Commissioner of Agriculture, and Supreme Court Justice. The constitutional-initiatives table lists three 2026 general-election amendments.",
    officialElectionOffice: {
      label: "Florida Division of Elections",
      href: "https://dos.fl.gov/elections/",
    },
    voteGov: { label: "Vote.gov: Florida registration information", href: "https://vote.gov/register/florida" },
    officialVoterLinks: [
      {
        label: "Florida Division of Elections",
        href: "https://dos.fl.gov/elections/",
      },
      {
        label: "Check voter status and polling place",
        href: "https://registration.dos.fl.gov/CheckVoterStatus",
      },
      {
        label: "Online voter registration",
        href: "https://dos.fl.gov/elections/for-voters/voter-registration/online-voter-registration/",
      },
      {
        label: "Vote-by-mail ballot status lookup",
        href: "https://dos.fl.gov/elections/for-voters/check-your-voter-status-and-polling-place/vote-by-mail-ballot-information-and-status-lookup/",
      },
      {
        label: "Find your county Supervisor of Elections",
        href: "https://dos.fl.gov/elections/contacts/supervisor-of-elections/",
      },
      {
        label: "Vote.gov: Florida registration information",
        href: "https://vote.gov/register/florida",
      },
    ],
    ballotpedia: { label: "Ballotpedia — Florida elections 2026", href: "https://ballotpedia.org/Florida_elections,_2026" },
    statewideOffices2026: [
      "United States Senator",
      "Governor",
      "Attorney General",
      "Chief Financial Officer",
      "Commissioner of Agriculture",
      "Supreme Court Justice",
    ],
    cycleCheckedOn: "October 18, 2026",
    cycleSources: [
      {
        label: "Florida Division of Elections — candidate listing, 2026 general election",
        href: "https://dos.elections.myflorida.com/candidates/CanList.asp?elecid=20261103-GEN",
      },
      {
        label: "Florida Division of Elections — constitutional initiatives",
        href: "https://constitutionalinitiatives.dos.fl.gov/",
      },
    ],
    sampleBallotOfficial: {
      label: "Find your county Supervisor of Elections",
      href: "https://dos.fl.gov/elections/contacts/supervisor-of-elections/",
    },
    registrationNote:
      "Florida registration is handled by county supervisors of elections. Dates for the November 3, 2026 general election are on the voting-deadlines page.",
    earlyVotingNote:
      "Early voting sites and hours are set by each supervisor of elections within state windows.",
    mailNote:
      "Vote-by-mail dates for the November 3, 2026 general election are on the voting-deadlines page. This site does not request ballots.",
    idNote:
      "Identification rules are published by the Florida Division of Elections and the county supervisor of elections.",
    hasSenateClass2: false,
    hasGovernor2026: true,
    sampleBallotNotes: [
      "The candidate listing names United States Senator among the statewide contests.",
      "This page does not label that contest a Class 2 seat.",
      "The constitutional-initiatives table lists Amendments 1, 2, and 3 for the 2026 general election.",
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
      "California’s certified candidate list for November 3, 2026 has no U.S. Senate contest. It lists eight statewide executive offices and two Supreme Court retention contests. The qualified-ballot-measures page lists Propositions 1–5 and 37–45.",
    officialElectionOffice: {
      label: "California Secretary of State — Elections",
      href: "https://www.sos.ca.gov/elections",
    },
    voteGov: { label: "Vote.gov: California registration information", href: "https://vote.gov/register/california" },
    officialVoterLinks: [
      {
        label: "California Secretary of State — Elections",
        href: "https://www.sos.ca.gov/elections",
      },
      {
        label: "Check registration status",
        href: "https://voterstatus.sos.ca.gov/",
      },
      {
        label: "Register to vote online",
        href: "https://registertovote.ca.gov/",
      },
      {
        label: "Where's My Ballot? tracking",
        href: "https://www.sos.ca.gov/elections/ballot-status/wheres-my-ballot",
      },
      {
        label: "Find your polling place / vote center",
        href: "https://www.sos.ca.gov/elections/polling-place",
      },
      {
        label: "Vote.gov: California registration information",
        href: "https://vote.gov/register/california",
      },
    ],
    ballotpedia: { label: "Ballotpedia — California elections 2026", href: "https://ballotpedia.org/California_elections,_2026" },
    statewideOffices2026: [
      "Governor",
      "Lieutenant Governor",
      "Secretary of State",
      "Controller",
      "Treasurer",
      "Attorney General",
      "Insurance Commissioner",
      "Superintendent of Public Instruction",
      "Associate Justice of the Supreme Court (two contests, all 58 counties)",
    ],
    cycleCheckedOn: "October 18, 2026",
    cycleSources: [
      {
        label: "California Secretary of State — certified list of candidates, November 3, 2026 general election",
        href: "https://elections.cdn.sos.ca.gov/statewide-elections/2026-general/cert-list-candidates.pdf",
      },
      {
        label: "California Secretary of State — qualified ballot measures",
        href: "https://www.sos.ca.gov/elections/ballot-measures/qualified-ballot-measures",
      },
    ],
    sampleBallotOfficial: {
      label: "Check registration status",
      href: "https://voterstatus.sos.ca.gov/",
    },
    registrationNote:
      "California registration dates for the November 3, 2026 general election are on the voting-deadlines page, with the Secretary of State key-dates page linked there.",
    earlyVotingNote:
      "In-person early voting and ballot drop-off locations are published by counties.",
    mailNote:
      "Vote-by-mail mailing dates for the November 3, 2026 general election are on the voting-deadlines page.",
    idNote:
      "Identification rules are published by the California Secretary of State.",
    hasSenateClass2: false,
    hasGovernor2026: true,
    sampleBallotNotes: [
      "The certified candidate list dated August 27, 2026 does not include a U.S. Senate contest.",
      "That list places the statewide offices named above before all 58 counties.",
      "The qualified-ballot-measures page lists Propositions 1 through 5 and 37 through 45, and states that ACA 13 was removed from this ballot on June 25, 2026.",
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
      "New York’s October 7, 2026 amended ballot certification lists governor and lieutenant governor, comptroller, and attorney general as statewide offices. Representative in Congress is listed by district.",
    officialElectionOffice: {
      label: "New York State Board of Elections",
      href: "https://elections.ny.gov/",
    },
    voteGov: { label: "Vote.gov: New York registration information", href: "https://vote.gov/register/new-york" },
    officialVoterLinks: [
      {
        label: "New York State Board of Elections",
        href: "https://elections.ny.gov/",
      },
      {
        label: "Voter registration lookup",
        href: "https://voterlookup.elections.ny.gov/",
      },
      {
        label: "Register to vote",
        href: "https://elections.ny.gov/register-vote",
      },
      {
        label: "Request an absentee or early mail ballot",
        href: "https://elections.ny.gov/request-ballot",
      },
      {
        label: "Vote.gov: New York registration information",
        href: "https://vote.gov/register/new-york",
      },
    ],
    ballotpedia: { label: "Ballotpedia — New York elections 2026", href: "https://ballotpedia.org/New_York_elections,_2026" },
    statewideOffices2026: ["Governor and Lieutenant Governor", "Comptroller", "Attorney General"],
    cycleCheckedOn: "October 18, 2026",
    cycleSources: [
      {
        label: "New York State Board of Elections — amended 2026 general election ballot certification, October 7, 2026",
        href: "https://elections.ny.gov/system/files/documents/2026/10/accessible-2026-general-ballot-certification-10.7.2026.pdf",
      },
    ],
    sampleBallotOfficial: {
      label: "Voter registration lookup",
      href: "https://voterlookup.elections.ny.gov/",
    },
    registrationNote:
      "New York registration is processed by county boards of elections. Deadlines differ for primary and general elections.",
    earlyVotingNote:
      "Early voting sites are designated by county boards. Hours are published before each election.",
    mailNote:
      "Absentee and early-mail dates for the November 3, 2026 general election are on the voting-deadlines page.",
    idNote:
      "Identification rules are published by the New York State Board of Elections.",
    hasSenateClass2: false,
    hasGovernor2026: true,
    sampleBallotNotes: [
      "The October 7, 2026 certification marks Governor and Lieutenant Governor, Comptroller, and Attorney General as District: Statewide.",
      "Representative in Congress and State Senator are listed by district in the certification text read October 18, 2026.",
      "That certification text does not certify a statewide ballot proposal.",
    ],
  },
  {
    code: "MN",
    name: "Minnesota",
    slug: "MN",
    fips: "27",
    capital: "Saint Paul",
    timezoneNote: "Minnesota is on Central Time.",
    summary:
      "Minnesota’s November 3, 2026 candidate file lists a U.S. Senate seat, statewide executive offices, Supreme Court and Court of Appeals seats, and one constitutional amendment.",
    officialElectionOffice: {
      label: "Minnesota Secretary of State — Elections",
      href: "https://www.sos.mn.gov/elections-voting/",
    },
    voteGov: {
      label: "Vote.gov: Minnesota registration information",
      href: "https://vote.gov/register/minnesota",
    },
    officialVoterLinks: [
      {
        label: "Minnesota Secretary of State — Elections",
        href: "https://www.sos.mn.gov/elections-voting/",
      },
      {
        label: "Election results",
        href: "https://electionresults.sos.mn.gov/",
      },
      {
        label: "Register to vote",
        href: "https://www.sos.mn.gov/elections-voting/register-to-vote/",
      },
      {
        label: "What’s on my ballot",
        href: "https://www.sos.mn.gov/elections-voting/whats-on-my-ballot/",
      },
      {
        label: "Minnesota Voting Information Portal — sample ballot and polling place",
        href: "https://myballotmn.sos.mn.gov/",
      },
      {
        label: "Vote by mail",
        href: "https://www.sos.mn.gov/elections-voting/other-ways-to-vote/vote-by-mail-in-us/",
      },
      {
        label: "Vote.gov: Minnesota registration information",
        href: "https://vote.gov/register/minnesota",
      },
    ],
    ballotpedia: {
      label: "Ballotpedia — Minnesota elections 2026",
      href: "https://ballotpedia.org/Minnesota_elections,_2026",
    },
    statewideOffices2026: [
      "U.S. Senator (Class II, term expires in 2027)",
      "Governor & Lt Governor",
      "Secretary of State",
      "State Auditor",
      "Attorney General",
      "Associate Justice - Supreme Court 1",
      "Associate Justice - Supreme Court 4",
      "Judge - Court of Appeals 1, 7, 13, 15, and 18",
    ],
    cycleCheckedOn: "October 18, 2026",
    cycleSources: [
      {
        label: "Minnesota Secretary of State — candidate file for November 3, 2026",
        href: "https://electionresultsfiles.sos.mn.gov/20261103/cand.txt",
      },
      {
        label: "Minnesota Secretary of State — constitutional amendments",
        href: "https://www.sos.mn.gov/elections-voting/whats-on-my-ballot/constitutional-amendments/",
      },
      {
        label: "U.S. Senate — Class II, terms expire in 2027",
        href: "https://www.senate.gov/senators/Class_II.htm",
      },
    ],
    sampleBallotOfficial: {
      label: "Minnesota Voting Information Portal — sample ballot and polling place",
      href: "https://myballotmn.sos.mn.gov/",
    },
    registrationNote:
      "Minnesota registration dates for the November 3, 2026 general election are on the voting-deadlines page, with the Secretary of State calendar linked there.",
    earlyVotingNote:
      "Absentee-voting dates for the November 3, 2026 general election, including the in-person hours on the Secretary of State calendar, are on the voting-deadlines page. Local hours vary.",
    mailNote:
      "Absentee-ballot application and return dates for the November 3, 2026 general election are on the voting-deadlines page.",
    idNote: "Identification rules are published by the Minnesota Secretary of State.",
    hasSenateClass2: true,
    hasGovernor2026: true,
    sampleBallotNotes: [
      "The candidate file lists U.S. Representative, State Senator, and State Representative by district.",
      "The constitutional-amendments page titles the November 3, 2026 question “Increasing funding to school districts.”",
    ],
  },
  {
    code: "ME",
    name: "Maine",
    slug: "ME",
    fips: "23",
    capital: "Augusta",
    timezoneNote: "Maine is on Eastern Time.",
    summary:
      "Maine’s 2026 candidate list and office-order guide name U.S. senator and governor as the statewide offices.",
    officialElectionOffice: {
      label: "Maine Secretary of State — Elections and voting",
      href: "https://www.maine.gov/sos/elections-voting/",
    },
    voteGov: {
      label: "Vote.gov: Maine registration information",
      href: "https://vote.gov/register/maine",
    },
    officialVoterLinks: [
      {
        label: "Maine Secretary of State — Elections and voting",
        href: "https://www.maine.gov/sos/elections-voting/",
      },
      {
        label: "Election results and data",
        href: "https://www.maine.gov/sos/elections-voting/election-results-data",
      },
      {
        label: "Registering to vote",
        href: "https://www.maine.gov/sos/elections-voting/registering-to-vote",
      },
      {
        label: "Online voter registration",
        href: "https://registertovote.sos.maine.gov/",
      },
      {
        label: "Voter Information Lookup — voting place and ballot",
        href: "https://www.maine.gov/portal/government/edemocracy/voter_lookup.php",
      },
      {
        label: "Absentee ballot request and tracking",
        href: "https://absenteeballotrequest.sos.maine.gov/",
      },
      {
        label: "Vote.gov: Maine registration information",
        href: "https://vote.gov/register/maine",
      },
    ],
    ballotpedia: {
      label: "Ballotpedia — Maine elections 2026",
      href: "https://ballotpedia.org/Maine_elections,_2026",
    },
    statewideOffices2026: ["US Senator (Class II, term expires in 2027)", "Governor"],
    cycleCheckedOn: "October 18, 2026",
    cycleSources: [
      {
        label: "Maine Secretary of State — 2026 general election candidate list",
        href: "https://www.maine.gov/sos/sites/maine.gov.sos/files/inline-files/2026%20General%20Candidate%20List%20-%20FINAL.xlsx",
      },
      {
        label: "Maine Secretary of State — upcoming elections",
        href: "https://www.maine.gov/sos/elections-voting/upcoming-elections",
      },
      {
        label: "Maine Secretary of State — 2026 office listing (PDF)",
        href: "https://www.maine.gov/sos/sites/maine.gov.sos/files/inline-files/2026%20Candidate%20Office%20Order.pdf",
      },
      {
        label: "Maine Secretary of State — 2026 county offices by election cycle (PDF)",
        href: "https://www.maine.gov/sos/sites/maine.gov.sos/files/inline-files/2026%20County%20Offices%20Appearing%20on%20Ballot%20By%20Election%20Cycle%202%2012%2026.pdf",
      },
      {
        label: "U.S. Senate — Class II, terms expire in 2027",
        href: "https://www.senate.gov/senators/Class_II.htm",
      },
    ],
    sampleBallotOfficial: {
      label: "Maine Voter Information Lookup — voting place and ballot",
      href: "https://www.maine.gov/portal/government/edemocracy/voter_lookup.php",
    },
    registrationNote:
      "Maine registration dates for the November 3, 2026 general election are on the voting-deadlines page, with the Secretary of State voter guide and Title 21-A, §121-A linked there.",
    earlyVotingNote:
      "In-person absentee voting dates for the November 3, 2026 general election are on the voting-deadlines page. Municipal hours vary.",
    mailNote:
      "Absentee-ballot request and return dates for the November 3, 2026 general election are on the voting-deadlines page.",
    idNote: "Identification rules are published by the Maine Secretary of State.",
    hasSenateClass2: true,
    hasGovernor2026: true,
    sampleBallotNotes: [
      "The Secretary of State’s 2026 office listing names Representative to Congress, State Senator, and State Representative. The general-election candidate list includes those offices. Districts depend on the address.",
      "County offices on that candidate list vary by county. The Secretary of State publishes an office listing and a county-office chart.",
      "The upcoming-elections page says ranked-choice voting is used in the general election for federal offices only.",
      "The same page lists special county elections for Piscataquis County Commissioner District 3 and Sagadahoc County Register of Probate.",
    ],
  },
  {
    code: "IA",
    name: "Iowa",
    slug: "IA",
    fips: "19",
    capital: "Des Moines",
    timezoneNote: "Iowa is on Central Time.",
    summary:
      "Iowa’s November 3, 2026 candidate list names a U.S. Senate seat and seven statewide executive offices.",
    officialElectionOffice: {
      label: "Iowa Secretary of State — Elections and voting",
      href: "https://sos.iowa.gov/elections-voting",
    },
    voteGov: {
      label: "Vote.gov: Iowa registration information",
      href: "https://vote.gov/register/iowa",
    },
    officialVoterLinks: [
      {
        label: "Iowa Secretary of State — Elections and voting",
        href: "https://sos.iowa.gov/elections-voting",
      },
      {
        label: "Election results",
        href: "https://electionresults.iowa.gov/IA/",
      },
      {
        label: "Voter registration",
        href: "https://sos.iowa.gov/voters/voter-registration",
      },
      {
        label: "Absentee voting",
        href: "https://sos.iowa.gov/voters/absentee-voting",
      },
      {
        label: "Three-year election calendar",
        href: "https://sos.iowa.gov/three-year-election-calendar",
      },
      {
        label: "Voter Ready — November 2026 general election dates",
        href: "https://voterready.iowa.gov/",
      },
      {
        label: "Find my precinct and polling place",
        href: "https://apps.sos.iowa.gov/elections/voterreg/pollingplace/search.aspx",
      },
      {
        label: "Election Day",
        href: "https://sos.iowa.gov/voters/election-day",
      },
      {
        label: "Track my absentee ballot",
        href: "https://apps.sos.iowa.gov/elections/absenteeballotstatus/absentee/search",
      },
      {
        label: "County auditor list",
        href: "https://sos.iowa.gov/auditors",
      },
      {
        label: "Military and overseas civilian voters",
        href: "https://sos.iowa.gov/voters/military-and-overseas-civilian-voters",
      },
      {
        label: "November 3, 2026 general election",
        href: "https://sos.iowa.gov/general-election",
      },
      {
        label: "Vote.gov: Iowa registration information",
        href: "https://vote.gov/register/iowa",
      },
    ],
    ballotpedia: {
      label: "Ballotpedia — Iowa elections 2026",
      href: "https://ballotpedia.org/Iowa_elections,_2026",
    },
    statewideOffices2026: [
      "United States Senator (Class II, term expires in 2027)",
      "Governor",
      "Lieutenant Governor",
      "Secretary of State",
      "Auditor of State",
      "Treasurer of State",
      "Secretary of Agriculture",
      "Attorney General",
    ],
    cycleCheckedOn: "October 18, 2026",
    cycleSources: [
      {
        label: "Iowa Secretary of State — candidate list, November 3, 2026 general election",
        href: "https://sos.iowa.gov/sites/default/files/2026-08/2026%20General%20-%20Candidate%20List%20Database%20-%20All%20Elections_1.pdf",
      },
      {
        label: "U.S. Senate — Class II, terms expire in 2027",
        href: "https://www.senate.gov/senators/Class_II.htm",
      },
    ],
    registrationNote:
      "Iowa registration dates for the November 3, 2026 general election are on the voting-deadlines page, with the Secretary of State calendar and Iowa Code §48A.9 linked there.",
    earlyVotingNote:
      "In-person absentee voting dates for the November 3, 2026 general election are on the voting-deadlines page. County hours vary.",
    mailNote:
      "Absentee-ballot request and return dates for the November 3, 2026 general election are on the voting-deadlines page.",
    idNote: "Identification rules are published by the Iowa Secretary of State.",
    hasSenateClass2: true,
    hasGovernor2026: true,
    sampleBallotNotes: [
      "The Secretary of State’s general-election page lists U.S. Representative in all districts, State Senator in odd-numbered districts 1–49, and State Representative in districts 1–100. Districts depend on the address.",
      "That page lists some county supervisor seats, county treasurer, county recorder, county attorney, and any vacant county offices, and says county candidate information is with the county auditor.",
      "That page says judges may stand for retention at the general election before their terms expire.",
      "The same page lists some township officers, county public hospital trustees, soil and water conservation district commissioners, and county agricultural extension council members. Which of those appear depends on the jurisdiction.",
    ],
  },
  {
    code: "AK",
    name: "Alaska",
    slug: "AK",
    fips: "02",
    capital: "Juneau",
    timezoneNote:
      "The Division of Elections calendar states some deadlines in Alaska Time. The absentee and early-voting page states some deadlines in Alaska Standard Time.",
    summary:
      "Alaska’s November 3, 2026 candidate list includes governor and lieutenant governor, U.S. senator, U.S. representative, and a Supreme Court contest, plus two initiatives the petitions page says will appear.",
    officialElectionOffice: {
      label: "Alaska Division of Elections",
      href: "https://www.elections.alaska.gov/",
    },
    voteGov: {
      label: "Vote.gov: Alaska registration information",
      href: "https://vote.gov/register/alaska",
    },
    officialVoterLinks: [
      {
        label: "Alaska Division of Elections",
        href: "https://www.elections.alaska.gov/",
      },
      {
        label: "Election results",
        href: "https://www.elections.alaska.gov/election-results/",
      },
      {
        label: "Voter information",
        href: "https://www.elections.alaska.gov/voter-information/",
      },
      {
        label: "Register or update registration",
        href: "https://voterregistration.alaska.gov/",
      },
      {
        label: "Absentee and early voting",
        href: "https://www.elections.alaska.gov/voter-information/absentee-and-early-voting/",
      },
      {
        label: "Election calendar",
        href: "https://www.elections.alaska.gov/calendar/",
      },
      {
        label: "My Voter Portal — registration and absentee ballot status",
        href: "https://myvoterportal.alaska.gov/",
      },
      {
        label: "Polling place locations",
        href: "https://www.elections.alaska.gov/election-polls/",
      },
      {
        label: "Sample ballots",
        href: "https://www.elections.alaska.gov/sample-ballots/",
      },
      {
        label: "Military, overseas, and college voters",
        href: "https://www.elections.alaska.gov/voter-information/military-overseas-and-college-voters/",
      },
      {
        label: "2026 general election candidate list",
        href: "https://www.elections.alaska.gov/candidates/?election=26genr",
      },
      {
        label: "Petitions and ballot measures",
        href: "https://www.elections.alaska.gov/petitions-and-ballot-measures/#ballotmeasures",
      },
      {
        label: "Vote.gov: Alaska registration information",
        href: "https://vote.gov/register/alaska",
      },
    ],
    ballotpedia: {
      label: "Ballotpedia — Alaska elections 2026",
      href: "https://ballotpedia.org/Alaska_elections,_2026",
    },
    statewideOffices2026: [
      "Governor / Lieutenant Governor",
      "United States Senator (Class II, term expires in 2027)",
      "United States Representative",
      "Supreme Court",
    ],
    cycleCheckedOn: "October 18, 2026",
    cycleSources: [
      {
        label: "Alaska Division of Elections — 2026 general election candidate list",
        href: "https://www.elections.alaska.gov/candidates/?election=26genr",
      },
      {
        label: "Alaska Division of Elections — petitions and ballot measures",
        href: "https://www.elections.alaska.gov/petitions-and-ballot-measures/",
      },
      {
        label: "Alaska Division of Elections — election calendar",
        href: "https://www.elections.alaska.gov/calendar/",
      },
      {
        label: "Alaska Division of Elections — general election information",
        href: "https://www.elections.alaska.gov/election-information/#GENR",
      },
      {
        label: "U.S. Senate — Class II, terms expire in 2027",
        href: "https://www.senate.gov/senators/Class_II.htm",
      },
    ],
    sampleBallotOfficial: {
      label: "Alaska Division of Elections — sample ballots",
      href: "https://www.elections.alaska.gov/sample-ballots/",
    },
    registrationNote:
      "Alaska registration dates for the November 3, 2026 general election are on the voting-deadlines page, with the Division of Elections calendar and candidate list linked there.",
    earlyVotingNote:
      "Absentee in-person and early-voting dates for the November 3, 2026 general election are on the voting-deadlines page. Location hours vary.",
    mailNote:
      "Absentee-ballot application and return dates for the November 3, 2026 general election are on the voting-deadlines page.",
    idNote: "Identification rules are published by the Alaska Division of Elections.",
    hasSenateClass2: true,
    hasGovernor2026: true,
    sampleBallotNotes: [
      "The Division of Elections’ 2026 general-election candidate list includes a U.S. Representative contest, State Senate districts A, C, E, G, I, K, M, O, Q, and S, and State House districts 1 through 40. The district depends on the address.",
      "That list includes Supreme Court retention and state superior court and state district court retention contests.",
      "The general-election information page says general elections are conducted by ranked choice voting, and that judicial retentions and ballot measures are not.",
      "That page links to the petitions page for ballot measures appearing on the general election ballot. The petitions page lists 25USCV, described there as an initiative to require that only United States citizens may be qualified voters in Alaska elections, and 24ESEG, described there as an initiative to repeal the open primary and ranked choice general elections, each with the status “Will appear on General Election ballot.”",
    ],
  },
  {
    code: "KS",
    name: "Kansas",
    slug: "KS",
    fips: "20",
    capital: "Topeka",
    timezoneNote:
      "Kansas includes counties in the central time zone and counties in the mountain time zone. K.S.A. 25-106 states poll hours separately for each zone.",
    summary:
      "Kansas’s candidate-information page lists a U.S. Senate seat, governor and lieutenant governor, four other statewide executive offices, and statewide judicial retentions, plus one constitutional amendment.",
    officialElectionOffice: {
      label: "Kansas Secretary of State — Elections",
      href: "https://sos.ks.gov/elections/elections.html",
    },
    voteGov: {
      label: "Vote.gov: Kansas registration information",
      href: "https://vote.gov/register/kansas",
    },
    officialVoterLinks: [
      {
        label: "Kansas Secretary of State — Elections",
        href: "https://sos.ks.gov/elections/elections.html",
      },
      {
        label: "Election results",
        href: "https://sos.ks.gov/elections/election-results.html",
      },
      {
        label: "Voter registration",
        href: "https://sos.ks.gov/elections/voter-registration.html",
      },
      {
        label: "Voter information",
        href: "https://sos.ks.gov/elections/voter-information.html",
      },
      {
        label: "Important election dates",
        href: "https://sos.ks.gov/elections/important-election-dates.html",
      },
      {
        label: "2026 general election dates (PDF)",
        href: "https://sos.ks.gov/Pubs/Elections/2026-General-Election-Dates-2.pdf",
      },
      {
        label: "Advance voting information",
        href: "https://sos.ks.gov/elections/advance-voting-information.html",
      },
      {
        label: "Online voter registration (Kansas Department of Revenue)",
        href: "https://www.kdor.ks.gov/Apps/VoterReg",
      },
      {
        label: "Kansas VoterView — registration, sample ballot, and polling place",
        href: "https://kansasvoterinfo.gov/",
      },
      {
        label: "Candidate information",
        href: "https://sos.ks.gov/elections/candidate-information.html",
      },
      {
        label: "Candidate lists",
        href: "https://sos.ks.gov/elections/elections_upcoming_candidate.aspx",
      },
      {
        label: "Proposed constitutional amendments",
        href: "https://www.sos.ks.gov/elections/proposed-constitutional-amendments.html",
      },
      {
        label: "Military and overseas citizens",
        href: "https://sos.ks.gov/elections/military-overseas-citizens.html",
      },
      {
        label: "Vote.gov: Kansas registration information",
        href: "https://vote.gov/register/kansas",
      },
    ],
    ballotpedia: {
      label: "Ballotpedia — Kansas elections 2026",
      href: "https://ballotpedia.org/Kansas_elections,_2026",
    },
    statewideOffices2026: [
      "1 U.S. Senator (Class II, term expires in 2027)",
      "Governor/Lt. Governor",
      "Secretary of State",
      "Attorney General",
      "State Treasurer",
      "Commissioner of Insurance",
      "1 Kansas Supreme Court Justice (as of July 1, 2025)",
      "6 Kansas Court of Appeals Judges (as of July 1, 2025)",
    ],
    cycleCheckedOn: "October 19, 2026",
    cycleSources: [
      {
        label: "Kansas Secretary of State — offices to be elected or retained in 2026",
        href: "https://sos.ks.gov/elections/candidate-information.html",
      },
      {
        label: "Kansas Secretary of State — candidate lists",
        href: "https://sos.ks.gov/elections/elections_upcoming_candidate.aspx",
      },
      {
        label: "Kansas Secretary of State — proposed constitutional amendments",
        href: "https://www.sos.ks.gov/elections/proposed-constitutional-amendments.html",
      },
      {
        label: "U.S. Senate — Class II, terms expire in 2027",
        href: "https://www.senate.gov/senators/Class_II.htm",
      },
    ],
    sampleBallotOfficial: {
      label: "Kansas VoterView — registration, sample ballot, and polling place",
      href: "https://kansasvoterinfo.gov/",
    },
    registrationNote:
      "Kansas registration dates for the November 3, 2026 general election are on the voting-deadlines page, with the Secretary of State calendar and K.S.A. 25-2311 linked there.",
    earlyVotingNote:
      "Advance-voting dates for the November 3, 2026 general election are on the voting-deadlines page. County hours vary.",
    mailNote:
      "Advance-ballot application and return dates for the November 3, 2026 general election are on the voting-deadlines page.",
    idNote: "Identification rules are published by the Kansas Secretary of State.",
    hasSenateClass2: true,
    hasGovernor2026: true,
    sampleBallotNotes: [
      "The Secretary of State’s candidate-information page lists all 4 U.S. Representative seats, State Senate District 24, and all 125 State Representative seats for 2026. The district depends on the address.",
      "That page lists State Board of Education seats 1, 3, 5, 7, and 9.",
      "That page lists 1 Kansas Supreme Court justice, 6 Kansas Court of Appeals judges, district court judges (45 retained, 29 elected), and district magistrate judges (15 retained, 5 elected). Each of those judicial lines is marked on the page as of July 1, 2025.",
      "The proposed-constitutional-amendments page says one constitutional amendment will be voted on at the November 3, 2026 general election. That page’s explanatory statement says the amendment would clarify that only a citizen of the United States is eligible to vote in the state. The question text is on that page.",
      "The candidate-list page says the table is updated automatically as each candidate files a valid petition or declaration of intention. The 2026 General selection of that list, read October 17, 2026, is the source for the U.S. Senate and governor names on the race guides. Other offices on that table are not named here.",
    ],
  },
  {
    code: "IL",
    name: "Illinois",
    slug: "IL",
    fips: "17",
    capital: "Springfield",
    timezoneNote: "Illinois is on Central Time.",
    summary:
      "The Illinois State Board of Elections candidate list for November 3, 2026 includes United States Senator, governor and lieutenant governor, attorney general, secretary of state, comptroller, and treasurer. The U.S. Senate lists Illinois in Class II.",
    officialElectionOffice: {
      label: "Illinois State Board of Elections",
      href: "https://www.elections.il.gov/",
    },
    voteGov: {
      label: "Vote.gov: Illinois registration information",
      href: "https://vote.gov/register/illinois",
    },
    officialVoterLinks: [
      {
        label: "Illinois State Board of Elections",
        href: "https://www.elections.il.gov/",
      },
      {
        label: "Candidate list, 2026 general election",
        href: "https://www.elections.il.gov/ElectionOperations/CandidateList.aspx?ElectionID=sejIrI%2BQmww%3D",
      },
      {
        label: "Illinois voters guide",
        href: "https://votersguide.elections.il.gov/",
      },
      {
        label: "Voting by mail",
        href: "https://www.elections.il.gov/electionoperations/votingbymail.aspx",
      },
      {
        label: "Polling place lookup",
        href: "https://ova.elections.il.gov/PollingPlaceLookup.aspx",
      },
      {
        label: "Vote.gov: Illinois registration information",
        href: "https://vote.gov/register/illinois",
      },
    ],
    ballotpedia: {
      label: "Ballotpedia — Illinois elections 2026",
      href: "https://ballotpedia.org/Illinois_elections,_2026",
    },
    statewideOffices2026: [
      "United States Senator",
      "Governor and Lieutenant Governor",
      "Attorney General",
      "Secretary of State",
      "Comptroller",
      "Treasurer",
    ],
    cycleCheckedOn: "October 18, 2026",
    cycleSources: [
      {
        label: "Illinois State Board of Elections — candidate list, 2026 general election",
        href: "https://www.elections.il.gov/ElectionOperations/CandidateList.aspx?ElectionID=sejIrI%2BQmww%3D",
      },
      {
        label: "U.S. Senate — Class II, terms expire in 2027",
        href: "https://www.senate.gov/senators/Class_II.htm",
      },
    ],
    sampleBallotOfficial: {
      label: "Illinois voters guide",
      href: "https://votersguide.elections.il.gov/",
    },
    registrationNote:
      "Illinois registration dates for the November 3, 2026 general election are on the voting-deadlines page, with the State Board of Elections chart and calendar linked there.",
    earlyVotingNote:
      "Early-voting dates for the November 3, 2026 general election are on the voting-deadlines page. Election-authority hours vary.",
    mailNote:
      "Vote-by-mail application dates for the November 3, 2026 general election are on the voting-deadlines page. The pages read for that update do not print a return deadline.",
    idNote: "Identification rules are published by the Illinois State Board of Elections.",
    hasSenateClass2: true,
    hasGovernor2026: true,
    sampleBallotNotes: [
      "The candidate list includes United States Senator, Governor and Lieutenant Governor, Attorney General, Secretary of State, Comptroller, and Treasurer as statewide offices.",
      "The U.S. Senate Class II roster lists Richard J. Durbin of Illinois among senators whose terms expire in 2027.",
      "That candidate list does not list a referendum.",
    ],
  },
  {
    code: "NH",
    name: "New Hampshire",
    slug: "NH",
    fips: "33",
    capital: "Concord",
    timezoneNote: "New Hampshire is on Eastern Time.",
    summary:
      "New Hampshire’s 2026 general-election candidate list names governor and United States senator as the offices before the district headings.",
    officialElectionOffice: {
      label: "New Hampshire Secretary of State — Elections",
      href: "https://www.sos.nh.gov/elections",
    },
    voteGov: { label: "Vote.gov: New Hampshire registration information", href: "https://vote.gov/register/new-hampshire" },
    officialVoterLinks: [
      { label: "New Hampshire Secretary of State — Elections", href: "https://www.sos.nh.gov/elections" },
      { label: "2026 general election candidate list", href: "https://mm.nh.gov/files/uploads/sos/docs/2026-ge-candidate-list.pdf" },
      { label: "Vote.gov: New Hampshire registration information", href: "https://vote.gov/register/new-hampshire" },
    ],
    ballotpedia: { label: "Ballotpedia — New Hampshire elections 2026", href: "https://ballotpedia.org/New_Hampshire_elections,_2026" },
    statewideOffices2026: ["Governor", "United States Senator (Class II, term expires in 2027)"],
    cycleCheckedOn: "October 18, 2026",
    cycleSources: [
      { label: "New Hampshire Secretary of State — 2026 general election candidate list", href: "https://mm.nh.gov/files/uploads/sos/docs/2026-ge-candidate-list.pdf" },
      { label: "U.S. Senate — Class II, terms expire in 2027", href: "https://www.senate.gov/senators/Class_II.htm" },
    ],
    sampleBallotOfficial: { label: "Search Polling Places and Sample Ballots by Address", href: "https://app.sos.nh.gov/pollingplacesampleballot" },
    registrationNote: "Registration dates stored for the November 3, 2026 general election are on the voting-deadlines page.",
    earlyVotingNote: "Early-voting dates stored for the November 3, 2026 general election are on the voting-deadlines page.",
    mailNote: "Mail-ballot dates stored for the November 3, 2026 general election are on the voting-deadlines page.",
    idNote: "Identification rules are published by the New Hampshire Secretary of State.",
    hasSenateClass2: true,
    hasGovernor2026: true,
    sampleBallotNotes: [
      "The candidate list names Representative in Congress and Executive Councilor by district, then the legislature and county offices.",
      "That list does not list a ballot question.",
    ],
  },
  {
    code: "VA",
    name: "Virginia",
    slug: "VA",
    fips: "51",
    capital: "Richmond",
    timezoneNote: "Virginia is on Eastern Time.",
    summary:
      "Virginia’s November 3, 2026 candidate list marks United States Senate as statewide.",
    officialElectionOffice: {
      label: "Virginia Department of Elections",
      href: "https://www.elections.virginia.gov/",
    },
    voteGov: { label: "Vote.gov: Virginia registration information", href: "https://vote.gov/register/virginia" },
    officialVoterLinks: [
      { label: "Virginia Department of Elections", href: "https://www.elections.virginia.gov/" },
      { label: "November 3, 2026 general election, all offices", href: "https://www.elections.virginia.gov/casting-a-ballot/candidate-list/november-3-2026-gen-elect-all-offices/" },
      { label: "Upcoming elections", href: "https://www.elections.virginia.gov/casting-a-ballot/calendars-schedules/upcoming-elections.html" },
      { label: "Early voting news release, September 11, 2026", href: "https://www.elections.virginia.gov/news-releases/name-34420-en.html" },
      { label: "Vote.gov: Virginia registration information", href: "https://vote.gov/register/virginia" },
    ],
    ballotpedia: { label: "Ballotpedia — Virginia elections 2026", href: "https://ballotpedia.org/Virginia_elections,_2026" },
    statewideOffices2026: ["Member, United States Senate (Class II, term expires in 2027)"],
    cycleCheckedOn: "October 18, 2026",
    cycleSources: [
      { label: "Virginia Department of Elections — November 3, 2026 general election, all offices", href: "https://www.elections.virginia.gov/casting-a-ballot/candidate-list/november-3-2026-gen-elect-all-offices/" },
      { label: "Virginia Department of Elections — upcoming elections", href: "https://www.elections.virginia.gov/casting-a-ballot/calendars-schedules/upcoming-elections.html" },
      { label: "Virginia Department of Elections — early voting news release, September 11, 2026", href: "https://www.elections.virginia.gov/news-releases/name-34420-en.html" },
      { label: "U.S. Senate — Class II, terms expire in 2027", href: "https://www.senate.gov/senators/Class_II.htm" },
    ],
    sampleBallotOfficial: { label: "Polling Place and Ballot Information Lookup", href: "https://www.elections.virginia.gov/casting-a-ballot/polling-place-lookup/" },
    registrationNote: "Registration dates for the November 3, 2026 general election are on the voting-deadlines page.",
    earlyVotingNote: "Early in-person voting dates for the November 3, 2026 general election are on the voting-deadlines page.",
    mailNote: "The mailed-ballot application date and the November 6, 2026 noon receipt deadline are on the voting-deadlines page.",
    idNote: "Identification rules are published by the Virginia Department of Elections.",
    hasSenateClass2: true,
    hasGovernor2026: false,
    sampleBallotNotes: [
      "The all-offices list uses “Member, House of Representatives” and also includes local offices.",
      "The upcoming-elections page names a House of Delegates District 20 special election and says proposed constitutional amendments are on the ballot. That page does not print the amendment titles. The September 11, 2026 news release says three proposed amendments are on the ballot and does not print their titles.",
    ],
  },
  {
    code: "NJ",
    name: "New Jersey",
    slug: "NJ",
    fips: "34",
    capital: "Trenton",
    timezoneNote: "New Jersey is on Eastern Time.",
    summary: "New Jersey’s 2026 election-information page lists official general-election candidates for U.S. Senate and U.S. House.",
    officialElectionOffice: {
      label: "New Jersey Department of State — Elections",
      href: "https://www.nj.gov/state/elections/",
    },
    voteGov: { label: "Vote.gov: New Jersey registration information", href: "https://vote.gov/register/new-jersey" },
    officialVoterLinks: [
      { label: "New Jersey Division of Elections — 2026 election information", href: "https://nj.gov/state/elections/election-information-2026.shtml" },
      { label: "New Jersey voter information portal", href: "https://nj.gov/state/elections/vote.shtml" },
      { label: "Vote.gov: New Jersey registration information", href: "https://vote.gov/register/new-jersey" },
    ],
    ballotpedia: { label: "Ballotpedia — New Jersey elections 2026", href: "https://ballotpedia.org/New_Jersey_elections,_2026" },
    statewideOffices2026: ["U.S. Senate (Class II, term expires in 2027)"],
    cycleCheckedOn: "October 18, 2026",
    cycleSources: [
      { label: "New Jersey Division of Elections — 2026 election information", href: "https://nj.gov/state/elections/election-information-2026.shtml" },
      { label: "U.S. Senate — Class II, terms expire in 2027", href: "https://www.senate.gov/senators/Class_II.htm" },
    ],
    sampleBallotOfficial: { label: "Polling place search", href: "https://voter.svrs.nj.gov/polling-place-polling-place-search" },
    registrationNote: "The voter-registration date for the general election is on the voting-deadlines page.",
    earlyVotingNote: "In-person early-voting dates for 2026 are on the voting-deadlines page.",
    mailNote: "Mail-in ballot dates from the voter information portal are on the voting-deadlines page.",
    idNote: "Identification rules are published by the New Jersey Division of Elections.",
    hasSenateClass2: true,
    hasGovernor2026: false,
    sampleBallotNotes: [
      "The visible general-election candidate section lists U.S. House of Representatives by district.",
      "That visible section does not list a public question.",
    ],
  },
  {
    code: "MA",
    name: "Massachusetts",
    slug: "MA",
    fips: "25",
    capital: "Boston",
    timezoneNote: "Massachusetts is on Eastern Time.",
    summary:
      "Massachusetts’ 2026 state-election candidates page lists U.S. senator, governor and lieutenant governor, and four other statewide executive offices.",
    officialElectionOffice: {
      label: "Massachusetts Secretary of the Commonwealth — Elections Division",
      href: "https://www.sec.state.ma.us/divisions/elections/",
    },
    voteGov: { label: "Vote.gov: Massachusetts registration information", href: "https://vote.gov/register/massachusetts" },
    officialVoterLinks: [
      { label: "2026 state election candidates", href: "https://www.sec.state.ma.us/divisions/elections/research-and-statistics/2026-state-election-candidates.htm" },
      { label: "Vote.gov: Massachusetts registration information", href: "https://vote.gov/register/massachusetts" },
    ],
    ballotpedia: { label: "Ballotpedia — Massachusetts elections 2026", href: "https://ballotpedia.org/Massachusetts_elections,_2026" },
    statewideOffices2026: [
      "Senator in Congress (Class II, term expires in 2027)",
      "Governor & Lieutenant Governor",
      "Attorney General",
      "Secretary of State",
      "Treasurer",
      "Auditor",
    ],
    cycleCheckedOn: "October 18, 2026",
    cycleSources: [
      { label: "Massachusetts Secretary of the Commonwealth — 2026 state election candidates", href: "https://www.sec.state.ma.us/divisions/elections/research-and-statistics/2026-state-election-candidates.htm" },
      { label: "U.S. Senate — Class II, terms expire in 2027", href: "https://www.senate.gov/senators/Class_II.htm" },
    ],
    sampleBallotOfficial: { label: "My Election Info", href: "https://www.sec.state.ma.us/WhereDoIVoteMA/WhereDoIVote/en-US" },
    registrationNote: "A registration deadline was not printed on the 2026 candidates page read October 18, 2026. The Elections Division publishes the calendar.",
    earlyVotingNote: "An early-voting period was not printed on the 2026 candidates page read October 18, 2026. The Elections Division publishes the calendar.",
    mailNote: "A mail-ballot deadline was not printed on the 2026 candidates page read October 18, 2026. The Elections Division publishes the calendar.",
    idNote: "Identification rules are published by the Massachusetts Elections Division.",
    hasSenateClass2: true,
    hasGovernor2026: true,
    sampleBallotNotes: [
      "The candidates page lists Representative in Congress by district, and Councillor, the General Court, and county offices.",
      "That page does not list a ballot question.",
    ],
  },
  {
    code: "WA",
    name: "Washington",
    slug: "WA",
    fips: "53",
    capital: "Olympia",
    timezoneNote: "Washington is on Pacific Time.",
    summary: "Washington’s August 21, 2026 certification lists U.S. House by district and five Supreme Court contests marked statewide.",
    officialElectionOffice: {
      label: "Washington Secretary of State — Elections",
      href: "https://www.sos.wa.gov/elections",
    },
    voteGov: { label: "Vote.gov: Washington registration information", href: "https://vote.gov/register/washington" },
    officialVoterLinks: [
      { label: "Certification of candidates, November 3, 2026 general election", href: "https://www.sos.wa.gov/sites/default/files/2026-08/2026%20Certification%20of%20Candidates%20to%20General%20Election.pdf" },
      { label: "Vote.gov: Washington registration information", href: "https://vote.gov/register/washington" },
    ],
    ballotpedia: { label: "Ballotpedia — Washington elections 2026", href: "https://ballotpedia.org/Washington_elections,_2026" },
    statewideOffices2026: [
      "Supreme Court Justice Position 2 (2-year unexpired term)",
      "Supreme Court Justice Position 3 (6-year term)",
      "Supreme Court Justice Position 4 (6-year term)",
      "Supreme Court Justice Position 5 (2-year unexpired term)",
      "Supreme Court Justice Position 7 (6-year term)",
    ],
    cycleCheckedOn: "October 18, 2026",
    cycleSources: [
      { label: "Washington Secretary of State — certification of candidates, November 3, 2026 general election", href: "https://www.sos.wa.gov/sites/default/files/2026-08/2026%20Certification%20of%20Candidates%20to%20General%20Election.pdf" },
    ],
    sampleBallotOfficial: { label: "Where to vote", href: "https://voter.votewa.gov/WhereToVote.aspx" },
    registrationNote: "A registration deadline was not printed in the August 21, 2026 certification read October 18, 2026. The Secretary of State publishes the calendar.",
    earlyVotingNote: "An early-voting period was not printed in the August 21, 2026 certification read October 18, 2026. The Secretary of State publishes the calendar.",
    mailNote: "A mail-ballot deadline was not printed in the August 21, 2026 certification read October 18, 2026. The Secretary of State publishes the calendar.",
    idNote: "Identification rules are published by the Washington Secretary of State.",
    hasSenateClass2: false,
    hasGovernor2026: false,
    sampleBallotNotes: [
      "The certification lists U.S. Representative by congressional district and the legislature by legislative district.",
      "Court of Appeals contests are listed by division and district. The certification does not list a statewide ballot measure.",
    ],
  },
  {
    code: "CO",
    name: "Colorado",
    slug: "CO",
    fips: "08",
    capital: "Denver",
    timezoneNote: "Colorado is on Mountain Time.",
    summary:
      "Colorado’s September 4, 2026 candidate list marks a U.S. Senate seat, statewide executive offices, and statewide courts, and the state lists certified 2026 ballot measures.",
    officialElectionOffice: {
      label: "Colorado Secretary of State — Elections",
      href: "https://www.coloradosos.gov/pubs/elections/main.html",
    },
    voteGov: { label: "Vote.gov: Colorado registration information", href: "https://vote.gov/register/colorado" },
    officialVoterLinks: [
      { label: "2026 general election official candidate list", href: "https://www.coloradosos.gov/pubs/elections/vote/generalCandidates.html" },
      { label: "Amendments and propositions on the 2026 ballot", href: "https://www.coloradosos.gov/pubs/elections/Initiatives/ballot/contacts/2026.html" },
      { label: "Vote.gov: Colorado registration information", href: "https://vote.gov/register/colorado" },
    ],
    ballotpedia: { label: "Ballotpedia — Colorado elections 2026", href: "https://ballotpedia.org/Colorado_elections,_2026" },
    statewideOffices2026: [
      "US Senate (Class II, term expires in 2027)",
      "Governor",
      "Lt. Governor",
      "Secretary of State",
      "State Treasurer",
      "Attorney General",
      "Colorado Supreme Court",
      "Colorado Court of Appeals",
    ],
    cycleCheckedOn: "October 18, 2026",
    cycleSources: [
      { label: "Colorado Secretary of State — 2026 general election official candidate list", href: "https://www.coloradosos.gov/pubs/elections/vote/generalCandidates.html" },
      { label: "Colorado Secretary of State — amendments and propositions on the 2026 ballot", href: "https://www.coloradosos.gov/pubs/elections/Initiatives/ballot/contacts/2026.html" },
      { label: "U.S. Senate — Class II, terms expire in 2027", href: "https://www.senate.gov/senators/Class_II.htm" },
    ],
    sampleBallotOfficial: { label: "Go Vote Colorado", href: "https://www.coloradosos.gov/voter/pages/pub/home.xhtml" },
    registrationNote: "A registration deadline was not printed on the candidate list or the certified-measures page read October 18, 2026. The Secretary of State publishes the calendar.",
    earlyVotingNote: "An early-voting period was not printed on the candidate list or the certified-measures page read October 18, 2026. The Secretary of State publishes the calendar.",
    mailNote: "A mail-ballot deadline was not printed on the candidate list or the certified-measures page read October 18, 2026. The Secretary of State publishes the calendar.",
    idNote: "Identification rules are published by the Colorado Secretary of State.",
    hasSenateClass2: true,
    hasGovernor2026: true,
    sampleBallotNotes: [
      "US House, State Senate, the State Board of Education, and the University of Colorado Board of Regents are not marked District “State” on the candidate list.",
      "The certified-measures page lists 15 statewide measures for the 2026 November general election.",
    ],
  },
  {
    code: "TN",
    name: "Tennessee",
    slug: "TN",
    fips: "47",
    capital: "Nashville",
    timezoneNote: "Most of Tennessee is on Central Time; the eastern counties are on Eastern Time.",
    summary:
      "Tennessee’s 2026 candidate-lists page publishes governor and United States Senate lists, and three constitutional amendments are set for the November 2026 ballot.",
    officialElectionOffice: {
      label: "Tennessee Secretary of State — Elections",
      href: "https://sos.tn.gov/elections",
    },
    voteGov: { label: "Vote.gov: Tennessee registration information", href: "https://vote.gov/register/tennessee" },
    officialVoterLinks: [
      { label: "2026 candidate lists", href: "https://sos.tn.gov/elections/2026-candidate-lists" },
      { label: "Proposed constitutional amendments", href: "https://sos.tn.gov/elections/announcements/2026-proposed-constitutional-amendments" },
      { label: "Vote.gov: Tennessee registration information", href: "https://vote.gov/register/tennessee" },
    ],
    ballotpedia: { label: "Ballotpedia — Tennessee elections 2026", href: "https://ballotpedia.org/Tennessee_elections,_2026" },
    statewideOffices2026: ["Governor", "United States Senate (Class II, term expires in 2027)"],
    cycleCheckedOn: "October 18, 2026",
    cycleSources: [
      { label: "Tennessee Secretary of State — 2026 candidate lists", href: "https://sos.tn.gov/elections/2026-candidate-lists" },
      { label: "Tennessee Secretary of State — proposed constitutional amendments", href: "https://sos.tn.gov/elections/announcements/2026-proposed-constitutional-amendments" },
      { label: "U.S. Senate — Class II, terms expire in 2027", href: "https://www.senate.gov/senators/Class_II.htm" },
    ],
    sampleBallotOfficial: { label: "TN Voter Registration Information Lookup", href: "https://tnmap.tn.gov/voterlookup/" },
    registrationNote: "A registration deadline was not printed on the 2026 candidate-lists page read October 18, 2026. The Secretary of State publishes the calendar.",
    earlyVotingNote: "An early-voting period was not printed on the 2026 candidate-lists page read October 18, 2026. The Secretary of State publishes the calendar.",
    mailNote: "A mail-ballot deadline was not printed on the 2026 candidate-lists page read October 18, 2026. The Secretary of State publishes the calendar.",
    idNote: "Identification rules are published by the Tennessee Secretary of State.",
    hasSenateClass2: true,
    hasGovernor2026: true,
    sampleBallotNotes: [
      "The candidate-lists page also publishes United States House, Tennessee Senate, and Tennessee House lists.",
      "Three proposed amendments are for the November 2026 ballot. Three other resolutions on that page are described for a November 2030 ballot.",
    ],
  },
  {
    code: "IN",
    name: "Indiana",
    slug: "IN",
    fips: "18",
    capital: "Indianapolis",
    timezoneNote: "Most of Indiana is on Eastern Time; the northwest and southwest corners are on Central Time.",
    summary: "Indiana’s November 3, 2026 abbreviated candidate list names secretary of state, state comptroller, and treasurer of state.",
    officialElectionOffice: {
      label: "Indiana Election Division",
      href: "https://www.in.gov/sos/elections/",
    },
    voteGov: { label: "Vote.gov: Indiana registration information", href: "https://vote.gov/register/indiana" },
    officialVoterLinks: [
      { label: "Abbreviated candidate list, 2026 general election", href: "https://www.in.gov/sos/elections/files/Candidate_List_Abbreviated_20260922_011251PM.xlsx" },
      { label: "Indiana Voters", href: "https://indianavoters.in.gov/" },
      { label: "Vote.gov: Indiana registration information", href: "https://vote.gov/register/indiana" },
    ],
    ballotpedia: { label: "Ballotpedia — Indiana elections 2026", href: "https://ballotpedia.org/Indiana_elections,_2026" },
    statewideOffices2026: ["Secretary of State", "State Comptroller (Auditor of State)", "Treasurer of State"],
    cycleCheckedOn: "October 18, 2026",
    cycleSources: [
      { label: "Indiana Election Division — abbreviated candidate list, 2026 general election", href: "https://www.in.gov/sos/elections/files/Candidate_List_Abbreviated_20260922_011251PM.xlsx" },
    ],
    sampleBallotOfficial: { label: "Indiana Voters", href: "https://indianavoters.in.gov/" },
    registrationNote: "A registration deadline was not printed in the abbreviated candidate list read October 18, 2026. The Election Division publishes the calendar.",
    earlyVotingNote: "An early-voting period was not printed in the abbreviated candidate list read October 18, 2026. The Election Division publishes the calendar.",
    mailNote: "A mail-ballot deadline was not printed in the abbreviated candidate list read October 18, 2026. The Election Division publishes the calendar.",
    idNote: "Identification rules are published by the Indiana Election Division.",
    hasSenateClass2: false,
    hasGovernor2026: false,
    sampleBallotNotes: [
      "The file’s other categories include US Representative, the legislature, judges, and county and local offices.",
      "The file does not include a Governor category, a United States Senate category, or a public-question category.",
    ],
  },
  {
    code: "MO",
    name: "Missouri",
    slug: "MO",
    fips: "29",
    capital: "Jefferson City",
    timezoneNote: "Missouri is on Central Time.",
    summary: "Missouri’s August 25, 2026 certification lists state auditor and a Missouri Supreme Court contest for the November 3, 2026 general election.",
    officialElectionOffice: {
      label: "Missouri Secretary of State — Go Vote Missouri",
      href: "https://www.sos.mo.gov/elections/goVoteMissouri",
    },
    voteGov: { label: "Vote.gov: Missouri registration information", href: "https://vote.gov/register/missouri" },
    officialVoterLinks: [
      { label: "Certification of candidates, November 3, 2026 general election", href: "https://www.sos.mo.gov/CMSImages/ElectionCandidates/2026GeneralElectionCertifiedCandidates.pdf" },
      { label: "Vote.gov: Missouri registration information", href: "https://vote.gov/register/missouri" },
    ],
    ballotpedia: { label: "Ballotpedia — Missouri elections 2026", href: "https://ballotpedia.org/Missouri_elections,_2026" },
    statewideOffices2026: ["State Auditor", "Missouri Supreme Court"],
    cycleCheckedOn: "October 18, 2026",
    cycleSources: [
      { label: "Missouri Secretary of State — certification of candidates, November 3, 2026 general election", href: "https://www.sos.mo.gov/CMSImages/ElectionCandidates/2026GeneralElectionCertifiedCandidates.pdf" },
    ],
    sampleBallotOfficial: { label: "Check Your Voter Registration", href: "https://voteroutreach.sos.mo.gov/portal/" },
    registrationNote: "A registration deadline was not printed in the August 25, 2026 certification read October 18, 2026. The Secretary of State publishes the calendar.",
    earlyVotingNote: "An early-voting period was not printed in the August 25, 2026 certification read October 18, 2026. The Secretary of State publishes the calendar.",
    mailNote: "A mail-ballot deadline was not printed in the August 25, 2026 certification read October 18, 2026. The Secretary of State publishes the calendar.",
    idNote: "Identification rules are published by the Missouri Secretary of State.",
    hasSenateClass2: false,
    hasGovernor2026: false,
    sampleBallotNotes: [
      "U.S. Representative, the legislature, and circuit judges are certified by district.",
      "The judicial certificate lists Missouri Court of Appeals candidates by district. The booklet does not list a statewide ballot measure.",
    ],
  },
  {
    code: "MD",
    name: "Maryland",
    slug: "MD",
    fips: "24",
    capital: "Annapolis",
    timezoneNote: "Maryland is on Eastern Time.",
    summary: "Maryland’s 2026 general candidate page lists governor and lieutenant governor, comptroller, attorney general, and an at-large appellate judgeship.",
    officialElectionOffice: {
      label: "Maryland State Board of Elections",
      href: "https://elections.maryland.gov/",
    },
    voteGov: { label: "Vote.gov: Maryland registration information", href: "https://vote.gov/register/maryland" },
    officialVoterLinks: [
      { label: "2026 general election statewide candidate list", href: "https://elections.maryland.gov/elections/2026/general_candidates/2026_GG_statewide_candidatelist.html" },
      { label: "Vote.gov: Maryland registration information", href: "https://vote.gov/register/maryland" },
    ],
    ballotpedia: { label: "Ballotpedia — Maryland elections 2026", href: "https://ballotpedia.org/Maryland_elections,_2026" },
    statewideOffices2026: [
      "Governor / Lt. Governor",
      "Comptroller",
      "Attorney General",
      "Judge, Appellate Court of Maryland At Large",
    ],
    cycleCheckedOn: "October 18, 2026",
    cycleSources: [
      { label: "Maryland State Board of Elections — 2026 general election statewide candidate list", href: "https://elections.maryland.gov/elections/2026/general_candidates/2026_GG_statewide_candidatelist.html" },
    ],
    sampleBallotOfficial: { label: "Voting Location Lookup", href: "https://voterservices.elections.maryland.gov/PollingPlaceSearch" },
    registrationNote: "A registration deadline was not printed on the statewide candidate page read October 18, 2026. The State Board of Elections publishes the calendar.",
    earlyVotingNote: "An early-voting period was not printed on the statewide candidate page read October 18, 2026. The State Board of Elections publishes the calendar.",
    mailNote: "A mail-ballot deadline was not printed on the statewide candidate page read October 18, 2026. The State Board of Elections publishes the calendar.",
    idNote: "Identification rules are published by the Maryland State Board of Elections.",
    hasSenateClass2: false,
    hasGovernor2026: true,
    sampleBallotNotes: [
      "The page groups Representative in Congress, State Senator, and House of Delegates by district.",
      "The page’s office groups do not include a United States Senate heading or a ballot question.",
    ],
  },
  {
    code: "SC",
    name: "South Carolina",
    slug: "SC",
    fips: "45",
    capital: "Columbia",
    timezoneNote: "South Carolina is on Eastern Time.",
    summary: "South Carolina’s November 3, 2026 statewide general candidate search lists U.S. Senate and seven statewide executive offices.",
    officialElectionOffice: {
      label: "SC Votes — South Carolina Election Commission",
      href: "https://www.scvotes.gov/",
    },
    voteGov: { label: "Vote.gov: South Carolina registration information", href: "https://vote.gov/register/south-carolina" },
    officialVoterLinks: [
      { label: "Candidate search, November 3, 2026 statewide general election", href: "https://vrems.scvotes.sc.gov/Candidate/CandidateSearch?electionId=22596" },
      { label: "2026 statewide general election go-to guide", href: "https://scvotes.gov/wp-content/uploads/2026/09/Statewide-General-Election-Go-To-Guide.pdf" },
      { label: "Vote.gov: South Carolina registration information", href: "https://vote.gov/register/south-carolina" },
    ],
    ballotpedia: { label: "Ballotpedia — South Carolina elections 2026", href: "https://ballotpedia.org/South_Carolina_elections,_2026" },
    statewideOffices2026: [
      "Governor and Lieutenant Governor",
      "Secretary of State",
      "State Treasurer",
      "Attorney General",
      "Comptroller General",
      "State Superintendent of Education",
      "Commissioner of Agriculture",
      "U.S. Senate (Class II, term expires in 2027)",
    ],
    cycleCheckedOn: "October 18, 2026",
    cycleSources: [
      { label: "South Carolina State Election Commission — candidate search, November 3, 2026 statewide general election", href: "https://vrems.scvotes.sc.gov/Candidate/CandidateSearch?electionId=22596" },
      { label: "U.S. Senate — Class II, terms expire in 2027", href: "https://www.senate.gov/senators/Class_II.htm" },
    ],
    sampleBallotOfficial: { label: "MySCVotes Login", href: "https://vrems.scvotes.sc.gov/Voter/Login?PageMode=PollingPlace" },
    registrationNote: "Registration dates in the 2026 statewide general election go-to guide are on the voting-deadlines page.",
    earlyVotingNote: "Early-voting dates in that go-to guide are on the voting-deadlines page.",
    mailNote: "That go-to guide does not print an absentee request or return deadline. The Election Commission publishes an absentee guide.",
    idNote: "Identification rules are published by the South Carolina Election Commission.",
    hasSenateClass2: true,
    hasGovernor2026: true,
    sampleBallotNotes: [
      "The candidate search lists U.S. House of Representatives for districts 1 through 7.",
      "That search does not list a ballot question.",
    ],
  },
  ...MORE_STATE_PROFILES,
];

export const STATE_CODES = STARTER_STATES.map((s) => s.code);

export function getState(code: string): StateProfile | undefined {
  return STARTER_STATES.find((s) => s.code === code.toUpperCase());
}

export function isStateCode(value: string): value is StateCode {
  return STATE_CODES.includes(value.toUpperCase() as StateCode);
}
