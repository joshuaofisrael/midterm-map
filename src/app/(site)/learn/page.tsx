import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { HouseAd } from "@/components/HouseAd";
import { Byline } from "@/components/Byline";
import { ContentTrust } from "@/components/ContentTrust";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { LEARN_ARTICLES } from "@/data/learn/articles";
import { SITE } from "@/data/site";
import { contentUpdatedLabel } from "@/lib/contentDate";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Election explainers",
  description:
    "Original explainers on House and Senate majorities, mail ballots, certification, recounts, and the Electoral Count Reform Act. Not an official election site.",
  path: "/learn",
});

export default function LearnIndexPage() {
  return (
    <div className="space-y-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Learn", path: "/learn" },
        ])}
      />
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "Learn" }]} />
      <PageHeader
        eyebrow="Learn"
        title="How the election is counted"
        lede={`${SITE.name} explainers on offices, ballots, and results. The wording is ours. The rules belong to election offices and to statute. Nothing here predicts a winner.`}
      />
      <Byline className="mt-0" />
      <ContentTrust updated={contentUpdatedLabel("/learn")} pagePath="/learn" />
      <ul className="grid gap-4 md:grid-cols-2">
        {LEARN_ARTICLES.map((article) => (
          <li key={article.slug} className="rounded-xl border border-line border-t-4 border-t-navy bg-paper-card p-5 shadow-card">
            <h2 className="font-serif text-xl font-semibold">
              <Link className="hover:text-navy" href={`/learn/${article.slug}`}>
                {article.title}
              </Link>
            </h2>
            <p className="mt-2 text-sm leading-6 text-ink-muted">{article.description}</p>
          </li>
        ))}
      </ul>
      <HouseAd path="/learn" />
    </div>
  );
}
