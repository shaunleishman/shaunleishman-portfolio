"use client";

import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type FeedbackMode = "idle" | "floating" | "inline";

type FeedbackProximityPopoverProps = {
  title: string;
  lead?: string;
  eyebrow?: string;
  /** Visual style for the floating card */
  variant?: "case-study" | "site-dark" | "site-light";
  children: ReactNode;
  /** Wraps children for the in-page anchor (section chrome, headings, etc.) */
  renderInline?: (children: ReactNode) => ReactNode;
  /** Optional extra class on the in-page anchor wrapper */
  className?: string;
};

const FLOAT_ENTER_OFFSET = 100;
const FLOAT_INLINE_TOP = 180;

function getDismissKey(pathname: string) {
  return `feedback_floating_dismiss_${pathname}`;
}

function useFeedbackProximity(anchorRef: React.RefObject<HTMLElement | null>) {
  const pathname = usePathname();
  const [mode, setMode] = useState<FeedbackMode>("idle");
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    setDismissed(sessionStorage.getItem(getDismissKey(pathname)) === "1");
  }, [pathname]);

  const updateMode = useCallback(() => {
    const anchor = anchorRef.current;
    if (!anchor) return;

    const rect = anchor.getBoundingClientRect();
    const viewport = window.innerHeight;

    if (rect.top <= FLOAT_INLINE_TOP) {
      setMode("inline");
      return;
    }

    if (rect.top < viewport + FLOAT_ENTER_OFFSET) {
      setMode("floating");
      return;
    }

    setMode("idle");
  }, [anchorRef]);

  useEffect(() => {
    updateMode();

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateMode);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [updateMode]);

  const dismissFloating = useCallback(() => {
    sessionStorage.setItem(getDismissKey(pathname), "1");
    setDismissed(true);
    setMode((current) => (current === "floating" ? "inline" : current));
  }, [pathname]);

  const showFloating = mode === "floating" && !dismissed;

  return { mode, showFloating, dismissFloating, dismissed };
}

export function FeedbackProximityPopover({
  title,
  lead,
  eyebrow = "Feedback",
  variant = "case-study",
  children,
  renderInline,
  className,
}: FeedbackProximityPopoverProps) {
  const anchorRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const { mode, showFloating, dismissFloating } = useFeedbackProximity(anchorRef);
  const [placeholderHeight, setPlaceholderHeight] = useState(0);

  useLayoutEffect(() => {
    if (!showFloating || !contentRef.current) return;
    setPlaceholderHeight(contentRef.current.offsetHeight);
  }, [showFloating, children]);

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

  const body =
    mode === "inline" && renderInline ? renderInline(children) : children;

  return (
    <div ref={anchorRef} className={cn("relative", className)} data-feedback-anchor>
      {showFloating && placeholderHeight > 0 && (
        <div aria-hidden style={{ height: placeholderHeight }} className="pointer-events-none" />
      )}

      <div
        ref={contentRef}
        role={showFloating ? "dialog" : undefined}
        aria-labelledby={showFloating ? titleId : undefined}
        className={cn(
          "transition-[transform,opacity] duration-200 motion-reduce:transition-none",
          showFloating &&
            cn(
              "fixed z-[70] bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md",
              "rounded-2xl border p-4 sm:p-5 max-h-[min(70vh,32rem)] overflow-y-auto",
              "motion-safe:animate-[fade-in_0.25s_ease-out]",
              variant === "case-study" && "feedback-accent-scope",
              floatingCardClass,
            ),
          mode === "idle" && "opacity-0 pointer-events-none h-0 overflow-hidden",
        )}
      >
        {showFloating && (
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
        )}

        <div className={cn(showFloating && "max-h-[50vh] overflow-y-auto pr-0.5")}>{body}</div>
      </div>
    </div>
  );
}
