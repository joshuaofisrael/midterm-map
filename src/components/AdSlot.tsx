/**
 * Fixed-height reservation for a future ad. No ad script, network, or markup.
 * Height is inline so the box cannot collapse when styles load.
 */
export function AdSlot({ id, height }: { id: string; height: number }) {
  return (
    <div
      data-ad-slot={id}
      aria-hidden="true"
      style={{ height, width: "100%", boxSizing: "border-box", overflow: "hidden" }}
    />
  );
}
