import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { SITE } from "@/data/site";

export default function NotFound() {
  return (
    <div>
      <PageHeader
        eyebrow="404"
        title="This page is not on the map"
        lede={`The link may be outdated, or the route does not exist yet. ${SITE.name} is an informational preview — it is not an official election website.`}
      />
      <ul className="space-y-2 text-navy">
        <li>
          <Link className="hover:underline" href="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="hover:underline" href="/ballot">
            Ballot lookup
          </Link>
        </li>
        <li>
          <Link className="hover:underline" href="/races">
            Race guides
          </Link>
        </li>
        <li>
          <Link className="hover:underline" href="/polls">
            Polls and ratings
          </Link>
        </li>
        <li>
          <Link className="hover:underline" href="/results">
            Results tracker
          </Link>
        </li>
        <li>
          <Link className="hover:underline" href="/about">
            About and operator
          </Link>
        </li>
      </ul>
    </div>
  );
}
