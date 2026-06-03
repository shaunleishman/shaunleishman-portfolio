"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { companies } from "@/content/companies";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";

/** Fixed slot size — gap is even because every item occupies the same width */
const LOGO_SLOT = {
  width: 176,
  height: 64,
} as const;

const MAX_LOGO_SCALE = Math.max(...companies.map((company) => company.scale ?? 1));
const LOGO_ROW_HEIGHT = LOGO_SLOT.height * MAX_LOGO_SCALE;

/** Even gap between logo slots */
const LOGO_GAP = 96;

const AUTO_SCROLL_PX_PER_SEC = 40;
const MAX_VELOCITY_PX_PER_SEC = 1200;
const VELOCITY_RETURN_MS = 1800;

type DragState = {
  active: boolean;
  startX: number;
  startOffset: number;
  lastX: number;
  lastTime: number;
  velocity: number;
};

function wrapOffset(value: number, setWidth: number) {
  if (setWidth <= 0) return value;
  let next = value;
  while (next <= -setWidth) next += setWidth;
  while (next > 0) next -= setWidth;
  return next;
}

function clampVelocity(velocity: number) {
  return Math.max(-MAX_VELOCITY_PX_PER_SEC, Math.min(MAX_VELOCITY_PX_PER_SEC, velocity));
}

type CompanyLogoImageProps = {
  name: string;
  logo: string;
  width: number;
  height: number;
  scale?: number;
};

function CompanyLogoImage({ name, logo, width, height, scale = 1 }: CompanyLogoImageProps) {
  const slotWidth = LOGO_SLOT.width * scale;
  const slotHeight = LOGO_SLOT.height * scale;

  return (
    <div
      className="flex shrink-0 items-center justify-center overflow-visible"
      style={{ width: slotWidth, height: LOGO_ROW_HEIGHT }}
    >
      <Image
        src={logo}
        alt={`${name} logo`}
        width={width}
        height={height}
        unoptimized
        draggable={false}
        className="select-none object-contain"
        style={{
          maxWidth: slotWidth,
          maxHeight: slotHeight,
          width: "auto",
          height: "auto",
        }}
      />
    </div>
  );
}

export function LogoMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const setWidthRef = useRef(0);
  const offsetRef = useRef(0);
  const velocityRef = useRef(-AUTO_SCROLL_PX_PER_SEC);
  const dragRef = useRef<DragState>({
    active: false,
    startX: 0,
    startOffset: 0,
    lastX: 0,
    lastTime: 0,
    velocity: 0,
  });
  const lastTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number>(0);
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState(0);

  const tripled = [...companies, ...companies, ...companies];

  const measureSetWidth = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setWidthRef.current = track.scrollWidth / 3;
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    measureSetWidth();
    const observer = new ResizeObserver(measureSetWidth);
    observer.observe(track);
    window.addEventListener("resize", measureSetWidth);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measureSetWidth);
    };
  }, [measureSetWidth]);

  useEffect(() => {
    offsetRef.current = offset;
  }, [offset]);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const tick = (time: number) => {
      if (lastTimeRef.current !== null && !dragRef.current.active) {
        const delta = time - lastTimeRef.current;
        const deltaSec = delta / 1000;

        let next = offsetRef.current + velocityRef.current * deltaSec;
        const setWidth = setWidthRef.current;
        next = wrapOffset(next, setWidth);

        const baseline = -AUTO_SCROLL_PX_PER_SEC;
        const returnStrength = 1 - Math.exp(-delta / VELOCITY_RETURN_MS);
        velocityRef.current += (baseline - velocityRef.current) * returnStrength;

        offsetRef.current = next;
        setOffset(next);
      }
      lastTimeRef.current = time;
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const now = performance.now();
    dragRef.current = {
      active: true,
      startX: e.clientX,
      startOffset: offsetRef.current,
      lastX: e.clientX,
      lastTime: now,
      velocity: velocityRef.current,
    };
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active) return;

    const now = performance.now();
    const deltaTime = now - dragRef.current.lastTime;
    const deltaX = e.clientX - dragRef.current.lastX;

    if (deltaTime > 0) {
      const instantVelocity = (deltaX / deltaTime) * 1000;
      dragRef.current.velocity =
        dragRef.current.velocity * 0.35 + instantVelocity * 0.65;
    }

    dragRef.current.lastX = e.clientX;
    dragRef.current.lastTime = now;

    const dragDelta = e.clientX - dragRef.current.startX;
    const setWidth = setWidthRef.current;
    const next = wrapOffset(dragRef.current.startOffset + dragDelta, setWidth);

    offsetRef.current = next;
    setOffset(next);
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active) return;

    velocityRef.current = clampVelocity(dragRef.current.velocity);
    dragRef.current.active = false;
    setIsDragging(false);

    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  return (
    <section
      aria-label="Companies worked with"
      data-analytics-section="companies"
      className="py-16 bg-[var(--color-bg-dark)] overflow-x-clip border-y border-white/10"
    >
      <Reveal variant="fade">
        <p className="text-label text-neutral-500 text-center mb-10 px-4">
          Companies worked with
        </p>
      </Reveal>

      <div
        className="overflow-x-clip touch-none select-none"
        aria-roledescription="carousel"
        style={{ minHeight: LOGO_ROW_HEIGHT + 8 }}
      >
        <div
          ref={trackRef}
          role="list"
          className={cn(
            "flex w-max items-center px-12 md:px-16",
            isDragging ? "cursor-grabbing" : "cursor-grab",
          )}
          style={{ gap: LOGO_GAP, minHeight: LOGO_ROW_HEIGHT, transform: `translateX(${offset}px)` }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onLostPointerCapture={endDrag}
        >
          {tripled.map((company, i) => (
            <div key={`${company.name}-${i}`} role="listitem" className="shrink-0">
              <CompanyLogoImage
                name={company.name}
                logo={company.logo}
                width={company.width}
                height={company.height}
                scale={company.scale}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
