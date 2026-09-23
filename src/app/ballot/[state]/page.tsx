import Link from "next/link";
import { notFound } from "next/navigation";
import { BallotLookup } from "@/components/BallotLookup";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CrossLinks } from "@/components/CrossLinks";
import { OfficialNotice } from "@/components/OfficialNotice";
import { PageHeader } from "@/components/PageHeader";
import { JsonLd } from "@/components/JsonLd";
import { StatusChip } from "@/components/StatusChip";
import { ballotStateFaqs } from "@/data/ballotFaqs";
import { ballotSectionsForState } from "@/data/ballots";
import { indexableRaceHref } from "@/data/results";
import { racesForState } from "@/data/races";
import { getState, isStateCode, STARTER_STATES } from "@/data/states";
import { faqJsonLd } from "@/lib/format";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return STARTER_STATES.map((state) => ({ state: state.code }));
}

export async function generateMetadata({ params }: { params: Promise<{ state: string }> }) {
  const { state: code } = await params;
  const state = getState(code);
  if (!state) return {};
  return pageMetadata({
    title: `${state.name} 2026 sample ballot structure`,
    description: `Structured 2026 sample-ballot sections for ${state.name}, with official ${state.officialElectionOffice.label} and Vote.gov links. Not an official ballot.`,
    path: `/ballot/${state.code}`,
  });
}

export default async function BallotStatePage({ params }: { params: Promise<{ state: string }> }) {
  const { state: code } = await params;
  if (!isStateCode(code)) notFound();
  const state = getState(code);
  if (!state) notFound();

  const sections = ballotSectionsForState(state.code);
  const races = racesForState(state.code);
  const faqs = ballotStateFaqs(state, races);
  const sampleBallot = state.sampleBallotOfficial;
  const distinctSample = sampleBallot && sampleBallot.href !== state.officialElectionOffice.href;

  return (
    <div className="space-y-8">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Ballot", path: "/ballot" },
            { name: state.name, path: `/ballot/${state.code}` },
          ]),
          faqJsonLd(faqs),
        ]}
      />
      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { href: "/ballot", label: "Ballot" },
          { label: state.name },
        ]}
      />
      <PageHeader
        eyebrow={`${state.name} · Ballot`}
        title={`${state.name} sample ballot structure`}
        lede="A sectioned sketch of contests that often appear. It is incomplete, may be outdated, and is not a substitute for the sample ballot issued by your county or state election office."
      />
      <OfficialNotice />
      <BallotLookup initialState={state.code} />

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
            Registration starting point:{" "}
            <a className="text-navy underline" href={state.voteGov.href} rel="noopener noreferrer">
              {state.voteGov.label}
            </a>
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
                  {contest.raceSlug && (
                    <p className="mt-2 text-sm">
                      <Link className="text-navy hover:underline" href={`/races/${contest.raceSlug}`}>
                        Open the race guide
                      </Link>
                      {indexableRaceHref(contest.raceSlug).startsWith("/results/") && (
                        <>
                          {" · "}
                          <Link
                            className="text-navy hover:underline"
                            href={indexableRaceHref(contest.raceSlug)}
                          >
                            Results page
                          </Link>
                        </>
                      )}
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
        <ul className="mt-3 flex flex-wrap gap-3 text-sm">
          {races.map((race) => (
            <li key={race.slug}>
              <Link className="text-navy hover:underline" href={`/races/${race.slug}`}>
                {race.shortTitle}
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-sm">
          <Link className="font-medium text-navy hover:underline" href={`/states/${state.code}`}>
            Full {state.name} hub
          </Link>
        </p>
      </section>

      <section id="faq" className="rounded-xl border border-line bg-paper-card p-5">
        <h2 className="font-serif text-xl font-semibold">Questions readers ask</h2>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted">
          Short answers from the offices, sample-ballot notes, and race-guide titles already on this
          page. Confirm your official sample ballot with {state.officialElectionOffice.label}.
        </p>
        <dl className="mt-5 space-y-5">
          {faqs.map((faq) => (
            <div key={faq.question}>
              <dt className="font-semibold">{faq.question}</dt>
              <dd className="mt-1 text-sm leading-6 text-ink-muted">{faq.answer}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-5 text-sm">
          <a
            className="font-medium text-navy hover:underline"
            href={state.officialElectionOffice.href}
            rel="noopener noreferrer"
          >
            {state.officialElectionOffice.label}
          </a>
          {distinctSample && sampleBallot && (
            <>
              {" · "}
              <a
                className="font-medium text-navy hover:underline"
                href={sampleBallot.href}
                rel="noopener noreferrer"
              >
                {sampleBallot.label}
              </a>
            </>
          )}
          {" · "}
          <a
            className="font-medium text-navy hover:underline"
            href={state.voteGov.href}
            rel="noopener noreferrer"
          >
            {state.voteGov.label}
          </a>
          {" · "}
          <Link className="font-medium text-navy hover:underline" href={`/states/${state.code}`}>
            {state.name} hub
          </Link>
        </p>
      </section>
      <CrossLinks state={state.code} />
    </div>
  );
}
