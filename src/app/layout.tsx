import type { Metadata } from "next";
import { Source_Sans_3, Source_Serif_4 } from "next/font/google";
import { SITE } from "@/data/site";
import { CloudflareAnalytics } from "@/components/CloudflareAnalytics";
import { JsonLd } from "@/components/JsonLd";
import { SiteShell } from "@/components/SiteShell";
import "./globals.css";

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} · 2026 U.S. midterms voter information`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.legalName }],
  creator: SITE.legalName,
  publisher: SITE.legalName,
  keywords: [
    "Map the Midterms",
    "2026 midterms",
    "Election Day November 3 2026",
    "sample ballot",
    "race ratings",
    "election results",
    "voter information",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE.name,
    title: `${SITE.name} · 2026 U.S. midterms voter information`,
    description: SITE.description,
    url: `${SITE.url}/`,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Map the Midterms — 2026 U.S. midterms voter information",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} · 2026 U.S. midterms`,
    description: SITE.description,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.legalName,
  legalName: SITE.legalName,
  email: SITE.email,
  url: SITE.url,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Miami Beach",
    addressRegion: "FL",
    addressCountry: "US",
  },
  identifier: {
    "@type": "PropertyValue",
    name: "Florida Sunbiz Document Number",
    value: SITE.sunbizDocumentNumber,
  },
  description:
    `Florida limited liability company that operates informational websites, including ${SITE.name} as an unfiled brand name.`,
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.name,
  alternateName: `${SITE.name} by ${SITE.legalName}`,
  url: SITE.url,
  description: SITE.description,
  inLanguage: "en-US",
  publisher: {
    "@type": "Organization",
    name: SITE.legalName,
    legalName: SITE.legalName,
    email: SITE.email,
  },
  about: {
    "@type": "Event",
    name: "United States 2026 midterm elections",
    startDate: SITE.electionDayIso,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    description:
      `U.S. congressional and many state elections on Tuesday, November 3, 2026. ${SITE.name} is not an official election website.`,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${sourceSans.variable} ${sourceSerif.variable} font-sans`}>
        <JsonLd data={[organizationJsonLd, websiteJsonLd]} />
        <SiteShell>{children}</SiteShell>
        <CloudflareAnalytics />
      </body>
    </html>
  );
}
