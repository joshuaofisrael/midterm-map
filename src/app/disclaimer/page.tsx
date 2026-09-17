import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { OfficialNotice } from "@/components/OfficialNotice";
import { PageHeader } from "@/components/PageHeader";
import { contactMailto, SITE } from "@/data/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Disclaimer",
  description:
    `Election-information disclaimer for ${SITE.name}: not an official government site, not legal advice, not an endorsement. Verify ballots and results with official authorities.`,
  path: "/disclaimer",
});

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Disclaimer", path: "/disclaimer" },
        ])}
      />
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "Disclaimer" }]} />
      <PageHeader
        eyebrow={`Last updated ${SITE.lastUpdated}`}
        title="Disclaimer"
        lede={`Read this before you rely on anything on ${SITE.name}. This page is informational product copy, not a lawyer’s sign-off.`}
      />
      <OfficialNotice />
      <div className="prose-legal">
        <h2>Informational only</h2>
        <p>
          {SITE.name} is operated by {SITE.legalName}. Content is for general
          voter information and civic orientation. It is{" "}
          <strong>not legal advice</strong>, not election-administration advice,
          and not professional advice of any other kind. It does not create an
          attorney-client or adviser relationship.
        </p>

        <h2>Not an official election website</h2>
        <p>
          This site is <strong>not</strong> a government website. It is not a
          secretary of state site, not a county election office, not a board of
          elections, and not Vote.gov. We do not issue ballots, process
          registration, accept ballot requests, or certify results. Seals,
          flags, and .gov styling are not used as official marks here.
        </p>

        <h2>Not a voting guide endorsement</h2>
        <p>
          Nothing on this site is an endorsement of a candidate, party, ticket,
          or ballot measure. Party labels and office titles are nominative
          identification only. We do not tell you how to vote.
        </p>

        <h2>Ballots and districts may be incomplete or outdated</h2>
        <p>
          Sample ballot sections are structured sketches for starter states.
          They may omit contests, use the wrong district example, or lag
          redistricting, candidate qualification, or measure certification.{" "}
          <strong>You must verify</strong> your contests, districts, polling
          place, ID rules, and deadlines with your state or county election
          authority and with the sample ballot those offices publish.
        </p>

        <h2>Race ratings are editorial illustrations</h2>
        <p>
          Solid / Likely / Lean / Tossup placements are labeled illustrative or
          editorial demo unless a later version clearly says a specific
          methodology and source. They are not a guarantee of outcomes and are
          not an official forecast.
        </p>

        <h2>Poll tables may include demo rows</h2>
        <p>
          Poll tables in this MVP include seeded demo rows that are marked
          <strong> demo</strong>. Those rows are not real poll releases. When
          live cited polls are added, they should keep source, dates, and
          sample visible. National strips are also demo until labeled otherwise.
        </p>

        <h2>Results before certification are unofficial</h2>
        <p>
          Any returns displayed before a state or county certifies a contest are{" "}
          <strong>unofficial</strong>. {SITE.name} does not publish “certified
          results.” Recounts, provisional ballots, and canvass timelines are
          official processes. Do not treat a meter or table here as a final
          outcome.
        </p>

        <h2>No campaign fundraising</h2>
        <p>
          This site does not solicit contributions for candidates, parties, or
          PACs and does not host “donate to campaign” calls to action.
        </p>

        <h2>Limitation of liability</h2>
        <p>
          To the fullest extent permitted by law, {SITE.legalName} and its
          owners, operators, and writers are not liable for decisions, missed
          deadlines, incorrect precinct assumptions, or other losses arising
          from use of this site. See also the <Link href="/terms">terms of use</Link>.
        </p>

        <h2>Contact</h2>
        <p>
          Questions: <a href={contactMailto()}>{SITE.email}</a>. If you do not
          agree, do not use this website.
        </p>
      </div>
    </div>
  );
}
