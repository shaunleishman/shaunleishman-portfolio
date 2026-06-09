"use client";

import dynamic from "next/dynamic";
import { useEffect, useLayoutEffect, useRef, useState, type RefObject } from "react";
import type { HalfHourlyDemoScene } from "@/prototypes/half-hourly/HalfHourlyPrototype";
import { HALF_HOURLY_EDIT_PROJECT_DEMO_PROJECTS } from "@/prototypes/half-hourly/context";
import {
  BulkDemoPlaybackProvider,
  type BulkSynthesiseStep,
} from "@/prototypes/half-hourly/HalfHourlyBulkDemoPlayback";
import {
  highlightOverlayStyle,
  PrototypeDesignCallout,
  resolveCalloutLayout,
  type PrototypeCalloutPlacement,
  type PrototypeHighlightRegion,
} from "@/components/projects/PrototypeDesignCallout";
import { PrototypeDemoCursor } from "@/components/projects/PrototypeDemoCursor";
import {
  arbncoBulkSynthesiseSteps,
  bulkSynthesiseDemoElapsedBeforeStepMs,
  bulkSynthesiseDemoStepDurationMs,
  type ArbncoBulkDemoStepConfig,
} from "@/content/arbnco-prototype-callouts";
import { highlightCenter, measurePrototypeTarget } from "@/lib/measurePrototypeTarget";
import { Skeleton } from "@/components/ui/Skeleton";
import { cn } from "@/lib/utils";

const DEFAULT_DESIGN_WIDTH = 1280;
const DEFAULT_DESIGN_HEIGHT = 800;
const STEP_DURATION_MS = 4000;

function useDemoLoopProgress(stepIndex: number, active: boolean) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!active) {
      setProgress(0);
      return;
    }

    const stepDuration = bulkSynthesiseDemoStepDurationMs(
      arbncoBulkSynthesiseSteps[stepIndex] ?? arbncoBulkSynthesiseSteps[0],
      STEP_DURATION_MS,
    );
    const elapsedBeforeStep = bulkSynthesiseDemoElapsedBeforeStepMs(stepIndex);
    const totalDuration = arbncoBulkSynthesiseSteps.reduce(
      (sum, step) => sum + bulkSynthesiseDemoStepDurationMs(step, STEP_DURATION_MS),
      0,
    );
    const startedAt = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const stepElapsed = now - startedAt;
      const loopElapsed = elapsedBeforeStep + Math.min(stepDuration, stepElapsed);
      setProgress(Math.min(1, loopElapsed / totalDuration));

      if (stepElapsed < stepDuration) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, stepIndex]);

  return progress;
}

function PrototypeDemoProgressBar({ progress }: { progress: number }) {
  const percent = Math.round(progress * 100);

  return (
    <div
      className="relative h-0.5 w-full shrink-0 bg-[var(--color-border)]"
      role="progressbar"
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Demo progress"
    >
      <div
        className="absolute inset-y-0 left-0 bg-[var(--case-study-accent,#0d7377)]"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}

const HalfHourlyEditProjectDemo = dynamic(
  () =>
    import("@/prototypes/half-hourly/HalfHourlyPrototype").then((mod) => mod.HalfHourlyEditProjectDemo),
  {
    ssr: false,
    loading: () => <Skeleton className="absolute inset-0 rounded-none" aria-hidden />,
  },
);

const HalfHourlyBulkSynthesiseDemo = dynamic(
  () =>
    import("@/prototypes/half-hourly/HalfHourlyPrototype").then((mod) => mod.HalfHourlyBulkSynthesiseDemo),
  {
    ssr: false,
    loading: () => <Skeleton className="absolute inset-0 rounded-none" aria-hidden />,
  },
);

const HalfHourlyRoot = dynamic(
  () => import("@/prototypes/half-hourly/HalfHourlyRoot").then((mod) => mod.HalfHourlyRoot),
  { ssr: false },
);

const HalfHourlyEmbedProvider = dynamic(
  () =>
    import("@/prototypes/half-hourly/HalfHourlyEmbedContext").then((mod) => mod.HalfHourlyEmbedProvider),
  { ssr: false },
);

const ProjectProvider = dynamic(
  () => import("@/prototypes/half-hourly/context").then((mod) => mod.ProjectProvider),
  { ssr: false },
);

type HalfHourlyScenarioEmbedProps = {
  demoScene: HalfHourlyDemoScene;
  caption?: string;
  className?: string;
  designWidth?: number;
  designHeight?: number;
  priority?: boolean;
  /** Full-width fit like iteration prototype, or grey-mat framed like OMRON scenario demos. */
  layout?: "full" | "framed";
  autoPlaySteps?: boolean;
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

function useFitWidthScale(
  viewportRef: RefObject<HTMLDivElement | null>,
  designWidth: number,
) {
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const node = viewportRef.current;
    if (!node) return;

    const update = () => {
      const width = node.clientWidth;
      if (width <= 0) return;
      setScale(width / designWidth);
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(node);
    return () => observer.disconnect();
  }, [designWidth, viewportRef]);

  return scale;
}

function PrototypeSurface({
  width,
  height,
  demoScene,
  playbackStep,
}: {
  width: number;
  height: number;
  demoScene: HalfHourlyDemoScene;
  playbackStep: BulkSynthesiseStep;
}) {
  const content =
    demoScene === "edit-project-synthetic" ? (
      <HalfHourlyEditProjectDemo />
    ) : demoScene === "bulk-synthesise-flow" ? (
      <HalfHourlyBulkSynthesiseDemo />
    ) : null;

  return (
    <HalfHourlyRoot>
      <HalfHourlyEmbedProvider interactive={false}>
        <ProjectProvider
          initialProjects={
            demoScene === "edit-project-synthetic"
              ? HALF_HOURLY_EDIT_PROJECT_DEMO_PROJECTS
              : undefined
          }
        >
          <BulkDemoPlaybackProvider step={playbackStep}>
            <div
              className="flex h-full min-h-0 flex-col overflow-hidden bg-[#f5f6f6]"
              style={{ width, height }}
            >
              {content}
            </div>
          </BulkDemoPlaybackProvider>
        </ProjectProvider>
      </HalfHourlyEmbedProvider>
    </HalfHourlyRoot>
  );
}

function FramedPrototypeViewport({
  loadPrototype,
  prototypeReady,
  designWidth,
  designHeight,
  demoScene,
  playbackStep,
  stepConfig,
  showOverlays,
}: {
  loadPrototype: boolean;
  prototypeReady: boolean;
  designWidth: number;
  designHeight: number;
  demoScene: HalfHourlyDemoScene;
  playbackStep: BulkSynthesiseStep;
  stepConfig: ArbncoBulkDemoStepConfig | undefined;
  showOverlays: boolean;
}) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const surfaceRef = useRef<HTMLDivElement>(null);
  const containLayout = useContainLayout(canvasRef, designWidth, designHeight);
  const { scale, offsetX, offsetY } = containLayout;
  const frameWidth = designWidth * scale;
  const frameHeight = designHeight * scale;
  const layoutMetrics = { scale, offsetX, offsetY };
  const [measuredHighlight, setMeasuredHighlight] = useState<PrototypeHighlightRegion | null>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  const showHighlight = stepConfig?.showHighlight !== false;
  const showCallout = stepConfig?.showCallout !== false;
  const showCursor = stepConfig?.showCursor !== false;

  useLayoutEffect(() => {
    const node = canvasRef.current;
    if (!node) return;

    const update = () => {
      setCanvasSize({ width: node.clientWidth, height: node.clientHeight });
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    if (!showOverlays || !stepConfig?.targetSelector || !surfaceRef.current) {
      setMeasuredHighlight(null);
      return;
    }

    const measure = () => {
      if (!surfaceRef.current || !stepConfig.targetSelector) return;
      const rect = measurePrototypeTarget(
        surfaceRef.current,
        stepConfig.targetSelector,
        designWidth,
      );
      setMeasuredHighlight(rect);
    };

    measure();
    const raf = requestAnimationFrame(measure);
    const timer = window.setTimeout(measure, 80);
    const observer = new ResizeObserver(measure);
    observer.observe(surfaceRef.current);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
      observer.disconnect();
    };
  }, [designWidth, playbackStep, prototypeReady, showOverlays, stepConfig]);

  const highlightLayout =
    measuredHighlight && showOverlays && canvasSize.width > 0
      ? resolveCalloutLayout(
          measuredHighlight,
          stepConfig?.calloutSide ?? "left",
          layoutMetrics,
          canvasSize,
        )
      : null;

  const calloutPlacement: PrototypeCalloutPlacement | undefined =
    highlightLayout?.placement ?? stepConfig?.placement;

  const cursorPosition = measuredHighlight ? highlightCenter(measuredHighlight) : null;

  return (
    <div
      className="relative h-[min(480px,55vh)] min-h-[20rem] overflow-visible rounded-t-2xl bg-[#eef1f4] p-4 sm:p-5"
      style={{ boxShadow: "none" }}
    >
      <div ref={canvasRef} className="relative h-full w-full overflow-visible">
        {(!loadPrototype || !prototypeReady) && (
          <Skeleton className="absolute inset-0 rounded-lg" aria-hidden={prototypeReady} />
        )}
        {loadPrototype ? (
          <div
            className="absolute overflow-hidden rounded-lg border border-[var(--color-border)] bg-[#f5f6f6] shadow-[0_1px_3px_rgba(15,23,42,0.08)]"
            style={{
              left: offsetX,
              top: offsetY,
              width: frameWidth,
              height: frameHeight,
              boxShadow: "none",
            }}
          >
            <div
              ref={surfaceRef}
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
                playbackStep={playbackStep}
              />
            </div>
          </div>
        ) : null}

        {measuredHighlight && showOverlays && showHighlight ? (
          <div
            className="pointer-events-none absolute z-[25] rounded-md border-2 border-red-500 bg-red-500/10 shadow-[0_0_0_4px_rgba(239,68,68,0.2)] motion-safe:animate-[fade-in_0.25s_ease-out]"
            style={highlightOverlayStyle(measuredHighlight, layoutMetrics)}
            aria-hidden
          />
        ) : null}

        {stepConfig && showOverlays && showCallout && highlightLayout ? (
          <div className="pointer-events-none absolute z-30" style={highlightLayout.style}>
            <PrototypeDesignCallout
              title={stepConfig.title}
              description={stepConfig.description}
              issue={stepConfig.issue}
              resolution={stepConfig.resolution}
              severity={stepConfig.severity}
              placement={calloutPlacement}
              maxWidth={stepConfig.maxWidth}
              accentColor="var(--case-study-accent, #0d7377)"
              showPointer
            />
          </div>
        ) : null}

        {cursorPosition && showOverlays && showCursor ? (
          <PrototypeDemoCursor
            position={cursorPosition}
            layout={layoutMetrics}
            visible={prototypeReady}
            clicking={playbackStep === "synthesise"}
          />
        ) : null}

        {!prototypeReady && loadPrototype && (
          <p className="absolute inset-x-0 bottom-0 text-center text-body-sm text-[var(--color-text-muted)]">
            Loading interactive prototype…
          </p>
        )}
      </div>
    </div>
  );
}

export function HalfHourlyScenarioEmbed({
  demoScene,
  caption,
  className,
  designWidth = DEFAULT_DESIGN_WIDTH,
  designHeight = DEFAULT_DESIGN_HEIGHT,
  priority = false,
  layout = "full",
  autoPlaySteps = false,
}: HalfHourlyScenarioEmbedProps) {
  const figureRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const fitScale = useFitWidthScale(viewportRef, designWidth);
  const scaledHeight = Math.ceil(designHeight * fitScale);

  const [loadPrototype, setLoadPrototype] = useState(priority);
  const [prototypeReady, setPrototypeReady] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [overlaysVisible, setOverlaysVisible] = useState(false);

  const playbackStep = arbncoBulkSynthesiseSteps[stepIndex]?.step ?? "idle";
  const stepConfig =
    demoScene === "bulk-synthesise-flow" ? arbncoBulkSynthesiseSteps[stepIndex] : undefined;

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
    if (!prototypeReady || !autoPlaySteps || demoScene !== "bulk-synthesise-flow") {
      setOverlaysVisible(false);
      return;
    }

    const showTimer = window.setTimeout(() => setOverlaysVisible(true), 500);
    return () => window.clearTimeout(showTimer);
  }, [autoPlaySteps, demoScene, prototypeReady, stepIndex]);

  useEffect(() => {
    if (!prototypeReady || !autoPlaySteps || demoScene !== "bulk-synthesise-flow") return;

    const durationMs = arbncoBulkSynthesiseSteps[stepIndex]?.durationMs ?? STEP_DURATION_MS;

    const timer = window.setTimeout(() => {
      setStepIndex((current) => (current + 1) % arbncoBulkSynthesiseSteps.length);
    }, durationMs);

    return () => window.clearTimeout(timer);
  }, [autoPlaySteps, demoScene, prototypeReady, stepIndex]);

  const showDemoProgress =
    layout === "framed" && autoPlaySteps && demoScene === "bulk-synthesise-flow";
  const demoProgress = useDemoLoopProgress(stepIndex, showDemoProgress && prototypeReady);

  return (
    <figure
      ref={figureRef}
      className={cn(
        layout === "framed"
          ? "surface-card m-0 flex flex-col gap-0 overflow-visible not-prose"
          : "m-0 flex flex-col gap-0 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white not-prose",
        className,
      )}
      style={{ boxShadow: "none" }}
    >
      {layout === "framed" ? (
        <FramedPrototypeViewport
          loadPrototype={loadPrototype}
          prototypeReady={prototypeReady}
          designWidth={designWidth}
          designHeight={designHeight}
          demoScene={demoScene}
          playbackStep={playbackStep}
          stepConfig={stepConfig}
          showOverlays={overlaysVisible}
        />
      ) : (
        <div
          ref={viewportRef}
          className={cn(
            "relative w-full overflow-hidden bg-[#f5f6f6]",
            caption ? "rounded-t-2xl" : "rounded-2xl",
          )}
          style={{ height: scaledHeight, boxShadow: "none" }}
        >
          {(!loadPrototype || !prototypeReady) && (
            <Skeleton className="absolute inset-0 rounded-none" aria-hidden={prototypeReady} />
          )}
          {loadPrototype ? (
            <div
              style={{
                width: designWidth,
                height: designHeight,
                zoom: fitScale,
                boxShadow: "none",
              }}
            >
              <PrototypeSurface
                width={designWidth}
                height={designHeight}
                demoScene={demoScene}
                playbackStep={playbackStep}
              />
            </div>
          ) : null}
          {!prototypeReady && loadPrototype && (
            <p className="absolute inset-x-0 bottom-4 text-center text-body-sm text-[var(--color-text-muted)]">
              Loading interactive prototype…
            </p>
          )}
        </div>
      )}

      {showDemoProgress && prototypeReady ? (
        <PrototypeDemoProgressBar progress={demoProgress} />
      ) : null}

      {caption && (
        <figcaption
          className={cn(
            "m-0 rounded-b-2xl bg-white px-4 py-2.5 text-body-sm leading-snug text-[var(--color-text-muted)]",
            !showDemoProgress && "border-t border-[var(--color-border)]",
          )}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
