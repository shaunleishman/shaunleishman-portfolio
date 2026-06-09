"use client";

import Link from "next/link";
import { ArrowRight, Layers, LineChart, Palette } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import { MetricsKpiCard } from "@/components/metrics/metrics-ui";
import { useMetricsDashboard } from "@/hooks/useMetricsDashboard";
import { useAdminBase } from "@/hooks/useAdminBase";
import { METRICS_HOME_PERIOD } from "@/lib/analytics-period";

export default function AdminOverviewPage() {
  const base = useAdminBase();
  const { data, loading } = useMetricsDashboard({ period: METRICS_HOME_PERIOD });

  return (
    <AdminShell
      title="Overview"
      description="Your admin home — quick health checks and shortcuts to site metrics, prototypes, and design systems."
    >
      {loading && !data ? (
        <p className="text-body-sm text-[var(--color-text-muted)]">Loading overview…</p>
      ) : data ? (
        <>
          <p className="mb-6 text-body-sm text-[var(--color-text-muted)]">
            Snapshot for{" "}
            <strong className="text-[var(--color-text-primary)]">{data.periodLabel}</strong>
          </p>

          <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <MetricsKpiCard label="Pageviews" value={String(data.overview.pageviews)} />
            <MetricsKpiCard label="Unique viewers" value={String(data.overview.uniqueSessions)} />
            <MetricsKpiCard label="On site now" value={String(data.activeNow.count)} />
            <MetricsKpiCard label="Feedback" value={String(data.overview.feedbackSubmissions)} />
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Link
              href={`${base}/site`}
              className="group rounded-2xl border border-[var(--color-border)] bg-white p-6 transition-colors hover:border-[var(--color-accent)]/40"
            >
              <div className="mb-4 flex size-10 items-center justify-center rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
                <LineChart className="size-5" aria-hidden />
              </div>
              <h2 className="text-h4 font-semibold">Site metrics</h2>
              <p className="mt-2 text-body-sm text-[var(--color-text-secondary)]">
                Traffic, content performance, audience trends, heatmaps, and feedback breakdowns.
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-body-sm font-medium text-[var(--color-accent)]">
                Open metrics
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </span>
            </Link>

            <Link
              href={`${base}/prototypes`}
              className="group rounded-2xl border border-[var(--color-border)] bg-white p-6 transition-colors hover:border-[var(--color-accent)]/40"
            >
              <div className="mb-4 flex size-10 items-center justify-center rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
                <Layers className="size-5" aria-hidden />
              </div>
              <h2 className="text-h4 font-semibold">Prototypes</h2>
              <p className="mt-2 text-body-sm text-[var(--color-text-secondary)]">
                Interactive demos from past projects — embed in case studies without linking to Figma.
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-body-sm font-medium text-[var(--color-accent)]">
                Browse prototypes
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </span>
            </Link>

            <Link
              href={`${base}/design-systems`}
              className="group rounded-2xl border border-[var(--color-border)] bg-white p-6 transition-colors hover:border-[var(--color-accent)]/40"
            >
              <div className="mb-4 flex size-10 items-center justify-center rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
                <Palette className="size-5" aria-hidden />
              </div>
              <h2 className="text-h4 font-semibold">Design systems</h2>
              <p className="mt-2 text-body-sm text-[var(--color-text-secondary)]">
                Token libraries and component showcases from design systems you have built or maintained.
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-body-sm font-medium text-[var(--color-accent)]">
                Browse design systems
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </span>
            </Link>
          </div>
        </>
      ) : null}
    </AdminShell>
  );
}
