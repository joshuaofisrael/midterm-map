import Link from "next/link";
import { CrossLinks } from "@/components/CrossLinks";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { EmailSignup } from "@/components/EmailSignup";
import { JsonLd } from "@/components/JsonLd";
import { RepLookup } from "@/components/RepLookup";
import { RepSources } from "@/components/RepParts";
import { REP_STATES, repStatePath } from "@/data/representatives2026";
import { WINNERS_2026 } from "@/data/winners2026";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Who are my representatives? Senators and House members by state, 2026–2027",
  description:
    "Find your U.S. senators and House member by state, district or ZIP code: who serves now and who won in 2026 to take office in January 2027.",
  path: "/representatives",
  index: true,
});

const lookupStates = () =>
  REP_STATES.map((s) => ({ code: s.code, name: s.name, districts: s.house.map((h) => h.district) }));

export default function RepresentativesHub() {
  const houseCalled = WINNERS_2026.filter((w) => w.office === "House").length;
  return (
    <div className="space-y-6">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Representatives", path: "/representatives" }])} />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Representatives" }]} />
      <header>
        <h1 className="font-serif text-3xl font-semibold">Your representatives in Congress, 2026–2027</h1>
        <p className="mt-3 leading-7">
          Every state has two U.S. senators and at least one member of the House of Representatives. The 119th Congress
          serves until January 3, 2027, when the 120th Congress, elected on November 3, 2026, takes office. Each state and
          district page below shows who serves now, from the official Senate and House Clerk lists, and who won the 2026
          race according to Associated Press calls ({houseCalled} of 435 House races called so far).
        </p>
      </header>
      <RepLookup states={lookupStates()} />
      <section aria-labelledby="by-state">
        <h2 id="by-state" className="font-serif text-xl font-semibold">Representatives by state</h2>
        <ul className="mt-2 grid gap-1 text-sm sm:grid-cols-3">
          {REP_STATES.map((s) => (
            <li key={s.code}>
              <Link className="text-navy hover:underline" href={repStatePath(s.code)}>{s.name}</Link>{" "}
              <span className="text-ink-muted">({s.house.length} {s.house.length === 1 ? "district" : "districts"})</span>
            </li>
          ))}
        </ul>
      </section>
      <p className="text-sm">
        See also: <Link className="text-navy hover:underline" href="/your-representative">Find your representative</Link>
        {" · "}<Link className="text-navy hover:underline" href="/results/2026">Who won 2026</Link>
        {" · "}<Link className="text-navy hover:underline" href="/calendar">Election calendar</Link>
      </p>
      <CrossLinks />
      <RepSources />
      <EmailSignup />
    </div>
  );
}
