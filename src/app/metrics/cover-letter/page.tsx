"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import { CoverLetterOutcomeBadge } from "@/components/cv/CoverLetterOutcomeBadge";
import { DownloadCoverLetterButton } from "@/components/cv/DownloadCoverLetterButton";
import {
  COVER_LETTER_OUTCOMES,
  COVER_LETTER_SECTORS,
  coverLetters,
  getCoverLetterSector,
  type CoverLetterOutcomeId,
  type CoverLetterSectorId,
} from "@/content/cover-letter";
import { useAdminBase } from "@/hooks/useAdminBase";
import { cn } from "@/lib/utils";

type SectorFilter = CoverLetterSectorId | "all";
type OutcomeFilter = CoverLetterOutcomeId | "all";

export default function CoverLettersGalleryPage() {
  const base = useAdminBase();
  const [sectorFilter, setSectorFilter] = useState<SectorFilter>("all");
  const [outcomeFilter, setOutcomeFilter] = useState<OutcomeFilter>("all");

  const visibleLetters = useMemo(() => {
    return coverLetters.filter((letter) => {
      const sectorOk = sectorFilter === "all" || letter.sectorId === sectorFilter;
      const outcomeOk = outcomeFilter === "all" || letter.outcomeId === outcomeFilter;
      return sectorOk && outcomeOk;
    });
  }, [sectorFilter, outcomeFilter]);

  return (
    <AdminShell
      title="Cover letters"
      description="Application letters by job and sector. Mark each outcome as you hear back, and add a learning note so the next letter is stronger."
    >
      <div className="mb-3">
        <p className="mb-2 text-label text-[var(--color-text-muted)]">Sector</p>
        <div className="flex flex-wrap gap-2">
          <FilterChip
            label="All"
            active={sectorFilter === "all"}
            onClick={() => setSectorFilter("all")}
            count={coverLetters.length}
          />
          {COVER_LETTER_SECTORS.map((sector) => {
            const count = coverLetters.filter((letter) => letter.sectorId === sector.id).length;
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
            count={coverLetters.length}
          />
          {COVER_LETTER_OUTCOMES.map((outcome) => {
            const count = coverLetters.filter((letter) => letter.outcomeId === outcome.id).length;
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

      {visibleLetters.length === 0 ? (
        <p className="rounded-2xl border border-[var(--color-border)] bg-white px-5 py-8 text-body-sm text-[var(--color-text-muted)]">
          No cover letters match these filters. Add one in{" "}
          <code className="text-[var(--color-text-secondary)]">src/content/cover-letter.ts</code>.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {visibleLetters.map((letter) => {
            const sector = getCoverLetterSector(letter.sectorId);
            return (
              <div
                key={letter.slug}
                className="group relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white transition-colors hover:border-[var(--color-accent)]/40"
              >
                <Link
                  href={`${base}/cover-letter/${letter.slug}`}
                  className="absolute inset-0 z-10 rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
                  aria-label={`Open cover letter for ${letter.jobTitle} at ${letter.company}`}
                />
                <div className="h-2 bg-[var(--color-accent)]" aria-hidden />
                <div className="relative p-6">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-label text-[var(--color-text-muted)]">
                      {sector?.label ?? letter.sectorId}
                    </p>
                    <CoverLetterOutcomeBadge outcomeId={letter.outcomeId} />
                  </div>
                  <h2 className="mt-2 text-h4 font-semibold text-[var(--color-text-primary)]">
                    {letter.jobTitle}
                  </h2>
                  <p className="mt-1 text-body-sm font-medium text-[var(--color-text-secondary)]">
                    {letter.company}
                  </p>
                  <p className="mt-2 text-body-sm text-[var(--color-text-muted)]">
                    {letter.roleMeta}
                  </p>
                  {letter.learningNote ? (
                    <p className="mt-3 line-clamp-2 text-body-sm text-[var(--color-text-secondary)]">
                      {letter.learningNote}
                    </p>
                  ) : null}
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-1 text-body-sm font-medium text-[var(--color-accent)]">
                      Open letter
                      <ArrowRight
                        className="size-4 transition-transform group-hover:translate-x-0.5"
                        aria-hidden
                      />
                    </span>
                    <div className="relative z-20">
                      <DownloadCoverLetterButton slug={letter.slug} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {coverLetters.length > 0 ? (
        <p className="mt-6 text-body-sm text-[var(--color-text-muted)]">
          Update <code className="text-[var(--color-text-secondary)]">outcomeId</code> and optional{" "}
          <code className="text-[var(--color-text-secondary)]">learningNote</code> on each letter in{" "}
          <code className="text-[var(--color-text-secondary)]">src/content/cover-letter.ts</code>.
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
