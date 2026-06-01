"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { processSteps } from "@/content/projects";

export function ProcessTabs() {
  const [active, setActive] = useState(0);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-16 items-start">
      <div
        role="tablist"
        aria-label="Design process steps"
        className="flex flex-col divide-y divide-[var(--color-border)]"
      >
        {processSteps.map((step, index) => {
          const isSelected = active === index;
          return (
            <button
              key={step.number}
              role="tab"
              type="button"
              id={`process-tab-${index}`}
              aria-selected={isSelected}
              aria-controls={`process-panel-${index}`}
              tabIndex={isSelected ? 0 : -1}
              className={cn(
                "flex gap-6 py-6 text-left transition-colors min-h-[44px]",
                isSelected
                  ? "text-[var(--color-text-primary)]"
                  : "text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]",
              )}
              onClick={() => setActive(index)}
            >
              <span className="text-h3 font-light tabular-nums shrink-0 w-10">
                {step.number}
              </span>
              <span>
                <span className="block text-h4 font-semibold mb-2">{step.title}</span>
                {isSelected && (
                  <span className="block text-body text-[var(--color-text-secondary)] lg:hidden">
                    {step.description}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`process-panel-${active}`}
        aria-labelledby={`process-tab-${active}`}
        className="rounded-2xl bg-[var(--color-bg-muted)] p-8 lg:p-12 min-h-[280px] hidden lg:block"
      >
        <p className="text-label text-[var(--color-text-muted)] mb-4">
          Step {processSteps[active].number}
        </p>
        <h3 className="text-h3 font-semibold mb-4">{processSteps[active].title}</h3>
        <p className="text-body-lg text-[var(--color-text-secondary)]">
          {processSteps[active].description}
        </p>
      </div>
    </div>
  );
}
