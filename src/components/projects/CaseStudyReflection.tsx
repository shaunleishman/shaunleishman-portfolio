import { CaseStudyFeedback } from "@/components/projects/CaseStudyFeedback";
import { CaseStudySplitSection } from "@/components/projects/CaseStudyIllustration";
import { CaseStudySubsection } from "@/components/projects/CaseStudySubsection";

type CaseStudyReflectionProps = {
  limitationsLead: string;
  limitationsVisual: React.ReactNode;
  limitations: string[];
  takeaways: string[];
  feedbackPath: string;
};

export function CaseStudyReflection({
  limitationsLead,
  limitationsVisual,
  limitations,
  takeaways,
  feedbackPath,
}: CaseStudyReflectionProps) {
  return (
    <section id="reflection" aria-label="Reflection" className="scroll-mt-36">
      <CaseStudySplitSection
        title="Limitations"
        lead={limitationsLead}
        visual={limitationsVisual}
        className="mb-10"
      >
        <ul className="list-disc pl-5 space-y-2">
          {limitations.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </CaseStudySplitSection>

      <CaseStudySubsection title="Key takeaways">
        <ul className="space-y-4">
          {takeaways.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </CaseStudySubsection>

      <CaseStudyFeedback feedbackPath={feedbackPath} />
    </section>
  );
}
