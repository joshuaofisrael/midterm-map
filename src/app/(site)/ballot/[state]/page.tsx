import Link from "next/link";
import { notFound } from "next/navigation";
import { BallotCandidates } from "@/components/BallotCandidates";
import { BallotLookup } from "@/components/BallotLookup";
import { EmailSignup } from "@/components/EmailSignup";
import { MapTheGeneral } from "@/components/MapTheGeneral";
import { ShareBar } from "@/components/ShareBar";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentTrust } from "@/components/ContentTrust";
import { CrossLinks } from "@/components/CrossLinks";
import { OfficialNotice } from "@/components/OfficialNotice";
import { PageHeader } from "@/components/PageHeader";
import { JsonLd } from "@/components/JsonLd";
import { LivePanel } from "@/components/LivePanel";
import { SourceLines, uniqueCitations } from "@/components/SourceLines";
import { StatusChip } from "@/components/StatusChip";
import { ballotCycleFor } from "@/data/ballotCycle";
import { ballotStateFaqs } from "@/data/ballotFaqs";
import { ballotSectionsForState } from "@/data/ballots";
import { electionDatesFor, votingDeadlinesStateHref, type StateElectionDates } from "@/data/electionDates";
import { racesForState } from "@/data/races";
import { stateResultsPath } from "@/data/results";
import { getState, isStateCode, STARTER_STATES } from "@/data/states";
import { contentUpdatedLabel } from "@/lib/contentDate";
import { faqJsonLd } from "@/lib/format";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";
import { ballotOg } from "@/lib/ogCard";
import type { RaceGuide, StateProfile } from "@/data/types";

export function generateStaticParams() {
  return STARTER_STATES.map((state) => ({ state: state.code }));
}

export async function generateMetadata({ params }: { params: Promise<{ state: string }> }) {
  const { state: code } = await params;
  const state = getState(code);
  if (!state) return {};
  const cycle = ballotCycleFor(state.code);
  const card = ballotOg(state.code, state.name);
  return pageMetadata({
    title: cycle ? `${state.name} ballot, November 3, 2026` : `${state.name} 2026 sample ballot structure`,
    description: cycle
      ? `${cycle.shortLead} Dates and measure titles cite official sources. Not an official ballot.`
      : `Structured 2026 sample-ballot sections for ${state.name}, with official ${state.officialElectionOffice.label} and Vote.gov links. Not an official ballot.`,
    path: `/ballot/${state.code}`,
    image: { url: card.url, alt: card.alt },
  });
}

export default async function BallotStatePage({ params }: { params: Promise<{ state: string }> }) {
  const { state: code } = await params;
  if (!isStateCode(code)) notFound();
  const state = getState(code);
  if (!state) notFound();

  const cycle = ballotCycleFor(state.code);
  const races = racesForState(state.code);
  const faqs = ballotStateFaqs(state, races);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Ballot", path: "/ballot" },
    { name: state.name, path: `/ballot/${state.code}` },
  ];

  return (
    <div className="space-y-8">
      <JsonLd data={[breadcrumbJsonLd(crumbs), faqJsonLd(faqs)]} />
      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { href: "/ballot", label: "Ballot" },
          { label: state.name },
        ]}
      />
      <PageHeader
        eyebrow={`${state.name} · Ballot`}
        title={cycle ? `${state.name} ballot, November 3, 2026` : `${state.name} sample ballot structure`}
        lede={
          cycle
            ? cycle.intro
            : "A sectioned sketch of contests that often appear. It is incomplete, may be outdated, and is not a substitute for the sample ballot issued by the county or state election office."
        }
      />
      <ContentTrust
        updated={contentUpdatedLabel(`/ballot/${state.code}`)}
        pagePath={`/ballot/${state.code}`}
        officeHref={state.officialElectionOffice.href}
        officeLabel={state.officialElectionOffice.label}
      />
      <OfficialNotice />
      <ShareBar path={`/ballot/${state.code}`} title={`${state.name} ballot, November 3, 2026`} />
      <MapTheGeneral />
      <BallotCandidates code={state.code} stateName={state.name} />
      <LivePanel stateCode={state.code} />
      <BallotLookup initialState={state.code} />
      {cycle ? (
        <CycleBallot state={state} races={races} />
      ) : (
        <SketchBallot state={state} races={races} />
      )}
      <ResultsLinks state={state} races={races} />
      <section id="faq" className="rounded-xl border border-line bg-paper-card p-5">
        <h2 className="font-serif text-xl font-semibold">Questions readers ask</h2>
        <dl className="mt-5 space-y-5">
          {faqs.map((faq) => (
            <div key={faq.question}>
              <dt className="font-semibold">{faq.question}</dt>
              <dd className="mt-1 text-sm leading-6 text-ink-muted">{faq.answer}</dd>
            </div>
          ))}
        </dl>
      </section>
      <EmailSignup />
      <CrossLinks state={state.code} />
    </div>
  );
}

function CycleBallot({ state, races }: { state: StateProfile; races: RaceGuide[] }) {
  const cycle = ballotCycleFor(state.code);
  if (!cycle) return null;
  const dates = electionDatesFor(state.code);
  const dateGroups = [
    { id: "registration", title: "Voter registration" },
    { id: "early", title: "Early voting" },
    { id: "mail-request", title: "Mail-ballot request" },
    { id: "mail-return", title: "Mail-ballot return" },
  ] as const;

  return (
    <>
      <p className="text-sm leading-6">
        Last checked {cycle.checkedOn}.{" "}
        {cycle.sources.map((source, index) => (
          <span key={source.href}>
            {index > 0 ? " " : null}
            <a className="text-navy underline" href={source.href} rel="noopener noreferrer">
              {source.label}
            </a>
            {index < cycle.sources.length - 1 ? ";" : "."}
          </span>
        ))}
      </p>

      {cycle.federal.length > 0 && (
        <section className="rounded-xl border border-line bg-paper-card p-5">
          <h2 className="font-serif text-2xl font-semibold">Federal offices</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-6">
            {cycle.federal.map((office) => (
              <li key={office}>{office}</li>
            ))}
          </ul>
        </section>
      )}

      <section className="rounded-xl border border-line bg-paper-card p-5">
        <h2 className="font-serif text-2xl font-semibold">Statewide offices</h2>
        {cycle.statewide.length > 0 ? (
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-6">
            {cycle.statewide.map((office) => (
              <li key={office}>{office}</li>
            ))}
          </ul>
        ) : null}
        <p className="mt-3 text-sm leading-6 text-ink-muted">{cycle.districtNote}</p>
      </section>

      <section className="rounded-xl border border-line bg-paper-card p-5">
        <h2 className="font-serif text-2xl font-semibold">Statewide ballot measures</h2>
        {cycle.measures.length > 0 ? (
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6">
            {cycle.measures.map((measure) => (
              <li key={measure}>{measure}</li>
            ))}
          </ul>
        ) : null}
        <p className="mt-3 text-sm leading-6 text-ink-muted">{cycle.measureNote}</p>
      </section>

      <section className="rounded-xl border border-line bg-paper-card p-5">
        <h2 className="font-serif text-2xl font-semibold">Key dates</h2>
        <p className="mt-2 text-sm leading-6 text-ink-muted">
          Dates below are the sentences stored from the official calendar. Checked {dates.checkedOn}.
        </p>
        <div className="mt-4 space-y-5">
          {dateGroups.map((group) => (
            <DateGroup key={group.id} title={group.title} dates={dates} category={group.id} />
          ))}
        </div>
        <p className="mt-4 text-sm">
          <Link className="text-navy underline" href={votingDeadlinesStateHref(state.code)}>
            All stored {state.name} dates
          </Link>
        </p>
      </section>

      {races.length > 0 && (
        <section>
          <h2 className="font-serif text-xl font-semibold">Race guides for {state.name}</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {races.map((race) => (
              <li key={race.slug}>
                <Link className="text-navy hover:underline" href={`/races/${race.slug}`}>
                  {race.shortTitle}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}

function DateGroup({
  title,
  dates,
  category,
}: {
  title: string;
  dates: StateElectionDates;
  category: StateElectionDates["facts"][number]["category"];
}) {
  const facts = dates.facts.filter((fact) => fact.category === category);
  const omitted = dates.omitted.filter((row) => row.category === category);
  if (facts.length === 0 && omitted.length === 0) return null;
  return (
    <div>
      <h3 className="font-semibold">{title}</h3>
      <ul className="mt-2 space-y-3 text-sm leading-6">
        {facts.map((fact) => (
          <li key={fact.id}>
            <p>{fact.text}</p>
            <p className="mt-1 text-xs text-ink-soft">
              {fact.sources.map((source, index) => (
                <span key={source.href}>
                  {index > 0 ? "; " : ""}
                  <a className="text-navy underline" href={source.href} rel="noopener noreferrer">
                    {source.label}
                  </a>
                </span>
              ))}
            </p>
          </li>
        ))}
        {omitted.map((row) => (
          <li key={row.label}>{row.text}</li>
        ))}
      </ul>
    </div>
  );
}

function SketchBallot({ state, races }: { state: StateProfile; races: RaceGuide[] }) {
  const sections = ballotSectionsForState(state.code);

  return (
    <>
      <aside className="rounded-xl border border-line bg-paper-card p-5">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="font-serif text-xl font-semibold">Verify with officials</h2>
          <StatusChip tone="neutral">Not your official ballot</StatusChip>
        </div>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-6">
          <li>
            State election office:{" "}
            <a className="text-navy underline" href={state.officialElectionOffice.href} rel="noopener noreferrer">
              {state.officialElectionOffice.label}
            </a>
          </li>
          {state.sampleBallotOfficial && (
            <li>
              Official sample-ballot starting point:{" "}
              <a className="text-navy underline" href={state.sampleBallotOfficial.href} rel="noopener noreferrer">
                {state.sampleBallotOfficial.label}
              </a>
            </li>
          )}
          <li>
            <a className="text-navy underline" href={state.voteGov.href} rel="noopener noreferrer">
              {state.voteGov.label}
            </a>
          </li>
          <li>
            <Link className="text-navy underline" href={votingDeadlinesStateHref(state.code)}>
              Key 2026 dates for {state.name}
            </Link>
          </li>
          <li>
            Independent encyclopedia:{" "}
            <a className="text-navy underline" href={state.ballotpedia.href} rel="noopener noreferrer">
              {state.ballotpedia.label}
            </a>
          </li>
          <li>{state.registrationNote}</li>
          <li>{state.idNote}</li>
        </ul>
      </aside>
      <div className="space-y-6">
        {sections.map((section) => (
          <section key={section.kind} className="rounded-xl border border-line bg-paper-card p-5">
            <h2 className="font-serif text-2xl font-semibold">{section.title}</h2>
            <p className="mt-2 text-sm leading-6 text-ink-muted">{section.intro}</p>
            <div className="mt-4 space-y-4">
              {section.contests.map((contest) => (
                <div key={contest.id} className="border-t border-line pt-4">
                  <h3 className="font-semibold">{contest.heading}</h3>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6">
                    {contest.lines.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                  {contest.raceSlug &&
                    contest.lines.some((line) => /nominee|Names on the/i.test(line)) && (
                      <SourceLines
                        sources={uniqueCitations(
                          (races.find((race) => race.slug === contest.raceSlug)?.candidates ?? []).flatMap(
                            (candidate) => candidate.sources,
                          ),
                        )}
                      />
                    )}
                  {contest.raceSlug && (
                    <p className="mt-2 text-sm">
                      <Link className="text-navy hover:underline" href={`/races/${contest.raceSlug}`}>
                        Open the race guide
                      </Link>
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
      <section>
        <h2 className="font-serif text-xl font-semibold">Race guides for {state.name}</h2>
        {races.length > 0 ? (
          <ul className="mt-3 flex flex-wrap gap-3 text-sm">
            {races.map((race) => (
              <li key={race.slug}>
                <Link className="text-navy hover:underline" href={`/races/${race.slug}`}>
                  {race.shortTitle}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm leading-6 text-ink-muted">
            Map the Midterms does not yet publish a {state.name} race guide. Offices on the
            2026 cycle are sketched above. Qualified names are on the official sample ballot.
          </p>
        )}
      </section>
    </>
  );
}

function ResultsLinks({ state, races }: { state: StateProfile; races: RaceGuide[] }) {
  return (
    <section className="rounded-xl border border-line bg-paper-card p-5">
      <h2 className="font-serif text-xl font-semibold">{state.name} results on this site</h2>
      <ul className="mt-3 space-y-2 text-sm leading-6">
        <li>
          <Link className="text-navy underline" href={stateResultsPath(state.code)}>
            {state.name} results
          </Link>
        </li>
        <li>
          <Link className="text-navy underline" href="https://mapthegeneral.com/us/en/live/">
            Live results
          </Link>
        </li>
        <li>
          <Link className="text-navy underline" href="/results">
            Results tracker
          </Link>
        </li>
        <li>
          <Link className="text-navy underline" href={`/states/${state.code}`}>
            {state.name} hub
          </Link>
        </li>
        {races.map((race) => (
          <li key={race.slug}>
            <Link className="text-navy underline" href={`/results/${race.slug}`}>
              {race.title} results
            </Link>
            {" · "}
            <Link className="text-navy underline" href={`/races/${race.slug}`}>
              Race guide
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
