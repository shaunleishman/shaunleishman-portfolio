import { Button } from "@/components/ui/Button";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { StatsMarquee } from "@/components/sections/StatsMarquee";
import { ValuePropsSection } from "@/components/sections/ValuePropsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTASection } from "@/components/sections/CTASection";
import { siteConfig } from "@/content/projects";

export default function HomePage() {
  return (
    <>
      <section
        aria-labelledby="hero-heading"
        data-analytics-section="hero"
        className="grid-bg text-white section-padding pb-16 lg:pb-24"
      >
        <div className="container-site text-center max-w-4xl mx-auto">
          <p className="text-label text-neutral-400 mb-6">Hi, I&apos;m Shaun</p>
          <h1 id="hero-heading" className="text-display font-semibold mb-6">
            {siteConfig.tagline}
          </h1>
          <p className="text-body-lg text-neutral-300 mb-10 max-w-2xl mx-auto">
            {siteConfig.quote}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/work" variant="primary">
              View my work
            </Button>
            <Button href="/contact" variant="secondary" className="!border-white/30 !text-white hover:!border-white">
              Get in touch
            </Button>
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
