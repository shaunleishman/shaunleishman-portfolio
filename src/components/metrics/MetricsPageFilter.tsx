"use client";

type MetricsPageFilterProps = {
  paths: string[];
  value: string;
  onChange: (path: string) => void;
};

export function MetricsPageFilter({ paths, value, onChange }: MetricsPageFilterProps) {
  return (
    <div className="mb-8 rounded-2xl border border-[var(--color-border)] bg-white p-5">
      <label htmlFor="metrics-page-filter" className="mb-1.5 block text-label text-[var(--color-text-muted)]">
        Filter all data by page
      </label>
      <select
        id="metrics-page-filter"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full max-w-md rounded-lg border border-[var(--color-border)] bg-white px-3 py-2.5 text-body-sm min-h-[44px] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
      >
        <option value="all">All pages</option>
        {paths.map((path) => (
          <option key={path} value={path}>
            {path}
          </option>
        ))}
      </select>
      <p className="mt-2 text-body-sm text-[var(--color-text-muted)]">
        Stats, charts, tables, and the heatmap all update when you change this filter.
      </p>
    </div>
  );
}
