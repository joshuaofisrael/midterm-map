import { ImageResponse } from "next/og";
import { SITE } from "@/data/site";

export const runtime = "edge";
export const alt = "Midterm Map — 2026 U.S. midterms voter information";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function TwitterImage() {
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
          <div style={{ display: "flex", fontSize: 22, letterSpacing: 3, color: "#d7e4f2" }}>
            VOTER INFORMATION UTILITY
          </div>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 700, marginTop: 18 }}>
            {SITE.name}
          </div>
          <div style={{ display: "flex", fontSize: 32, color: "#d7e4f2", marginTop: 18 }}>
            2026 U.S. midterms · Tuesday, November 3, 2026
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 22, color: "#e8eef5" }}>
          Operated by {SITE.legalName} · Not an official election website
        </div>
      </div>
    ),
    { ...size },
  );
}
