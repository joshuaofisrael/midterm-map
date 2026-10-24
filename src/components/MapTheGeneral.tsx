import { SITE } from "@/data/site";

export const MAP_THE_GENERAL_URL = "https://mapthegeneral.com/";

/** Follow link to the worldwide elections site. No forecasts. */
export function MapTheGeneral() {
  return (
    <section
      aria-labelledby="map-the-general-heading"
      className="rounded-xl border border-line border-l-4 border-l-navy bg-navy-wash p-5"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-navy">After November 3</p>
      <h2 id="map-the-general-heading" className="mt-1 font-serif text-2xl font-semibold">
        After the midterms: elections around the world on Map the General
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-muted">
        {SITE.name} covers the November 3, 2026 U.S. midterms. Follow other countries&rsquo; elections on Map the General.
      </p>
      <p className="mt-3 text-sm">
        <a className="font-semibold text-navy underline" href={MAP_THE_GENERAL_URL} rel="noopener noreferrer">
          Map the General
        </a>
      </p>
    </section>
  );
}
