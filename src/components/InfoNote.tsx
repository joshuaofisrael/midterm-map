/**
 * One static line on high-risk templates. No script, so it cannot shift after paint
 * and it does not touch the live-results poll.
 */
export const INFO_NOTE =
  "Informational, not advice. Compiled from public sources and AI-assisted; verify with official sources.";

export function InfoNote({ city = false }: { city?: boolean }) {
  if (city) return <p className="note">{INFO_NOTE}</p>;
  return <p className="mt-3 text-xs leading-5 text-ink-muted">{INFO_NOTE}</p>;
}
