"use client";

import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type FeedbackProximityPopoverProps = {
  title: string;
  lead?: string;
  eyebrow?: string;
  /** Visual style for the floating card */
  variant?: "case-study" | "site-dark" | "site-light";
  children: ReactNode;
  /** Optional class on the scroll sentinel (zero-height anchor at page end) */
  className?: string;
};

/** Show the floating card when the sentinel is this far below the viewport fold */
const TRIGGER_BEFORE_BOTTOM_PX = 520;

function getDismissKey(pathname: string) {
  return `feedback_floating_dismiss_${pathname}`;
}

function useFeedbackProximity(anchorRef: React.RefObject<HTMLElement | null>) {
  const pathname = usePathname();
  /** Stays true once the user scrolls into range; only reset on navigation */
  const [hasTriggered, setHasTriggered] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    setHasTriggered(false);
    setDismissed(sessionStorage.getItem(getDismissKey(pathname)) === "1");
  }, [pathname]);

  const updateProximity = useCallback(() => {
    const anchor = anchorRef.current;
    if (!anchor || dismissed) return;

    const rect = anchor.getBoundingClientRect();
    const viewport = window.innerHeight;

    if (rect.top < viewport + TRIGGER_BEFORE_BOTTOM_PX) {
      setHasTriggered(true);
    }
  }, [anchorRef, dismissed]);

  useEffect(() => {
    updateProximity();

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateProximity);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [updateProximity]);

  const dismissFloating = useCallback(() => {
    sessionStorage.setItem(getDismissKey(pathname), "1");
    setDismissed(true);
  }, [pathname]);

  const showFloating = hasTriggered && !dismissed;

  return { showFloating, dismissFloating };
}

export function FeedbackProximityPopover({
  title,
  lead,
  eyebrow = "Feedback",
  variant = "case-study",
  children,
  className,
}: FeedbackProximityPopoverProps) {
  const anchorRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const { showFloating, dismissFloating } = useFeedbackProximity(anchorRef);

  const floatingCardClass =
    variant === "site-dark"
      ? "border-white/15 bg-[#0a0a0a] text-white shadow-[0_12px_40px_rgba(0,0,0,0.45)]"
      : variant === "site-light"
        ? "border-[var(--color-border)] bg-white text-[var(--color-text-primary)] shadow-[0_12px_40px_rgba(15,23,42,0.12)]"
        : "border-[var(--color-border)] bg-white text-[var(--color-text-primary)] shadow-[0_12px_40px_rgba(15,23,42,0.14)]";

  const headerMuted =
    variant === "site-dark" ? "text-neutral-400" : "text-[var(--color-text-muted)]";

  const headerAccent =
    variant === "site-dark"
      ? "text-neutral-500"
      : "text-[color-mix(in_srgb,var(--case-study-accent,var(--color-accent))_75%,transparent)]";

  return (
    <>
      <div
        ref={anchorRef}
        className={cn("h-px w-full pointer-events-none", className)}
        aria-hidden
        data-feedback-anchor
      />

      {showFloating && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className={cn(
            "fixed z-[70] bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md",
            "rounded-2xl border p-4 sm:p-5 max-h-[min(70vh,32rem)] overflow-y-auto",
            "motion-safe:animate-[fade-in_0.25s_ease-out]",
            variant === "case-study" && "feedback-accent-scope",
            floatingCardClass,
          )}
        >
          <div className="mb-4 flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className={cn("mb-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em]", headerAccent)}>
                {eyebrow}
              </p>
              <h3 id={titleId} className="text-h4 font-semibold leading-snug">
                {title}
              </h3>
              {lead && (
                <p className={cn("mt-1.5 text-body-sm leading-relaxed", headerMuted)}>{lead}</p>
              )}
            </div>
            <button
              type="button"
              onClick={dismissFloating}
              className={cn(
                "shrink-0 rounded-lg border px-2.5 py-1.5 text-body-sm font-medium min-h-[44px] min-w-[44px]",
                variant === "site-dark"
                  ? "border-white/20 text-neutral-300 hover:bg-white/10"
                  : "border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)]/40",
              )}
              aria-label="Dismiss feedback prompt"
            >
              ×
            </button>
          </div>

          <div className="max-h-[50vh] overflow-y-auto pr-0.5">{children}</div>
        </div>
      )}
    </>
  );
}
