import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Byline } from "@/components/Byline";
import { ContentTrust } from "@/components/ContentTrust";
import { EditorialSection } from "@/components/EditorialSection";
import { CrossLinks } from "@/components/CrossLinks";
import { TipJar } from "@/components/TipJar";
import { JsonLd } from "@/components/JsonLd";
import { OfficialNotice } from "@/components/OfficialNotice";
import { PageHeader } from "@/components/PageHeader";
import { RaceCard } from "@/components/RaceCard";
import { StateCandidates } from "@/components/StateCandidates";
import { KeyDatesSection } from "@/components/ElectionDates";
import { EmailSignup } from "@/components/EmailSignup";
import { MapTheGeneral } from "@/components/MapTheGeneral";
import { ShareBar } from "@/components/ShareBar";
import { statePreview } from "@/data/essays/previews";
import { ballotCycleFor } from "@/data/ballotCycle";
import {
  electionDatesFor,
  hasSourcedDeadline,
  hasSourcedMailDeadline,
  type StateElectionDates,
} from "@/data/electionDates";
import { racesForState } from "@/data/races";
import { stateResultsPath } from "@/data/results";
import { stateHubFaqs } from "@/data/stateFaqs";
import { getState, isStateCode, STARTER_STATES } from "@/data/states";
import type { StateProfile } from "@/data/types";
import { contentUpdatedLabel } from "@/lib/contentDate";
import { faqJsonLd } from "@/lib/format";
import { VISUALS } from "@/data/visuals";
import { stateHubOg } from "@/lib/ogCard";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return STARTER_STATES.map((state) => ({ state: state.code }));
}

export async function generateMetadata({ params }: { params: Promise<{ state: string }> }) {
  const { state: code } = await params;
  const state = getState(code);
  if (!state) return {};
  const dates = electionDatesFor(state.code);
  const card = stateHubOg(state.code, state.name);
  return pageMetadata({
    title: stateHubTitle(state.name, dates),
    description: stateHubDescription(state, dates),
    path: `/states/${state.code}`,
    image: { url: card.url, alt: card.alt },
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
        title={stateHubHeading(state.name)}
        lede={state.summary}
        visual={VISUALS.civicBuilding}
      />
      <Byline className="mt-0" />
      <ContentTrust
        updated={contentUpdatedLabel(`/states/${state.code}`)}
        pagePath={`/states/${state.code}`}
        officeHref={state.officialElectionOffice.href}
        officeLabel={state.officialElectionOffice.label}
      />
      <EditorialSection essay={statePreview(state)} />
      <OfficialNotice compact />
      <ShareBar path={`/states/${state.code}`} title={`${state.name} 2026 midterms`} />
      <MapTheGeneral />
      <StateCandidates code={state.code} stateName={state.name} />

      <section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-xl border border-line border-t-4 border-t-navy bg-paper-card p-5 shadow-card">
          <h2 className="font-serif text-xl font-semibold">Official election office</h2>
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
        <article className="rounded-xl border border-line border-t-4 border-t-navy bg-paper-card p-5 shadow-card">
          <h2 className="font-serif text-xl font-semibold">Jump to tools</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link className="font-medium text-navy hover:underline" href={`/ballot/${state.code}`}>
                {ballotCycleFor(state.code) ? `${state.name} ballot, November 3, 2026` : `${state.name} sample ballot structure`}
              </Link>
            </li>
            <li>
              <Link className="font-medium text-navy hover:underline" href={`/cities/${state.code}`}>
                Census places in {state.name}
              </Link>
            </li>
            <li>
              <Link className="font-medium text-navy hover:underline" href="/polls">
                Polls and ratings hub
              </Link>
            </li>
            <li>
              <Link className="font-medium text-navy hover:underline" href={stateResultsPath(state.code)}>
                {state.name} results
              </Link>
            </li>
            <li>
              <Link className="font-medium text-navy hover:underline" href="/live">
                Live results
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
          {!ballotCycleFor(state.code) && (
            <p className="mt-4 text-sm text-ink-muted">
              Senate Class 2 on this cycle: {state.hasSenateClass2 ? "Yes" : "No"}. Governor on this
              cycle: {state.hasGovernor2026 ? "Yes" : "No"}.
            </p>
          )}
          {(state.statewideOffices2026.length > 0 || (state.cycleSources && state.cycleSources.length > 0)) && (
            <div className="mt-4">
              {state.statewideOffices2026.length > 0 && (
                <>
                  <p className="text-sm font-semibold">
                    {state.cycleSources && state.cycleSources.length > 0
                      ? "Statewide offices on the November 3, 2026 ballot"
                      : "Statewide offices often on the 2026 ballot"}
                  </p>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-ink-muted">
                    {state.statewideOffices2026.map((office) => (
                      <li key={office}>{office}</li>
                    ))}
                  </ul>
                </>
              )}
              {state.cycleSources && state.cycleSources.length > 0 && (
                <p className="mt-3 text-xs leading-5 text-ink-soft">
                  {state.cycleCheckedOn ? <>Last checked {state.cycleCheckedOn}. </> : null}
                  Source{state.cycleSources.length > 1 ? "s" : ""}:{" "}
                  {state.cycleSources.map((source, index) => (
                    <span key={source.href}>
                      {index > 0 ? "; " : ""}
                      <a className="text-navy underline" href={source.href} rel="noopener noreferrer">
                        {source.label}
                      </a>
                    </span>
                  ))}
                </p>
              )}
            </div>
          )}
        </article>
      </section>

      <KeyDatesSection
        stateCode={state.code}
        officeLabel={state.officialElectionOffice.label}
        officeHref={state.officialElectionOffice.href}
        dates={electionDatesFor(state.code)}
      />

      {state.officialVoterLinks && state.officialVoterLinks.length > 0 && (
        <section id="official-links" className="rounded-xl border border-line bg-paper-card p-5">
          <h2 className="font-serif text-2xl font-semibold">
            Official {state.name} election and voter links
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-muted">
            This site is not an official election website and is not affiliated with these
            offices. The links below go to official government websites (and Vote.gov) outside
            this site. They are {state.name} pages for registration, polling places, and mail or
            absentee ballots.
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {state.officialVoterLinks.map((link) => (
              <li key={link.href}>
                <a
                  className="font-medium text-navy hover:underline"
                  href={link.href}
                  rel="noopener noreferrer"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {races.length > 0 && (
        <section>
          <h2 className="font-serif text-2xl font-semibold">Race guides</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {races.map((race) => (
              <RaceCard key={race.slug} race={race} />
            ))}
          </div>
        </section>
      )}

      <section id="faq" className="rounded-xl border border-line bg-paper-card p-5">
        <h2 className="font-serif text-2xl font-semibold">
          Questions about the {state.name} 2026 midterms
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted">
          Short answers from the offices and race guides already linked on this page.
          Registration and voting rules are published by {state.officialElectionOffice.label}.
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
      <EmailSignup />
      <CrossLinks state={state.code} />
      <TipJar />
    </div>
  );
}

/**
 * Search title. Site name is appended by the root template.
 * Prefer about 60 characters. North Carolina is 62 with the shared pattern;
 * a shorter title would drop ballot or races.
 * A date category is named only when that state stores a sourced fact for it.
 */
function stateHubTitle(name: string, dates: StateElectionDates): string {
  const registration = hasSourcedDeadline(dates, "registration");
  const early = hasSourcedDeadline(dates, "early");
  const mail = hasSourcedMailDeadline(dates);

  if (registration && early) {
    return `${name} 2026 registration, early voting, ballot & races`;
  }
  if (registration && mail) {
    return `${name} 2026 registration, mail ballot & races`;
  }
  if (registration) return `${name} 2026 voter registration, ballot & races`;
  if (early) return `${name} 2026 early voting, ballot & races`;
  if (mail) return `${name} 2026 mail ballot, ballot & races`;
  return `${name} 2026 midterms: ballot, races, and key dates`;
}

function stateHubHeading(name: string): string {
  return `${name} 2026 midterms: ballot, races, and key dates`;
}

function stateHubDescription(state: StateProfile, dates: StateElectionDates): string {
  const text = `${state.name}: 2026 ${deadlineMetaClause(dates)} for November 3, plus race guides. Not an official election website.`;
  if (text.length > 160) {
    throw new Error(`State meta description is ${text.length} characters: ${text}`);
  }
  return text;
}

/** Lowercase clause. Only categories with sourced facts are named. */
function deadlineMetaClause(dates: StateElectionDates): string {
  const parts: string[] = [];
  if (hasSourcedDeadline(dates, "registration")) parts.push("voter registration");
  if (hasSourcedDeadline(dates, "early")) parts.push("early voting");
  if (hasSourcedMailDeadline(dates)) parts.push("mail-ballot");
  if (parts.length === 0) return "key election dates";
  if (parts.length === 1) return `${parts[0]} deadlines`;
  if (parts.length === 2) return `${parts[0]} and ${parts[1]} deadlines`;
  return `${parts[0]}, ${parts[1]}, and ${parts[2]} deadlines`;
}

