export type CaseStudyImageSection =
  | "overview"
  | "problem"
  | "approach"
  | "findings"
  | "limitations";

export type CaseStudyImage = {
  src: string;
  alt: string;
  caption?: string;
  featured?: boolean;
};

/** A visual block placed beside case study text to clarify a specific point */
export type CaseStudyVisualBlock = {
  section: CaseStudyImageSection;
  /** Insert after this bullet index (0-based). Omit to show after section intro text. */
  afterIndex?: number;
  /** For approach: show after the "Why this method?" list instead */
  afterApproachWhy?: boolean;
  heading?: string;
  supportText?: string;
  images: CaseStudyImage[];
};

export const projectVisuals: Record<string, CaseStudyVisualBlock[]> = {
  "omron-patient-monitoring": [
    {
      section: "problem",
      heading: "Medication titration risk",
      supportText:
        "The failed assessment centred on human error when assigning titration plans — getting the wrong medication plan to the wrong patient.",
      images: [
        {
          src: "/projects/omron-patient-monitoring/problem-illustration.png",
          alt: "Illustration of medication titration and prescription risk",
          featured: true,
        },
      ],
    },
    {
      section: "approach",
      afterIndex: 1,
      heading: "Co-design with four practitioner groups",
      supportText:
        "Workshops surfaced how GPs, nurses, pharmacists, and senior nurses each approach patient assignment differently — feeding directly into the prototype.",
      images: [
        {
          src: "/projects/omron-patient-monitoring/general-practitioner-user-group.png",
          alt: "Co-design notes from the general practitioner user group",
          caption: "General practitioner group",
        },
        {
          src: "/projects/omron-patient-monitoring/nurse-practitioner-user-group.png",
          alt: "Co-design notes from the nurse practitioner user group",
          caption: "Nurse practitioner group",
        },
        {
          src: "/projects/omron-patient-monitoring/clinical-pharmacists-user-group.png",
          alt: "Co-design notes from the clinical pharmacists user group",
          caption: "Clinical pharmacists group",
        },
        {
          src: "/projects/omron-patient-monitoring/senior-nurse-user-group.png",
          alt: "Co-design notes from the senior nurse user group",
          caption: "Senior nurse group",
        },
      ],
    },
    {
      section: "approach",
      afterIndex: 2,
      heading: "Prototype based on workshop sketches",
      supportText:
        "We redesigned patient tabs and the monitoring dashboard around the workflows practitioners described in co-design.",
      images: [
        {
          src: "/projects/omron-patient-monitoring/patient-existing-tabs.png",
          alt: "Patient profile showing redesigned tab structure",
          caption: "Patient profile tabs",
        },
        {
          src: "/projects/omron-patient-monitoring/monitoring-all-my-patients.png",
          alt: "Monitoring all patients dashboard view",
          caption: "Monitoring all my patients",
        },
        {
          src: "/projects/omron-patient-monitoring/monitoring-all-my-patients-2.png",
          alt: "Alternate monitoring all patients dashboard view",
          caption: "Patient list overview",
        },
      ],
    },
    {
      section: "approach",
      afterIndex: 3,
      heading: "Usability testing on the prototype",
      supportText:
        "Moderated sessions tested critical flows — including assigning patients between practitioners — to catch errors before handoff.",
      images: [
        {
          src: "/projects/omron-patient-monitoring/group-122.png",
          alt: "Prototype screen for assigning a patient to another practitioner with a required reason field",
          caption: "Assign patient flow — reason for transfer required",
          featured: true,
        },
        {
          src: "/projects/omron-patient-monitoring/group-123.png",
          alt: "Prototype patient monitoring screen tested during usability sessions",
          caption: "Patient monitoring view tested with practitioners",
        },
      ],
    },
    {
      section: "findings",
      afterIndex: 0,
      heading: "Medical records dependency",
      supportText:
        "Practitioners couldn't safely assign titration plans without access to full medical records in the platform.",
      images: [
        {
          src: "/projects/omron-patient-monitoring/patient-existing-tabs.png",
          alt: "Patient tabs showing where clinical record context was missing",
          caption: "Patient context gaps in the existing platform",
        },
      ],
    },
    {
      section: "findings",
      afterIndex: 1,
      heading: "Role-specific workflows",
      supportText:
        "Each practitioner group worked differently — a one-size assignment flow couldn't fit every role.",
      images: [
        {
          src: "/projects/omron-patient-monitoring/general-practitioner-user-group-alt.png",
          alt: "General practitioner co-design output highlighting role-specific needs",
          caption: "GP workflow differences",
        },
      ],
    },
    {
      section: "findings",
      afterIndex: 2,
      heading: "Stale data in monitoring views",
      supportText:
        "Dashboards didn't reflect live patient readings, reducing confidence when making titration decisions.",
      images: [
        {
          src: "/projects/omron-patient-monitoring/monitoring-all-my-patients-2.png",
          alt: "Monitoring dashboard showing data freshness issues",
          caption: "Monitoring view without real-time updates",
        },
      ],
    },
    {
      section: "findings",
      afterIndex: 3,
      heading: "Inflexible communication",
      supportText:
        "Transferring patients between practitioners needed clearer handover notes — we added a mandatory reason field to reduce error risk.",
      images: [
        {
          src: "/projects/omron-patient-monitoring/group-122.png",
          alt: "Assign patient modal requiring a reason for transfer",
          caption: "Required handover note when reassigning patients",
          featured: true,
        },
        {
          src: "/projects/omron-patient-monitoring/findings-illustration.png",
          alt: "Illustration summarising research findings from usability testing",
          caption: "Synthesised findings from testing",
        },
      ],
    },
  ],

  "nhs-111-waiting-times": [
    {
      section: "overview",
      heading: "Understanding caller behaviour",
      supportText:
        "Mixed-method research mapped how people use NHS 111 — and where reassurance, guidance, and faster routing were needed most.",
      images: [
        {
          src: "/projects/nhs-111-waiting-times/overview-illustration.png",
          alt: "Illustration representing NHS 111 service research",
          featured: true,
        },
      ],
    },
    {
      section: "problem",
      heading: "Callers unsure of the right support",
      supportText:
        "Many people reached 111 without knowing whether it was the right service — or what to expect once they were in the queue.",
      images: [
        {
          src: "/projects/nhs-111-waiting-times/problem-illustration.png",
          alt: "Illustration of callers uncertain about NHS 111 support options",
          featured: true,
        },
      ],
    },
    {
      section: "approach",
      afterIndex: 0,
      heading: "Interviews → personas & journey maps",
      supportText:
        "30-minute interviews with recent callers and handlers were synthesised into personas and journey maps for the product team.",
      images: [
        {
          src: "/projects/nhs-111-waiting-times/persona-journey-a4-1.png",
          alt: "Persona and journey map deliverable page one",
          caption: "Personas & journey mapping",
        },
        {
          src: "/projects/nhs-111-waiting-times/persona-journey-a4-2.png",
          alt: "Persona and journey map deliverable page two",
          caption: "Journey map detail",
        },
      ],
    },
    {
      section: "approach",
      afterIndex: 1,
      heading: "Survey to triangulate qualitative data",
      supportText:
        "A follow-up survey quantified patterns from interviews — giving the NHS team measurable evidence alongside the stories.",
      images: [
        {
          src: "/projects/nhs-111-waiting-times/survey-respondents.png",
          alt: "Chart showing survey respondent demographics",
          caption: "Who responded to the survey",
          featured: true,
        },
      ],
    },
    {
      section: "findings",
      afterIndex: 0,
      heading: "People try other services first",
      supportText:
        "Many callers — especially senior citizens — waited for their GP before turning to 111, often when symptoms had already worsened.",
      images: [
        {
          src: "/projects/nhs-111-waiting-times/trying-other-resources.png",
          alt: "Chart of callers who tried other resources before NHS 111",
          caption: "Trying other resources before calling",
        },
        {
          src: "/projects/nhs-111-waiting-times/trying-other-resources-2.png",
          alt: "Additional breakdown of alternative resources used before NHS 111",
          caption: "Alternative resources used first",
        },
        {
          src: "/projects/nhs-111-waiting-times/999-trying-resources.png",
          alt: "Chart comparing 999 calls with trying other resources",
          caption: "999 calls vs other resources tried",
        },
      ],
    },
    {
      section: "findings",
      afterIndex: 1,
      heading: "Helpful staff, frustrating waits",
      supportText:
        "Callers rated staff positively, but long waits, repeating information, and scripted responses eroded trust during the triage journey.",
      images: [
        {
          src: "/projects/nhs-111-waiting-times/satisfaction-trying-resources.png",
          alt: "Breakdown of satisfaction levels with the 111 service",
          caption: "Overall satisfaction with 111",
          featured: true,
        },
        {
          src: "/projects/nhs-111-waiting-times/satisfaction-trying-resources-2.png",
          alt: "Satisfaction levels cross-referenced with trying other resources",
          caption: "Satisfaction vs resources tried",
        },
        {
          src: "/projects/nhs-111-waiting-times/outcome-week-days.png",
          alt: "Chart of call outcomes by day of week",
          caption: "Outcomes by weekday",
        },
      ],
    },
    {
      section: "findings",
      afterIndex: 2,
      heading: "Clearer routing and faster help",
      supportText:
        "Urgency, timing, and outcome data showed where clearer updates and quicker access to the right pathway would reduce pressure on A&E.",
      images: [
        {
          src: "/projects/nhs-111-waiting-times/urgency-time-outcome.png",
          alt: "Chart relating urgency, time spent waiting, and call outcome",
          caption: "Urgency, wait time, and outcome",
          featured: true,
        },
        {
          src: "/projects/nhs-111-waiting-times/outcome-trying-resources-weekend.png",
          alt: "Chart of outcomes, resources tried, and weekend calling patterns",
          caption: "Outcomes, resources, and weekends",
        },
      ],
    },
  ],

};

export function getProjectVisuals(slug: string): CaseStudyVisualBlock[] {
  return projectVisuals[slug] ?? [];
}

export function getVisualBlocksForSection(
  slug: string,
  section: CaseStudyImageSection,
): CaseStudyVisualBlock[] {
  return getProjectVisuals(slug).filter((block) => block.section === section);
}

export function getIntroVisualBlocks(
  slug: string,
  section: CaseStudyImageSection,
): CaseStudyVisualBlock[] {
  return getVisualBlocksForSection(slug, section).filter(
    (block) => block.afterIndex === undefined && !block.afterApproachWhy,
  );
}

export function getVisualBlocksAfterIndex(
  slug: string,
  section: CaseStudyImageSection,
  index: number,
): CaseStudyVisualBlock[] {
  return getVisualBlocksForSection(slug, section).filter(
    (block) => block.afterIndex === index,
  );
}
