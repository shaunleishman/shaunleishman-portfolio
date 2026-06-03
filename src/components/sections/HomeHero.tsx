"use client";

import { PenLine } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FigmaHeroAnimation } from "@/components/illustrations/FigmaHeroAnimation";
import { IconBadge } from "@/components/ui/IconBadge";
import { Stagger } from "@/components/ui/Stagger";
import { siteConfig } from "@/content/projects";

export function HomeHero() {
  return (
    <section
      aria-labelledby="hero-heading"
      data-analytics-section="hero"
      className="grid-bg grid-bg-animate relative text-white section-padding pb-16 lg:pb-24 overflow-hidden"
    >
      <div className="container-site relative z-10 grid gap-8 md:grid-cols-2 md:gap-12 lg:gap-16 items-center">
        {/* Animation first on mobile so it's visible without scrolling */}
        <div className="relative order-1 md:order-2 w-full min-h-[220px] sm:min-h-[260px] lg:min-h-[320px] ring-1 ring-white/10 rounded-2xl bg-white/[0.02] p-2">
          <FigmaHeroAnimation className="drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)]" />
        </div>

        <Stagger
          immediate
          step={70}
          variant="up"
          className="order-2 md:order-1 text-center md:text-left max-w-xl mx-auto md:mx-0"
        >
          <p className="text-label text-neutral-400 mb-6 inline-flex items-center gap-2 justify-center md:justify-start">
            <IconBadge icon={PenLine} size="sm" variant="dark" />
            Hi, I&apos;m Shaun
          </p>
          <h1 id="hero-heading" className="text-display font-semibold mb-6">
            {siteConfig.tagline}
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
    </section>
  );
}
