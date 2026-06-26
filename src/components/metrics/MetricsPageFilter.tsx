"use client";

import { MetricsSelect } from "./MetricsSelect";

type MetricsPageFilterProps = {
  paths: string[];
  value: string;
  onChange: (path: string) => void;
};

export function MetricsPageFilter({ paths, value, onChange }: MetricsPageFilterProps) {
  return (
    <div>
      <label htmlFor="metrics-page-filter" className="mb-1.5 block text-label text-[var(--color-text-muted)]">
        Filter all data by page
      </label>
      <MetricsSelect
        id="metrics-page-filter"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="max-w-md"
      >
        <option value="all">All pages</option>
        {paths.map((path) => (
          <option key={path} value={path}>
            {path}
          </option>
        ))}
      </MetricsSelect>
      <p className="mt-2 text-body-sm text-[var(--color-text-muted)]">
        Stats, charts, tables, and the heatmap update when you change page or time range.
      </p>
    </div>
  );
}
