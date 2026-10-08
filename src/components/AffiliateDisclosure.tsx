import { AFFILIATE, affiliateEnabled } from "@/data/monetization";

/** FTC affiliate disclosure. Place directly above any affiliate links. */
export function AffiliateDisclosure() {
  if (!affiliateEnabled()) return null;
  return (
    <p className="rounded-md border border-line bg-paper-tint px-3 py-2 text-xs leading-5 text-ink-muted">
      Some links on this page are affiliate links. If you buy through them, Joshua Israel Ventures
      LLC may earn a commission at no extra cost to you.
      {AFFILIATE.amazonTag.trim() ? " As an Amazon Associate we earn from qualifying purchases." : ""}
    </p>
  );
}
