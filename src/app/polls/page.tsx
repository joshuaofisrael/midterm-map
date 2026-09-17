import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CrossLinks } from "@/components/CrossLinks";
import { DemoBadge } from "@/components/DemoBadge";
import { JsonLd } from "@/components/JsonLd";
import { OfficialNotice } from "@/components/OfficialNotice";
import { PageHeader } from "@/components/PageHeader";
import { PollTable } from "@/components/PollTable";
import { RatingBoard } from "@/components/RatingBoard";
import { NATIONAL_GENERIC_BALLOT, POLLS } from "@/data/polls";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Polls and race ratings",
  description:
    "Illustrative 2026 midterm race ratings and seeded demo poll tables. Not a live forecast. Rows are marked demo until cited real feeds exist.",
  path: "/polls",
});

export default function PollsPage() {
  return (
    <div className="space-y-10">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Polls", path: "/polls" },
        ])}
      />
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "Polls" }]} />
      <PageHeader
        eyebrow="Polls"
        title="Polls and race ratings"
        lede="A ratings board and poll tables so the hub has a shareable structure before live, cited survey feeds exist. Every number on this page is a seeded demo row unless later labeled otherwise."
      />
      <OfficialNotice compact />

      <section className="rounded-xl border border-line bg-paper-card p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-serif text-xl font-semibold">National generic ballot strip</h2>
          <DemoBadge>Demo national strip</DemoBadge>
        </div>
        <p className="mt-2 text-sm text-ink-muted">
          Not a polling average. Not a prediction of House control. Shown only to reserve the layout.
        </p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {NATIONAL_GENERIC_BALLOT.map((row) => (
            <li key={row.label} className="rounded-lg border border-demo-line bg-demo-wash p-4">
              <p className="text-sm font-semibold">{row.label}</p>
              <p className="mt-2 text-sm">
                Dem {row.dem} · Rep {row.rep} · Other / undecided {row.other}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <RatingBoard />
      <PollTable rows={POLLS} caption="Seeded demo poll table" />
      <CrossLinks />
    </div>
  );
}
