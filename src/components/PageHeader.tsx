import type { ReactNode } from "react";
import { CivicImage } from "@/components/CivicImage";
import type { VisualAsset } from "@/data/visuals";

export function PageHeader({
  eyebrow,
  title,
  lede,
  children,
  visual,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  children?: ReactNode;
  visual?: VisualAsset;
}) {
  const copy = (
    <>
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
    </>
  );

  if (!visual) {
    return <header className="mb-8 max-w-3xl">{copy}</header>;
  }

  return (
    <header className="mb-8 overflow-hidden rounded-2xl border border-line bg-paper-card shadow-card">
      <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
        <div className="order-2 p-5 sm:p-8 lg:order-1">{copy}</div>
        <CivicImage
          asset={visual}
          priority
          className="order-1 border-b border-line lg:order-2 lg:border-b-0 lg:border-l lg:self-start"
        />
      </div>
    </header>
  );
}
