import type { Metadata } from "next";
import { Source_Sans_3, Source_Serif_4 } from "next/font/google";
import { SITE } from "@/data/site";
import { CloudflareAnalytics } from "@/components/CloudflareAnalytics";
import { GoogleAnalyticsHead } from "@/components/GoogleAnalytics";
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
  verification: {
    google: "9ieSMdsWZWScgZAWXuy7odaYr2pLMA4KjWETrT8f4Gs",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <GoogleAnalyticsHead />
      </head>
      <body className={`${sourceSans.variable} ${sourceSerif.variable} font-sans`}>
        {children}
        <CloudflareAnalytics />
      </body>
    </html>
  );
}
