import { cycleHubMerged } from "@/lib/cycleRedirects";
import { SITE } from "@/data/site";
import {
  RACES_2026,
  UNCALLED_2026,
  WINNERS_2026,
  WINNERS_FETCHED_AT,
  etDate,
  statusLine,
  winnerOf,
} from "@/data/winners2026";

/**
 * Text from /results/ and /results/2026/, both of which had impressions.
 * Winner names and call status are the lines those pages already showed.
 */
export function Cycle2026Hub() {
  if (!cycleHubMerged()) return null;
  const states = [...new Set(RACES_2026.map((race) => race.stateName))].sort();
  const count = (office: string) => WINNERS_2026.filter((race) => race.office === office).length;
  const total = (office: string) => RACES_2026.filter((race) => race.office === office).length;

  return (
    <section id="cycle-2026" aria-labelledby="cycle-2026-hub" className="space-y-6 text-sm leading-6">
      <h2 id="cycle-2026-hub" className="font-serif text-2xl font-semibold">
        How the 2026 races were called
      </h2>
      <p>
        Every 2026 Senate, governor and House race. Winners are shown only for races the Associated Press has called.
        Other races are marked not yet called and link to the state election office. Vote counts are unofficial until
        certified. AP data last read {etDate(WINNERS_FETCHED_AT)}. {SITE.name} does not call a race and does not certify
        outcomes.
      </p>
      <ul className="grid gap-2 sm:grid-cols-3">
        {(["Senate", "Governor", "House"] as const).map((office) => (
          <li key={office} className="rounded-xl border border-line p-3">
            <strong>{office}:</strong> {count(office)} of {total(office)} races called by AP
          </li>
        ))}
      </ul>
      <div>
        <h3 className="font-serif text-xl font-semibold">How the results hub described election night</h3>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>Nothing was shown for a state until its polls had closed.</li>
          <li>Vote totals were copied from that state&apos;s election-office file when the file published them.</li>
          <li>This site does not call a race.</li>
          <li>Certification is done by the state or county election office, not by this site.</li>
        </ul>
        <p className="mt-2">
          The per-race results pages for the tracked contests were awaiting unofficial returns. Those pages did not
          invent vote totals. Vote.gov is the federal voting portal. It is not a results feed.
        </p>
      </div>
      {UNCALLED_2026.length ? (
        <div>
          <h3 className="font-serif text-xl font-semibold">Not yet called ({UNCALLED_2026.length})</h3>
          <ul className="mt-2 list-disc pl-5">
            {UNCALLED_2026.map((race) => (
              <li key={race.slug}>
                {race.label}: {statusLine(race)} ·{" "}
                <a className="text-navy underline" href={race.official.href} rel="noopener noreferrer">
                  {race.official.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      {states.map((name) => (
        <div key={name}>
          <h3 className="font-serif text-xl font-semibold">{name}</h3>
          <ul className="mt-1 list-disc pl-5">
            {RACES_2026.filter((race) => race.stateName === name).map((race) => (
              <li key={race.slug}>
                {race.label}: {winnerOf(race)?.name ?? statusLine(race)} ·{" "}
                <a className="text-navy underline" href={race.official.href} rel="noopener noreferrer">
                  {race.official.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div className="space-y-3">
        <h3 className="font-serif text-xl font-semibold">Questions the winners index answered</h3>
        <p>
          <strong>Who won the 2026 midterms?</strong> This list covers every 2026 Senate, House and governor race. Races
          the Associated Press has called show the winner. Races AP has not called are marked not yet called, with a
          link to the state election office. Vote counts on the state pages stay unofficial until a state certifies them.
        </p>
        <p>
          <strong>Who controls the House after the 2026 midterms?</strong> A House majority is 218 of 435 seats. The
          seat math is on the House majority explainer. The House lines above are the AP calls.
        </p>
        <p>
          <strong>Who controls the Senate after the 2026 midterms?</strong> Senate control depends on the 100 seats and
          any vacancies. The rules are on the Senate majority explainer. The Senate lines above are the AP calls.
        </p>
        <p>
          <strong>Are these certified results?</strong> No. Map the Midterms reports Associated Press race calls and
          unofficial vote counts. Each state election office publishes its own returns after certification.
        </p>
      </div>
    </section>
  );
}
