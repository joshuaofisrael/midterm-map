/** Organization byline. Never a personal name. */
export function Byline({ className = "mt-3" }: { className?: string }) {
  return (
    <p className={`${className} text-sm font-medium text-ink`}>By Map the Midterms Editorial Team</p>
  );
}
