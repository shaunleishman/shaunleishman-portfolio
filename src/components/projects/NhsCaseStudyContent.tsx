import { Building2, ClipboardList, Headset, Map, Route, Users } from "lucide-react";
import type { Project } from "@/content/projects";
import {
  nhsAtAGlance,
  nhsCaseStudyMeta,
  nhsFindingHighlights,
  nhsMyRole,
  nhsProjectTimeline,
  nhsQualitativeItems,
  nhsQuantitativeItems,
  nhsReflectionItems,
  nhsRoleItems,
  nhsTeamTogetherItems,
  nhsSectionNav,
  nhsSectionTitle,
} from "@/content/nhs-case-study";
import { Button } from "@/components/ui/Button";
import { CaseStudyAtAGlance } from "@/components/projects/CaseStudyAtAGlance";
import { CaseStudySectionNav } from "@/components/projects/CaseStudySectionNav";
import { CaseStudySection } from "@/components/projects/CaseStudySection";
import { CaseStudySubsection } from "@/components/projects/CaseStudySubsection";
import {
  CaseStudyCompactList,
  CaseStudyPanel,
  CaseStudyPointGrid,
  CaseStudyRoleSplit,
  CaseStudyTwoColumn,
} from "@/components/projects/CaseStudyLayout";
import { CaseStudyReflection } from "@/components/projects/CaseStudyReflection";
import {
  CaseStudyIllustration,
  CaseStudySplitSection,
} from "@/components/projects/CaseStudyIllustration";
import { CaseStudyAccentProvider } from "@/components/projects/CaseStudyAccentProvider";
import { CaseStudyTimelineSection } from "@/components/projects/CaseStudyTimelineSection";
import { NhsPersonasInteractiveDeferred } from "@/components/projects/NhsPersonasInteractiveDeferred";
import { NhsQuantitativeInteractiveDeferred } from "@/components/projects/NhsQuantitativeInteractiveDeferred";

const findingHighlightIcons = [Building2, Headset, Route] as const;

const deliverableHighlights = [
  {
    icon: Users,
    text: "5 interactive personas with traits, call patterns, and frustrations.",
  },
  {
    icon: Map,
    text: "5 journey maps with quotes and emotional peaks for each persona.",
  },
  {
    icon: ClipboardList,
    text: "Survey data backed up interview themes with measurable patterns.",
  },
];

type NhsCaseStudyContentProps = {
  project: Project;
};

export function NhsCaseStudyContent({ project }: NhsCaseStudyContentProps) {
  return (
    <CaseStudyAccentProvider accentColor={project.accentColor}>
      <CaseStudySectionNav items={nhsSectionNav} accentColor={project.accentColor} />

      <CaseStudyAtAGlance
        title={nhsSectionTitle("at-a-glance")}
        summary={nhsAtAGlance.summary}
        productGoal={nhsAtAGlance.productGoal}
        team={nhsAtAGlance.team}
        problem={nhsAtAGlance.problem}
        contribution={nhsAtAGlance.contribution}
        highlights={nhsAtAGlance.highlights}
        methods={nhsAtAGlance.methods}
        accentColor={project.accentColor}
      />

      <CaseStudySplitSection
        id="the-challenge"
        title={nhsSectionTitle("the-challenge")}
        lead="Callers needed reassurance and clearer routing."
        visual={
          <CaseStudyIllustration
            src="/projects/nhs-111-waiting-times/problem-illustration.png"
            alt="Illustration of a caller uncertain about which NHS service to choose"
          />
        }
      >
        <p className="text-h4 font-medium text-[var(--color-text-primary)] leading-snug">
          {nhsCaseStudyMeta.problemStatement}
        </p>
        <p className="mt-4 text-body-sm text-[var(--color-text-muted)]">{project.problem}</p>
      </CaseStudySplitSection>

      <CaseStudySection
        id="my-role"
        title={nhsSectionTitle("my-role")}
        lead={nhsMyRole.lead}
      >
        <CaseStudyRoleSplit
          teamTogetherItems={nhsTeamTogetherItems}
          roleItems={nhsRoleItems}
          impact={nhsMyRole.impact}
        />
      </CaseStudySection>

      <CaseStudyTimelineSection
        title={nhsSectionTitle("timeline")}
        timeline={nhsProjectTimeline}
      />

      <CaseStudySection
        id="research"
        title={nhsSectionTitle("research")}
        lead="Mixed methods: caller stories plus numbers the product team could act on."
      >
        <CaseStudySplitSection
          title="Approach"
          lead="Interviews, affinity mapping, and a follow-up survey within a four-week brief."
          visual={
            <CaseStudyIllustration
              src="/projects/nhs-111-waiting-times/research-approach.png"
              alt="Illustration representing structured research and learning"
            />
          }
          className="mb-10 md:mb-12"
        >
          <CaseStudyCompactList items={project.approach} />
          <p className="mt-4 text-body-sm text-[var(--color-text-muted)]">
            {project.approachWhy.join(" · ")}
          </p>
        </CaseStudySplitSection>

        <CaseStudyTwoColumn className="not-prose mb-10">
          <CaseStudyPanel title="Qualitative">
            <CaseStudyCompactList items={nhsQualitativeItems} />
          </CaseStudyPanel>
          <CaseStudyPanel title="Quantitative">
            <CaseStudyCompactList items={nhsQuantitativeItems} />
          </CaseStudyPanel>
        </CaseStudyTwoColumn>

        <CaseStudySubsection
          className="mb-0"
          title="Survey results"
          lead="Interactive views from the follow-up survey we ran with 111 callers in April 2023. Each tab is a different cut of the data."
        >
          <NhsQuantitativeInteractiveDeferred />
        </CaseStudySubsection>
      </CaseStudySection>

      <CaseStudySection
        id="key-findings"
        title={nhsSectionTitle("key-findings")}
        lead="What combined research showed about caller behaviour."
      >
        <CaseStudyPointGrid
          columns={2}
          items={nhsFindingHighlights.map(({ title, text }, index) => ({
            title,
            text,
            icon: findingHighlightIcons[index] ?? Building2,
          }))}
        />
      </CaseStudySection>

      <CaseStudySection
        id="deliverables"
        title={nhsSectionTitle("deliverables")}
        lead="Personas and journey maps the NHS team could reuse in product decisions."
      >
        <CaseStudyPointGrid items={deliverableHighlights} columns={1} className="mb-10" />
        <NhsPersonasInteractiveDeferred />
      </CaseStudySection>

      <CaseStudyReflection
        limitationsLead="Working within recruitment and interview constraints, not an ideal lab study."
        limitationsVisual={
          <CaseStudyIllustration
            src="/projects/nhs-111-waiting-times/journey-planning.png"
            alt="Illustration of planning and mapping the research journey"
          />
        }
        limitations={project.limitations}
        takeaways={nhsReflectionItems}
        takeawaysLead="What NHS 111 research reinforced, and how it shaped my public-service discovery approach."
        feedbackPath="/work/nhs-111-waiting-times"
      />

      <div className="mt-16 flex flex-col gap-4 border-t border-[var(--color-border)] pt-12 not-prose sm:flex-row">
        <Button href="/work">← All projects</Button>
        <Button href="/contact" variant="secondary">
          Get in touch
        </Button>
      </div>
    </CaseStudyAccentProvider>
  );
}
