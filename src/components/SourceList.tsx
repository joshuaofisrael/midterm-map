import type { Citation } from "@/data/types";

export function SourceList({
  sources,
  title = "Sources",
}: {
  sources: Citation[];
  title?: string;
}) {
  if (sources.length === 0) return null;
  return (
    <section className="rounded-xl border border-line bg-paper-tint p-5">
      <h2 className="font-serif text-lg font-semibold">{title}</h2>
      <ul className="mt-3 space-y-2 text-sm leading-6">
        {sources.map((source) => (
          <li key={`${source.name}-${source.url}`}>
            <a className="font-medium text-navy hover:underline" href={source.url} rel="noopener noreferrer">
              {source.name}
            </a>
            <span className="text-ink-muted">
              {source.published ? ` · published ${source.published}` : ""}
              {source.accessed ? ` · accessed ${source.accessed}` : ""}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
