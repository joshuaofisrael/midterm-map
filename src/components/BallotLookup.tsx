"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import { STATE_CHOICES } from "@/data/stateChoices";
import { lookupZipState, normalizeZip } from "@/data/zip";
import { BALLOT_ZIP_EVENT, writeBallotZip } from "@/lib/ballotZip";

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
        `That ZIP prefix is outside the ${STATE_CHOICES.length} states this site covers. Official pages for other states are the state election office and Vote.gov.`,
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

    writeBallotZip(digits.length === 5 ? digits : "");
    const path = `/ballot/${fromZip || target}`;
    const here = window.location.pathname.replace(/\/$/, "") || "/";
    if (here === path) {
      if (window.location.hash) {
        const params = new URLSearchParams(window.location.hash.replace(/^#/, ""));
        params.delete("zip");
        const next = params.toString();
        window.history.replaceState(null, "", `${path}${window.location.search}${next ? `#${next}` : ""}`);
      }
      window.dispatchEvent(new Event(BALLOT_ZIP_EVENT));
    } else {
      router.push(path);
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
            value={state}
            onChange={(event) => setState(event.target.value)}
            className="mt-1 w-full rounded-md border border-line bg-white px-3 py-2 text-ink"
          >
            <option value="">Select a starter state</option>
            {STATE_CHOICES.map((item) => (
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
        Ballot ZIP lookup stays in this browser. The first three digits select a
        starter state from a table on this page. A 5-digit ZIP is kept in
        session storage for this tab only, not in the page address or sent to a
        third party, and narrows U.S.
        House districts and local contests. It stays until the tab closes. The
        browser loads /zcta/ plus the first three digits and .json from this site,
        then uses the five-digit ZIP as the key for a row in that file. This
        lookup does not write the ZIP into local storage or a cookie, and it does
        not match the ZIP to a voter file. A ballot address that still has #zip=
        is stored and the fragment is removed before advertising or analytics scripts run. The
        Census place search does not store the ZIP. Prefixes map to a starter
        state.
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
