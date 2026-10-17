/**
 * Official election-office and voting-location links for every jurisdiction
 * in the 2026 Census national places file.
 *
 * Starter-state URLs and labels match `src/data/states.ts`. Other URLs are
 * the office page and the voting-location or voter-lookup page read for
 * these place pages. The link text is the page’s own name. The role is
 * “Polling-place lookup” only when that page is a polling-place, vote-center,
 * or voting-location lookup.
 */

export type OfficialLink = {
  label: string;
  href: string;
};

export type ElectionOffice = {
  code: string;
  office: OfficialLink;
  lookup: OfficialLink & { role: string };
};

const POLL = "Polling-place lookup";
const VOTER = "Voter lookup";

export const ELECTION_OFFICES: Record<string, ElectionOffice> = {
  AL: {
    code: "AL",
    office: {
      label: "Alabama Secretary of State — Alabama Votes",
      href: "https://www.sos.alabama.gov/alabama-votes",
    },
    lookup: {
      role: VOTER,
      label: "Alabama Secretary of State — VoterView",
      href: "https://myinfo.alabamavotes.gov/voterview",
    },
  },
  AK: {
    code: "AK",
    office: {
      label: "Alaska Division of Elections",
      href: "https://www.elections.alaska.gov/",
    },
    lookup: {
      role: POLL,
      label: "Polling place locations",
      href: "https://www.elections.alaska.gov/election-polls/",
    },
  },
  AZ: {
    code: "AZ",
    office: {
      label: "Arizona Secretary of State — Elections",
      href: "https://azsos.gov/elections",
    },
    lookup: {
      role: POLL,
      label: "Arizona Voter Information Portal — registration, polling place, and ballot status",
      href: "https://my.arizona.vote/PortalList.aspx",
    },
  },
  AR: {
    code: "AR",
    office: {
      label: "Arkansas Secretary of State — Elections",
      href: "https://www.sos.arkansas.gov/elections",
    },
    lookup: {
      role: VOTER,
      label: "Arkansas Secretary of State — VoterView",
      href: "https://www.voterview.ar-nova.org/voterview",
    },
  },
  CA: {
    code: "CA",
    office: {
      label: "California Secretary of State — Elections",
      href: "https://www.sos.ca.gov/elections",
    },
    lookup: {
      role: POLL,
      label: "Find your polling place / vote center",
      href: "https://www.sos.ca.gov/elections/polling-place",
    },
  },
  CO: {
    code: "CO",
    office: {
      label: "Colorado Secretary of State — Elections",
      href: "https://www.coloradosos.gov/pubs/elections/main.html",
    },
    lookup: {
      role: VOTER,
      label: "Go Vote Colorado",
      href: "https://www.coloradosos.gov/voter/pages/pub/home.xhtml",
    },
  },
  CT: {
    code: "CT",
    office: {
      label: "Connecticut Secretary of the State — Election Services",
      href: "https://portal.ct.gov/sots/election-services",
    },
    lookup: {
      role: VOTER,
      label: "Connecticut Secretary of the State — voter lookup",
      href: "https://portaldir.ct.gov/sots/LookUp.aspx",
    },
  },
  DE: {
    code: "DE",
    office: {
      label: "Delaware Department of Elections",
      href: "https://elections.delaware.gov/",
    },
    lookup: {
      role: POLL,
      label: "Polling Places & Early Voting Lookup Tool",
      href: "https://gis.elections.delaware.gov/datasets/polling-places-early-voting-lookup-tool",
    },
  },
  DC: {
    code: "DC",
    office: {
      label: "District of Columbia Board of Elections",
      href: "https://www.dcboe.org/",
    },
    lookup: {
      role: "Vote center locator",
      label: "Vote Center Locator Tool",
      href: "https://www.dcboe.org/voters/find-out-where-to-vote/vote-center-locator-tool",
    },
  },
  FL: {
    code: "FL",
    office: {
      label: "Florida Division of Elections",
      href: "https://dos.fl.gov/elections/",
    },
    lookup: {
      role: POLL,
      label: "Check voter status and polling place",
      href: "https://registration.dos.fl.gov/CheckVoterStatus",
    },
  },
  GA: {
    code: "GA",
    office: {
      label: "Georgia Secretary of State — Elections",
      href: "https://sos.ga.gov/elections-division-georgia-secretary-states-office",
    },
    lookup: {
      role: POLL,
      label: "My Voter Page — registration, polling place, and ballot status",
      href: "https://mvp.sos.ga.gov/s/",
    },
  },
  HI: {
    code: "HI",
    office: {
      label: "Hawaii Office of Elections",
      href: "https://elections.hawaii.gov/",
    },
    lookup: {
      role: "Voter service centers and places of deposit",
      label: "Voter service centers and places of deposit",
      href: "https://elections.hawaii.gov/voter-service-centers-and-places-of-deposit/",
    },
  },
  ID: {
    code: "ID",
    office: {
      label: "Idaho Secretary of State — Vote Idaho",
      href: "https://voteidaho.gov/",
    },
    lookup: {
      role: POLL,
      label: "View My Voting Location",
      href: "https://votertools.voteidaho.gov/TEDElectionLink/VoterServices/voter/where-do-I-vote",
    },
  },
  IL: {
    code: "IL",
    office: {
      label: "Illinois State Board of Elections",
      href: "https://www.elections.il.gov/",
    },
    lookup: {
      role: POLL,
      label: "Illinois Online Voter Registration Application: Polling Place Lookup",
      href: "https://ova.elections.il.gov/PollingPlaceLookup.aspx",
    },
  },
  IN: {
    code: "IN",
    office: {
      label: "Indiana Secretary of State — Election Division",
      href: "https://www.in.gov/sos/elections/",
    },
    lookup: {
      role: VOTER,
      label: "Indiana Voters",
      href: "https://indianavoters.in.gov/",
    },
  },
  IA: {
    code: "IA",
    office: {
      label: "Iowa Secretary of State — Elections and voting",
      href: "https://sos.iowa.gov/elections-voting",
    },
    lookup: {
      role: POLL,
      label: "Find my precinct and polling place",
      href: "https://apps.sos.iowa.gov/elections/voterreg/pollingplace/search.aspx",
    },
  },
  KS: {
    code: "KS",
    office: {
      label: "Kansas Secretary of State — Elections",
      href: "https://sos.ks.gov/elections/elections.html",
    },
    lookup: {
      role: POLL,
      label: "Kansas VoterView — registration, sample ballot, and polling place",
      href: "https://kansasvoterinfo.gov/",
    },
  },
  KY: {
    code: "KY",
    office: {
      label: "Kentucky State Board of Elections",
      href: "https://elect.ky.gov/",
    },
    lookup: {
      role: POLL,
      label: "Polling Locations",
      href: "https://elect.ky.gov/Voters/Pages/Polling-Locations.aspx",
    },
  },
  LA: {
    code: "LA",
    office: {
      label: "Louisiana Secretary of State — Elections and Voting",
      href: "https://www.sos.la.gov/elections-voting",
    },
    lookup: {
      role: POLL,
      label: "Polling Locations & Changes",
      href: "https://www.sos.la.gov/elections-voting/polling-locations",
    },
  },
  ME: {
    code: "ME",
    office: {
      label: "Maine Secretary of State — Elections and voting",
      href: "https://www.maine.gov/sos/elections-voting/",
    },
    lookup: {
      role: POLL,
      label: "Voter Information Lookup — voting place and ballot",
      href: "https://www.maine.gov/portal/government/edemocracy/voter_lookup.php",
    },
  },
  MD: {
    code: "MD",
    office: {
      label: "Maryland State Board of Elections",
      href: "https://elections.maryland.gov/",
    },
    lookup: {
      role: POLL,
      label: "Voting Location Lookup",
      href: "https://voterservices.elections.maryland.gov/PollingPlaceSearch",
    },
  },
  MA: {
    code: "MA",
    office: {
      label: "Massachusetts Secretary of the Commonwealth — Elections Division",
      href: "https://www.sec.state.ma.us/divisions/elections/",
    },
    lookup: {
      role: POLL,
      label: "My Election Info",
      href: "https://www.sec.state.ma.us/WhereDoIVoteMA/WhereDoIVote/en-US",
    },
  },
  MI: {
    code: "MI",
    office: {
      label: "Michigan Secretary of State — Elections",
      href: "https://www.michigan.gov/sos/elections",
    },
    lookup: {
      role: POLL,
      label:
        "Michigan Voter Information Center — registration, polling place, sample ballot, and ballot tracking",
      href: "https://mvic.sos.state.mi.us/Voter/Index",
    },
  },
  MN: {
    code: "MN",
    office: {
      label: "Minnesota Secretary of State — Elections",
      href: "https://www.sos.mn.gov/elections-voting/",
    },
    lookup: {
      role: POLL,
      label: "Minnesota Voting Information Portal — sample ballot and polling place",
      href: "https://myballotmn.sos.mn.gov/",
    },
  },
  MS: {
    code: "MS",
    office: {
      label: "Mississippi Secretary of State — Elections & Voting",
      href: "https://www.sos.ms.gov/elections-voting",
    },
    lookup: {
      role: VOTER,
      label: "My Election Day",
      href: "https://myelectionday.sos.state.ms.us/VoterOutreach/Pages/VOSearch.aspx",
    },
  },
  MO: {
    code: "MO",
    office: {
      label: "Missouri Secretary of State — Go Vote Missouri",
      href: "https://www.sos.mo.gov/elections/goVoteMissouri",
    },
    lookup: {
      role: VOTER,
      label: "Check Your Voter Registration",
      href: "https://voteroutreach.sos.mo.gov/portal/",
    },
  },
  MT: {
    code: "MT",
    office: {
      label: "Montana Secretary of State — Elections",
      href: "https://sosmt.gov/elections/",
    },
    lookup: {
      role: POLL,
      label: "Voter Portal",
      href: "https://voterportal.mt.gov/WhereToVote.aspx",
    },
  },
  NE: {
    code: "NE",
    office: {
      label: "Nebraska Secretary of State — Elections",
      href: "https://sos.nebraska.gov/elections",
    },
    lookup: {
      role: VOTER,
      label: "Nebraska Voter Information Lookup",
      href: "https://www.votercheck.necvr.ne.gov/VoterView/",
    },
  },
  NV: {
    code: "NV",
    office: {
      label: "Nevada Secretary of State — Elections",
      href: "https://www.nvsos.gov/sos/elections",
    },
    lookup: {
      role: POLL,
      label: "Check voter registration, sample ballot, and polling place",
      href: "https://www.nvsos.gov/votersearch/",
    },
  },
  NH: {
    code: "NH",
    office: {
      label: "New Hampshire Secretary of State — Elections",
      href: "https://www.sos.nh.gov/elections",
    },
    lookup: {
      role: POLL,
      label: "Search Polling Places and Sample Ballots by Address",
      href: "https://app.sos.nh.gov/pollingplacesampleballot",
    },
  },
  NJ: {
    code: "NJ",
    office: {
      label: "New Jersey Department of State — Elections",
      href: "https://www.nj.gov/state/elections/",
    },
    lookup: {
      role: POLL,
      label: "Polling place search",
      href: "https://voter.svrs.nj.gov/polling-place-polling-place-search",
    },
  },
  NM: {
    code: "NM",
    office: {
      label: "New Mexico Secretary of State — Voting and Elections",
      href: "https://www.sos.nm.gov/voting-and-elections/",
    },
    lookup: {
      role: POLL,
      label: "Where to vote",
      href: "https://voterportal.servis.sos.state.nm.us/WhereToVote.aspx",
    },
  },
  NY: {
    code: "NY",
    office: {
      label: "New York State Board of Elections",
      href: "https://elections.ny.gov/",
    },
    lookup: {
      role: POLL,
      label: "Poll Site Search, Voter Registration, and Mail Ballot Tracker",
      href: "https://voterlookup.elections.ny.gov/",
    },
  },
  NC: {
    code: "NC",
    office: {
      label: "North Carolina State Board of Elections",
      href: "https://www.ncsbe.gov/",
    },
    lookup: {
      role: POLL,
      label: "Voter Search — registration status, polling place, and sample ballot tools",
      href: "https://vt.ncsbe.gov/RegLkup/",
    },
  },
  ND: {
    code: "ND",
    office: {
      label: "North Dakota Secretary of State — Elections",
      href: "https://www.sos.nd.gov/elections",
    },
    lookup: {
      role: POLL,
      label: "Polling Place Search",
      href: "https://vip.sos.nd.gov/WhereToVote.aspx",
    },
  },
  OH: {
    code: "OH",
    office: {
      label: "Ohio Secretary of State — Elections",
      href: "https://www.ohiosos.gov/elections/",
    },
    lookup: {
      role: POLL,
      label: "Find my polling location",
      href: "https://www.ohiosos.gov/directories/find-my-polling-location",
    },
  },
  OK: {
    code: "OK",
    office: {
      label: "Oklahoma State Election Board",
      href: "https://oklahoma.gov/elections.html",
    },
    lookup: {
      role: VOTER,
      label: "OK Voter Portal",
      href: "https://okvoterportal.okelections.gov/",
    },
  },
  OR: {
    code: "OR",
    office: {
      label: "Oregon Secretary of State — Voting & Elections",
      href: "https://sos.oregon.gov/elections/pages/default.aspx",
    },
    lookup: {
      role: "Drop box locator",
      label: "Oregon Drop Box Locator",
      href: "https://sos.oregon.gov/elections/pages/drop-box-locator.aspx",
    },
  },
  PA: {
    code: "PA",
    office: {
      label: "Pennsylvania Department of State — Voting",
      href: "https://www.pa.gov/agencies/vote",
    },
    lookup: {
      role: POLL,
      label: "Find your polling place",
      href: "https://www.pavoterservices.pa.gov/Pages/PollingPlaceInfo.aspx",
    },
  },
  RI: {
    code: "RI",
    office: {
      label: "Rhode Island Board of Elections",
      href: "https://elections.ri.gov/",
    },
    lookup: {
      role: VOTER,
      label: "Rhode Island voter lookup",
      href: "https://vote.sos.ri.gov/",
    },
  },
  SC: {
    code: "SC",
    office: {
      label: "SC Votes — South Carolina Election Commission",
      href: "https://www.scvotes.gov/",
    },
    lookup: {
      role: POLL,
      label: "MySCVotes Login",
      href: "https://vrems.scvotes.sc.gov/Voter/Login?PageMode=PollingPlace",
    },
  },
  SD: {
    code: "SD",
    office: {
      label: "South Dakota Secretary of State — Elections and Voting",
      href: "https://sdsos.gov/elections-voting/default.aspx",
    },
    lookup: {
      role: POLL,
      label: "2026 Election Polling Places",
      href: "https://sdsos.gov/elections-voting/upcoming-elections/general-information/2026%20Election%20Information/2026-Election-Polling-Places.aspx",
    },
  },
  TN: {
    code: "TN",
    office: {
      label: "Tennessee Secretary of State — Elections",
      href: "https://sos.tn.gov/elections",
    },
    lookup: {
      role: VOTER,
      label: "TN Voter Registration Information Lookup",
      href: "https://tnmap.tn.gov/voterlookup/",
    },
  },
  TX: {
    code: "TX",
    office: {
      label: "Texas Secretary of State — Elections",
      href: "https://www.sos.texas.gov/elections/index.shtml",
    },
    lookup: {
      role: POLL,
      label: "Am I Registered? / Where's my polling place",
      href: "https://goelect.txelections.civixapps.com/ivis-mvp-ui/#/login",
    },
  },
  UT: {
    code: "UT",
    office: {
      label: "Utah Vote",
      href: "https://vote.utah.gov/",
    },
    lookup: {
      role: POLL,
      label: "Voter Search",
      href: "https://votesearch.utah.gov/voter-search/search/search-by-address/how-and-where-can-i-vote",
    },
  },
  VT: {
    code: "VT",
    office: {
      label: "Vermont Secretary of State — Elections Division",
      href: "https://sos.vermont.gov/elections",
    },
    lookup: {
      role: POLL,
      label: "Vermont Town Clerk & Voting Info Lookup",
      href: "https://map.vermont.gov/voting-info-lookup/",
    },
  },
  VA: {
    code: "VA",
    office: {
      label: "Virginia Department of Elections",
      href: "https://www.elections.virginia.gov/",
    },
    lookup: {
      role: POLL,
      label: "Polling Place and Ballot Information Lookup",
      href: "https://www.elections.virginia.gov/casting-a-ballot/polling-place-lookup/",
    },
  },
  WA: {
    code: "WA",
    office: {
      label: "Washington Secretary of State — Elections",
      href: "https://www.sos.wa.gov/elections",
    },
    lookup: {
      role: POLL,
      label: "Where to vote",
      href: "https://voter.votewa.gov/WhereToVote.aspx",
    },
  },
  WV: {
    code: "WV",
    office: {
      label: "West Virginia Secretary of State — Elections",
      href: "https://sos.wv.gov/elections",
    },
    lookup: {
      role: POLL,
      label: "Search My Registration / Polling Place",
      href: "https://apps.sos.wv.gov/Elections/Voter/FindMyPollingPlace",
    },
  },
  WI: {
    code: "WI",
    office: {
      label: "Wisconsin Elections Commission",
      href: "https://elections.wi.gov/",
    },
    lookup: {
      role: POLL,
      label: "MyVote Wisconsin — registration status, sample ballot, and municipal clerk tools",
      href: "https://myvote.wi.gov/",
    },
  },
  WY: {
    code: "WY",
    office: {
      label: "Wyoming Secretary of State — Elections",
      href: "https://sos.wyo.gov/Elections/Default.aspx",
    },
    lookup: {
      role: VOTER,
      label: "Voter Information Search",
      href: "https://myelectionday.sos.wyo.gov/WYVOTES/Pages/VOSearch.aspx",
    },
  },
  PR: {
    code: "PR",
    office: {
      label: "Comisión Estatal de Elecciones",
      href: "https://ww2.ceepur.org/",
    },
    lookup: {
      role: "Consulta",
      label: "Consulta — Comisión Estatal de Elecciones",
      href: "https://consulta.ceepur.org/",
    },
  },
};

export function electionOfficeFor(code: string): ElectionOffice {
  const office = ELECTION_OFFICES[code.toUpperCase()];
  if (!office) {
    throw new Error(`No election office for ${code}`);
  }
  return office;
}
