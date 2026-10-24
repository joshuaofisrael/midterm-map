import { preload } from "react-dom";
import type { VisualAsset } from "@/data/visuals";

/**
 * One shared photograph: AVIF, then WebP, with reserved width and height.
 * The in-view hero uses eager loading. Every other slot stays lazy.
 */
export function CivicImage({
  asset,
  className = "",
  priority = false,
}: {
  asset: VisualAsset;
  className?: string;
  priority?: boolean;
}) {
  if (priority) {
    preload(asset.avif, { as: "image", type: "image/avif", fetchPriority: "high" });
  }
  return (
    <figure className={className}>
      <picture>
        <source srcSet={asset.avif} type="image/avif" />
        <source srcSet={asset.webp} type="image/webp" />
        <img
          src={asset.webp}
          alt={asset.alt}
          width={asset.width}
          height={asset.height}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "low"}
          decoding="async"
          className="aspect-video w-full object-cover"
        />
      </picture>
      <figcaption className="border-t border-line bg-paper-tint px-3 py-2 text-xs leading-5 text-ink-muted">
        {asset.caption}
      </figcaption>
    </figure>
  );
}
