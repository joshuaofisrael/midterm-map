import Link from "next/link";
import type { Citation, PollRow } from "@/data/types";
import { getRace } from "@/data/races";

function NameListLink({ source }: { source?: Citation }) {
  if (!source) return null;
  return (
    <a
      className="mt-0.5 block text-[11px] font-normal normal-case tracking-normal text-navy hover:underline"
      href={source.url}
      rel="noopener noreferrer"
    >
      Official list
    </a>
  );
}

export function PollTable({
  rows,
  caption,
  showRace = true,
}: {
  rows: PollRow[];
  caption: string;
  showRace?: boolean;
}) {
  if (rows.length === 0) return null;

  return (
    <div className="overflow-x-auto rounded-xl border border-line bg-paper-card">
      <table className="min-w-full text-left text-sm">
        <caption className="border-b border-line px-4 py-3 text-left text-sm text-ink-muted">
          <span className="font-medium text-ink">{caption}</span>
          <span className="mt-1 block text-xs">
            Individual published surveys. Not a Map the Midterms average and not a prediction.
          </span>
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
              <tr key={row.slug} className="border-t border-line/80" id={showRace ? row.raceSlug : undefined}>
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
                  <a className="font-medium text-navy hover:underline" href={row.source.url} rel="noopener noreferrer">
                    {row.pollster}
                  </a>
                  <div className="text-xs text-ink-muted">
                    {row.source.name}
                    {row.source.accessed ? ` · accessed ${row.source.accessed}` : ""}
                  </div>
                </td>
                <td className="px-4 py-2.5 whitespace-nowrap">{row.dates}</td>
                <td className="px-4 py-2.5">
                  {row.sample}
                  {row.moe ? ` · ${row.moe}` : ""}
                </td>
                <td className="px-4 py-2.5 tabular-nums">
                  {row.dem ?? "—"}
                  {row.demLabel ? (
                    <span className="block text-xs text-ink-soft">
                      {row.demLabel}
                      <NameListLink source={row.nameSource} />
                    </span>
                  ) : null}
                </td>
                <td className="px-4 py-2.5 tabular-nums">
                  {row.rep ?? "—"}
                  {row.repLabel ? (
                    <span className="block text-xs text-ink-soft">
                      {row.repLabel}
                      <NameListLink source={row.nameSource} />
                    </span>
                  ) : null}
                </td>
                <td className="px-4 py-2.5 font-medium">{row.spread}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
