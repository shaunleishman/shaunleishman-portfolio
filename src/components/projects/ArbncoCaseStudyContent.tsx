import Link from "next/link";
import { AlertCircle, Bookmark, CheckSquare, ExternalLink, Library } from "lucide-react";
import type { Project } from "@/content/projects";
import {
  arbncoAtAGlance,
  arbncoCaseStudyMeta,
  arbncoReflectionItems,
  arbncoRoleItems,
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

const FIGMA_PROTOTYPE_URL =
  "https://www.figma.com/make/MAun3hdKIKb6vTuWxbwDGN/Prototype-for-Half-Hourly-Project?t=YTFyfYijTGsXetcB-20&fullscreen=1";

const userFlowStages = [
  {
    stage: "1. Projects list",
    action: "Start from the user's project list to compare buildings and data coverage.",
    response: "Data resolution is shown in the table so users can compare projects quickly.",
  },
  {
    stage: "2. Check eligibility",
    action: "See which projects have enough data for generated hourly estimates.",
    response:
      "Eligible projects are clearly marked when they have enough mixed-frequency readings.",
  },
  {
    stage: "3. Activate the feature",
    action: "Turn generated data on from the list or inside project settings.",
    response:
      "Bulk actions support faster switching, with tooltips guiding users inside the project journey.",
  },
  {
    stage: "4. Confirm the change",
    action: "Understand that the project now uses generated hourly data.",
    response:
      "Colour, iconography, and labels make the active state clear and accessible.",
  },
];

const designReviewFeedback = [
  {
    icon: Bookmark,
    text: "Save functionality had to be clear because project information could only be saved manually, not automatically.",
  },
  {
    icon: Library,
    text: "Building details needed to be grouped clearly because they affected whether a project was eligible for generated data.",
  },
  {
    icon: CheckSquare,
    text: "Complete, partial, and incomplete status tags helped users understand what was missing and whether they could access generated data.",
  },
];

type ArbncoCaseStudyContentProps = {
  project: Project;
};

export function ArbncoCaseStudyContent({ project }: ArbncoCaseStudyContentProps) {
  return (
    <>
      <CaseStudySectionNav items={arbncoSectionNav} />

      <CaseStudyAtAGlance
        title={arbncoSectionTitle("at-a-glance")}
        summary={arbncoAtAGlance.summary}
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
          The platform takes lower-resolution energy readings and uses machine learning to produce
          more detailed hourly estimates when enough source data exists. The design job was to help
          users activate that feature, understand when it was running, and trust the results.
        </p>
      </CaseStudySplitSection>

      <CaseStudySection
        id="my-role"
        title={arbncoSectionTitle("my-role")}
        lead="Key responsibilities across research, design, and handoff."
      >
        <ul className="list-disc pl-5 space-y-2">
          {arbncoRoleItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
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
        lead="Explored ideas quickly, then refined through design review. AI helped explore options, not replace judgment."
      >
        <div className="flex gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 mb-6 text-body-sm text-amber-950 not-prose">
          <AlertCircle className="size-5 shrink-0 mt-0.5" aria-hidden />
          <p>Used AI tools to explore and motivate ideas, not to ship unreviewed output.</p>
        </div>
        <ul className="list-disc pl-5 space-y-2 mb-8">
          {project.approach.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <Link
          href={FIGMA_PROTOTYPE_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Prototype for Half Hourly Project (opens in a new tab)"
          className="group flex items-center justify-between gap-4 rounded-xl border border-[var(--color-border)] bg-neutral-50 px-5 py-4 hover:border-[#0d7377] transition-colors not-prose"
        >
          <div>
            <p className="text-body font-semibold mb-1 group-hover:text-[#0d7377]">
              Prototype for Half Hourly Project
            </p>
            <p className="text-body-sm text-[var(--color-text-muted)]">View prototype in Figma Make</p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-white px-3 py-1.5 text-body-sm font-medium text-[var(--color-text-secondary)] group-hover:border-[#0d7377]/40 group-hover:text-[#0d7377] transition-colors">
            <ExternalLink className="size-4" aria-hidden />
            New tab
          </span>
        </Link>
      </CaseStudySection>

      <CaseStudySection
        id="design-review"
        title={arbncoSectionTitle("design-review")}
        lead="Feedback from review sessions that shaped the refined solution."
      >
        <ul className="space-y-3 not-prose">
          {designReviewFeedback.map(({ icon: Icon, text }) => (
            <li key={text} className="flex gap-3 text-body text-[var(--color-text-secondary)]">
              <Icon className="size-5 shrink-0 mt-0.5 text-[#0d7377]" aria-hidden />
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
            title="Example: bulk enable across projects"
            lead="Checkbox selection and synthesise/revert actions for managing multiple projects at once."
          >
            <ZoomableScreenshot
              src="/projects/arbnco-synthetic-ai-data/flow-example-synthetic-data.png"
              alt="Example flow for turning on generated hourly data across multiple projects"
              caption="Example: bulk synthesise and revert flow across the projects list"
            />
          </CaseStudySubsection>

          <CaseStudySubsection
            title="Example: Edit Project settings"
            lead="Toggle, status badge, and checklist make eligibility and active state visible in context."
          >
            <ZoomableScreenshot
              src="/projects/arbnco-synthetic-ai-data/enabling-half-hourly-data.png"
              alt="Example Edit Project screen showing generated hourly data controls"
              caption="Example: enabling generated hourly data from project settings"
            />
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
        feedbackPath="/work/arbnco-synthetic-ai-data"
      />

      <div className="mt-12 pt-8 border-t border-[var(--color-border)] flex flex-col sm:flex-row gap-4 not-prose">
        <Button href="/work">← All projects</Button>
        <Button href="/contact" variant="secondary">
          Get in touch
        </Button>
      </div>
    </>
  );
}
