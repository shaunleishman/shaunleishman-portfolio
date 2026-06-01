"use client";

import { PenLine } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { HeroIllustration } from "@/components/illustrations/HeroIllustration";
import { IconBadge } from "@/components/ui/IconBadge";
import { Reveal } from "@/components/ui/Reveal";
import { Stagger } from "@/components/ui/Stagger";
import { siteConfig } from "@/content/projects";

export function HomeHero() {
  return (
    <section
      aria-labelledby="hero-heading"
      data-analytics-section="hero"
      className="grid-bg text-white section-padding pb-16 lg:pb-24 overflow-hidden"
    >
      <div className="container-site grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
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

        <Reveal immediate delay={280} variant="scale" className="relative hidden sm:block lg:pl-8">
          <HeroIllustration />
        </Reveal>
      </div>
    </section>
  );
}
