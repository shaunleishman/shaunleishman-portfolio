"use client";

import type { LucideIcon } from "lucide-react";
import {
  AlertCircle,
  BarChart3,
  ClipboardList,
  Crosshair,
  Hammer,
  LayoutTemplate,
  Lightbulb,
  Package,
  PenLine,
  Search,
  UserRound,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useCaseStudyAccent } from "@/components/projects/CaseStudyAccentProvider";

/** Icons keyed to jump-nav section ids shared across case studies. */
export const CASE_STUDY_SECTION_ICONS: Record<string, LucideIcon> = {
  "at-a-glance": ClipboardList,
  "the-challenge": Crosshair,
  "my-role": UserRound,
  design: PenLine,
  research: Search,
  deliverables: Package,
  "key-findings": BarChart3,
  "co-design": Users,
  "build-and-test": Hammer,
  "refined-solution": LayoutTemplate,
  limitations: AlertCircle,
  "key-takeaways": Lightbulb,
};

type CaseStudySectionHeaderProps = {
  id: string;
  title: string;
  lead?: string;
  titleClassName?: string;
};

export function CaseStudySectionHeader({
  id,
  title,
  lead,
  titleClassName,
}: CaseStudySectionHeaderProps) {
  const accent = useCaseStudyAccent();
  const Icon = CASE_STUDY_SECTION_ICONS[id] ?? ClipboardList;

  return (
    <SectionHeader
      id={id}
      title={title}
      lead={lead}
      icon={Icon}
      accentColor={accent}
      variant="primary"
      titleClassName={titleClassName}
      className={lead ? "mb-8 md:mb-10" : "mb-6 md:mb-8"}
    />
  );
}

/** Top border + padding for main sections (not the first block on the page). */
export function caseStudyMainSectionClass(dividerTop: boolean, className?: string) {
  return cn(
    "mb-16 scroll-mt-36 md:mb-20",
    dividerTop && "border-t border-[var(--color-border)] pt-12 md:pt-14",
    className,
  );
}
