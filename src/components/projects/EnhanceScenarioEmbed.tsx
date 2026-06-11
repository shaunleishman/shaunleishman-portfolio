"use client";

import dynamic from "next/dynamic";
import { useEffect, useLayoutEffect, useRef, useState, type RefObject } from "react";
import type { EnhanceDemoScene } from "@/prototypes/enhance/EnhancePrototype";
import {
  calloutPositionForHighlight,
  calloutScreenPosition,
  calloutViewportCornerStyle,
  highlightOverlayStyle,
  PrototypeDesignCallout,
  PROTOTYPE_CALLOUT_REVEAL_DELAY_MS,
  PROTOTYPE_HIGHLIGHT_ENTER_CLASS,
  type PrototypeCalloutConfig,
  type PrototypeCalloutPlacement,
} from "@/components/projects/PrototypeDesignCallout";
import { omronPrototypeCallouts } from "@/content/omron-prototype-callouts";
import { Skeleton } from "@/components/ui/Skeleton";
import { cn } from "@/lib/utils";

/** Canonical desktop frame the prototype is laid out for (matches Figma 16:10 embed). */
const DEFAULT_DESIGN_WIDTH = 1280;
const DEFAULT_DESIGN_HEIGHT = 800;

const EnhancePrototype = dynamic(
  () => import("@/prototypes/enhance/EnhancePrototype").then((mod) => mod.EnhancePrototype),
  {
    ssr: false,
    loading: () => <Skeleton className="absolute inset-0 rounded-none" aria-hidden />,
  },
);

const EnhanceRoot = dynamic(
  () => import("@/prototypes/enhance/EnhanceRoot").then((mod) => mod.EnhanceRoot),
  { ssr: false },
);

type EnhanceScenarioEmbedProps = {
  demoScene: EnhanceDemoScene;
  caption?: string;
  className?: string;
  designWidth?: number;
  designHeight?: number;
  priority?: boolean;
  /** Issue / resolution callout anchored to a point in the prototype. Defaults to OMRON copy per scene. */
  callout?: PrototypeCalloutConfig | null;
  showCallout?: boolean;
};

type ContainLayout = {
  scale: number;
  offsetX: number;
  offsetY: number;
};

function useContainLayout(
  canvasRef: RefObject<HTMLDivElement | null>,
  designWidth: number,
  designHeight: number,
) {
  const [layout, setLayout] = useState<ContainLayout>({
    scale: 1,
    offsetX: 0,
    offsetY: 0,
  });

  useLayoutEffect(() => {
    const node = canvasRef.current;
    if (!node) return;

    const update = () => {
      const width = node.clientWidth;
      const height = node.clientHeight;
      if (width <= 0 || height <= 0) return;

      const scale = Math.min(width / designWidth, height / designHeight);
      const scaledWidth = designWidth * scale;
      const scaledHeight = designHeight * scale;

      setLayout({
        scale,
        offsetX: (width - scaledWidth) / 2,
        offsetY: (height - scaledHeight) / 2,
      });
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(node);
    return () => observer.disconnect();
  }, [designWidth, designHeight, canvasRef]);

  return layout;
}

function PrototypeSurface({
  width,
  height,
  demoScene,
}: {
  width: number;
  height: number;
  demoScene: EnhanceDemoScene;
}) {
  return (
    <EnhanceRoot>
      <div
        className="flex flex-col overflow-hidden bg-[#f5f7fa]"
        style={{ width, height }}
      >
        <EnhancePrototype demoScene={demoScene} />
      </div>
    </EnhanceRoot>
  );
}

export function EnhanceScenarioEmbed({
  demoScene,
  caption,
  className,
  designWidth = DEFAULT_DESIGN_WIDTH,
  designHeight = DEFAULT_DESIGN_HEIGHT,
  priority = false,
  callout,
  showCallout = true,
}: EnhanceScenarioEmbedProps) {
  const figureRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const containLayout = useContainLayout(canvasRef, designWidth, designHeight);
  const { scale, offsetX, offsetY } = containLayout;
  const frameWidth = designWidth * scale;
  const frameHeight = designHeight * scale;
  const resolvedCallout = callout === undefined ? omronPrototypeCallouts[demoScene] : callout;

  const [loadPrototype, setLoadPrototype] = useState(priority);
  const [prototypeReady, setPrototypeReady] = useState(false);
  const [calloutVisible, setCalloutVisible] = useState(false);
  const [calloutDismissed, setCalloutDismissed] = useState(false);

  useEffect(() => {
    if (priority || loadPrototype) return;

    const el = figureRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setLoadPrototype(true);
          observer.disconnect();
        }
      },
      { rootMargin: "1200px 0px 600px 0px", threshold: 0 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [loadPrototype, priority]);

  useEffect(() => {
    if (!loadPrototype) return;
    const timer = window.setTimeout(() => setPrototypeReady(true), 400);
    return () => window.clearTimeout(timer);
  }, [loadPrototype]);

  useEffect(() => {
    if (!prototypeReady || !showCallout || !resolvedCallout || calloutDismissed) {
      setCalloutVisible(false);
      return;
    }

    const timer = window.setTimeout(() => setCalloutVisible(true), PROTOTYPE_CALLOUT_REVEAL_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [calloutDismissed, prototypeReady, resolvedCallout, showCallout]);

  const layoutMetrics = { scale, offsetX, offsetY };

  const highlightLayout =
    resolvedCallout?.highlight && calloutVisible
      ? calloutPositionForHighlight(
          resolvedCallout.highlight,
          resolvedCallout.calloutSide ?? "left",
          layoutMetrics,
        )
      : null;

  const calloutStyle = resolvedCallout && calloutVisible
    ? highlightLayout
      ? highlightLayout.style
      : resolvedCallout.viewportCorner
        ? calloutViewportCornerStyle(resolvedCallout.viewportCorner, {
            offsetX,
            offsetY,
          })
        : resolvedCallout.anchor
          ? calloutScreenPosition(
              resolvedCallout.anchor,
              resolvedCallout.placement ?? "above",
              layoutMetrics,
            )
          : null
    : null;

  const calloutPlacement: PrototypeCalloutPlacement | undefined =
    highlightLayout?.placement ?? resolvedCallout?.placement;

  return (
    <figure
      ref={figureRef}
      className={cn(
        "surface-card m-0 flex flex-col gap-0 overflow-hidden not-prose",
        className,
      )}
      style={{ boxShadow: "none" }}
    >
      <div
        className="relative h-[min(480px,55vh)] min-h-[20rem] overflow-hidden rounded-t-2xl bg-[#eef1f4] p-4 sm:p-5"
        style={{ boxShadow: "none" }}
      >
        <div ref={canvasRef} className="relative h-full w-full">
          {(!loadPrototype || !prototypeReady) && (
            <Skeleton className="absolute inset-0 rounded-lg" aria-hidden={prototypeReady} />
          )}
          {loadPrototype ? (
            <div
              className="absolute overflow-hidden rounded-lg border border-[var(--color-border)] bg-[#f5f7fa] shadow-[0_1px_3px_rgba(15,23,42,0.08)]"
              style={{
                left: offsetX,
                top: offsetY,
                width: frameWidth,
                height: frameHeight,
                boxShadow: "none",
              }}
            >
              <div
                style={{
                  width: designWidth,
                  height: designHeight,
                  zoom: scale,
                  boxShadow: "none",
                }}
              >
                <PrototypeSurface
                  width={designWidth}
                  height={designHeight}
                  demoScene={demoScene}
                />
              </div>
            </div>
          ) : null}
          {resolvedCallout?.highlight && calloutVisible ? (
            <div
              className={cn(
                "pointer-events-none absolute z-[25] rounded-md border-2 border-red-500 bg-red-500/10 shadow-[0_0_0_4px_rgba(239,68,68,0.2)]",
                PROTOTYPE_HIGHLIGHT_ENTER_CLASS,
              )}
              style={highlightOverlayStyle(resolvedCallout.highlight, layoutMetrics)}
              aria-hidden
            />
          ) : null}
          {calloutStyle && resolvedCallout ? (
            <div
              className="pointer-events-auto absolute z-30"
              style={calloutStyle}
            >
              <PrototypeDesignCallout
                {...resolvedCallout}
                placement={calloutPlacement}
                showPointer
                onDismiss={() => setCalloutDismissed(true)}
              />
            </div>
          ) : null}
          {!prototypeReady && loadPrototype && (
            <p className="absolute inset-x-0 bottom-0 text-center text-body-sm text-[var(--color-text-muted)]">
              Loading interactive prototype…
            </p>
          )}
        </div>
      </div>

      {caption && (
        <figcaption className="m-0 rounded-b-2xl border-t border-[var(--color-border)] bg-white px-4 py-2 text-body-sm leading-snug text-[var(--color-text-muted)]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
