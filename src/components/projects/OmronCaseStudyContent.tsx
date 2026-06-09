import Link from "next/link";
import {
  AlertCircle,
  ArrowLeftRight,
  ClipboardCheck,
  FileSearch,
  Stethoscope,
  Users,
  Activity,
} from "lucide-react";
import type { Project } from "@/content/projects";
import {
  omronAtAGlance,
  omronCaseStudyMeta,
  omronReflectionItems,
  omronRoleItems,
  omronSectionNav,
  omronSectionTitle,
  omronTestingFindings,
} from "@/content/omron-case-study";
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
import { EnhancePrototypeEmbed } from "@/components/projects/EnhancePrototypeEmbed";
import { OmronActionCardLiveDemo } from "@/components/projects/OmronActionCardLiveDemo";
import { OmronAssignPatientLiveDemo } from "@/components/projects/OmronAssignPatientLiveDemo";
import { ZoomableScreenshot } from "@/components/projects/ZoomableScreenshot";
import { CaseStudyAccentProvider } from "@/components/projects/CaseStudyAccentProvider";
import { OmronPractitionerBoardsInteractiveDeferred } from "@/components/projects/OmronPractitionerBoardsInteractiveDeferred";
import { OmronWireframeSketchAnimationDeferred } from "@/components/projects/OmronWireframeSketchAnimationDeferred";

const actionCardFlow = [
  {
    stage: "1. Monitoring dashboard",
    action: "Review assigned patients and filter by alert category or referral status.",
    response:
      "Traffic-light alerts and “assigned to me” filters help practitioners prioritise out-of-limit readings quickly.",
  },
  {
    stage: "2. Open action card",
    action: "Select a patient alert and review clinical context before acting.",
    response:
      "Action cards surface the task, urgency, and patient history needed to decide next steps safely.",
  },
  {
    stage: "3. Assign or reassign",
    action: "Transfer a patient to another practitioner when escalation is needed.",
    response:
      "Mandatory reason fields and clearer ownership reduce the risk of silent handovers.",
  },
  {
    stage: "4. Complete action",
    action: "Confirm the titration or monitoring step and return to the queue.",
    response:
      "Status tags and completion states keep the team aligned on what still needs attention.",
  },
];

const coDesignHighlights = [
  {
    icon: Users,
    text: "Five user groups co-designed around how they recruit, monitor, and hand off hypertension patients.",
  },
  {
    icon: Stethoscope,
    text: "Persona boards captured role-specific tasks, interactions, and how each group uses OMRON VISO.",
  },
  {
    icon: ClipboardCheck,
    text: "Workshop outputs fed directly into wireframes, not a separate research report shelved after delivery.",
  },
];

const testingFindingIcons = [FileSearch, Users, Activity, ArrowLeftRight] as const;

type OmronCaseStudyContentProps = {
  project: Project;
};

export function OmronCaseStudyContent({ project }: OmronCaseStudyContentProps) {
  return (
    <CaseStudyAccentProvider accentColor={project.accentColor}>
      <CaseStudySectionNav items={omronSectionNav} accentColor={project.accentColor} />

      <CaseStudyAtAGlance
        title={omronSectionTitle("at-a-glance")}
        summary={omronAtAGlance.summary}
        problem={omronAtAGlance.problem}
        contribution={omronAtAGlance.contribution}
        highlights={omronAtAGlance.highlights}
        methods={omronAtAGlance.methods}
        accentColor={project.accentColor}
      />

      <CaseStudySplitSection
        id="the-challenge"
        title={omronSectionTitle("the-challenge")}
        lead="Patient safety depended on getting medication plans to the right person, the existing flow made that too easy to get wrong."
        visual={
          <CaseStudyIllustration
            src="/projects/omron-patient-monitoring/problem-illustration.png"
            alt="Illustration of a practitioner reviewing medication with concern"
          />
        }
      >
        <p className="text-h4 font-medium text-[var(--color-text-primary)] leading-snug">
          {omronCaseStudyMeta.problemStatement}
        </p>
        <p className="mt-4 text-body text-[var(--color-text-muted)]">{project.problem}</p>
      </CaseStudySplitSection>

      <CaseStudySection
        id="my-role"
        title={omronSectionTitle("my-role")}
        lead="Key responsibilities across workshops, prototyping, and usability testing."
      >
        <ul className="list-disc pl-5 space-y-2">
          {omronRoleItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </CaseStudySection>

      <CaseStudySection
        id="co-design"
        title={omronSectionTitle("co-design")}
        lead="Practitioners shaped the direction, workshops turned interview themes into sketches the whole team could react to."
      >
        <ul className="space-y-3 not-prose mb-10">
          {coDesignHighlights.map(({ icon: Icon, text }) => (
            <li key={text} className="flex gap-3 text-body text-[var(--color-text-secondary)]">
              <Icon className="size-5 shrink-0 mt-0.5 text-[var(--case-study-accent)]" aria-hidden />
              {text}
            </li>
          ))}
        </ul>

        <div className="space-y-8 not-prose">
          <ZoomableScreenshot
            src="/projects/omron-patient-monitoring/co-design-workshop.png"
            alt="Co-design workshop with practitioner persona boards and sticky-note feedback"
            caption="Co-design session, persona boards and workshop feedback"
            previewFit="cover"
            width={799}
            height={1024}
          />

          <OmronPractitionerBoardsInteractiveDeferred />
        </div>
      </CaseStudySection>

      <CaseStudySection
        id="iteration"
        title={omronSectionTitle("iteration")}
        lead="From workshop sketches to a clickable prototype, iterating on action cards, dashboards, and assignment flows."
      >
        <div className="flex gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 mb-8 text-body-sm text-amber-950 not-prose">
          <AlertCircle className="size-5 shrink-0 mt-0.5" aria-hidden />
          <p>
            Wireframes explored permissions, subtasks, and dashboard counts before high-fidelity
            screens, keeping clinical roles and handover logic visible early.
          </p>
        </div>

        <ul className="list-disc pl-5 space-y-2 mb-10">
          {project.approach.slice(2).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <div className="not-prose">
          <OmronWireframeSketchAnimationDeferred
            alt="Hand-drawn wireframes for action cards, dashboard, and patient assignment flows"
            caption="Early wireframes, action cards, dashboard, and assignment logic"
          />
        </div>

        <div className="not-prose">
          <CaseStudySubsection
            spacingTop
            className="mb-0"
            title="Interactive prototype"
            lead="Built from the workshop wireframes into a working prototype — filter patients, assign practitioners, review alerts, and open patient records without leaving this page."
          >
            <EnhancePrototypeEmbed
              title="OMRON patient monitoring prototype"
              caption="Interactive prototype — assign patients, review alerts, resolve action cards, and explore patient detail"
              compactHeader
            />
          </CaseStudySubsection>
        </div>
      </CaseStudySection>

      <CaseStudySection
        id="usability-testing"
        title={omronSectionTitle("usability-testing")}
        lead="Moderated sessions tested critical flows, especially assigning patients between practitioners."
      >
        <p className="text-body text-[var(--color-text-secondary)] mb-4">
          {project.approachWhy.join(" · ")}
        </p>
        <div className="space-y-5 not-prose">
          {omronTestingFindings.map(({ title, text }, index) => {
            const Icon = testingFindingIcons[index] ?? FileSearch;

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
                  <p className="text-body font-semibold text-[var(--color-text-primary)] mb-1.5">
                    {title}
                  </p>
                  <p className="text-body-sm text-[var(--color-text-secondary)]">{text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CaseStudySection>

      <CaseStudySection
        id="refined-solution"
        title={omronSectionTitle("refined-solution")}
        lead="How practitioners move from the monitoring dashboard to a completed action. Screenshots show representative examples from the prototype."
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
                {actionCardFlow.map((row) => (
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
            title="Assign patient with mandatory handover"
            lead="Reassigning a patient requires a reason, reducing silent transfers between practitioners."
          >
            <OmronAssignPatientLiveDemo caption="Assign patient, reason for transfer required" />
          </CaseStudySubsection>

          <CaseStudySubsection
            spacingTop
            className="mb-0"
            title="Action card detail"
            lead="Action cards surface the task, status, and next steps for each patient alert."
          >
            <OmronActionCardLiveDemo caption="Action card, task detail and completion states" />
          </CaseStudySubsection>
        </div>
      </CaseStudySection>

      <CaseStudyReflection
        limitationsLead="Working within a fixed scope and without full design-system integration."
        limitationsVisual={
          <CaseStudyIllustration
            src="/projects/omron-patient-monitoring/limitations-illustration.png"
            alt="Illustration representing the weight of clinical workflow constraints"
          />
        }
        limitations={project.limitations}
        takeaways={omronReflectionItems}
        takeawaysLead="What designing for clinical workflows reinforced, and what I'd carry into the next regulated health product."
        feedbackPath="/work/omron-patient-monitoring"
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
