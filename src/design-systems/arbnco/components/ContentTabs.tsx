"use client";

import type { KeyboardEvent } from "react";
import { cn } from "@/lib/utils";

export type ContentTab = {
  value: string;
  label: string;
  count?: number;
};

export type ContentTabsProps = {
  value: string;
  tabs: ContentTab[];
  onChange: (value: string) => void;
  /** Active tab accent: defaults to primary brand colour. */
  accentColor?: string;
  className?: string;
  fillRemaining?: boolean;
};

/**
 * Active count chips use a 10% tint of the accent.
 * A 6-digit hex can take a hex alpha suffix. A CSS variable cannot:
 * `var(--colour-labels-primary)1a` is invalid and the background does not paint.
 */
function activeCountBackground(accentColor: string): string {
  if (/^#[0-9a-fA-F]{6}$/.test(accentColor)) return `${accentColor}1a`;
  if (/^#[0-9a-fA-F]{3}$/.test(accentColor)) {
    const [red, green, blue] = accentColor.slice(1).split("");
    return `#${red}${red}${green}${green}${blue}${blue}1a`;
  }
  return `color-mix(in srgb, ${accentColor} 10%, transparent)`;
}

function TabCount({ active, count, accentColor }: { active: boolean; count: number; accentColor: string }) {
  return (
    <span
      className="inline-flex h-5 min-w-[20px] items-center justify-center rounded-lg px-1.5 text-[10px] font-semibold leading-4 tracking-[-0.1px]"
      style={{
        backgroundColor: active ? activeCountBackground(accentColor) : "var(--colour-surfaces-bg)",
        color: active ? accentColor : "var(--colour-labels-neutral)",
      }}
    >
      {count}
    </span>
  );
}

function moveToTab(event: KeyboardEvent<HTMLDivElement>, tabs: ContentTab[], value: string, onChange: (value: string) => void) {
  const direction =
    event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : event.key === "Home" ? "first" : event.key === "End" ? "last" : null;
  if (direction === null || tabs.length === 0) return;

  const current = tabs.findIndex((tab) => tab.value === value);
  const index = current < 0 ? 0 : current;
  const nextIndex =
    direction === "first" ? 0 : direction === "last" ? tabs.length - 1 : (index + direction + tabs.length) % tabs.length;
  const next = tabs[nextIndex];
  if (!next) return;

  event.preventDefault();
  if (next.value !== value) onChange(next.value);
  event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]')[nextIndex]?.focus();
}

export function ContentTabs({
  value,
  tabs,
  onChange,
  accentColor = "var(--colour-labels-primary)",
  className,
  fillRemaining = true,
}: ContentTabsProps) {
  return (
    <div
      className={cn("flex w-full max-w-full items-end overflow-x-auto", className)}
      role="tablist"
      aria-label="Content tabs"
      onKeyDown={(event) => moveToTab(event, tabs, value, onChange)}
    >
      {tabs.map((tab) => {
        const active = tab.value === value;
        return (
          <button
            key={tab.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(tab.value)}
            className="flex shrink-0 flex-col items-stretch border-0 bg-transparent p-0 text-left"
          >
            <span className="flex items-center justify-center gap-3 px-4 py-3">
              <span
                className="whitespace-nowrap text-[length:var(--typography-font-size-xs)] tracking-[var(--typography-letter-spacing-sm)]"
                style={{
                  color: active ? accentColor : "var(--colour-labels-neutral)",
                  fontWeight: active
                    ? "var(--typography-font-weight-bold)"
                    : "var(--typography-font-weight-regular)",
                }}
              >
                {tab.label}
              </span>
              {tab.count !== undefined && (
                <TabCount active={active} count={tab.count} accentColor={accentColor} />
              )}
            </span>
            <span
              className="block w-full"
              style={{
                height: active ? 2 : 1,
                backgroundColor: active ? accentColor : "var(--colour-outlines-neutral)",
              }}
              aria-hidden
            />
          </button>
        );
      })}

      {fillRemaining && (
        <div className="flex min-w-0 flex-1 flex-col self-stretch" aria-hidden>
          <div className="flex-1" />
          <div className="h-px w-full bg-[var(--colour-outlines-neutral)]" />
        </div>
      )}
    </div>
  );
}
