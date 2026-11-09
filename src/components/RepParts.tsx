import Link from "next/link";
import {
  REP_SOURCES, SENATE_LIST_URL, HOUSE_FIND_URL, bioguideUrl, electLine, raceFor, type RepState,
} from "@/data/representatives2026";
import { winnerOf } from "@/data/winners2026";

const a = "font-medium text-navy underline";

export function SenateTable({ state }: { state: RepState }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-line">
            <th className="py-2">Seat</th><th>Senator now (119th Congress)</th><th>2026 election</th>
          </tr>
        </thead>
        <tbody>
          {state.senate.map((seat) => {
            const race = raceFor(seat.race);
            const win = race ? winnerOf(race) : undefined;
            return (
              <tr key={seat.current.bioguide} className="border-b border-line align-top">
                <td className="py-2">Class {seat.current.class}</td>
                <td className="py-2">
                  {seat.current.website ? (
                    <a className={a} href={seat.current.website} rel="noopener noreferrer">{seat.current.name}</a>
                  ) : seat.current.name}{" "}
                  ({seat.current.party})
                  {seat.current.phone ? <span className="block text-ink-muted">{seat.current.phone}</span> : null}
                </td>
                <td className="py-2">
                  {race ? (
                    <>
                      <Link className={a} href={`/results/2026/${race.slug}`}>{electLine(race)}</Link>
                      {win ? " won" : ""}
                      {win && race.special ? " (special election; takes office once the result is certified)" : ""}
                      {win && !race.special ? " (term from January 3, 2027)" : ""}
                    </>
                  ) : (
                    "Seat not on the 2026 ballot"
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export function RepSources() {
  return (
    <section className="text-sm leading-6">
      <h2 className="font-serif text-xl font-semibold">Sources</h2>
      <ul className="mt-2 list-disc pl-5">
        <li>
          Current senators: <a className={a} href={SENATE_LIST_URL} rel="noopener noreferrer">U.S. Senate</a> contact
          list (<a className={a} href={REP_SOURCES.senate.url} rel="noopener noreferrer">senators_cfm.xml</a>), updated{" "}
          {new Date(REP_SOURCES.senate.updated).toLocaleDateString("en-US", { timeZone: "America/New_York", dateStyle: "long" })}.
        </li>
        <li>
          Current House members: Office of the Clerk, U.S. House of Representatives (
          <a className={a} href={REP_SOURCES.house.url} rel="noopener noreferrer">MemberData.xml</a>), published{" "}
          {REP_SOURCES.house.updated}. Official finder:{" "}
          <a className={a} href={HOUSE_FIND_URL} rel="noopener noreferrer">house.gov Find Your Representative</a>.
        </li>
        <li>2026 winners: Associated Press race calls, via the Guardian&apos;s published AP results data. Unofficial until each state certifies.</li>
        <li>
          District boundaries: U.S. Census Bureau 120th Congress districts. Alabama, California, Florida, Louisiana, North
          Carolina, Ohio, Tennessee, Texas and Utah drew new lines for 2026.
        </li>
      </ul>
    </section>
  );
}

export const bio = (id: string) => bioguideUrl(id);
