import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { SiteLogoLink } from "@/components/layout/SiteLogo";

export const metadata: Metadata = {
  title: "Metrics",
  robots: { index: false, follow: false },
};

export default async function MetricsLayout({ children }: { children: React.ReactNode }) {
  const headerList = await headers();
  if (headerList.get("x-metrics-access") !== "1") {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg-muted)] text-[var(--color-text-primary)]">
      <header className="sticky top-0 z-10 border-b border-[var(--color-border)] bg-white/95 backdrop-blur-sm">
        <div className="container-site flex h-14 items-center justify-between gap-4">
          <SiteLogoLink asImage />
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-white px-4 py-2 text-body-sm font-medium min-h-[44px] hover:border-[var(--color-accent)]/40 transition-colors"
          >
            <span aria-hidden>←</span>
            Back to site
          </Link>
        </div>
      </header>
      {children}
    </div>
  );
}
