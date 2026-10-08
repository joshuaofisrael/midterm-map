import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { affiliateEnabled, emailSignupEnabled, tipJarEnabled } from "@/data/monetization";
import { contactMailto, SITE } from "@/data/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Terms of Use",
  description:
    `Terms for ${SITE.name}, operated by Joshua Israel Ventures LLC: informational use, Florida governing law, limitation of liability, voluntary tips, email alerts, affiliate links, and no campaign contribution solicitation.`,
  path: "/terms",
});

export default function TermsPage() {
  const tips = tipJarEnabled();
  const signup = emailSignupEnabled();
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
          <strong>{SITE.legalName}</strong> (“we,” “us”) for use of {SITE.name}{" "}
          ({SITE.url}). {SITE.legalName} is a {SITE.entityType}. If you do
          not agree, do not use the site.
        </p>

        <h2>Who you are dealing with</h2>
        <p>
          {SITE.brandNote} {SITE.name} is owned by {SITE.legalName}. Whenever
          you use the site, sign up for an email alert, leave a tip, or contact
          us, you are dealing with {SITE.legalName}, and {SITE.legalName} is the
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
          All content is general information only. It is not legal, voting,
          election-administration, financial, tax, or other professional advice,
          and using the site does not create a professional or advisory
          relationship with {SITE.legalName}. Official state and county
          election offices are the authority on ballots, registration,
          deadlines, voting rules, and results. Use is subject to the{" "}
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
          {tips ? " Optional tips go to " + SITE.legalName + " to support the site, not to any candidate, party, or committee." : ""}
        </p>

        {tips && (
          <>
            <h2>Tips</h2>
            <p>
              You may choose to leave a voluntary tip through the “Keep this map
              free” link. A tip is a payment to {SITE.legalName} to help cover
              the cost of running the site. It is not a political contribution,
              not a charitable donation, and not tax-deductible. A tip does not
              buy any product, service, account, or influence over what we
              publish, and the site is the same whether or not you tip. Payments
              are processed by Stripe, Inc. under Stripe’s own terms. If you tip
              by mistake or in the wrong amount, email{" "}
              <a href={contactMailto()}>{SITE.email}</a> within 30 days and we
              will review the request and refund it where appropriate. Refunds
              are otherwise not guaranteed, except where the law requires.
            </p>
          </>
        )}

        <h2>Email alerts</h2>
        <p>
          {signup
            ? "If you sign up for the election night results alert, you agree to receive the emails described at sign-up: one email with links to official results on election night and occasional site updates. You can unsubscribe at any time using the link in every email. See the privacy policy for how your email address is handled."
            : "The site does not currently offer an email sign-up. If we add an optional election night results alert and you sign up, you will receive only the emails described at sign-up and can unsubscribe at any time using the link in every email."}
        </p>

        <h2>Affiliate links</h2>
        <p>
          {affiliates
            ? "Some pages contain affiliate links. If you buy through them, " + SITE.legalName + " may earn a commission at no extra cost to you. Each page with affiliate links shows a disclosure directly above them. Commissions do not affect which races, candidates, polls, or facts we cover, and reading lists are chosen for relevance and balance, not commission rates. Purchases are made from the retailer under its own terms."
            : "The site does not currently contain affiliate links. If we add them, each page with affiliate links will show a disclosure directly above them, and commissions will not affect which races, candidates, polls, or facts we cover."}
        </p>

        <h2>Accuracy and corrections</h2>
        <p>
          We try to cite an official or published source for every date,
          candidate detail, poll, and rating, and to note when each was last
          checked. Elections change quickly, and we cannot guarantee that any
          item is complete or current. If you see an error, email{" "}
          <a href={contactMailto()}>{SITE.email}</a> with the page address and
          the correction, and we will review it promptly.
        </p>

        <h2>Third-party sites and content</h2>
        <p>
          The site links to official election offices, Vote.gov, news outlets,
          pollsters, rating publishers, Ballotpedia, Wikipedia, and other
          sites. We do not control those sites and are not responsible for
          their content, availability, or privacy practices. Polls and race
          ratings are the work of the organizations named next to them.
        </p>

        <h2>Intellectual property</h2>
        <p>
          Site design and original text are owned by {SITE.legalName} unless
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
          other rights, email <a href={contactMailto()}>{SITE.email}</a> with
          the page address, a description of the material, and your contact
          information. We will review the request and remove or correct
          material where appropriate.
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
          To the fullest extent permitted by law, {SITE.legalName} and its
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

        <h2>Governing law</h2>
        <p>
          These terms, and any dispute about the site or these terms, are
          governed by the laws of the State of Florida, without regard to
          conflict-of-law rules, unless a mandatory consumer-protection law in
          your place of residence says otherwise. Subject to that exception,
          the state and federal courts located in the State of Florida shall
          have jurisdiction.
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
          {SITE.legalName}
          <br />
          {SITE.location}
          <br />
          <a href={contactMailto()}>{SITE.email}</a>
        </p>
      </div>
    </div>
  );
}
