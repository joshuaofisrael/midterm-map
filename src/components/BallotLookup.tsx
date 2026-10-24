"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import { STARTER_STATES } from "@/data/states";
import { lookupZipState, normalizeZip } from "@/data/zip";

export function BallotLookup({ initialState = "" }: { initialState?: string }) {
  const router = useRouter();
  const [zip, setZip] = useState("");
  const [state, setState] = useState(initialState);
  const [message, setMessage] = useState<string | null>(null);

  const matched = useMemo(() => lookupZipState(zip), [zip]);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    const digits = normalizeZip(zip);
    const fromZip = lookupZipState(digits);
    const target = (state || fromZip || "").toUpperCase();

    if (!target) {
      setMessage(
        "Enter a 5-digit ZIP or choose a starter state. Lookup stays in your browser and is not a voter-file search.",
      );
      return;
    }

    if (digits.length === 5 && !fromZip) {
      setMessage(
        `That ZIP prefix is outside the ${STARTER_STATES.length} states this site covers. Official pages for other states are the state election office and Vote.gov.`,
      );
      return;
    }

    if (fromZip && state && state !== fromZip) {
      setMessage(
        `ZIP prefix maps to ${fromZip} in this local table. Opening ${fromZip}. The official sample ballot for an address is issued by the election office.`,
      );
    } else {
      setMessage(null);
    }

    const path = `/ballot/${fromZip || target}`;
    const hash = digits.length === 5 ? `zip=${digits}` : "";
    const here = window.location.pathname.replace(/\/$/, "");
    if (here === path) {
      if (hash) window.location.hash = hash;
      else window.history.replaceState(null, "", path);
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    } else {
      router.push(hash ? `${path}#${hash}` : path);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-xl border border-line bg-paper-card p-5 shadow-card"
    >
      <div className="grid gap-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
        <label className="block text-sm">
          <span className="font-medium text-ink">ZIP code</span>
          <input
            inputMode="numeric"
            autoComplete="postal-code"
            name="zip"
            maxLength={5}
            value={zip}
            onChange={(event) => setZip(normalizeZip(event.target.value))}
            placeholder="85001"
            className="mt-1 w-full rounded-md border border-line bg-white px-3 py-2 text-ink"
            aria-describedby="zip-help"
          />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-ink">State</span>
          <select
            name="state"
            value={state}
            onChange={(event) => setState(event.target.value)}
            className="mt-1 w-full rounded-md border border-line bg-white px-3 py-2 text-ink"
          >
            <option value="">Select a starter state</option>
            {STARTER_STATES.map((item) => (
              <option key={item.code} value={item.code}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
        <button
          type="submit"
          className="rounded-md bg-navy px-4 py-2.5 text-sm font-semibold text-white hover:bg-navy-deep"
        >
          Open sample ballot
        </button>
      </div>
      <p id="zip-help" className="mt-3 text-sm leading-6 text-ink-muted">
        ZIP lookup stays in this browser. A 5-digit ZIP is kept after # on the
        ballot address and narrows U.S. House districts with the Census file on
        this site. We do not send your ZIP to a server or match it to a voter
        file. Prefixes map to a starter state.
        {matched ? ` This prefix currently maps to ${matched}.` : ""}
      </p>
      {message && (
        <p className="mt-2 text-sm leading-6 text-navy-deep" role="status">
          {message}
        </p>
      )}
    </form>
  );
}
