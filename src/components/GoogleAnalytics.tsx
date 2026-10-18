/** Google Analytics 4 measurement ID for mapthemidterms.com. Public; safe in the frontend. */
export const GA_MEASUREMENT_ID = "G-Q9FB3RS751";

/** localStorage key that remembers the visitor's analytics choice ("granted" or "denied"). */
export const CONSENT_STORAGE_KEY = "mtm-analytics-consent";

/**
 * Google Consent Mode v2 defaults, set before gtag.js loads. Analytics storage and every ad
 * signal start denied; analytics storage is granted only after the visitor clicks Accept in
 * the cookie banner (public/consent.js). Google signals and ad personalization stay off.
 */
const consentDefaults = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',functionality_storage:'denied',personalization_storage:'denied',security_storage:'granted',wait_for_update:500});gtag('set','ads_data_redaction',true);gtag('set','url_passthrough',false);try{if(localStorage.getItem('${CONSENT_STORAGE_KEY}')==='granted')gtag('consent','update',{analytics_storage:'granted'})}catch(e){}gtag('js',new Date());gtag('config','${GA_MEASUREMENT_ID}',{allow_google_signals:false,allow_ad_personalization_signals:false});`;

/**
 * Sitewide head tags: Consent Mode defaults, gtag.js, and the small cookie-banner script.
 * Native script tags so the static export keeps them in every HTML file. data-keep tells
 * scripts/slim-city-pages.mjs to leave these tags on Census place pages.
 */
export function GoogleAnalyticsHead() {
  return (
    <>
      <script data-keep="1" dangerouslySetInnerHTML={{ __html: consentDefaults }} />
      <script
        data-keep="1"
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
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
