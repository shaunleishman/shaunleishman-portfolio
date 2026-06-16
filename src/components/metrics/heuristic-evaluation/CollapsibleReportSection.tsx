"use client";

import { ChevronDown } from "lucide-react";
import { forwardRef, useCallback, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const SCROLL_OFFSET_PX = 96;

function getScrollParent(node: HTMLElement | null): HTMLElement | null {
  if (!node) return null;
  let parent = node.parentElement;
  while (parent) {
    const { overflowY } = getComputedStyle(parent);
    if (overflowY === "auto" || overflowY === "scroll") return parent;
    parent = parent.parentElement;
  }
  return null;
}

/** Scroll an element into view inside the admin report scroll container. */
export function scrollIntoReportViewport(element: HTMLElement, offset = SCROLL_OFFSET_PX) {
  const scrollParent = getScrollParent(element);
  if (!scrollParent) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }

  const elementRect = element.getBoundingClientRect();
  const parentRect = scrollParent.getBoundingClientRect();
  const targetTop = scrollParent.scrollTop + (elementRect.top - parentRect.top) - offset;

  scrollParent.scrollTo({ top: Math.max(0, targetTop), behavior: "smooth" });
}

type ReportSectionProps = {
  title: string;
  children: React.ReactNode;
  id?: string;
  className?: string;
};

/** Section heading sits above content. */
export const ReportSection = forwardRef<HTMLElement, ReportSectionProps>(function ReportSection(
  { title, children, id, className },
  ref,
) {
  return (
    <section ref={ref} id={id} className={cn(id && "scroll-mt-24", className)}>
      <h2 className="text-h4 font-semibold mb-4">{title}</h2>
      {children}
    </section>
  );
});

type CollapsibleSummaryProps = {
  label?: string;
  headline?: React.ReactNode;
  teaser?: React.ReactNode;
  summaryClassName?: string;
  isOpen: boolean;
  controlsId: string;
  onToggle: () => void;
};

function CollapsibleSummary({
  label,
  headline,
  teaser,
  summaryClassName,
  isOpen,
  controlsId,
  onToggle,
}: CollapsibleSummaryProps) {
  const primary = headline ?? teaser;

  return (
    <button
      type="button"
      id={controlsId}
      aria-expanded={isOpen}
      aria-controls={`${controlsId}-panel`}
      onClick={onToggle}
      className={cn(
        "flex w-full cursor-pointer items-start justify-between gap-4 p-5 text-left motion-safe:transition-colors motion-safe:duration-200 hover:bg-[var(--color-bg-muted)]/40",
        summaryClassName,
      )}
    >
      <div className="min-w-0 flex-1">
        {label && (
          <p className="text-body-sm text-[var(--color-text-muted)]">{label}</p>
        )}
        {primary && (
          <p
            className={cn(
              "text-body font-semibold leading-snug text-[var(--color-text-primary)]",
              label && "mt-1",
            )}
          >
            {primary}
          </p>
        )}
        {headline && teaser && (
          <p className="mt-1.5 line-clamp-2 text-body-sm leading-relaxed text-[var(--color-text-secondary)]">
            {teaser}
          </p>
        )}
      </div>
      <ChevronDown
        className={cn(
          "mt-1 size-5 shrink-0 text-[var(--color-text-muted)] motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out",
          isOpen && "rotate-180",
        )}
        strokeWidth={1.75}
        aria-hidden
      />
    </button>
  );
}

function CollapsibleContent({
  isOpen,
  panelId,
  labelledBy,
  children,
}: {
  isOpen: boolean;
  panelId: string;
  labelledBy: string;
  children: React.ReactNode;
}) {
  return (
    <div
      id={panelId}
      role="region"
      aria-labelledby={labelledBy}
      aria-hidden={!isOpen}
      className={cn(
        "grid motion-safe:transition-[grid-template-rows,opacity] motion-safe:duration-300 motion-safe:ease-out",
        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
      )}
    >
      <div className="overflow-hidden">
        <div
          className={cn(
            "border-t border-[var(--color-border)] px-5 pb-5 pt-4",
            isOpen && "motion-safe:animate-[report-panel-in_0.35s_ease-out_both]",
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

function useCollapsibleDisclosure(defaultOpen: boolean) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const rootRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const controlsId = useId();

  const toggle = useCallback(() => {
    setIsOpen((wasOpen) => {
      const nextOpen = !wasOpen;
      if (nextOpen) {
        window.setTimeout(() => {
          const target = contentRef.current ?? rootRef.current;
          if (target) scrollIntoReportViewport(target);
        }, 80);
      }
      return nextOpen;
    });
  }, []);

  return { isOpen, toggle, rootRef, contentRef, controlsId };
}

type CollapsiblePanelProps = {
  label?: string;
  headline?: React.ReactNode;
  teaser?: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
};

export function CollapsiblePanel({
  label,
  headline,
  teaser,
  children,
  defaultOpen = false,
  className,
}: CollapsiblePanelProps) {
  const { isOpen, toggle, rootRef, contentRef, controlsId } = useCollapsibleDisclosure(defaultOpen);
  const panelId = `${controlsId}-panel`;

  return (
    <div
      ref={rootRef}
      className={cn(
        "scroll-mt-24 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white",
        className,
      )}
    >
      <CollapsibleSummary
        label={label}
        headline={headline}
        teaser={teaser}
        isOpen={isOpen}
        controlsId={controlsId}
        onToggle={toggle}
      />
      <div ref={contentRef}>
        <CollapsibleContent isOpen={isOpen} panelId={panelId} labelledBy={controlsId}>
          {children}
        </CollapsibleContent>
      </div>
    </div>
  );
}

type CollapsibleTeaserCardProps = {
  id?: string;
  label?: string;
  title: React.ReactNode;
  teaser?: React.ReactNode;
  meta?: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
  summaryClassName?: string;
};

export function CollapsibleTeaserCard({
  id,
  label,
  title,
  teaser,
  meta,
  children,
  defaultOpen = false,
  className,
  summaryClassName,
}: CollapsibleTeaserCardProps) {
  const { isOpen, toggle, rootRef, contentRef, controlsId } = useCollapsibleDisclosure(defaultOpen);
  const panelId = `${controlsId}-panel`;

  return (
    <article
      id={id}
      ref={rootRef}
      className={cn(
        "scroll-mt-24 overflow-hidden rounded-2xl border bg-white",
        className,
      )}
    >
      <button
        type="button"
        id={controlsId}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={toggle}
        className={cn(
          "flex w-full cursor-pointer items-start justify-between gap-4 p-5 text-left motion-safe:transition-colors motion-safe:duration-200 hover:bg-[var(--color-bg-muted)]/40",
          summaryClassName,
        )}
      >
        <div className="min-w-0 flex-1">
          {meta && <div className="mb-2 flex flex-wrap items-center gap-2">{meta}</div>}
          {label && (
          <p className="text-body-sm text-[var(--color-text-muted)]">{label}</p>
        )}
          <div
            className={cn(
              "text-body font-semibold text-[var(--color-text-primary)]",
              label && "mt-1",
            )}
          >
            {title}
          </div>
          {teaser && (
            <p className="mt-2 line-clamp-2 text-body-sm leading-relaxed text-[var(--color-text-secondary)]">
              {teaser}
            </p>
          )}
        </div>
        <ChevronDown
          className={cn(
            "mt-1 size-5 shrink-0 text-[var(--color-text-muted)] motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out",
            isOpen && "rotate-180",
          )}
          strokeWidth={1.75}
          aria-hidden
        />
      </button>
      <div ref={contentRef}>
        <CollapsibleContent isOpen={isOpen} panelId={panelId} labelledBy={controlsId}>
          {children}
        </CollapsibleContent>
      </div>
    </article>
  );
}
