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
      "Arizona’s 2026 cycle includes statewide executive offices, a U.S. House map, and local contests. Legislative and congressional districts are on the county sample ballot.",
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
      "Governor and lieutenant governor (first paired ticket)",
      "Secretary of state",
      "Attorney general",
      "State treasurer",
      "Superintendent of public instruction",
      "State mine inspector",
      "Corporation Commission seats on this cycle",
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
      "Georgia’s 2026 cycle includes a U.S. Senate Class 2 seat, statewide executive offices, and U.S. House races. The final contest list is the official county sample ballot.",
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
      "U.S. Senate (Class 2)",
      "Governor",
      "Lieutenant governor",
      "Secretary of state",
      "Attorney general",
      "Commissioner of agriculture",
      "Commissioner of insurance",
      "Commissioner of labor",
      "State school superintendent",
      "Public Service Commission seats on this cycle",
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
      "U.S. Senate (Class 2)",
      "Governor and lieutenant governor",
      "Attorney general",
      "Secretary of state",
      "State Board of Education seats on this cycle",
      "University governing-board seats on this cycle",
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
      "U.S. Senate (Class 2) is scheduled for the 2026 cycle.",
      "Governor and other statewide offices may appear.",
      "Proposal language, if any, appears on the official sample ballot — not as final text here.",
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
      "U.S. Senate (Class 2)",
      "U.S. House (address-specific)",
      "State legislature seats on this cycle",
      "Judicial and local contests as certified for the county",
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
      "Nevada’s 2026 cycle includes statewide executive offices and U.S. House races. Mail-ballot dates for that election are on the voting-deadlines page.",
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
      "Lieutenant governor",
      "Attorney general",
      "Secretary of state",
      "State treasurer",
      "State controller",
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
      "Governor and lieutenant governor (joint ticket)",
      "Attorney general",
      "Secretary of state",
      "Treasurer of state",
      "Auditor of state",
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
      "Governor and other statewide offices may appear.",
      "U.S. Senate is not a Class 2 (2026) Ohio seat.",
      "State Issue language, if any, is printed on the official ballot.",
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
    statewideOffices2026: [
      "Governor and lieutenant governor",
      "Attorney general",
      "Auditor general",
      "State treasurer",
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
      "Governor and other statewide offices may appear.",
      "U.S. Senate is not a Class 2 (2026) Pennsylvania seat.",
      "Judicial retention or local referenda appear only if certified for that ballot.",
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
    statewideOffices2026: [
      "Governor and lieutenant governor",
      "Attorney general",
      "Secretary of state",
      "State treasurer",
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
      "U.S. Senate (Class 2)",
      "Governor",
      "Lieutenant governor",
      "Attorney general",
      "Comptroller of public accounts",
      "Commissioner of the General Land Office",
      "Commissioner of agriculture",
      "Railroad Commission seats on this cycle",
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
      "Governor and lieutenant governor",
      "Attorney general",
      "Chief financial officer",
      "Commissioner of agriculture",
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
      "Lieutenant governor",
      "Attorney general",
      "Secretary of state",
      "Controller",
      "Treasurer",
      "Insurance commissioner",
      "Superintendent of public instruction",
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
      "Governor and other statewide offices may appear.",
      "U.S. Senate is not a Class 2 (2026) California seat.",
      "State propositions and local measures appear only if qualified for that ballot.",
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
    statewideOffices2026: [
      "Governor and lieutenant governor",
      "Attorney general",
      "Comptroller",
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
