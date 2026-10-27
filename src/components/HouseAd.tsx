import { pickHouseAd } from "@/lib/houseAd";

/**
 * One static house-ad card. The whole card is a single link.
 * The call to action is a span, not a nested anchor.
 * Dimensions are inline so the box cannot collapse before CSS.
 */
const HOUSE_AD_STYLE = {
  display: "flex",
  flexDirection: "column",
  boxSizing: "border-box",
  width: "100%",
  minHeight: 220,
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
      <span className="house-ad-t">{ad.headline}</span>
      <span className="house-ad-b">{ad.pitch}</span>
      <span className="house-ad-btn">{ad.cta}</span>
      <span className="house-ad-sr">opens in a new tab</span>
    </a>
  );
}
