"use client";

import { useState } from "react";
import Link from "next/link";
import { absoluteUrl } from "@/data/site";

export function embedSnippet(): string {
  const src = absoluteUrl("/embed/map");
  return `<iframe src="${src}" title="Map the Midterms" width="640" height="480" style="max-width:100%;border:0"></iframe>`;
}

/** Copy-able iframe. The embedded page itself carries the attribution link. */
export function EmbedSnippet() {
  const snippet = embedSnippet();
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="embed-extra rounded-xl border border-line bg-paper-card p-5">
      <h2 className="font-serif text-xl font-semibold">Embed this map</h2>
      <p className="mt-2 text-sm leading-6 text-ink-muted">
        The frame includes a visible{" "}
        <Link className="font-semibold text-navy underline" href="/">
          Map the Midterms
        </Link>{" "}
        attribution link. Leave that link in place.
      </p>
      <pre className="mt-3 overflow-x-auto rounded-md bg-paper-tint p-3 text-xs leading-5">{snippet}</pre>
      <button
        type="button"
        onClick={() => void copy()}
        className="mt-3 rounded-md border border-line bg-white px-3 py-1.5 text-sm font-medium text-navy hover:bg-navy-wash"
      >
        {copied ? "Snippet copied" : "Copy embed code"}
      </button>
    </div>
  );
}
