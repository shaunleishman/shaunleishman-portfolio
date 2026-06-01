"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { companies } from "@/content/companies";
import { cn } from "@/lib/utils";

/** Every logo sits in the same footprint so visual weight stays even */
const LOGO_SLOT = {
  width: 120,
  height: 40,
} as const;

/** Even gap between slots — not tied to logo width */
const LOGO_GAP = 64;

const AUTO_SCROLL_PX_PER_SEC = 40;

type CompanyLogoImageProps = {
  name: string;
  logo: string;
  scale?: number;
};

function CompanyLogoImage({ name, logo, scale = 1 }: CompanyLogoImageProps) {
  // Shrink base size inversely so scaled result always fits the slot — no clipping
  const maxWidth = LOGO_SLOT.width / scale;
  const maxHeight = LOGO_SLOT.height / scale;

  return (
    <div
      className="flex items-center justify-center overflow-hidden"
      style={{ width: LOGO_SLOT.width, height: LOGO_SLOT.height }}
    >
      <div
        className="flex items-center justify-center"
        style={{ transform: scale !== 1 ? `scale(${scale})` : undefined }}
      >
        <Image
          src={logo}
          alt={`${name} logo`}
          width={Math.round(maxWidth)}
          height={Math.round(maxHeight)}
          unoptimized
          draggable={false}
          className="select-none object-contain"
          style={{ maxWidth, maxHeight, width: "auto", height: "auto" }}
        />
      </div>
    </div>
  );
}

export function LogoMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const setWidthRef = useRef(0);
  const offsetRef = useRef(0);
  const dragRef = useRef<{ active: boolean; startX: number; startOffset: number }>({
    active: false,
    startX: 0,
    startOffset: 0,
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
        let next = offsetRef.current - (AUTO_SCROLL_PX_PER_SEC * delta) / 1000;
        const setWidth = setWidthRef.current;
        if (setWidth > 0) {
          while (next <= -setWidth) next += setWidth;
        }
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
    dragRef.current = { active: true, startX: e.clientX, startOffset: offsetRef.current };
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active) return;
    const delta = e.clientX - dragRef.current.startX;
    let next = dragRef.current.startOffset + delta;
    const setWidth = setWidthRef.current;
    if (setWidth > 0) {
      while (next <= -setWidth) next += setWidth;
      while (next > 0) next -= setWidth;
    }
    offsetRef.current = next;
    setOffset(next);
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active) return;
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
      className="py-12 bg-[var(--color-bg-dark)] overflow-hidden border-y border-white/10"
    >
      <p className="text-label text-neutral-500 text-center mb-8 px-4">
        Companies worked with
      </p>

      <div
        className="overflow-hidden touch-none select-none"
        aria-roledescription="carousel"
      >
        <div
          ref={trackRef}
          role="list"
          className={cn(
            "flex w-max items-center px-8",
            isDragging ? "cursor-grabbing" : "cursor-grab",
          )}
          style={{ gap: LOGO_GAP, transform: `translateX(${offset}px)` }}
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
                scale={company.scale}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
