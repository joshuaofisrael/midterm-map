import { JsonLd } from "@/components/JsonLd";
import { organizationJsonLd, websiteJsonLd } from "@/lib/siteSchema";

/** Organization and WebSite schema for non-place pages. Place pages omit both. */
export function SiteJsonLd() {
  return <JsonLd data={[organizationJsonLd, websiteJsonLd]} />;
}
