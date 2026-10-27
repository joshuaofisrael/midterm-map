import { pickHouseAd } from "@/lib/houseAd";

/**
 * Compact horizontal house-ad banner. The whole banner is one link.
 * The call to action is a span, not a nested anchor.
 * Inline size reserves the row so it cannot collapse before CSS.
 * Not sticky, fixed, or a popup. No image and no extra request.
 */
const HOUSE_AD_STYLE = {
  display: "flex",
  flexFlow: "row wrap",
  alignItems: "center",
  boxSizing: "border-box",
  width: "100%",
  minHeight: 72,
  gap: "0.45rem 0.85rem",
  padding: "0.55rem 0.85rem",
} as const;

export function HouseAd({ path, className }: { path: string; className?: string }) {
  const ad = pickHouseAd(path);
  return (
    <a
      className={className ? `house-ad ${className}` : "house-ad"}
      data-house-ad={ad.id}
      href={ad.href}
      rel="sponsored noopener"
      target="_blank"
      style={HOUSE_AD_STYLE}
    >
      <span className="house-ad-k">{ad.label}</span>
      <span className="house-ad-b">{ad.pitch}</span>
      <span className="house-ad-btn">{ad.cta}</span>
      <span className="house-ad-sr">{ad.headline}. Opens in a new tab.</span>
    </a>
  );
}
