import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { contactMailto, SITE } from "@/data/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    `Privacy practices for ${SITE.name} (Joshua Israel Ventures LLC): no accounts, browser-only ZIP lookup, cookieless Cloudflare Web Analytics, GitHub Pages hosting logs, no sale of personal information, and your privacy rights.`,
  path: "/privacy",
});

const CLOUDFLARE_WEB_ANALYTICS = "https://www.cloudflare.com/web-analytics/";
const CLOUDFLARE_DATA_COLLECTION =
  "https://developers.cloudflare.com/web-analytics/data-metrics/data-origin-and-collection/";
const CLOUDFLARE_PRIVACY = "https://www.cloudflare.com/privacypolicy/";
const GITHUB_PAGES_DATA = "https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages#data-collection";
const GITHUB_PRIVACY = "https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement";

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
        eyebrow={`Last updated ${SITE.legalLastUpdated}`}
        title="Privacy Policy"
        lede={`How ${SITE.legalName} handles information on ${SITE.name}.`}
      />
      <div className="prose-legal">
        <p>
          This policy explains what information is involved when you visit {SITE.name} (
          {SITE.url}). The site is operated by {SITE.legalName}, a {SITE.entityType} based in{" "}
          {SITE.location} (“we,” “us”). {SITE.name} is a static informational website. It has no
          user accounts, no sign-up forms, no comments, no advertising, no affiliate links, and no
          payments.
        </p>

        <h2>Summary</h2>
        <ul>
          <li>We do not ask you to create an account or submit personal information to use the site.</li>
          <li>The ZIP lookup runs entirely in your browser. Your ZIP is not sent to us.</li>
          <li>
            We use Cloudflare Web Analytics, which Cloudflare says does not use cookies or local
            storage and does not fingerprint visitors. We see aggregate traffic statistics only.
          </li>
          <li>Our host, GitHub Pages, logs visitor IP addresses for security purposes.</li>
          <li>We do not sell or share personal information, and we do not use it for targeted advertising.</li>
          <li>We do not set cookies, and no third-party embeds on the site set cookies.</li>
        </ul>

        <h2>What we do not collect</h2>
        <ul>
          <li>We do not collect Social Security numbers, voter registration numbers, or citizenship documents.</li>
          <li>We do not accept uploads, including ballot images.</li>
          <li>We do not run a voter-file lookup against your name or address.</li>
          <li>We do not sell, license, or broker voter-file data or any other personal information.</li>
        </ul>

        <h2>ZIP and state lookup</h2>
        <p>
          The ballot lookup runs only in your browser. Your browser matches the first three digits
          of a ZIP code to one of the site’s starter states using a static table shipped with the
          page, then opens that state’s page. The ZIP you type is not sent to our servers, is not
          added to the page address, and is not matched to a voter record.
        </p>

        <h2>Analytics: Cloudflare Web Analytics</h2>
        <p>
          Every page loads a small script from Cloudflare (static.cloudflareinsights.com) for{" "}
          <a href={CLOUDFLARE_WEB_ANALYTICS} rel="noopener noreferrer">Cloudflare Web Analytics</a>.
          Cloudflare says this tool does not use client-side state such as cookies or local storage
          and does not fingerprint individuals by IP address, user agent, or other data. According to{" "}
          <a href={CLOUDFLARE_DATA_COLLECTION} rel="noopener noreferrer">Cloudflare’s documentation</a>,
          the script reports page-load and performance measurements for the page you visit, and
          Cloudflare does not track individual visitors across websites. We use the resulting
          aggregate reports (such as page views, referring sites, and visitor country, browser,
          operating system, and device type) to understand which pages are used and to fix problems. Cloudflare
          processes this data under its own{" "}
          <a href={CLOUDFLARE_PRIVACY} rel="noopener noreferrer">privacy policy</a>. If you block the
          script in your browser, the site still works.
        </p>

        <h2>Hosting: GitHub Pages</h2>
        <p>
          The site is hosted on GitHub Pages, operated by GitHub, Inc. GitHub states that when a
          GitHub Pages site is visited, the visitor’s IP address is logged and stored for security
          purposes (see{" "}
          <a href={GITHUB_PAGES_DATA} rel="noopener noreferrer">GitHub Pages data collection</a> and the{" "}
          <a href={GITHUB_PRIVACY} rel="noopener noreferrer">GitHub General Privacy Statement</a>). Like
          most web servers, the hosting infrastructure also receives standard request information
          such as your browser type and the page requested. We do not receive or use those server
          logs for marketing, and we do not combine them with other data.
        </p>

        <h2>Fonts, images, and links</h2>
        <p>
          Fonts and candidate photos are served from this website, not loaded from Google Fonts or
          Wikimedia at view time. The site does not embed videos, social-media widgets, maps, or
          other third-party frames. Links to official election offices, news outlets, pollsters,
          Ballotpedia, Wikipedia, and other sites take you to websites we do not control; their own
          privacy policies apply once you leave {SITE.name}.
        </p>

        <h2>Email you send us</h2>
        <p>
          If you email <a href={contactMailto()}>{SITE.email}</a>, we receive your email address and
          whatever you include so we can reply, process a correction or privacy request, or keep an
          ordinary business record. Please do not send Social Security numbers, voter ID numbers,
          photos of ballots, or other sensitive identity documents. Email is delivered through our
          email provider (Google), which processes messages under its own terms.
        </p>

        <h2>How we use information</h2>
        <ul>
          <li>To operate, secure, and fix the website</li>
          <li>To understand aggregate use of pages through Cloudflare Web Analytics</li>
          <li>To respond to messages you send</li>
          <li>To comply with law or protect our rights where required</li>
        </ul>
        <p>
          We do not sell personal information, “share” it for cross-context behavioral advertising
          (as those terms are used in California law), or use it to profile you. We do not make
          automated decisions about you.
        </p>

        <h2>Retention</h2>
        <p>
          We keep emails for as long as needed to respond and for ordinary business records, and we
          delete them when they are no longer needed. Cloudflare and GitHub keep analytics and
          security logs under their own retention practices; we do not hold copies of those logs.
        </p>

        <h2>Visitors in the European Economic Area and the United Kingdom</h2>
        <p>
          The site is published in the United States for a U.S. audience. If the EU or UK General
          Data Protection Regulation applies to you, {SITE.legalName} is the controller for any
          personal information we process. Our legal basis is our legitimate interest in operating,
          securing, and improving a free public information website and in answering messages you
          choose to send. Information is processed in the United States by us and by our service
          providers (Cloudflare, GitHub, and our email provider). Subject to the conditions in
          those laws, you may ask to access, correct, delete, or restrict our use of your personal
          information, object to our use of it, or receive a copy of it. You may also complain to
          your local data-protection authority, such as the UK Information Commissioner’s Office.
        </p>

        <h2>U.S. state privacy rights</h2>
        <p>
          Depending on where you live, state law may give you the right to know what personal
          information we have about you, to correct it, to delete it, and to opt out of its sale,
          sharing for targeted advertising, or profiling. We do not sell or share personal
          information or use it for targeted advertising or profiling, so there is nothing to opt
          out of. For the same reason, a browser privacy signal such as Global Privacy Control does
          not change how this site handles your information. We will not treat you differently for exercising a privacy
          right.
        </p>

        <h2>How to make a privacy request</h2>
        <p>
          Email <a href={contactMailto()}>{SITE.email}</a> with “Privacy request” in the subject line
          and tell us what you are asking for. Because we do not have accounts, we usually hold no
          personal information about visitors other than emails they have sent us. We may need to
          confirm that a request comes from the person the information is about, and we will
          respond within the time the applicable law requires. Requests about Cloudflare’s or
          GitHub’s own logs may need to go to those companies.
        </p>

        <h2>Children</h2>
        <p>
          The site is a general-audience civic information resource. It is not directed to children
          under 13, and we do not knowingly collect personal information from children. If you
          believe a child has emailed us personal information, contact us and we will delete it.
        </p>

        <h2>Changes to this policy</h2>
        <p>
          If we change how the site handles information, for example by adding a new analytics
          tool, we will update this page before the change goes live and revise the “Last updated”
          date above.
        </p>

        <h2>Contact</h2>
        <p>
          {SITE.legalName}, {SITE.location}.{" "}
          <a href={contactMailto()}>{SITE.email}</a>. See also the{" "}
          <Link href="/disclaimer">disclaimer</Link> and <Link href="/terms">terms of use</Link>.
        </p>
      </div>
    </div>
  );
}
