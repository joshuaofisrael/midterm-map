/**
 * Prominent inline banner pointing to the U.S. live results page on Map the General.
 * A static block in normal page flow on /live and the homepage only — not fixed,
 * not sticky, and not a modal or popup. Does not touch /live/results.json, the
 * live-results workflow, or this site's own canonical tags.
 */
export const LIVE_RESULTS_EXTERNAL_URL = "https://mapthegeneral.com/us/en/live/";

export function LiveResultsBanner() {
  return (
    <aside
      aria-labelledby="live-results-banner-heading"
      className="rounded-xl border-2 border-navy bg-navy-deep px-5 py-4 text-white shadow-card"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-navy-soft">
        Live now
      </p>
      <p id="live-results-banner-heading" className="mt-1 text-lg font-semibold leading-6">
        <a
          className="underline decoration-2 underline-offset-4 hover:text-navy-soft"
          href={LIVE_RESULTS_EXTERNAL_URL}
          rel="noopener"
        >
          Live results on Map the General
        </a>
      </p>
    </aside>
  );
}
