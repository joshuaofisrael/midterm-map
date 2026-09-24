import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CrossLinks } from "@/components/CrossLinks";
import { JsonLd } from "@/components/JsonLd";
import { OfficialNotice } from "@/components/OfficialNotice";
import { PageHeader } from "@/components/PageHeader";
import { PollTable } from "@/components/PollTable";
import { RatingBoard } from "@/components/RatingBoard";
import { POLLS_HUB_FAQS } from "@/data/pollsFaqs";
import { NATIONAL_GENERIC_BALLOT, POLLS } from "@/data/polls";
import { SITE } from "@/data/site";
import { AGGREGATORS } from "@/data/sources";
import { faqJsonLd } from "@/lib/format";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "2026 polls and race ratings",
  description:
    "Published 2026 midterm polls with pollster, dates, sample, and source links, plus race ratings attributed to Cook, Inside Elections, Sabato, and Decision Desk HQ. Not a live forecast.",
  path: "/polls",
});

export default function PollsPage() {
  return (
    <div className="space-y-10">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Polls", path: "/polls" },
          ]),
          faqJsonLd(POLLS_HUB_FAQS),
        ]}
      />
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "Polls" }]} />
      <PageHeader
        eyebrow="Polls"
        title="Polls and race ratings"
        lede="Individual published surveys for key 2026 Senate and governor races, plus ratings that a named outlet has actually published. This page is not a polling average and not a prediction of control."
      />
      <OfficialNotice compact />

      <section className="rounded-xl border border-line bg-paper-card p-5">
        <h2 className="font-serif text-xl font-semibold">National generic ballot</h2>
        <p className="mt-2 text-sm text-ink-muted">
          Two recent public surveys compiled via PollingSource. Averages move. Check{" "}
          <a className="text-navy underline" href={AGGREGATORS.rcpGeneric.href} rel="noopener noreferrer">
            RealClearPolitics
          </a>{" "}
          and{" "}
          <a className="text-navy underline" href={AGGREGATORS.fte.href} rel="noopener noreferrer">
            FiveThirtyEight / ABC
          </a>{" "}
          for live aggregations. Not a prediction of House control.
        </p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {NATIONAL_GENERIC_BALLOT.map((row) => (
            <li key={row.label} className="rounded-lg border border-line bg-paper-tint p-4">
              <p className="text-sm font-semibold">{row.label}</p>
              <p className="mt-2 text-sm">
                Dem {row.dem} · Rep {row.rep}
              </p>
              <p className="mt-1 text-xs text-ink-muted">
                {row.dates} · {row.sample}
              </p>
              <p className="mt-2 text-xs">
                <a className="text-navy hover:underline" href={row.source.url} rel="noopener noreferrer">
                  {row.source.name}
                </a>
                {row.source.accessed ? ` · accessed ${row.source.accessed}` : ""}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <RatingBoard />
      <PollTable rows={POLLS} caption="Published 2026 surveys we can cite" />
      <section id="faq" className="rounded-xl border border-line bg-paper-card p-5">
        <h2 className="font-serif text-xl font-semibold">Questions readers ask</h2>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted">
          Short answers from the surveys, ratings, and aggregator links already on this page. A
          number here is not a prediction. Confirm anything that affects how you vote with your
          election office.
        </p>
        <dl className="mt-5 space-y-5">
          {POLLS_HUB_FAQS.map((faq) => (
            <div key={faq.question}>
              <dt className="font-semibold">{faq.question}</dt>
              <dd className="mt-1 text-sm leading-6 text-ink-muted">{faq.answer}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-5 text-sm">
          <Link className="font-medium text-navy hover:underline" href="/races">
            Race guides
          </Link>
          {" · "}
          <Link className="font-medium text-navy hover:underline" href="/ballot">
            Ballot lookup
          </Link>
          {" · "}
          <a className="font-medium text-navy hover:underline" href={AGGREGATORS.rcp.href} rel="noopener noreferrer">
            RealClearPolitics
          </a>
          {" · "}
          <a className="font-medium text-navy hover:underline" href={AGGREGATORS.fte.href} rel="noopener noreferrer">
            FiveThirtyEight / ABC
          </a>
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
