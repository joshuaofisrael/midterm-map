export type StateCode =
  | "AZ"
  | "GA"
  | "MI"
  | "NC"
  | "NV"
  | "OH"
  | "PA"
  | "WI"
  | "TX"
  | "FL"
  | "CA"
  | "NY";

export type Chamber = "senate" | "house" | "governor" | "statewide";

export type PartyId = "DEM" | "REP" | "IND" | "LIB" | "GRN" | "OTH" | "TBD";

export type RatingTier =
  | "Solid D"
  | "Likely D"
  | "Lean D"
  | "Tilt D"
  | "Tossup"
  | "Tilt R"
  | "Lean R"
  | "Likely R"
  | "Solid R";

export type BallotSectionKind =
  | "federal"
  | "statewide"
  | "legislature"
  | "local"
  | "measures";

export interface OfficialSource {
  label: string;
  href: string;
}

export interface Citation {
  name: string;
  url: string;
  accessed?: string;
  published?: string;
}

export interface CandidateImage {
  src: string;
  alt: string;
  attribution: string;
  license: string;
  sourceUrl: string;
}

export interface CandidateLink {
  label: string;
  href: string;
}

export interface Candidate {
  name: string;
  party: PartyId;
  partyLabel: string;
  incumbent?: boolean;
  statusNote?: string;
  bio: string;
  image?: CandidateImage;
  links: CandidateLink[];
  sources: Citation[];
}

export interface RaceRating {
  outlet: string;
  tier: RatingTier;
  url: string;
  asOf: string;
}

export interface StateProfile {
  code: StateCode;
  name: string;
  slug: StateCode;
  fips: string;
  capital: string;
  timezoneNote: string;
  summary: string;
  officialElectionOffice: OfficialSource;
  voteGov: OfficialSource;
  ballotpedia: OfficialSource;
  registrationNote: string;
  earlyVotingNote: string;
  mailNote: string;
  idNote: string;
  hasSenateClass2: boolean;
  hasGovernor2026: boolean;
  statewideOffices2026: string[];
  sampleBallotNotes: string[];
  sampleBallotOfficial?: OfficialSource;
}

export interface RaceGuide {
  slug: string;
  state: StateCode;
  chamber: Chamber;
  office: string;
  title: string;
  shortTitle: string;
  featured: boolean;
  district?: string;
  incumbentNote?: string;
  overview: string;
  officeExplainer: string;
  whyItMatters: string;
  howToRead: string;
  candidates: Candidate[];
  ratings: RaceRating[];
  sources: Citation[];
  aggregatorLinks: OfficialSource[];
  relatedPollSlugs: string[];
  ballotSections: string[];
  faqs: { question: string; answer: string }[];
}

export interface PollRow {
  slug: string;
  raceSlug: string;
  pollster: string;
  dates: string;
  sample: string;
  moe?: string;
  dem: number | null;
  demLabel?: string;
  rep: number | null;
  repLabel?: string;
  other: number | null;
  spread: string;
  source: Citation;
}

export interface NationalStripRow {
  label: string;
  dem: number;
  rep: number;
  other?: number;
  dates: string;
  sample: string;
  source: Citation;
}

export interface BallotContest {
  id: string;
  heading: string;
  kind: BallotSectionKind;
  raceSlug?: string;
  lines: string[];
}

export interface BallotSection {
  kind: BallotSectionKind;
  title: string;
  intro: string;
  contests: BallotContest[];
}

export interface ResultLine {
  candidateLabel: string;
  party: PartyId;
  percent: number | null;
  votes: number | null;
}

export interface RaceResultShell {
  raceSlug: string;
  status: "awaiting" | "unofficial-in-progress" | "unofficial-called";
  reportingNote: string;
  lines: ResultLine[];
}

export interface ChamberMeter {
  chamber: "house" | "senate";
  title: string;
  seats: number;
  majority: number;
  demSeats: number | null;
  repSeats: number | null;
  otherSeats: number | null;
  note: string;
}
