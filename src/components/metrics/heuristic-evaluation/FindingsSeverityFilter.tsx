"use client";

import { cn } from "@/lib/utils";
import type { HeuristicFinding, Severity } from "@/content/heuristic-evaluations/types";

export type FindingsSeverityFilterValue = "all" | Severity;

const FILTER_OPTIONS: { value: FindingsSeverityFilterValue; label: string }[] = [
  { value: "all", label: "All" },
  { value: "critical", label: "Critical" },
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

type FindingsSeverityFilterProps = {
  findings: readonly HeuristicFinding[];
  value: FindingsSeverityFilterValue;
  onChange: (value: FindingsSeverityFilterValue) => void;
};

export function countFindingsBySeverity(findings: readonly HeuristicFinding[], severity: Severity) {
  return findings.filter((finding) => finding.severity === severity).length;
}

export function FindingsSeverityFilter({ findings, value, onChange }: FindingsSeverityFilterProps) {
  return (
    <div className="mb-4">
      <p className="mb-2 text-label text-[var(--color-text-muted)]">Filter by severity</p>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter findings by severity">
        {FILTER_OPTIONS.map((option) => {
          const active = value === option.value;
          const count =
            option.value === "all"
              ? findings.length
              : countFindingsBySeverity(findings, option.value);

          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(option.value)}
              className={cn(
                "inline-flex min-h-11 items-center gap-2 rounded-full border px-4 py-2 text-body-sm font-medium capitalize transition-colors",
                active
                  ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-white"
                  : "border-[var(--color-border)] bg-white text-[var(--color-text-primary)] hover:border-[var(--color-accent)]/40",
              )}
            >
              {option.label}
              <span
                className={cn(
                  "rounded-full px-1.5 py-0.5 text-[0.6875rem] font-semibold tabular-nums",
                  active ? "bg-white/20 text-white" : "bg-[var(--color-bg-muted)] text-[var(--color-text-muted)]",
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function filterFindingsBySeverity(
  findings: readonly HeuristicFinding[],
  filter: FindingsSeverityFilterValue,
) {
  if (filter === "all") return findings;
  return findings.filter((finding) => finding.severity === filter);
}
