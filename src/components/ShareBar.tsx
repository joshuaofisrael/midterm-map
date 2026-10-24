import { absoluteUrl } from "@/data/site";
import { ShareActions } from "@/components/ShareActions";

const linkClass =
  "rounded-md border border-line bg-white px-3 py-1.5 text-sm font-medium text-navy hover:bg-navy-wash";

/** Plain share links. X, Facebook, and Reddit open their own pages. No third-party script. */
export function ShareBar({ path, title }: { path: string; title: string }) {
  const url = absoluteUrl(path);
  const encoded = encodeURIComponent(url);
  const text = encodeURIComponent(`${title} · Nov 3, 2026`);
  return (
    <div className="flex flex-wrap items-center gap-2" aria-label="Share this page">
      <a className={linkClass} href={`https://twitter.com/intent/tweet?url=${encoded}&text=${text}`} target="_blank" rel="noopener noreferrer">
        X
      </a>
      <a className={linkClass} href={`https://www.facebook.com/sharer/sharer.php?u=${encoded}`} target="_blank" rel="noopener noreferrer">
        Facebook
      </a>
      <a className={linkClass} href={`https://www.reddit.com/submit?url=${encoded}&title=${text}`} target="_blank" rel="noopener noreferrer">
        Reddit
      </a>
      <ShareActions url={url} title={title} />
    </div>
  );
}
