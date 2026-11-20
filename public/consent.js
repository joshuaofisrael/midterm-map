/* Map the Midterms cookie choice for Google Analytics (Consent Mode v2).
   Approach: one prompt.
   - The stamped head (/consent-default.js) sets a Consent Mode default:
     analytics_storage denied, and advertising storage denied. This site
     does not show ads and does not use advertising cookies.
   - This banner is the analytics prompt. Accept loads gtag.js. Reject
     and no choice do not. The choice is kept in localStorage. */
(function () {
  var KEY = "mtm-analytics-consent";
  function read() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function save(v) {
    try { localStorage.setItem(KEY, v); } catch (e) {}
  }
  function gtagSafe() {
    if (typeof window.gtag === "function") window.gtag.apply(null, arguments);
  }
  function ensureDefault() {
    if (window.__mtmConsentDefault) return;
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
  }
  function loadGaScript() {
    if (window.__mtmGaLoaded) return;
    var id = window.__mtmGaId;
    if (!id) return;
    ensureDefault();
    window.__mtmGaLoaded = true;
    window.gtag("set", "url_passthrough", false);
    window.gtag("js", new Date());
    window.gtag("config", id, {
      allow_google_signals: false,
      allow_ad_personalization_signals: false
    });
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(id);
    document.head.appendChild(s);
  }
  function loadGa() {
    if (window.__mtmGaId) window["ga-disable-" + window.__mtmGaId] = false;
    ensureDefault();
    window.gtag("consent", "update", { analytics_storage: "granted" });
    window.gtag("set", "url_passthrough", false);
    loadGaScript();
  }
  function clearGaCookies() {
    var host = location.hostname.replace(/^www\./, "");
    document.cookie.split(";").forEach(function (c) {
      var name = c.split("=")[0].trim();
      if (name === "_ga" || name.indexOf("_ga_") === 0) {
        ["", "; domain=." + host, "; domain=" + host].forEach(function (d) {
          document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/" + d;
        });
      }
    });
  }
  var css =
    "#mtm-consent{position:fixed;left:0;right:0;bottom:0;z-index:50;background:#fff;color:#111;border-top:2px solid #1f2a44;box-shadow:0 -2px 8px rgba(0,0,0,.12);padding:.75rem 1rem;font:15px/1.45 system-ui,-apple-system,Segoe UI,Roboto,sans-serif}" +
    "#mtm-consent .in{max-width:64rem;margin:0 auto;display:flex;flex-wrap:wrap;gap:.75rem;align-items:center;justify-content:space-between}" +
    "#mtm-consent p{margin:0;flex:1 1 22rem}#mtm-consent a{color:#1f2a44;text-decoration:underline}" +
    "#mtm-consent .b{display:flex;gap:.5rem}#mtm-consent button{font:inherit;padding:.45rem 1rem;border-radius:4px;border:2px solid #1f2a44;cursor:pointer;min-height:44px}" +
    "#mtm-consent .acc{background:#1f2a44;color:#fff}#mtm-consent .rej{background:#fff;color:#1f2a44}" +
    "#mtm-consent button:focus-visible{outline:3px solid #b45309;outline-offset:2px}" +
    ".consent-link{background:none;border:0;padding:0;font:inherit;color:inherit;text-decoration:underline;cursor:pointer}";
  function ensureStyle() {
    if (document.getElementById("mtm-consent-css")) return;
    var s = document.createElement("style");
    s.id = "mtm-consent-css";
    s.textContent = css;
    document.head.appendChild(s);
  }
  function close() {
    var el = document.getElementById("mtm-consent");
    if (el) el.parentNode.removeChild(el);
  }
  function choose(v) {
    save(v);
    if (v === "granted") loadGa();
    else {
      // Withdrawal: disable the loaded tag BEFORE the consent update, so the
      // update itself and any page-exit hit send nothing to Google.
      if (window.__mtmGaId) window["ga-disable-" + window.__mtmGaId] = true;
      gtagSafe("consent", "update", { analytics_storage: "denied" });
      clearGaCookies();
    }
    close();
  }
  function show(focus) {
    ensureStyle();
    if (document.getElementById("mtm-consent")) return;
    var box = document.createElement("div");
    box.id = "mtm-consent";
    box.setAttribute("role", "region");
    box.setAttribute("aria-label", "Cookie choices");
    box.innerHTML =
      '<div class="in"><p>We use Google Analytics cookies to count visits, only if you accept. ' +
      'The Google script loads only after Accept. Cloudflare Web Analytics (cookieless) runs either way. ' +
      'This site does not show ads and does not use advertising cookies. ' +
      '<a href="/privacy/#google-analytics">Privacy Policy</a></p>' +
      '<div class="b"><button type="button" class="acc">Accept</button>' +
      '<button type="button" class="rej">Reject</button></div></div>';
    box.querySelector(".acc").addEventListener("click", function () { choose("granted"); });
    box.querySelector(".rej").addEventListener("click", function () { choose("denied"); });
    document.body.appendChild(box);
    if (focus) box.querySelector(".acc").focus();
  }
  document.addEventListener("click", function (e) {
    var t = e.target && e.target.closest ? e.target.closest("[data-consent-open]") : null;
    if (!t) return;
    e.preventDefault();
    show(true);
  });
  var ourReady = false;
  function ourRegionInit() {
    if (ourReady) return;
    ourReady = true;
    ensureStyle();
    var v = read();
    if (v === "granted") loadGa();
    else if (v !== "denied") show(false);
  }
  function init() {
    ensureDefault();
    ourRegionInit();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
  // The banner is first drawn before Next.js hydrates, so it paints with the
  // page. Hydration can drop nodes it did not render; after load, put the
  // banner back if it is gone and no choice has been made.
  function recheck() {
    setTimeout(function () {
      if (document.getElementById("mtm-consent")) return;
      var v = read();
      if (v !== "granted" && v !== "denied") show(false);
    }, 0);
  }
  if (document.readyState === "complete") recheck();
  else window.addEventListener("load", recheck);
  // Late re-renders can also remove it; check again.
  [1500, 4000, 8000].forEach(function (ms) { setTimeout(recheck, ms); });
})();
