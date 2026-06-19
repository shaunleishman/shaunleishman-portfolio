import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/content/projects";
import { AboutBackgroundSection } from "@/components/sections/AboutBackgroundSection";
import { AboutLifeWindows } from "@/components/sections/AboutLifeWindows";
import { AboutOriginTimeline } from "@/components/sections/AboutOriginTimeline";
import { AboutStatsSection } from "@/components/sections/AboutStatsSection";
import { CTASection } from "@/components/sections/CTASection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { PageHero } from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "About",
  description: `About ${siteConfig.name}, UX/UI designer focused on research-led product design.`,
};

export default function AboutPage() {
  return (
    <>
      <section className="grid-bg section-padding pb-12 text-white">
        <PageHero>
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex gap-2 text-body-sm text-neutral-400">
              <li>
                <Link href="/" className="transition-colors hover:text-white">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">→</li>
              <li aria-current="page" className="text-white">
                About
              </li>
            </ol>
          </nav>
          <h1 className="mb-4 text-h1 font-semibold">I&apos;m {siteConfig.name}</h1>
          <p className="text-body-lg text-neutral-300">
            A UX/UI designer who combines user research, co-design, and usability testing to build
            products people trust, especially in complex, high-stakes environments.
          </p>
        </PageHero>
      </section>

      <AboutBackgroundSection />

      <AboutLifeWindows />

      <AboutOriginTimeline />

      <AboutStatsSection />

      <TestimonialsSection />

      <CTASection
        dark={false}
        title="Let's connect"
        description="Whether you're hiring or just want to talk design, I'd love to hear from you."
      />
    </>
  );
}
