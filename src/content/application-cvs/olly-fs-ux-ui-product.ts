import { cvContent, type CvContent } from "@/content/cv";

/**
 * Tailored CV for the financial-services UX/UI & Product Designer submission
 * via recruiter Olly. Does not replace the public site CV in `cv.ts`.
 * Kept to one A4 page. Dense on purpose.
 */
export const ollyFsUxUiProductCv: CvContent = {
  headline: "UX/UI & Product Designer · Edinburgh",
  summary: [
    "I'm a hybrid UX/UI and Product Designer in Edinburgh. Over five years I've worked end to end, from research and discovery through high-fidelity UI and developer handoff, across financial services, healthcare, energy, government, and SaaS. Portfolio at www.shaunleishmanportfolio.com.",
    "Figma sits at the centre of that work. Component libraries, documentation, tokens, semantic and primitive variables, and advanced prototyping, usually paired with design systems and engineering handoff.",
  ],
  strengths: [
    "End-to-end UX, UI, and product design from discovery to handoff",
    "Advanced Figma, design systems, tokens, and component libraries",
    "Financial services across research-led UX and digital campaign craft",
    "Stakeholder presentation of research and design rationale",
  ],
  experience: [
    {
      role: "Product Designer",
      company: "Arbnco",
      period: "Mar 2024 to Jun 2026",
      paragraphs: [
        "Decarbonisation platform for commercial buildings. I owned product UX and UI end to end on energy, carbon, consent, and reporting flows, and stayed hands-on streamlining components and application UI for accessibility, usability, and clean visual design.",
        "I refreshed the Figma design system and aligned it with the developers' component library, including tokens, semantic and primitive variables, and documentation. Figma and live components matched properly in under six months. On synthetic hourly data I designed eligibility, activation, and how estimated hours sit next to real readings, then handed that to engineering ready to build.",
      ],
    },
    {
      role: "UX Consultant",
      company: "User Vision",
      period: "Mar 2022 to Mar 2024",
      paragraphs: [
        "Client work across healthcare, SaaS, government, and public services, plus a research-led financial-services strand for Aberdeen. Personas and behavioural archetypes, journey maps, interviews, usability testing, and a retirement calculator. I turned findings into recommendations and proposed designs, and presented research and rationale in client and board-style meetings for non-technical stakeholders.",
        "Elsewhere I ran research end to end into journeys and prototypes. One navigation change that was getting in people's way improved task success by about 40% after we simplified it.",
      ],
    },
    {
      role: "Digital Designer",
      company: "The&Partnership",
      period: "Oct 2019 to Sept 2021",
      paragraphs: [
        "Digital and visual design for NatWest, RBS, and Ulster Bank. Emails, landing pages, campaigns, and animation under tight brand rules, with templates and reusable assets across web, social, and advertising. Different from the Aberdeen research strand, same need for clarity with regulated audiences. On a Scottish Rugby campaign I led the creative side of the digital work, reaching over 11 million interactions.",
      ],
    },
  ],
  education: cvContent.education,
  skills: [
    {
      label: "UX and product",
      items:
        "Discovery, journeys, wireframing, high-fidelity UI, usability testing, interviews, workshops, accessibility-aware design, developer handoff.",
    },
    {
      label: "Figma and systems",
      items:
        "Figma, component libraries, documentation, design tokens, semantic and primitive variables, advanced prototyping, design systems with engineering.",
    },
    {
      label: "Creative and technical",
      items:
        "Emails, landing pages, campaigns, animation, Adobe suite, After Effects, basic HTML and CSS, AI-assisted prototyping.",
    },
  ],
  interests: cvContent.interests,
  contact: cvContent.contact,
};
