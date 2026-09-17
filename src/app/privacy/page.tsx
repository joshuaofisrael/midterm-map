import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { contactMailto, SITE } from "@/data/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "Privacy practices for Midterm Map (Joshua Israel Ventures LLC): client-side ZIP lookup, no voter-file sales, no analytics cookies in this MVP, and email handling.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Privacy", path: "/privacy" },
        ])}
      />
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "Privacy" }]} />
      <PageHeader
        eyebrow={`Last updated ${SITE.lastUpdated}`}
        title="Privacy Policy"
        lede="How Joshua Israel Ventures LLC handles information on Midterm Map."
      />
      <div className="prose-legal">
        <p>
          This policy describes the MVP privacy posture for {SITE.name} (
          {SITE.url}), operated by {SITE.legalName}. It is product copy for an
          informational site, not a counsel-approved privacy notice.
        </p>

        <h2>What we do not collect</h2>
        <ul>
          <li>We do not collect Social Security numbers.</li>
          <li>We do not collect full voter registration numbers.</li>
          <li>We do not collect citizenship documents.</li>
          <li>We do not accept uploadable ballot images.</li>
          <li>We do not sell, license, or broker voter-file data.</li>
          <li>We do not run a voter-file lookup against your name or address.</li>
        </ul>

        <h2>ZIP and state lookup</h2>
        <p>
          The ballot ZIP tool is <strong>client-side / local</strong> in this
          MVP. Your browser matches the first three digits of a ZIP to a starter
          state using a static table shipped with the site. That ZIP is not
          posted to our servers by the lookup form itself, and it is not matched
          to a voter registration record.
        </p>

        <h2>Cookies and analytics</h2>
        <p>
          This MVP does <strong>not</strong> implement first-party analytics
          cookies, advertising pixels, or a cookie consent banner, because those
          tools are not installed. Your hosting provider (for example Vercel)
          and your own browser may still create ordinary technical logs such as
          IP address, user agent, and requested URL. We do not treat hosting
          logs as a marketing list.
        </p>
        <p>
          If analytics or other cookies are added later, this policy should be
          updated with the tool name and purpose before those scripts go live.
        </p>

        <h2>Email you send us</h2>
        <p>
          If you email <a href={contactMailto()}>{SITE.email}</a>, we receive
          whatever you include in that message so we can reply or keep an
          ordinary business record. Do not send Social Security numbers, voter
          ID numbers, photos of ballots, or other sensitive identity documents.
        </p>

        <h2>How we use information</h2>
        <ul>
          <li>To operate and fix the website</li>
          <li>To respond to messages you send</li>
          <li>To comply with law or protect our rights where required</li>
        </ul>

        <h2>Children</h2>
        <p>
          The site is a general-audience civic information resource. It is not
          directed to children under 13, and we do not knowingly collect
          personal information from them.
        </p>

        <h2>Contact</h2>
        <p>
          Privacy questions: <a href={contactMailto()}>{SITE.email}</a> (
          {SITE.legalName}, {SITE.location}). See also the{" "}
          <Link href="/disclaimer">disclaimer</Link> and{" "}
          <Link href="/terms">terms</Link>.
        </p>
      </div>
    </div>
  );
}
