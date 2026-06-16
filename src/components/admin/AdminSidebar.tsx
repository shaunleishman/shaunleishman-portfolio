"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, LineChart, Layers, Palette, BookOpen, LogOut } from "lucide-react";
import { buildAdminNav } from "@/lib/admin-nav";
import { useAdminBase } from "@/hooks/useAdminBase";
import { useMetricsAuth } from "@/hooks/useMetricsAuth";
import { cn } from "@/lib/utils";

const SECTION_ICONS = {
  overview: LayoutDashboard,
  site: LineChart,
  prototypes: Layers,
  "design-systems": Palette,
  "case-studies": BookOpen,
} as const;

export function AdminSidebar() {
  const pathname = usePathname();
  const base = useAdminBase();
  const nav = buildAdminNav(base);
  const auth = useMetricsAuth();

  function isActive(href: string) {
    if (href === base) return pathname === base;
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <aside className="flex h-full w-56 shrink-0 flex-col overflow-hidden border-r border-[var(--color-border)] bg-white">
      <div className="shrink-0 border-b border-[var(--color-border)] px-4 py-4">
        <p className="text-label text-[var(--color-text-muted)]">Admin</p>
        <p className="text-body-sm font-semibold text-[var(--color-text-primary)]">Dashboard</p>
      </div>

      <nav aria-label="Admin sections" className="min-h-0 flex-1 space-y-1 overflow-y-auto p-3">
        {nav.map((item) => {
          const Icon = SECTION_ICONS[item.id as keyof typeof SECTION_ICONS] ?? LayoutDashboard;
          const active = isActive(item.href);

          return (
            <div key={item.id}>
              <Link
                href={item.href}
                className={cn(
                  "flex min-h-[44px] items-center gap-2.5 rounded-lg px-3 py-2 text-body-sm font-medium transition-colors",
                  active
                    ? "bg-[var(--color-accent)]/10 text-[var(--color-accent)]"
                    : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-muted)]",
                )}
              >
                <Icon className="size-4 shrink-0" aria-hidden />
                {item.label}
              </Link>

              {item.children && active && (
                <ul className="ml-4 mt-1 space-y-0.5 border-l border-[var(--color-border)] pl-3">
                  {item.children.map((child) => {
                    const childActive = pathname === child.href;
                    return (
                      <li key={child.id}>
                        <Link
                          href={child.href}
                          className={cn(
                            "block rounded-md px-2 py-1.5 text-[0.8125rem] transition-colors",
                            childActive
                              ? "font-medium text-[var(--color-accent)]"
                              : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]",
                          )}
                        >
                          {child.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </nav>

      <div className="shrink-0 border-t border-[var(--color-border)] p-3">
        <button
          type="button"
          onClick={() => void auth.logout()}
          className="flex min-h-[44px] w-full items-center gap-2 rounded-lg px-3 py-2 text-body-sm font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-muted)]"
        >
          <LogOut className="size-4" aria-hidden />
          Sign out
        </button>
      </div>
    </aside>
  );
}
