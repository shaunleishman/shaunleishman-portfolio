"use client";

import { useMemo, useState } from "react";
import { FilterChip } from "@/components/ui/FilterChip";
import { FilterChipRow } from "@/components/blog/kano/KanoControls";
import { cn } from "@/lib/utils";
import { groupingGapTransition, groupingHintIn } from "./grouping-motion";
import { GroupingWidget } from "./GroupingWidget";

type Mode = "before" | "after";

function MiniButton({ label, primary }: { label: string; primary?: boolean }) {
  return (
    <span
      className={
        primary
          ? "inline-flex rounded-md bg-[var(--color-accent)] px-2.5 py-1 text-[0.6875rem] font-medium text-white"
          : "inline-flex rounded-md border border-[var(--color-border)] bg-white px-2.5 py-1 text-[0.6875rem] font-medium text-[var(--color-text-primary)]"
      }
    >
      {label}
    </span>
  );
}

export function ProximityExplorer() {
  const [mode, setMode] = useState<Mode>("before");
  const [withinGap, setWithinGap] = useState(20);
  const [betweenGap, setBetweenGap] = useState(8);

  const applyPreset = (next: Mode) => {
    setMode(next);
    if (next === "before") {
      setWithinGap(20);
      setBetweenGap(8);
    } else {
      setWithinGap(8);
      setBetweenGap(28);
    }
  };

  const clarity = useMemo(() => {
    const score = betweenGap / Math.max(withinGap, 1);
    if (score >= 2.8) return { label: "Clear groups", tone: "text-emerald-700" };
    if (score >= 1.8) return { label: "Getting clearer", tone: "text-amber-700" };
    return { label: "Hard to scan", tone: "text-red-700" };
  }, [betweenGap, withinGap]);

  const showPromo = mode === "before";

  return (
    <GroupingWidget
      title="Law of Proximity"
      hint="Related items should sit closer together than unrelated sections."
    >
      <FilterChipRow>
        <FilterChip label="Before" selected={mode === "before"} onClick={() => applyPreset("before")} />
        <FilterChip label="After" selected={mode === "after"} onClick={() => applyPreset("after")} accent="accent" />
      </FilterChipRow>

      <div className="mt-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-muted)] p-4">
        <div className={cn("flex flex-col", groupingGapTransition)} style={{ gap: betweenGap }}>
          <section className={cn("flex flex-col", groupingGapTransition)} style={{ gap: withinGap }}>
            <p className="text-[0.6875rem] font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
              Account overview
            </p>
            <p className="text-[0.8125rem] font-medium text-[var(--color-text-primary)]">12 projects active</p>
            <MiniButton label="Open dashboard" primary />
          </section>

          <section className={cn("flex flex-col", groupingGapTransition)} style={{ gap: withinGap }}>
            <p className="text-[0.6875rem] font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
              Quick actions
            </p>
            <div className="flex flex-wrap gap-2">
              <MiniButton label="Sign in" primary />
              <MiniButton label="Create account" />
            </div>
          </section>

          <div
            className={cn(
              "grid motion-safe:transition-[grid-template-rows,opacity] motion-safe:duration-500 motion-safe:ease-out",
              showPromo ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
            )}
          >
            <div className="overflow-hidden">
              <p className="rounded-lg border border-dashed border-[var(--color-border)] bg-white px-3 py-2 text-[0.75rem] text-[var(--color-text-muted)]">
                Unrelated promo sits too close to account actions
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-body-sm font-medium">Gap inside a group</span>
          <input
            type="range"
            min={4}
            max={32}
            value={withinGap}
            onChange={(e) => setWithinGap(Number(e.target.value))}
            className="mt-1.5 w-full accent-[var(--color-accent)]"
          />
        </label>
        <label className="block">
          <span className="text-body-sm font-medium">Gap between groups</span>
          <input
            type="range"
            min={4}
            max={40}
            value={betweenGap}
            onChange={(e) => setBetweenGap(Number(e.target.value))}
            className="mt-1.5 w-full accent-[var(--color-accent)]"
          />
        </label>
      </div>

      <p key={clarity.label} className={cn("mt-3 text-body-sm font-medium", clarity.tone, groupingHintIn)} aria-live="polite">
        {clarity.label}
      </p>
    </GroupingWidget>
  );
}
