import Link from "next/link";
import { LEGAL_NAV, PRIMARY_NAV, SITE } from "@/data/site";
import { STARTER_STATES } from "@/data/states";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-line bg-navy-deep text-white">
      <div className="mx-auto grid max-w-site gap-10 px-4 py-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-serif text-2xl font-semibold">{SITE.name}</p>
          <p className="mt-3 max-w-lg text-sm leading-6 text-white/80">
            A voter information utility for the {SITE.electionDayLong}. {SITE.name} is
            an unfiled brand name of {SITE.legalName}, a {SITE.entityType}. It is not a
            separate company and is not claimed as a filed DBA or trademark.
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
          <p className="mt-3 text-xs leading-5 text-white/70">
            © {new Date().getFullYear()} {SITE.legalName}. {SITE.location}. Contact{" "}
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
