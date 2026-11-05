import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { EmailSignup } from "@/components/EmailSignup";
import { JsonLd } from "@/components/JsonLd";
import { getState } from "@/data/states";
import { WINNERS_2026, getWinner, nextWinner, winnerTitle, winnerDescription, etDate } from "@/data/winners2026";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return WINNERS_2026.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const w = getWinner((await params).slug);
  if (!w) return {};
  return pageMetadata({ title: winnerTitle(w), description: winnerDescription(w), path: `/results/2026/${w.slug}`, index: true });
}

export default async function WinnerPage({ params }: { params: Promise<{ slug: string }> }) {
  const w = getWinner((await params).slug);
  if (!w) notFound();
  const win = w.candidates.find((c) => c.winner)!;
  const next = nextWinner(w.slug);
  const hasHub = Boolean(getState(w.state));
  return (
    <div className="space-y-6">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Results", path: "/results" },
          { name: "2026 winners", path: "/results/2026" },
          { name: w.label, path: `/results/2026/${w.slug}` },
        ])}
      />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Results", href: "/results" },
          { label: "2026 winners", href: "/results/2026" },
          { label: w.label },
        ]}
      />
      <header>
        <h1 className="font-serif text-3xl font-semibold">{winnerTitle(w)}</h1>
        <p className="mt-3 text-lg leading-7">
          <strong>{win.name}</strong> ({win.party}) won the 2026 {w.label} election with {win.pct}% of the vote, according
          to the Associated Press, which called the race on {etDate(w.calledAt)}.
          {w.flipped ? " The seat changed party." : ""}
        </p>
      </header>
      <section aria-labelledby="cands">
        <h2 id="cands" className="font-serif text-xl font-semibold">Every candidate</h2>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-line">
                <th className="py-2">Candidate</th><th>Party</th><th className="text-right">Votes</th><th className="text-right">Share</th>
              </tr>
            </thead>
            <tbody>
              {w.candidates.map((c) => (
                <tr key={c.name} className="border-b border-line">
                  <td className="py-2">{c.name}{c.winner ? <strong> ✓ Winner</strong> : null}</td>
                  <td>{c.party}</td>
                  <td className="text-right">{c.votes.toLocaleString("en-US")}</td>
                  <td className="text-right">{c.pct}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-ink-muted">
          Unofficial vote counts as of {etDate(w.lastUpdated)}
          {w.eevp != null ? `, with about ${Math.round(w.eevp)}% of the expected vote counted` : ""}. Totals can change until
          the state certifies the result.
        </p>
      </section>
      <section className="text-sm leading-6">
        <h2 className="font-serif text-xl font-semibold">Sources</h2>
        <ul className="mt-2 list-disc pl-5">
          <li>Race call and vote counts: The Associated Press, via the Guardian&apos;s published AP results data.</li>
          <li>Certified results are published by the {w.stateName} state election office.</li>
        </ul>
      </section>
      <nav className="rounded-xl border border-line p-4 text-sm">
        <p>
          {hasHub ? (
            <>
              <Link className="font-medium text-navy hover:underline" href={`/states/${w.state}`}>{w.stateName} election hub</Link>
              {" · "}
            </>
          ) : null}
          <Link className="font-medium text-navy hover:underline" href="/results/2026">All 2026 winners</Link>
        </p>
        {next ? (
          <p className="mt-2">
            Next: <Link className="font-medium text-navy hover:underline" href={`/results/2026/${next.slug}`}>{winnerTitle(next)}</Link>
          </p>
        ) : null}
      </nav>
      <EmailSignup state={w.state} />
    </div>
  );
}
