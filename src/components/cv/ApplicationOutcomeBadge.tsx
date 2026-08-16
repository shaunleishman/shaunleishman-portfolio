import { cn } from "@/lib/utils";
import {
  getApplicationOutcome,
  type ApplicationOutcomeId,
} from "@/content/applications";

const TONE_STYLES = {
  neutral: "border-[var(--color-border)] bg-[var(--color-bg-muted)] text-[var(--color-text-secondary)]",
  active: "border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 text-[var(--color-accent)]",
  success: "border-emerald-200 bg-emerald-50 text-emerald-800",
  danger: "border-rose-200 bg-rose-50 text-rose-800",
  muted: "border-[var(--color-border)] bg-white text-[var(--color-text-muted)]",
} as const;

type ApplicationOutcomeBadgeProps = {
  outcomeId: ApplicationOutcomeId;
  className?: string;
};

export function ApplicationOutcomeBadge({
  outcomeId,
  className,
}: ApplicationOutcomeBadgeProps) {
  const outcome = getApplicationOutcome(outcomeId);
  if (!outcome) return null;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[0.75rem] font-medium",
        TONE_STYLES[outcome.tone],
        className,
      )}
    >
      {outcome.label}
    </span>
  );
}
