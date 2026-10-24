/** Small profile link. Renders nothing unless the URL is a Ballotpedia profile. */
export function BallotpediaLink({ href }: { href?: string }) {
  if (!href || !href.startsWith("https://ballotpedia.org/") || /\s/.test(href)) return null;
  return (
    <a className="text-xs font-medium text-navy hover:underline" href={href} rel="noopener" target="_blank">
      Ballotpedia
    </a>
  );
}
