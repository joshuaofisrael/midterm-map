import type { ChamberMeter } from "@/data/types";
import { StatusChip } from "./StatusChip";

export function ControlMeter({ meter }: { meter: ChamberMeter }) {
  const awaiting = meter.demSeats == null && meter.repSeats == null;

  return (
    <section className="rounded-xl border border-line bg-paper-card p-5 shadow-card">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-serif text-xl font-semibold">{meter.title}</h2>
        <StatusChip>Awaiting returns</StatusChip>
      </div>
      <p className="mt-2 text-sm leading-6 text-ink-muted">{meter.note}</p>
      <div className="mt-4">
        <div className="mb-2 flex justify-between text-xs font-semibold uppercase tracking-wide text-ink-muted">
          <span>0</span>
          <span>Majority {meter.majority}</span>
          <span>{meter.seats}</span>
        </div>
        <div className="relative h-4 overflow-hidden rounded-full bg-paper-tint ring-1 ring-line">
          <div
            className="absolute top-0 h-full w-px bg-ink"
            style={{ left: `${(meter.majority / meter.seats) * 100}%` }}
            aria-hidden="true"
          />
          {awaiting && (
            <div className="flex h-full items-center justify-center text-[11px] font-medium text-ink-muted">
              No unofficial returns loaded
            </div>
          )}
        </div>
        <dl className="mt-4 grid grid-cols-3 gap-3 text-sm">
          <div>
            <dt className="text-ink-muted">Democratic</dt>
            <dd className="font-semibold">{meter.demSeats ?? "—"}</dd>
          </div>
          <div>
            <dt className="text-ink-muted">Republican</dt>
            <dd className="font-semibold">{meter.repSeats ?? "—"}</dd>
          </div>
          <div>
            <dt className="text-ink-muted">Other / vacant</dt>
            <dd className="font-semibold">{meter.otherSeats ?? "—"}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
