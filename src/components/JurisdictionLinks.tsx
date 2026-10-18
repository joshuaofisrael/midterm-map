import Link from "next/link";
import { electionOfficeFor } from "@/data/electionOffices";
import { publishedStateLinks } from "@/data/placeLinks";

export function JurisdictionLinks({ code, name }: { code: string; name: string }) {
  const office = electionOfficeFor(code);
  const siteLinks = publishedStateLinks(code);

  return (
    <div className="links">
      <section>
        <h2>Pages on this site</h2>
        {siteLinks.length > 0 ? (
          <ul>
            {siteLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="muted">
            This site does not publish a state hub or a statewide 2026 Senate or governor page for {name}.
          </p>
        )}
      </section>
      <section>
        <h2>Official election links</h2>
        <ul>
          <li>
            State election office:{" "}
            <a href={office.office.href} rel="noopener noreferrer">
              {office.office.label}
            </a>
          </li>
          <li>
            {office.lookup.role}:{" "}
            <a href={office.lookup.href} rel="noopener noreferrer">
              {office.lookup.label}
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}
