import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { InfoNote } from "@/components/InfoNote";
import { ContentTrust } from "@/components/ContentTrust";
import { CrossLinks } from "@/components/CrossLinks";
import { EmailSignup } from "@/components/EmailSignup";
import { JsonLd } from "@/components/JsonLd";
import { LivePanel, liveSourceRows } from "@/components/LivePanel";
import { OfficialNotice } from "@/components/OfficialNotice";
import { PageHeader } from "@/components/PageHeader";
import { StatusChip } from "@/components/StatusChip";
import { racesForState } from "@/data/races";
import { isPreElection, stateResultsPath } from "@/data/results";
import { SITE } from "@/data/site";
import { getState, isStateCode, STARTER_STATES } from "@/data/states";
import { contentUpdatedLabel } from "@/lib/contentDate";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return STARTER_STATES.map((state) => ({ state: state.code }));
}

export async function generateMetadata({ params }: { params: Promise<{ state: string }> }) {
  const { state: code } = await params;
  const state = getState(code);
  if (!state) return {};
  return pageMetadata({
    title: `${state.name} 2026 election results`,
    description: `Results page for ${state.name} on November 3, 2026. Awaiting unofficial returns. ${SITE.name} does not certify results.`,
    path: stateResultsPath(state.code),
  });
}

export default async function StateResultsPage({ params }: { params: Promise<{ state: string }> }) {
  const { state: code } = await params;
  if (!isStateCode(code)) notFound();
  const state = getState(code);
  if (!state) notFound();
  const races = racesForState(state.code);
  const official = liveSourceRows(state.code)[0];
  const preElection = isPreElection();

  return (
    <div className="space-y-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Results", path: "/results" },
          { name: state.name, path: stateResultsPath(state.code) },
        ])}
      />
      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { href: "/results", label: "Results" },
          { label: state.name },
        ]}
      />
      <PageHeader
        eyebrow={`${state.name} · Results`}
        title={`${state.name} results`}
        lede={`${state.name} returns on this page are awaiting unofficial figures for the ${SITE.electionDayLabel} general election. Certification is done by election officials.`}
      >
        <InfoNote />
      </PageHeader>
      <ContentTrust
        updated={contentUpdatedLabel(stateResultsPath(state.code))}
        pagePath={stateResultsPath(state.code)}
        officeHref={state.officialElectionOffice.href}
        officeLabel={state.officialElectionOffice.label}
      />
      <OfficialNotice />
      <LivePanel stateCode={state.code} />
      <EmailSignup prominent />

      <section className="rounded-xl border border-line bg-paper-card p-5">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="font-serif text-xl font-semibold">
            {preElection ? "Awaiting unofficial returns" : "Unofficial returns"}
          </h2>
          <StatusChip>Not certified</StatusChip>
        </div>
        <p className="mt-2 text-sm leading-6 text-ink-muted">
          This page does not print vote totals. Any later numbers copied from an official file stay
          unofficial until that office certifies the contest.
        </p>
        {official && (
          <p className="mt-3 text-sm leading-6">
            Official results site:{" "}
            <a className="font-medium text-navy underline" href={official.resultsUrl} rel="noopener noreferrer">
              {official.resultsLabel}
            </a>
            .
          </p>
        )}
      </section>

      <section>
        <h2 className="font-serif text-xl font-semibold">Linked pages</h2>
        <ul className="mt-3 space-y-2 text-sm leading-6">
          <li>
            <Link className="text-navy underline" href={`/ballot/${state.code}`}>
              {state.name} ballot
            </Link>
          </li>
          <li>
            <Link className="text-navy underline" href="/live">
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
        {races.length === 0 && (
          <p className="mt-3 text-sm leading-6 text-ink-muted">
            This site does not publish a separate race results page for a contest in {state.name}.
          </p>
        )}
      </section>
      <CrossLinks state={state.code} />
    </div>
  );
}
