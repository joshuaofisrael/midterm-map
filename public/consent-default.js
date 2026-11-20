/* Consent Mode v2 default. Loaded synchronously at the start of <head>
   on every page, before /consent.js. analytics_storage starts denied.
   Advertising storage starts denied on every page: this site does not
   show ads and does not use advertising cookies. public/consent.js
   updates analytics_storage only after the visitor clicks Accept. */
(function () {
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  window.gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
    functionality_storage: "denied",
    personalization_storage: "denied",
    security_storage: "granted",
    wait_for_update: 500
  });
  window.gtag("set", "ads_data_redaction", true);
  window.gtag("set", "url_passthrough", false);
  window.__mtmConsentDefault = 1;
})();
