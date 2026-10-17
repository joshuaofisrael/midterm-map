import fs from "node:fs";
import path from "node:path";

export type BallotCandidate = {
  name: string;
  party: string;
  mark?: string;
};

export type BallotContest = {
  office: string;
  key: string | null;
  candidates: BallotCandidate[];
  term?: string;
  seats?: string;
  incumbentLine?: string;
  district?: string;
};

export type BallotMark = {
  name: string;
  party: string;
  mark: string;
};

export type BallotAnnotation = {
  term?: string;
  incumbentLine?: string;
  marks?: BallotMark[];
};

export type BallotDate = {
  quote: string;
  text: string;
};

export type BallotExtra = {
  statewide: BallotContest[];
  upper: Record<string, BallotContest>;
  lower: Record<string, BallotContest>;
  local: Record<string, BallotContest[]>;
  annotations: Record<string, BallotAnnotation>;
  date?: BallotDate;
};

export type SldAssignment = {
  u?: string[];
  l?: string[];
};

const extraCache = new Map<string, BallotExtra | null>();
let sldCache: Record<string, SldAssignment> | null = null;

export function ballotExtra(code: string): BallotExtra | undefined {
  const upper = code.toUpperCase();
  const cached = extraCache.get(upper);
  if (cached !== undefined) return cached ?? undefined;
  const file = path.join(process.cwd(), "src/data/ballot", `${upper}.json`);
  if (!fs.existsSync(file)) {
    extraCache.set(upper, null);
    return undefined;
  }
  const data = JSON.parse(fs.readFileSync(file, "utf8")) as BallotExtra;
  extraCache.set(upper, data);
  return data;
}

export function sldFor(geoid: string): SldAssignment | undefined {
  if (!sldCache) {
    const file = path.join(process.cwd(), "src/data/places/sld.json");
    sldCache = JSON.parse(fs.readFileSync(file, "utf8")) as Record<string, SldAssignment>;
  }
  return sldCache[geoid];
}

/** District token shared by a Census NAMELSAD and an official contest key. */
export function censusDistrictKey(name: string): string {
  const match = /District\s+([0-9A-Za-z]+)$/.exec(name);
  if (!match) return name.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  if (/^\d+$/.test(match[1])) return String(parseInt(match[1], 10));
  if (/^[A-Za-z]$/.test(match[1])) return match[1].toUpperCase();
  return name.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

export function contestsForDistricts(
  contests: Record<string, BallotContest> | undefined,
  names: string[] | undefined,
): BallotContest[] {
  if (!contests || !names || names.length === 0) return [];
  const keys = new Set(names.map(censusDistrictKey));
  const matches: BallotContest[] = [];
  const seen = new Set<string>();
  for (const [key, contest] of Object.entries(contests)) {
    if (!keys.has(key) || seen.has(contest.office)) continue;
    seen.add(contest.office);
    matches.push(contest);
  }
  return matches;
}
