import Link from "next/link";
import { AlertCircle, ClipboardCheck, ExternalLink, Stethoscope, Users } from "lucide-react";
import type { Project } from "@/content/projects";
import {
  OMRON_PROTOTYPE_URL,
  omronAtAGlance,
  omronCaseStudyMeta,
  omronCoDesignItems,
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
import { CaseStudyFeedback } from "@/components/projects/CaseStudyFeedback";
import {
  CaseStudyIllustration,
  CaseStudySplitSection,
} from "@/components/projects/CaseStudyIllustration";
import { ZoomableScreenshot } from "@/components/projects/ZoomableScreenshot";

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
    text: "Four practitioner groups co-designed around how they recruit, monitor, and hand off hypertension patients.",
  },
  {
    icon: Stethoscope,
    text: "Persona boards captured role-specific tasks, interactions, and how each group uses OMRON VISO.",
  },
  {
    icon: ClipboardCheck,
    text: "Workshop outputs fed directly into wireframes — not a separate research report shelved after delivery.",
  },
];

type OmronCaseStudyContentProps = {
  project: Project;
};

export function OmronCaseStudyContent({ project }: OmronCaseStudyContentProps) {
  return (
    <>
      <CaseStudySectionNav items={omronSectionNav} />

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
        lead="Patient safety depended on getting medication plans to the right person — the existing flow made that too easy to get wrong."
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
        lead="Practitioners shaped the direction — workshops turned interview themes into sketches the whole team could react to."
      >
        <ul className="space-y-3 not-prose mb-8">
          {coDesignHighlights.map(({ icon: Icon, text }) => (
            <li key={text} className="flex gap-3 text-body text-[var(--color-text-secondary)]">
              <Icon className="size-5 shrink-0 mt-0.5 text-[#003da5]" aria-hidden />
              {text}
            </li>
          ))}
        </ul>

        <ul className="list-disc pl-5 space-y-2 mb-10">
          {omronCoDesignItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <div className="space-y-10 not-prose">
          <ZoomableScreenshot
            src="/projects/omron-patient-monitoring/co-design-workshop.png"
            alt="Co-design workshop with practitioner persona boards and sticky-note feedback"
            caption="Co-design session — persona boards and workshop feedback"
          />

          <div className="grid gap-6">
            <ZoomableScreenshot
              src="/projects/omron-patient-monitoring/general-practitioner-user-group.png"
              alt="General practitioner persona board for OMRON VISO"
              caption="General practitioner — triage, monitoring, and VISO usage"
            />
            <ZoomableScreenshot
              src="/projects/omron-patient-monitoring/nurse-practitioner-user-group.png"
              alt="Nurse practitioner persona board for OMRON VISO"
              caption="Nurse practitioner — remote monitoring and action cards"
            />
            <ZoomableScreenshot
              src="/projects/omron-patient-monitoring/clinical-pharmacists-user-group.png"
              alt="Clinical pharmacist persona board for OMRON VISO"
              caption="Clinical pharmacist — medication management workflows"
            />
            <ZoomableScreenshot
              src="/projects/omron-patient-monitoring/senior-nurse-user-group.png"
              alt="Senior nurse persona board for OMRON VISO"
              caption="Practice nurse — patient onboarding and monitoring setup"
            />
          </div>
        </div>
      </CaseStudySection>

      <CaseStudySection
        id="iteration"
        title={omronSectionTitle("iteration")}
        lead="From workshop sketches to a clickable prototype — iterating on action cards, dashboards, and assignment flows."
      >
        <div className="flex gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 mb-6 text-body-sm text-amber-950 not-prose">
          <AlertCircle className="size-5 shrink-0 mt-0.5" aria-hidden />
          <p>
            Wireframes explored permissions, subtasks, and dashboard counts before high-fidelity
            screens — keeping clinical roles and handover logic visible early.
          </p>
        </div>

        <ul className="list-disc pl-5 space-y-2 mb-8">
          {project.approach.slice(2).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <div className="space-y-10 not-prose mb-10">
          <ZoomableScreenshot
            src="/projects/omron-patient-monitoring/wireframe-sketches.png"
            alt="Hand-drawn wireframes for action cards, dashboard, and patient assignment flows"
            caption="Early wireframes — action cards, dashboard, and assignment logic"
          />
          <ZoomableScreenshot
            src="/projects/omron-patient-monitoring/whiteboard-dashboard.png"
            alt="Whiteboard sketch of monitoring dashboard with assigned patient counts"
            caption="Whiteboard — dashboard counts, traffic-light ordering, and assignment states"
          />
        </div>

        <Link
          href={OMRON_PROTOTYPE_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="OMRON Action card prototype (opens in a new tab)"
          className="group flex items-center justify-between gap-4 rounded-xl border border-[var(--color-border)] bg-neutral-50 px-5 py-4 hover:border-[#003da5] transition-colors not-prose"
        >
          <div>
            <p className="text-body font-semibold mb-1 group-hover:text-[#003da5]">
              OMRON Action card prototype
            </p>
            <p className="text-body-sm text-[var(--color-text-muted)]">
              View the interactive Figma prototype
            </p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-white px-3 py-1.5 text-body-sm font-medium text-[var(--color-text-secondary)] group-hover:border-[#003da5]/40 group-hover:text-[#003da5] transition-colors">
            <ExternalLink className="size-4" aria-hidden />
            New tab
          </span>
        </Link>
      </CaseStudySection>

      <CaseStudySplitSection
        id="usability-testing"
        title={omronSectionTitle("usability-testing")}
        lead="Moderated sessions tested critical flows — especially assigning patients between practitioners."
        visual={
          <CaseStudyIllustration
            src="/projects/omron-patient-monitoring/usability-research.png"
            alt="Illustration of reviewing research findings"
          />
        }
        visualFirst={false}
      >
        <p className="text-body text-[var(--color-text-secondary)] mb-4">
          {project.approachWhy.join(" · ")}
        </p>
        <div className="space-y-4 not-prose">
          {omronTestingFindings.map(({ title, text }) => (
            <div
              key={title}
              className="rounded-xl border border-[var(--color-border)] bg-neutral-50 px-4 py-3"
            >
              <p className="text-body-sm font-semibold text-[var(--color-text-primary)] mb-1">
                {title}
              </p>
              <p className="text-body-sm text-[var(--color-text-secondary)]">{text}</p>
            </div>
          ))}
        </div>
      </CaseStudySplitSection>

      <CaseStudySection
        id="refined-solution"
        title={omronSectionTitle("refined-solution")}
        lead="How practitioners move from the monitoring dashboard to a completed action. Screenshots show representative examples from the prototype."
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

        <div className="space-y-10 not-prose">
          <div>
            <h3 className="text-h4 font-semibold mb-2 text-[var(--color-text-primary)]">
              Monitoring dashboard
            </h3>
            <p className="text-body text-[var(--color-text-muted)] mb-4">
              Alert categories, referral filters, and a patient table help practitioners find who
              needs attention first.
            </p>
            <ZoomableScreenshot
              src="/projects/omron-patient-monitoring/monitoring-dashboard.png"
              alt="OMRON monitoring dashboard with patient alerts and filters"
              caption="Monitoring view — alert filters and assigned patient list"
            />
          </div>

          <div>
            <h3 className="text-h4 font-semibold mb-2 text-[var(--color-text-primary)]">
              Patient profile and tabs
            </h3>
            <p className="text-body text-[var(--color-text-muted)] mb-4">
              Redesigned tabs group clinical context, readings, and actions in one place.
            </p>
            <ZoomableScreenshot
              src="/projects/omron-patient-monitoring/patient-existing-tabs.png"
              alt="Patient profile with redesigned tab structure"
              caption="Patient profile — clinical context and monitoring tabs"
            />
          </div>

          <div>
            <h3 className="text-h4 font-semibold mb-2 text-[var(--color-text-primary)]">
              Assign patient with mandatory handover
            </h3>
            <p className="text-body text-[var(--color-text-muted)] mb-4">
              Reassigning a patient requires a reason — reducing silent transfers between
              practitioners.
            </p>
            <ZoomableScreenshot
              src="/projects/omron-patient-monitoring/group-122.png"
              alt="Assign patient flow with required reason for transfer"
              caption="Assign patient — reason for transfer required"
            />
          </div>

          <div>
            <h3 className="text-h4 font-semibold mb-2 text-[var(--color-text-primary)]">
              Action card detail
            </h3>
            <p className="text-body text-[var(--color-text-muted)] mb-4">
              Action cards surface the task, status, and next steps for each patient alert.
            </p>
            <ZoomableScreenshot
              src="/projects/omron-patient-monitoring/group-123.png"
              alt="Action card detail view in the OMRON prototype"
              caption="Action card — task detail and completion states"
            />
          </div>
        </div>
      </CaseStudySection>

      <section id="reflection" aria-label="Reflection" className="scroll-mt-36">
        <CaseStudySplitSection
          title="Limitations"
          lead="Working within a fixed scope and without full design-system integration."
          visual={
            <CaseStudyIllustration
              src="/projects/omron-patient-monitoring/limitations-illustration.png"
              alt="Illustration representing the weight of clinical workflow constraints"
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
            {omronReflectionItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <CaseStudyFeedback feedbackPath="/work/omron-patient-monitoring" />
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
