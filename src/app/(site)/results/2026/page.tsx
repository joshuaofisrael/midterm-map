import Link from "next/link";
import { EmailSignup } from "@/components/EmailSignup";
import { JsonLd } from "@/components/JsonLd";
import { WINNERS_2026 } from "@/data/winners2026";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Who won the 2026 elections: Senate, House and governor winners",
  description:
    "Who won the 2026 midterms: AP-called Senate, House and governor winners with vote shares. Unofficial until certified; links to official returns.",
  path: "/results/2026",
  index: true,
});

const FAQS = [
  {
    question: "Who won the 2026 midterms?",
    answer:
      "This page lists every 2026 Senate, House and governor race the Associated Press has called, with each candidate's votes and share. Races AP has not called are not listed yet. Vote counts stay unofficial until a state certifies them.",
  },
  {
    question: "Who controls the House after the 2026 midterms?",
    answer:
      "A House majority is 218 of 435 seats. See How the House majority works for the seat math, then use the House races on this page for AP-called winners.",
  },
  {
    question: "Who controls the Senate after the 2026 midterms?",
    answer:
      "Senate control depends on the 100 seats and any vacancies. See How the Senate majority works for the rules, then use the Senate races on this page for AP-called winners.",
  },
  {
    question: "Are these official certified results?",
    answer:
      "No. Map the Midterms reports Associated Press race calls and unofficial vote counts. Official results come from each state's election office after certification. Links to official returns appear on the results hub.",
  },
] as const;

export default function Winners2026Index() {
  const states = [...new Set(WINNERS_2026.map((w) => w.stateName))].sort();
  return (
    <div className="space-y-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }}
      />
      <h1 className="font-serif text-3xl font-semibold">Who won the 2026 elections</h1>
      <p className="text-sm leading-6">
        Races called by the Associated Press. Races AP has not called are not listed here yet. Vote counts are unofficial
        until certified. For majority rules, see{" "}
        <Link className="text-navy hover:underline" href="/learn/house-majority">
          How the House majority works
        </Link>{" "}
        and{" "}
        <Link className="text-navy hover:underline" href="/learn/senate-majority">
          How the Senate majority works
        </Link>
        . The broader results hub is at{" "}
        <Link className="text-navy hover:underline" href="/results">
          /results/
        </Link>
        .
      </p>
      {states.map((s) => (
        <section key={s}>
          <h2 className="font-serif text-xl font-semibold">{s}</h2>
          <ul className="mt-1 list-disc pl-5 text-sm">
            {WINNERS_2026.filter((w) => w.stateName === s).map((w) => (
              <li key={w.slug}>
                <Link className="text-navy hover:underline" href={`/results/2026/${w.slug}`}>{w.label}</Link>:{" "}
                {w.candidates.find((c) => c.winner)?.name}
              </li>
            ))}
          </ul>
        </section>
      ))}
      <section aria-labelledby="who-won-faq" className="space-y-4 rounded-xl border border-line bg-paper-card p-5 shadow-card">
        <h2 id="who-won-faq" className="font-serif text-xl font-semibold">
          Frequently asked questions
        </h2>
        <dl className="space-y-4 text-sm leading-6">
          {FAQS.map((faq) => (
            <div key={faq.question}>
              <dt className="font-semibold">{faq.question}</dt>
              <dd className="mt-1 text-ink-muted">
                {faq.question === "Who controls the House after the 2026 midterms?" ? (
                  <>
                    A House majority is 218 of 435 seats. See{" "}
                    <Link className="text-navy hover:underline" href="/learn/house-majority">
                      How the House majority works
                    </Link>{" "}
                    for the seat math, then use the House races on this page for AP-called winners.
                  </>
                ) : faq.question === "Who controls the Senate after the 2026 midterms?" ? (
                  <>
                    Senate control depends on the 100 seats and any vacancies. See{" "}
                    <Link className="text-navy hover:underline" href="/learn/senate-majority">
                      How the Senate majority works
                    </Link>{" "}
                    for the rules, then use the Senate races on this page for AP-called winners.
                  </>
                ) : faq.question === "Are these official certified results?" ? (
                  <>
                    No. Map the Midterms reports Associated Press race calls and unofficial vote counts. Official results
                    come from each state&apos;s election office after certification. Links to official returns appear on the{" "}
                    <Link className="text-navy hover:underline" href="/results">
                      results hub
                    </Link>
                    .
                  </>
                ) : (
                  faq.answer
                )}
              </dd>
            </div>
          ))}
        </dl>
      </section>
      <EmailSignup />
    </div>
  );
}
