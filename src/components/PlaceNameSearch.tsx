"use client";

import { FormEvent, useId, useState } from "react";
import manifest from "@/data/places/manifest.json";
import { normalizePlaceQuery, scorePlaceQuery, searchShardLetter } from "@/lib/placeNames";

type Row = [string, string, string, string, number | null, string];

const STATE_NAME = Object.fromEntries(manifest.states.map((state) => [state.code, state.name]));
const shardCache = new Map<string, Row[]>();

async function loadShard(letter: string): Promise<Row[]> {
  const cached = shardCache.get(letter);
  if (cached) return cached;
  const response = await fetch(`/place-search/${letter}.json`);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const rows = (await response.json()) as Row[];
  shardCache.set(letter, rows);
  return rows;
}

export function PlaceNameSearch({
  stateCode,
  scopeName,
}: {
  stateCode?: string;
  scopeName?: string;
}) {
  const inputId = useId();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const [hits, setHits] = useState<Row[]>([]);
  const [busy, setBusy] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = query.trim();
    if (normalizePlaceQuery(trimmed).length < 2) {
      setHits([]);
      setStatus("Type at least two letters.");
      return;
    }
    setBusy(true);
    setStatus("Searching place names.");
    try {
      const rows = await loadShard(searchShardLetter(trimmed));
      const ranked: { row: Row; score: number }[] = [];
      const seen = new Set<string>();
      for (const row of rows) {
        if (stateCode && row[0] !== stateCode) continue;
        const id = `${row[0]}/${row[1]}`;
        if (seen.has(id)) continue;
        const score = scorePlaceQuery(trimmed, row[2]);
        if (score == null) continue;
        seen.add(id);
        ranked.push({ row, score });
      }
      ranked.sort(
        (a, b) => a.score - b.score || (b.row[4] ?? -1) - (a.row[4] ?? -1) || a.row[2].localeCompare(b.row[2]),
      );
      const top = ranked.slice(0, 20).map((item) => item.row);
      setHits(top);
      const extra = ranked.length > top.length ? ` Showing 20 of ${ranked.length}.` : "";
      setStatus(top.length > 0 ? `${ranked.length} matching Census ${ranked.length === 1 ? "place" : "places"}.${extra}` : "No Census place matched that spelling.");
    } catch {
      setHits([]);
      setStatus("The place-name index did not load. Run the site build so public/place-search exists.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form id="place-search" onSubmit={onSubmit} className="mt-4 rounded-xl border border-line bg-paper-card p-5 shadow-card">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <label className="block flex-1 text-sm" htmlFor={inputId}>
          <span className="font-medium text-ink">City or town</span>
          <input
            id={inputId}
            name="place"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            autoComplete="off"
            className="mt-1 w-full rounded-md border border-line bg-white px-3 py-2 text-ink"
            placeholder="Farmington Hills"
          />
        </label>
        <button
          type="submit"
          disabled={busy}
          className="rounded-md bg-navy px-4 py-2.5 text-sm font-semibold text-white hover:bg-navy-deep disabled:opacity-60"
        >
          Search
        </button>
      </div>
      <p className="mt-3 text-sm leading-6 text-ink-muted">
        Matches Saint and St., Mount and Mt., Fort and Ft., hyphens, spaces, apostrophes, City and
        Township, and a fixed list of common misspellings.
        {scopeName ? ` Limited to ${scopeName}.` : " Searches every state, the District of Columbia, and Puerto Rico."}
      </p>
      <div aria-live="polite" className="mt-3 text-sm leading-6">
        {status}
      </div>
      {hits.length > 0 ? (
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-6">
          {hits.map((row) => (
            <li key={`${row[0]}-${row[1]}`}>
              <a className="font-medium text-navy hover:underline" href={row[5]}>
                {row[2]}, {STATE_NAME[row[0]] ?? row[0]}
              </a>
              {row[3] ? <span className="text-ink-muted"> — {row[3]}</span> : null}
            </li>
          ))}
        </ul>
      ) : null}
    </form>
  );
}
