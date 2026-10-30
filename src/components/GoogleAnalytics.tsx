/** Google Analytics 4 measurement ID for mapthemidterms.com. Public; safe in the frontend. */
export const GA_MEASUREMENT_ID = "G-Q9FB3RS751";

/** localStorage key that remembers the visitor's analytics choice ("granted" or "denied"). */
export const CONSENT_STORAGE_KEY = "mtm-analytics-consent";

/**
 * Sitewide head tags for the cookie banner. gtag.js is not in the page.
 * public/consent.js loads it only after Accept, or after a TCF consent
 * signal grants analytics storage. data-keep tells scripts/slim-city-pages.mjs
 * to leave these tags on Census place pages. The measurement id string has to
 * stay in the HTML for that check. The Consent Mode
 * default is stamped into exported HTML; they are not part of this component.
 */
export function GoogleAnalyticsHead() {
  return (
    <>
      <script
        data-keep="1"
        dangerouslySetInnerHTML={{ __html: `window.__mtmGaId=${JSON.stringify(GA_MEASUREMENT_ID)};` }}
      />
      <script data-keep="1" defer src="/consent.js" />
    </>
  );
}

/** Footer control that reopens the cookie banner (handled by public/consent.js). */
export function CookieChoicesButton({ className }: { className?: string }) {
  return (
    <button type="button" className={className ?? "consent-link"} data-consent-open="1">
      Cookie choices
    </button>
  );
}
