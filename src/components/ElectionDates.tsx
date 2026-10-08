"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  DATES_CHECKED_ON,
  DEADLINE_CATEGORY_LABEL,
  MARKER_NOTE,
  stateKeyDatesHref,
  votingDeadlinesStateHref,
  type DeadlineFact,
  type OmittedDeadline,
  type StateElectionDates,
} from "@/data/electionDates";
import type { StateProfile } from "@/data/types";

type Timing = "upcoming" | "today" | "in-progress" | "passed";

function localISODate(date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function timingFor(fact: Pick<DeadlineFact, "startsOn" | "endsOn">, today: string): Timing | null {
  const { startsOn, endsOn } = fact;
  if (endsOn) {
    if (today > endsOn) return "passed";
    if (startsOn && today < startsOn) return "upcoming";
    if (startsOn && today >= startsOn && today <= endsOn) return "in-progress";
    if (today === endsOn) return "today";
    return "upcoming";
  }
  if (startsOn && today < startsOn) return "upcoming";
  return null;
}

const TIMING_LABEL: Record<Timing, string> = {
  upcoming: "Upcoming",
  today: "Deadline today",
  "in-progress": "In progress",
  passed: "Passed",
};

function timingClass(timing: Timing): string {
  if (timing === "passed") return "bg-paper-tint text-ink-muted";
  if (timing === "in-progress" || timing === "today") return "bg-navy text-white";
  return "bg-navy-soft text-navy-deep";
}

function DateStatus({ fact }: { fact: DeadlineFact }) {
  const [timing, setTiming] = useState<Timing | null>(null);

  useEffect(() => {
    setTiming(timingFor(fact, localISODate()));
  }, [fact]);

  if (!timing) return null;
  return (
    <span className={`inline-block rounded px-2 py-0.5 text-xs font-semibold ${timingClass(timing)}`}>
      {TIMING_LABEL[timing]}
    </span>
  );
}

function SourceLinks({ fact }: { fact: DeadlineFact }) {
  return (
    <p className="mt-1 text-xs leading-5 text-ink-soft">
      Source{fact.sources.length > 1 ? "s" : ""}:{" "}
      {fact.sources.map((source, index) => (
        <span key={source.href}>
          {index > 0 ? "; " : ""}
          <a className="text-navy underline" href={source.href} rel="noopener noreferrer">
            {source.label}
          </a>
        </span>
      ))}
    </p>
  );
}

function FactBlock({ fact }: { fact: DeadlineFact }) {
  const [passed, setPassed] = useState(false);

  useEffect(() => {
    setPassed(timingFor(fact, localISODate()) === "passed");
  }, [fact]);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="text-sm font-semibold">{fact.label}</h3>
        <DateStatus fact={fact} />
      </div>
      <p className="mt-1 text-sm leading-6 text-ink-muted">{fact.text}</p>
      {passed && fact.ifPassed && (
        <p className="mt-1 text-sm leading-6 text-ink">{fact.ifPassed}</p>
      )}
      <SourceLinks fact={fact} />
    </div>
  );
}

export function KeyDatesSection({
  state,
  dates,
}: {
  state: StateProfile;
  dates: StateElectionDates;
}) {
  return (
    <section id="key-dates" className="scroll-mt-24 rounded-xl border border-line bg-paper-card p-5">
      <h2 className="font-serif text-2xl font-semibold">Key 2026 general election dates</h2>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-ink-muted">
        Dates below are paraphrased from the official pages linked on each line and were
        last checked against those pages on {DATES_CHECKED_ON}. They can change.{" "}
        {state.officialElectionOffice.label} publishes the current calendar. County voting hours
        vary. {MARKER_NOTE}
      </p>
      <div className="mt-5 space-y-5">
        {dates.facts.map((fact) => (
          <FactBlock key={fact.id} fact={fact} />
        ))}
        {dates.omitted.map((item) => (
          <OmittedBlock key={`${item.category}-${item.label}`} item={item} />
        ))}
      </div>
      <p className="mt-5 text-sm">
        <Link className="font-medium text-navy hover:underline" href={votingDeadlinesStateHref(state.code)}>
          Compare with other states
        </Link>
        {" · "}
        <a
          className="font-medium text-navy hover:underline"
          href={state.officialElectionOffice.href}
          rel="noopener noreferrer"
        >
          {state.officialElectionOffice.label}
        </a>
      </p>
    </section>
  );
}

function OmittedBlock({ item }: { item: OmittedDeadline }) {
  return (
    <div>
      <h3 className="text-sm font-semibold">{item.label}</h3>
      <p className="mt-1 text-sm leading-6 text-ink-muted">{item.text}</p>
    </div>
  );
}

function Cell({
  facts,
  omitted,
}: {
  facts: DeadlineFact[];
  omitted: OmittedDeadline[];
}) {
  if (facts.length === 0 && omitted.length === 0) {
    return <p className="text-sm text-ink-muted">Not listed.</p>;
  }
  return (
    <div className="space-y-3">
      {facts.map((fact) => (
        <FactBlock key={fact.id} fact={fact} />
      ))}
      {omitted.map((item) => (
        <OmittedBlock key={`${item.category}-${item.label}`} item={item} />
      ))}
    </div>
  );
}

export function VotingDeadlinesTable({
  rows,
}: {
  rows: { state: StateProfile; dates: StateElectionDates }[];
}) {
  const categories = ["registration", "early", "mail-request", "mail-return"] as const;

  return (
    <div className="overflow-x-auto rounded-xl border border-line">
      <table className="min-w-[960px] w-full border-collapse text-left">
        <caption className="sr-only">
          2026 general election registration, early voting, and mail-ballot dates for 12 states
        </caption>
        <thead className="bg-paper-tint">
          <tr>
            <th scope="col" className="sticky left-0 bg-paper-tint px-3 py-3 text-sm font-semibold">
              State
            </th>
            {categories.map((category) => (
              <th key={category} scope="col" className="min-w-[16rem] px-3 py-3 text-sm font-semibold">
                {DEADLINE_CATEGORY_LABEL[category]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(({ state, dates }) => (
            <tr id={state.code} key={state.code} className="scroll-mt-24 border-t border-line align-top">
              <th scope="row" className="sticky left-0 bg-paper-card px-3 py-4 text-sm font-semibold">
                <Link className="text-navy hover:underline" href={stateKeyDatesHref(state.code)}>
                  {state.name}
                </Link>
              </th>
              {categories.map((category) => (
                <td key={category} className="px-3 py-4">
                  <Cell
                    facts={dates.facts.filter((fact) => fact.category === category)}
                    omitted={dates.omitted.filter((item) => item.category === category)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
