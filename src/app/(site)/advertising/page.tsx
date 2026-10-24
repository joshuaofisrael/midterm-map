import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CopyrightNotice } from "@/components/CopyrightNotice";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { affiliateEnabled, tipJarEnabled } from "@/data/monetization";
import { SITE } from "@/data/site";
import { GOOGLE_ADS_POLICIES_URL } from "@/lib/adsense";
import { LEGAL } from "@/data/legalEntity";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Advertising and affiliate disclosure",
  description:
    `Advertising and affiliate disclosure for ${SITE.name}: Google AdSense may serve ads and use cookies. No paid political ads or candidate endorsements.`,
  path: "/advertising",
});

export default function AdvertisingPage() {
  const tips = tipJarEnabled();
  const affiliates = affiliateEnabled();
  return (
    <div className="mx-auto max-w-3xl">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Advertising", path: "/advertising" },
        ])}
      />
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "Advertising" }]} />
      <PageHeader
        eyebrow={`Last updated ${SITE.advertisingLastUpdated}`}
        title="Advertising and affiliate disclosure"
        lede={`How ${SITE.name} handles ads, affiliate links, and endorsements.`}
      />
      <div className="prose-legal">
        <p>
          {SITE.name} is operated by {LEGAL.legalName}, a {LEGAL.entityType}. This page is the
          advertising and affiliate disclosure. It is part of the <Link href="/terms">terms of use</Link>.
          The <Link href="/privacy/#advertising">privacy policy</Link> describes cookies and advertising
          technology.
        </p>

        <h2>Advertising</h2>
        <p>
          {SITE.name} may show advertisements from Google AdSense. Google and its partners may use
          cookies to serve and measure those ads. Google describes that use in{" "}
          <a href={GOOGLE_ADS_POLICIES_URL} rel="noopener noreferrer">
            Google’s advertising policies
          </a>
          . The file <a href="/ads.txt">ads.txt</a> lists one Google AdSense publisher ID (
          <code>pub-5681559774142917</code>). Ezoic and Adsterra are not running and are not listed in
          that file. We do not write a candidate’s ad, and an ad is not an endorsement by{" "}
          {LEGAL.legalName} of the advertiser, a candidate, a party, or a ballot measure.
        </p>
        <p>
          If we add another advertising network, we will update this page, the privacy policy, and{" "}
          <a href="/ads.txt">ads.txt</a> first.
        </p>

        <h2>No paid political advertising</h2>
        <p>
          We do not accept paid political advertising. We do not accept money or advertising from
          candidates, campaigns, parties, or political action committees. {SITE.name} does not solicit
          campaign contributions.
          {tips
            ? ` Optional tips, if you choose to leave one, are paid to ${LEGAL.legalName} through Stripe. A tip is not a political contribution and not an advertisement.`
            : ""}
        </p>

        <h2>No endorsements of candidates</h2>
        <p>
          Nothing on this site is an endorsement of a candidate, party, ticket, or ballot measure.
          Party labels are for identification only. An advertisement, and an affiliate link if one
          is shown, are not endorsements.
        </p>

        <h2>Cookies and Google’s EU/UK/CH consent message</h2>
        <p>
          Google AdSense may use cookies to serve and measure ads. Visitors in the European Economic
          Area, the United Kingdom, and Switzerland get Google’s consent message through the AdSense
          script before those advertising cookies are used. Google Analytics cookies still load only
          if you click Accept, through this site’s consent script, as the{" "}
          <Link href="/privacy/#google-analytics">privacy policy</Link> explains. That analytics
          choice does not replace Google’s consent message. Cloudflare Web Analytics is cookieless.
        </p>

        <h2>Affiliate links</h2>
        {affiliates ? (
          <p>
            Some pages contain affiliate links. If you buy through one, {LEGAL.legalName} may earn a
            commission at no extra cost to you. Each page with affiliate links shows that disclosure
            directly above the links. Commissions do not affect which races, candidates, polls, or
            facts we cover. The purchase is with the retailer, under its terms, not with us.
          </p>
        ) : (
          <p>
            The site does not currently contain affiliate links. If we add them, for example links to
            books, each of those pages will show a disclosure directly above the links, and{" "}
            {LEGAL.legalName} may earn a commission if you buy through them, at no extra cost to you.
            Commissions will not affect which races, candidates, polls, or facts we cover. The purchase
            would be with the retailer, under its terms, not with us.
          </p>
        )}

        <h2>Contact</h2>
        <p>
          {LEGAL.legalName}. Mailing address: {LEGAL.mailingAddress}.{" "}
          <Link href="/contact">Contact</Link>.
        </p>
        <CopyrightNotice />
      </div>
    </div>
  );
}
