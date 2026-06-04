"use client";

import type { AnalyticsPeriod } from "@/lib/analytics-period";
import { ANALYTICS_PERIODS, getPeriodLabel } from "@/lib/analytics-period";

type MetricsPeriodFilterProps = {
  value: AnalyticsPeriod;
  onChange: (period: AnalyticsPeriod) => void;
};

export function MetricsPeriodFilter({ value, onChange }: MetricsPeriodFilterProps) {
  return (
    <div>
      <p className="mb-2 text-label text-[var(--color-text-muted)]">Time range</p>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter metrics by time range">
        {ANALYTICS_PERIODS.map((period) => {
          const active = value === period;
          return (
            <button
              key={period}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(period)}
              className={`rounded-full border px-4 py-2 text-body-sm font-medium min-h-[44px] transition-colors ${
                active
                  ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-white"
                  : "border-[var(--color-border)] bg-white text-[var(--color-text-primary)] hover:border-[var(--color-accent)]/40"
              }`}
            >
              {getPeriodLabel(period)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
