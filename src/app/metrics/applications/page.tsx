"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import { ApplicationDocumentChips } from "@/components/cv/ApplicationDocumentChips";
import { ApplicationDownloadButton } from "@/components/cv/ApplicationDownloadButton";
import { ApplicationOutcomeBadge } from "@/components/cv/ApplicationOutcomeBadge";
import {
  APPLICATION_OUTCOMES,
  APPLICATION_SECTORS,
  applications,
  getApplicationSector,
  type ApplicationOutcomeId,
  type ApplicationSectorId,
} from "@/content/applications";
import { useAdminBase } from "@/hooks/useAdminBase";
import { cn } from "@/lib/utils";

type SectorFilter = ApplicationSectorId | "all";
type OutcomeFilter = ApplicationOutcomeId | "all";

export default function ApplicationsGalleryPage() {
  const base = useAdminBase();
  const [sectorFilter, setSectorFilter] = useState<SectorFilter>("all");
  const [outcomeFilter, setOutcomeFilter] = useState<OutcomeFilter>("all");

  const visibleApplications = useMemo(() => {
    return applications.filter((application) => {
      const sectorOk = sectorFilter === "all" || application.sectorId === sectorFilter;
      const outcomeOk = outcomeFilter === "all" || application.outcomeId === outcomeFilter;
      return sectorOk && outcomeOk;
    });
  }, [sectorFilter, outcomeFilter]);

  return (
    <AdminShell
      title="Applications"
      description="Tailored CV and cover letter packs by job and sector. Mark each outcome as you hear back, and add a learning note so the next pack is stronger."
    >
      <div className="mb-3">
        <p className="mb-2 text-label text-[var(--color-text-muted)]">Sector</p>
        <div className="flex flex-wrap gap-2">
          <FilterChip
            label="All"
            active={sectorFilter === "all"}
            onClick={() => setSectorFilter("all")}
            count={applications.length}
          />
          {APPLICATION_SECTORS.map((sector) => {
            const count = applications.filter(
              (application) => application.sectorId === sector.id,
            ).length;
            return (
              <FilterChip
                key={sector.id}
                label={sector.label}
                active={sectorFilter === sector.id}
                onClick={() => setSectorFilter(sector.id)}
                count={count}
                disabled={count === 0}
              />
            );
          })}
        </div>
      </div>

      <div className="mb-6">
        <p className="mb-2 text-label text-[var(--color-text-muted)]">Outcome</p>
        <div className="flex flex-wrap gap-2">
          <FilterChip
            label="All"
            active={outcomeFilter === "all"}
            onClick={() => setOutcomeFilter("all")}
            count={applications.length}
          />
          {APPLICATION_OUTCOMES.map((outcome) => {
            const count = applications.filter(
              (application) => application.outcomeId === outcome.id,
            ).length;
            return (
              <FilterChip
                key={outcome.id}
                label={outcome.label}
                active={outcomeFilter === outcome.id}
                onClick={() => setOutcomeFilter(outcome.id)}
                count={count}
                disabled={count === 0}
              />
            );
          })}
        </div>
      </div>

      {visibleApplications.length === 0 ? (
        <p className="rounded-2xl border border-[var(--color-border)] bg-white px-5 py-8 text-body-sm text-[var(--color-text-muted)]">
          No applications match these filters. Add one in{" "}
          <code className="text-[var(--color-text-secondary)]">src/content/applications.ts</code>.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {visibleApplications.map((application) => {
            const sector = getApplicationSector(application.sectorId);
            return (
              <div
                key={application.slug}
                className="group relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white transition-colors hover:border-[var(--color-accent)]/40"
              >
                <Link
                  href={`${base}/applications/${application.slug}`}
                  className="absolute inset-0 z-10 rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
                  aria-label={`Open application for ${application.jobTitle} at ${application.company}`}
                />
                <div className="h-2 bg-[var(--color-accent)]" aria-hidden />
                <div className="relative p-6">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-label text-[var(--color-text-muted)]">
                      {sector?.label ?? application.sectorId}
                    </p>
                    <ApplicationOutcomeBadge outcomeId={application.outcomeId} />
                  </div>
                  <h2 className="mt-2 text-h4 font-semibold text-[var(--color-text-primary)]">
                    {application.jobTitle}
                  </h2>
                  <p className="mt-1 text-body-sm font-medium text-[var(--color-text-secondary)]">
                    {application.company}
                  </p>
                  <p className="mt-2 text-body-sm text-[var(--color-text-muted)]">
                    {application.roleMeta}
                  </p>
                  <ApplicationDocumentChips application={application} className="mt-3" />
                  {application.learningNote ? (
                    <p className="mt-3 line-clamp-2 text-body-sm text-[var(--color-text-secondary)]">
                      {application.learningNote}
                    </p>
                  ) : null}
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-1 text-body-sm font-medium text-[var(--color-accent)]">
                      Open pack
                      <ArrowRight
                        className="size-4 transition-transform group-hover:translate-x-0.5"
                        aria-hidden
                      />
                    </span>
                    <div className="relative z-20">
                      <ApplicationDownloadButton application={application} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {applications.length > 0 ? (
        <p className="mt-6 text-body-sm text-[var(--color-text-muted)]">
          Update <code className="text-[var(--color-text-secondary)]">outcomeId</code>,{" "}
          <code className="text-[var(--color-text-secondary)]">hasCv</code>,{" "}
          <code className="text-[var(--color-text-secondary)]">hasCoverLetter</code>, and optional{" "}
          <code className="text-[var(--color-text-secondary)]">learningNote</code> on each entry in{" "}
          <code className="text-[var(--color-text-secondary)]">src/content/applications.ts</code>.
        </p>
      ) : null}
    </AdminShell>
  );
}

function FilterChip({
  label,
  active,
  onClick,
  count,
  disabled,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  count: number;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "inline-flex min-h-[40px] items-center gap-2 rounded-full border px-3.5 py-1.5 text-body-sm font-medium transition-colors",
        active
          ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10 text-[var(--color-accent)]"
          : "border-[var(--color-border)] bg-white text-[var(--color-text-secondary)] hover:border-[var(--color-accent)]/40",
        disabled && "cursor-not-allowed opacity-40 hover:border-[var(--color-border)]",
      )}
    >
      {label}
      <span className="text-[0.75rem] text-[var(--color-text-muted)]">{count}</span>
    </button>
  );
}
