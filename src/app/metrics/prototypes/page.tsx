"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import { PROTOTYPE_ENTRIES } from "@/lib/admin-nav";
import { useAdminBase } from "@/hooks/useAdminBase";

export default function PrototypesGalleryPage() {
  const base = useAdminBase();

  return (
    <AdminShell
      title="Prototypes"
      description="Interactive demos from past projects. Open a prototype to explore flows, or embed them in case studies later."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {PROTOTYPE_ENTRIES.map((entry) => (
          <Link
            key={entry.slug}
            href={`${base}/prototypes/${entry.slug}`}
            className="group overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white transition-colors hover:border-[var(--color-accent)]/40"
          >
            <div className="h-2" style={{ backgroundColor: entry.accent }} aria-hidden />
            <div className="p-6">
              <p className="text-label text-[var(--color-text-muted)]">{entry.client}</p>
              <h2 className="mt-1 text-h4 font-semibold">{entry.title}</h2>
              <p className="mt-2 text-body-sm text-[var(--color-text-secondary)]">{entry.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {entry.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[var(--color-bg-muted)] px-2.5 py-0.5 text-[0.75rem] text-[var(--color-text-muted)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span className="mt-5 inline-flex items-center gap-1 text-body-sm font-medium text-[var(--color-accent)]">
                Open prototype
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </AdminShell>
  );
}
