import type { ReactNode } from "react";
import { Fragment } from "react";
import Link from "next/link";
import { HouseAd } from "@/components/HouseAd";
import { FOOTER_LEGAL_LINKS, SITE } from "@/data/site";
import { CookieChoicesButton } from "@/components/GoogleAnalytics";

/** Short header and footer for Census place pages. */
export function CityChrome({ children, path }: { children: ReactNode; path: string }) {
  return (
    <div className="city">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <p className="city-banner">{SITE.officialNotUs}</p>
      <header className="city-hdr">
        <Link href="/">{SITE.name}</Link>
        <nav className="city-nav" aria-label="Primary">
          <Link href="/cities/#place-search">Search</Link>
          <Link href="/cities">Places</Link>
          <Link href="/races">Races</Link>
          <Link href="/results">Results</Link>
          <Link href="/sources">Sources</Link>
        </nav>
      </header>
      <main id="main" className="city-main">
        <HouseAd path={path} />
        {children}
      </main>
      <footer className="city-ftr">
        <p>{SITE.officialNotUs}</p>
        <p>
          <Link href="/sources">Sources</Link>
          {FOOTER_LEGAL_LINKS.map((item) => (
            <Fragment key={item.href}>
              {" · "}
              <Link href={item.href}>{item.label}</Link>
            </Fragment>
          ))}
          {" · "}
          <CookieChoicesButton />
        </p>
      </footer>
    </div>
  );
}
