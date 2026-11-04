"use client";
/** Reusable win probability meter: prediction market odds read in the browser from Polymarket's public API
 * (it allows cross-origin reads). Shows nothing if the market can't be read, and nothing during a
 * legal blackout window (hideFrom/hideUntil, ISO times) so no odds appear while polls must not be published. */
import { useEffect, useState } from "react";

type Outcome = { name: string; p: number };

export function OddsMeter({ slug, title, hideFrom, hideUntil, max = 4 }: { slug: string; title: string; hideFrom?: string; hideUntil?: string; max?: number }) {
  const [rows, setRows] = useState<Outcome[] | null>(null);
  const [at, setAt] = useState("");
  const blackout = () => { const n = Date.now(); return !!hideFrom && !!hideUntil && n >= +new Date(hideFrom) && n < +new Date(hideUntil); };
  useEffect(() => {
    let off = false;
    const load = async () => {
      if (blackout()) { setRows(null); return; }
      try {
        const res = await fetch(`https://gamma-api.polymarket.com/events?slug=${encodeURIComponent(slug)}`);
        const [ev] = await res.json();
        const out: Outcome[] = (ev?.markets ?? [])
          .filter((m: { closed?: boolean; active?: boolean }) => m.active && !m.closed)
          .map((m: { groupItemTitle?: string; question: string; outcomePrices: string }) => ({ name: m.groupItemTitle || m.question, p: Math.round(Number(JSON.parse(m.outcomePrices)[0]) * 100) }))
          .filter((o: Outcome) => o.p >= 2)
          .sort((a: Outcome, b: Outcome) => b.p - a.p)
          .slice(0, max);
        if (!off && out.length) { setRows(out); setAt(new Date().toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })); }
      } catch { /* leave hidden */ }
    };
    load();
    const t = setInterval(load, 5 * 60 * 1000);
    return () => { off = true; clearInterval(t); };
  }, [slug]); // eslint-disable-line react-hooks/exhaustive-deps
  if (!rows || blackout()) return null;
  return (
    <section className="my-8 rounded-xl border border-line bg-paper-card p-5 text-sm" data-odds-meter>
      <h2 className="font-serif text-xl font-semibold text-ink">Win probability meter: {title}</h2>
      <p className="mt-1 text-xs text-ink-soft">Prediction market odds (Polymarket), not a forecast or official result. Last traded prices, read {at} (your time); refreshes every 5 minutes.</p>
      <ul className="mt-4 space-y-3">
        {rows.map((o) => (
          <li key={o.name}>
            <div className="flex justify-between font-semibold text-ink"><span>{o.name}</span><span>{o.p}%</span></div>
            <div className="mt-1 h-3 overflow-hidden rounded-full bg-line"><div className="h-full bg-navy" style={{ width: `${o.p}%` }} /></div>
          </li>
        ))}
      </ul>
      <a className="mt-2 inline-block text-xs text-navy underline" href={`https://polymarket.com/event/${slug}`} rel="noopener noreferrer">Source: Polymarket market</a>
    </section>
  );
}
