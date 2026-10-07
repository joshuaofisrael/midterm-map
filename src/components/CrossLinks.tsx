import Link from "next/link";
import { indexableRaceHref } from "@/data/results";

export function CrossLinks({
  state,
  raceSlug,
}: {
  state?: string;
  raceSlug?: string;
}) {
  const links = [
    { href: "/ballot", label: "Ballot lookup" },
    { href: "/races", label: "Race guides" },
    { href: "/polls", label: "Polls & ratings" },
    { href: "/results", label: "Results tracker" },
  ];

  if (state) {
    links.unshift({ href: `/states/${state}`, label: `${state} hub` });
    links.push({ href: `/ballot/${state}`, label: `${state} sample ballot` });
  }
  if (raceSlug) {
    const guideHref = `/races/${raceSlug}`;
    links.push({ href: guideHref, label: "This race guide" });
    const resultsHref = indexableRaceHref(raceSlug);
    if (resultsHref !== guideHref) {
      links.push({ href: resultsHref, label: "This race result" });
    }
  }

  const unique = links.filter(
    (link, index, arr) => arr.findIndex((item) => item.href === link.href) === index,
  );

  return (
    <nav aria-label="Related sections" className="rounded-xl border border-line bg-paper-tint p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">Jump across the hub</p>
      <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm">
        {unique.map((link) => (
          <li key={link.href}>
            <Link className="font-medium text-navy hover:underline" href={link.href}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
