import Link from "next/link";
import { notFound } from "next/navigation";
import { BallotpediaLink } from "@/components/BallotpediaLink";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { InfoNote } from "@/components/InfoNote";
import { ContentTrust } from "@/components/ContentTrust";
import { CrossLinks } from "@/components/CrossLinks";
import { EmailSignup } from "@/components/EmailSignup";
import { JsonLd } from "@/components/JsonLd";
import { LivePanel } from "@/components/LivePanel";
import { OfficialNotice } from "@/components/OfficialNotice";
import { PageHeader } from "@/components/PageHeader";
import { SourceLines } from "@/components/SourceLines";
import { SourceList } from "@/components/SourceList";
import { StatusChip } from "@/components/StatusChip";
import { getRace, RACES } from "@/data/races";
import { isPreElection, neighbouringResultRaces, resultShellForRace, resultShellHasReturns, stateResultsPath } from "@/data/results";
import { SITE } from "@/data/site";
import { getState } from "@/data/states";
import { contentUpdatedLabel } from "@/lib/contentDate";
import { chamberLabel, partyTone } from "@/lib/format";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return RACES.map((race) => ({ slug: race.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const race = getRace(slug);
  if (!race) return {};
  // Owner rule (11 Oct 2026): every page is indexable, including pre-return shells.
  return pageMetadata({
    title: `Unofficial returns — ${race.shortTitle}`,
    description: `Results page for ${race.title}. Returns are unofficial until certified by election authorities. ${SITE.name} does not certify results.`,
    path: `/results/${race.slug}`,
    index: true,
  });
}

export default async function RaceResultPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const race = getRace(slug);
  if (!race) notFound();
  const state = getState(race.state);
  const shell = resultShellForRace(race.slug);
  const preElection = isPreElection();
  const neighbours = neighbouringResultRaces(race.slug);

  return (
    <div className="space-y-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Results", path: "/results" },
          { name: race.shortTitle, path: `/results/${race.slug}` },
        ])}
      />
      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { href: "/results", label: "Results" },
          { label: race.shortTitle },
        ]}
      />
      <PageHeader
        eyebrow={`${chamberLabel(race.chamber)} · Results`}
        title={race.title}
        lede="Per-race returns page. This page will never be labeled as certified results. Certification is a government function."
      >
        <InfoNote />
      </PageHeader>
      <ContentTrust
        updated={contentUpdatedLabel(`/results/${race.slug}`)}
        pagePath={`/results/${race.slug}`}
        officeHref={state?.officialElectionOffice.href}
        officeLabel={state?.officialElectionOffice.label}
      />
      <OfficialNotice />
      <LivePanel stateCode={race.state} raceSlugs={[race.slug]} />
      <EmailSignup prominent />

      <section className="rounded-xl border border-line bg-paper-card p-5">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="font-serif text-xl font-semibold">
            {preElection ? "Awaiting unofficial returns" : "Unofficial returns"}
          </h2>
          <StatusChip>Not certified</StatusChip>
        </div>
        <p className="mt-2 text-sm leading-6 text-ink-muted">
          {shell.reportingNote}
          {!resultShellHasReturns(shell)
            ? " This page is a pre-election stub until unofficial returns exist."
            : null}
        </p>
        {race.officialResults && (
          <p className="mt-3 text-sm leading-6">
            Authoritative results:{" "}
            <a
              className="font-medium text-navy underline"
              href={race.officialResults.href}
              rel="noopener noreferrer"
            >
              {race.officialResults.label}
            </a>
            .
          </p>
        )}
        {race.countingNote && (
          <p className="mt-3 text-sm leading-6 text-ink-muted">
            {race.countingNote}{" "}
            {race.countingSource && (
              <a className="text-navy underline" href={race.countingSource.href} rel="noopener noreferrer">
                {race.countingSource.label}
              </a>
            )}
          </p>
        )}
        <table className="mt-4 min-w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-wide text-ink-muted">
            <tr>
              <th className="py-2 pr-4">Candidate</th>
              <th className="py-2 pr-4">Party</th>
              <th className="py-2 pr-4">Votes</th>
              <th className="py-2">Percent</th>
            </tr>
          </thead>
          <tbody>
            {shell.lines.map((line) => {
              const candidate = race.candidates.find((item) => item.name === line.candidateLabel);
              return (
              <tr key={line.candidateLabel} className="border-t border-line align-top">
                <td className={`py-2.5 pr-4 font-medium ${partyTone(line.party)}`}>
                  {line.candidateLabel} {candidate ? <BallotpediaLink href={candidate.ballotpedia} /> : null}
                  {candidate && <SourceLines sources={candidate.sources} />}
                </td>
                <td className="py-2.5 pr-4">{line.party}</td>
                <td className="py-2.5 pr-4 tabular-nums">{line.votes ?? "—"}</td>
                <td className="py-2.5 tabular-nums">{line.percent ?? "—"}</td>
              </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      <p className="text-sm leading-6">
        <Link className="font-medium text-navy hover:underline" href={`/ballot/${race.state}`}>
          {state?.name ?? race.state} ballot
        </Link>
        {" · "}
        <Link className="font-medium text-navy hover:underline" href={`/races/${race.slug}`}>
          Race guide
        </Link>
        {" · "}
        <Link className="font-medium text-navy hover:underline" href="https://mapthegeneral.com/us/en/live/">
          Live results
        </Link>
        {" · "}
        <Link className="font-medium text-navy hover:underline" href={stateResultsPath(race.state)}>
          {state?.name ?? race.state} results
        </Link>
        {" · "}
        <Link className="font-medium text-navy hover:underline" href="/results">
          Results tracker
        </Link>
        {state && (
          <>
            {" · "}
            <Link className="font-medium text-navy hover:underline" href={`/states/${race.state}`}>
              {state.name} hub
            </Link>
          </>
        )}
      </p>
      {neighbours.length > 0 && (
        <section>
          <h2 className="font-serif text-xl font-semibold">More results pages</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {neighbours.map((item) => (
              <li key={item.slug}>
                <Link className="text-navy underline" href={`/results/${item.slug}`}>
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
      {race.officialResults && <SourceList sources={race.sources} title="Sources for this contest" />}
      <CrossLinks state={race.state} raceSlug={race.slug} />
    </div>
  );
}
