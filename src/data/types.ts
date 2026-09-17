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

export type PartyId = "DEM" | "REP" | "IND" | "OTH" | "TBD";

export type RatingTier = "Solid D" | "Likely D" | "Lean D" | "Tossup" | "Lean R" | "Likely R" | "Solid R";

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
  registrationNote: string;
  earlyVotingNote: string;
  mailNote: string;
  idNote: string;
  hasSenateClass2: boolean;
  hasGovernor2026: boolean;
  sampleBallotNotes: string[];
}

export interface CandidatePlaceholder {
  label: string;
  party: PartyId;
  partyLabel: string;
  isDemo: true;
  note: string;
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
  currentOfficeholderNote?: string;
  overview: string;
  whatIsOnTheLine: string;
  howToRead: string;
  candidates: CandidatePlaceholder[];
  rating: RatingTier;
  ratingIsDemo: true;
  ratingNote: string;
  relatedPollSlugs: string[];
  ballotSections: string[];
}

export interface PollRow {
  slug: string;
  raceSlug: string;
  pollster: string;
  dates: string;
  sample: string;
  dem: number | null;
  rep: number | null;
  other: number | null;
  spread: string;
  isDemo: true;
  note: string;
}

export interface NationalStripRow {
  label: string;
  dem: number;
  rep: number;
  other: number;
  isDemo: true;
}

export interface BallotContest {
  id: string;
  heading: string;
  kind: BallotSectionKind;
  raceSlug?: string;
  lines: string[];
  isDemo: true;
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
  isDemo: true;
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
  isDemo: true;
  note: string;
}
