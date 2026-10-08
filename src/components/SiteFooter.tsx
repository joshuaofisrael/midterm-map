import Link from "next/link";
import { LEGAL_NAV, PRIMARY_NAV, SITE } from "@/data/site";
import { STARTER_STATES } from "@/data/states";
import { STRIPE_TIP_URL, tipJarEnabled } from "@/data/monetization";

/** Owner rule (Oct 8, 2026): exact copyright line. Keep as one string so it renders as one text node. */
const COPYRIGHT_YEAR = 2026;

const FOOTER_LEGAL_LINKS = [
  { href: "/terms", label: "Terms of Use" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/disclaimer", label: "Disclaimer" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-line bg-navy-deep text-white">
      <div className="mx-auto grid max-w-site gap-10 px-4 py-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-serif text-2xl font-semibold">{SITE.name}</p>
          <p className="mt-3 max-w-lg text-sm leading-6 text-white/80">
            A voter information utility for the {SITE.electionDayLong}. {SITE.brandNote}
          </p>
          <p className="mt-4 text-sm leading-6 text-white/80">{SITE.officialNotUs}</p>
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
          <p className="mt-4 text-sm font-medium leading-6 text-white">
            {`© ${COPYRIGHT_YEAR} ${SITE.legalName}. All rights reserved. ${SITE.name} is owned and operated by ${SITE.legalName}.`}
          </p>
          <p className="mt-1 text-sm font-medium leading-6 text-white/90">
            Operated by Joshua Israel Ventures LLC
          </p>
          <nav aria-label="Legal" className="mt-2 text-sm leading-6 text-white/90">
            {FOOTER_LEGAL_LINKS.map((item, index) => (
              <span key={item.href}>
                <Link className="underline hover:text-white" href={item.href}>
                  {item.label}
                </Link>
                {index < FOOTER_LEGAL_LINKS.length - 1 ? " · " : ""}
              </span>
            ))}
          </nav>
          {tipJarEnabled() && (
            <p className="mt-1 text-xs leading-5 text-white/70">
              Keep this map free:{" "}
              <a className="underline" href={STRIPE_TIP_URL} target="_blank" rel="noopener">
                leave a tip
              </a>{" "}
              (paid to {SITE.legalName} via Stripe; not a political contribution, not tax-deductible).
            </p>
          )}
          <p className="mt-2 text-xs leading-5 text-white/80">
            {SITE.legalName}, {SITE.location}. Contact{" "}
            <a className="underline" href={`mailto:${SITE.email}`}>
              {SITE.email}
            </a>
            . Sunbiz document number {SITE.sunbizDocumentNumber} ({SITE.sunbizStatus}).
            Candidate names and party labels are for identification only.
          </p>
        </div>
      </div>
    </footer>
  );
}
