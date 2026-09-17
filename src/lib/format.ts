import type { PartyId, RatingTier } from "@/data/types";

export function partyTone(party: PartyId): string {
  switch (party) {
    case "DEM":
      return "text-[#1d4f86]";
    case "REP":
      return "text-[#8a3030]";
    case "LIB":
      return "text-[#6b5344]";
    case "GRN":
      return "text-[#2f5d3a]";
    default:
      return "text-ink-muted";
  }
}

export function ratingTone(tier: RatingTier): string {
  if (tier.includes("D")) return "bg-[#e4eef7] text-[#1d4f86] border-[#b9cde3]";
  if (tier.includes("R")) return "bg-[#f6e8e8] text-[#7a2d2d] border-[#e0c0c0]";
  return "bg-[#f3efe4] text-[#5c4a1f] border-[#ddd0a8]";
}

export function initialsFor(name: string): string {
  const parts = name
    .replace(/[^A-Za-z\s'-]/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function chamberLabel(chamber: string): string {
  switch (chamber) {
    case "senate":
      return "U.S. Senate";
    case "house":
      return "U.S. House";
    case "governor":
      return "Governor";
    default:
      return "Statewide";
  }
}
