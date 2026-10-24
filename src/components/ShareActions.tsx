"use client";

import { useEffect, useState } from "react";

/** Copy-link and the browser's own share sheet. No third-party script. */
export function ShareActions({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    setCanShare(typeof navigator !== "undefined" && typeof navigator.share === "function");
  }, []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  async function nativeShare() {
    try {
      await navigator.share({ title, url });
    } catch {
      /* dismissed */
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => void copy()}
        className="rounded-md border border-line bg-white px-3 py-1.5 text-sm font-medium text-navy hover:bg-navy-wash"
      >
        {copied ? "Link copied" : "Copy link"}
      </button>
      {canShare ? (
        <button
          type="button"
          onClick={() => void nativeShare()}
          className="rounded-md border border-line bg-white px-3 py-1.5 text-sm font-medium text-navy hover:bg-navy-wash"
        >
          Share
        </button>
      ) : null}
    </>
  );
}
