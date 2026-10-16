import type { Citation } from "@/data/types";

export function uniqueCitations(citations: Citation[]): Citation[] {
  const seen = new Set<string>();
  const unique: Citation[] = [];
  for (const citation of citations) {
    const key = `${citation.name}\n${citation.url}`;
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(citation);
  }
  return unique;
}

/** Citations rendered on the same block as the claim they support. */
export function SourceLines({
  sources,
  className = "mt-2",
}: {
  sources: Citation[];
  className?: string;
}) {
  if (sources.length === 0) return null;
  return (
    <ul className={`${className} space-y-1 text-xs leading-5 text-ink-muted`}>
      {sources.map((source) => (
        <li key={`${source.name}-${source.url}`}>
          Source:{" "}
          <a className="text-navy hover:underline" href={source.url} rel="noopener noreferrer">
            {source.name}
          </a>
          {source.accessed ? ` · accessed ${source.accessed}` : ""}
        </li>
      ))}
    </ul>
  );
}
