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
        "not-prose flex w-full items-center gap-3 rounded-xl border border-[#0d7377]/25 bg-[#0d7377]/5 p-4 text-left motion-safe:animate-[fade-in_0.3s_ease-out]",
        className,
      )}
    >
      <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-[#0d7377] text-white shadow-sm">
        <Check className="size-4" strokeWidth={2.5} aria-hidden />
      </span>
      <div className="min-w-0">
        <p className="text-body-sm font-semibold leading-snug text-[var(--color-text-primary)]">{title}</p>
        <p className="mt-1 text-body-sm leading-snug text-[var(--color-text-secondary)]">{description}</p>
      </div>
    </div>
  );
}
