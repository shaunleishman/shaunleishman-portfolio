"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import { CopyShareLinkButton } from "@/components/case-studies/CopyShareLinkButton";
import { CASE_STUDY_ENTRIES } from "@/lib/admin-nav";
import { useAdminBase } from "@/hooks/useAdminBase";

export default function CaseStudiesGalleryPage() {
  const base = useAdminBase();

  return (
    <AdminShell
      title="Case Studies"
      description="Heuristic evaluations and UX audit reports. These are private and not linked from the public site. Use them for job applications and interview prep."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {CASE_STUDY_ENTRIES.map((entry) => (
          <div
            key={entry.slug}
            className="group relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white transition-colors hover:border-[var(--color-accent)]/40"
          >
            {/* Stretched link overlay: the whole card navigates, but interactive
                siblings (the Copy-link button) sit above it and stay clickable. */}
            <Link
              href={`${base}/case-studies/${entry.slug}`}
              className="absolute inset-0 z-10 rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
              aria-label={`Open ${entry.title}`}
            />
            <div className="h-2" style={{ backgroundColor: entry.accent }} aria-hidden />
            <div className="relative p-6">
              <p className="text-label text-[var(--color-text-muted)]">{entry.client}</p>
              <h2 className="mt-1 text-h4 font-semibold">{entry.title}</h2>
              <p className="mt-2 text-body-sm text-[var(--color-text-secondary)]">{entry.description}</p>
              <p className="mt-2 text-[0.75rem] text-[var(--color-text-muted)]">
                Evaluated {entry.evaluationDate}
              </p>
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
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                <span className="inline-flex items-center gap-1 text-body-sm font-medium text-[var(--color-accent)]">
                  Open evaluation
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </span>
                {/* Sits above the stretched link; its onClick also stops propagation. */}
                <CopyShareLinkButton slug={entry.slug} variant="compact" className="relative z-20" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
