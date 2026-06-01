"use client";

import { Stagger } from "@/components/ui/Stagger";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  children: React.ReactNode;
  className?: string;
  /** Wider hero container for case studies */
  wide?: boolean;
};

/** Dark page hero with staggered entrance on load */
export function PageHero({ children, className, wide }: PageHeroProps) {
  return (
    <Stagger
      immediate
      step={55}
      variant="up"
      className={cn(wide ? "container-site max-w-4xl" : "container-site max-w-3xl", className)}
    >
      {children}
    </Stagger>
  );
}
