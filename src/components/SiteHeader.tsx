"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { PRIMARY_NAV, SITE } from "@/data/site";

const TRUST_NAV = [
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/disclaimer", label: "Disclaimer" },
];

function navClass(pathname: string, href: string) {
  const active = pathname === href || pathname.startsWith(`${href}/`);
  return active
    ? "text-navy font-semibold"
    : "text-ink-muted hover:text-navy";
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-site items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="min-w-0">
          <span className="block font-serif text-lg font-semibold tracking-tight text-ink sm:text-xl">
            {SITE.name}
          </span>
          <span className="block truncate text-xs text-ink-muted">
            2026 midterms information · not official · not affiliated
          </span>
        </Link>
        <nav className="hidden flex-wrap items-center justify-end gap-x-4 gap-y-1 text-sm lg:flex" aria-label="Primary">
          {PRIMARY_NAV.map((item) => (
            <Link key={item.href} href={item.href} className={navClass(pathname, item.href)}>
              {item.label}
            </Link>
          ))}
          <Link href="/cities" className={navClass(pathname, "/cities")}>
            Places
          </Link>
          <Link href="/about" className={navClass(pathname, "/about")}>
            About
          </Link>
          {TRUST_NAV.map((item) => (
            <Link key={item.href} href={item.href} className={navClass(pathname, item.href)}>
              {item.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          className="rounded-md border border-line px-3 py-1.5 text-sm lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
      {open && (
        <nav id="mobile-nav" className="border-t border-line px-4 py-3 lg:hidden" aria-label="Mobile">
          <ul className="space-y-2 text-sm">
            {PRIMARY_NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={navClass(pathname, item.href)} onClick={() => setOpen(false)}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/cities" className={navClass(pathname, "/cities")} onClick={() => setOpen(false)}>
                Places
              </Link>
            </li>
            <li>
              <Link href="/about" className={navClass(pathname, "/about")} onClick={() => setOpen(false)}>
                About
              </Link>
            </li>
            {TRUST_NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={navClass(pathname, item.href)} onClick={() => setOpen(false)}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
