import { AlertCircle, Bookmark, CheckSquare, Library } from "lucide-react";
import type { Project } from "@/content/projects";
import {
  arbncoAtAGlance,
  arbncoCaseStudyMeta,
  arbncoMyRole,
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
import { CaseStudyReflection } from "@/components/projects/CaseStudyReflection";
import { CaseStudySubsection } from "@/components/projects/CaseStudySubsection";
import {
  CaseStudyIllustration,
  CaseStudySplitSection,
} from "@/components/projects/CaseStudyIllustration";
import { ZoomableScreenshot } from "@/components/projects/ZoomableScreenshot";
import { ArbncoEditProjectLiveDemo } from "@/components/projects/ArbncoEditProjectLiveDemo";
import { ArbncoBulkSynthesiseLiveDemo } from "@/components/projects/ArbncoBulkSynthesiseLiveDemo";
import { HalfHourlyPrototypeEmbed } from "@/components/projects/HalfHourlyPrototypeEmbed";
import { CaseStudyAccentProvider } from "@/components/projects/CaseStudyAccentProvider";

const userFlowStages = [
  {
    stage: "1. Projects list",
    action: "Start from the user's project list to compare buildings and data coverage.",
    response:
      "I showed data resolution in the table. Users compared projects before turning on generated data.",
  },
  {
    stage: "2. Check eligibility",
    action: "See which projects have enough data for generated hourly estimates.",
    response:
      "I added eligibility markers early. Users needed to know if activation was possible before opening settings.",
  },
  {
    stage: "3. Activate the feature",
    action: "Turn generated data on from the list or inside project settings.",
    response:
      "I added bulk actions for power users and kept tooltips for first-time users.",
  },
  {
    stage: "4. Confirm the change",
    action: "Understand that the project now uses generated hourly data.",
    response:
      "I used colour, icons, and plain labels for the active state. Generated data needed clear trust cues, not just a toggle.",
  },
];

const designReviewFeedback = [
  {
    icon: Bookmark,
    text: "Save had to feel deliberate. Project info only saved when users clicked save, so I made that action clear instead of implying auto-save.",
  },
  {
    icon: Library,
    text: "I grouped building details by eligibility impact because review feedback showed users missed which fields blocked generated data.",
  },
  {
    icon: CheckSquare,
    text: "I introduced complete, partial, and incomplete status tags so users could see what was missing before committing to generated hourly data.",
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
        lead="The business needed finer data. Users needed clarity. Generated estimates only work when people trust what they are seeing."
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
        <p className="mt-4 text-body text-[var(--color-text-muted)]">
          The platform could estimate those missing hours when enough readings were available. I
          designed flows so people could turn it on, see when estimates were running, and trust
          what they saw.
        </p>
      </CaseStudySplitSection>

      <CaseStudySection
        id="my-role"
        title={arbncoSectionTitle("my-role")}
        lead={arbncoMyRole.lead}
      >
        <CaseStudySubsection title="What we did together">
          <ul className="list-disc pl-5 space-y-2">
            {arbncoTeamTogetherItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </CaseStudySubsection>
        <CaseStudySubsection title="What I owned">
          <ul className="list-disc pl-5 space-y-2">
            {arbncoRoleItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </CaseStudySubsection>
        <p className="mt-6 text-body text-[var(--color-text-muted)]">{arbncoMyRole.impact}</p>
      </CaseStudySection>

      <CaseStudySplitSection
        id="considerations"
        title={arbncoSectionTitle("considerations")}
        lead="Trust, data accessibility, and plain language guided every screen."
        visual={
          <CaseStudyIllustration
            src="/projects/arbnco-synthetic-ai-data/considerations.png"
            alt="Illustration of building and refining a generated data feature"
          />
        }
      >
        <p className="text-body text-[var(--color-text-secondary)]">
          {project.keyFindings.join(" · ")}
        </p>
      </CaseStudySplitSection>

      <CaseStudySection
        id="iteration"
        title={arbncoSectionTitle("iteration")}
        lead="I explored ideas quickly with the team, then refined in design review. I showed rationale, not just screens."
      >
        <div className="flex gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 mb-6 text-body-sm text-amber-950 not-prose">
          <AlertCircle className="size-5 shrink-0 mt-0.5" aria-hidden />
          <p>Used AI tools to explore and motivate ideas, not to ship unreviewed output.</p>
        </div>
        <ul className="list-disc pl-5 space-y-2 mb-10">
          {project.approach.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <div className="not-prose">
          <CaseStudySubsection
            className="mb-0"
            title="Interactive prototype"
            lead="Explore the project list, open a building, enable synthetic hourly data, and review energy charts without leaving this page."
          >
            <HalfHourlyPrototypeEmbed
              caption="Interactive prototype: compare data resolution, enable synthetic hourly data, and explore project settings"
              compactHeader
            />
          </CaseStudySubsection>
        </div>
      </CaseStudySection>

      <CaseStudySection
        id="design-review"
        title={arbncoSectionTitle("design-review")}
        lead="Feedback from review sessions that shaped the refined solution."
      >
        <ul className="space-y-3 not-prose">
          {designReviewFeedback.map(({ icon: Icon, text }) => (
            <li key={text} className="flex gap-3 text-body text-[var(--color-text-secondary)]">
              <Icon className="size-5 shrink-0 mt-0.5 text-[var(--case-study-accent)]" aria-hidden />
              {text}
            </li>
          ))}
        </ul>
      </CaseStudySection>

      <CaseStudySection
        id="refined-solution"
        title={arbncoSectionTitle("refined-solution")}
        lead="How users move from their project list to a confirmed generated-data state. Screenshots show representative examples from the flow."
      >
        <CaseStudySubsection title="User flow">
          <div className="overflow-x-auto rounded-xl border border-[var(--color-border)] not-prose">
            <table className="w-full min-w-[640px] text-left text-body-sm">
              <thead className="bg-neutral-50 border-b border-[var(--color-border)]">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Stage
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    User action
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Design response
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)]">
                {userFlowStages.map((row) => (
                  <tr key={row.stage} className="align-top">
                    <td className="px-4 py-3 font-medium text-[var(--color-text-primary)] whitespace-nowrap">
                      {row.stage}
                    </td>
                    <td className="px-4 py-3">{row.action}</td>
                    <td className="px-4 py-3">{row.response}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CaseStudySubsection>

        <div className="not-prose">
          <CaseStudySubsection
            spacingTop
            className="mb-0"
            title="Example: bulk enable across projects"
            lead="Checkbox selection and synthesise/revert actions for managing multiple projects at once."
          >
            <ArbncoBulkSynthesiseLiveDemo />
          </CaseStudySubsection>

          <CaseStudySubsection
            spacingTop
            className="mb-0"
            title="Example: Edit Project settings"
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
        takeawaysLead="What making complex data legible reinforced, and what I'd apply to the next technical product surface."
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
