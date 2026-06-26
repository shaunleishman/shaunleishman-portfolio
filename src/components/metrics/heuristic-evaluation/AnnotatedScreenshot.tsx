"use client";

import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import type {
  ScreenshotAnnotation,
  ScreenshotAnnotationLabelPosition,
} from "@/content/heuristic-evaluations/types";

type AnnotationDensity = "default" | "compact";

type AnnotatedScreenshotProps = {
  src: string;
  alt: string;
  annotations?: readonly ScreenshotAnnotation[];
  className?: string;
  priority?: boolean;
  /** Smaller labels and inset chips for thumbnail grids */
  density?: AnnotationDensity;
  /** Open a full-size modal on click */
  expandable?: boolean;
  /** Shown under the image in the expanded modal */
  caption?: string;
};

type BoxRect = {
  left: number;
  top: number;
  width: number;
  height: number;
};

const LABEL_OFFSET: Record<ScreenshotAnnotationLabelPosition, string> = {
  right: "left-full top-1/2 -translate-y-1/2",
  left: "right-full top-1/2 -translate-y-1/2",
  below: "left-1/2 top-full -translate-x-1/2",
  above: "left-1/2 bottom-full -translate-x-1/2",
  inside: "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center",
};

const LABEL_OFFSET_COMPACT: Record<ScreenshotAnnotationLabelPosition, string> = {
  ...LABEL_OFFSET,
  inside: "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center",
};

const LABEL_GAP: Record<AnnotationDensity, Record<ScreenshotAnnotationLabelPosition, string>> = {
  default: {
    right: "ml-2",
    left: "mr-2",
    below: "mt-1.5",
    above: "mb-1.5",
    inside: "",
  },
  compact: {
    right: "ml-0.5",
    left: "mr-0.5",
    below: "mt-0.5",
    above: "mb-0.5",
    inside: "px-0.5 py-0",
  },
};

/** Convert centre-based coords to a box clamped inside the image (0–100%). */
function getBoxRect(annotation: ScreenshotAnnotation): BoxRect {
  const width = annotation.width ?? 18;
  const height = annotation.height ?? 10;
  let left = annotation.x - width / 2;
  let top = annotation.y - height / 2;

  if (left < 0) left = 0;
  if (top < 0) top = 0;
  if (left + width > 100) left = Math.max(0, 100 - width);
  if (top + height > 100) top = Math.max(0, 100 - height);

  return { left, top, width, height };
}

function getExternalLabelStyle(
  box: BoxRect,
  position: Exclude<ScreenshotAnnotationLabelPosition, "inside">,
): React.CSSProperties {
  switch (position) {
    case "right":
      return {
        left: `${box.left + box.width}%`,
        top: `${box.top + box.height / 2}%`,
        transform: "translate(0.5rem, -50%)",
      };
    case "left":
      return {
        left: `${box.left}%`,
        top: `${box.top + box.height / 2}%`,
        transform: "translate(calc(-100% - 0.5rem), -50%)",
      };
    case "below":
      return {
        left: `${box.left + box.width / 2}%`,
        top: `${box.top + box.height}%`,
        transform: "translate(-50%, 0.375rem)",
      };
    case "above":
      return {
        left: `${box.left + box.width / 2}%`,
        top: `${box.top}%`,
        transform: "translate(-50%, calc(-100% - 0.375rem))",
      };
  }
}

function resolveLabelPosition(
  annotation: ScreenshotAnnotation,
  box: BoxRect,
  density: AnnotationDensity,
): ScreenshotAnnotationLabelPosition {
  if (annotation.labelPosition) return annotation.labelPosition;

  if (density === "compact") {
    return "inside";
  }

  const spaceRight = 100 - (box.left + box.width);
  const spaceLeft = box.left;
  const spaceBelow = 100 - (box.top + box.height);
  const spaceAbove = box.top;

  if (spaceBelow >= 11) return "below";
  if (spaceAbove >= 11) return "above";
  if (spaceRight >= 16) return "right";
  if (spaceLeft >= 16) return "left";
  if (box.width >= 22 && box.height >= 5) return "inside";

  return spaceBelow >= spaceAbove ? "below" : "above";
}

function AnnotationLabel({
  label,
  position,
  variant,
  density,
  className,
}: {
  label: string;
  position: ScreenshotAnnotationLabelPosition;
  variant?: ScreenshotAnnotation["variant"];
  density: AnnotationDensity;
  className?: string;
}) {
  const isCompact = density === "compact";
  const labelOffset = isCompact ? LABEL_OFFSET_COMPACT : LABEL_OFFSET;

  return (
    <span
      className={cn(
        "absolute z-10 text-left font-semibold leading-snug text-white shadow-md",
        labelOffset[position],
        LABEL_GAP[density][position],
        isCompact
          ? "max-w-[calc(100%-0.25rem)] rounded-[2px] px-1 py-px text-[length:clamp(0.375rem,2.6cqw,0.5rem)] leading-none shadow-none"
          : cn(
              "rounded px-2 py-1 text-[0.625rem] leading-tight",
              position === "inside" ? "max-w-[calc(100%-0.35rem)]" : "max-w-[min(13rem,calc(100%-0.5rem))] px-2.5 py-1.5 text-[0.6875rem]",
            ),
        position === "inside" || position === "below" || position === "above"
          ? "whitespace-normal"
          : isCompact
            ? "whitespace-normal"
            : "whitespace-nowrap",
        variant === "fix" ? "bg-emerald-700" : variant === "context" ? "bg-neutral-800" : "bg-[#E85D04]",
        className,
      )}
    >
      {label}
    </span>
  );
}

function FoldArrowMarker({
  annotation,
  density,
}: {
  annotation: ScreenshotAnnotation;
  density: AnnotationDensity;
}) {
  const lineWidth = annotation.width ?? 94;
  const left = Math.max(0, Math.min(100 - lineWidth, annotation.x - lineWidth / 2));
  const isCompact = density === "compact";

  return (
    <div
      className="pointer-events-none absolute flex flex-col items-center"
      style={{
        left: `${left}%`,
        top: `${annotation.y}%`,
        width: `${lineWidth}%`,
        transform: "translateY(-100%)",
      }}
    >
      <span
        className={cn(
          "mb-3 rounded px-3 py-1.5 text-center font-semibold leading-snug text-white shadow-md",
          isCompact ? "mb-1 px-1.5 py-0.5 text-[length:clamp(0.375rem,2.6cqw,0.5rem)]" : "text-[0.75rem]",
          "bg-[#E85D04]",
        )}
      >
        {annotation.label}
      </span>
      <svg
        viewBox="0 0 200 56"
        className={cn("w-full shrink-0", isCompact ? "h-5" : "h-10")}
        aria-hidden
        preserveAspectRatio="none"
      >
        <line
          x1="0"
          y1="10"
          x2="200"
          y2="10"
          stroke="#E85D04"
          strokeWidth={isCompact ? 3 : 5}
          strokeDasharray="10 7"
          strokeLinecap="round"
        />
        <path d="M 100 56 L 78 18 L 122 18 Z" fill="#E85D04" />
      </svg>
    </div>
  );
}

function AnnotationMarker({
  annotation,
  density,
}: {
  annotation: ScreenshotAnnotation;
  density: AnnotationDensity;
}) {
  const isBox =
    annotation.shape !== "arrow" &&
    (annotation.shape === "box" || Boolean(annotation.width && annotation.height));
  const isArrow = annotation.shape === "arrow";
  const box = getBoxRect(annotation);
  const labelPosition = resolveLabelPosition(annotation, box, density);
  const isIssue = annotation.variant !== "fix" && annotation.variant !== "context";
  const isContext = annotation.variant === "context";
  const isCompact = density === "compact";
  const ringClass = isContext
    ? isCompact
      ? "border-[#E85D04]/60 border-dashed shadow-none"
      : "border-[#E85D04]/70 border-dashed shadow-none"
    : isIssue
      ? isCompact
        ? "border-[#E85D04]/90 shadow-none"
        : "border-[#E85D04] shadow-[0_0_0_2px_rgba(232,93,4,0.18)]"
      : "border-emerald-500 shadow-[0_0_0_2px_rgba(16,185,129,0.18)]";
  const fillClass = isContext
    ? isCompact
      ? "bg-[#E85D04]/5"
      : "bg-[#E85D04]/5"
    : isCompact
      ? "bg-[#E85D04]/6"
      : labelPosition === "inside"
        ? "bg-[#E85D04]/15"
        : "bg-[#E85D04]/10";
  const showLabel = !isCompact || (box.width >= 22 && box.height >= 7);

  if (isArrow) {
    return <FoldArrowMarker annotation={annotation} density={density} />;
  }

  if (isBox) {
    const labelClasses = cn(
      "absolute z-10 w-max max-w-[13rem] text-left font-semibold leading-snug text-white shadow-md",
      isCompact
        ? "rounded-[2px] px-1 py-px text-[length:clamp(0.375rem,2.6cqw,0.5rem)] leading-none shadow-none"
        : "rounded px-2.5 py-1.5 text-[0.6875rem] leading-snug",
      labelPosition === "inside" ? "whitespace-normal" : "whitespace-nowrap",
      annotation.variant === "fix"
        ? "bg-emerald-700"
        : annotation.variant === "context"
          ? "bg-neutral-800"
          : "bg-[#E85D04]",
    );

    return (
      <>
        <div
          className="pointer-events-none absolute"
          style={{
            left: `${box.left}%`,
            top: `${box.top}%`,
            width: `${box.width}%`,
            height: `${box.height}%`,
          }}
        >
          <span
            className={cn(
              "absolute inset-0 rounded-[1px]",
              fillClass,
              isCompact ? "border" : "border-2",
              ringClass,
            )}
            aria-hidden
          />
          {showLabel && labelPosition === "inside" ? (
            <AnnotationLabel
              label={annotation.label}
              position="inside"
              variant={annotation.variant}
              density={density}
            />
          ) : null}
        </div>
        {showLabel && labelPosition !== "inside" ? (
          <span
            className={labelClasses}
            style={getExternalLabelStyle(box, labelPosition)}
          >
            {annotation.label}
          </span>
        ) : null}
      </>
    );
  }

  return (
    <div
      className="pointer-events-none absolute"
      style={{
        left: `${annotation.x}%`,
        top: `${annotation.y}%`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <span
        className={cn(
          "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2",
          isCompact ? "size-7" : "size-10",
          ringClass,
        )}
        aria-hidden
      />
      <AnnotationLabel
        label={annotation.label}
        position={labelPosition}
        variant={annotation.variant}
        density={density}
      />
    </div>
  );
}

function AnnotatedScreenshotContent({
  src,
  alt,
  annotations = [],
  density,
  priority,
}: {
  src: string;
  alt: string;
  annotations?: readonly ScreenshotAnnotation[];
  density: AnnotationDensity;
  priority?: boolean;
}) {
  const isStaticImport = src.startsWith("/");

  return (
    <div className={cn("@container relative w-full", density === "compact" && "overflow-hidden")}>
      {/* Native img — Next/Image lazy loading can fail to paint inside nested overflow containers */}
      {isStaticImport ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          width={1920}
          height={1080}
          loading="eager"
          decoding="async"
          className="relative z-0 block h-auto w-full"
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className="relative z-0 block h-auto w-full" />
      )}

      {annotations.length > 0 && (
        <div
          className={cn(
            "pointer-events-none absolute inset-0 z-10",
            density === "compact" ? "overflow-hidden" : "overflow-visible",
          )}
          aria-hidden
        >
          {annotations.map((annotation, index) => (
            <AnnotationMarker key={`${annotation.label}-${index}`} annotation={annotation} density={density} />
          ))}
        </div>
      )}
    </div>
  );
}

export function AnnotatedScreenshot({
  src,
  alt,
  annotations = [],
  className,
  priority,
  density = "default",
  expandable = false,
  caption,
}: AnnotatedScreenshotProps) {
  const dialogId = useId();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const content = (
    <AnnotatedScreenshotContent
      src={src}
      alt={alt}
      annotations={annotations}
      density={density}
      priority={priority}
    />
  );

  if (!expandable) {
    return (
      <figure
        className={cn(
          "relative rounded-lg border border-[var(--color-border)]",
          density === "compact" ? "overflow-hidden" : "overflow-visible",
          className,
        )}
      >
        {content}
      </figure>
    );
  }

  return (
    <>
      <figure
        className={cn(
          "relative rounded-lg border border-[var(--color-border)]",
          density === "compact" ? "overflow-hidden" : "overflow-visible",
          className,
        )}
      >
        <button
          type="button"
          onClick={() => setOpen(true)}
          className={cn(
            "group relative m-0 block w-full cursor-zoom-in border-0 bg-white p-0 text-left leading-none",
            density === "compact" ? "overflow-hidden" : "overflow-visible",
          )}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls={dialogId}
        >
          {content}
          <span className="absolute bottom-3 right-3 z-20 rounded-full bg-black/60 px-2.5 py-1 text-[0.75rem] font-medium text-white opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100">
            Expand
          </span>
        </button>
      </figure>

      {open && typeof document !== "undefined"
        ? createPortal(
            <div
              id={dialogId}
              role="dialog"
              aria-modal="true"
              aria-label={`Enlarged view of ${alt}`}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 sm:p-4 md:p-8 motion-safe:animate-[fade-in_0.2s_ease-out]"
              onClick={() => setOpen(false)}
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="absolute top-3 right-3 z-10 inline-flex min-h-11 items-center rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/20 sm:top-4 sm:right-4"
              >
                Close
              </button>
              <div
                className="max-h-[90vh] w-full max-w-6xl overflow-y-auto rounded-xl bg-white p-3 pt-14 pb-4 sm:p-4 sm:pt-10"
                onClick={(e) => e.stopPropagation()}
              >
                <AnnotatedScreenshotContent
                  src={src}
                  alt={alt}
                  annotations={annotations}
                  density="default"
                />
                {caption && (
                  <p className="border-t border-[var(--color-border)] px-4 py-3 text-body-sm text-[var(--color-text-secondary)]">
                    {caption}
                  </p>
                )}
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
