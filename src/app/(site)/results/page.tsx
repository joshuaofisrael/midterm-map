import Link from "next/link";
import { BallotpediaLink } from "@/components/BallotpediaLink";
import { HouseAd } from "@/components/HouseAd";
import { SponsorSlot } from "@/components/SponsorSlot";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Byline } from "@/components/Byline";
import { EditorialSection } from "@/components/EditorialSection";
import { InfoNote } from "@/components/InfoNote";
import { ContentTrust } from "@/components/ContentTrust";
import { LiveNeedles } from "@/components/LiveNeedles";
import { CrossLinks } from "@/components/CrossLinks";
import { EmailSignup } from "@/components/EmailSignup";
import { JsonLd } from "@/components/JsonLd";
import { LivePanel } from "@/components/LivePanel";
import { MapTheGeneral } from "@/components/MapTheGeneral";
import { OfficialNotice } from "@/components/OfficialNotice";
import { PageHeader } from "@/components/PageHeader";
import { SourceLines } from "@/components/SourceLines";
import { StatusChip } from "@/components/StatusChip";
import { resultsPreview } from "@/data/essays/previews";
import { getRace, RACES } from "@/data/races";
import {
  ADDITIONAL_RESULT_SLUGS,
  isPreElection,
  KEY_RESULT_SLUGS,
  resultShellForRace,
  resultShellHasReturns,
  stateResultsPath,
} from "@/data/results";
import { absoluteUrl, SITE } from "@/data/site";
import { getState, STARTER_STATES } from "@/data/states";
import { contentUpdatedIsoForPath, contentUpdatedLabel } from "@/lib/contentDate";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Election night and key races",
  description:
    "November 3, 2026 key races and unofficial returns copied from state election-office files after polls close. No projections. Returns are unofficial until certified.",
  path: "/results",
});

function resultsHubJsonLd() {
  const races = [...KEY_RESULT_SLUGS, ...ADDITIONAL_RESULT_SLUGS]
    .map((slug) => getRace(slug))
    .filter((race): race is NonNullable<ReturnType<typeof getRace>> => Boolean(race));
  const modified = contentUpdatedIsoForPath("/results");
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Election night and key races",
    url: absoluteUrl("/results"),
    description:
      "Key November 3, 2026 contests with unofficial returns copied from state election-office files after polls close. No projections.",
    inLanguage: "en-US",
    ...(modified ? { dateModified: modified } : {}),
    isPartOf: { "@type": "WebSite", name: SITE.name, url: absoluteUrl("/") },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: races.length,
      itemListElement: races.map((race, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: race.title,
        url: absoluteUrl(`/results/${race.slug}`),
      })),
    },
  };
}

export default function ResultsPage() {
  const preElection = isPreElection();

  return (
    <>
      <HouseAd path="/results" />
      <SponsorSlot />
      <div className="space-y-8">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Results", path: "/results" },
          ]),
          resultsHubJsonLd(),
        ]}
      />
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "Results" }]} />
      <PageHeader
        eyebrow="Results"
        title="Election night and key races"
        lede={`Key contests for ${SITE.electionDayLabel}, and unofficial figures after polls close. ${SITE.name} does not project winners and does not certify outcomes. A winner label appears only when the official file marks that candidate.`}
      >
        <Byline />
        <InfoNote />
      </PageHeader>
      <ContentTrust updated={contentUpdatedLabel("/results")} pagePath="/results" />
      <EditorialSection essay={resultsPreview()} />
      <OfficialNotice />
      <MapTheGeneral variant="hubs" />

      <section id="election-night" className="rounded-xl border border-line bg-paper-card p-5 text-sm leading-6">
        <h2 className="font-serif text-xl font-semibold">How election night works on this page</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>Nothing is shown for a state until its polls have closed.</li>
          <li>
            Vote totals are copied from that state’s election-office file. The office is named on
            each row and listed on the{" "}
            <Link className="font-medium text-navy underline" href="/live">
              election night page
            </Link>
            .
          </li>
          <li>This site does not project a winner and does not call a race.</li>
          <li>Certification is done by the state or county election office, not by this site.</li>
        </ul>
        <p className="mt-3">
          <a className="font-medium text-navy underline" href={SITE.voteGovUrl} rel="noopener noreferrer">
            Vote.gov
          </a>{" "}
          is the federal voting portal. It is not a results feed.
        </p>
      </section>

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

      <LiveNeedles />

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
                          <span className="font-medium text-ink">{candidate.name}</span>{" "}
                          <BallotpediaLink href={candidate.ballotpedia} />
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
                          <span className="font-medium text-ink">{candidate.name}</span>{" "}
                          <BallotpediaLink href={candidate.ballotpedia} />
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
    </>
  );
}
