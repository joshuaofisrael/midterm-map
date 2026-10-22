import { electionDatesFor, votingDeadlinesStateHref } from "@/data/electionDates";
import { pollCloseFor } from "@/data/pollClose";
import { isStateCode } from "@/data/states";
import type { StateCode } from "@/data/types";

/** Statewide dates and the stored poll-closing time. Opening times are not invented. */
export function CityVoting({ code, stateName }: { code: string; stateName: string }) {
  const close = pollCloseFor(code);
  const stateCode: StateCode | null = isStateCode(code) ? code : null;
  const dates = stateCode ? electionDatesFor(stateCode) : undefined;

  return (
    <section>
      <h2>Key dates and poll closing time</h2>
      <p>Election Day is Tuesday, November 3, 2026. This page does not project a winner.</p>
      {close ? (
        <>
          <h3>Poll closing time</h3>
          <p>
            Statewide closing time on November 3, 2026: {close.closeLabel}. {close.note} Citation:{" "}
            {close.citation}. This file does not store a separate opening time. Local hours are on
            the official election-office pages linked below.
          </p>
        </>
      ) : (
        <p>No statewide poll-closing time is stored for {stateName}.</p>
      )}
      {dates && dates.facts.length > 0 ? (
        <>
          <h3>Key dates</h3>
          <p>
            Statewide lines for {stateName}, checked {dates.checkedOn}. County hours can differ.
          </p>
          <ul>
            {dates.facts.map((fact) => (
              <li key={fact.id}>
                <strong>{fact.label}.</strong> {fact.text}{" "}
                {fact.sources.map((source, index) => (
                  <span key={source.href}>
                    {index > 0 ? " · " : null}
                    <a href={source.href} rel="noopener noreferrer">
                      {source.label}
                    </a>
                  </span>
                ))}
              </li>
            ))}
          </ul>
          <p>
            <a href={stateCode ? votingDeadlinesStateHref(stateCode) : "/voting-deadlines"}>Full {stateName} date table</a>
          </p>
        </>
      ) : dates ? (
        <p>
          {dates.faqAnswer}{" "}
          <a href={stateCode ? votingDeadlinesStateHref(stateCode) : "/voting-deadlines"}>Date table for {stateName}</a>
        </p>
      ) : (
        <p>
          The statewide date table on this site does not include {stateName}. The election office
          linked below publishes the calendar.
        </p>
      )}
    </section>
  );
}
