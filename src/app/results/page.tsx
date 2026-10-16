import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentTrust } from "@/components/ContentTrust";
import { ControlMeter } from "@/components/ControlMeter";
import { CrossLinks } from "@/components/CrossLinks";
import { JsonLd } from "@/components/JsonLd";
import { OfficialNotice } from "@/components/OfficialNotice";
import { PageHeader } from "@/components/PageHeader";
import { SourceLines } from "@/components/SourceLines";
import { StatusChip } from "@/components/StatusChip";
import { getRace } from "@/data/races";
import {
  ADDITIONAL_RESULT_SLUGS,
  HOUSE_METER,
  indexableRaceHref,
  isPreElection,
  KEY_RESULT_SLUGS,
  SENATE_METER,
  resultShellForRace,
  resultShellHasReturns,
} from "@/data/results";
import { SITE } from "@/data/site";
import { getState } from "@/data/states";
import { contentUpdatedLabel } from "@/lib/contentDate";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "2026 results tracker",
  description:
    "2026 midterm results dashboard with House and Senate control meters and key races. Awaiting unofficial returns before November 3, 2026. Returns are unofficial until certified.",
  path: "/results",
});

export default function ResultsPage() {
  const preElection = isPreElection();

  return (
    <div className="space-y-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Results", path: "/results" },
        ])}
      />
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "Results" }]} />
      <PageHeader
        eyebrow="Results"
        title="Results tracker"
        lede={`A dashboard for Election Night and the days after. ${SITE.name} does not certify outcomes. Any future vote totals shown here will be unofficial until a state or county completes certification.`}
      />
      <ContentTrust updated={contentUpdatedLabel("/results")} pagePath="/results" />
      <OfficialNotice />

      <div className="rounded-xl border border-notice-line bg-notice-wash p-5">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="font-serif text-xl font-semibold">
            {preElection ? "Awaiting returns" : "Unofficial returns window"}
          </h2>
          <StatusChip>{preElection ? "Pre-election" : "Unofficial"}</StatusChip>
        </div>
        <p className="mt-2 text-sm leading-6">
          {preElection
            ? `Election Day is ${SITE.electionDayLabel}. This page stays in awaiting-returns mode until that date. No live government or paid AP feed is connected.`
            : "If numbers appear after Election Day, treat them as unofficial until the relevant election authority certifies the contest."}
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <ControlMeter meter={HOUSE_METER} />
        <ControlMeter meter={SENATE_METER} />
      </div>

      <section>
        <h2 className="font-serif text-2xl font-semibold">Key races</h2>
        <p className="mt-2 text-sm text-ink-muted">
          Selected Senate, governor, and House contests. Unofficial returns appear here on
          Election Night ({SITE.electionDayLabel}). Until a race has returns, the title opens
          the race guide. This page does not invent vote totals.
        </p>
        <ul className="mt-4 divide-y divide-line rounded-xl border border-line bg-paper-card">
          {KEY_RESULT_SLUGS.map((slug) => {
            const race = getRace(slug);
            if (!race) return null;
            const hasReturns = resultShellHasReturns(resultShellForRace(race.slug));
            return (
              <li key={slug} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
                <div>
                  <Link
                    className="font-semibold hover:text-navy"
                    href={indexableRaceHref(race.slug)}
                  >
                    {race.title}
                  </Link>
                  <p className="text-sm text-ink-muted">
                    {hasReturns ? "Unofficial returns" : "Awaiting unofficial returns"}
                  </p>
                  {race.candidates.length > 0 && (
                    <ul className="mt-2 space-y-2">
                      {race.candidates.map((candidate) => (
                        <li key={candidate.name} className="text-sm">
                          <span className="font-medium text-ink">{candidate.name}</span>
                          <SourceLines sources={candidate.sources} />
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <Link className="text-sm font-medium text-navy hover:underline" href={`/races/${race.slug}`}>
                  Race guide
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section>
        <h2 className="font-serif text-2xl font-semibold">
          Minnesota, Maine, Iowa, and Alaska
        </h2>
        <p className="mt-2 text-sm text-ink-muted">
          Statewide U.S. Senate and governor contests on the November 3, 2026 ballot in these
          states. Each title opens the results page. Those pages are awaiting unofficial returns.
          They do not invent vote totals and do not call races. Names, when shown, come from the
          official candidate list cited on the page.
        </p>
        <ul className="mt-4 divide-y divide-line rounded-xl border border-line bg-paper-card">
          {ADDITIONAL_RESULT_SLUGS.map((slug) => {
            const race = getRace(slug);
            if (!race) return null;
            const state = getState(race.state);
            const hasReturns = resultShellHasReturns(resultShellForRace(race.slug));
            return (
              <li key={slug} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
                <div>
                  <Link
                    className="font-semibold hover:text-navy"
                    href={indexableRaceHref(race.slug)}
                  >
                    {race.title}
                  </Link>
                  <p className="text-sm text-ink-muted">
                    {hasReturns ? "Unofficial returns" : "Awaiting unofficial returns"}
                  </p>
                  {race.candidates.length > 0 && (
                    <ul className="mt-2 space-y-2">
                      {race.candidates.map((candidate) => (
                        <li key={candidate.name} className="text-sm">
                          <span className="font-medium text-ink">{candidate.name}</span>
                          <SourceLines sources={candidate.sources} />
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <p className="text-sm">
                  <Link className="font-medium text-navy hover:underline" href={`/races/${race.slug}`}>
                    Race guide
                  </Link>
                  {state ? (
                    <>
                      {" · "}
                      <Link
                        className="font-medium text-navy hover:underline"
                        href={`/states/${state.code}`}
                      >
                        {state.name} hub
                      </Link>
                    </>
                  ) : null}
                </p>
              </li>
            );
          })}
        </ul>
      </section>
      <CrossLinks />
    </div>
  );
}
