import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { SiteLogoLink } from "@/components/layout/SiteLogo";
import { MetricsPathProvider } from "@/components/admin/MetricsPathProvider";
import { getMetricsPath } from "@/lib/metrics-config";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function MetricsLayout({ children }: { children: React.ReactNode }) {
  const headerList = await headers();
  if (headerList.get("x-metrics-access") !== "1") {
    notFound();
  }

  return (
    <MetricsPathProvider metricsPath={getMetricsPath()}>
      <div className="flex h-screen flex-col overflow-hidden bg-[var(--color-bg-muted)] text-[var(--color-text-primary)]">
        <header className="z-10 shrink-0 border-b border-[var(--color-border)] bg-white/95 backdrop-blur-sm">
          <div className="flex h-14 w-full items-center justify-between gap-4 px-[var(--container-padding)]">
            <SiteLogoLink asImage variant="dark" />
            <Link
              href="/"
              className="inline-flex shrink-0 min-h-[44px] items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-white px-4 py-2 text-body-sm font-medium transition-colors hover:border-[var(--color-accent)]/40"
            >
              <span aria-hidden>←</span>
              Back to site
            </Link>
          </div>
        </header>
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden">{children}</div>
      </div>
    </MetricsPathProvider>
  );
}
