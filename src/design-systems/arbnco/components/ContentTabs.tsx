"use client";

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
  /** Active tab accent — defaults to primary brand colour. */
  accentColor?: string;
  className?: string;
  fillRemaining?: boolean;
};

function TabCount({ active, count, accentColor }: { active: boolean; count: number; accentColor: string }) {
  return (
    <span
      className="inline-flex h-5 min-w-[20px] items-center justify-center rounded-lg px-1.5 text-[10px] font-semibold leading-4 tracking-[-0.1px]"
      style={{
        backgroundColor: active ? `${accentColor}1a` : "var(--colour-surfaces-bg)",
        color: active ? accentColor : "var(--colour-labels-neutral)",
      }}
    >
      {count}
    </span>
  );
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
