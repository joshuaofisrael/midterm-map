import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  children?: ReactNode;
}) {
  return (
    <header className="mb-8 max-w-3xl">
      {eyebrow && (
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-navy">
          {eyebrow}
        </p>
      )}
      <h1 className="font-serif text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        {title}
      </h1>
      {lede && <p className="mt-3 text-lg leading-7 text-ink-muted">{lede}</p>}
      {children}
    </header>
  );
}
