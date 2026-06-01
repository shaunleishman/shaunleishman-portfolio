"use client";

import { useId, useState } from "react";
import { ChevronDown, CircleHelp } from "lucide-react";
import { cn } from "@/lib/utils";

type FAQ = {
  question: string;
  answer: string;
};

type FAQAccordionProps = {
  items: FAQ[];
};

export function FAQAccordion({ items }: FAQAccordionProps) {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-[var(--color-border)] border-t border-[var(--color-border)]">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;

        return (
          <div key={item.question}>
            <h3>
              <button
                id={buttonId}
                type="button"
                className="flex w-full items-start justify-between gap-4 py-6 text-left text-h4 font-semibold hover:text-[var(--color-accent)] transition-colors min-h-[44px]"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <span className="flex items-start gap-3">
                  <CircleHelp
                    size={20}
                    strokeWidth={1.75}
                    className="shrink-0 mt-1 text-[var(--color-accent)]"
                    aria-hidden
                  />
                  {item.question}
                </span>
                <ChevronDown
                  size={22}
                  strokeWidth={1.75}
                  aria-hidden
                  className={cn(
                    "shrink-0 text-[var(--color-text-muted)] transition-transform duration-200",
                    isOpen && "rotate-180",
                  )}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="pb-6 pl-8 text-[var(--color-text-secondary)] text-body-lg"
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
