/* Map the Midterms cookie choice for Google Analytics (Consent Mode v2).
   Approach: one prompt.
   - The stamped head defines gtag and a Consent Mode default before sa.min.js.
     analytics_storage starts denied everywhere. In the EEA, the UK, and
     Switzerland, ad storage starts denied too (wait_for_update). Elsewhere ad
     storage stays granted so the existing AdSense loader is unchanged.
   - Gatekeeper is the IAB TCF CMP. Ezoic shows it for EU/EEA/UK visitors.
     When tcData.gdprApplies is true, this banner stays hidden and Gatekeeper
     is the only prompt. Footer "Cookie choices" reopens Gatekeeper.
   - GA4 (G-Q9FB3RS751) loads only after a grant. For Gatekeeper visitors the
     grant is the CMP's TCF map, the same one as Gatekeeper's
     _updateGoogleConsentMode: analytics_storage requires purposes 1, 7, 8,
     and 10. consent update runs before gtag.js is inserted.
   - Switzerland is not in Ezoic's EU/EEA/UK geo list, so gdprApplies is not
     expected there. Those visitors keep this banner. The regional default
     still denies ad storage so Google's own message can grant it.
   - Everywhere else this banner remains. Accept loads gtag.js. Reject and no
     choice do not. The choice is kept in localStorage. A TCF decision does
     not overwrite that stored choice. */
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
    window["gtag_enable_tcf_support"] = true;
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
      gtagSafe("consent", "update", { analytics_storage: "denied" });
      // Withdrawal: a tag already loaded on this page must send nothing more,
      // not even a cookieless consent-mode ping on page exit.
      if (window.__mtmGaId) window["ga-disable-" + window.__mtmGaId] = true;
      clearGaCookies();
    }
    close();
  }
  function show(focus, force) {
    if (window.__mtmGatekeeper === true && !force) return;
    ensureStyle();
    if (document.getElementById("mtm-consent")) return;
    var box = document.createElement("div");
    box.id = "mtm-consent";
    box.setAttribute("role", "region");
    box.setAttribute("aria-label", "Cookie choices");
    box.innerHTML =
      '<div class="in"><p>We use Google Analytics cookies to count visits, only if you accept. ' +
      'The Google script loads only after Accept. Cloudflare Web Analytics (cookieless) runs either way. ' +
      '<a href="/privacy/#google-analytics">Privacy Policy</a></p>' +
      '<div class="b"><button type="button" class="acc">Accept</button>' +
      '<button type="button" class="rej">Reject</button></div></div>';
    box.querySelector(".acc").addEventListener("click", function () { choose("granted"); });
    box.querySelector(".rej").addEventListener("click", function () { choose("denied"); });
    document.body.appendChild(box);
    if (focus) box.querySelector(".acc").focus();
  }
  function openGatekeeper() {
    function open() {
      try {
        if (window.ezCMP && typeof window.ezCMP.generateCMPFromPrivacyCenter === "function") {
          window.ezCMP.generateCMPFromPrivacyCenter();
          return true;
        }
      } catch (e) {}
      return false;
    }
    if (open()) return true;
    if (window.ezCMPQueue && typeof window.ezCMPQueue.push === "function") {
      window.ezCMPQueue.push(open);
      return true;
    }
    return false;
  }
  document.addEventListener("click", function (e) {
    var t = e.target && e.target.closest ? e.target.closest("[data-consent-open]") : null;
    if (!t) return;
    e.preventDefault();
    if (window.__mtmGatekeeper === true && openGatekeeper()) return;
    show(true, true);
  });
  function purpose(tc, id) {
    var consents = tc.purpose && tc.purpose.consents;
    return !!(consents && (consents[id] || consents[String(id)]));
  }
  function allPurposes(tc, ids) {
    for (var i = 0; i < ids.length; i++) if (!purpose(tc, ids[i])) return false;
    return true;
  }
  var ourReady = false;
  function ourRegionInit() {
    if (ourReady || window.__mtmGatekeeper === true) return;
    ourReady = true;
    ensureStyle();
    var v = read();
    if (v === "granted") loadGa();
    else if (v !== "denied") show(false, false);
  }
  function applyTcf(tc) {
    var signal = function (ids) { return allPurposes(tc, ids) ? "granted" : "denied"; };
    var analytics = signal([1, 7, 8, 10]);
    ensureDefault();
    window.gtag("consent", "update", {
      ad_storage: signal([1]),
      ad_user_data: signal([1, 7]),
      ad_personalization: signal([3, 4]),
      analytics_storage: analytics
    });
    window.gtag("set", "url_passthrough", false);
    window.__mtmTcfAnalytics = analytics;
    if (analytics === "granted") loadGaScript();
    else clearGaCookies();
  }
  function onTcf(tc, ok) {
    if (!ok || !tc) return;
    var status = tc.eventStatus;
    if (tc.gdprApplies === true || status === "cmpuishown") {
      window.__mtmGatekeeper = true;
      close();
    }
    if (status !== "tcloaded" && status !== "useractioncomplete") return;
    if (tc.gdprApplies === true) {
      window.__mtmGatekeeper = true;
      close();
      applyTcf(tc);
      return;
    }
    if (tc.gdprApplies === false) {
      window.__mtmGatekeeper = false;
      ourRegionInit();
    }
  }
  function armTcf() {
    if (typeof window.__tcfapi !== "function") return false;
    window.__tcfapi("addEventListener", 2, onTcf);
    return true;
  }
  function init() {
    ensureDefault();
    if (!armTcf()) {
      ourRegionInit();
      return;
    }
    var waited = 0;
    var timer = setInterval(function () {
      waited += 100;
      if (window.__mtmGatekeeper === true) {
        clearInterval(timer);
        close();
        return;
      }
      if (window.__mtmGatekeeper === false || waited >= 2000) {
        clearInterval(timer);
        if (window.__mtmGatekeeper !== true) ourRegionInit();
      }
    }, 100);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
