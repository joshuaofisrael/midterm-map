import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentTrust } from "@/components/ContentTrust";
import { ControlMeter } from "@/components/ControlMeter";
import { CrossLinks } from "@/components/CrossLinks";
import { EmailSignup } from "@/components/EmailSignup";
import { JsonLd } from "@/components/JsonLd";
import { LivePanel } from "@/components/LivePanel";
import { OfficialNotice } from "@/components/OfficialNotice";
import { PageHeader } from "@/components/PageHeader";
import { SourceLines } from "@/components/SourceLines";
import { StatusChip } from "@/components/StatusChip";
import { getRace, RACES } from "@/data/races";
import {
  ADDITIONAL_RESULT_SLUGS,
  HOUSE_METER,
  isPreElection,
  KEY_RESULT_SLUGS,
  SENATE_METER,
  resultShellForRace,
  resultShellHasReturns,
  stateResultsPath,
} from "@/data/results";
import { SITE } from "@/data/site";
import { getState, STARTER_STATES } from "@/data/states";
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
            ? `Election Day is ${SITE.electionDayLabel}. The tables on this page stay in awaiting-returns mode. The live panel copies figures from official state election-office files after polls close.`
            : "If numbers appear after Election Day, treat them as unofficial until the relevant election authority certifies the contest."}
        </p>
      </div>

      <LivePanel raceSlugs={RACES.map((race) => race.slug)} />
      <EmailSignup prominent />

      <div className="grid gap-4 lg:grid-cols-2">
        <ControlMeter meter={HOUSE_METER} />
        <ControlMeter meter={SENATE_METER} />
      </div>

      <section>
        <h2 className="font-serif text-2xl font-semibold">Key races</h2>
        <p className="mt-2 text-sm text-ink-muted">
          Selected Senate, governor, and House contests. Each title opens that race’s results
          page. Those pages are awaiting unofficial returns for {SITE.electionDayLabel}. This
          page does not invent vote totals.
        </p>
        <ul className="mt-4 divide-y divide-line rounded-xl border border-line bg-paper-card">
          {KEY_RESULT_SLUGS.map((slug) => {
            const race = getRace(slug);
            if (!race) return null;
            const hasReturns = resultShellHasReturns(resultShellForRace(race.slug));
            return (
              <li key={slug} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
                <div>
                  <Link className="font-semibold hover:text-navy" href={`/results/${race.slug}`}>
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
          Minnesota, Maine, Iowa, Alaska, and Kansas
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
                  <Link className="font-semibold hover:text-navy" href={`/results/${race.slug}`}>
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

      <section>
        <h2 className="font-serif text-2xl font-semibold">Results by state</h2>
        <p className="mt-2 text-sm text-ink-muted">
          One results page for each state on this site, plus the live results page. Each page
          is awaiting unofficial returns and links the official results site for that state.
        </p>
        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm">
          <li>
            <Link className="font-medium text-navy hover:underline" href="/live">
              Live results
            </Link>
          </li>
          {STARTER_STATES.map((state) => (
            <li key={state.code}>
              <Link className="font-medium text-navy hover:underline" href={stateResultsPath(state.code)}>
                {state.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="font-serif text-2xl font-semibold">Every race results page</h2>
        <ul className="mt-4 divide-y divide-line rounded-xl border border-line bg-paper-card">
          {RACES.map((race) => {
            const state = getState(race.state);
            return (
              <li key={race.slug} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
                <Link className="font-semibold hover:text-navy" href={`/results/${race.slug}`}>
                  {race.title}
                </Link>
                <p className="text-sm">
                  <Link className="font-medium text-navy hover:underline" href={`/races/${race.slug}`}>
                    Race guide
                  </Link>
                  {state ? (
                    <>
                      {" · "}
                      <Link
                        className="font-medium text-navy hover:underline"
                        href={stateResultsPath(state.code)}
                      >
                        {state.name} results
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
