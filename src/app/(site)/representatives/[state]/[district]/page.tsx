import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { EmailSignup } from "@/components/EmailSignup";
import { JsonLd } from "@/components/JsonLd";
import { RepSources, SenateTable, bio } from "@/components/RepParts";
import {
  HOUSE_FIND_URL, REDRAWN_2026, REP_STATES, districtFromSlug, districtName, districtShort, districtSlug, raceFor,
  repDistrictPath, repState,
} from "@/data/representatives2026";
import { etDate, statusLine, winnerOf } from "@/data/winners2026";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";

export const dynamicParams = false;
export function generateStaticParams() {
  return REP_STATES.flatMap((s) => s.house.map((h) => ({ state: s.code, district: districtSlug(h.district) })));
}

function lookup(stateCode: string, slug: string) {
  const s = repState(stateCode);
  const d = districtFromSlug(slug);
  const seat = s?.house.find((h) => h.district === d);
  return s && seat ? { s, seat } : undefined;
}

export async function generateMetadata({ params }: { params: Promise<{ state: string; district: string }> }) {
  const p = await params;
  const hit = lookup(p.state, p.district);
  if (!hit) return {};
  const { s, seat } = hit;
  const race = raceFor(seat.race);
  const win = race ? winnerOf(race) : undefined;
  const who = seat.current ? `${seat.current.name} serves now` : "The seat is vacant";
  const next = win ? `${win.name} won in 2026` : "the 2026 race is not yet called";
  const short = districtShort(s.code, seat.district);
  let description = `Who represents ${short}? ${who}; ${next} per AP. Senators, sources and how to confirm your district.`;
  if (description.length > 160) description = `${short}: ${who}; ${next} per AP. Senators and official sources.`.slice(0, 160);
  return pageMetadata({
    title: `Who is the representative for ${districtName(s, seat.district)}? (${short}, 2026–2027)`,
    description,
    path: repDistrictPath(s.code, seat.district),
    index: true,
  });
}

export default async function RepDistrictPage({ params }: { params: Promise<{ state: string; district: string }> }) {
  const p = await params;
  const hit = lookup(p.state, p.district);
  if (!hit) notFound();
  const { s, seat } = hit;
  const race = raceFor(seat.race)!;
  const win = winnerOf(race);
  const name = districtName(s, seat.district);
  const short = districtShort(s.code, seat.district);
  const i = s.house.indexOf(seat);
  const next = s.house[i + 1];
  return (
    <div className="space-y-6">
      <JsonLd data={breadcrumbJsonLd([
        { name: "Home", path: "/" }, { name: "Representatives", path: "/representatives" },
        { name: s.name, path: `/representatives/${s.code}` }, { name: short, path: repDistrictPath(s.code, seat.district) },
      ])} />
      <Breadcrumbs items={[
        { label: "Home", href: "/" }, { label: "Representatives", href: "/representatives" },
        { label: s.name, href: `/representatives/${s.code}` }, { label: short },
      ]} />
      <header>
        <h1 className="font-serif text-3xl font-semibold">Who represents {name}?</h1>
        <p className="mt-3 text-lg leading-7">
          {seat.current ? (
            <><strong>{seat.current.name}</strong> ({seat.current.party}) represents {short} in the 119th Congress, which ends January 3, 2027.</>
          ) : (
            <>The {short} seat is vacant in the 119th Congress, according to the House Clerk.</>
          )}{" "}
          {win ? (
            <>
              <strong>{win.name}</strong> ({win.party}) won the 2026 race on November 3, 2026, according to
              the Associated Press, which called the race on {etDate(race.calledAt!)}. The new term starts January 3, 2027.
            </>
          ) : (
            <>The 2026 race is <strong>{statusLine(race).toLowerCase()}</strong>; follow the count at the{" "}
              <a className="font-medium text-navy underline" href={race.official.href} rel="noopener noreferrer">{race.official.label}</a>.</>
          )}
        </p>
        {REDRAWN_2026.has(s.code) ? (
          <p className="mt-2 text-sm text-ink-muted">
            {s.name} used new district lines for 2026. The 2026 winner represents the new {short}, which can cover a different
            area from the district the current member was elected in.
          </p>
        ) : null}
      </header>
      <section aria-labelledby="house-now">
        <h2 id="house-now" className="font-serif text-xl font-semibold">House member</h2>
        <dl className="mt-2 grid gap-2 text-sm sm:grid-cols-2">
          <div className="rounded-xl border border-line p-3">
            <dt className="font-semibold">Serving now (to January 3, 2027)</dt>
            <dd className="mt-1">
              {seat.current ? (
                <>
                  <a className="text-navy underline" href={bio(seat.current.bioguide)} rel="noopener noreferrer">{seat.current.name}</a> ({seat.current.party})
                  {seat.current.phone ? <span className="block text-ink-muted">Washington office: {seat.current.phone}</span> : null}
                </>
              ) : "Vacant"}
            </dd>
          </div>
          <div className="rounded-xl border border-line p-3">
            <dt className="font-semibold">Elected in 2026 (from January 3, 2027)</dt>
            <dd className="mt-1">
              {win ? `${win.name} (${win.party}), ${win.pct}% per AP` : statusLine(race)}
              <span className="block"><Link className="text-navy underline" href={`/results/2026/${race.slug}`}>Full {short} 2026 results</Link></span>
            </dd>
          </div>
        </dl>
      </section>
      <section aria-labelledby="senators">
        <h2 id="senators" className="font-serif text-xl font-semibold">{s.name}&apos;s senators</h2>
        <p className="text-sm text-ink-muted">Senators represent the whole state, so every {s.name} district shares them.</p>
        <SenateTable state={s} />
      </section>
      <section className="text-sm leading-6">
        <h2 className="font-serif text-xl font-semibold">Check your district</h2>
        <p>
          District lines follow street addresses, not ZIP codes. Confirm yours with the official{" "}
          <a className="font-medium text-navy underline" href={HOUSE_FIND_URL} rel="noopener noreferrer">house.gov finder</a>{" "}
          or with <Link className="font-medium text-navy underline" href="/your-representative">our ZIP lookup</Link>.
        </p>
      </section>
      <nav className="rounded-xl border border-line p-4 text-sm">
        <p>
          <Link className="font-medium text-navy hover:underline" href={`/representatives/${s.code}`}>All {s.name} representatives</Link>
          {" · "}<Link className="font-medium text-navy hover:underline" href="/results/2026">Who won 2026</Link>
          {" · "}<Link className="font-medium text-navy hover:underline" href="/calendar">Election calendar</Link>
        </p>
        {next ? (
          <p className="mt-2">Next: <Link className="font-medium text-navy hover:underline" href={repDistrictPath(s.code, next.district)}>{districtShort(s.code, next.district)} representative</Link></p>
        ) : null}
      </nav>
      <RepSources />
      <EmailSignup state={s.code} />
    </div>
  );
}
