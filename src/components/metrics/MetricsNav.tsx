"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMetricsBase } from "@/hooks/useMetricsBase";

const TABS = [
  { segment: "", label: "Home" },
  { segment: "content", label: "Content" },
  { segment: "audience", label: "Audience" },
  { segment: "insights", label: "Insights" },
] as const;

export function MetricsNav() {
  const pathname = usePathname();
  const base = useMetricsBase();

  return (
    <nav
      aria-label="Metrics sections"
      className="mb-8 flex gap-1 overflow-x-auto rounded-full border border-[var(--color-border)] bg-white p-1"
    >
      {TABS.map((tab) => {
        const href = tab.segment ? `${base}/${tab.segment}` : base;
        const active = tab.segment
          ? pathname === `${base}/${tab.segment}` || pathname.endsWith(`/${tab.segment}`)
          : pathname === base;

        return (
          <Link
            key={tab.label}
            href={href}
            className={`shrink-0 rounded-full px-4 py-2.5 text-body-sm font-medium min-h-[44px] inline-flex items-center transition-colors ${
              active
                ? "bg-[var(--color-accent)] text-white"
                : "text-[var(--color-text-primary)] hover:bg-[var(--color-bg-muted)]"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
