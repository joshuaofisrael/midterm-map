import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { contactMailto, SITE } from "@/data/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Terms of Use",
  description:
    `Terms for ${SITE.name}, operated by Joshua Israel Ventures LLC: informational use, Florida governing law, limitation of liability, and no campaign contribution solicitation.`,
  path: "/terms",
});

export default function TermsPage() {
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
        eyebrow={`Last updated ${SITE.legalLastUpdated}`}
        title="Terms of Use"
        lede={`By using ${SITE.name}, you agree to these terms.`}
      />
      <div className="prose-legal">
        <p>
          These Terms of Use are a contract between you and{" "}
          <strong>{SITE.legalName}</strong> (“we,” “us”) for use of {SITE.name}{" "}
          ({SITE.url}). {SITE.brandNote} If you do not agree, do not use the
          site.
        </p>

        <h2>Informational site</h2>
        <p>
          The site is a voter information utility provided for general
          informational purposes only. It is not an official election website,
          is not affiliated with any government agency, election office,
          candidate, party, or campaign, and does not process registration,
          ballot requests, or contributions. Nothing on the site is legal advice. Use is subject to the{" "}
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
          website.
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
          These terms are governed by the laws of the State of Florida, without
          regard to conflict-of-law rules, unless a mandatory consumer-protection
          law in your place of residence says otherwise. Subject to that
          exception, courts located in Florida shall have jurisdiction.
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
