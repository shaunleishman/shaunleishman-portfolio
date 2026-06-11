"use client";

import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";
import {
  CaseStudySectionHeader,
  caseStudyMainSectionClass,
} from "@/components/projects/CaseStudySectionHeader";

type CaseStudySectionProps = {
  id: string;
  title: string;
  /** Recruiter-oriented lead — why this section matters */
  lead?: string;
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Show a divider above this section. Off for the first section on the page. */
  dividerTop?: boolean;
};

export function CaseStudySection({
  id,
  title,
  lead,
  children,
  className,
  delay = 0,
  dividerTop = true,
}: CaseStudySectionProps) {
  return (
    <Reveal delay={delay} variant="up">
      <section
        id={id}
        aria-labelledby={`${id}-heading`}
        className={caseStudyMainSectionClass(dividerTop, className)}
      >
        <CaseStudySectionHeader id={id} title={title} lead={lead} />
        <div className="text-body text-[var(--color-text-secondary)]">{children}</div>
      </section>
    </Reveal>
  );
}
