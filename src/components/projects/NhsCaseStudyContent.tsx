import { ClipboardList, Map, Users } from "lucide-react";
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
import { CaseStudyFeedback } from "@/components/projects/CaseStudyFeedback";
import {
  CaseStudyIllustration,
  CaseStudySplitSection,
} from "@/components/projects/CaseStudyIllustration";
import { ZoomableScreenshot } from "@/components/projects/ZoomableScreenshot";

const deliverableHighlights = [
  {
    icon: Users,
    text: "Five personas mapped along a certainty spectrum — from unsure callers to those who know what they need.",
  },
  {
    icon: Map,
    text: "Journey maps for distressed, connection-seeking, and breaking-point callers highlighted wait-time and routing pain.",
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
    <>
      <CaseStudySectionNav items={nhsSectionNav} />

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
        lead="Interviews and affinity mapping surfaced why callers behaved the way they did — not just what they did."
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
              <Icon className="size-5 shrink-0 mt-0.5 text-[#005eb8]" aria-hidden />
              {text}
            </li>
          ))}
        </ul>

        <div className="space-y-10 not-prose">
          <div>
            <h3 className="text-h4 font-semibold mb-2 text-[var(--color-text-primary)]">
              Caller certainty spectrum
            </h3>
            <p className="text-body text-[var(--color-text-muted)] mb-4">
              Five personas sit on a scale from very unsure to knowing what they need — helping the
              team design for different levels of confidence and urgency.
            </p>
            <ZoomableScreenshot
              src="/projects/nhs-111-waiting-times/persona-spectrum.png"
              alt="Spectrum from very unsure callers to those who know what they need, with five persona types"
              caption="Persona spectrum: connection seeker, distressed caller, confirmation seeker, breaking point, GP substitute"
            />
          </div>

          <div>
            <h3 className="text-h4 font-semibold mb-2 text-[var(--color-text-primary)]">
              Persona boards
            </h3>
            <p className="text-body text-[var(--color-text-muted)] mb-4">
              Detailed persona one-pagers combined motivations, frustrations, traits, and call patterns.
            </p>
            <div className="grid gap-6">
              <ZoomableScreenshot
                src="/projects/nhs-111-waiting-times/persona-confirmation-seeker.png"
                alt="Confirmation seeker persona board for NHS 111"
                caption="Confirmation seeker — wants reassurance that everything is fine"
              />
              <ZoomableScreenshot
                src="/projects/nhs-111-waiting-times/persona-distressed-caller.png"
                alt="Distressed caller persona board for NHS 111"
                caption="Distressed caller — acute need with high anxiety during triage"
              />
              <ZoomableScreenshot
                src="/projects/nhs-111-waiting-times/persona-connection-seeker.png"
                alt="Connection seeker persona board for NHS 111"
                caption="Connection seeker — calls for reassurance and to be heard"
              />
            </div>
          </div>

          <div>
            <h3 className="text-h4 font-semibold mb-2 text-[var(--color-text-primary)]">
              Journey maps
            </h3>
            <p className="text-body text-[var(--color-text-muted)] mb-4">
              End-to-end journeys from first hearing about 111 through to after the call — with
              frustrations, quotes, and emotional peaks highlighted.
            </p>
            <div className="grid gap-6">
              <ZoomableScreenshot
                src="/projects/nhs-111-waiting-times/journey-distressed-caller.png"
                alt="Distressed caller journey map for NHS 111"
                caption="Distressed caller journey"
              />
              <ZoomableScreenshot
                src="/projects/nhs-111-waiting-times/journey-connection-seeker.png"
                alt="Connection seeker journey map for NHS 111"
                caption="Connection seeker journey"
              />
              <ZoomableScreenshot
                src="/projects/nhs-111-waiting-times/journey-breaking-point.png"
                alt="Breaking point caller journey map for NHS 111"
                caption="Breaking point caller journey"
              />
            </div>
          </div>
        </div>
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

        <div className="space-y-10 not-prose">
          <ZoomableScreenshot
            src="/projects/nhs-111-waiting-times/survey-respondents.png"
            alt="Chart showing who filled out the follow-up survey"
            caption="Survey respondents — who took part in the quantitative follow-up"
          />
          <ZoomableScreenshot
            src="/projects/nhs-111-waiting-times/trying-other-resources.png"
            alt="Chart of callers who tried other resources before NHS 111"
            caption="Trying other resources before calling 111"
          />
          <ZoomableScreenshot
            src="/projects/nhs-111-waiting-times/999-trying-resources.png"
            alt="Chart comparing 999 outcomes with trying other resources before the 111 call"
            caption="999 outcomes vs trying other resources first"
          />
        </div>
      </CaseStudySection>

      <CaseStudySection
        id="key-findings"
        title={nhsSectionTitle("key-findings")}
        lead="What the combined research told the NHS team about caller behaviour and service improvements."
      >
        <div className="space-y-6 mb-10 not-prose">
          {nhsFindingHighlights.map(({ title, text }) => (
            <div
              key={title}
              className="rounded-xl border border-[var(--color-border)] bg-neutral-50 px-5 py-4"
            >
              <h3 className="text-body font-semibold text-[var(--color-text-primary)] mb-2">
                {title}
              </h3>
              <p className="text-body-sm text-[var(--color-text-secondary)]">{text}</p>
            </div>
          ))}
        </div>

        <div className="space-y-10 not-prose">
          <ZoomableScreenshot
            src="/projects/nhs-111-waiting-times/satisfaction-trying-resources.png"
            alt="Breakdown of satisfaction levels with the 111 service"
            caption="Overall satisfaction with 111"
          />
          <ZoomableScreenshot
            src="/projects/nhs-111-waiting-times/outcome-week-days.png"
            alt="Chart of call outcomes by day of week"
            caption="Call outcomes by weekday"
          />
          <ZoomableScreenshot
            src="/projects/nhs-111-waiting-times/urgency-time-outcome.png"
            alt="Chart relating urgency, time spent waiting, and call outcome"
            caption="Urgency, wait time, and outcome"
          />
        </div>
      </CaseStudySection>

      <section id="reflection" aria-label="Reflection" className="scroll-mt-36">
        <CaseStudySplitSection
          title="Limitations"
          lead="Working within recruitment and interview constraints, not an ideal lab study."
          visual={
            <CaseStudyIllustration
              src="/projects/nhs-111-waiting-times/journey-planning.png"
              alt="Illustration of planning and mapping the research journey"
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
            {nhsReflectionItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <CaseStudyFeedback feedbackPath="/work/nhs-111-waiting-times" />
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
