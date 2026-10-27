/* Consent Mode v2 default. Loaded synchronously after the Gatekeeper scripts
   and before sa.min.js, on every page. analytics_storage starts denied.
   Ad storage starts denied in the EEA, the UK, and Switzerland (those tags
   wait up to 2s for a CMP update) and granted elsewhere, so AdSense outside
   those regions is not blocked. public/consent.js updates this from the
   Gatekeeper TCF signal or from this site's banner. */
(function () {
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  var denied = {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
    functionality_storage: "denied",
    personalization_storage: "denied",
    security_storage: "granted"
  };
  window.gtag("consent", "default", Object.assign({
    region: ["AT","BE","BG","HR","CY","CZ","DK","EE","FI","FR","DE","GR","HU","IE","IT","LV","LT","LU","MT","NL","PL","PT","RO","SK","SI","ES","SE","IS","LI","NO","GB","CH"],
    wait_for_update: 2000
  }, denied));
  window.gtag("consent", "default", Object.assign({}, denied, {
    ad_storage: "granted",
    ad_user_data: "granted",
    ad_personalization: "granted"
  }));
  window.gtag("set", "ads_data_redaction", true);
  window.gtag("set", "url_passthrough", false);
  window["gtag_enable_tcf_support"] = true;
  window.__mtmConsentDefault = 1;
})();
