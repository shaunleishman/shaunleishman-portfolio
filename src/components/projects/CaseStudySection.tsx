"use client";

import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";

type CaseStudySectionProps = {
  id: string;
  title: string;
  /** Recruiter-oriented lead — why this section matters */
  lead?: string;
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export function CaseStudySection({
  id,
  title,
  lead,
  children,
  className,
  delay = 0,
}: CaseStudySectionProps) {
  return (
    <Reveal delay={delay} variant="up">
      <section id={id} aria-labelledby={`${id}-heading`} className={cn("mb-16 scroll-mt-36 md:mb-20", className)}>
        <h2 id={`${id}-heading`} className="text-h3 font-semibold mb-3">
          {title}
        </h2>
        {lead && (
          <p className="text-body text-[var(--color-text-muted)] mb-8 max-w-2xl">{lead}</p>
        )}
        {!lead && <div className="mb-6" />}
        <div className="text-body-lg text-[var(--color-text-secondary)]">{children}</div>
      </section>
    </Reveal>
  );
}
