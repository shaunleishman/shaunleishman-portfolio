"use client";

import dynamic from "next/dynamic";
import { useEffect, useLayoutEffect, useRef, useState, type RefObject } from "react";
import { Skeleton } from "@/components/ui/Skeleton";
import { cn } from "@/lib/utils";

const DEFAULT_DESIGN_WIDTH = 1280;
const DEFAULT_DESIGN_HEIGHT = 800;

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

const HalfHourlyEmbedRouter = dynamic(
  () => import("@/prototypes/half-hourly/HalfHourlyEmbedRouter").then((mod) => mod.HalfHourlyEmbedRouter),
  {
    ssr: false,
    loading: () => <Skeleton className="absolute inset-0 rounded-none" aria-hidden />,
  },
);

type HalfHourlyPrototypeEmbedProps = {
  title?: string;
  caption?: string;
  designWidth?: number;
  designHeight?: number;
  priority?: boolean;
  compactHeader?: boolean;
  className?: string;
};

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
}: {
  width: number;
  height: number;
}) {
  return (
    <HalfHourlyRoot>
      <HalfHourlyEmbedProvider interactive>
        <ProjectProvider>
          <div
            className="flex h-full min-h-0 flex-col overflow-hidden bg-[#f5f6f6]"
            style={{ width, height }}
          >
            <HalfHourlyEmbedRouter />
          </div>
        </ProjectProvider>
      </HalfHourlyEmbedProvider>
    </HalfHourlyRoot>
  );
}

export function HalfHourlyPrototypeEmbed({
  title = "Half-hourly synthetic data prototype",
  caption,
  designWidth = DEFAULT_DESIGN_WIDTH,
  designHeight = DEFAULT_DESIGN_HEIGHT,
  priority = false,
  compactHeader = false,
  className,
}: HalfHourlyPrototypeEmbedProps) {
  const figureRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const scale = useFitWidthScale(viewportRef, designWidth);
  const scaledHeight = Math.ceil(designHeight * scale);

  const [loadPrototype, setLoadPrototype] = useState(priority);
  const [prototypeReady, setPrototypeReady] = useState(false);

  useEffect(() => {
    if (priority || loadPrototype) return;

    const hash = window.location.hash.replace(/^#/, "");
    if (hash === "iteration") {
      setLoadPrototype(true);
    }
  }, [loadPrototype, priority]);

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

  return (
    <figure
      ref={figureRef}
      className={cn(
        "m-0 flex flex-col gap-0 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white not-prose",
        className,
      )}
      style={{ boxShadow: "none" }}
    >
      {!compactHeader && (
        <div className="border-b border-[var(--color-border)] bg-neutral-50 px-5 py-4">
          <p className="text-body font-semibold text-[var(--color-text-primary)]">{title}</p>
        </div>
      )}

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
              zoom: scale,
              boxShadow: "none",
            }}
          >
            <PrototypeSurface width={designWidth} height={designHeight} />
          </div>
        ) : null}
        {!prototypeReady && loadPrototype && (
          <p className="absolute inset-x-0 bottom-4 text-center text-body-sm text-[var(--color-text-muted)]">
            Loading interactive prototype…
          </p>
        )}
      </div>

      {caption && (
        <figcaption className="m-0 rounded-b-2xl border-t border-[var(--color-border)] bg-white px-4 py-2.5 text-body-sm leading-snug text-[var(--color-text-muted)]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
