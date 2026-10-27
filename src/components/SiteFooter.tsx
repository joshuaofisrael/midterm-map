import Link from "next/link";
import { CookieChoicesButton } from "@/components/GoogleAnalytics";
import { MAP_THE_GENERAL_URL } from "@/components/MapTheGeneral";
import { STRIPE_TIP_URL, tipJarEnabled } from "@/data/monetization";
import { FOOTER_LEGAL_LINKS, LEGAL_NAV, PRIMARY_NAV, SITE } from "@/data/site";
import { STARTER_STATES } from "@/data/states";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-line bg-navy-deep text-white">
      <div className="mx-auto grid max-w-site gap-10 px-4 py-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-serif text-2xl font-semibold">{SITE.name}</p>
          <p className="mt-3 max-w-lg text-sm leading-6 text-white/80">
            A voter information utility for the {SITE.electionDayLong}.
          </p>
          <p className="mt-4 text-sm leading-6 text-white/80">{SITE.officialNotUs}</p>
          <p className="mt-4 text-sm leading-6">
            <a className="underline hover:text-white" href={MAP_THE_GENERAL_URL}>
              Elections around the world: Map the General
            </a>
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-white/60">Explore</p>
          <ul className="mt-3 space-y-2 text-sm">
            {PRIMARY_NAV.map((item) => (
              <li key={item.href}>
                <Link className="hover:underline" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link className="hover:underline" href="/races">
                All race guides
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/cities">
                Census places
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/sources">
                Sources
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-white/60">Legal</p>
          <ul className="mt-3 space-y-2 text-sm">
            {LEGAL_NAV.map((item) => (
              <li key={item.href}>
                <Link className="hover:underline" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a className="hover:underline" href={SITE.voteGovUrl} rel="noopener noreferrer">
                Vote.gov
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-site px-4 py-6">
          <p className="text-xs leading-5 text-white/70">
            Starter state hubs:{" "}
            {STARTER_STATES.map((state, index) => (
              <span key={state.code}>
                <Link className="hover:underline" href={`/states/${state.code}`}>
                  {state.name}
                </Link>
                {index < STARTER_STATES.length - 1 ? " · " : ""}
              </span>
            ))}
          </p>
          <nav aria-label="Legal" className="mt-4 text-sm leading-6 text-white/90">
            {FOOTER_LEGAL_LINKS.map((item) => (
              <span key={item.href}>
                <Link className="underline hover:text-white" href={item.href}>
                  {item.label}
                </Link>
                {" · "}
              </span>
            ))}
            <CookieChoicesButton className="consent-link underline hover:text-white" />
          </nav>
          {tipJarEnabled() && (
            <p className="mt-1 text-xs leading-5 text-white/70">
              Keep this map free:{" "}
              <a className="underline" href={STRIPE_TIP_URL} target="_blank" rel="noopener">
                leave a tip
              </a>{" "}
              (paid through Stripe to support this site; not a political contribution, not
              tax-deductible).
            </p>
          )}
          <p className="mt-2 text-xs leading-5 text-white/80">
            Candidate names and party labels are for identification only.
          </p>
        </div>
      </div>
    </footer>
  );
}
