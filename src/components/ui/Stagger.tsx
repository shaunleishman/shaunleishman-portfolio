"use client";

import { Children, isValidElement } from "react";
import { Reveal, type RevealVariant } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

type StaggerProps = {
  children: React.ReactNode;
  className?: string;
  /** Delay between each child in ms */
  step?: number;
  immediate?: boolean;
  variant?: RevealVariant;
};

export function Stagger({
  children,
  className,
  step = 60,
  immediate = false,
  variant = "up",
}: StaggerProps) {
  const items = Children.toArray(children).filter(Boolean);

  return (
    <div className={cn(className)}>
      {items.map((child, index) => {
        const key = isValidElement(child) && child.key != null ? child.key : index;
        return (
          <Reveal
            key={key}
            delay={index * step}
            immediate={immediate}
            variant={variant}
          >
            {child}
          </Reveal>
        );
      })}
    </div>
  );
}
