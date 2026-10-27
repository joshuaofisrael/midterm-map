import { EDITORIAL_TEAM } from "@/data/editorial";
import type { LearnArticle } from "@/data/learn/articles";
import { absoluteUrl, SITE } from "@/data/site";
import { contentLabelToIso } from "@/lib/contentDate";
import { inlineText } from "@/data/essays/text";

export function learnArticleJsonLd(article: LearnArticle) {
  const path = `/learn/${article.slug}`;
  const url = absoluteUrl(path);
  const iso = contentLabelToIso(article.updated);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: article.title,
        description: article.description,
        datePublished: iso,
        dateModified: iso,
        inLanguage: "en-US",
        url,
        mainEntityOfPage: url,
        author: EDITORIAL_TEAM,
        publisher: {
          "@type": "Organization",
          name: SITE.name,
          url: absoluteUrl("/"),
        },
        articleBody: article.paragraphs.map((paragraph) => inlineText(paragraph)).join("\n\n"),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Learn", item: absoluteUrl("/learn") },
          { "@type": "ListItem", position: 3, name: article.title, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: article.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  };
}
