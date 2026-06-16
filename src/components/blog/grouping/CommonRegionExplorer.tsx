"use client";

import { useState } from "react";
import { FilterChip } from "@/components/ui/FilterChip";
import { FilterChipRow } from "@/components/blog/kano/KanoControls";
import { cn } from "@/lib/utils";
import { groupingHintIn, groupingMorphTransition } from "./grouping-motion";
import { GroupingWidget } from "./GroupingWidget";

type Mode = "split" | "over-boxed" | "card" | "space";

const HINTS: Record<Mode, string> = {
  split: "The heading and body read as separate ideas.",
  "over-boxed": "One box holds unrelated content just because it looks tidy.",
  card: "Heading, supporting text, and action share one clear region.",
  space: "Spacing and background can group without adding a border.",
};

function ActionButton({
  label,
  primary,
  className,
}: {
  label: string;
  primary?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex rounded-md px-3 py-1.5 text-[0.75rem] font-medium",
        groupingMorphTransition,
        primary
          ? "bg-[var(--color-accent)] text-white"
          : "border border-[var(--color-border)] bg-white text-[var(--color-text-primary)]",
        className,
      )}
    >
      {label}
    </span>
  );
}

export function CommonRegionExplorer() {
  const [mode, setMode] = useState<Mode>("split");

  const heading = "Finish setting up your workspace";
  const sub = "Complete these steps to unlock your dashboard, billing, and team settings.";
  const primaryAction = "Continue setup";
  const unrelatedAction = "Browse help articles";

  const isSplit = mode === "split";
  const showFaq = mode === "over-boxed";
  const headingInside = mode !== "split";
  const unifiedBox = mode === "over-boxed" || mode === "card";
  const softRegion = mode === "space";

  return (
    <GroupingWidget
      title="Law of Common Region"
      hint="Elements in the same visual area feel grouped — a box is not the only way to do it."
    >
      <FilterChipRow>
        <FilterChip label="Split heading" selected={mode === "split"} onClick={() => setMode("split")} />
        <FilterChip label="Over-boxed" selected={mode === "over-boxed"} onClick={() => setMode("over-boxed")} />
        <FilterChip label="Full card" selected={mode === "card"} onClick={() => setMode("card")} accent="accent" />
        <FilterChip label="Space only" selected={mode === "space"} onClick={() => setMode("space")} />
      </FilterChipRow>

      <div
        className={cn(
          "mt-4 rounded-xl p-4",
          groupingMorphTransition,
          unifiedBox
            ? "border border-[var(--color-border)] bg-white"
            : softRegion
              ? "border border-transparent bg-white/70"
              : "border border-[var(--color-border)] bg-[var(--color-bg-muted)]",
        )}
      >
        <div
          className={cn(
            "grid motion-safe:transition-[grid-template-rows,opacity,margin-bottom] motion-safe:duration-500 motion-safe:ease-out",
            isSplit ? "mb-0 grid-rows-[1fr] opacity-100" : "mb-0 grid-rows-[0fr] opacity-0",
          )}
        >
          <div className="overflow-hidden">
            <h4 className="text-[0.9375rem] font-semibold text-[var(--color-text-primary)]">{heading}</h4>
          </div>
        </div>

        <div
          className={cn(
            groupingMorphTransition,
            isSplit ? "mt-3 rounded-xl border border-[var(--color-border)] bg-white p-4" : "",
          )}
        >
          <div
            className={cn(
              "grid motion-safe:transition-[grid-template-rows,opacity] motion-safe:duration-500 motion-safe:ease-out",
              headingInside ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
            )}
          >
            <div className="overflow-hidden">
              <h4 className="text-[0.9375rem] font-semibold text-[var(--color-text-primary)]">{heading}</h4>
            </div>
          </div>

          <p
            className={cn(
              "text-[0.8125rem] text-[var(--color-text-secondary)]",
              groupingMorphTransition,
              headingInside ? "mt-2" : "",
            )}
          >
            {sub}
          </p>

          <ActionButton
            label={primaryAction}
            primary
            className={mode === "card" || mode === "space" ? "mt-4" : "mt-3"}
          />

          <div
            className={cn(
              "grid motion-safe:transition-[grid-template-rows,opacity,margin-top] motion-safe:duration-500 motion-safe:ease-out",
              showFaq ? "mt-4 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0",
            )}
          >
            <div className="overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-dashed border-[var(--color-border)] px-3 py-2">
                <p className="text-[0.75rem] text-[var(--color-text-muted)]">Unrelated help link boxed in for neatness</p>
                <ActionButton label={unrelatedAction} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <p key={mode} className={cn("mt-3 text-body-sm text-[var(--color-text-secondary)]", groupingHintIn)}>
        {HINTS[mode]}
      </p>
    </GroupingWidget>
  );
}
