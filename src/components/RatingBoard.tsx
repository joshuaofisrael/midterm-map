import Link from "next/link";
import { ratingBoard } from "@/data/polls";
import { ratingTone } from "@/lib/format";

export function RatingBoard() {
  const columns = ratingBoard();

  return (
    <section>
      <div className="mb-4">
        <h2 className="font-serif text-2xl font-semibold">Attributed race ratings</h2>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-ink-muted">
          Placements appear only when a named outlet (Cook Political Report, Inside Elections,
          Sabato’s Crystal Ball, or Decision Desk HQ) has published a rating we can link.
          They are not Map the Midterms forecasts.
        </p>
      </div>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {columns.map((column) => (
          <div key={column.tier} className="rounded-xl border border-line bg-paper-card p-3">
            <div className={`mb-3 inline-flex rounded-full border px-2.5 py-0.5 text-xs font-semibold ${ratingTone(column.tier)}`}>
              {column.tier}
            </div>
            <ul className="space-y-2">
              {column.races.map((race) => {
                const match = race.ratings.find((rating) => rating.tier === column.tier);
                return (
                  <li key={`${race.slug}-${column.tier}`}>
                    <Link className="text-sm font-medium text-navy hover:underline" href={`/races/${race.slug}`}>
                      {race.shortTitle}
                    </Link>
                    {match && (
                      <p className="text-xs text-ink-muted">
                        {match.outlet} · {match.asOf}
                      </p>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
