import type { Candidate, Citation, PartyId } from "./types";
import { cite } from "./sources";

/** Access date for election-office pages read for this citation pass. */
export const LISTS_ACCESSED = "October 16, 2026";

export const miList = cite(
  "Michigan Bureau of Elections, official candidate listing, November 3, 2026 general election",
  "https://mi-boe.entellitrak.com/etk-mi-boe-prod/page.request.do?electionType=GEN&electionYear=2026&page=page.miboePublicReport",
  LISTS_ACCESSED,
);

export const ncList = cite(
  "North Carolina State Board of Elections, 2026 general candidate list by contest (federal and state)",
  "https://dl.ncsbe.gov/Elections/2026/Candidate%20Filing/2026_general_candidate_list_by_contest_federal_and_state.pdf",
  LISTS_ACCESSED,
);

export const txCert = cite(
  "Texas Secretary of State, 2026 ballot certification for the November 3, 2026 general election",
  "https://www.sos.texas.gov/elections/forms/2026-ballot-cert.pdf",
  LISTS_ACCESSED,
);

export const caCert = cite(
  "California Secretary of State, certified list of candidates for the November 3, 2026 general election (August 27, 2026)",
  "https://elections.cdn.sos.ca.gov/statewide-elections/2026-general/cert-list-candidates.pdf",
  LISTS_ACCESSED,
  "August 27, 2026",
);

export const flList = cite(
  "Florida Division of Elections, candidate listing for the 2026 general election",
  "https://dos.elections.myflorida.com/candidates/CanList.asp?elecid=20261103-GEN",
  LISTS_ACCESSED,
);

export const nyCert = cite(
  "New York State Board of Elections, amended certification for the November 3, 2026 general election (October 7, 2026)",
  "https://elections.ny.gov/system/files/documents/2026/10/accessible-2026-general-ballot-certification-10.7.2026.pdf",
  LISTS_ACCESSED,
  "October 7, 2026",
);

export const wiList = cite(
  "Wisconsin Elections Commission, candidates on the ballot, November 3, 2026 general election",
  "https://elections.wi.gov/sites/default/files/documents/Candidates%20on%20Ballot%20By%20Election_November%203%202026%20General%20Election.pdf",
  LISTS_ACCESSED,
);

export const gaRunoff = cite(
  "Georgia Secretary of State, official results, June 16, 2026 general primary runoff",
  "https://results.sos.ga.gov/results/public/Georgia/elections/06162026GeneralPrimaryRunoff",
  LISTS_ACCESSED,
);

export const gaWriteIn = cite(
  "Georgia Secretary of State, certified write-in candidates, November 3, 2026 general election (published September 15, 2026)",
  "https://sos.ga.gov/sites/default/files/forms/2026%20Certified%20Write-In%20Candidates_2.pdf",
  LISTS_ACCESSED,
  "September 15, 2026",
);

export const clerkNominees = cite(
  "Office of the Clerk, U.S. House of Representatives, nominees for U.S. senator and U.S. representative, November 3, 2026 (published October 8, 2026)",
  "https://clerk.house.gov/member_info/electionInfo/2026/120-nominations.pdf",
  LISTS_ACCESSED,
  "October 8, 2026",
);

export const ohFranklin = cite(
  "Franklin County Board of Elections, 2026 general election candidates (revised October 16, 2026)",
  "https://www.vote.franklincountyohio.gov/getmedia/e0a4ca45-6893-45c1-8190-87696f8804b4/2026-General-Candidate-List-5",
  LISTS_ACCESSED,
  "October 16, 2026",
);

export const ohHenry = cite(
  "Henry County, Ohio, official general-election ballot, November 3, 2026",
  "https://henrycountyohio.gov/DocumentCenter/View/4380/November-3-2026-General",
  LISTS_ACCESSED,
);

export const azBallot = cite(
  "Maricopa County official ballot, general election, November 3, 2026 (City of Scottsdale sample, precinct 0728)",
  "https://www.scottsdaleaz.gov/docs/default-source/scottsdaleaz/elections/2026sampleballot.pdf?sfvrsn=73501ab1_3",
  LISTS_ACCESSED,
);

export const paMonroe = cite(
  "Monroe County, Pennsylvania, candidate proclamation, general election, November 3, 2026",
  "https://www.monroecountypa.gov/getmedia/8952bea5-32f4-4763-a61f-49d917063997/Nov26_CandidateProclamation.pdf",
  LISTS_ACCESSED,
);

export const nvClark = cite(
  "Clark County, Nevada, Registrar of Voters, list of candidates for the November 3, 2026 general election",
  "https://www.clarkcountynv.gov/adobe/assets/urn:aaid:aem:46b035ca-1d1f-4a0a-b748-a0f42dd45794/original/as/notice-general-election-26g.pdf",
  LISTS_ACCESSED,
);

export function listCandidate(input: {
  name: string;
  party: PartyId;
  partyLabel: string;
  bio: string;
  sources: Citation[];
  image?: Candidate["image"];
  incumbent?: boolean;
}): Candidate {
  const href = input.sources[0]?.url;
  return {
    name: input.name,
    party: input.party,
    partyLabel: input.partyLabel,
    bio: input.bio,
    sources: input.sources,
    links: href ? [{ label: "Election-office list", href }] : [],
    image: input.image,
    incumbent: input.incumbent,
  };
}
