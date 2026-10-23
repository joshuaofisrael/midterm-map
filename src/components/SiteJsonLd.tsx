import { JsonLd } from "@/components/JsonLd";
import { absoluteUrl, SITE } from "@/data/site";

/** Same public Sunbiz document number as LEGAL.sunbizDocumentNumber. Kept here so this graph does not import the company name. */
const SUNBIZ_DOCUMENT_NUMBER = "L26000261819";

const ORG_ID = `${SITE.url}/#organization`;

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORG_ID,
  name: SITE.name,
  url: SITE.url,
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
    url: SITE.url,
  },
  description: SITE.description,
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.name,
  url: SITE.url,
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

/** Organization and WebSite schema for non-place pages. Place pages omit both. */
export function SiteJsonLd() {
  return <JsonLd data={[organizationJsonLd, websiteJsonLd]} />;
}
