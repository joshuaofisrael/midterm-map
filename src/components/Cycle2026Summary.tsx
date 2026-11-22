import { CERT_DEADLINES_2026, CERTIFIED_2026, longDate } from "@/data/certification2026";
import { racesForState as guidesForState } from "@/data/races";
import { resultShellForRace } from "@/data/results";
import { getState } from "@/data/states";
import {
  etDate,
  racesForState as winnerRacesForState,
  statusLine,
  winnerOf,
} from "@/data/winners2026";
import {
  mergedRaceShellSlugs,
  mergedStateResultCodes,
  mergedWinnerSlugs,
  stateHasCycle2026,
} from "@/lib/cycleRedirects";
import { liveSourceRows } from "@/components/LivePanel";

/**
 * 2026 count text moved off redirected results URLs that had Search Console impressions.
 * Figures are the ones those pages already rendered. Nothing here is estimated.
 */
export function Cycle2026Summary({ code }: { code: string }) {
  const upper = code.toUpperCase();
  if (!stateHasCycle2026(upper)) return null;
  const state = getState(upper);
  if (!state) return null;
  const official = liveSourceRows(state.code)[0];
  const winners = winnerRacesForState(state.code).filter((race) => mergedWinnerSlugs().has(race.slug));
  const shells = guidesForState(state.code).filter((race) => mergedRaceShellSlugs().has(race.slug));
  const stateNote = mergedStateResultCodes().has(state.code);

  return (
    <section id="cycle-2026" aria-labelledby="cycle-2026-heading" className="space-y-6 text-sm leading-6">
      <h2 id="cycle-2026-heading" className="font-serif text-xl font-semibold">
        How the 2026 election went in {state.name}
      </h2>
      {stateNote ? (
        <div className="space-y-2">
          <p>
            The {state.name} results page for the November 3, 2026 general election did not print vote totals.
            {official?.closeLabel ? ` Polls closed at ${official.closeLabel}.` : ""} {state.timezoneNote}
          </p>
          {official ? (
            <p>
              Official results site:{" "}
              <a className="font-medium text-navy underline" href={official.resultsUrl} rel="noopener noreferrer">
                {official.resultsLabel}
              </a>
              .
            </p>
          ) : null}
          <p>Certification is done by election officials in {state.name}. This site does not certify results.</p>
        </div>
      ) : null}
      {winners.map((race) => {
        const win = winnerOf(race);
        const cert = CERTIFIED_2026[race.state];
        const deadline = CERT_DEADLINES_2026[race.state];
        return (
          <article key={race.slug} className="space-y-2">
            <h3 className="font-serif text-lg font-semibold">{race.label}</h3>
            {win ? (
              <p>
                <strong>{win.name}</strong> ({win.party}) won the 2026 {race.label} election with {win.pct}% of the vote,
                according to the Associated Press
                {race.calledAt ? `, which called the race on ${etDate(race.calledAt)}` : ""}.
                {race.flipped ? " The seat changed party." : ""}
              </p>
            ) : (
              <p>
                <strong>{statusLine(race)}.</strong>{" "}
                {race.status === "runoff"
                  ? "The Associated Press reports that no candidate won outright and the race goes to a runoff."
                  : "The Associated Press has not called this race."}{" "}
                Map the Midterms does not name a winner until AP calls the race.
              </p>
            )}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-line">
                    <th className="py-2">Candidate</th>
                    <th>Party</th>
                    <th className="text-right">Votes</th>
                    <th className="text-right">Share</th>
                  </tr>
                </thead>
                <tbody>
                  {race.candidates.map((candidate) => (
                    <tr key={candidate.name} className="border-b border-line">
                      <td className="py-2">
                        {candidate.name}
                        {candidate.winner ? <strong> Winner</strong> : null}
                      </td>
                      <td>{candidate.party}</td>
                      <td className="text-right">{candidate.votes.toLocaleString("en-US")}</td>
                      <td className="text-right">{candidate.pct}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-ink-muted">
              Unofficial vote counts as of {etDate(race.lastUpdated)}
              {race.eevp != null ? `, with about ${Math.round(race.eevp)}% of the expected vote counted` : ""}. Totals can
              change until the state certifies the result.
            </p>
            <p>
              <strong>Certification:</strong>{" "}
              {cert ? (
                <>
                  {race.stateName} certified its 2026 general-election results on {longDate(cert.date)} (
                  <a className="text-navy underline" href={cert.href} rel="noopener noreferrer">
                    {cert.label}
                  </a>
                  ).
                </>
              ) : (
                <>
                  Map the Midterms has not recorded a state certification for this race yet, so these counts are unofficial.
                  {deadline ? (
                    <>
                      {" "}
                      The state certification date is {longDate(deadline.date)} (
                      <a className="text-navy underline" href={deadline.href} rel="noopener noreferrer">
                        {deadline.label}
                      </a>
                      ).
                    </>
                  ) : null}
                </>
              )}
            </p>
            <p>
              Sources: race call and vote counts from the Associated Press, via the Guardian&apos;s published AP results
              data. Official results:{" "}
              <a className="text-navy underline" href={race.official.href} rel="noopener noreferrer">
                {race.official.label}
              </a>
              .
            </p>
          </article>
        );
      })}
      {shells.map((race) => {
        const shell = resultShellForRace(race.slug);
        return (
          <article key={race.slug} className="space-y-2">
            <h3 className="font-serif text-lg font-semibold">{race.title}</h3>
            <p>
              {shell.reportingNote} Vote totals on that results page were blank.
            </p>
            {race.officialResults ? (
              <p>
                Authoritative results:{" "}
                <a className="font-medium text-navy underline" href={race.officialResults.href} rel="noopener noreferrer">
                  {race.officialResults.label}
                </a>
                .
              </p>
            ) : null}
            {race.countingNote ? (
              <p>
                {race.countingNote}{" "}
                {race.countingSource ? (
                  <a className="text-navy underline" href={race.countingSource.href} rel="noopener noreferrer">
                    {race.countingSource.label}
                  </a>
                ) : null}
              </p>
            ) : null}
          </article>
        );
      })}
    </section>
  );
}
