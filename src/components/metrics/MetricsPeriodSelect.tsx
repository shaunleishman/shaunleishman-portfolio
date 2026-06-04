"use client";

import type { AnalyticsPeriod } from "@/lib/analytics-period";
import { ANALYTICS_PERIODS, getPeriodLabel } from "@/lib/analytics-period";

type MetricsPeriodSelectProps = {
  value: AnalyticsPeriod;
  onChange: (period: AnalyticsPeriod) => void;
  id?: string;
  label?: string;
};

export function MetricsPeriodSelect({
  value,
  onChange,
  id = "metrics-period",
  label = "Time period",
}: MetricsPeriodSelectProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-label text-[var(--color-text-muted)]">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value as AnalyticsPeriod)}
        className="w-full min-w-[12rem] rounded-lg border border-[var(--color-border)] bg-white px-3 py-2.5 text-body-sm min-h-[44px] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
      >
        {ANALYTICS_PERIODS.map((period) => (
          <option key={period} value={period}>
            {getPeriodLabel(period)}
          </option>
        ))}
      </select>
    </div>
  );
}
