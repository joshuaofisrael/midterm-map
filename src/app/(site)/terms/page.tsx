import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CopyrightNotice } from "@/components/CopyrightNotice";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { affiliateEnabled, tipJarEnabled } from "@/data/monetization";
import { SITE } from "@/data/site";
import { LEGAL } from "@/data/legalEntity";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Terms of Use",
  description:
    `Terms for ${SITE.name}, operated by Joshua Israel Ventures LLC: information only, not legal, political, voting, or financial advice, no warranty, use at your own risk, limitation of liability, indemnification, and Florida, USA governing law.`,
  path: "/terms",
});

export default function TermsPage() {
  const tips = tipJarEnabled();
  const affiliates = affiliateEnabled();
  return (
    <div className="mx-auto max-w-3xl">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Terms", path: "/terms" },
        ])}
      />
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "Terms" }]} />
      <PageHeader
        eyebrow={`Last updated ${SITE.policyLastUpdated}`}
        title="Terms of Use"
        lede={`By using ${SITE.name}, you agree to these terms.`}
      />
      <div className="prose-legal">
        <p>
          These Terms of Use are a contract between you and{" "}
          <strong>{LEGAL.legalName}</strong> (“we,” “us”) for use of {SITE.name}{" "}
          ({SITE.url}). {LEGAL.legalName} is a {LEGAL.entityType}. If you do
          not agree, do not use the site.
        </p>

        <h2>Who you are dealing with</h2>
        <p>
          {LEGAL.brandNote} {SITE.name} is owned by {LEGAL.legalName}. Whenever
          you use the site, sign up for an email alert, leave a tip, or contact
          us, you are dealing with {LEGAL.legalName}, and {LEGAL.legalName} is the
          only party to these terms on our side.
        </p>

        <h2>Informational site</h2>
        <p>
          The site is a voter information utility provided for general
          informational purposes only. It is not an official election website,
          is not affiliated with any government agency, election office,
          candidate, party, or campaign, and does not process registration,
          ballot requests, or political contributions.
        </p>
        <p>
          All content is general information only. It is not legal, political,
          voting, election-administration, financial, tax, or other professional
          advice, and using the site does not create an attorney-client,
          adviser, or other professional relationship with {LEGAL.legalName}.
          Election information changes. Official state and county election
          offices are the authority on ballots, registration, deadlines, voting
          rules, and results. Check those official sources before you rely on a
          date, a candidate list, a poll, or a return. Accuracy and timeliness
          are not guaranteed. Use is subject to the{" "}
          <Link href="/disclaimer">disclaimer</Link> and{" "}
          <Link href="/privacy">privacy policy</Link>, which are part of these
          terms.
        </p>

        <h2>Your responsibilities</h2>
        <ul>
          <li>Verify ballots, districts, deadlines, and ID rules with official election offices</li>
          <li>Treat poll numbers and ratings as citations of third-party publications, not as our forecast</li>
          <li>Treat any returns as unofficial until the relevant authority certifies them</li>
          <li>Do not misuse the site to scrape, attack, or impersonate a government office</li>
        </ul>

        <h2>No campaign contribution solicitation</h2>
        <p>
          {SITE.name} does not solicit campaign contributions for candidates,
          parties, or political committees. Do not treat any page as a
          fundraising appeal. We do not accept campaign donations through this
          website. We do not accept money or advertising from candidates,
          campaigns, parties, or political action committees.
          {tips ? " Optional tips go to " + LEGAL.legalName + " to support the site, not to any candidate, party, or committee." : ""}
        </p>

        {tips && (
          <>
            <h2>Tips</h2>
            <p>
              You may choose to leave a voluntary tip through the “Keep this map
              free” link. A tip is a payment to {LEGAL.legalName} to help cover
              the cost of running the site. It is not a political contribution,
              not a charitable donation, and not tax-deductible. A tip does not
              buy any product, service, account, or influence over what we
              publish, and the site is the same whether or not you tip. Payments
              are processed by Stripe, Inc. under Stripe’s own terms. If you tip
              by mistake or in the wrong amount, use the{" "}
              <Link href="/contact">contact form</Link> within 30 days and we
              will review the request and refund it where appropriate. Refunds
              are otherwise not guaranteed, except where the law requires.
            </p>
          </>
        )}

        <h2>Email alerts</h2>
        <p>
          If you use the “Get election-night updates” form, you agree that we may email you election
          updates. We collect that email address only to send those updates. You can ask us to
          remove it through the contact form. The <Link href="/privacy/#election-updates">privacy policy</Link>{" "}
          describes how the address is handled.
        </p>

        <h2>Affiliate links and advertising</h2>
        <p>
          {affiliates
            ? "Some pages contain affiliate links. If you buy through them, " + LEGAL.legalName + " may earn a commission at no extra cost to you. Each page with affiliate links shows a disclosure directly above them. Commissions do not affect which races, candidates, polls, or facts we cover, and reading lists are chosen for relevance and balance, not commission rates. Purchases are made from the retailer under its own terms."
            : "The site does not currently contain affiliate links. If we add them, each page with affiliate links will show a disclosure directly above them, and commissions will not affect which races, candidates, polls, or facts we cover."}{" "}
          Advertising practices are described on the{" "}
          <Link href="/advertising">advertising and affiliate disclosure</Link> page.
        </p>

        <h2>Accuracy and corrections</h2>
        <p>
          We try to cite an official or published source for every date,
          candidate detail, poll, and rating, and to note when each was last
          checked. Election information changes, and we cannot guarantee that
          any item is complete, accurate, or current. If you see an error, use
          the <Link href="/contact">contact form</Link> with the page address
          and the correction. How we review a report, and how a correction is
          logged, is described on the{" "}
          <Link href="/copyright">copyright and corrections</Link> page.
        </p>

        <h2>Third-party sites and content</h2>
        <p>
          The site links to official election offices, Vote.gov, news outlets,
          pollsters, rating publishers, Ballotpedia, Wikipedia, and other
          sites. A link is not an endorsement of that site, its operator, its
          authors, a candidate, a party, or anything that other site publishes. We do
          not control those sites and are not responsible for their content,
          availability, privacy practices, or products. Polls and race ratings
          are the work of the organizations named next to them.
        </p>

        <h2>Opinions and analysis</h2>
        <p>
          Where a page states an analysis or an opinion, that analysis is{" "}
          {LEGAL.legalName}’s own. It is not a statement by a candidate, party,
          campaign, or election office, and it is not advice. Ratings, poll
          numbers, and other figures that name another outlet are quotations of
          that outlet, not our opinion and not our forecast.
        </p>

        <h2>Market odds</h2>
        <p>
          The site does not currently show prediction-market prices, betting
          odds, or implied probabilities. If a page shows them, those figures
          are third-party market data for information only. They are not a
          prediction of election results, not the chance that a candidate will
          win, not betting or wagering advice, and not a solicitation to gamble.{" "}
          {LEGAL.legalName} does not accept wagers and is not a sportsbook or a
          prediction market.
        </p>

        <h2>Intellectual property</h2>
        <p>
          Site design and original text are owned by {LEGAL.legalName} unless
          otherwise noted. Candidate photos are used under the public-domain
          status or Creative Commons license shown in each photo credit and in
          the site’s{" "}
          <a href="/ATTRIBUTION.md">image attribution list</a>; those photos
          remain subject to their own licenses. Candidate, party, office,
          outlet, pollster, and geographic names appear for identification
          only (nominative use) and do not imply endorsement or affiliation.
          Official election materials remain the responsibility of the offices
          that publish them.
        </p>
        <p>
          If you believe material on the site infringes your copyright or
          other rights, use the <Link href="/contact">contact form</Link>. The
          notice process is on the{" "}
          <Link href="/copyright">copyright and corrections</Link> page. We
          will review the request and remove or correct material where
          appropriate.
        </p>

        <h2>Use at your own risk</h2>
        <p>
          You use {SITE.name} and everything on it entirely at your own risk.
          You are responsible for any decision you make after reading the site,
          including a voting decision. We do not guarantee that the site will
          be available, uninterrupted, or error-free.
        </p>

        <h2>Disclaimer of warranties</h2>
        <p>
          The site is provided “as is” and “as available,” without warranties of
          any kind, express or implied, including merchantability, fitness for a
          particular purpose, and non-infringement, to the extent allowed by
          law. We do not warrant completeness, timeliness, or official status of
          any ballot, rating, poll, or return.
        </p>

        <h2>Limitation of liability</h2>
        <p>
          To the fullest extent permitted by law, {LEGAL.legalName} and its
          owners, officers, employees, contractors, and writers shall not be
          liable for any damages arising from your use of the site or from
          reliance on its content — including missed elections, incorrect
          district assumptions, or unofficial returns — whether based on
          contract, tort (including negligence), or any other theory.
        </p>
        <p>
          If a jurisdiction does not allow a complete exclusion, our total
          aggregate liability to you for all claims shall not exceed one hundred
          U.S. dollars (US $100). Nothing here limits liability that cannot be
          limited under applicable law.
        </p>

        <h2>Indemnification</h2>
        <p>
          You agree to indemnify, defend, and hold harmless {LEGAL.legalName} and
          its members, managers, officers, employees, contractors, and writers
          from and against claims, damages, losses, liabilities, and expenses,
          including reasonable attorneys’ fees, arising out of your use of the
          site, your reliance on its content, your violation of these terms, or
          your violation of any law or third-party right, to the fullest extent
          permitted by law. We may assume the exclusive defense of any matter
          subject to this indemnity, and you agree to cooperate with that
          defense.
        </p>

        <h2>Governing law</h2>
        <p>
          These terms, and any dispute about the site or these terms, are
          governed by the laws of the State of Florida and the applicable laws
          of the United States, without regard to conflict-of-law rules, unless
          a mandatory consumer-protection law in your place of residence says
          otherwise. Subject to that exception, the state and federal courts
          located in the State of Florida, USA, have jurisdiction.
        </p>

        <h2>Severability</h2>
        <p>
          If any part of these terms is found unenforceable, the rest remains
          in effect.
        </p>

        <h2>Changes</h2>
        <p>
          We may update these terms. The “Last updated” date will change when we
          do. Continued use after changes constitutes acceptance where permitted
          by law.
        </p>

        <h2>Contact</h2>
        <p>
          {LEGAL.legalName}, a {LEGAL.entityType}. Mailing address: {LEGAL.mailingAddress}.
          Questions about these terms go through the <Link href="/contact">contact page</Link>.
          See also the <Link href="/disclaimer">disclaimer</Link>, the{" "}
          <Link href="/privacy">privacy policy</Link>, the{" "}
          <Link href="/advertising">advertising disclosure</Link>, and the{" "}
          <Link href="/copyright">copyright and corrections</Link> page.
        </p>
        <CopyrightNotice />
      </div>
    </div>
  );
}
