import Link from "next/link";
import type { Essay, Inline } from "@/data/essays/text";

function Parts({ parts }: { parts: Inline[] }) {
  return (
    <>
      {parts.map((part, index) => {
        if (typeof part === "string") return <span key={index}>{part}</span>;
        const external = part.href.startsWith("http");
        if (external) {
          return (
            <a key={index} className="text-navy underline" href={part.href} rel="noopener noreferrer">
              {part.t}
            </a>
          );
        }
        return (
          <Link key={index} className="text-navy underline" href={part.href}>
            {part.t}
          </Link>
        );
      })}
    </>
  );
}

/**
 * Original analysis. The page supplies the byline and the Last updated line.
 * Sources sit under the paragraphs they support.
 */
export function EditorialSection({ essay }: { essay: Essay }) {
  return (
    <section className="rounded-xl border border-line bg-paper-card p-5 shadow-card sm:p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-navy">{essay.kicker}</p>
      <h2 className="mt-2 font-serif text-2xl font-semibold tracking-tight">{essay.title}</h2>
      <div className="mt-4 space-y-4 text-[1.05rem] leading-7 text-ink">
        {essay.paragraphs.map((paragraph, index) => (
          <p key={index}>
            <Parts parts={paragraph} />
          </p>
        ))}
      </div>
      {essay.related.length > 0 && (
        <nav aria-label="Related explainers" className="mt-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">Related explainers</p>
          <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm">
            {essay.related.map((link) => (
              <li key={link.href}>
                <Link className="font-medium text-navy hover:underline" href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
      {essay.sources.length > 0 && (
        <div className="mt-5 border-t border-line pt-4">
          <h3 className="font-serif text-lg font-semibold">Sources for this section</h3>
          <ul className="mt-2 space-y-2 text-sm leading-6">
            {essay.sources.map((source) => (
              <li key={source.url}>
                <a className="font-medium text-navy hover:underline" href={source.url} rel="noopener noreferrer">
                  {source.name}
                </a>
                <span className="text-ink-muted"> · accessed {essay.updated}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

/** Same paragraph renderer for learn pages, which use their own title. */
export function EssayParagraphs({ paragraphs }: { paragraphs: Inline[][] }) {
  return (
    <div className="space-y-4 text-[1.05rem] leading-7 text-ink">
      {paragraphs.map((paragraph, index) => (
        <p key={index}>
          <Parts parts={paragraph} />
        </p>
      ))}
    </div>
  );
}
