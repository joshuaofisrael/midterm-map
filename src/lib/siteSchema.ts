import { absoluteUrl, SITE } from "@/data/site";

/** Same public Sunbiz document number as LEGAL.sunbizDocumentNumber. Kept here so this graph does not import the company name. */
const SUNBIZ_DOCUMENT_NUMBER = "L26000261819";

export const ORG_ID = `${SITE.url}/#organization`;

/**
 * Sitewide Organization. Social-profile URLs are omitted. Share buttons are
 * not accounts of this site. url is the canonical home. logo is the mark in
 * public/logo.svg, the same drawing as src/app/icon.svg.
 */
export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORG_ID,
  name: SITE.name,
  url: absoluteUrl("/"),
  logo: {
    "@type": "ImageObject",
    url: `${SITE.url}/logo.svg`,
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    url: absoluteUrl("/contact"),
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Miami Beach",
    addressRegion: "FL",
    addressCountry: "US",
  },
  identifier: {
    "@type": "PropertyValue",
    name: "Florida Sunbiz Document Number",
    value: SUNBIZ_DOCUMENT_NUMBER,
  },
  brand: {
    "@type": "Brand",
    name: SITE.name,
    url: absoluteUrl("/"),
  },
  description: SITE.description,
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.name,
  url: absoluteUrl("/"),
  description: SITE.description,
  inLanguage: "en-US",
  publisher: {
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE.name,
  },
  copyrightHolder: { "@id": ORG_ID },
  copyrightYear: 2026,
  about: {
    "@type": "Thing",
    name: "United States 2026 midterm elections",
    description: `U.S. congressional and many state elections on Tuesday, November 3, 2026. ${SITE.name} is not an official election website.`,
  },
};
