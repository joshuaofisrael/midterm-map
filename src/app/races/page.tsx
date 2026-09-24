import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CrossLinks } from "@/components/CrossLinks";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { RaceCard } from "@/components/RaceCard";
import { RACES_HUB_FAQS } from "@/data/racesFaqs";
import { RACES, racesByChamber } from "@/data/races";
import { SITE } from "@/data/site";
import { faqJsonLd } from "@/lib/format";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "2026 race guides",
  description:
    "2026 U.S. midterm race guides for Senate, governor, and House contests in 12 states. Sourced candidate names, attributed ratings, and published polls. Not endorsements.",
  path: "/races",
});

const GROUPS = [
  { key: "senate" as const, title: "U.S. Senate" },
  { key: "governor" as const, title: "Governor" },
  { key: "house" as const, title: "U.S. House districts we cover" },
];

export default function RacesPage() {
  return (
    <div className="space-y-10">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Races", path: "/races" },
          ]),
          faqJsonLd(RACES_HUB_FAQS),
        ]}
      />
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "Races" }]} />
      <PageHeader
        eyebrow="Races"
        title="Race guides for the 2026 midterms"
        lede={`${RACES.length} guides cover Senate, governor, and selected House districts in our starter states. Candidate names are reported as of mid-September 2026. Party labels identify tickets only. Nothing here is an endorsement.`}
      />
      {GROUPS.map((group) => (
        <section key={group.key}>
          <h2 className="font-serif text-2xl font-semibold">{group.title}</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {racesByChamber(group.key).map((race) => (
              <RaceCard key={race.slug} race={race} />
            ))}
          </div>
        </section>
      ))}
      <section id="faq" className="rounded-xl border border-line bg-paper-card p-5">
        <h2 className="font-serif text-xl font-semibold">Questions readers ask</h2>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted">
          Short answers from the guides listed on this page. Party labels and ratings are not
          endorsements. Confirm anything that affects how you vote with your state or county
          election office.
        </p>
        <dl className="mt-5 space-y-5">
          {RACES_HUB_FAQS.map((faq) => (
            <div key={faq.question}>
              <dt className="font-semibold">{faq.question}</dt>
              <dd className="mt-1 text-sm leading-6 text-ink-muted">{faq.answer}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-5 text-sm">
          <Link className="font-medium text-navy hover:underline" href="/ballot">
            Ballot lookup
          </Link>
          {" · "}
          <Link className="font-medium text-navy hover:underline" href="/polls">
            Polls and ratings
          </Link>
          {" · "}
          <Link className="font-medium text-navy hover:underline" href="/results">
            Results tracker
          </Link>
          {" · "}
          <a className="font-medium text-navy hover:underline" href={SITE.voteGovUrl} rel="noopener noreferrer">
            Vote.gov
          </a>
        </p>
      </section>
      <CrossLinks />
    </div>
  );
}
