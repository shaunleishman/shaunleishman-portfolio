"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { FilterChip } from "@/components/ui/FilterChip";

type NavItem = { id: string; label: string };

type CaseStudySectionNavProps = {
  items: readonly NavItem[];
  className?: string;
};

export function CaseStudySectionNav({ items, className }: CaseStudySectionNavProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      aria-label="Case study sections"
      className={cn(
        "sticky top-16 z-40 -mx-4 px-4 py-3 mb-10 bg-white/95 backdrop-blur-sm border-b border-[var(--color-border)] lg:top-[4.5rem]",
        className,
      )}
    >
      <p className="text-label text-[var(--color-text-muted)] mb-2">Jump to section</p>
      <ul className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {items.map((item) => (
          <li key={item.id} className="shrink-0 list-none">
            <FilterChip
              href={`#${item.id}`}
              label={item.label}
              selected={activeId === item.id}
              accent="teal"
              aria-current={activeId === item.id ? "location" : undefined}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}
