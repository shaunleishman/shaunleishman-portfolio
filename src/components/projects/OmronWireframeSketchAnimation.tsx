"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type MutableRefObject,
  type Ref,
} from "react";
import { X, ZoomIn } from "lucide-react";
import { Skeleton } from "@/components/ui/Skeleton";
import { cn } from "@/lib/utils";
import {
  IMAGE_H,
  IMAGE_W,
  OMRON_LEFT_PANELS,
  OMRON_RIGHT_PANELS,
  OMRON_WIREFRAME_PANELS,
  OmronWireframePanel,
  type OmronWireframePanelId,
} from "@/components/projects/OmronWireframePanels";

const IMAGE_SRC = "/projects/omron-patient-monitoring/wireframe-sketches.png";

/** Show only the top four sketches (top two rows of the workshop sheet). */
const DISPLAY_PANEL_IDS: OmronWireframePanelId[] = ["actions", "task-flow", "dashboard", "subtask"];
const DISPLAY_PANELS = OMRON_WIREFRAME_PANELS.filter((p) => DISPLAY_PANEL_IDS.includes(p.id));
const DISPLAY_LEFT_PANELS = OMRON_LEFT_PANELS.filter((p) => DISPLAY_PANEL_IDS.includes(p.id));
const DISPLAY_RIGHT_PANELS = OMRON_RIGHT_PANELS.filter((p) => DISPLAY_PANEL_IDS.includes(p.id));

/** Only the top half of the workshop sheet is shown — the bottom half is cropped to save space. */
const SKETCH_VISIBLE_H = Math.round(IMAGE_H / 2);
const SKETCH_ASPECT = `${IMAGE_W} / ${SKETCH_VISIBLE_H}`;

type Point = { x: number; y: number };

type ConnectorPath = {
  id: OmronWireframePanelId;
  d: string;
};

function panelRowY(sketchRect: DOMRect, trace: { y: number; h: number }): number {
  return sketchRect.top + ((trace.y + trace.h / 2) / SKETCH_VISIBLE_H) * sketchRect.height;
}

function panelAnchorOnSketch(
  sketchRect: DOMRect,
  trace: { x: number; y: number; w: number; h: number },
  side: "left" | "right",
): Point {
  const y = panelRowY(sketchRect, trace);
  const x =
    side === "left"
      ? sketchRect.left + (trace.x / IMAGE_W) * sketchRect.width
      : sketchRect.left + ((trace.x + trace.w) / IMAGE_W) * sketchRect.width;
  return { x, y };
}

function buildConnectorPath(start: Point, end: Point, layoutRect: DOMRect): string {
  const sx = start.x - layoutRect.left;
  const sy = start.y - layoutRect.top;
  const ex = end.x - layoutRect.left;
  const ey = end.y - layoutRect.top;
  const gap = Math.abs(ex - sx);
  const bend = Math.min(48, Math.max(16, gap * 0.28));
  const c1x = sx + (start.x < end.x ? bend : -bend);
  const c2x = ex - (start.x < end.x ? bend : -bend);
  return `M ${sx} ${sy} C ${c1x} ${sy}, ${c2x} ${ey}, ${ex} ${ey}`;
}

type OmronWireframeSketchAnimationProps = {
  alt: string;
  caption?: string;
  className?: string;
};

export function OmronWireframeSketchAnimation({
  alt,
  caption,
  className,
}: OmronWireframeSketchAnimationProps) {
  const sketchDialogId = useId();
  const wireframeDialogId = useId();
  const connectorMarkerId = `${wireframeDialogId.replace(/:/g, "")}-arrow`;
  const rootRef = useRef<HTMLDivElement>(null);
  const layoutRef = useRef<HTMLDivElement>(null);
  const sketchRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const desktopImgRef = useRef<HTMLImageElement>(null);
  const mobileImgRef = useRef<HTMLImageElement>(null);
  const cardRefs = useRef<Partial<Record<OmronWireframePanelId, HTMLButtonElement | null>>>({});

  const [loaded, setLoaded] = useState(false);
  const [sketchOpen, setSketchOpen] = useState(false);
  const [expandedId, setExpandedId] = useState<OmronWireframePanelId | null>(null);
  const [connectors, setConnectors] = useState<ConnectorPath[]>([]);
  const [sketchHeight, setSketchHeight] = useState(0);

  const expandedPanel = expandedId
    ? OMRON_WIREFRAME_PANELS.find((p) => p.id === expandedId)
    : null;

  const updateConnectors = useCallback(() => {
    const layout = layoutRef.current?.getBoundingClientRect();
    const sketch = sketchRef.current?.getBoundingClientRect();
    const leftCol = leftColRef.current?.getBoundingClientRect();
    const rightCol = rightColRef.current?.getBoundingClientRect();
    if (!layout || !sketch || !leftCol || !rightCol) return;

    const paths: ConnectorPath[] = [];

    for (const panel of DISPLAY_PANELS) {
      const card = cardRefs.current[panel.id]?.getBoundingClientRect();
      if (!card) continue;

      const side = panel.trace.x < IMAGE_W / 2 ? "left" : "right";
      const rowY = panelRowY(sketch, panel.trace);
      const end = panelAnchorOnSketch(sketch, panel.trace, side);

      // Anchor at the card edge on the sketch-facing side, aligned to the sketch panel row
      const rowYClamped = Math.min(Math.max(rowY, card.top + 4), card.bottom - 4);
      const start: Point = {
        x: side === "left" ? card.right : card.left,
        y: rowYClamped,
      };

      // If the card is shorter than its row, fall back to the column edge nearest the sketch
      if (rowY < card.top || rowY > card.bottom) {
        start.x = side === "left" ? leftCol.right - 4 : rightCol.left + 4;
        start.y = rowY;
      }

      paths.push({
        id: panel.id,
        d: buildConnectorPath(start, end, layout),
      });
    }

    setConnectors(paths);
  }, []);

  const markSketchLoaded = useCallback(() => {
    setLoaded(true);
    requestAnimationFrame(updateConnectors);
  }, [updateConnectors]);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = IMAGE_SRC;
    document.head.appendChild(link);
    return () => link.remove();
  }, []);

  useEffect(() => {
    for (const img of [desktopImgRef.current, mobileImgRef.current]) {
      if (img?.complete && img.naturalWidth > 0) {
        markSketchLoaded();
        break;
      }
    }
  }, [markSketchLoaded]);

  useEffect(() => {
    updateConnectors();

    const root = rootRef.current;
    const layout = layoutRef.current;
    const sketch = sketchRef.current;
    if (!root) return;

    const syncLayout = () => {
      if (sketch) setSketchHeight(sketch.getBoundingClientRect().height);
      updateConnectors();
    };

    syncLayout();

    const observer = new ResizeObserver(syncLayout);
    observer.observe(root);
    if (layout) observer.observe(layout);
    if (sketch) observer.observe(sketch);
    window.addEventListener("resize", syncLayout);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", syncLayout);
    };
  }, [updateConnectors]);

  useEffect(() => {
    if (!sketchOpen && !expandedId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSketchOpen(false);
        setExpandedId(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [sketchOpen, expandedId]);

  function openWireframe(id: OmronWireframePanelId) {
    setExpandedId(id);
  }

  function closeWireframe() {
    setExpandedId(null);
  }

  return (
    <>
      <figure className={cn("surface-card relative flex flex-col gap-0 overflow-hidden", className)}>
        {/* Desktop: sketch centre, wireframes flanking with connectors */}
        <div
          ref={rootRef}
          className="group relative hidden bg-neutral-50/80 p-4 sm:p-5 lg:block lg:p-6"
          role="img"
          aria-label={alt}
        >
          <div ref={layoutRef} className="relative flex items-start gap-x-4 xl:gap-x-6">
            <SideColumn
              ref={leftColRef}
              panels={DISPLAY_LEFT_PANELS}
              side="left"
              expandedId={expandedId}
              onExpand={openWireframe}
              cardRefs={cardRefs}
              height={sketchHeight}
            />

            <div
              ref={sketchRef}
              className="relative min-w-0 flex-1 overflow-hidden rounded-lg border border-[var(--color-border)] bg-white shadow-sm"
              style={{ aspectRatio: SKETCH_ASPECT }}
            >
              {!loaded && <Skeleton className="absolute inset-0 rounded-none" aria-hidden />}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                ref={desktopImgRef}
                src={IMAGE_SRC}
                alt={alt}
                loading="eager"
                decoding="async"
                fetchPriority="high"
                onLoad={markSketchLoaded}
                onError={markSketchLoaded}
                className={cn(
                  "block h-full w-full object-cover object-top transition-opacity duration-300",
                  loaded ? "opacity-100" : "opacity-0",
                )}
              />

              {DISPLAY_PANELS.map((panel) => (
                <div
                  key={panel.id}
                  className={cn(
                    "pointer-events-none absolute rounded-[3px] border-2 transition-all duration-300",
                    expandedId === panel.id
                      ? "border-[var(--case-study-accent,#003153)] bg-[var(--case-study-accent,#003153)]/8 opacity-100 shadow-[0_0_0_1px_rgba(0,61,165,0.15)]"
                      : "border-transparent opacity-0",
                  )}
                  style={{
                    left: `${(panel.trace.x / IMAGE_W) * 100}%`,
                    top: `${(panel.trace.y / SKETCH_VISIBLE_H) * 100}%`,
                    width: `${(panel.trace.w / IMAGE_W) * 100}%`,
                    height: `${(panel.trace.h / SKETCH_VISIBLE_H) * 100}%`,
                  }}
                  aria-hidden
                />
              ))}

              <button
                type="button"
                onClick={() => setSketchOpen(true)}
                className="absolute bottom-2 right-2 flex items-center gap-1.5 rounded-full bg-black/55 px-2.5 py-1 text-[0.6875rem] font-medium text-white opacity-0 transition-opacity hover:bg-black/70 focus-visible:opacity-100 group-hover:opacity-100"
                aria-haspopup="dialog"
                aria-expanded={sketchOpen}
                aria-controls={sketchDialogId}
              >
                <ZoomIn className="size-3.5" aria-hidden />
                Zoom
              </button>
            </div>

            <SideColumn
              ref={rightColRef}
              panels={DISPLAY_RIGHT_PANELS}
              side="right"
              expandedId={expandedId}
              onExpand={openWireframe}
              cardRefs={cardRefs}
              height={sketchHeight}
            />

            {connectors.length > 0 && (
              <svg className="pointer-events-none absolute inset-0 z-10 h-full w-full overflow-visible" aria-hidden>
                <defs>
                  <marker
                    id={connectorMarkerId}
                    markerWidth="8"
                    markerHeight="8"
                    refX="7"
                    refY="4"
                    orient="auto"
                  >
                    <path
                      d="M0,0 L8,4 L0,8 Z"
                      fill="var(--case-study-accent, #003153)"
                      fillOpacity={0.75}
                    />
                  </marker>
                </defs>
                {connectors.map(({ id, d }) => (
                  <path
                    key={id}
                    d={d}
                    fill="none"
                    stroke={
                      expandedId === null || expandedId === id
                        ? "var(--case-study-accent, #003153)"
                        : "var(--color-border)"
                    }
                    strokeWidth={expandedId === id ? 2 : 1.25}
                    strokeOpacity={expandedId === null ? 0.5 : expandedId === id ? 0.9 : 0.18}
                    strokeLinecap="round"
                    markerEnd={expandedId === null || expandedId === id ? `url(#${connectorMarkerId})` : undefined}
                  />
                ))}
                {connectors.map(({ id }) => {
                  if (expandedId !== id) return null;
                  const sketch = sketchRef.current?.getBoundingClientRect();
                  const layout = layoutRef.current?.getBoundingClientRect();
                  const panel = OMRON_WIREFRAME_PANELS.find((p) => p.id === id)!;
                  if (!sketch || !layout) return null;
                  const side = panel.trace.x < IMAGE_W / 2 ? "left" : "right";
                  const end = panelAnchorOnSketch(sketch, panel.trace, side);
                  return (
                    <circle
                      key={`${id}-dot`}
                      cx={end.x - layout.left}
                      cy={end.y - layout.top}
                      r={4}
                      fill="var(--case-study-accent, #003153)"
                    />
                  );
                })}
              </svg>
            )}
          </div>
        </div>

        {/* Mobile / tablet: sketch then labelled wireframes */}
        <div className="lg:hidden">
          <div
            className="relative overflow-hidden bg-neutral-50/80 p-4"
            style={{ aspectRatio: SKETCH_ASPECT }}
          >
            {!loaded && <Skeleton className="absolute inset-4 rounded-lg" aria-hidden />}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={mobileImgRef}
              src={IMAGE_SRC}
              alt={alt}
              loading="eager"
              decoding="async"
              fetchPriority="high"
              onLoad={markSketchLoaded}
              onError={markSketchLoaded}
              className={cn(
                "h-full w-full rounded-lg border border-[var(--color-border)] bg-white object-cover object-top shadow-sm transition-opacity duration-300",
                loaded ? "opacity-100" : "opacity-0",
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-3 border-t border-[var(--color-border)] bg-white p-4">
            {DISPLAY_PANELS.map((panel) => (
              <WireframeCard
                key={panel.id}
                id={panel.id}
                label={panel.label}
                selected={expandedId === panel.id}
                onExpand={openWireframe}
              />
            ))}
          </div>
        </div>

        {caption && (
          <figcaption className="m-0 border-t border-[var(--color-border)] bg-white px-4 py-2 text-body-sm leading-snug text-[var(--color-text-muted)]">
            {caption}
          </figcaption>
        )}

        {/* Enlarged wireframe, contained within this figure */}
        {expandedId && expandedPanel && (
          <div
            id={wireframeDialogId}
            role="dialog"
            aria-modal="true"
            aria-label={`Wireframe: ${expandedPanel.label}`}
            className="absolute inset-0 z-50 flex items-center justify-center bg-black/65 p-4 motion-safe:animate-[fade-in_0.2s_ease-out] sm:p-6"
            onClick={closeWireframe}
          >
            <button
              type="button"
              onClick={closeWireframe}
              className="absolute top-3 right-3 z-10 rounded-full bg-white/90 p-1.5 text-[var(--color-text-secondary)] shadow-sm hover:bg-white"
              aria-label="Close wireframe"
            >
              <X className="size-4" />
            </button>
            <div
              className="flex h-full w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-[var(--color-border)] bg-white shadow-2xl motion-safe:animate-[fade-in_0.25s_ease-out]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="min-h-0 flex-1 border-b border-[var(--color-border)] bg-white p-2">
                <OmronWireframePanel id={expandedId} solid />
              </div>
              <div className="shrink-0 px-4 py-3">
                <p className="text-body-sm font-semibold text-[var(--color-text-primary)]">{expandedPanel.label}</p>
                <p className="mt-0.5 text-body-sm text-[var(--color-text-muted)]">
                  Refined wireframe from the workshop sketch, click outside or press Escape to close.
                </p>
              </div>
            </div>
          </div>
        )}

        {sketchOpen && (
          <div
            id={sketchDialogId}
            role="dialog"
            aria-modal="true"
            aria-label={`Enlarged view: ${alt}`}
            className="absolute inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/75 p-4 motion-safe:animate-[fade-in_0.2s_ease-out] md:p-6"
            onClick={() => setSketchOpen(false)}
          >
            <button
              type="button"
              onClick={() => setSketchOpen(false)}
              className="absolute top-3 right-3 z-10 rounded-full bg-white/90 p-1.5 text-[var(--color-text-secondary)] shadow-sm hover:bg-white"
              aria-label="Close enlarged image"
            >
              <X className="size-4" />
            </button>
            <div className="max-h-full max-w-full" onClick={(e) => e.stopPropagation()}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={IMAGE_SRC} alt={alt} className="max-h-[min(75vh,640px)] w-auto max-w-full rounded-lg object-contain" />
            </div>
          </div>
        )}
      </figure>
    </>
  );
}

const SideColumn = forwardRef(function SideColumn(
  {
    panels,
    side,
    expandedId,
    onExpand,
    cardRefs,
    height,
  }: {
    panels: typeof OMRON_LEFT_PANELS;
    side: "left" | "right";
    expandedId: OmronWireframePanelId | null;
    onExpand: (id: OmronWireframePanelId) => void;
    cardRefs: MutableRefObject<Partial<Record<OmronWireframePanelId, HTMLButtonElement | null>>>;
    height: number;
  },
  ref: Ref<HTMLDivElement>,
) {
  return (
    <div
      ref={ref}
      className="relative w-[min(100%,12.5rem)] shrink-0 sm:w-[13.5rem] xl:w-[14.5rem]"
      style={{ height: height > 0 ? height : undefined }}
    >
      {panels.map((panel) => {
        const topPct = (panel.trace.y / SKETCH_VISIBLE_H) * 100;
        const heightPct = (panel.trace.h / SKETCH_VISIBLE_H) * 100;

        return (
          <div
            key={panel.id}
            className={cn(
              "absolute left-0 right-0 flex items-center overflow-hidden",
              side === "left" ? "justify-end pr-0.5" : "justify-start pl-0.5",
            )}
            style={{ top: `${topPct}%`, height: `${heightPct}%` }}
          >
            <WireframeCard
              ref={(el) => {
                cardRefs.current[panel.id] = el;
              }}
              id={panel.id}
              label={panel.label}
              selected={expandedId === panel.id}
              onExpand={onExpand}
              className="max-h-full w-full max-w-[10.5rem] xl:max-w-[11.5rem]"
            />
          </div>
        );
      })}
    </div>
  );
});

const WireframeCard = forwardRef(function WireframeCard(
  {
    id,
    label,
    selected = false,
    onExpand,
    className,
  }: {
    id: OmronWireframePanelId;
    label: string;
    selected?: boolean;
    onExpand: (id: OmronWireframePanelId) => void;
    className?: string;
  },
  ref: Ref<HTMLButtonElement>,
) {
  return (
    <button
      ref={ref}
      type="button"
      onClick={() => onExpand(id)}
      className={cn(
        "flex max-h-full min-h-0 w-full cursor-pointer flex-col overflow-hidden rounded-lg border bg-white text-left shadow-sm transition-all duration-200",
        selected
          ? "border-[var(--case-study-accent,#003153)] ring-2 ring-[var(--case-study-accent,#003153)]/20"
          : "border-[var(--color-border)] hover:border-[var(--case-study-accent,#003153)]/50 hover:shadow-md",
        className,
      )}
      aria-label={`View wireframe: ${label}`}
      aria-haspopup="dialog"
    >
      <div className="min-h-0 flex-1 overflow-hidden p-1">
        <OmronWireframePanel id={id} solid />
      </div>
      <span
        className={cn(
          "shrink-0 truncate border-t px-1.5 py-0.5 text-[0.5625rem] font-medium leading-tight",
          selected
            ? "border-[var(--case-study-accent,#003153)]/20 bg-[var(--case-study-accent,#003153)]/5 text-[var(--case-study-accent,#003153)]"
            : "border-[var(--color-border)] bg-neutral-50 text-[var(--color-text-muted)]",
        )}
      >
        {label}
      </span>
    </button>
  );
});
