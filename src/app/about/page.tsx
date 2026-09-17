import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { contactMailto, SITE } from "@/data/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "About",
  description: `About Midterm Map, a 2026 midterms voter information utility operated by ${SITE.legalName}.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "About" }]} />
      <PageHeader
        eyebrow="About"
        title="Who operates Midterm Map"
        lede="A voter information utility for the 2026 U.S. midterms, published by Joshua Israel Ventures LLC."
      />
      <div className="prose-legal">
        <h2>Who we are</h2>
        <p>
          <strong>{SITE.name}</strong> is owned and operated by{" "}
          <strong>{SITE.legalName}</strong>, a {SITE.entityType} (Sunbiz document
          number {SITE.sunbizDocumentNumber}, {SITE.sunbizStatus}). The company
          is associated with {SITE.location}. {SITE.brandNote}
        </p>
        <p>
          Contact:{" "}
          <a href={contactMailto()}>{SITE.email}</a> with the subject line{" "}
          {SITE.emailSubject}.
        </p>

        <h2>What this site is</h2>
        <p>
          Midterm Map is a public-facing informational hub. It gathers three
          tools in one place: a structured sample-ballot sketch, race-guide
          templates with poll and rating modules, and a results-tracker shell
          for Election Day {SITE.electionDayLabel}. The goal is plain-English
          orientation — not persuasion.
        </p>
        <ul>
          <li>Neutral, factual framing for voters, journalists, and students</li>
          <li>Cross-links among ballot, races, polls, and results</li>
          <li>Clear labels when data is demo, illustrative, or unofficial</li>
          <li>Pointers to official state, county, and Vote.gov sources</li>
        </ul>

        <h2>What this site is not</h2>
        <ul>
          <li>Not an official government, secretary of state, or county election website</li>
          <li>Not a voting guide endorsement and not legal, campaign-finance, or election-administration advice</li>
          <li>Not a political committee, PAC, or candidate campaign</li>
          <li>Not a place to donate to candidates or committees</li>
          <li>Not a voter-file product and not a registration or ballot-request processor</li>
          <li>Not a live certified-results service</li>
        </ul>

        <h2>Editorial approach</h2>
        <p>
          Candidate names and party labels, when they appear, are for
          identification of an office or ticket only. Until certified nominee
          lists are wired in, placeholder lines are marked demo. Race ratings
          are editorial illustrations unless a later version says otherwise.
          We prefer conservative wording over traffic-chasing claims.
        </p>
        <p>
          Read the <Link href="/disclaimer">disclaimer</Link>,{" "}
          <Link href="/privacy">privacy policy</Link>, and{" "}
          <Link href="/terms">terms of use</Link>. Corrections: email{" "}
          <a href={contactMailto()}>{SITE.email}</a>.
        </p>
      </div>
    </div>
  );
}
