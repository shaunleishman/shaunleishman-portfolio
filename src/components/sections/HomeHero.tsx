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
      className="grid-bg text-white section-padding pb-16 lg:pb-24 overflow-hidden"
    >
      <div className="container-site grid gap-10 md:grid-cols-2 md:gap-12 lg:gap-16 items-center">
        <Stagger immediate step={70} variant="up" className="text-center lg:text-left max-w-xl mx-auto lg:mx-0">
          <p className="text-label text-neutral-400 mb-6 inline-flex items-center gap-2 justify-center lg:justify-start">
            <IconBadge icon={PenLine} size="sm" variant="dark" />
            Hi, I&apos;m Shaun
          </p>
          <h1 id="hero-heading" className="text-display font-semibold mb-6">
            {siteConfig.tagline}
          </h1>
          <p className="text-body-lg text-neutral-300 mb-10">
            {siteConfig.quote}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
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

        <div className="relative w-full min-h-[240px] sm:min-h-[280px] lg:min-h-[320px]">
          <FigmaHeroAnimation className="drop-shadow-[0_24px_48px_rgba(0,0,0,0.35)]" />
        </div>
      </div>
    </section>
  );
}
