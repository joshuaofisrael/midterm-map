import Link from "next/link";
import { CrossLinks } from "@/components/CrossLinks";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { EmailSignup } from "@/components/EmailSignup";
import { JsonLd } from "@/components/JsonLd";
import { RepLookup } from "@/components/RepLookup";
import { REP_STATES } from "@/data/representatives2026";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Find your representative: who is my congressman by ZIP code?",
  description:
    "Look up your U.S. House member and senators by ZIP code or district, including the 2026 winners who take office in January 2027.",
  path: "/your-representative",
  index: true,
});

const FAQS = [
  ["How do I find my congressional district?", "Enter your ZIP code above. If the ZIP code crosses district lines, your street address decides your district; your state election office or house.gov can confirm it."],
  ["When do the 2026 winners take office?", "Members of the 120th Congress elected on November 3, 2026 take office on January 3, 2027, under the 20th Amendment. Winners of special elections can be sworn in once their result is certified."],
  ["How many representatives does my state have?", "Every state has two senators. House seats are shared out by population after each census, from one at-large seat up to 52 in California."],
] as const;

export default function YourRepresentative() {
  const states = REP_STATES.map((s) => ({ code: s.code, name: s.name, districts: s.house.map((h) => h.district) }));
  return (
    <div className="space-y-6">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Representatives", path: "/representatives" }, { name: "Find your representative", path: "/your-representative" }])} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) }} />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Representatives", href: "/representatives" }, { label: "Find your representative" }]} />
      <h1 className="font-serif text-3xl font-semibold">Find your representative</h1>
      <p className="leading-7">
        Enter a ZIP code, or pick a state and district, to see your current member of the House and your two senators,
        plus who won your 2026 races. This is not an official government service; the official finder is at{" "}
        <a className="font-medium text-navy underline" href="https://www.house.gov/representatives/find-your-representative" rel="noopener noreferrer">house.gov</a>.
      </p>
      <RepLookup states={states} />
      <section className="space-y-3 text-sm leading-6">
        <h2 className="font-serif text-xl font-semibold">Common questions</h2>
        {FAQS.map(([q, a]) => (
          <div key={q}><p className="font-semibold">{q}</p><p className="text-ink-muted">{a}</p></div>
        ))}
      </section>
      <p className="text-sm">
        Browse <Link className="text-navy hover:underline" href="/representatives">representatives by state</Link> or see{" "}
        <Link className="text-navy hover:underline" href="/results/2026">who won every 2026 race</Link>.
      </p>
      <CrossLinks />
      <EmailSignup />
    </div>
  );
}
