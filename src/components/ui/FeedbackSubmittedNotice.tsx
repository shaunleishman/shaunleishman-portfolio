import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type FeedbackSubmittedNoticeProps = {
  title?: string;
  description: string;
  className?: string;
};

export function FeedbackSubmittedNotice({
  title = "Feedback received",
  description,
  className,
}: FeedbackSubmittedNoticeProps) {
  return (
    <div
      role="status"
      className={cn(
        "feedback-accent-scope not-prose flex w-full items-center gap-3 rounded-xl border p-4 text-left motion-safe:animate-[fade-in_0.3s_ease-out]",
        "border-[color-mix(in_srgb,var(--feedback-accent)_25%,transparent)] bg-[color-mix(in_srgb,var(--feedback-accent)_5%,transparent)]",
        className,
      )}
    >
      <span className="feedback-accent-button inline-flex size-8 shrink-0 items-center justify-center rounded-full shadow-sm">
        <Check className="size-4" strokeWidth={2.5} aria-hidden />
      </span>
      <div className="min-w-0">
        <p className="text-body-sm font-semibold leading-snug text-[var(--color-text-primary)]">{title}</p>
        <p className="mt-1 text-body-sm leading-snug text-[var(--color-text-secondary)]">{description}</p>
      </div>
    </div>
  );
}
