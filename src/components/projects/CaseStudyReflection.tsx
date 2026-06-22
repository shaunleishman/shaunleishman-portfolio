import { CaseStudyFeedback } from "@/components/projects/CaseStudyFeedback";
import { CaseStudySplitSection } from "@/components/projects/CaseStudyIllustration";
import { CaseStudySection } from "@/components/projects/CaseStudySection";

type CaseStudyReflectionProps = {
  limitationsLead: string;
  limitationsVisual: React.ReactNode;
  limitations: string[];
  takeaways: string[];
  /** Closing lead for the takeaways section */
  takeawaysLead?: string;
  feedbackPath: string;
};

export function CaseStudyReflection({
  limitationsLead,
  limitationsVisual,
  limitations,
  takeaways,
  takeawaysLead = "What I'd take forward from this project, and the lessons that apply beyond this engagement.",
  feedbackPath,
}: CaseStudyReflectionProps) {
  return (
    <>
      <CaseStudySplitSection
        id="limitations"
        title="Limitations"
        lead={limitationsLead}
        visual={limitationsVisual}
      >
        <ul className="list-disc pl-5 space-y-2">
          {limitations.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </CaseStudySplitSection>

      <CaseStudySection
        id="key-takeaways"
        title="Key takeaways"
        lead={takeawaysLead}
      >
        <ul className="not-prose max-w-3xl space-y-6">
          {takeaways.map((item) => (
            <li
              key={item}
              className="border-l-2 border-[var(--case-study-accent)] pl-5 text-body leading-relaxed"
            >
              {item}
            </li>
          ))}
        </ul>
      </CaseStudySection>

      <CaseStudyFeedback feedbackPath={feedbackPath} />
    </>
  );
}
