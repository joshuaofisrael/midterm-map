import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CopyrightNotice } from "@/components/CopyrightNotice";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { AFFILIATE, affiliateEnabled, tipJarEnabled } from "@/data/monetization";
import { SITE } from "@/data/site";
import { LEGAL } from "@/data/legalEntity";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";
import { FORMSUBMIT_PRIVACY, FORMSUBMIT_URL } from "@/data/contact";
import { CookieChoicesButton, GA_MEASUREMENT_ID } from "@/components/GoogleAnalytics";
import { GOOGLE_ADS_POLICIES_URL } from "@/lib/adsense";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    `Privacy practices for ${SITE.name} (Joshua Israel Ventures LLC): no accounts, browser-only ZIP lookup, a FormSubmit contact form, election-night update emails, cookieless Cloudflare Web Analytics, Google Analytics only with your consent, Ezoic scripts and cookies with an opt-out, GitHub Pages hosting logs, optional tips through Stripe, affiliate link terms, no sale of personal information, and your privacy rights.`,
  path: "/privacy",
});

const CLOUDFLARE_WEB_ANALYTICS = "https://www.cloudflare.com/web-analytics/";
const CLOUDFLARE_DATA_COLLECTION =
  "https://developers.cloudflare.com/web-analytics/data-metrics/data-origin-and-collection/";
const CLOUDFLARE_PRIVACY = "https://www.cloudflare.com/privacypolicy/";
const GITHUB_PAGES_DATA = "https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages#data-collection";
const GOOGLE_ANALYTICS_COOKIES =
  "https://support.google.com/analytics/answer/11397207";
const GOOGLE_DATA_PRIVACY = "https://support.google.com/analytics/answer/6004245";
const GOOGLE_PARTNER_SITES = "https://policies.google.com/technologies/partner-sites";
const GOOGLE_PRIVACY = "https://policies.google.com/privacy";
const GOOGLE_OPTOUT = "https://tools.google.com/dlpage/gaoptout";
const GOOGLE_ADS_DPT = "https://business.safety.google/adsprocessorterms/";
const EZOIC_PRIVACY = "https://www.ezoic.com/privacy-policy/";
const STRIPE_PRIVACY = "https://stripe.com/privacy";
const GITHUB_PRIVACY = "https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement";

export default function PrivacyPage() {
  const tips = tipJarEnabled();
  const affiliates = affiliateEnabled();
  const affiliateRetailers = [
    AFFILIATE.bookshopId.trim() ? "Bookshop.org" : "",
    AFFILIATE.amazonTag.trim() ? "Amazon" : "",
  ].filter(Boolean);
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
        eyebrow={`Last updated ${SITE.privacyLastUpdated}`}
        title="Privacy Policy"
        lede={`How ${LEGAL.legalName} handles information on ${SITE.name}.`}
      />
      <div className="prose-legal">
        <p>
          This policy explains what information is involved when you visit {SITE.name} (
          {SITE.url}). The site is operated by {LEGAL.legalName}, a {LEGAL.entityType} based in{" "}
          {LEGAL.location} (“we,” “us”). {SITE.name} is a static informational website. It has no
          user accounts and no comments. It loads Google AdSense and Ezoic, which may serve ads and
          use cookies (see “Advertising” below).
          {" "}
          It offers an optional “Get election-night updates” form.
          {affiliates ? " Some pages contain disclosed affiliate links." : " It has no affiliate links."}
          {tips
            ? " Readers can leave an optional tip, which is processed by Stripe on Stripe’s own payment page."
            : " It takes no payments."}
        </p>

        <h2>Who is responsible for your information</h2>
        <p>
          {LEGAL.brandNote} {LEGAL.legalName} is the data controller for personal information
          collected through {SITE.name}, meaning it decides how and why that information is used.
          Privacy questions and requests go through the{" "}
          <Link href="/contact">contact form</Link>.
        </p>

        <h2>What the site collects, at a glance</h2>
        <ul>
          <li>
            Election-night updates: the email address you enter in the “Get election-night updates”
            form. We collect it only to send election updates. You can ask us to remove it.
          </li>
          {tips && (
            <li>
              Tips: payment details are collected by Stripe on its own Payment Link page; we receive
              the tip record described below.
            </li>
          )}
          <li>
            Analytics: aggregate, cookieless page statistics from Cloudflare Web Analytics.
          </li>
          <li>
            Analytics, only if you click Accept: Google Analytics cookies and usage data, as
            described below.
          </li>
          <li>
            Advertising: Google AdSense and Ezoic may serve ads and use cookies, as described below.
          </li>
          <li>Hosting: security logs kept by GitHub Pages.</li>
          <li>Messages you choose to send us by email or through the contact form (delivered by FormSubmit).</li>
          <li>
            {affiliates
              ? "Affiliate links: if you click one, the retailer may set cookies on its own site."
              : "Affiliate links: none are live today, so no affiliate cookies are involved."}
          </li>
        </ul>
        <p>
          The contact form is processed by FormSubmit, which emails your message to us. Google AdSense
          and Ezoic may serve ads and use cookies; see “Advertising” below. Adsterra scripts are not
          loaded.
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
          <li>
            We do not sell personal information. We do not use information we collect ourselves for
            targeted advertising. Google AdSense and Ezoic may use cookies to serve ads, including
            ads those companies personalize, as described under Advertising.
          </li>
          <li>
            We also use Google Analytics, but only after a grant. Outside the Ezoic consent
            prompt, that grant is when you click Accept. The Google script is not loaded, and its
            cookies are not set, if you click Reject or make no choice. Where Ezoic’s Gatekeeper
            consent prompt applies, the Google script loads only if that prompt’s consent signal
            allows analytics cookies. Ezoic may set the cookies named under Advertising.
          </li>
          {tips && (
            <li>
              If you leave a tip, Stripe processes the payment on its own page. We never see your
              full card number.
            </li>
          )}
          <li>
            If you sign up for election-night updates, we use your email address only to send those
            updates. You can ask us to remove it. We never sell it.
          </li>
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

        <h2 id="google-analytics">Analytics: Google Analytics (only with your consent)</h2>
        <p>
          The site also uses Google Analytics 4 (measurement ID {GA_MEASUREMENT_ID}), a service of
          Google LLC, to count visits and understand which pages are useful. Analytics storage for
          that tag starts denied. The Google Analytics script is not on the page until there is a
          grant. For visitors who do not get Ezoic’s Gatekeeper prompt, that grant is this site’s
          consent script: when you first visit, a banner asks whether you accept analytics cookies,
          and the script loads only if you click Accept. For visitors in the European Economic Area
          and the United Kingdom, when Gatekeeper reports that its consent rules apply, that prompt
          is the only one. This site’s banner stays hidden, and the script loads only if Gatekeeper’s
          consent signal allows analytics cookies (device storage plus ad measurement, content
          measurement, and product improvement). Switzerland keeps this site’s banner, because
          Gatekeeper’s prompt is shown for the EU, the EEA, and the UK. Google AdSense is a separate
          script and is described under Advertising.
        </p>
        <ul>
          <li>
            If you click <strong>Accept</strong>, the site loads the Google tag and Google Analytics
            may set first-party cookies named <code>_ga</code> and <code>_ga_*</code> (Google says
            these last up to two years) to recognize your browser across visits to this site. See{" "}
            <a href={GOOGLE_ANALYTICS_COOKIES} rel="noopener noreferrer">
              Google’s description of these cookies
            </a>
            .
          </li>
          <li>
            If you click <strong>Reject</strong>, or make no choice, the Google script is not
            loaded and Google Analytics cookies are not set. We do not send Google a cookieless
            pageview in that case.
          </li>
          <li>
            When enabled, Google Analytics collects information such as the pages you view, how
            you arrived (for example, the referring site or search), approximate location (city
            or region derived from your IP address), device, browser, operating system, screen
            size, language, and interactions such as clicks and scrolling. Google says Google
            Analytics 4 does not log or store IP addresses (see{" "}
            <a href={GOOGLE_DATA_PRIVACY} rel="noopener noreferrer">
              Google Analytics data privacy
            </a>
            ).
          </li>
          <li>
            We have turned off Google signals and ad personalization for Google Analytics. That
            tag’s advertising consent signals stay denied, and we do not use Google Analytics data
            for advertising or share it for targeted advertising. The analytics choice does not
            replace Google’s advertising consent message.
          </li>
        </ul>
        <p>
          Google processes this data on our behalf as a service provider and data processor under
          its{" "}
          <a href={GOOGLE_ADS_DPT} rel="noopener noreferrer">data processing terms</a>. Google’s
          own handling is described in{" "}
          <a href={GOOGLE_PARTNER_SITES} rel="noopener noreferrer">
            How Google uses information from sites that use its services
          </a>{" "}
          and the{" "}
          <a href={GOOGLE_PRIVACY} rel="noopener noreferrer">Google Privacy Policy</a>. Data may be
          processed in the United States and other countries where Google operates.
        </p>
        <p>
          <strong>How to opt out.</strong> You can change your choice at any time with the{" "}
          <CookieChoicesButton /> link in the footer of every page. Where this site’s banner is the
          prompt, choosing Reject stops Google Analytics cookies and removes any <code>_ga</code>{" "}
          cookies set on this site. Your choice is remembered in your browser’s local storage (key{" "}
          <code>mtm-analytics-consent</code>), not in a cookie. Where Gatekeeper is the prompt, that
          same link reopens Gatekeeper so you can withdraw the analytics grant. You can also install the{" "}
          <a href={GOOGLE_OPTOUT} rel="noopener noreferrer">
            Google Analytics Opt-out Browser Add-on
          </a>
          , or block or delete cookies in your browser settings. The site works the same either
          way.
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

        {tips && (
          <>
            <h2>Tips through Stripe</h2>
            <p>
              The “Keep this map free” button opens a payment page hosted by Stripe, Inc.
              (buy.stripe.com), not by this website. Tips are voluntary and are paid to{" "}
              {LEGAL.legalName}. They are not political contributions and are not tax-deductible.
              Stripe collects the payment details needed to process the tip and prevent fraud, such
              as your card or other payment method, email address, and billing country and postal
              code. We do not see or store your full card number. Stripe gives us the tip amount and
              date, the email address and any name you enter, your billing country and postal code,
              and limited card details such as the card brand and last four digits. We use this only
              to process and record the tip, issue refunds, answer your questions, prevent fraud, and
              keep the business and tax records the law requires. Leaving a tip does not add you to
              any mailing list. Stripe processes this information under its own{" "}
              <a href={STRIPE_PRIVACY} rel="noopener noreferrer">privacy policy</a> and may use
              cookies on its payment page.
            </p>
          </>
        )}

        <h2 id="election-updates">Election-night updates</h2>
        <p>
          Some pages offer an optional “Get election-night updates” form. If you submit it, we
          collect your email address only to send election updates. We do not use that address for
          any other purpose. The form includes a consent checkbox that is not pre-checked. It is
          processed by <a href={FORMSUBMIT_URL} rel="noopener noreferrer">FormSubmit</a>, the same
          service as the contact form, and it posts to a FormSubmit alias so the inbox address is
          not part of the form’s web address. FormSubmit emails the address to {LEGAL.legalName}.
          FormSubmit’s <a href={FORMSUBMIT_PRIVACY} rel="noopener noreferrer">privacy policy</a>{" "}
          applies to that delivery. The address can be removed on request through the{" "}
          <Link href="/contact">contact form</Link>.
        </p>

        <h2 id="advertising">Advertising</h2>
        <p>
          {SITE.name} may show advertisements from Google AdSense and from Ezoic (Ezoic Inc.). Google,
          Ezoic, and their advertising partners may use cookies to serve and measure those ads.
          Google describes its use in{" "}
          <a href={GOOGLE_ADS_POLICIES_URL} rel="noopener noreferrer">
            Google’s advertising policies
          </a>
          . Ezoic describes its use in{" "}
          <a href={EZOIC_PRIVACY} rel="noopener noreferrer">Ezoic’s privacy policy</a>. Every page
          loads Ezoic’s Gatekeeper consent scripts (
          <code>cmp.gatekeeperconsent.com</code> and <code>the.gatekeeperconsent.com</code>
          ), <code>www.ezojs.com/ezoic/sa.min.js</code>, and <code>ezoicanalytics.com/analytics.js</code>.
          Those are header scripts. This site does not add Ezoic ad placeholders on thin or noindexed
          pages. The file <a href="/ads.txt">ads.txt</a> lists one Google AdSense publisher ID (
          <code>pub-5681559774142917</code>) and was not changed for this integration. Adsterra is not
          running and is not listed in that file.
        </p>
        <p>
          Ezoic and its partners may set cookies, including <code>ezCMPCookieConsent</code> (the
          consent choice), <code>euconsent-v2</code> (the IAB consent string), <code>ezds</code> and{" "}
          <code>ezohw</code> (screen and browser size), <code>ezoab_</code> (feature tests),{" "}
          <code>ezovuuid_</code>, <code>ezovuuidtime_</code>, <code>ezovid_</code>, and{" "}
          <code>ezouid_</code> (visit and visitor identifiers), <code>ezux_tos_</code>,{" "}
          <code>ezux_lpl_</code>, and <code>ezux_et_</code> (time and engagement), <code>ezoref_</code>{" "}
          and <code>ezopvc_</code> (referrer and pages viewed), <code>ezoadgid_</code> (an age and
          gender category), <code>ezosuigeneris</code> (a cross-site identifier), and{" "}
          <code>active_template</code> (the layout in use). Names ending in <code>_</code> may be
          followed by a site identifier.
        </p>
        <p>
          <strong>How to opt out of Ezoic.</strong> Visitors in the European Economic Area and the
          United Kingdom get Gatekeeper as the single consent prompt when that CMP reports that its
          rules apply. Rejecting non-essential cookies there opts out of Ezoic’s advertising and
          analytics cookies. The footer <CookieChoicesButton /> link reopens that prompt. Visitors
          in Switzerland, and visitors elsewhere, keep this site’s analytics banner (or no extra
          analytics prompt after they have chosen). They can still refuse or delete Ezoic cookies in
          the browser, and Ezoic’s opt-out is described in{" "}
          <a href={EZOIC_PRIVACY} rel="noopener noreferrer">Ezoic’s privacy policy</a>. You can opt
          out of Google’s personalized ads at{" "}
          <a href="https://www.google.com/settings/ads">Google Ads Settings</a>, and of some other
          vendors’ advertising cookies at <a href="https://www.aboutads.info">www.aboutads.info</a>{" "}
          and <a href="https://optout.networkadvertising.org/">optout.networkadvertising.org</a>.
        </p>
        <p>
          Where Gatekeeper is not the active prompt, visitors in the European Economic Area, the
          United Kingdom, and Switzerland can still get Google’s consent message before Google’s
          advertising cookies are used. That message is shown through the AdSense script. It is
          separate from this site’s analytics choice: outside Gatekeeper, Google Analytics still
          loads only if you click Accept, as described under{" "}
          <Link href="#google-analytics">Google Analytics</Link>. Gatekeeper is a certified consent
          manager, so its prompt is meant to replace a second advertising prompt for the visitors it
          covers.
        </p>

        <h2>Affiliate links</h2>
        {affiliates ? (
          <p>
            Some pages contain affiliate links to {affiliateRetailers.join(" and ")}. If you buy
            through one of these links, {LEGAL.legalName} may earn a commission at no extra cost to
            you. Each page with affiliate links shows a disclosure directly above them. When you
            click an affiliate link, the retailer may use cookies or similar technology on its own
            website to credit the purchase to us, under its own privacy policy. We receive commission
            reports from the retailer, not your name, address, or payment details.
          </p>
        ) : (
          <p>
            The site does not currently contain affiliate links. If we add them (for example, links
            to books), each page with affiliate links will show a disclosure directly above them, and
            we will update this section before they go live.
          </p>
        )}

        <h2>Email you send us</h2>
        <p>
          If you use the <Link href="/contact">contact form</Link>, we receive your email address and
          whatever you include so we can reply, process a correction or privacy request, or keep an
          ordinary business record. Please do not send Social Security numbers, voter ID numbers,
          photos of ballots, or other sensitive identity documents. Messages are delivered through our
          email provider (Google), which processes messages under its own terms.
        </p>

        <h2 id="contact-form">Contact form (FormSubmit)</h2>
        <p>
          The contact form on the <Link href="/contact">contact page</Link> is processed by{" "}
          <a href={FORMSUBMIT_URL} rel="noopener noreferrer">FormSubmit</a> (formsubmit.co), a
          third-party form service. When you submit it, your name, email address, message, and the
          page you were reporting (if any) are sent to FormSubmit, which emails them to{" "}
          {LEGAL.legalName} so we can read and reply. FormSubmit may show a spam check
          (captcha) and processes submissions under its own{" "}
          <a href={FORMSUBMIT_PRIVACY} rel="noopener noreferrer">privacy policy</a>. We use what you
          send only to reply, handle a correction or privacy request, or keep an ordinary business
          record, and we never add you to a mailing list. The form posts to a FormSubmit alias, so
          the inbox address is not part of the form’s web address, and we use the message only to
          respond to you.
        </p>

        <h2>How we use information</h2>
        <ul>
          <li>To operate, secure, and fix the website</li>
          <li>To understand aggregate use of pages through Cloudflare Web Analytics</li>
          <li>To measure visits and page use through Google Analytics, if you accept analytics cookies</li>
          <li>To let Google AdSense and Ezoic serve and measure ads, as described under Advertising</li>
          <li>To respond to messages you send</li>
          {tips && <li>To process, record, and if needed refund tips, and to keep required tax and accounting records</li>}
          <li>To send election updates to an email address you submitted for that purpose</li>
          <li>To comply with law or protect our rights where required</li>
        </ul>
        <p>
          We do not sell personal information, and we do not use information we collect ourselves
          for cross-context behavioral advertising (as that term is used in California law) or to
          profile you. Google AdSense and Ezoic may use cookies to serve and measure ads, including
          personalized ads, as described under Advertising. We do not make automated decisions about you.
        </p>

        <h2>Retention</h2>
        <p>
          We keep emails for as long as needed to respond and for ordinary business records, and we
          delete them when they are no longer needed.
          {tips ? " We keep tip records for as long as tax and accounting rules require (generally up to seven years)." : ""}
          {" "}
          We keep an election-update email address only while we may send those updates, and we
          remove it when you ask.{" "}
          Google keeps Google Analytics data under the retention setting in our Google Analytics
          account (no longer than 14 months for user-level data). Ezoic keeps the cookies described
          under Advertising under its own retention practices. Cloudflare and GitHub keep analytics and security logs, and Stripe keeps payment records,
          under their own retention practices; we do not hold copies of Cloudflare’s or GitHub’s logs.
        </p>

        <h2>Visitors in the European Economic Area and the United Kingdom</h2>
        <p>
          The site is published in the United States for a U.S. audience. If the EU or UK General
          Data Protection Regulation applies to you, {LEGAL.legalName} is the controller for any
          personal information we process. Our legal basis is our legitimate interest in operating,
          securing, and improving a free public information website and in answering messages you
          choose to send. For Google Analytics, the legal basis is your consent. Where Gatekeeper
          applies, you give that consent in Gatekeeper’s prompt. Elsewhere you give it by clicking
          Accept. You can withdraw it at any time through the Cookie choices link. For advertising
          cookies, visitors in the European Economic Area and the United Kingdom are asked through
          Gatekeeper when that prompt is active. Visitors in Switzerland are asked through this
          site’s banner for analytics and through Google’s consent message for Google advertising
          cookies.
          {tips ? " For tips, the legal basis is processing needed to take your payment and to meet tax and accounting obligations." : ""}
          {" "}
          For election-night updates, the legal basis is your consent, which you can withdraw by
          asking us to remove your email address. Information is processed in the United States by
          us and by our service providers (Cloudflare, GitHub, FormSubmit for contact form messages
          and election-night update sign-ups, Google for analytics, advertising, and email we
          receive, Ezoic for advertising and measurement
          {tips ? ", Stripe for tips" : ""}). Subject to the conditions in
          those laws, you may ask to access, correct, delete, or restrict our use of your personal
          information, object to our use of it, or receive a copy of it. You may also complain to
          your local data-protection authority, such as the UK Information Commissioner’s Office.
        </p>

        <h2>U.S. state privacy rights</h2>
        <p>
          Depending on where you live, state law may give you the right to know what personal
          information we have about you, to correct it, to delete it, and to opt out of its sale,
          sharing for targeted advertising, or profiling. We do not sell personal information.
          Google and Ezoic may use cookies for advertising as described under Advertising,
          including personalized ads. You can opt out of Google’s personalized ads at{" "}
          <a href="https://www.google.com/settings/ads">Google Ads Settings</a> and of Ezoic’s cookies
          through Gatekeeper where it applies, or through{" "}
          <a href={EZOIC_PRIVACY} rel="noopener noreferrer">Ezoic’s privacy policy</a>. A browser privacy
          signal such as Global Privacy Control is separate from that Google setting and from the
          analytics choice stored in this browser. We will not treat you differently for exercising
          a privacy right.
        </p>

        <h2>How to make a privacy request</h2>
        <p>
          To ask us to delete personal information you sent us, use the{" "}
          <Link href="/contact">contact form</Link> and put “Privacy request” and “deletion” in the
          message, with enough detail for us to find the message or record. Use the same form for
          any other privacy request and tell us what you are asking for. Because we do not have accounts, we usually hold no
          personal information about visitors other than emails and contact form messages they have sent us
          {tips ? ", records of tips" : ""}
          , and email addresses submitted for election-night updates. We may need to
          confirm that a request comes from the person the information is about, and we will
          respond within the time the applicable law requires. Requests about Cloudflare’s,
          GitHub’s, Google’s, Ezoic’s, or Stripe’s own records may need to go to those companies.
        </p>

        <h2>Children</h2>
        <p>
          The site is a general-audience civic information resource. It is not directed to children
          under 13, and it is not targeted at children. We do not knowingly collect personal
          information from children under 13. If you believe a child under 13 has sent us personal
          information, use the <Link href="/contact">contact form</Link> and we will delete it.
        </p>

        <h2>Changes to this policy</h2>
        <p>
          If we change how the site handles information, for example by adding a new analytics
          tool, we will update this page before the change goes live and revise the “Last updated”
          date above.
        </p>

        <h2>Contact</h2>
        <p>
          {LEGAL.legalName}, {LEGAL.location}. Mailing address: {LEGAL.mailingAddress}.{" "}
          <Link href="/contact">Contact</Link>. See also the{" "}
          <Link href="/disclaimer">disclaimer</Link>, <Link href="/terms">terms of use</Link>, and{" "}
          <Link href="/advertising">advertising disclosure</Link>.
        </p>
        <CopyrightNotice />
      </div>
    </div>
  );
}
