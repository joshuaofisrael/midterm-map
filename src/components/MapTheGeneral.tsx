import { SITE } from "@/data/site";

export const MAP_THE_GENERAL_URL = "https://mapthegeneral.com/";

/**
 * Live country hubs on Map the General, checked 27 October 2026.
 * Each URL returned HTTP 200. Labels follow that hub's title and
 * description. A date is included only for a future polling day the hub prints;
 * past elections link to their results page instead.
 */
export const MAP_THE_GENERAL_HUBS: { href: string; label: string; date?: string }[] = [
  { href: "https://mapthegeneral.com/au/", label: "Australia elections" },
  { href: "https://mapthegeneral.com/br/en/elections/general-2026/", label: "Brazil 2026 general election results" },
  { href: "https://mapthegeneral.com/ca/", label: "Canada federal election", date: "15 October 2029" },
  {
    href: "https://mapthegeneral.com/ch/",
    label: "Switzerland National Council election",
    date: "24 October 2027",
  },
  { href: "https://mapthegeneral.com/es/", label: "Spain general election", date: "29 November 2026" },
  { href: "https://mapthegeneral.com/gb/", label: "United Kingdom general election" },
  { href: "https://mapthegeneral.com/ie/", label: "Ireland elections" },
  { href: "https://mapthegeneral.com/il/", label: "Israel 2026 Knesset election" },
  { href: "https://mapthegeneral.com/it/", label: "Italy elections" },
  { href: "https://mapthegeneral.com/mx/", label: "Mexico federal election", date: "6 June 2027" },
  { href: "https://mapthegeneral.com/no/", label: "Norway Storting election" },
  { href: "https://mapthegeneral.com/pl/", label: "Poland elections" },
  {
    href: "https://mapthegeneral.com/rs/en/elections/national-assembly-2026/",
    label: "Serbia 2026 National Assembly election preliminary results",
  },
  { href: "https://mapthegeneral.com/se/", label: "Sweden elections", date: "8 September 2030" },
];

/** Follow link to the worldwide elections site. No forecasts. */
export function MapTheGeneral({ variant = "link" }: { variant?: "link" | "hubs" }) {
  if (variant === "hubs") return <MapTheGeneralHubs />;
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
        <a className="font-semibold text-navy underline" href={MAP_THE_GENERAL_URL}>
          Map the General
        </a>
      </p>
    </section>
  );
}

function MapTheGeneralHubs() {
  return (
    <section
      aria-labelledby="map-the-general-heading"
      className="rounded-xl border border-line border-l-4 border-l-navy bg-navy-wash p-5"
    >
      <h2 id="map-the-general-heading" className="font-serif text-2xl font-semibold">
        After the midterms: elections around the world
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-muted">
        See upcoming national and regional elections, and recent results, on{" "}
        <a className="font-semibold text-navy underline" href={MAP_THE_GENERAL_URL}>
          Map the General
        </a>
        .
      </p>
      <ul className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
        {MAP_THE_GENERAL_HUBS.map((hub) => (
          <li key={hub.href}>
            <a className="font-medium text-navy underline" href={hub.href}>
              {hub.label}
            </a>
            {hub.date ? <span className="text-ink-muted">, {hub.date}</span> : null}
          </li>
        ))}
      </ul>
    </section>
  );
}
