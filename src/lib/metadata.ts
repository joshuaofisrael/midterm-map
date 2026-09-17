import type { Metadata } from "next";
import { absoluteUrl, SITE } from "@/data/site";

const OG_IMAGE = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: "Map the Midterms — 2026 U.S. midterms voter information",
} as const;

export function pageMetadata(input: {
  title: string;
  description: string;
  path: string;
  index?: boolean;
}): Metadata {
  const isHome = input.title === SITE.name;
  const socialTitle = isHome
    ? `${SITE.name} · 2026 U.S. midterms voter information`
    : `${input.title} · ${SITE.name}`;
  const url = absoluteUrl(input.path);

  return {
    title: isHome ? { absolute: socialTitle } : input.title,
    description: input.description,
    alternates: { canonical: url },
    robots: input.index === false ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: {
      title: socialTitle,
      description: input.description,
      url,
      siteName: SITE.name,
      type: "website",
      locale: "en_US",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: input.description,
      images: [OG_IMAGE.url],
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
      item: absoluteUrl(item.path),
    })),
  };
}
