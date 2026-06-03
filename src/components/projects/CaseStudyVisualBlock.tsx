import Image from "next/image";
import type { CaseStudyVisualBlock } from "@/content/project-images";
import { cn } from "@/lib/utils";

type CaseStudyVisualBlockProps = {
  block: CaseStudyVisualBlock;
  className?: string;
};

export function CaseStudyVisualBlockView({ block, className }: CaseStudyVisualBlockProps) {
  if (block.images.length === 0) return null;

  const featured = block.images.filter((img) => img.featured);
  const grid = block.images.filter((img) => !img.featured);

  return (
    <aside
      className={cn(
        "not-prose rounded-xl border border-[var(--color-border)] bg-neutral-50/80 p-4 md:p-5",
        className,
      )}
      aria-label={block.heading ?? "Supporting visuals"}
    >
      {block.heading && (
        <p className="text-body font-semibold text-[var(--color-text-primary)] mb-1">
          {block.heading}
        </p>
      )}
      {block.supportText && (
        <p className="text-body-sm text-[var(--color-text-muted)] mb-4">{block.supportText}</p>
      )}

      <div className="space-y-4">
        {featured.map((img) => (
          <figure key={img.src} className="flex flex-col gap-0 overflow-hidden rounded-lg border border-[var(--color-border)] bg-white">
            <Image
              src={img.src}
              alt={img.alt}
              width={1600}
              height={900}
              className="block h-auto w-full"
              sizes="(max-width: 768px) 100vw, 720px"
            />
            {img.caption && (
              <figcaption className="m-0 border-t border-[var(--color-border)] px-3 py-2 text-body-sm leading-snug text-[var(--color-text-muted)]">
                {img.caption}
              </figcaption>
            )}
          </figure>
        ))}

        {grid.length > 0 && (
          <div
            className={cn(
              "grid gap-3",
              grid.length === 1 ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2",
            )}
          >
            {grid.map((img) => (
              <figure
                key={img.src}
                className="flex flex-col gap-0 overflow-hidden rounded-lg border border-[var(--color-border)] bg-white"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={1200}
                  height={800}
                  className="block h-auto w-full"
                  sizes="(max-width: 768px) 100vw, 360px"
                />
                {img.caption && (
                  <figcaption className="m-0 border-t border-[var(--color-border)] px-3 py-2 text-body-sm leading-snug text-[var(--color-text-muted)]">
                    {img.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}

type CaseStudyVisualBlocksProps = {
  blocks: CaseStudyVisualBlock[];
  className?: string;
};

export function CaseStudyVisualBlocks({ blocks, className }: CaseStudyVisualBlocksProps) {
  if (blocks.length === 0) return null;

  return (
    <div className={cn("space-y-6", className)}>
      {blocks.map((block) => (
        <CaseStudyVisualBlockView key={`${block.section}-${block.afterIndex}-${block.heading}`} block={block} />
      ))}
    </div>
  );
}
