"use client";

import { usePathname } from "next/navigation";
import { adsAllowedForPath } from "@/lib/adsense";

/**
 * Third-party banner (Adsterra, temporary until 8 Nov 2026).
 *
 * The ad script never runs in this page. Each banner is a static page on a
 * separate origin (joshuaofisrael.github.io/ad-frames), embedded in a sandboxed
 * iframe. The sandbox has no allow-popups, allow-top-navigation, allow-forms or
 * allow-modals, so the ad cannot open windows, tabs or pop-unders, show dialogs
 * or redirect this page. allow-same-origin only gives the frame its own
 * github.io origin, which is cross-origin to this site, so it cannot reach the
 * page. Fixed width and height stop layout shift.
 */
const FRAME_BASE = "https://joshuaofisrael.github.io/ad-frames/mtm";

export type BannerSize = "728x90" | "300x250" | "320x50";

export function BannerAd({ size, className = "" }: { size: BannerSize; className?: string }) {
  const pathname = usePathname() ?? "/";
  if (pathname.includes("/embed") || pathname.startsWith("/advertise")) return null;
  if (!adsAllowedForPath(pathname)) return null;
  const [width, height] = size.split("x").map(Number);
  return (
    <aside data-banner-ad={size} aria-label="Advertisement" className={`mx-auto my-3 flex-col items-center ${className}`}>
      <span className="mb-1 text-[10px] uppercase tracking-wide text-slate-500">Advertisement</span>
      <iframe
        title="Advertisement"
        src={`${FRAME_BASE}-${size}.html`}
        width={width}
        height={height}
        sandbox="allow-scripts allow-same-origin"
        referrerPolicy="origin"
        loading="lazy"
        scrolling="no"
        style={{ width, height, maxWidth: "100%", border: 0, overflow: "hidden", display: "block" }}
      />
    </aside>
  );
}

/** 728x90 on desktop (md and up), 320x50 on mobile. The hidden one never loads (lazy + display:none). */
export function TopBanner() {
  return (
    <div>
      <BannerAd size="728x90" className="hidden md:flex" />
      <BannerAd size="320x50" className="flex md:hidden" />
    </div>
  );
}
