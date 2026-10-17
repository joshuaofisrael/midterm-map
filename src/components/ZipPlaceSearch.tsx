"use client";

import { FormEvent, useId, useState } from "react";
import manifest from "@/data/places/manifest.json";
import { electionOfficeFor } from "@/data/electionOffices";

type PlaceHit = [string, string, string];
type DistrictHit = [string, string];
type ZipRow = { p?: PlaceHit[]; d?: DistrictHit[] };
type PrefixFile = Record<string, ZipRow>;

const STATE_NAME = Object.fromEntries(manifest.states.map((state) => [state.code, state.name]));

const prefixCache = new Map<string, PrefixFile>();

function digitsOnly(value: string): string {
  return value.replace(/\D/g, "").slice(0, 5);
}

async function loadPrefix(prefix: string): Promise<PrefixFile> {
  const cached = prefixCache.get(prefix);
  if (cached) return cached;
  const response = await fetch(`/zcta/${prefix}.json`);
  if (response.status === 404) {
    const empty: PrefixFile = {};
    prefixCache.set(prefix, empty);
    return empty;
  }
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = (await response.json()) as PrefixFile;
  prefixCache.set(prefix, data);
  return data;
}

export function ZipPlaceSearch({ scopeName }: { scopeName?: string }) {
  const inputId = useId();
  const helpId = useId();
  const [zip, setZip] = useState("");
  const [status, setStatus] = useState("");
  const [result, setResult] = useState<{ zip: string; row: ZipRow } | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const digits = digitsOnly(zip);
    setResult(null);
    if (digits.length !== 5) {
      setStatus("Enter a 5-digit ZIP code.");
      return;
    }
    setBusy(true);
    setStatus("Loading Census relationship data.");
    try {
      const file = await loadPrefix(digits.slice(0, 3));
      const row = file[digits];
      if (!row) {
        setStatus("The Census ZCTA relationship files have no record for that code.");
        return;
      }
      const places = row.p?.length ?? 0;
      const districts = row.d?.length ?? 0;
      const span =
        districts > 1 ? " This ZIP code spans more than one congressional district." : "";
      setResult({ zip: digits, row });
      setStatus(
        `${digits}: ${places} Census ${places === 1 ? "place" : "places"} and ${districts} congressional ${districts === 1 ? "district" : "districts"}.${span}`,
      );
    } catch {
      setStatus("The Census relationship file for that ZIP prefix did not load.");
    } finally {
      setBusy(false);
    }
  }

  const districts = result?.row.d ?? [];
  const places = result?.row.p ?? [];
  const lookupStates = [...new Set(districts.map((district) => district[0]))];

  return (
    <form onSubmit={onSubmit} className="mt-4 rounded-xl border border-line bg-paper-card p-5 shadow-card">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <label className="block flex-1 text-sm" htmlFor={inputId}>
          <span className="font-medium text-ink">ZIP code</span>
          <input
            id={inputId}
            name="zip"
            inputMode="numeric"
            autoComplete="postal-code"
            maxLength={5}
            value={zip}
            onChange={(event) => setZip(digitsOnly(event.target.value))}
            aria-describedby={helpId}
            className="mt-1 w-full rounded-md border border-line bg-white px-3 py-2 text-ink"
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
      <p id={helpId} className="mt-3 text-sm leading-6 text-ink-muted">
        The full ZIP stays in this browser. Search loads a public file for the first three digits
        from this site only. The ZIP is not stored and is not sent to a third-party service.
        {scopeName
          ? ` Results are national and can include places outside ${scopeName}.`
          : ""}
      </p>
      <div aria-live="polite" className="mt-3 text-sm leading-6">
        {status}
      </div>
      {result && (
        <div className="mt-4 space-y-4 text-sm leading-6">
          <div>
            <h3 className="font-semibold">Census places for {result.zip}</h3>
            {places.length > 0 ? (
              <ul className="mt-2 list-disc space-y-1 pl-5">
                {places.map((place) => (
                  <li key={`${place[0]}-${place[1]}`}>
                    <a className="font-medium text-navy hover:underline" href={`/cities/${place[0]}/${place[1]}/`}>
                      {place[2]}, {STATE_NAME[place[0]] ?? place[0]}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2">
                The 2020 ZCTA-to-place relationship file has no place with land area on this site
                for that code.
              </p>
            )}
          </div>
          <div>
            <h3 className="font-semibold">Congressional districts for {result.zip}</h3>
            {districts.length > 0 ? (
              <ul className="mt-2 list-disc space-y-1 pl-5">
                {districts.map((district) => (
                  <li key={`${district[0]}-${district[1]}`}>
                    {STATE_NAME[district[0]] ?? district[0]} — {district[1]}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2">
                The congressional-district relationship data has no district with land area for
                that code.
              </p>
            )}
            {districts.length > 1 && (
              <div className="mt-3">
                <p>This ZIP code spans more than one congressional district.</p>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  {lookupStates.map((code) => {
                    const office = electionOfficeFor(code);
                    if (!office) return null;
                    return (
                      <li key={code}>
                        <a className="text-navy hover:underline" href={office.lookup.href}>
                          {office.lookup.label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </form>
  );
}
