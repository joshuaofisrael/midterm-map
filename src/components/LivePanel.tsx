import Link from "next/link";
import { LiveResults, type LiveSource } from "@/components/LiveResults";
import raceLinks from "@/data/ballotpedia/race-links.json";
import liveSources from "@/data/live-sources.json";
import { pollCloseFor } from "@/data/pollClose";

interface CatalogState {
  code: string;
  name: string;
  office: string;
  resultsUrl: string;
  resultsLabel: string;
  machineReadable: boolean;
}

export function liveSourceRows(stateCode?: string, raceSlugs?: string[]): LiveSource[] {
  return (liveSources.states as CatalogState[])
    .filter((source) => {
      if (stateCode && source.code !== stateCode) return false;
      if (raceSlugs && !stateCode) {
        return raceSlugs.some((slug) => slug.toLowerCase().startsWith(`${source.code.toLowerCase()}-`));
      }
      return true;
    })
    .map((source) => {
      const close = pollCloseFor(source.code);
      return {
        code: source.code,
        name: source.name,
        office: source.office,
        resultsUrl: source.resultsUrl,
        resultsLabel: source.resultsLabel,
        machineReadable: source.machineReadable,
        closeLabel: close?.closeLabel ?? "",
        citation: close?.citation ?? "",
        allPollsClosedAt: close?.allPollsClosedAt ?? "",
      };
    });
}

/** Compact panel for race, results, and state ballot pages. */
export function LivePanel({
  stateCode,
  raceSlugs,
}: {
  stateCode?: string;
  raceSlugs?: string[];
}) {
  return (
    <section aria-labelledby="live-results-heading">
      <h2 id="live-results-heading" className="font-serif text-2xl font-semibold">
        Election night figures
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-muted">
        Vote totals appear here after polls close in this state. They are copied from the state
        election office file. A winner is labeled only when that file marks the race decided or
        certified.{" "}
        <Link className="font-medium text-navy underline" href="/live">
          All states
        </Link>
      </p>
      <div className="mt-4">
        <LiveResults
          sources={liveSourceRows(stateCode, raceSlugs)}
          raceSlugs={raceSlugs}
          ballotpediaBySlug={raceLinks}
        />
      </div>
    </section>
  );
}
