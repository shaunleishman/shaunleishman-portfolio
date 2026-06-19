import type { CaseStudyProjectTimelineData } from "@/content/case-study-timeline";
import { CaseStudySection } from "@/components/projects/CaseStudySection";
import { CaseStudyProjectTimeline } from "@/components/projects/CaseStudyProjectTimeline";

type CaseStudyTimelineSectionProps = {
  title: string;
  timeline: CaseStudyProjectTimelineData;
};

export function CaseStudyTimelineSection({ title, timeline }: CaseStudyTimelineSectionProps) {
  return (
    <CaseStudySection id="timeline" title={title} lead={timeline.lead}>
      <p className="mb-8 max-w-3xl text-body-sm text-[var(--color-text-secondary)]">
        {timeline.intro}
      </p>
      <CaseStudyProjectTimeline
        totalWeeks={timeline.totalWeeks}
        phases={timeline.phases}
      />
    </CaseStudySection>
  );
}
