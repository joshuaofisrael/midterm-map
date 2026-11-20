import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CopyrightNotice } from "@/components/CopyrightNotice";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { affiliateEnabled, tipJarEnabled } from "@/data/monetization";
import { SITE } from "@/data/site";
import { LEGAL } from "@/data/legalEntity";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";


export const metadata = pageMetadata({
  title: "Advertising and affiliate disclosure",
  description:
    `Advertising and affiliate disclosure for ${SITE.name}: the site does not show ads and does not use advertising cookies.`,
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
          The <Link href="/privacy/#advertising">privacy policy</Link> describes cookies.
        </p>

        <h2>Advertising</h2>
        <p>
          {SITE.name} does not show ads and does not use advertising cookies. No advertising script
          is loaded. A banner labeled Sponsored links to one of our own related sites. It is not
          sold to an outside company, and it does not set a cookie. We do not write a candidate’s
          ad, and a Sponsored banner is not an endorsement by {LEGAL.legalName} of a candidate, a
          party, or a ballot measure.
        </p>
        <p>
          If we start showing ads, we will update this page and the privacy policy first.
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
        <p>
          A separate sponsorship is offered to non-political businesses only: one exclusive banner
          from 3 November 2026 at 00:00 Eastern Time through 6 November 2026 at 23:59 Eastern Time.
          The terms, the review, and a full refund if the ad is not approved are on the{" "}
          <Link href="/advertise">advertise</Link> page. An approved ad is labelled Sponsored.
          Traffic is not guaranteed.
        </p>

        <h2>No endorsements of candidates</h2>
        <p>
          Nothing on this site is an endorsement of a candidate, party, ticket, or ballot measure.
          Party labels are for identification only. A Sponsored banner, and an affiliate link if one
          is shown, are not endorsements.
        </p>

        <h2>Cookies</h2>
        <p>
          The site does not use advertising cookies. This site’s consent script controls Google
          Analytics: those cookies load only if you click Accept, as the{" "}
          <Link href="/privacy/#google-analytics">privacy policy</Link> explains. Cloudflare Web
          Analytics is cookieless.
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
