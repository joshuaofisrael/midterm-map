import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Byline } from "@/components/Byline";
import { ContentTrust } from "@/components/ContentTrust";
import { EssayParagraphs } from "@/components/EditorialSection";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { getLearnArticle, LEARN_ARTICLES } from "@/data/learn/articles";
import { contentUpdatedLabel } from "@/lib/contentDate";
import { learnArticleJsonLd } from "@/lib/learnSchema";
import { pageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return LEARN_ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getLearnArticle(slug);
  if (!article) return {};
  return pageMetadata({
    title: article.title,
    description: article.description,
    path: `/learn/${article.slug}`,
  });
}

export default async function LearnArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getLearnArticle(slug);
  if (!article) notFound();
  const path = `/learn/${article.slug}`;
  const related = article.related
    .map((relatedSlug) => getLearnArticle(relatedSlug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <div className="space-y-8">
      <JsonLd data={learnArticleJsonLd(article)} />
      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { href: "/learn", label: "Learn" },
          { label: article.title },
        ]}
      />
      <PageHeader eyebrow="Learn" title={article.title} lede={article.description} />
      <Byline className="mt-0" />
      <ContentTrust updated={contentUpdatedLabel(path)} pagePath={path} />
      <article className="rounded-xl border border-line bg-paper-card p-5 shadow-card sm:p-6">
        <EssayParagraphs paragraphs={article.paragraphs} />
        <div className="mt-6 border-t border-line pt-4">
          <h2 className="font-serif text-lg font-semibold">Sources</h2>
          <ul className="mt-2 space-y-2 text-sm leading-6">
            {article.sources.map((source) => (
              <li key={source.url}>
                <a className="font-medium text-navy hover:underline" href={source.url} rel="noopener noreferrer">
                  {source.name}
                </a>
                <span className="text-ink-muted"> · accessed {article.updated}</span>
              </li>
            ))}
          </ul>
        </div>
      </article>
      <section className="rounded-xl border border-line bg-paper-card p-5">
        <h2 className="font-serif text-xl font-semibold">Questions readers ask</h2>
        <dl className="mt-3 space-y-4">
          {article.faqs.map((faq) => (
            <div key={faq.question}>
              <dt className="font-semibold">{faq.question}</dt>
              <dd className="mt-1 text-sm leading-6 text-ink-muted">{faq.answer}</dd>
            </div>
          ))}
        </dl>
      </section>
      {related.length > 0 && (
        <nav aria-label="Related explainers">
          <h2 className="font-serif text-xl font-semibold">Keep reading</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {related.map((item) => (
              <li key={item.slug}>
                <Link className="font-medium text-navy hover:underline" href={`/learn/${item.slug}`}>
                  {item.title}
                </Link>
              </li>
            ))}
            <li>
              <Link className="font-medium text-navy hover:underline" href="/learn">
                All explainers
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
