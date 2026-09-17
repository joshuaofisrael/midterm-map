import Link from "next/link";
import { SITE } from "@/data/site";

export function OfficialNotice({
  compact = false,
  className = "",
}: {
  compact?: boolean;
  className?: string;
}) {
  return (
    <aside
      className={`rounded-lg border border-notice-line bg-notice-wash px-4 py-3 text-sm leading-6 text-navy-deep ${className}`}
      role="note"
    >
      <p className="font-semibold">Not an official election website</p>
      <p className="mt-1 text-ink">
        {compact ? SITE.verifyShort : SITE.officialNotUs} Confirm your sample
        ballot, districts, deadlines, and ID rules with your state or county
        election office or{" "}
        <a className="underline underline-offset-2" href={SITE.voteGovUrl} rel="noopener noreferrer">
          Vote.gov
        </a>
        . See the{" "}
        <Link className="underline underline-offset-2" href="/disclaimer">
          disclaimer
        </Link>
        .
      </p>
    </aside>
  );
}
