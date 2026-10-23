import Link from "next/link";
import { SourceLines } from "@/components/SourceLines";
import type { RaceGuide } from "@/data/types";
import { indexableRaceHref } from "@/data/results";
import { getState } from "@/data/states";
import { chamberLabel, ratingTone } from "@/lib/format";

export function RaceCard({ race, compact = false }: { race: RaceGuide; compact?: boolean }) {
  const state = getState(race.state);
  const primaryRating = race.ratings[0];
  const resultsHref = indexableRaceHref(race.slug);
  const resultsReady = resultsHref.startsWith("/results/");

  return (
    <article className="flex h-full flex-col rounded-xl border border-line border-t-4 border-t-navy bg-paper-card p-5 shadow-card">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-navy">
          {chamberLabel(race.chamber)}
        </span>
        <span className="text-ink-soft">·</span>
        <Link className="text-xs font-semibold uppercase tracking-wide text-ink-muted hover:text-navy" href={`/states/${race.state}`}>
          {state?.name ?? race.state}
        </Link>
      </div>
      <h3 className="mt-3 font-serif text-xl font-semibold leading-snug">
        <Link className="hover:text-navy" href={`/races/${race.slug}`}>
          {compact ? race.shortTitle : race.title}
        </Link>
      </h3>
      {!compact && (
        <>
          <p className="mt-2 line-clamp-3 text-sm leading-6 text-ink-muted">{race.overview}</p>
          <SourceLines sources={race.sources} />
        </>
      )}
      {primaryRating && (
        <div className="mt-4">
          <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${ratingTone(primaryRating.tier)}`}>
            {primaryRating.outlet}: {primaryRating.tier}
          </span>
        </div>
      )}
      {race.candidates.length > 0 ? (
        <ul className="mt-3 space-y-2 text-sm text-ink-muted">
          {race.candidates.map((candidate) => (
            <li key={candidate.name}>
              <span className="font-medium text-ink">{candidate.name}</span>
              <SourceLines sources={candidate.sources} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 text-sm text-ink-muted">See official candidate list</p>
      )}
      <div className="mt-auto flex flex-wrap gap-x-4 gap-y-2 pt-4 text-sm">
        <Link className="font-medium text-navy hover:underline" href={`/races/${race.slug}`}>
          Race guide
        </Link>
        <Link className="text-ink-muted hover:text-navy hover:underline" href={`/polls#${race.slug}`}>
          Polls
        </Link>
        {resultsReady && (
          <Link className="text-ink-muted hover:text-navy hover:underline" href={resultsHref}>
            Results
          </Link>
        )}
        <Link className="text-ink-muted hover:text-navy hover:underline" href={`/ballot/${race.state}`}>
          Sample ballot
        </Link>
      </div>
    </article>
  );
}
