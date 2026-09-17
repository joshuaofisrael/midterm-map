export function DemoBadge({ children = "Demo data" }: { children?: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-demo-line bg-demo-wash px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-demo">
      {children}
    </span>
  );
}
