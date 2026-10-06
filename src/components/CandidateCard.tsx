import type { Candidate } from "@/data/types";
import { initialsFor, partyTone } from "@/lib/format";

export function CandidateCard({ candidate }: { candidate: Candidate }) {
  return (
    <article className="rounded-xl border border-line bg-paper-card p-5">
      <div className="flex gap-4">
        {candidate.image ? (
          <figure className="shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={candidate.image.src}
              alt={candidate.image.alt}
              width={96}
              height={96}
              className="h-24 w-24 rounded-lg object-cover ring-1 ring-line"
            />
          </figure>
        ) : (
          <div
            className="flex h-24 w-24 shrink-0 items-center justify-center rounded-lg bg-navy-wash text-xl font-semibold text-navy ring-1 ring-line"
            aria-hidden="true"
          >
            {initialsFor(candidate.name)}
          </div>
        )}
        <div className="min-w-0">
          <p className={`font-serif text-xl font-semibold ${partyTone(candidate.party)}`}>
            {candidate.name}
          </p>
          <p className="text-sm text-ink-muted">
            {candidate.partyLabel}
            {candidate.incumbent ? " · Incumbent" : ""}
          </p>
          {candidate.statusNote && (
            <p className="mt-1 text-xs text-ink-soft">{candidate.statusNote}</p>
          )}
        </div>
      </div>
      <p className="mt-4 text-sm leading-6">{candidate.bio}</p>
      {candidate.links.length > 0 && (
        <p className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-sm">
          <span className="font-medium text-ink-muted">Read more:</span>
          {candidate.links.map((link) => (
            <a key={link.href} className="text-navy hover:underline" href={link.href} rel="noopener noreferrer">
              {link.label}
            </a>
          ))}
        </p>
      )}
      {candidate.sources.length > 0 && (
        <ul className="mt-3 space-y-1 text-xs leading-5 text-ink-muted">
          {candidate.sources.map((source) => (
            <li key={`${source.name}-${source.url}`}>
              Source:{" "}
              <a className="text-navy hover:underline" href={source.url} rel="noopener noreferrer">
                {source.name}
              </a>
              {source.accessed ? ` · accessed ${source.accessed}` : ""}
            </li>
          ))}
        </ul>
      )}
      {candidate.image && (
        <p className="mt-3 text-xs leading-5 text-ink-soft">
          Photo: {candidate.image.attribution}, via{" "}
          <a
            className="underline"
            href={candidate.image.sourceUrl}
            rel="noopener noreferrer"
            aria-label={`Wikimedia Commons file page for the ${candidate.name} photo`}
          >
            Wikimedia Commons
          </a>
          . License:{" "}
          {candidate.image.licenseUrl ? (
            <a className="underline" href={candidate.image.licenseUrl} rel="noopener noreferrer license">
              {candidate.image.license}
            </a>
          ) : (
            candidate.image.license
          )}
          . {candidate.image.changes}
        </p>
      )}
    </article>
  );
}
