"use client";

import { useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { MetricsContentTable } from "@/components/metrics/metrics-ui";
import { MetricsPeriodSelect } from "@/components/metrics/MetricsPeriodSelect";
import { useMetricsDashboard } from "@/hooks/useMetricsDashboard";
import type { AnalyticsPeriod } from "@/lib/analytics-period";
import type { ContentSortKey } from "@/lib/analytics-metrics-types";

const SORT_OPTIONS: { value: ContentSortKey; label: string }[] = [
  { value: "views", label: "Views" },
  { value: "listeners", label: "Viewers" },
  { value: "likes", label: "Likes" },
  { value: "shares", label: "Shares" },
  { value: "date", label: "Publish date" },
];

export default function MetricsContentPage() {
  const [period, setPeriod] = useState<AnalyticsPeriod>("28d");
  const [sort, setSort] = useState<ContentSortKey>("views");
  const [tab, setTab] = useState<"projects" | "articles">("projects");

  const { data, loading } = useMetricsDashboard({ period, sort });

  const rows = tab === "projects" ? data?.content.projects ?? [] : data?.content.articles ?? [];
  const sortLabel = SORT_OPTIONS.find((o) => o.value === sort)?.label ?? "Views";

  return (
    <AdminShell
      title="Content"
      description="Compare projects and articles like a catalogue. Sort by views, viewers, likes, shares, or date."
    >
      <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-[var(--color-border)] bg-white p-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Content type">
          {(["projects", "articles"] as const).map((key) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={tab === key}
              onClick={() => setTab(key)}
              className={`rounded-full px-4 py-2 text-body-sm font-medium min-h-[44px] capitalize ${
                tab === key
                  ? "bg-[var(--color-accent)] text-white"
                  : "border border-[var(--color-border)] bg-white hover:border-[var(--color-accent)]/40"
              }`}
            >
              {key}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <div>
            <label htmlFor="content-sort" className="mb-1.5 block text-label text-[var(--color-text-muted)]">
              Sort by
            </label>
            <select
              id="content-sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as ContentSortKey)}
              className="w-full min-w-[10rem] rounded-lg border border-[var(--color-border)] bg-white px-3 py-2.5 text-body-sm min-h-[44px]"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <MetricsPeriodSelect value={period} onChange={setPeriod} id="content-period" />
        </div>
      </div>

      {loading && !data ? (
        <p className="text-body-sm text-[var(--color-text-muted)]">Loading content metrics…</p>
      ) : (
        <section className="rounded-2xl border border-[var(--color-border)] bg-white p-6">
          <h2 className="text-h4 font-semibold mb-4 capitalize">
            {tab} · {data?.periodLabel}
          </h2>
          <MetricsContentTable rows={rows} sortLabel={sortLabel} />
        </section>
      )}
    </AdminShell>
  );
}
