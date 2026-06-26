"use client";

import type { AnalyticsPeriod } from "@/lib/analytics-period";
import { ANALYTICS_PERIODS, getPeriodLabel } from "@/lib/analytics-period";
import { MetricsSelect } from "./MetricsSelect";

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
      <MetricsSelect
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value as AnalyticsPeriod)}
        className="min-w-[12rem]"
      >
        {ANALYTICS_PERIODS.map((period) => (
          <option key={period} value={period}>
            {getPeriodLabel(period)}
          </option>
        ))}
      </MetricsSelect>
    </div>
  );
}
