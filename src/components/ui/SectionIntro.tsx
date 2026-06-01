"use client";

import { Reveal } from "@/components/ui/Reveal";

type SectionIntroProps = {
  label?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
  titleClassName?: string;
};

/** Section header block with scroll-triggered reveal */
export function SectionIntro({
  label,
  title,
  description,
  className,
  titleClassName,
}: SectionIntroProps) {
  return (
    <Reveal variant="up" className={className}>
      {label}
      <div className={titleClassName}>{title}</div>
      {description}
    </Reveal>
  );
}
