"use client";

/**
 * One same-origin results file for the live page and the chamber needles.
 * The query bucket is the current minute so a CDN can cache it.
 * The browser does not call GitHub or a state election API.
 */
export const RESULTS_URL = "/live/results.json";
const STORAGE_KEY = "mtm-live-results-v1";
/** Poll at most once a minute. */
export const POLL_MS = 60_000;

export interface LiveCandidate {
  name: string;
  partyLabel: string;
  votes: number;
  percentText: string | null;
  winner: boolean;
}

export interface LiveRace {
  siteSlug: string | null;
  office: string;
  district: string | null;
  title: string;
  precinctsReporting: number | null;
  precinctsTotal: number | null;
  reportingLabel: string | null;
  certified: boolean;
  candidates: LiveCandidate[];
}

export interface LiveStateFile {
  code: string;
  name: string;
  office: string;
  resultsUrl: string;
  resultsLabel: string;
  machineReadable: boolean;
  feedStatus: string;
  feedNote: string;
  sourceUpdatedAt: string | null;
  fetchedAt: string | null;
  races: LiveRace[];
}

/** Seat totals only when the results file itself includes them. Null is awaiting, not a projection. */
export interface ChamberCounts {
  dem: number | null;
  rep: number | null;
  other: number | null;
}

export interface LivePayload {
  generatedAt: string;
  electionDay?: string;
  chambers?: {
    house?: ChamberCounts;
    senate?: ChamberCounts;
  };
  states: Record<string, LiveStateFile>;
}

export interface LiveSnapshot {
  payload: LivePayload | null;
  now: number | null;
  stale: boolean;
}

type Listener = (snapshot: LiveSnapshot) => void;

let snapshot: LiveSnapshot = { payload: null, now: null, stale: false };
const listeners = new Set<Listener>();
let timer = 0;
let generation = 0;
let onVisible: (() => void) | null = null;

function emit() {
  for (const listener of listeners) listener(snapshot);
}

async function load() {
  if (typeof document !== "undefined" && document.hidden) return;
  const id = ++generation;
  const now = Date.now();
  const bucket = Math.floor(now / POLL_MS);
  try {
    const response = await fetch(`${RESULTS_URL}?t=${bucket}`);
    if (!response.ok) throw new Error(String(response.status));
    const json = (await response.json()) as LivePayload;
    if (json?.electionDay !== "2026-11-03") throw new Error("election day");
    if (id !== generation) return;
    snapshot = { payload: json, now, stale: false };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(json));
    } catch {
      /* private mode */
    }
  } catch {
    if (id !== generation) return;
    let payload = snapshot.payload;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const parsed = saved ? (JSON.parse(saved) as LivePayload) : null;
      if (parsed?.electionDay === "2026-11-03") payload = parsed;
    } catch {
      /* keep the last in-memory copy */
    }
    snapshot = { payload, now, stale: true };
  }
  emit();
}

/** Shared poll. Every mounted reader uses this one request per minute. */
export function subscribeLive(listener: Listener): () => void {
  listeners.add(listener);
  listener(snapshot);
  if (listeners.size === 1) {
    void load();
    timer = window.setInterval(() => void load(), POLL_MS);
    onVisible = () => {
      if (!document.hidden) void load();
    };
    document.addEventListener("visibilitychange", onVisible);
  }
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      window.clearInterval(timer);
      timer = 0;
      if (onVisible) document.removeEventListener("visibilitychange", onVisible);
      onVisible = null;
    }
  };
}

export function finiteSeat(value: unknown): number | null {
  if (typeof value !== "number" || !Number.isFinite(value) || value < 0) return null;
  return value;
}

export function chamberCounts(counts: ChamberCounts | undefined): { dem: number; rep: number; other: number } | null {
  if (!counts) return null;
  const dem = finiteSeat(counts.dem);
  const rep = finiteSeat(counts.rep);
  const other = finiteSeat(counts.other);
  if (dem == null || rep == null || other == null) return null;
  return { dem, rep, other };
}
