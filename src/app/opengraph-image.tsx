import { ImageResponse } from "next/og";
import { SITE } from "@/data/site";

export const runtime = "edge";
export const alt = "Midterm Map — 2026 U.S. midterms voter information";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#143251",
          color: "#f6f7f9",
          padding: 64,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#d7e4f2",
              marginBottom: 18,
            }}
          >
            Voter information utility
          </div>
          <div style={{ display: "flex", fontSize: 76, lineHeight: 1.05, fontWeight: 700 }}>
            {SITE.name}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 32,
              color: "#d7e4f2",
              marginTop: 18,
              maxWidth: 860,
            }}
          >
            Ballot lookup, race guides, polls, and a results tracker for Election Day Tuesday,
            November 3, 2026.
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 22, color: "#e8eef5" }}>
          <div style={{ display: "flex" }}>Operated by {SITE.legalName}</div>
          <div style={{ display: "flex", marginTop: 8 }}>
            Not an official election website. Verify with your state or county election office.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
