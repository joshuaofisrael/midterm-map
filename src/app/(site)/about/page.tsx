import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Byline } from "@/components/Byline";
import { ContentTrust } from "@/components/ContentTrust";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { EDITORIAL_TEAM } from "@/data/editorial";
import { tipJarEnabled } from "@/data/monetization";
import { absoluteUrl, SITE } from "@/data/site";
import { contentUpdatedLabel } from "@/lib/contentDate";
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
      <Byline />
      <div className="mb-6">
        <ContentTrust updated={contentUpdatedLabel("/about")} pagePath="/about" />
      </div>
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

        <h2>Editorial methods and sources</h2>
        <p>
          The byline on explainers, race previews, and state briefings is the{" "}
          <Link href="/learn">Map the Midterms Editorial Team</Link>. It is an
          organization, not a personal name. Pages that identify the operating
          company are the legal pages linked below. Explainers do not repeat
          that identification.
        </p>
        <p>
          A fact in an explainer or a preview is tied to a page a reader can
          open. Election offices, the Clerk of the U.S. House, the Senate’s
          class and terms pages, the Constitution and the U.S. Code, the Census
          Bureau’s voting and registration series, and a state’s canvass are
          the usual primary sources. A poll appears only when this site stores
          the pollster, the dates, the sample, and a link. A race rating appears
          only with the outlet’s name, the label that outlet used, and the date
          on the guide. The label is that outlet’s judgment. It is not a
          forecast by this site.
        </p>
        <p>
          The wording is written here. Pages link to a statute, a canvass, a
          candidate’s site, or a news report. They do not paste those pages. A
          candidate’s public statement is included only when the sentence cites
          the page where the candidate, or a reputable outlet quoting the
          candidate, published it. When the citation on hand is an
          election-office candidate list, the preview says the list identifies
          who is on the ballot. It does not invent a speech.
        </p>
        <p>
          The team does not predict who will win, does not call a race, and
          does not average polls into a model. One survey can be described with
          its sponsor and its dates. A reader who wants a forecast should open
          the outlet that publishes one and read that outlet’s methods.
        </p>
        <p>
          “Last updated” is the latest stored date among the sources and
          deadline checks the page renders, including this methods section
          where it appears. It is not a promise that every figure was re-read
          that morning. The{" "}
          <Link href="/sources">sources page</Link> lists the Census files
          behind place directories. Those directories stay on that file list.
        </p>
        <p>
          The <Link href="/learn">learn library</Link> is evergreen civics: how
          a House or Senate majority is counted, how mail and provisional
          ballots move a total, what a recount and a certification are, and
          what the Electoral Count Reform Act changed about presidential
          electoral votes. Those pages are linked from the navigation and from
          the state and race pages that use the idea.
        </p>
        <p>
          Candidate names and party labels, when they appear, identify an
          office or a ticket only. Bios are short original paraphrases with
          outbound links. We prefer a narrower sentence over a louder one.
          Corrections use the <Link href="/contact">contact form</Link>. The{" "}
          <Link href="/copyright">copyright and corrections</Link> page says
          what a report should include.
        </p>
        <h2>Use of AI tools</h2>
        <p>
          The team uses AI writing and research tools to help draft, check,
          and organize pages. A draft is not published because a tool wrote
          it. Facts, dates, and figures are checked against the official or
          reputable source the page cites, and an independent automated review
          screens new text for unsupported claims before it goes live. Where
          the site shows an illustration made with an AI image tool, it is
          labeled as AI-generated. Results and vote counts are never generated
          by AI; they come from the cited election office or a named outlet.
          If you find a mistake, use the <Link href="/contact">contact form</Link>.
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
