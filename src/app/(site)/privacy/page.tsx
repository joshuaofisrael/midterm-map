import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { AFFILIATE, affiliateEnabled, EMAIL_SIGNUP, emailSignupEnabled, tipJarEnabled } from "@/data/monetization";
import { SITE } from "@/data/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";
import { FORMSUBMIT_PRIVACY, FORMSUBMIT_URL } from "@/data/contact";
import { CookieChoicesButton, GA_MEASUREMENT_ID } from "@/components/GoogleAnalytics";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    `Privacy practices for ${SITE.name} (Joshua Israel Ventures LLC): no accounts, browser-only ZIP lookup, a FormSubmit contact form, cookieless Cloudflare Web Analytics, Google Analytics only with your consent, GitHub Pages hosting logs, optional tips through Stripe, email alert and affiliate link terms, no sale of personal information, and your privacy rights.`,
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
const STRIPE_PRIVACY = "https://stripe.com/privacy";
const GITHUB_PRIVACY = "https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement";

export default function PrivacyPage() {
  const tips = tipJarEnabled();
  const signup = emailSignupEnabled();
  const affiliates = affiliateEnabled();
  const affiliateRetailers = [
    AFFILIATE.bookshopId.trim() ? "Bookshop.org" : "",
    AFFILIATE.amazonTag.trim() ? "Amazon" : "",
  ].filter(Boolean);
  const providerName = EMAIL_SIGNUP.provider.trim();
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
        lede={`How ${SITE.legalName} handles information on ${SITE.name}.`}
      />
      <div className="prose-legal">
        <p>
          This policy explains what information is involved when you visit {SITE.name} (
          {SITE.url}). The site is operated by {SITE.legalName}, a {SITE.entityType} based in{" "}
          {SITE.location} (“we,” “us”). {SITE.name} is a static informational website. It has no
          user accounts and no comments. It does not currently load an advertising script (see “Advertising” below).
          {signup ? " It offers an optional election-night email alert." : " It has no email sign-up form."}
          {affiliates ? " Some pages contain disclosed affiliate links." : " It has no affiliate links."}
          {tips
            ? " Readers can leave an optional tip, which is processed by Stripe on Stripe’s own payment page."
            : " It takes no payments."}
        </p>

        <h2>Who is responsible for your information</h2>
        <p>
          {SITE.brandNote} {SITE.legalName} is the data controller for personal information
          collected through {SITE.name}, meaning it decides how and why that information is used.
          Privacy questions and requests go through the{" "}
          <Link href="/contact">contact form</Link>.
        </p>

        <h2>What the site collects, at a glance</h2>
        <ul>
          {signup && (
            <li>
              Election night results alert: the email address you enter, stored with
              {providerName ? ` ${providerName}` : " our email provider"}, added only after you
              confirm through a double opt-in email.
            </li>
          )}
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
          <li>Hosting: security logs kept by GitHub Pages.</li>
          <li>Messages you choose to send us by email or through the contact form (delivered by FormSubmit).</li>
          <li>
            {affiliates
              ? "Affiliate links: if you click one, the retailer may set cookies on its own site."
              : "Affiliate links: none are live today, so no affiliate cookies are involved."}
          </li>
        </ul>
        <p>
          The contact form is processed by FormSubmit, which emails your message to us. No Google AdSense,
          Ezoic, or Adsterra script is loaded today; see “Advertising” below.
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
          <li>
            We also use Google Analytics, but only if you click Accept. The Google script is not
            loaded, and its cookies are not set, if you click Reject or make no choice. No
            third-party embeds on the site set cookies.
          </li>
          {tips && (
            <li>
              If you leave a tip, Stripe processes the payment on its own page. We never see your
              full card number.
            </li>
          )}
          <li>
            {signup
              ? "If you sign up for the election-night alert, we use your email address only for that alert and occasional site updates. We never sell it."
              : "We do not collect email addresses through the site unless you email us or use the contact form."}
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
          Google LLC, to count visits and understand which pages are useful. The Google script is
          not on the page until you click Accept. Advertising and analytics storage start denied.
          When you first visit, a banner asks whether you accept analytics cookies.
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
            We have turned off Google signals and ad personalization, all advertising consent
            signals stay denied, and we do not use Google Analytics data for advertising or share
            it for targeted advertising.
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
          <CookieChoicesButton /> link in the footer of every page; choosing Reject stops Google
          Analytics cookies and removes any <code>_ga</code> cookies set on this site. Your choice
          is remembered in your browser’s local storage (key <code>mtm-analytics-consent</code>),
          not in a cookie. You can also install the{" "}
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
              {SITE.legalName}. They are not political contributions and are not tax-deductible.
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

        <h2>Election night results alert (email sign-up)</h2>
        {signup ? (
          <p>
            Some pages offer an optional “Election night results alert.” If you sign up, we collect
            your email address. It is stored with our email service provider
            {providerName ? `, ${providerName}` : ""}
            {EMAIL_SIGNUP.providerPrivacyUrl.trim() ? (
              <>
                {" "}(see its{" "}
                <a href={EMAIL_SIGNUP.providerPrivacyUrl} rel="noopener noreferrer">privacy policy</a>)
              </>
            ) : null}
            , and used only to send one email with links to official results on election night
            (November 3, 2026) and occasional updates about this site. Sign-up uses double opt-in:
            you are not added until you confirm through the link in a confirmation email. Every email
            includes an unsubscribe link, and you can unsubscribe at any time. We never sell or rent
            the list. Email providers may record delivery information and whether messages are
            opened or links clicked, as described in their privacy policies.
          </p>
        ) : (
          <p>
            We may offer an optional “Election night results alert.” No sign-up form is live on the
            site today. If we add one and you choose to sign up, we will collect only your email
            address, store it with a third-party email service provider named at signup, and use it
            only for the election-night alert and occasional site updates. Sign-up will use double
            opt-in (you confirm through a link in a confirmation email), every email will include an
            unsubscribe link, and we will never sell or rent the list. We will update this policy to
            name the provider before a form goes live.
          </p>
        )}

        <h2 id="advertising">Advertising</h2>
        <p>
          No advertising script is loaded on this site today. Google AdSense, Ezoic, and Adsterra
          are not running. The file <a href="/ads.txt">ads.txt</a> lists one Google AdSense
          publisher ID (<code>pub-5681559774142917</code>) so Google can verify the site if AdSense
          is turned on later. Ezoic and Adsterra are not listed in that file.
        </p>
        <p>
          If AdSense, Ezoic, or Adsterra is enabled later, this policy, the{" "}
          <Link href="/advertising">advertising disclosure</Link>, and <a href="/ads.txt">ads.txt</a>{" "}
          will be updated first. Those networks can use cookies to measure and personalize ads.
          Google’s EU/UK/CH consent message — the consent message Google provides for people in the
          European Economic Area, the United Kingdom, and Switzerland — is not shown today, because
          no advertising script loads. If AdSense is turned on, visitors in those places would see
          that message before personalized ads. You can opt out of Google’s personalized ads at{" "}
          <a href="https://www.google.com/settings/ads">Google Ads Settings</a>, and of some other
          vendors’ advertising cookies at <a href="https://www.aboutads.info">www.aboutads.info</a>.
        </p>

        <h2>Affiliate links</h2>
        {affiliates ? (
          <p>
            Some pages contain affiliate links to {affiliateRetailers.join(" and ")}. If you buy
            through one of these links, {SITE.legalName} may earn a commission at no extra cost to
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
          {SITE.legalName} so we can read and reply. FormSubmit may show a spam check
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
          <li>To respond to messages you send</li>
          {tips && <li>To process, record, and if needed refund tips, and to keep required tax and accounting records</li>}
          {signup && <li>To send the election-night alert and occasional site updates you signed up for</li>}
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
          delete them when they are no longer needed.
          {tips ? " We keep tip records for as long as tax and accounting rules require (generally up to seven years)." : ""}
          {signup ? " We keep alert subscribers’ email addresses until they unsubscribe or ask us to delete them." : ""}{" "}
          Google keeps Google Analytics data under the retention setting in our Google Analytics
          account (no longer than 14 months for user-level data). Cloudflare and GitHub keep analytics and security logs, and Stripe keeps payment records,
          under their own retention practices; we do not hold copies of Cloudflare’s or GitHub’s logs.
        </p>

        <h2>Visitors in the European Economic Area and the United Kingdom</h2>
        <p>
          The site is published in the United States for a U.S. audience. If the EU or UK General
          Data Protection Regulation applies to you, {SITE.legalName} is the controller for any
          personal information we process. Our legal basis is our legitimate interest in operating,
          securing, and improving a free public information website and in answering messages you
          choose to send. For Google Analytics, the legal basis is your consent, which you give by
          clicking Accept and can withdraw at any time through the Cookie choices link.
          {tips ? " For tips, the legal basis is processing needed to take your payment and to meet tax and accounting obligations." : ""}
          {signup ? " For the email alert, the legal basis is your consent, which you can withdraw at any time by unsubscribing." : ""}{" "}
          Information is processed in the United States by us and by our service providers
          (Cloudflare, GitHub, FormSubmit for contact form messages, Google for analytics and for email we receive{tips ? ", Stripe for tips" : ""}
          {signup ? ", and our email alert provider" : ""}). Subject to the conditions in
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
          To ask us to delete personal information you sent us, use the{" "}
          <Link href="/contact">contact form</Link> and put “Privacy request” and “deletion” in the
          message, with enough detail for us to find the message or record. Use the same form for
          any other privacy request and tell us what you are asking for. Because we do not have accounts, we usually hold no
          personal information about visitors other than emails and contact form messages they have sent us
          {tips ? ", records of tips" : ""}
          {signup ? ", and alert subscribers’ email addresses" : ""}. We may need to
          confirm that a request comes from the person the information is about, and we will
          respond within the time the applicable law requires. Requests about Cloudflare’s,
          GitHub’s, Google’s, or Stripe’s own records may need to go to those companies.
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
          {SITE.legalName}, {SITE.location}. Mailing address: {SITE.mailingAddress}.{" "}
          <Link href="/contact">Contact</Link>. See also the{" "}
          <Link href="/disclaimer">disclaimer</Link>, <Link href="/terms">terms of use</Link>, and{" "}
          <Link href="/advertising">advertising disclosure</Link>.
        </p>
      </div>
    </div>
  );
}
