import type { CaseStudyImageSection } from "@/content/project-images";
import { getVisualBlocksAfterIndex } from "@/content/project-images";
import { CaseStudyVisualBlocks } from "@/components/projects/CaseStudyVisualBlock";

type CaseStudyListWithVisualsProps = {
  slug: string;
  section: CaseStudyImageSection;
  items: string[];
};

export function CaseStudyListWithVisuals({
  slug,
  section,
  items,
}: CaseStudyListWithVisualsProps) {
  return (
    <div className="space-y-10">
      {items.map((item, index) => {
        const visuals = getVisualBlocksAfterIndex(slug, section, index);

        return (
          <div key={item} className="space-y-5">
            <div className="flex gap-3">
              <span
                className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-text-muted)]"
                aria-hidden
              />
              <p>{item}</p>
            </div>
            {visuals.length > 0 && <CaseStudyVisualBlocks blocks={visuals} />}
          </div>
        );
      })}
    </div>
  );
}
