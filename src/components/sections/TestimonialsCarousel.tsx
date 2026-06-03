"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials, type Testimonial } from "@/content/testimonials";
import { LinkedInIcon } from "@/components/icons/LinkedInIcon";
import { cn } from "@/lib/utils";

function TestimonialSlide({
  item,
  isActive,
}: {
  item: Testimonial;
  isActive: boolean;
}) {
  return (
    <figure
      className={cn(
        "col-start-1 row-start-1 w-full transition-opacity duration-300 motion-safe:ease-out",
        isActive ? "z-10 opacity-100" : "z-0 opacity-0 pointer-events-none",
      )}
      aria-hidden={!isActive}
    >
      <Quote
        size={32}
        strokeWidth={1.5}
        className="mb-6 text-[var(--color-accent)]/35"
        aria-hidden
      />
      <blockquote>
        <p className="text-h3 md:text-h2 md:leading-snug font-semibold text-[var(--color-text-primary)] max-w-3xl text-pretty">
          &ldquo;{item.headline}&rdquo;
        </p>
      </blockquote>
      <figcaption className="mt-10 flex items-start justify-between gap-4 border-t border-[var(--color-border)] pt-5">
        <div>
          <p className="text-body font-semibold text-[var(--color-text-primary)]">
            {item.author}
          </p>
          <p className="text-body-sm text-[var(--color-text-muted)]">{item.role}</p>
        </div>
        {item.linkedInUrl && (
          <Link
            href={item.linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-[var(--color-border)] bg-white text-[var(--color-text-secondary)] hover:border-[var(--color-accent)]/40 hover:text-[var(--color-accent)] transition-colors"
            aria-label={`View ${item.author} on LinkedIn`}
            tabIndex={isActive ? 0 : -1}
          >
            <LinkedInIcon size={18} />
          </Link>
        )}
      </figcaption>
    </figure>
  );
}

export function TestimonialsCarousel() {
  const [active, setActive] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const count = testimonials.length;

  const goTo = useCallback(
    (index: number) => {
      setActive((index + count) % count);
    },
    [count],
  );

  const goPrev = useCallback(() => goTo(active - 1), [active, goTo]);
  const goNext = useCallback(() => goTo(active + 1), [active, goTo]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goPrev, goNext]);

  const onTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const onTouchEnd = (event: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = (event.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
    if (Math.abs(delta) > 48) {
      if (delta < 0) goNext();
      else goPrev();
    }
    touchStartX.current = null;
  };

  return (
    <div className="relative">
      <div
        className="surface-card relative flex flex-col rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-muted)] p-8 md:p-10"
        role="region"
        aria-roledescription="carousel"
        aria-label="Colleague recommendations"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div aria-live="polite" className="grid flex-1">
          {testimonials.map((item, index) => (
            <TestimonialSlide key={item.id} item={item} isActive={active === index} />
          ))}
        </div>

        <div className="mt-8 flex shrink-0 items-center justify-between gap-4 border-t border-[var(--color-border)] pt-6">
          <div className="flex items-center gap-2">
            {testimonials.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => goTo(index)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  active === index
                    ? "w-6 bg-[var(--color-accent)]"
                    : "w-2 bg-[var(--color-border)] hover:bg-[var(--color-text-muted)]",
                )}
                aria-label={`Show recommendation from ${item.author}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={goPrev}
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-[var(--color-border)] bg-white text-[var(--color-text-secondary)] hover:border-[var(--color-accent)]/40 hover:text-[var(--color-accent)] transition-colors"
              aria-label="Previous recommendation"
            >
              <ChevronLeft size={20} strokeWidth={1.75} aria-hidden />
            </button>
            <button
              type="button"
              onClick={goNext}
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-[var(--color-border)] bg-white text-[var(--color-text-secondary)] hover:border-[var(--color-accent)]/40 hover:text-[var(--color-accent)] transition-colors"
              aria-label="Next recommendation"
            >
              <ChevronRight size={20} strokeWidth={1.75} aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
