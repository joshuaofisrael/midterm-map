"use client";

import { useState } from "react";

export function ShareLink({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  async function share() {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2000);
      } catch {
        setCopied(false);
      }
    }
  }

  return (
    <button
      type="button"
      onClick={share}
      className="rounded-md border border-line bg-white px-3 py-1.5 text-sm font-medium text-navy hover:bg-navy-wash"
    >
      {copied ? "Link copied" : "Copy or share link"}
    </button>
  );
}
