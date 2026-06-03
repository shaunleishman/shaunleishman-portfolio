import { HomeHero } from "@/components/sections/HomeHero";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { StatsMarquee } from "@/components/sections/StatsMarquee";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ValuePropsSection } from "@/components/sections/ValuePropsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTASection } from "@/components/sections/CTASection";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <FeaturedWork />
      <SkillsSection />
      <ProcessSection />
      <StatsMarquee />
      <TestimonialsSection />
      <ValuePropsSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
