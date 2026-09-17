import type { ReactNode } from "react";
import { SITE } from "@/data/site";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <p className="border-b border-notice-line bg-notice-wash px-4 py-2 text-center text-xs leading-5 text-navy-deep">
        {SITE.officialNotUs}
      </p>
      <SiteHeader />
      <main id="main" className="mx-auto w-full max-w-site flex-1 px-4 py-8 sm:py-10">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
