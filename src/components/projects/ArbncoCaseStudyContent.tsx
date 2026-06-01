import Link from "next/link";
import { AlertCircle, Bookmark, CheckSquare, Library } from "lucide-react";
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
import { CaseStudyFeedback } from "@/components/projects/CaseStudyFeedback";
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
        accentClass={project.accentClass}
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
          className="group flex items-center justify-between gap-4 rounded-xl border border-[var(--color-border)] bg-neutral-50 px-5 py-4 hover:border-[#0d7377] transition-colors not-prose"
        >
          <div>
            <p className="text-body font-semibold mb-1 group-hover:text-[#0d7377]">
              Prototype for Half Hourly Project
            </p>
            <p className="text-body-sm text-[var(--color-text-muted)]">Open in Figma Make →</p>
          </div>
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
        <h3 className="text-h4 font-semibold mb-4 text-[var(--color-text-primary)]">User flow</h3>
        <div className="overflow-x-auto rounded-xl border border-[var(--color-border)] mb-10 not-prose">
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

        <div className="space-y-10 not-prose">
          <div>
            <h3 className="text-h4 font-semibold mb-2 text-[var(--color-text-primary)]">
              Example: bulk enable across projects
            </h3>
            <p className="text-body text-[var(--color-text-muted)] mb-4">
              Checkbox selection and synthesise/revert actions for managing multiple projects at once.
            </p>
            <ZoomableScreenshot
              src="/projects/arbnco-synthetic-ai-data/flow-example-synthetic-data.png"
              alt="Example flow for turning on generated hourly data across multiple projects"
              caption="Example: bulk synthesise and revert flow across the projects list"
            />
          </div>

          <div>
            <h3 className="text-h4 font-semibold mb-2 text-[var(--color-text-primary)]">
              Example: Edit Project settings
            </h3>
            <p className="text-body text-[var(--color-text-muted)] mb-4">
              Toggle, status badge, and checklist make eligibility and active state visible in
              context.
            </p>
            <ZoomableScreenshot
              src="/projects/arbnco-synthetic-ai-data/enabling-half-hourly-data.png"
              alt="Example Edit Project screen showing generated hourly data controls"
              caption="Example: enabling generated hourly data from project settings"
            />
          </div>
        </div>
      </CaseStudySection>

      <section id="reflection" aria-labelledby="reflection-heading" className="scroll-mt-36">
        <h2 id="reflection-heading" className="text-h3 font-semibold mb-2">
          {arbncoSectionTitle("reflection")}
        </h2>
        <p className="text-body text-[var(--color-text-muted)] mb-8 max-w-2xl">
          What this work reinforced about trust, complex systems, and shipping under constraint.
        </p>

        <CaseStudySplitSection
          title="Limitations"
          lead="Working within real product and engineering constraints, not a blank canvas."
          visual={
            <CaseStudyIllustration
              src="/projects/arbnco-synthetic-ai-data/limitations-illustration.png"
              alt="Illustration of pushing against project constraints and limitations"
            />
          }
          className="mb-10"
        >
          <ul className="list-disc pl-5 space-y-2">
            {project.limitations.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </CaseStudySplitSection>

        <div className="mb-10">
          <h3 className="text-h4 font-semibold mb-4 text-[var(--color-text-primary)]">Key takeaways</h3>
          <ul className="space-y-4">
            {arbncoReflectionItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <aside className="rounded-2xl border border-[#0d7377]/20 bg-[#0d7377]/5 p-6 md:p-8 not-prose mb-8">
          <h3 className="text-h4 font-semibold mb-3 text-[var(--color-text-primary)]">
            Complex products need clear interfaces
          </h3>
          <p className="text-body text-[var(--color-text-secondary)] mb-4">
            This project focused on trust in technical products: helping non-technical users
            understand machine-generated data, navigate eligibility rules, and make confident
            decisions without needing to know how the model works.
          </p>
          <Button href="/contact">Let&apos;s talk</Button>
        </aside>

        <CaseStudyFeedback projectSlug="arbnco-synthetic-ai-data" />
      </section>

      <div className="mt-12 pt-8 border-t border-[var(--color-border)] flex flex-col sm:flex-row gap-4 not-prose">
        <Button href="/work">← All projects</Button>
        <Button href="/contact" variant="secondary">
          Get in touch
        </Button>
      </div>
    </>
  );
}
