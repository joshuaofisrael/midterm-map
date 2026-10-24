import fs from "node:fs";
import path from "node:path";
import type { PlaceRecord } from "@/data/places/load";
import { sortContests } from "@/data/candidates/contestOrder";
import { districtNumber } from "@/data/candidates/district";

export type CandidatePerson = { name: string; party: string; ballotpedia?: string };

export type ContestKind = "senate" | "governor" | "house" | "statewide";

export type CandidateContest = {
  office: string;
  kind: ContestKind;
  district: string | null;
  candidates: CandidatePerson[];
  /** Page the names in this contest were copied from, when it is not the file-level source. */
  source?: CandidateSource;
};

export type CandidateSource = {
  name: string;
  url: string;
  accessed?: string;
  published?: string;
};

export type CandidateFile = {
  status: "published" | "unpublished";
  sources: CandidateSource[];
  contests: CandidateContest[];
};

/** States whose 2026 congressional boundaries differ from the 119th relationship file. */
const CHANGED_HOUSE_MAPS = new Set(["AL", "CA", "FL", "LA", "NC", "OH", "TN", "TX", "UT"]);

const fileCache = new Map<string, CandidateFile>();
let cd120Cache: Record<string, Record<string, string[]>> | null = null;

function candidatePath(code: string): string {
  return path.join(process.cwd(), "src/data/candidates", `${code}.json`);
}

export function candidateFile(code: string): CandidateFile | undefined {
  const upper = code.toUpperCase();
  const cached = fileCache.get(upper);
  if (cached) return cached;
  const file = candidatePath(upper);
  if (!fs.existsSync(file)) return undefined;
  const data = JSON.parse(fs.readFileSync(file, "utf8")) as CandidateFile;
  fileCache.set(upper, data);
  return data;
}

function cd120Places(): Record<string, Record<string, string[]>> {
  if (cd120Cache) return cd120Cache;
  const file = path.join(process.cwd(), "src/data/places/cd120.json");
  cd120Cache = JSON.parse(fs.readFileSync(file, "utf8")) as Record<string, Record<string, string[]>>;
  return cd120Cache;
}

/** 2026 U.S. House district numbers for this place. Changed-map states use the 120th file. */
export function houseDistrictNumbers(code: string, place: PlaceRecord): string[] {
  return [...houseKeys(code, place)].sort((a, b) => Number(a) - Number(b) || a.localeCompare(b));
}

function houseKeys(code: string, place: PlaceRecord): Set<string> {
  if (CHANGED_HOUSE_MAPS.has(code)) {
    const assigned = cd120Places()[code]?.[place.geoid] ?? [];
    return new Set(assigned.map(districtNumber).filter(Boolean));
  }
  return new Set((place.districts ?? []).map(districtNumber).filter(Boolean));
}

export type HouseBasis = "bef" | "unchanged" | "none";

/**
 * Statewide contests on the official list, plus U.S. House contests whose
 * district number covers this place. Changed-map states use the 120th block
 * equivalency assignment. Other states use the 119th relationship-file number
 * because Census says those boundaries did not change for 2026.
 */
function selectContests(file: CandidateFile, keys: Set<string> | null): CandidateContest[] {
  const contests: CandidateContest[] = [];
  for (const contest of file.contests) {
    if (contest.candidates.length === 0) continue;
    if (contest.kind === "senate" || contest.kind === "governor" || contest.kind === "statewide") {
      contests.push(contest);
      continue;
    }
    if (contest.kind !== "house" || contest.district == null) continue;
    const district = districtNumber(contest.district);
    if (!district) continue;
    if (keys && !keys.has(district)) continue;
    contests.push(contest);
  }
  return sortContests(contests);
}

function houseBasisFor(code: string, contests: CandidateContest[]): HouseBasis {
  const showedHouse = contests.some((contest) => contest.kind === "house");
  if (!showedHouse) return "none";
  return CHANGED_HOUSE_MAPS.has(code) ? "bef" : "unchanged";
}

export function contestsForPlace(
  code: string,
  place: PlaceRecord,
): { contests: CandidateContest[]; houseBasis: HouseBasis } {
  const upper = code.toUpperCase();
  const file = candidateFile(upper);
  if (!file || file.status !== "published") return { contests: [], houseBasis: "none" };
  const contests = selectContests(file, houseKeys(upper, place));
  return { contests, houseBasis: houseBasisFor(upper, contests) };
}

/** Statewide contests plus every U.S. House district that covers one of these places. */
export function contestsForPlaces(
  code: string,
  places: PlaceRecord[],
): { contests: CandidateContest[]; houseBasis: HouseBasis } {
  const upper = code.toUpperCase();
  const file = candidateFile(upper);
  if (!file || file.status !== "published") return { contests: [], houseBasis: "none" };
  const keys = new Set<string>();
  for (const place of places) {
    for (const key of houseKeys(upper, place)) keys.add(key);
  }
  const contests = selectContests(file, keys);
  return { contests, houseBasis: houseBasisFor(upper, contests) };
}

/** Every contest on the stored statewide list, including each U.S. House district. */
export function ballotContests(code: string): {
  contests: CandidateContest[];
  status: CandidateFile["status"] | "missing";
  sources: CandidateSource[];
} {
  const file = candidateFile(code);
  if (!file) return { contests: [], status: "missing", sources: [] };
  if (file.status !== "published") return { contests: [], status: file.status, sources: file.sources };
  return { contests: selectContests(file, null), status: "published", sources: file.sources };
}
