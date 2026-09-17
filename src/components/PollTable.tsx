import Link from "next/link";
import type { PollRow } from "@/data/types";
import { getRace } from "@/data/races";
import { DemoBadge } from "./DemoBadge";

export function PollTable({
  rows,
  caption,
  showRace = true,
}: {
  rows: PollRow[];
  caption: string;
  showRace?: boolean;
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-line bg-paper-card">
      <table className="min-w-full text-left text-sm">
        <caption className="border-b border-line px-4 py-3 text-left text-sm text-ink-muted">
          <span className="mr-2 font-medium text-ink">{caption}</span>
          <DemoBadge>Demo poll rows</DemoBadge>
        </caption>
        <thead className="bg-paper-tint text-xs uppercase tracking-wide text-ink-muted">
          <tr>
            {showRace && <th className="px-4 py-2 font-semibold">Race</th>}
            <th className="px-4 py-2 font-semibold">Pollster</th>
            <th className="px-4 py-2 font-semibold">Dates</th>
            <th className="px-4 py-2 font-semibold">Sample</th>
            <th className="px-4 py-2 font-semibold">Dem</th>
            <th className="px-4 py-2 font-semibold">Rep</th>
            <th className="px-4 py-2 font-semibold">Spread</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const race = getRace(row.raceSlug);
            return (
              <tr key={row.slug} className="border-t border-line/80">
                {showRace && (
                  <td className="px-4 py-2.5">
                    {race ? (
                      <Link className="font-medium text-navy hover:underline" href={`/races/${race.slug}`}>
                        {race.shortTitle}
                      </Link>
                    ) : (
                      row.raceSlug
                    )}
                  </td>
                )}
                <td className="px-4 py-2.5">
                  {row.pollster}
                  <div className="text-xs text-demo">{row.note}</div>
                </td>
                <td className="px-4 py-2.5 whitespace-nowrap">{row.dates}</td>
                <td className="px-4 py-2.5">{row.sample}</td>
                <td className="px-4 py-2.5 tabular-nums">{row.dem ?? "—"}</td>
                <td className="px-4 py-2.5 tabular-nums">{row.rep ?? "—"}</td>
                <td className="px-4 py-2.5 font-medium">{row.spread}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
