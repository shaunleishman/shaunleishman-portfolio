import { Building2, ClipboardList, Headset, Map, Route, Users } from "lucide-react";
import type { Project } from "@/content/projects";
import {
  nhsAtAGlance,
  nhsCaseStudyMeta,
  nhsFindingHighlights,
  nhsQualitativeItems,
  nhsQuantitativeItems,
  nhsReflectionItems,
  nhsRoleItems,
  nhsSectionNav,
  nhsSectionTitle,
} from "@/content/nhs-case-study";
import { Button } from "@/components/ui/Button";
import { CaseStudyAtAGlance } from "@/components/projects/CaseStudyAtAGlance";
import { CaseStudySectionNav } from "@/components/projects/CaseStudySectionNav";
import { CaseStudySection } from "@/components/projects/CaseStudySection";
import { CaseStudyReflection } from "@/components/projects/CaseStudyReflection";
import {
  CaseStudyIllustration,
  CaseStudySplitSection,
} from "@/components/projects/CaseStudyIllustration";
import { NhsPersonasInteractive } from "@/components/projects/NhsPersonasInteractive";
import { NhsQuantitativeInteractive } from "@/components/projects/NhsQuantitativeInteractive";
import { CaseStudyAccentProvider } from "@/components/projects/CaseStudyAccentProvider";

const findingHighlightIcons = [Building2, Headset, Route] as const;

const deliverableHighlights = [
  {
    icon: Users,
    text: "Five interactive personas, explore traits, call patterns, frustrations, and journey maps.",
  },
  {
    icon: Map,
    text: "Five matching journey maps, frustrations, quotes, and emotional peaks mapped end-to-end for each persona.",
  },
  {
    icon: ClipboardList,
    text: "Survey data triangulated interview themes with measurable patterns across urgency, timing, and outcomes.",
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
        problem={nhsAtAGlance.problem}
        contribution={nhsAtAGlance.contribution}
        highlights={nhsAtAGlance.highlights}
        methods={nhsAtAGlance.methods}
        accentColor={project.accentColor}
      />

      <CaseStudySplitSection
        id="the-challenge"
        title={nhsSectionTitle("the-challenge")}
        lead="Callers needed reassurance and clearer routing. The service needed evidence of where the journey broke down."
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
        <p className="mt-4 text-body text-[var(--color-text-muted)]">{project.problem}</p>
      </CaseStudySplitSection>

      <CaseStudySection
        id="my-role"
        title={nhsSectionTitle("my-role")}
        lead="Key responsibilities across recruitment, research, analysis, and delivery."
      >
        <ul className="list-disc pl-5 space-y-2">
          {nhsRoleItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </CaseStudySection>

      <CaseStudySplitSection
        id="research-approach"
        title={nhsSectionTitle("research-approach")}
        lead="Mixed methods to combine caller stories with measurable patterns the product team could act on."
        visual={
          <CaseStudyIllustration
            src="/projects/nhs-111-waiting-times/research-approach.png"
            alt="Illustration representing structured research and learning"
          />
        }
      >
        <ul className="list-disc pl-5 space-y-2 mb-4">
          {project.approach.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="text-body-sm text-[var(--color-text-muted)]">
          {project.approachWhy.join(" · ")}
        </p>
      </CaseStudySplitSection>

      <CaseStudySplitSection
        id="qualitative-research"
        title={nhsSectionTitle("qualitative-research")}
        lead="Interviews and affinity mapping surfaced why callers behaved the way they did, not just what they did."
        visual={
          <CaseStudyIllustration
            src="/projects/nhs-111-waiting-times/research-discovery.png"
            alt="Illustration of research discovery and investigation"
          />
        }
        visualFirst={false}
      >
        <ul className="list-disc pl-5 space-y-2">
          {nhsQualitativeItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </CaseStudySplitSection>

      <CaseStudySection
        id="personas-journeys"
        title={nhsSectionTitle("personas-journeys")}
        lead="Personas and journey maps turned interview themes into artefacts the NHS team could reuse in product decisions."
      >
        <ul className="space-y-3 not-prose mb-8">
          {deliverableHighlights.map(({ icon: Icon, text }) => (
            <li key={text} className="flex gap-3 text-body text-[var(--color-text-secondary)]">
              <Icon className="size-5 shrink-0 mt-0.5 text-[var(--case-study-accent)]" aria-hidden />
              {text}
            </li>
          ))}
        </ul>

        <NhsPersonasInteractive />
      </CaseStudySection>

      <CaseStudySection
        id="quantitative-research"
        title={nhsSectionTitle("quantitative-research")}
        lead="Survey data strengthened qualitative themes with patterns across timing, urgency, and outcomes."
      >
        <ul className="list-disc pl-5 space-y-2 mb-8">
          {nhsQuantitativeItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <NhsQuantitativeInteractive />
      </CaseStudySection>

      <CaseStudySection
        id="key-findings"
        title={nhsSectionTitle("key-findings")}
        lead="What the combined research told the NHS team about caller behaviour and service improvements."
      >
        <div className="space-y-4 mb-10 not-prose">
          {nhsFindingHighlights.map(({ title, text }, index) => {
            const Icon = findingHighlightIcons[index] ?? Building2;

            return (
              <div
                key={title}
                className="flex gap-4 rounded-xl border border-[var(--color-border)] bg-neutral-50 px-5 py-4"
              >
                <span
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--case-study-accent)] text-white shadow-sm"
                  aria-hidden
                >
                  <Icon size={20} strokeWidth={1.75} />
                </span>
                <div className="min-w-0">
                  <h3 className="text-body font-semibold text-[var(--color-text-primary)] mb-1.5">
                    {title}
                  </h3>
                  <p className="text-body-sm text-[var(--color-text-secondary)]">{text}</p>
                </div>
              </div>
            );
          })}
        </div>
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
        takeawaysLead="What mixed-methods research on NHS 111 reinforced, and how it shaped my approach to public-service discovery."
        feedbackPath="/work/nhs-111-waiting-times"
      />

      <div className="mt-12 pt-8 border-t border-[var(--color-border)] flex flex-col sm:flex-row gap-4 not-prose">
        <Button href="/work">← All projects</Button>
        <Button href="/contact" variant="secondary">
          Get in touch
        </Button>
      </div>
    </CaseStudyAccentProvider>
  );
}
