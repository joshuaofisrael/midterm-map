import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { OfficialNotice } from "@/components/OfficialNotice";
import { PageHeader } from "@/components/PageHeader";
import { affiliateEnabled, tipJarEnabled } from "@/data/monetization";
import { contactMailto, SITE } from "@/data/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Disclaimer",
  description:
    `Election-information disclaimer for ${SITE.name}: not an official government site, not legal advice, not an endorsement, nonpartisan, with tip and affiliate disclosures. Map the Midterms is a brand of Joshua Israel Ventures LLC. Verify ballots and results with official authorities.`,
  path: "/disclaimer",
});

export default function DisclaimerPage() {
  const tips = tipJarEnabled();
  const affiliates = affiliateEnabled();
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
        eyebrow={`Last updated ${SITE.legalLastUpdated}`}
        title="Disclaimer"
        lede={`Read this before you rely on anything on ${SITE.name}.`}
      />
      <OfficialNotice />
      <div className="prose-legal">
        <h2>Who operates this site</h2>
        <p>
          {SITE.brandNote} Any reference to “{SITE.name},” “we,” or “us” means{" "}
          {SITE.legalName}.
        </p>

        <h2>Informational only, no professional relationship</h2>
        <p>
          {SITE.name} is operated by {SITE.legalName}. Content is for general
          voter information and civic orientation. It is{" "}
          <strong>not legal advice</strong>, not voting or
          election-administration advice, and not financial, tax, or
          professional advice of any other kind. Using the site, emailing us,
          or signing up for an alert does not create an attorney-client,
          adviser, or other professional relationship.
        </p>

        <h2>Accuracy and official sources</h2>
        <p>
          We cite an official or published source for dates, candidate details,
          polls, and ratings, and we show when items were last checked. We do
          not guarantee that anything on the site is complete, accurate, or
          current. Official state and county election offices, and the
          statutes and notices they publish, are the authority. If this site
          and an official source differ, the official source controls.
        </p>

        <h2>Not an official election website</h2>
        <p>
          This site is <strong>not</strong> a government website. It is not a
          secretary of state site, not a county election office, not a board of
          elections, and not Vote.gov. {SITE.legalName} is not affiliated
          with, endorsed by, or acting for any government agency or election
          office. We do not issue ballots, process
          registration, accept ballot requests, or certify results. Seals,
          flags, and .gov styling are not used as official marks here.
        </p>

        <h2>Nonpartisan; not an endorsement</h2>
        <p>
          {SITE.name} is nonpartisan. Nothing on this site is an endorsement of a candidate, party, ticket,
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
          authority and with the sample ballot those offices publish. Election
          dates on this site can change. Each date is only as current as the
          official page or statute it cites and the “last checked” date shown
          with it. “Passed,” “Deadline today,” and “Upcoming” markers are
          calculated from your device’s date and do not account for cutoff
          times or time zones.
        </p>

        <h2>Race ratings are quotations, not our forecast</h2>
        <p>
          Solid / Likely / Lean / Tossup placements appear only when a named
          outlet (for example Cook Political Report, Inside Elections, or
          Sabato’s Crystal Ball) has published a rating we can link. They are
          not a Map the Midterms forecast and not a guarantee of outcomes.
        </p>

        <h2>Poll tables show cited surveys only</h2>
        <p>
          Poll tables list individual published surveys with pollster, dates,
          sample, and a source link. We do not invent numbers. If a race has no
          public poll we can cite, the page says so and points to RealClearPolitics
          and FiveThirtyEight / ABC. National generic-ballot rows are likewise
          individual published surveys, not our average.
        </p>

        <h2>Results before certification are unofficial</h2>
        <p>
          Any returns displayed before a state or county certifies a contest are{" "}
          <strong>unofficial</strong>. {SITE.name} does not publish “certified
          results.” Recounts, provisional ballots, and canvass timelines are
          official processes. Do not treat a meter or table here as a final
          outcome.
        </p>

        <h2>Candidate information and photos</h2>
        <p>
          Candidate bios are short, neutral summaries of public records and
          cited reporting, with a source listed under each one. They are not
          complete biographies and are not statements of our opinion. Photos
          appear only when a public-domain or Creative Commons image is
          available, with credit and license shown; a missing photo does not
          reflect any judgment about a candidate. To report an error, email{" "}
          <a href={contactMailto()}>{SITE.email}</a>.
        </p>

        <h2>No campaign fundraising</h2>
        <p>
          This site does not solicit contributions for candidates, parties, or
          PACs and does not host “donate to campaign” calls to action.
        </p>

        <h2>Tips and affiliate links (FTC disclosure)</h2>
        <p>
          {tips
            ? `Readers can leave an optional tip through a Stripe Payment Link. Tips are paid to ${SITE.legalName}, not to any candidate, party, or committee; they are not political contributions, are not tax-deductible, and do not affect what we publish.`
            : "The site does not currently accept tips."}{" "}
          {affiliates
            ? `Some pages contain affiliate links. When a page shows them, ${SITE.legalName} may earn a commission if you buy through them, at no extra cost to you, and a disclosure appears directly above the links.`
            : `The site does not currently show affiliate links. If it does in the future, ${SITE.legalName} may earn a commission when you buy through them, at no extra cost to you, and a disclosure will appear directly above the links.`}{" "}
          Tips and commissions never affect which races, candidates, polls, or
          facts we cover. We accept no money or advertising from candidates,
          campaigns, parties, or PACs.
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
