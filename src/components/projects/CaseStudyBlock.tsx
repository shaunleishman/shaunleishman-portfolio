"use client";

import { Reveal } from "@/components/ui/Reveal";
import { sectionDomId } from "@/lib/section-id";

type CaseStudyBlockProps = {
  title: string;
  children: React.ReactNode;
  delay?: number;
};

export function CaseStudyBlock({ title, children, delay = 0 }: CaseStudyBlockProps) {
  const id = sectionDomId(title);

  return (
    <Reveal delay={delay} variant="up">
      <section className="mb-16 md:mb-20" aria-labelledby={id}>
        <h2 id={id} className="text-h3 font-semibold mb-4">
          {title}
        </h2>
        <div className="text-body-lg text-[var(--color-text-secondary)]">{children}</div>
      </section>
    </Reveal>
  );
}
