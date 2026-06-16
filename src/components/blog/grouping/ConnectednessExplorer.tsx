"use client";

import { useState } from "react";
import { FilterChip } from "@/components/ui/FilterChip";
import { FilterChipRow } from "@/components/blog/kano/KanoControls";
import { cn } from "@/lib/utils";
import { GroupingAnimatedPanel } from "./GroupingAnimatedPanel";
import {
  groupingConnectorIn,
  groupingHintIn,
  groupingMorphTransition,
  groupingPanelIn,
  groupingStaggerDelay,
} from "./grouping-motion";
import { GroupingWidget } from "./GroupingWidget";

type Mode = "floating" | "stepper" | "timeline" | "parent";

type StepSpec = {
  title: string;
  body: string;
  action: string;
  actionPrimary?: boolean;
};

const STEPS: StepSpec[] = [
  { title: "Create account", body: "Set up your login details", action: "Get started", actionPrimary: true },
  { title: "Verify email", body: "Confirm your address", action: "Send code" },
  { title: "Connect workspace", body: "Link your team or project", action: "Connect" },
  { title: "Review dashboard", body: "See your overview and next steps", action: "Open dashboard" },
];

const HINTS: Record<Mode, string> = {
  floating: "Without a visible link, users must guess whether steps are related.",
  stepper: "A stepper shows order and progress through a setup journey.",
  timeline: "A timeline makes sequence and elapsed progress easier to read.",
  parent: "Connectors can show dependency, not just order.",
};

function StepCard({
  title,
  body,
  action,
  actionPrimary,
  compact,
  showAction = true,
}: StepSpec & { compact?: boolean; showAction?: boolean }) {
  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-xl border border-[var(--color-border)] bg-white p-3",
        groupingMorphTransition,
      )}
    >
      <h4
        className={cn(
          "font-semibold text-[var(--color-text-primary)]",
          compact ? "text-[0.75rem]" : "text-[0.8125rem]",
        )}
      >
        {title}
      </h4>
      <p className="mt-1 flex-1 text-[0.6875rem] text-[var(--color-text-secondary)]">{body}</p>
      {showAction ? (
        <span
          className={cn(
            "mt-2 inline-flex w-fit rounded-md px-2 py-1 text-[0.6875rem] font-medium",
            groupingMorphTransition,
            actionPrimary
              ? "bg-[var(--color-accent)] text-white"
              : "border border-[var(--color-border)] text-[var(--color-text-primary)]",
          )}
        >
          {action}
        </span>
      ) : null}
    </article>
  );
}

function StepperTrack({ steps }: { steps: StepSpec[] }) {
  return (
    <ol className="flex w-full items-start">
      {steps.map((step, index) => {
        const isFirst = index === 0;
        const isLast = index === steps.length - 1;

        return (
          <li
            key={step.title}
            className={cn("relative flex min-w-0 flex-1 flex-col items-center text-center", groupingPanelIn)}
            style={groupingStaggerDelay(index)}
          >
            <div className="relative flex h-7 w-full items-center justify-center">
              {!isFirst ? (
                <span
                  aria-hidden
                  className={cn(
                    "absolute left-0 right-1/2 top-1/2 h-0.5 origin-right -translate-y-1/2 bg-[var(--color-accent)]/45",
                    groupingConnectorIn,
                  )}
                  style={groupingStaggerDelay(index, 50)}
                />
              ) : null}
              {!isLast ? (
                <span
                  aria-hidden
                  className={cn(
                    "absolute left-1/2 right-0 top-1/2 h-0.5 origin-left -translate-y-1/2 bg-[var(--color-accent)]/45",
                    groupingConnectorIn,
                  )}
                  style={groupingStaggerDelay(index, 50)}
                />
              ) : null}
              <span
                className={cn(
                  "relative z-10 flex size-7 shrink-0 items-center justify-center rounded-full text-[0.6875rem] font-semibold text-white",
                  groupingMorphTransition,
                  index === 0 ? "bg-[var(--color-accent)]" : "bg-[var(--color-accent)]/70",
                )}
              >
                {index + 1}
              </span>
            </div>
            <p className="mt-2 text-[0.75rem] font-semibold leading-snug text-[var(--color-text-primary)]">{step.title}</p>
            <p className="mt-0.5 text-[0.6875rem] leading-snug text-[var(--color-text-secondary)]">{step.body}</p>
          </li>
        );
      })}
    </ol>
  );
}

export function ConnectednessExplorer() {
  const [mode, setMode] = useState<Mode>("floating");

  return (
    <GroupingWidget
      title="Law of Uniform Connectedness"
      hint="Visible links show sequence, dependency, or progress."
    >
      <FilterChipRow>
        <FilterChip label="Floating" selected={mode === "floating"} onClick={() => setMode("floating")} />
        <FilterChip label="Stepper" selected={mode === "stepper"} onClick={() => setMode("stepper")} accent="accent" />
        <FilterChip label="Timeline" selected={mode === "timeline"} onClick={() => setMode("timeline")} />
        <FilterChip label="Parent → child" selected={mode === "parent"} onClick={() => setMode("parent")} />
      </FilterChipRow>

      <div className="mt-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-muted)] p-4">
        <GroupingAnimatedPanel panelKey={mode}>
          {mode === "floating" && (
            <div className="grid gap-3 sm:grid-cols-2">
              {STEPS.map((step, index) => (
                <div key={step.title} className={groupingPanelIn} style={groupingStaggerDelay(index)}>
                  <StepCard {...step} />
                </div>
              ))}
            </div>
          )}

          {mode === "stepper" && <StepperTrack steps={STEPS} />}

          {mode === "timeline" && (
            <ol className="relative space-y-4 border-l-2 border-[var(--color-accent)]/30 pl-4">
              {STEPS.map((step, index) => (
                <li key={step.title} className={cn("relative", groupingPanelIn)} style={groupingStaggerDelay(index)}>
                  <span
                    aria-hidden
                    className={cn(
                      "absolute -left-[1.375rem] top-1 size-2.5 rounded-full bg-[var(--color-accent)]",
                      groupingConnectorIn,
                    )}
                    style={groupingStaggerDelay(index, 55)}
                  />
                  <p className="text-[0.6875rem] font-medium uppercase tracking-wide text-[var(--color-text-muted)]">
                    Step {index + 1}
                  </p>
                  <StepCard {...step} compact />
                </li>
              ))}
            </ol>
          )}

          {mode === "parent" && (
            <div className="space-y-3">
              <div className={groupingPanelIn}>
                <StepCard
                  title="Customer workspace"
                  body="Parent record"
                  action="Manage workspace"
                  actionPrimary
                />
              </div>
              <div className="relative ml-6 space-y-2 border-l-2 border-dashed border-[var(--color-border)] pl-4">
                <span
                  aria-hidden
                  className={cn(
                    "absolute -left-px top-0 h-full w-0.5 origin-top bg-[var(--color-border)]",
                    groupingConnectorIn,
                  )}
                />
                {[
                  { title: "Team profile", body: "Linked child record", action: "Edit profile" },
                  { title: "Billing account", body: "Linked child record", action: "View invoices" },
                ].map((child, index) => (
                  <div key={child.title} className={groupingPanelIn} style={groupingStaggerDelay(index + 1)}>
                    <StepCard {...child} compact />
                  </div>
                ))}
              </div>
            </div>
          )}
        </GroupingAnimatedPanel>
      </div>

      <p key={mode} className={cn("mt-3 text-body-sm text-[var(--color-text-secondary)]", groupingHintIn)}>
        {HINTS[mode]}
      </p>
    </GroupingWidget>
  );
}
