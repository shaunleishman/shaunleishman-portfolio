"use client";

import { getIntroVisualBlocks } from "@/content/project-images";
import { CaseStudyVisualBlocks } from "@/components/projects/CaseStudyVisualBlock";
import { Reveal } from "@/components/ui/Reveal";

type CaseStudyTextSectionProps = {
  title: string;
  slug: string;
  section: "problem";
  children: React.ReactNode;
  delay?: number;
};

export function CaseStudyTextSection({
  title,
  slug,
  section,
  children,
  delay = 0,
}: CaseStudyTextSectionProps) {
  const id = title.replace(/\s/g, "-").toLowerCase();
  const introVisuals = getIntroVisualBlocks(slug, section);

  return (
    <Reveal delay={delay} variant="up">
      <section className="mb-16 md:mb-20" aria-labelledby={id}>
        <h2 id={id} className="text-h3 font-semibold mb-4">
          {title}
        </h2>
        <div className="text-body-lg text-[var(--color-text-secondary)] space-y-8">
          {children}
          {introVisuals.length > 0 && <CaseStudyVisualBlocks blocks={introVisuals} />}
        </div>
      </section>
    </Reveal>
  );
}
