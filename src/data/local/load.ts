import fs from "node:fs";
import path from "node:path";

export type LocalCandidate = {
  name: string;
  party: string;
  mark?: string;
  /** Verified https://ballotpedia.org/ profile. Omitted when none was verified. */
  ballotpedia?: string;
};

export type LocalContest = {
  office: string;
  key: string | null;
  candidates: LocalCandidate[];
  term?: string;
  termType?: string;
  termLength?: string;
  seats?: string;
  incumbentLine?: string;
  district?: string;
};

export type LocalSource = { name: string; url: string; accessed?: string };

/** City-only citation and note. County blocks stay on countyRead. */
export type LocalPlace = {
  sources?: LocalSource[];
  note?: string;
  /** Printed when this place has no city contest. */
  empty?: string;
};

export type LocalCounty = {
  label: string;
  href: string;
  intro?: string;
  note?: string;
  empty?: string;
  /** Other official lists for this county only, such as a measures PDF. */
  sources?: LocalSource[];
};

/** One state's official local contests. Absent files mean the place page stays silent. */
export type LocalFile = {
  /** Citation date for this file. Omitted files keep the October 17, 2026 local-contest read date. */
  accessed?: string;
  date?: { quote: string; text: string };
  localIntro?: string;
  local?: Record<string, LocalContest[]>;
  /** Per-place source, district-omission note, or a no-contest sentence. */
  localPlace?: Record<string, LocalPlace>;
  localByCounty?: Record<string, LocalContest[]>;
  countyRead?: Record<string, LocalCounty>;
  countyUnpublished?: Record<string, LocalCounty>;
  extraSources?: LocalSource[];
};

const cache = new Map<string, LocalFile | null>();

export function localFile(code: string): LocalFile | undefined {
  const upper = code.toUpperCase();
  const cached = cache.get(upper);
  if (cached !== undefined) return cached ?? undefined;
  const file = path.join(process.cwd(), "src/data/local", `${upper}.json`);
  if (!fs.existsSync(file)) {
    cache.set(upper, null);
    return undefined;
  }
  const data = JSON.parse(fs.readFileSync(file, "utf8")) as LocalFile;
  cache.set(upper, data);
  return data;
}
