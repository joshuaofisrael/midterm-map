import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CrossLinks } from "@/components/CrossLinks";
import { JsonLd } from "@/components/JsonLd";
import { OfficialNotice } from "@/components/OfficialNotice";
import { PageHeader } from "@/components/PageHeader";
import { RaceCard } from "@/components/RaceCard";
import { racesForState } from "@/data/races";
import { stateHubFaqs } from "@/data/stateFaqs";
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
    title: `${state.name} 2026 midterms`,
    description: `${state.summary} Ballot structure, race guides, and how to confirm rules with the official election office. Not an official election website.`,
    path: `/states/${state.code}`,
  });
}

export default async function StateHubPage({ params }: { params: Promise<{ state: string }> }) {
  const { state: code } = await params;
  if (!isStateCode(code)) notFound();
  const state = getState(code);
  if (!state) notFound();
  const races = racesForState(state.code);
  const faqs = stateHubFaqs(state, races);
  const sampleBallot = state.sampleBallotOfficial;
  const distinctSample = sampleBallot && sampleBallot.href !== state.officialElectionOffice.href;

  return (
    <div className="space-y-8">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: state.name, path: `/states/${state.code}` },
          ]),
          faqJsonLd(faqs),
        ]}
      />
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: state.name }]} />
      <PageHeader
        eyebrow={`${state.name} hub`}
        title={`${state.name} and the 2026 midterms`}
        lede={state.summary}
      />
      <OfficialNotice compact />

      <section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-xl border border-line bg-paper-card p-5">
          <h2 className="font-serif text-xl font-semibold">How voting works here</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6">
            <li>{state.timezoneNote}</li>
            <li>{state.registrationNote}</li>
            <li>{state.earlyVotingNote}</li>
            <li>{state.mailNote}</li>
            <li>{state.idNote}</li>
          </ul>
          <p className="mt-4 text-sm">
            <a className="text-navy underline" href={state.officialElectionOffice.href} rel="noopener noreferrer">
              {state.officialElectionOffice.label}
            </a>
          </p>
        </article>
        <article className="rounded-xl border border-line bg-paper-card p-5">
          <h2 className="font-serif text-xl font-semibold">Jump to tools</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link className="font-medium text-navy hover:underline" href={`/ballot/${state.code}`}>
                {state.name} sample ballot structure
              </Link>
            </li>
            <li>
              <Link className="font-medium text-navy hover:underline" href="/polls">
                Polls and ratings hub
              </Link>
            </li>
            <li>
              <Link className="font-medium text-navy hover:underline" href="/results">
                Results tracker
              </Link>
            </li>
            <li>
              <a className="font-medium text-navy hover:underline" href={state.voteGov.href} rel="noopener noreferrer">
                {state.voteGov.label}
              </a>
            </li>
            <li>
              <a className="font-medium text-navy hover:underline" href={state.ballotpedia.href} rel="noopener noreferrer">
                {state.ballotpedia.label}
              </a>
            </li>
          </ul>
          <p className="mt-4 text-sm text-ink-muted">
            Senate Class 2 on this cycle: {state.hasSenateClass2 ? "Yes" : "No"}. Governor on this
            cycle: {state.hasGovernor2026 ? "Yes" : "No"}.
          </p>
          {state.statewideOffices2026.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-semibold">Statewide offices often on the 2026 ballot</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-ink-muted">
                {state.statewideOffices2026.map((office) => (
                  <li key={office}>{office}</li>
                ))}
              </ul>
            </div>
          )}
        </article>
      </section>

      <section>
        <h2 className="font-serif text-2xl font-semibold">Race guides</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {races.map((race) => (
            <RaceCard key={race.slug} race={race} />
          ))}
        </div>
      </section>

      <section id="faq" className="rounded-xl border border-line bg-paper-card p-5">
        <h2 className="font-serif text-2xl font-semibold">
          Questions about the {state.name} 2026 midterms
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted">
          Short answers from the offices and race guides already linked on this page.
          Confirm anything that affects how you vote with {state.officialElectionOffice.label}.
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
          <Link className="font-medium text-navy hover:underline" href={`/ballot/${state.code}`}>
            Sample ballot structure
          </Link>
        </p>
      </section>
      <CrossLinks state={state.code} />
    </div>
  );
}
