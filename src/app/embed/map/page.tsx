import type { Metadata } from "next";
import Link from "next/link";
import { EmbedSnippet } from "@/components/EmbedSnippet";
import { HouseAd } from "@/components/HouseAd";
import { ShareBar } from "@/components/ShareBar";
import { StateMap } from "@/components/StateMap";
import { SITE } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Embeddable map",
  description: `Embeddable map of ${SITE.name} state hubs for November 3, 2026. Not an official election website.`,
  path: "/embed/map",
});

export default function EmbedMapPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-4 py-4">
      <script
        dangerouslySetInnerHTML={{
          __html: "try{if(window.top!==window.self)document.documentElement.classList.add('is-embed')}catch(e){}",
        }}
      />
      <StateMap />
      <p className="mt-3 text-sm leading-6">
        <Link className="font-semibold text-navy underline" href="/" target="_top">
          Map the Midterms
        </Link>
        <span className="text-ink-muted">
          {" "}
          — November 3, 2026 voter information. Not an official election website.
        </span>
      </p>
      <div className="embed-extra mt-6 space-y-4">
        <HouseAd path="/embed/map" />
        <ShareBar path="/embed/map" title="Map the Midterms" />
        <EmbedSnippet />
      </div>
    </div>
  );
}
