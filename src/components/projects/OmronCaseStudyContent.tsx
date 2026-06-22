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
  omronMyRole,
  omronProjectTimeline,
  omronReflectionItems,
  omronRoleItems,
  omronTeamTogetherItems,
  omronSectionNav,
  omronSectionTitle,
  omronTestingFindings,
} from "@/content/omron-case-study";
import { Button } from "@/components/ui/Button";
import { CaseStudyAtAGlance } from "@/components/projects/CaseStudyAtAGlance";
import { CaseStudySectionNav } from "@/components/projects/CaseStudySectionNav";
import { CaseStudySection } from "@/components/projects/CaseStudySection";
import { CaseStudySubsection } from "@/components/projects/CaseStudySubsection";
import {
  CaseStudyFlowTable,
  CaseStudyPointGrid,
  CaseStudyRoleSplit,
} from "@/components/projects/CaseStudyLayout";
import { CaseStudyReflection } from "@/components/projects/CaseStudyReflection";
import {
  CaseStudyIllustration,
  CaseStudySplitSection,
} from "@/components/projects/CaseStudyIllustration";
import { EnhancePrototypeEmbed } from "@/components/projects/EnhancePrototypeEmbed";
import { OmronActionCardLiveDemo } from "@/components/projects/OmronActionCardLiveDemo";
import { OmronAssignPatientLiveDemo } from "@/components/projects/OmronAssignPatientLiveDemo";
import { ZoomableScreenshot } from "@/components/projects/ZoomableScreenshot";
import { CaseStudyAccentProvider } from "@/components/projects/CaseStudyAccentProvider";
import { CaseStudyTimelineSection } from "@/components/projects/CaseStudyTimelineSection";
import { OmronPractitionerBoardsInteractiveDeferred } from "@/components/projects/OmronPractitionerBoardsInteractiveDeferred";
import { OmronWireframeSketchAnimationDeferred } from "@/components/projects/OmronWireframeSketchAnimationDeferred";

const actionCardFlow = [
  {
    stage: "1. Monitoring dashboard",
    action: "Review assigned patients and filter by alert or referral status.",
    response:
      "Traffic-light alerts and “assigned to me” filters help practitioners prioritise quickly.",
  },
  {
    stage: "2. Open action card",
    action: "Select a patient alert and review clinical context.",
    response:
      "Action cards surface the task, urgency, and history needed to decide next steps.",
  },
  {
    stage: "3. Assign or reassign",
    action: "Transfer a patient when escalation is needed.",
    response:
      "Mandatory reason fields and clearer ownership reduce silent handovers.",
  },
  {
    stage: "4. Complete action",
    action: "Confirm the titration step and return to the queue.",
    response:
      "Status tags and completion states show what still needs attention.",
  },
];

const coDesignHighlights = [
  {
    icon: Users,
    text: "We interviewed five user groups on how they recruit, monitor, and hand off patients.",
  },
  {
    icon: Stethoscope,
    text: "Persona boards fed straight into wireframes, not a shelved report.",
  },
  {
    icon: ClipboardCheck,
    text: "Our co-design sketches became wireframes and a clickable prototype for testing.",
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
        productGoal={omronAtAGlance.productGoal}
        team={omronAtAGlance.team}
        problem={omronAtAGlance.problem}
        contribution={omronAtAGlance.contribution}
        highlights={omronAtAGlance.highlights}
        methods={omronAtAGlance.methods}
        accentColor={project.accentColor}
      />

      <CaseStudySplitSection
        id="the-challenge"
        title={omronSectionTitle("the-challenge")}
        lead="Patient safety depended on getting medication plans to the right person."
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
        <p className="mt-4 text-body-sm text-[var(--color-text-muted)]">{project.problem}</p>
      </CaseStudySplitSection>

      <CaseStudySection
        id="my-role"
        title={omronSectionTitle("my-role")}
        lead={omronMyRole.lead}
      >
        <CaseStudyRoleSplit
          teamTogetherItems={omronTeamTogetherItems}
          roleItems={omronRoleItems}
          impact={omronMyRole.impact}
        />
      </CaseStudySection>

      <CaseStudyTimelineSection
        title={omronSectionTitle("timeline")}
        timeline={omronProjectTimeline}
      />

      <CaseStudySection
        id="co-design"
        title={omronSectionTitle("co-design")}
        lead="Grounded in practitioner research, the product team and I shaped the direction in workshops."
      >
        <div className="mb-10 not-prose">
          <div className="grid gap-6 md:grid-cols-2 md:items-stretch md:gap-8">
            <ZoomableScreenshot
              src="/projects/omron-patient-monitoring/co-design-workshop.png"
              alt="Co-design workshop with practitioner persona boards and sticky-note feedback"
              caption="Co-design session, persona boards and workshop feedback"
              previewFit="cover"
              previewFill
              width={799}
              height={1024}
              className="h-full"
            />

            <CaseStudyPointGrid items={coDesignHighlights} columns={1} />
          </div>
        </div>

        <div className="space-y-8 not-prose">
          <OmronPractitionerBoardsInteractiveDeferred />
        </div>
      </CaseStudySection>

      <CaseStudySection
        id="build-and-test"
        title={omronSectionTitle("build-and-test")}
        lead="From workshop sketches to prototype, then moderated usability testing."
      >
        <div className="mb-8 flex items-start gap-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-body-sm text-amber-950 not-prose sm:gap-5">
          <AlertCircle className="size-5 shrink-0 mt-0.5" aria-hidden />
          <p className="min-w-0 text-pretty md:whitespace-nowrap">
            Wireframes kept clinical roles and handover logic visible before polish.
          </p>
        </div>

        <CaseStudySubsection title="Wireframes" lead="Action cards, dashboard, and assignment logic.">
          <OmronWireframeSketchAnimationDeferred
            alt="Hand-drawn wireframes for action cards, dashboard, and patient assignment flows"
            caption="Early wireframes from workshops"
          />
        </CaseStudySubsection>

        <CaseStudySubsection
          spacingTop
          title="Interactive prototype"
          lead="Assign practitioners, review alerts, and open patient records."
        >
          <EnhancePrototypeEmbed
            title="OMRON patient monitoring prototype"
            caption="Prototype to assign patients and resolve action cards"
            compactHeader
          />
        </CaseStudySubsection>

        <CaseStudySubsection spacingTop title="Usability findings" lead={project.approachWhy[0]}>
          <CaseStudyPointGrid
            columns={2}
            className="mt-4"
            items={omronTestingFindings.map(({ title, text }, index) => ({
              title,
              text,
              icon: testingFindingIcons[index] ?? FileSearch,
            }))}
          />
        </CaseStudySubsection>
      </CaseStudySection>

      <CaseStudySection
        id="refined-solution"
        title={omronSectionTitle("refined-solution")}
        lead="From monitoring dashboard to completed action."
      >
        <CaseStudySubsection title="User flow">
          <CaseStudyFlowTable stages={actionCardFlow} />
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
        takeawaysLead="What clinical workflow design reinforced, and what I'd carry into the next regulated health product."
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
