import { HomeHero } from "@/components/sections/HomeHero";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { StatsMarquee } from "@/components/sections/StatsMarquee";
import { ValuePropsSection } from "@/components/sections/ValuePropsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { SiteFeedbackSection } from "@/components/sections/SiteFeedbackSection";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <FeaturedWork />
      <SkillsSection />
      <ProcessSection />
      <StatsMarquee />
      <ValuePropsSection />
      <FAQSection />
      <SiteFeedbackSection />
    </>
  );
}
