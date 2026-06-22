import { AlertCircle, Bookmark, CheckSquare, Eye, Layers, Library, MessageCircle } from "lucide-react";
import type { Project } from "@/content/projects";
import {
  arbncoAtAGlance,
  arbncoCaseStudyMeta,
  arbncoInitialPrototypeUrl,
  arbncoInitialPrototypePreview,
  arbncoJourneyStages,
  arbncoMyRole,
  arbncoProjectTimeline,
  arbncoReflectionItems,
  arbncoRoleItems,
  arbncoTeamTogetherItems,
  arbncoSectionNav,
  arbncoSectionTitle,
} from "@/content/arbnco-case-study";
import { Button } from "@/components/ui/Button";
import { CaseStudyAtAGlance } from "@/components/projects/CaseStudyAtAGlance";
import { CaseStudySectionNav } from "@/components/projects/CaseStudySectionNav";
import { CaseStudySection } from "@/components/projects/CaseStudySection";
import { CaseStudySubsection } from "@/components/projects/CaseStudySubsection";
import {
  CaseStudyCompactList,
  CaseStudyPointGrid,
  CaseStudyRoleSplit,
} from "@/components/projects/CaseStudyLayout";
import { CaseStudyJourneyMap } from "@/components/projects/CaseStudyJourneyMap";
import { CaseStudyReflection } from "@/components/projects/CaseStudyReflection";
import {
  CaseStudyIllustration,
  CaseStudySplitSection,
} from "@/components/projects/CaseStudyIllustration";
import { ArbncoEditProjectLiveDemo } from "@/components/projects/ArbncoEditProjectLiveDemo";
import { ArbncoBulkSynthesiseLiveDemo } from "@/components/projects/ArbncoBulkSynthesiseLiveDemo";
import { HalfHourlyPrototypeEmbed } from "@/components/projects/HalfHourlyPrototypeEmbed";
import { FigmaPrototypeEmbed } from "@/components/projects/FigmaPrototypeEmbed";
import { CaseStudyAccentProvider } from "@/components/projects/CaseStudyAccentProvider";
import { CaseStudyTimelineSection } from "@/components/projects/CaseStudyTimelineSection";

const designPrincipleIcons = [Eye, Layers, MessageCircle] as const;

const designReviewFeedback = [
  {
    icon: Bookmark,
    text: "Save had to feel deliberate, so project info only saved when users clicked Save.",
  },
  {
    icon: Library,
    text: "We grouped building details by eligibility impact so users saw what blocked generated data.",
  },
  {
    icon: CheckSquare,
    text: "We added complete, partial, and incomplete status tags before users committed to generated data.",
  },
];

type ArbncoCaseStudyContentProps = {
  project: Project;
};

export function ArbncoCaseStudyContent({ project }: ArbncoCaseStudyContentProps) {
  return (
    <CaseStudyAccentProvider accentColor={project.accentColor}>
      <CaseStudySectionNav items={arbncoSectionNav} accentColor={project.accentColor} />

      <CaseStudyAtAGlance
        title={arbncoSectionTitle("at-a-glance")}
        summary={arbncoAtAGlance.summary}
        productGoal={arbncoAtAGlance.productGoal}
        team={arbncoAtAGlance.team}
        problem={arbncoAtAGlance.problem}
        contribution={arbncoAtAGlance.contribution}
        highlights={arbncoAtAGlance.highlights}
        methods={arbncoAtAGlance.methods}
        accentColor={project.accentColor}
      />

      <CaseStudySplitSection
        id="the-challenge"
        title={arbncoSectionTitle("the-challenge")}
        lead="The business needed finer data, and users needed clarity they could trust."
        visual={
          <CaseStudyIllustration
            src="/projects/arbnco-synthetic-ai-data/switching-to-synthetic-data.gif"
            alt="Animated toggle showing switching to generated hourly data on the platform"
            size="md"
            className="size-[200px] object-contain"
            animated
          />
        }
      >
        <p className="text-h4 font-medium text-[var(--color-text-primary)] leading-snug">
          {arbncoCaseStudyMeta.problemStatement}
        </p>
        <p className="mt-4 text-body-sm text-[var(--color-text-muted)]">
          Generated hourly data could fill those gaps, but only if people could tell when estimates
          were running and trust the numbers behind them.
        </p>
        <div className="mt-8">
          <p className="text-label uppercase tracking-wide text-[var(--color-text-muted)] mb-3">
            Design principles
          </p>
          <CaseStudyPointGrid
            items={project.keyFindings.map((text, index) => ({
              text,
              icon: designPrincipleIcons[index],
            }))}
            columns={1}
          />
        </div>
      </CaseStudySplitSection>

      <CaseStudySection
        id="my-role"
        title={arbncoSectionTitle("my-role")}
        lead={arbncoMyRole.lead}
      >
        <CaseStudyRoleSplit
          teamTogetherItems={arbncoTeamTogetherItems}
          roleItems={arbncoRoleItems}
          impact={arbncoMyRole.impact}
        />
      </CaseStudySection>

      <CaseStudyTimelineSection
        title={arbncoSectionTitle("timeline")}
        timeline={arbncoProjectTimeline}
      />

      <CaseStudySection
        id="design"
        title={arbncoSectionTitle("design")}
        lead="Quick exploration with the team, then refinement through review and prototype."
      >
        <div className="mb-10 flex flex-col gap-10 md:mb-12 md:gap-12 not-prose">
          <div>
            <p className="text-label uppercase tracking-wide text-[var(--color-text-muted)] mb-3">
              Approach
            </p>
            <CaseStudyCompactList items={project.approach} />
            <div className="mt-4 flex items-start gap-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-body-sm text-amber-950 sm:gap-5">
              <AlertCircle className="size-5 shrink-0 mt-0.5" aria-hidden />
              <p>AI tools helped explore ideas. Nothing shipped without review.</p>
            </div>
          </div>

          <CaseStudySubsection
            className="mb-0"
            title="Journey map"
            lead="Where synthetic data fit in the existing platform journey, agreed with the squad before anyone opened screens."
          >
            <CaseStudyJourneyMap stages={arbncoJourneyStages} />
          </CaseStudySubsection>

          <CaseStudySubsection
            className="mb-0"
            title="Initial prototype"
            lead="Figma Make exploration we walked through in design review, covering the project list, eligibility, and synthetic data flows."
          >
            <FigmaPrototypeEmbed
              url={arbncoInitialPrototypeUrl}
              title="Half-hourly project prototype"
              caption="Figma prototype to compare projects, check eligibility, and explore synthetic hourly data settings"
              previewSrc={arbncoInitialPrototypePreview.src}
              previewAlt={arbncoInitialPrototypePreview.alt}
              previewWidth={arbncoInitialPrototypePreview.width}
              previewHeight={arbncoInitialPrototypePreview.height}
              layout="inset"
              compactHeader
            />
          </CaseStudySubsection>

          <CaseStudySubsection
            className="mb-0"
            title="Design review insights"
            lead="What changed after PM and engineering pushed back on the first flows."
          >
            <CaseStudyPointGrid items={designReviewFeedback} columns={1} />
          </CaseStudySubsection>
        </div>

        <CaseStudySubsection
          spacingTop
          className="mb-0"
          title="Interactive prototype"
          lead="Built prototype for deeper exploration across the project list, building settings, and synthetic hourly data."
        >
          <HalfHourlyPrototypeEmbed
            caption="Interactive prototype to compare data resolution, enable synthetic hourly data, and explore project settings"
            compactHeader
          />
        </CaseStudySubsection>
      </CaseStudySection>

      <CaseStudySection
        id="refined-solution"
        title={arbncoSectionTitle("refined-solution")}
        lead="From project list to confirmed generated-data state."
      >
        <div className="not-prose">
          <CaseStudySubsection
            className="mb-0"
            title="Example of bulk enable across projects"
            lead="Checkbox selection and synthesise/revert actions for managing multiple projects at once."
          >
            <ArbncoBulkSynthesiseLiveDemo />
          </CaseStudySubsection>

          <CaseStudySubsection
            spacingTop
            className="mb-0"
            title="Example of Edit Project settings"
            lead="Toggle, status badge, and checklist make eligibility and active state visible in context."
          >
            <ArbncoEditProjectLiveDemo />
          </CaseStudySubsection>
        </div>
      </CaseStudySection>

      <CaseStudyReflection
        limitationsLead="Working within real product and engineering constraints, not a blank canvas."
        limitationsVisual={
          <CaseStudyIllustration
            src="/projects/arbnco-synthetic-ai-data/limitations-illustration.png"
            alt="Illustration of pushing against project constraints and limitations"
          />
        }
        limitations={project.limitations}
        takeaways={arbncoReflectionItems}
        takeawaysLead="What making complex data legible reinforced, and what I'd apply to the next technical product."
        feedbackPath="/work/arbnco-synthetic-ai-data"
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
