import Link from "next/link";
import { EmailSignup } from "@/components/EmailSignup";
import { WINNERS_2026 } from "@/data/winners2026";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Who won the 2026 elections: Senate, House and governor winners",
  description: "Every 2026 Senate, House and governor race called by the Associated Press, with each candidate's votes and share.",
  path: "/results/2026",
  index: true,
});

export default function Winners2026Index() {
  const states = [...new Set(WINNERS_2026.map((w) => w.stateName))].sort();
  return (
    <div className="space-y-6">
      <h1 className="font-serif text-3xl font-semibold">Who won the 2026 elections</h1>
      <p className="text-sm leading-6">
        Races called by the Associated Press. Races AP has not called are not listed here yet. Vote counts are unofficial
        until certified.
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
      <EmailSignup />
    </div>
  );
}
