"use client";

import dynamic from "next/dynamic";
import { Button } from "@/components/ui/Button";
import { Stagger } from "@/components/ui/Stagger";
import { siteConfig } from "@/content/projects";
import { heroFocusIcons } from "@/lib/icon-maps";

const FigmaHeroAnimation = dynamic(
  () =>
    import("@/components/illustrations/FigmaHeroAnimation").then((mod) => ({
      default: mod.FigmaHeroAnimation,
    })),
  {
    ssr: false,
    loading: () => (
      <div
        className="min-h-[220px] w-full sm:min-h-[260px] lg:min-h-[320px]"
        aria-hidden
      />
    ),
  },
);

export function HomeHero() {
  return (
    <section
      aria-labelledby="hero-heading"
      data-analytics-section="hero"
      className="grid-bg grid-bg-animate relative text-white hero-section-padding overflow-hidden"
    >
      <div className="container-site relative z-10 flex flex-col gap-8 lg:gap-10">
        <div className="grid gap-8 md:grid-cols-2 md:gap-12 lg:gap-16 items-center">
          {/* Animation first on mobile so it's visible without scrolling */}
          <div className="relative order-1 md:order-2 w-full min-h-[220px] sm:min-h-[260px] lg:min-h-[320px]">
            <FigmaHeroAnimation className="drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)]" />
          </div>

          <Stagger
            immediate
            step={70}
            variant="up"
            className="order-2 md:order-1 text-center md:text-left max-w-xl md:max-w-2xl mx-auto md:mx-0"
          >
            <h1 id="hero-heading" className="text-hero-display font-semibold mb-6">
              {siteConfig.heroHeadlineLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>
            <p className="text-body-lg text-neutral-300 mb-10">
              {siteConfig.quote}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button href="/work" variant="primary">
                View my work
              </Button>
              <Button
                href="/contact"
                variant="secondary"
                className="!border-white/50 !text-white !bg-white/10 hover:!bg-white/20 hover:!border-white/70"
              >
                Get in touch
              </Button>
            </div>
          </Stagger>
        </div>

        <ul
          aria-label="Focus areas"
          className="flex w-full flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t border-white/10 pt-6 md:gap-x-8 lg:flex-nowrap lg:justify-between lg:gap-x-4"
        >
          {siteConfig.heroFocusAreas.map((area) => {
            const Icon = heroFocusIcons[area];

            return (
              <li key={area} className="inline-flex shrink-0 items-center gap-2 text-body-sm text-neutral-400">
                {Icon ? (
                  <Icon className="size-4 shrink-0 text-neutral-500" strokeWidth={1.75} aria-hidden />
                ) : null}
                <span>{area}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
