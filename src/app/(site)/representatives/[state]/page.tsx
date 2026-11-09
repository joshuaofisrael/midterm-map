import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { EmailSignup } from "@/components/EmailSignup";
import { JsonLd } from "@/components/JsonLd";
import { RepSources, SenateTable, bio } from "@/components/RepParts";
import {
  REDRAWN_2026, REP_STATES, districtName, districtShort, electLine, raceFor, repDistrictPath, repState,
} from "@/data/representatives2026";
import { getState } from "@/data/states";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";

export const dynamicParams = false;
export function generateStaticParams() {
  return REP_STATES.map((s) => ({ state: s.code }));
}

export async function generateMetadata({ params }: { params: Promise<{ state: string }> }) {
  const s = repState((await params).state);
  if (!s) return {};
  const n = s.house.length;
  return pageMetadata({
    title: `${s.name} representatives in Congress: senators and House members, 2026–2027`,
    description: `${s.name}'s two U.S. senators and ${n} House ${n === 1 ? "member" : "members"} now, and who won each 2026 race to serve from January 2027.`,
    path: `/representatives/${s.code}`,
    index: true,
  });
}

export default async function RepStatePage({ params }: { params: Promise<{ state: string }> }) {
  const s = repState((await params).state);
  if (!s) notFound();
  const i = REP_STATES.indexOf(s);
  const next = REP_STATES[(i + 1) % REP_STATES.length];
  return (
    <div className="space-y-6">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Representatives", path: "/representatives" }, { name: s.name, path: `/representatives/${s.code}` }])} />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Representatives", href: "/representatives" }, { label: s.name }]} />
      <header>
        <h1 className="font-serif text-3xl font-semibold">{s.name} representatives in Congress</h1>
        <p className="mt-3 leading-7">
          {s.name} has two U.S. senators and {s.house.length} {s.house.length === 1 ? "at-large House seat" : "House districts"}.
          The members listed as serving now hold office in the 119th Congress until January 3, 2027. The 2026 column shows
          the Associated Press call for each seat on the ballot.
          {REDRAWN_2026.has(s.code) ? ` ${s.name} used new congressional district lines in 2026, so a district's area can differ from the one its current member was elected to.` : ""}
        </p>
      </header>
      <section aria-labelledby="senate">
        <h2 id="senate" className="font-serif text-xl font-semibold">U.S. Senate</h2>
        <SenateTable state={s} />
      </section>
      <section aria-labelledby="house">
        <h2 id="house" className="font-serif text-xl font-semibold">U.S. House</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-line"><th className="py-2">District</th><th>Serving now</th><th>Won in 2026 (AP)</th></tr>
            </thead>
            <tbody>
              {s.house.map((h) => {
                const race = raceFor(h.race);
                return (
                  <tr key={h.district} className="border-b border-line align-top">
                    <td className="py-2"><Link className="font-medium text-navy underline" href={repDistrictPath(s.code, h.district)}>{districtShort(s.code, h.district)}</Link></td>
                    <td className="py-2">
                      {h.current ? (
                        <><a className="text-navy underline" href={bio(h.current.bioguide)} rel="noopener noreferrer">{h.current.name}</a> ({h.current.party})</>
                      ) : "Vacant"}
                    </td>
                    <td className="py-2">{race ? <Link className="text-navy underline" href={`/results/2026/${race.slug}`}>{electLine(race)}</Link> : "—"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-sm text-ink-muted">Open a district for its page: {districtName(s, s.house[0].district)} and the rest.</p>
      </section>
      <nav className="rounded-xl border border-line p-4 text-sm">
        <p>
          {getState(s.code) ? (
            <>
              <Link className="font-medium text-navy hover:underline" href={`/states/${s.code}`}>{s.name} election hub</Link>
              {" · "}<Link className="font-medium text-navy hover:underline" href={`/results/state/${s.code}`}>{s.name} 2026 results</Link>
              {" · "}
            </>
          ) : null}
          <Link className="font-medium text-navy hover:underline" href="/results/2026">Who won 2026</Link>
          {" · "}<Link className="font-medium text-navy hover:underline" href="/your-representative">Find your representative</Link>
          {" · "}<Link className="font-medium text-navy hover:underline" href="/representatives">All states</Link>
        </p>
        <p className="mt-2">Next: <Link className="font-medium text-navy hover:underline" href={`/representatives/${next.code}`}>{next.name} representatives</Link></p>
      </nav>
      <RepSources />
      <EmailSignup state={s.code} />
    </div>
  );
}
