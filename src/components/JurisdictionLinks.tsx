import Link from "next/link";
import { electionOfficeFor } from "@/data/electionOffices";
import { publishedStateLinks } from "@/data/placeLinks";

export function JurisdictionLinks({ code, name }: { code: string; name: string }) {
  const office = electionOfficeFor(code);
  const siteLinks = publishedStateLinks(code);

  return (
    <div className="space-y-6">
      <section>
        <h2 className="font-serif text-2xl font-semibold">Pages on this site</h2>
        {siteLinks.length > 0 ? (
          <ul className="mt-3 space-y-2 text-sm">
            {siteLinks.map((link) => (
              <li key={link.href}>
                <Link className="font-medium text-navy hover:underline" href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm leading-6 text-ink-muted">
            This site does not publish a state hub or a statewide 2026 Senate or governor page for{" "}
            {name}.
          </p>
        )}
      </section>
      <section>
        <h2 className="font-serif text-2xl font-semibold">Official election links</h2>
        <ul className="mt-3 space-y-2 text-sm leading-6">
          <li>
            State election office:{" "}
            <a className="font-medium text-navy hover:underline" href={office.office.href} rel="noopener noreferrer">
              {office.office.label}
            </a>
          </li>
          <li>
            {office.lookup.role}:{" "}
            <a className="font-medium text-navy hover:underline" href={office.lookup.href} rel="noopener noreferrer">
              {office.lookup.label}
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}
