import Link from "next/link";
import {
  activeSponsor,
  SPONSOR_COLORS,
  SPONSOR_SLOT_COPY,
  SPONSOR_SLOT_MIN_HEIGHT,
  type ElectionNightSponsor,
} from "@/data/sponsor";

/**
 * Compact sponsorship row under the top house-ad banner.
 * Inline size, border, and background reserve the row so it cannot collapse
 * before CSS. Not sticky, fixed, or a popup.
 */
const ROW_STYLE = {
  display: "flex",
  flexFlow: "row wrap",
  alignItems: "center",
  boxSizing: "border-box" as const,
  width: "100%",
  minHeight: SPONSOR_SLOT_MIN_HEIGHT,
  gap: "0.45rem 0.85rem",
  padding: "0.55rem 0.85rem",
  borderRadius: 10,
  margin: "0 0 1.25rem",
};

const KICKER_STYLE = {
  flex: "0 0 auto",
  whiteSpace: "nowrap" as const,
  fontSize: "0.6875rem",
  fontWeight: 700,
  letterSpacing: "0.12em",
  textTransform: "uppercase" as const,
  lineHeight: 1.3,
};

const COPY_STYLE = {
  flex: "1 1 16rem",
  minWidth: "12rem",
  fontSize: "0.875rem",
  lineHeight: 1.35,
};

const BUTTON_STYLE = {
  display: "inline-block",
  flex: "0 0 auto",
  marginLeft: "auto",
  padding: "0.4rem 0.8rem",
  borderRadius: 6,
  background: SPONSOR_COLORS.button,
  color: SPONSOR_COLORS.buttonText,
  fontSize: "0.875rem",
  fontWeight: 700,
  lineHeight: 1.2,
  whiteSpace: "nowrap" as const,
  textDecoration: "none",
};

export function SponsorSlot() {
  const sponsor = activeSponsor();
  if (sponsor) return <SoldBanner sponsor={sponsor} />;
  return (
    <aside
      className="sponsor-slot"
      data-sponsor-slot="open"
      aria-labelledby="sponsor-slot-label"
      style={{
        ...ROW_STYLE,
        border: `2px solid ${SPONSOR_COLORS.border}`,
        background: SPONSOR_COLORS.background,
        color: SPONSOR_COLORS.text,
      }}
    >
      <span id="sponsor-slot-label" className="sponsor-kicker" style={{ ...KICKER_STYLE, color: SPONSOR_COLORS.text }}>
        Advertise here
      </span>
      <span className="sponsor-copy" style={{ ...COPY_STYLE, color: SPONSOR_COLORS.text }}>
        {SPONSOR_SLOT_COPY}
      </span>
      <Link className="sponsor-btn" href="/advertise/" style={BUTTON_STYLE}>
        Book this slot
      </Link>
    </aside>
  );
}

function SoldBanner({ sponsor }: { sponsor: ElectionNightSponsor }) {
  return (
    <a
      className="sponsor-slot sponsor-slot-sold"
      data-sponsor-slot="sold"
      href={sponsor.url}
      rel="sponsored noopener"
      target="_blank"
      style={{
        ...ROW_STYLE,
        border: "2px solid #d5dde6",
        background: "#ffffff",
        color: "#1a2332",
        textDecoration: "none",
      }}
    >
      {sponsor.image ? (
        // eslint-disable-next-line @next/next/no-img-element -- optional https or public/ logo with a fixed box
        <img
          alt=""
          src={sponsor.image}
          width={120}
          height={40}
          decoding="async"
          style={{ width: 120, height: 40, objectFit: "contain", flex: "0 0 auto" }}
        />
      ) : null}
      <span className="sponsor-kicker" style={{ ...KICKER_STYLE, color: "#5b6472" }}>
        Sponsored by {sponsor.name}
      </span>
      <span className="sponsor-copy" style={{ ...COPY_STYLE, color: "#4a5568" }}>
        {sponsor.copy}
      </span>
      <span className="sponsor-sr">Opens in a new tab.</span>
    </a>
  );
}
