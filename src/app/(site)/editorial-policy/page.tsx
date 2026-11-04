import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { SITE } from "@/data/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Editorial and corrections policy",
  description: `How ${SITE.name} chooses sources, writes election pages, handles results after Election Day, and corrects mistakes.`,
  path: "/editorial-policy",
});

export default function EditorialPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Editorial and corrections policy", path: "/editorial-policy" },
        ])}
      />
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "Editorial and corrections policy" }]} />
      <PageHeader
        eyebrow="Policy"
        title="Editorial and corrections policy"
        lede="How pages are written and checked, and how to report an error."
      />
      <div className="prose-legal">
        <p>Last updated: November 4, 2026.</p>
        <h2>Independence</h2>
        <p>
          {SITE.name} is an independent, nonpartisan reference site. It is not an official election
          website and is not affiliated with any government or election authority, candidate, party,
          or committee. We take no money from candidates, campaigns, parties, or PACs. Advertisers
          have no say over what we publish, and ads are always visually separate from page content.
        </p>
        <h2>Sources</h2>
        <p>
          Election dates, rules, and candidate lists come from state and county election offices,
          Vote.gov, statutes, and the U.S. Census Bureau. Polls and race ratings are shown only with
          the outlet, the date, and a link. Every factual page lists or links its sources; the full
          list is on the <Link href="/sources">sources page</Link>.
        </p>
        <h2>Results and the 2026 election</h2>
        <p>
          The 2026 general election was held on {SITE.electionDayLabel}. Results shown here are
          unofficial until each state certifies them. Official, certified totals come only from
          state and county election offices. We do not call races or make forecasts of our own.
        </p>
        <h2>Templated place pages</h2>
        <p>
          Census place pages share a layout and pull facts from public data files. Pages without
          enough place-specific information are marked noindex and left out of the sitemap so that
          search engines and readers find the pages with real local content.
        </p>
        <h2>Corrections</h2>
        <p>
          If you find an error, use the <Link href="/contact">contact form</Link> and include the
          page address and the source that shows the correct fact. We check reports against the
          primary source, fix confirmed errors promptly, and update the page’s “Last updated” date.
          Significant corrections are noted on the page that changed. Copyright notices are handled
          on the <Link href="/copyright">copyright page</Link>.
        </p>
        <p>
          See also: <Link href="/about">About</Link> · <Link href="/image-policy">Image policy</Link> ·{" "}
          <Link href="/disclaimer">Disclaimer</Link>
        </p>
      </div>
    </div>
  );
}
