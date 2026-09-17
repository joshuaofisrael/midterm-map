export function StatusChip({
  children,
  tone = "notice",
}: {
  children: string;
  tone?: "notice" | "neutral";
}) {
  const classes =
    tone === "notice"
      ? "border-notice-line bg-notice-wash text-navy-deep"
      : "border-line bg-paper-tint text-ink-muted";
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold uppercase tracking-wide ${classes}`}>
      {children}
    </span>
  );
}
