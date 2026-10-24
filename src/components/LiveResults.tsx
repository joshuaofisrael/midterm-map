"use client";

import { useEffect, useState } from "react";

/** Same-origin file. The browser must not call GitHub or a state election API. */
const RESULTS_URL = "/live/results.json";
const STORAGE_KEY = "mtm-live-results-v1";
/** Poll at most once a minute. The query bucket is that same minute so a CDN can cache it. */
const POLL_MS = 60_000;

interface LiveCandidate {
  name: string;
  partyLabel: string;
  votes: number;
  percentText: string | null;
  winner: boolean;
}

interface LiveRace {
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

interface LiveStateFile {
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

interface LivePayload {
  generatedAt: string;
  electionDay?: string;
  states: Record<string, LiveStateFile>;
}

export interface LiveSource {
  code: string;
  name: string;
  office: string;
  resultsUrl: string;
  resultsLabel: string;
  machineReadable: boolean;
  closeLabel: string;
  citation: string;
  allPollsClosedAt: string;
}

function formatWhen(value: string | null): string | null {
  if (!value) return null;
  const dated = /^\d{4}-\d{2}-\d{2}T/.test(value) || /^[A-Za-z]{3}, \d{1,2} /.test(value);
  if (!dated) return value;
  const parsed = Date.parse(value);
  if (Number.isNaN(parsed)) return value;
  return `${new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(parsed))} Eastern Time`;
}

function votesText(votes: number): string {
  if (!Number.isFinite(votes)) return "—";
  return `${votes.toLocaleString("en-US")} votes`;
}

function reportingText(race: LiveRace): string | null {
  if (race.precinctsReporting == null || race.precinctsTotal == null || !race.reportingLabel) return null;
  return `${race.precinctsReporting.toLocaleString("en-US")} of ${race.precinctsTotal.toLocaleString("en-US")} ${race.reportingLabel} reporting`;
}

function RaceFigures({
  race,
  office,
  ballotpediaByName,
}: {
  race: LiveRace;
  office: string;
  ballotpediaByName?: Record<string, string>;
}) {
  const status = race.certified
    ? `Official results as reported by the ${office}.`
    : `Unofficial results as reported by the ${office}.`;
  const progress = reportingText(race);
  return (
    <div className="mt-3">
      <p className="text-sm leading-6">{status}</p>
      {progress ? <p className="mt-1 text-sm text-ink-muted">{progress}</p> : null}
      <ul className="mt-3 divide-y divide-line rounded-lg border border-line">
        {race.candidates.map((candidate) => (
          <li key={`${candidate.name}-${candidate.partyLabel}`} className="px-3 py-3">
            <p className="font-semibold text-ink">
              {candidate.name}{" "}
              {ballotpediaByName?.[candidate.name]?.startsWith("https://ballotpedia.org/") ? (
                <a
                  className="text-xs font-medium text-navy hover:underline"
                  href={ballotpediaByName[candidate.name]}
                  rel="noopener"
                  target="_blank"
                >
                  Ballotpedia
                </a>
              ) : null}
              {candidate.winner ? <span className="ml-2 text-sm font-semibold uppercase tracking-wide">Winner</span> : null}
            </p>
            <p className="text-sm text-ink-muted">{candidate.partyLabel || "No party label in the file"}</p>
            <p className="text-sm tabular-nums">
              {votesText(candidate.votes)}
              {candidate.percentText ? ` · ${candidate.percentText}%` : " · Percent not in the official file"}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function StateBlock({
  source,
  file: raw,
  now,
  raceSlugs,
  stale,
  ballotpediaBySlug,
}: {
  source: LiveSource;
  file: LiveStateFile | undefined;
  now: number | null;
  raceSlugs?: string[];
  stale: boolean;
  ballotpediaBySlug?: Record<string, Record<string, string>>;
}) {
  const closeAt = source.allPollsClosedAt === "" ? NaN : Date.parse(source.allPollsClosedAt);
  const closed = now != null && !Number.isNaN(closeAt) && closeAt <= now;
  // Returns count only when the file itself was fetched after polls closed,
  // so a wrong device clock or an old copy cannot show earlier numbers.
  const fetched = Date.parse(raw?.fetchedAt || "");
  const file = raw && !Number.isNaN(fetched) && fetched >= closeAt ? raw : undefined;
  const races = (file?.races || []).filter((race) => !raceSlugs || (race.siteSlug && raceSlugs.includes(race.siteSlug)));
  const updated = formatWhen(file?.sourceUpdatedAt || file?.fetchedAt || null);

  return (
    <section className="rounded-xl border border-line bg-paper-card p-4" aria-labelledby={`live-${source.code}`}>
      <h3 id={`live-${source.code}`} className="font-serif text-xl font-semibold">
        {source.name}
      </h3>
      <p className="mt-1 text-sm leading-6 text-ink-muted">
        Polls close at {source.closeLabel || "the time set by state law"}. {source.citation}
      </p>
      {!closed ? (
        <p className="mt-3 text-sm leading-6">
          No returns are shown before polls close in {source.name}.{" "}
          <a className="font-medium text-navy underline" href={source.resultsUrl} rel="noopener noreferrer">
            {source.resultsLabel}
          </a>
        </p>
      ) : null}
      {closed && !source.machineReadable ? (
        <p className="mt-3 text-sm leading-6">
          No machine-readable results file was confirmed for {source.office}.{" "}
          <a className="font-medium text-navy underline" href={source.resultsUrl} rel="noopener noreferrer">
            {source.resultsLabel}
          </a>
        </p>
      ) : null}
      {closed && source.machineReadable && !file ? (
        <p className="mt-3 text-sm leading-6">
          {stale ? "The latest results file did not load." : "Loading the latest file…"}{" "}
          <a className="font-medium text-navy underline" href={source.resultsUrl} rel="noopener noreferrer">
            {source.resultsLabel}
          </a>
        </p>
      ) : null}
      {closed && file && file.feedStatus !== "ok" && file.feedStatus !== "stale" ? (
        <p className="mt-3 text-sm leading-6">
          {file.feedNote}{" "}
          <a className="font-medium text-navy underline" href={source.resultsUrl} rel="noopener noreferrer">
            {source.resultsLabel}
          </a>
        </p>
      ) : null}
      {closed && file && (file.feedStatus === "ok" || file.feedStatus === "stale") ? (
        <div className="mt-3">
          {stale || file.feedStatus === "stale" ? (
            <p className="text-sm leading-6">
              Showing the last results fetched{updated ? ` at ${updated}` : ""}. A later check did not succeed.{" "}
              <a className="font-medium text-navy underline" href={source.resultsUrl} rel="noopener noreferrer">
                {source.resultsLabel}
              </a>
            </p>
          ) : (
            <p className="text-sm leading-6">
              Last updated from {source.office}
              {updated ? ` at ${updated}` : ""}.{" "}
              <a className="font-medium text-navy underline" href={source.resultsUrl} rel="noopener noreferrer">
                {source.resultsLabel}
              </a>
            </p>
          )}
          {races.length === 0 ? (
            <p className="mt-2 text-sm leading-6">This contest is not in the latest file from {source.office}.</p>
          ) : (
            races.map((race) => (
              <div key={race.siteSlug || race.title} className="mt-4">
                <h4 className="font-semibold">{race.title}</h4>
                <RaceFigures
                  race={race}
                  office={source.office}
                  ballotpediaByName={race.siteSlug ? ballotpediaBySlug?.[race.siteSlug] : undefined}
                />
              </div>
            ))
          )}
        </div>
      ) : null}
    </section>
  );
}

export function LiveResults({
  sources,
  raceSlugs,
  ballotpediaBySlug,
}: {
  sources: LiveSource[];
  raceSlugs?: string[];
  ballotpediaBySlug?: Record<string, Record<string, string>>;
}) {
  const [payload, setPayload] = useState<LivePayload | null>(null);
  const [now, setNow] = useState<number | null>(null);
  const [stale, setStale] = useState(false);

  useEffect(() => {
    let stop = false;
    let generation = 0;
    async function load() {
      if (document.hidden) return;
      const id = ++generation;
      setNow(Date.now());
      // One URL per minute. Visitors share that URL, so the edge can cache it.
      // Default cache mode honors Cache-Control. Do not send Cache-Control: no-store.
      const bucket = Math.floor(Date.now() / POLL_MS);
      try {
        const response = await fetch(`${RESULTS_URL}?t=${bucket}`);
        if (!response.ok) throw new Error(String(response.status));
        const json = (await response.json()) as LivePayload;
        if (json?.electionDay !== "2026-11-03") throw new Error("election day");
        if (stop || id !== generation) return;
        setPayload(json);
        setStale(false);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(json));
        } catch {
          /* private mode */
        }
        return;
      } catch {
        /* the same-origin file did not load */
      }
      if (stop || id !== generation) return;
      setStale(true);
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        const parsed = saved ? (JSON.parse(saved) as LivePayload) : null;
        if (parsed?.electionDay === "2026-11-03") setPayload(parsed);
      } catch {
        /* keep the last in-memory copy */
      }
    }
    void load();
    const timer = window.setInterval(() => void load(), POLL_MS);
    function onVisible() {
      if (!document.hidden) void load();
    }
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      stop = true;
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  return (
    <div className="space-y-4" aria-live="polite">
      {sources.map((source) => (
        <StateBlock
          key={source.code}
          source={source}
          file={payload?.states?.[source.code]}
          now={now}
          raceSlugs={raceSlugs}
          stale={stale}
          ballotpediaBySlug={ballotpediaBySlug}
        />
      ))}
    </div>
  );
}
