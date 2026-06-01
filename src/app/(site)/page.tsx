import { Button } from "@/components/ui/Button";
import { HeroIllustration } from "@/components/illustrations/HeroIllustration";
import { IconBadge } from "@/components/ui/IconBadge";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { StatsMarquee } from "@/components/sections/StatsMarquee";
import { ValuePropsSection } from "@/components/sections/ValuePropsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTASection } from "@/components/sections/CTASection";
import { siteConfig } from "@/content/projects";
import { PenLine } from "lucide-react";

export default function HomePage() {
  return (
    <>
      <section
        aria-labelledby="hero-heading"
        data-analytics-section="hero"
        className="grid-bg text-white section-padding pb-16 lg:pb-24 overflow-hidden"
      >
        <div className="container-site grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="text-center lg:text-left max-w-xl mx-auto lg:mx-0">
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
              <Button href="/contact" variant="secondary" className="!border-white/50 !text-white !bg-white/10 hover:!bg-white/20 hover:!border-white/70">
                Get in touch
              </Button>
            </div>
          </div>
          <div className="relative hidden sm:block lg:pl-8">
            <HeroIllustration />
          </div>
        </div>
      </section>

      <FeaturedWork />
      <SkillsSection />
      <ProcessSection />
      <StatsMarquee />
      <ValuePropsSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
