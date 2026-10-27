/* RankFootprint sample price.
   The static banner is the $1 offer. This file is loaded with defer, so it
   does not block parsing. It fetches the sample status after the document is
   parsed and replaces the banner wording only when mode is "free".
   A network error, a bad payload, or a timeout leaves the $1 wording in place.
   The replacement lines match the $1 lines in length so the reserved row does
   not move. */
(function () {
  var ads = document.querySelectorAll('[data-house-ad="rankfootprint"]');
  if (!ads.length) return;

  var freeHeadline = "A free scan of Google Maps rank";
  var freePitch = "A free scan of Google Maps rank. RankFootprint is not affiliated with Google.";
  var freeCta = "Start a free grid scan";
  var freeSr = "A free scan of Google Maps rank. Opens in a new tab.";
  var ctrl = new AbortController();
  var timer = setTimeout(function () {
    ctrl.abort();
  }, 4000);

  fetch("https://rankfootprint-api.joshofisrael.workers.dev/api/sample-status", {
    method: "GET",
    credentials: "omit",
    signal: ctrl.signal,
  })
    .then(function (res) {
      if (!res.ok) throw new Error("status");
      return res.json();
    })
    .then(function (data) {
      if (!data || data.mode !== "free") return;
      for (var i = 0; i < ads.length; i++) {
        var ad = ads[i];
        var pitch = ad.querySelector(".house-ad-b");
        var btn = ad.querySelector(".house-ad-btn");
        var sr = ad.querySelector(".house-ad-sr");
        var title = ad.querySelector(".house-ad-t");
        if (pitch) pitch.textContent = freePitch;
        if (btn) btn.textContent = freeCta;
        if (sr) sr.textContent = freeSr;
        if (title) title.textContent = freeHeadline;
      }
    })
    .catch(function () {})
    .then(function () {
      clearTimeout(timer);
    });
})();
