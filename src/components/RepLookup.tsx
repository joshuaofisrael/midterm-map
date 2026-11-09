"use client";

import { FormEvent, useId, useState } from "react";

type DistrictHit = [string, string];
type ZipRow = { d?: DistrictHit[] };
type StateOpt = { code: string; name: string; districts: string[] };

const toSlug = (label: string) => {
  const m = label.match(/District (\d+)/);
  return m ? `district-${Number(m[1])}` : "at-large";
};
const human = (d: string) => (d === "at-large" ? "At-large" : `District ${d}`);

/** Find-your-representative: ZIP via Census ZCTA relationship files, or state and district. */
export function RepLookup({ states }: { states: StateOpt[] }) {
  const zipId = useId();
  const stId = useId();
  const dId = useId();
  const [zip, setZip] = useState("");
  const [status, setStatus] = useState("");
  const [hits, setHits] = useState<{ code: string; slug: string; label: string }[]>([]);
  const [st, setSt] = useState("");
  const [dist, setDist] = useState("");
  const chosen = states.find((s) => s.code === st);

  async function onZip(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const digits = zip.replace(/\D/g, "").slice(0, 5);
    setHits([]);
    if (digits.length !== 5) return setStatus("Enter a 5-digit ZIP code.");
    setStatus("Loading Census relationship data.");
    try {
      const res = await fetch(`/zcta/${digits.slice(0, 3)}.json`);
      const file = res.ok ? ((await res.json()) as Record<string, ZipRow>) : {};
      const rows = (file[digits]?.d ?? []).filter(([code]) => states.some((s) => s.code === code));
      if (!rows.length) return setStatus("No congressional district on file for that ZIP code. Choose your state and district below.");
      setHits(rows.map(([code, label]) => ({ code, slug: toSlug(label), label: `${code} ${label.replace("Congressional ", "")}` })));
      setStatus(rows.length > 1
        ? `${digits} spans ${rows.length} districts. Check your address with your state election office to know which one is yours.`
        : `${digits} is in one district.`);
    } catch {
      setStatus("The lookup file did not load. Choose your state and district below.");
    }
  }

  return (
    <div className="space-y-4">
      <form onSubmit={onZip} className="rounded-xl border border-line bg-paper-card p-5 shadow-card">
        <label htmlFor={zipId} className="block font-semibold">Find by ZIP code</label>
        <div className="mt-2 flex gap-2">
          <input id={zipId} inputMode="numeric" autoComplete="postal-code" maxLength={5} value={zip}
            onChange={(e) => setZip(e.target.value)} className="w-32 rounded-md border border-line px-3 py-2" placeholder="ZIP" />
          <button type="submit" className="rounded-md bg-navy px-4 py-2 text-white">Find</button>
        </div>
        <p className="mt-2 text-sm" role="status" aria-live="polite">{status}</p>
        {hits.length ? (
          <ul className="mt-2 list-disc pl-5 text-sm">
            {hits.map((h) => (
              <li key={h.code + h.slug}>
                <a className="font-medium text-navy underline" href={`/representatives/${h.code}/${h.slug}/`}>{h.label}</a>
              </li>
            ))}
          </ul>
        ) : null}
        <p className="mt-2 text-xs text-ink-muted">
          ZIP codes are matched with U.S. Census Bureau ZIP Code Tabulation Area relationship files. A ZIP code can cross
          district lines, so your street address decides your district.
        </p>
      </form>
      <form className="rounded-xl border border-line bg-paper-card p-5 shadow-card"
        onSubmit={(e) => { e.preventDefault(); if (chosen) window.location.href = `/representatives/${chosen.code}/${dist ? (dist === "at-large" ? "at-large" : `district-${dist}`) + "/" : ""}`; }}>
        <p className="font-semibold">Find by state and district</p>
        <div className="mt-2 flex flex-wrap gap-2">
          <label htmlFor={stId} className="sr-only">State</label>
          <select id={stId} value={st} onChange={(e) => { setSt(e.target.value); setDist(""); }} className="rounded-md border border-line px-3 py-2">
            <option value="">State</option>
            {states.map((s) => <option key={s.code} value={s.code}>{s.name}</option>)}
          </select>
          <label htmlFor={dId} className="sr-only">District</label>
          <select id={dId} value={dist} onChange={(e) => setDist(e.target.value)} disabled={!chosen} className="rounded-md border border-line px-3 py-2">
            <option value="">All districts</option>
            {chosen?.districts.map((d) => <option key={d} value={d}>{human(d)}</option>)}
          </select>
          <button type="submit" disabled={!chosen} className="rounded-md bg-navy px-4 py-2 text-white disabled:opacity-50">Go</button>
        </div>
      </form>
    </div>
  );
}
