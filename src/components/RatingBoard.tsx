import Link from "next/link";
import { ratingBoard } from "@/data/polls";
import { ratingTone } from "@/lib/format";
import { DemoBadge } from "./DemoBadge";

export function RatingBoard() {
  const columns = ratingBoard();

  return (
    <section>
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-serif text-2xl font-semibold">Race ratings board</h2>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-ink-muted">
            Illustrative / editorial demo placements for layout and SEO structure.
            These are not a live forecast and are not labeled as a house rating product.
          </p>
        </div>
        <DemoBadge>Editorial demo</DemoBadge>
      </div>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {columns.map((column) => (
          <div key={column.tier} className="rounded-xl border border-line bg-paper-card p-3">
            <div className={`mb-3 inline-flex rounded-full border px-2.5 py-0.5 text-xs font-semibold ${ratingTone(column.tier)}`}>
              {column.tier}
            </div>
            <ul className="space-y-2">
              {column.races.length === 0 && (
                <li className="text-sm text-ink-soft">No demo races in this column.</li>
              )}
              {column.races.map((race) => (
                <li key={race.slug}>
                  <Link className="text-sm font-medium text-navy hover:underline" href={`/races/${race.slug}`}>
                    {race.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
