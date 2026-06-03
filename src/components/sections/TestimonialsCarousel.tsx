"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
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
        "w-full shrink-0 transition-opacity duration-300 motion-safe:ease-out",
        isActive ? "opacity-100" : "opacity-0 pointer-events-none absolute inset-0",
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
        <p className="text-h3 md:text-[1.75rem] md:leading-snug font-semibold text-[var(--color-text-primary)] mb-8 max-w-3xl">
          {item.headline}
        </p>
        <ul className="grid gap-3 sm:grid-cols-2 mb-8">
          {item.highlights.map((highlight) => (
            <li
              key={highlight}
              className="flex gap-3 rounded-xl border border-[var(--color-border)] bg-white/70 px-4 py-3 text-body-sm text-[var(--color-text-secondary)] leading-snug"
            >
              <span
                className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--color-accent)]"
                aria-hidden
              />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      </blockquote>
      <figcaption className="flex items-start justify-between gap-4 border-t border-[var(--color-border)] pt-5">
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
  const baseId = useId();
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
        role="tablist"
        aria-label="Recommendation authors"
        className="mb-6 flex flex-wrap gap-2"
      >
        {testimonials.map((item, index) => {
          const isSelected = active === index;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`${baseId}-tab-${index}`}
              aria-selected={isSelected}
              aria-controls={`${baseId}-panel-${index}`}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => goTo(index)}
              className={cn(
                "rounded-full border px-4 py-2 text-body-sm font-medium transition-colors min-h-[44px]",
                isSelected
                  ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10 text-[var(--color-accent)]"
                  : "border-[var(--color-border)] bg-white text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]",
              )}
            >
              {item.author}
            </button>
          );
        })}
      </div>

      <div
        className="surface-card relative rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-muted)] p-8 md:p-10 min-h-[420px]"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          role="tabpanel"
          id={`${baseId}-panel-${active}`}
          aria-labelledby={`${baseId}-tab-${active}`}
          aria-live="polite"
          className="relative"
        >
          {testimonials.map((item, index) => (
            <TestimonialSlide key={item.id} item={item} isActive={active === index} />
          ))}
        </div>

        <div className="mt-8 flex items-center justify-between gap-4 border-t border-[var(--color-border)] pt-6">
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
