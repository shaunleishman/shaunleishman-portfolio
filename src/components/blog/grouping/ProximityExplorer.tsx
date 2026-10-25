"use client";

import { useId, useMemo, useState, type CSSProperties } from "react";
import { FilterChip } from "@/components/ui/FilterChip";
import { FilterChipRow } from "@/components/blog/kano/KanoControls";
import { cn } from "@/lib/utils";
import { groupingCollapsedProps, groupingGapTransition } from "./grouping-motion";
import { GroupingLiveHint, GroupingWidget } from "./GroupingWidget";

type Mode = "before" | "after";

/** Before packs unrelated sections together. After opens the gap between them. */
const PROXIMITY_PRESETS = {
  before: { within: 20, between: 8 },
  after: { within: 8, between: 28 },
} as const;

function gapStyle(gap: number, trackInput: boolean): CSSProperties {
  return trackInput ? { gap, transitionDuration: "0s" } : { gap };
}

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
  const baseId = useId();
  const [mode, setMode] = useState<Mode>("before");
  const [withinGap, setWithinGap] = useState<number>(PROXIMITY_PRESETS.before.within);
  const [betweenGap, setBetweenGap] = useState<number>(PROXIMITY_PRESETS.before.between);
  const [trackInput, setTrackInput] = useState(false);

  const applyPreset = (next: Mode) => {
    const preset = PROXIMITY_PRESETS[next];
    setTrackInput(false);
    setMode(next);
    setWithinGap(preset.within);
    setBetweenGap(preset.between);
  };

  const beginTrack = () => setTrackInput(true);
  const endTrack = () => setTrackInput(false);
  const trackHandlers = {
    onPointerDown: beginTrack,
    onPointerUp: endTrack,
    onPointerCancel: endTrack,
    onKeyDown: beginTrack,
    onKeyUp: endTrack,
    onBlur: endTrack,
  };

  const clarity = useMemo(() => {
    // 2.8 and 1.8 split the readout into the three labels. The words move with the ratio.
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
      <FilterChipRow ariaLabel="Proximity layout">
        <FilterChip label="Before" selected={mode === "before"} onClick={() => applyPreset("before")} />
        <FilterChip label="After" selected={mode === "after"} onClick={() => applyPreset("after")} accent="accent" />
      </FilterChipRow>

      <div className="mt-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-muted)] p-4">
        <div className={cn("flex flex-col", groupingGapTransition)} style={gapStyle(betweenGap, trackInput)}>
          <section className={cn("flex flex-col", groupingGapTransition)} style={gapStyle(withinGap, trackInput)}>
            <p className="text-[0.6875rem] font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
              Account overview
            </p>
            <p className="text-[0.8125rem] font-medium text-[var(--color-text-primary)]">12 projects active</p>
            <MiniButton label="Open dashboard" primary />
          </section>

          <section className={cn("flex flex-col", groupingGapTransition)} style={gapStyle(withinGap, trackInput)}>
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
            {...groupingCollapsedProps(showPromo)}
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
        <label className="block" htmlFor={`${baseId}-within`}>
          <span className="text-body-sm font-medium">Gap inside a group</span>
          <input
            id={`${baseId}-within`}
            type="range"
            min={4}
            max={32}
            value={withinGap}
            onChange={(e) => setWithinGap(Number(e.target.value))}
            aria-valuetext={`${withinGap} pixels`}
            className="mt-1.5 w-full accent-[var(--color-accent)]"
            {...trackHandlers}
          />
        </label>
        <label className="block" htmlFor={`${baseId}-between`}>
          <span className="text-body-sm font-medium">Gap between groups</span>
          <input
            id={`${baseId}-between`}
            type="range"
            min={4}
            max={40}
            value={betweenGap}
            onChange={(e) => setBetweenGap(Number(e.target.value))}
            aria-valuetext={`${betweenGap} pixels`}
            className="mt-1.5 w-full accent-[var(--color-accent)]"
            {...trackHandlers}
          />
        </label>
      </div>

      <GroupingLiveHint text={clarity.label} className="font-medium" textClassName={clarity.tone} />
    </GroupingWidget>
  );
}
