"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { processSteps } from "@/content/projects";
import { processIcons } from "@/lib/icon-maps";
import { ProcessIllustration } from "@/components/illustrations/ProcessIllustration";
import { IconBadge } from "@/components/ui/IconBadge";

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
          const Icon = processIcons[index];
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
                "flex gap-4 py-6 text-left transition-colors duration-200 min-h-[44px]",
                isSelected
                  ? "text-[var(--color-text-primary)]"
                  : "text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]",
              )}
              onClick={() => setActive(index)}
            >
              {Icon && (
                <IconBadge
                  icon={Icon}
                  size="md"
                  variant={isSelected ? "accent" : "muted"}
                  className={cn(
                    "mt-0.5 motion-safe:transition-transform motion-safe:duration-300",
                    isSelected && "motion-safe:scale-105",
                  )}
                />
              )}
              <span className="flex gap-4 flex-1 min-w-0">
                <span className="text-h3 font-light tabular-nums shrink-0 w-8">
                  {step.number}
                </span>
                <span className="min-w-0">
                  <span className="block text-h4 font-semibold mb-2">{step.title}</span>
                  <span
                    className={cn(
                      "block text-body text-[var(--color-text-secondary)] lg:hidden motion-safe:transition-all motion-safe:duration-300",
                      isSelected ? "motion-safe:opacity-100" : "motion-safe:opacity-0 motion-safe:h-0 overflow-hidden",
                    )}
                  >
                    {step.description}
                  </span>
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`process-panel-${active}`}
        aria-labelledby={`process-tab-${active}`}
        className="rounded-2xl bg-white border border-[var(--color-border)] p-6 lg:p-8 min-h-[280px] hidden lg:block"
      >
        <div
          key={active}
          className="motion-safe:animate-[fade-in_0.35s_ease-out]"
        >
          <ProcessIllustration step={active} className="w-full mb-6 rounded-xl" />
          <p className="text-label text-[var(--color-text-muted)] mb-3">
            Step {processSteps[active].number}
          </p>
          <h3 className="text-h3 font-semibold mb-3">{processSteps[active].title}</h3>
          <p className="text-body-lg text-[var(--color-text-secondary)]">
            {processSteps[active].description}
          </p>
        </div>
      </div>
    </div>
  );
}
