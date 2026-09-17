import type { Metadata } from "next";
import { SITE } from "@/data/site";

export function pageMetadata(input: {
  title: string;
  description: string;
  path: string;
  index?: boolean;
}): Metadata {
  const title =
    input.title === SITE.name ? SITE.name : `${input.title} · ${SITE.name}`;
  const url = new URL(input.path, SITE.url).toString();

  return {
    title,
    description: input.description,
    alternates: { canonical: url },
    robots: input.index === false ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: {
      title,
      description: input.description,
      url,
      siteName: SITE.name,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: input.description,
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: new URL(item.path, SITE.url).toString(),
    })),
  };
}
