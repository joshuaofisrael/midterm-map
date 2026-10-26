import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { EDITORIAL_TEAM } from "@/data/editorial";
import { tipJarEnabled } from "@/data/monetization";
import { absoluteUrl, SITE } from "@/data/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "About",
  description: `About ${SITE.name}, an unofficial 2026 midterms voter information utility. Not affiliated with any government or election authority.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: `About ${SITE.name}`,
            url: absoluteUrl("/about"),
            author: EDITORIAL_TEAM,
            isPartOf: { "@id": `${SITE.url}/#organization` },
          },
        ]}
      />
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "About" }]} />
      <PageHeader
        eyebrow="About"
        title={`About ${SITE.name}`}
        lede="A voter information utility for the 2026 U.S. midterms."
      />
      <p className="mb-6 text-sm font-medium text-ink">By Map the Midterms Editorial Team</p>
      <div className="prose-legal">
        <h2>What this site is</h2>
        <p>
          {SITE.name} is a public-facing informational hub. It gathers three
          tools in one place: a structured sample-ballot sketch, sourced race
          guides with cited polls and attributed ratings, and a results tracker
          for Election Day {SITE.electionDayLabel}. The goal is plain-English
          orientation — not persuasion.
        </p>
        <ul>
          <li>Neutral, factual framing for voters, journalists, and students</li>
          <li>Cross-links among ballot, races, polls, and results</li>
          <li>Visible sources on candidate facts, ratings, and poll rows</li>
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

        <h2>How the site is funded</h2>
        <p>
          {tipJarEnabled()
            ? "Readers who find this site useful can leave an optional tip through Stripe (“Keep this map free”). Tips are not political contributions and are not tax-deductible. "
            : ""}
          In the future we may add affiliate links, for example to civics and
          election books; any page with affiliate links will say so directly
          above them. We take no money or advertising from candidates,
          campaigns, parties, or PACs, and tips or commissions do not affect
          what we cover or how we describe it.
        </p>

        <h2>Editorial approach</h2>
        <p>
          Candidate names and party labels, when they appear, are for
          identification of an office or ticket only. Bios are short original
          paraphrases with outbound links. Race ratings appear only when a
          named outlet is cited. We prefer conservative wording over
          traffic-chasing claims.
        </p>
        <p>
          Read the <Link href="/disclaimer">disclaimer</Link>,{" "}
          <Link href="/privacy">privacy policy</Link>,{" "}
          <Link href="/terms">terms of use</Link>,{" "}
          <Link href="/copyright">copyright and corrections</Link> page, and{" "}
          <Link href="/advertising">advertising disclosure</Link>. Corrections: use the{" "}
          <Link href="/contact">contact form</Link>.
        </p>
      </div>
    </div>
  );
}
