/**
 * Server-side application packs.
 *
 * Importing this module loads every cover-letter body and `siteConfig` from
 * the project catalog. Client components must not import it. Use
 * `@/content/application-model` and pass `ApplicationSummary` from a Server
 * Component. Sector labels and outcomes are edited in that model file.
 * Pack entries, including letter bodies, stay in this file.
 */
import { siteConfig } from "@/content/projects";
import {
  APPLICATION_OUTCOMES,
  APPLICATION_SECTORS,
  getApplicationOutcome,
  getApplicationSector,
  type Application,
  type ApplicationOutcomeId,
  type ApplicationSectorId,
} from "@/content/application-model";

export {
  APPLICATION_OUTCOMES,
  APPLICATION_SECTORS,
  getApplicationOutcome,
  getApplicationSector,
  getAvailableDocuments,
  toApplicationSummary,
  type Application,
  type ApplicationCvMode,
  type ApplicationDocumentKind,
  type ApplicationOutcomeId,
  type ApplicationSectorId,
  type ApplicationSummary,
} from "@/content/application-model";

export {
  getApplicationCvPdfFilename,
  getCoverLetterPdfFilename,
} from "@/lib/application-pdf-filename";

export const applicationContact = {
  email: siteConfig.email,
  phone: siteConfig.phone,
  linkedIn: siteConfig.linkedIn,
  portfolio: `https://www.${siteConfig.domain}`,
  portfolioLabel: `www.${siteConfig.domain}`,
};

export const coverLetterShared = {
  label: "Cover letter",
  headline: "UX/UI Designer · Edinburgh",
  signOff: siteConfig.name,
  contact: applicationContact,
};

export const applications: Application[] = [
  {
    slug: "lloyds-ux-designer-ftc",
    company: "Lloyds Banking Group",
    jobTitle: "UX Designer",
    sectorId: "financial-services",
    roleMeta: "12-month FTC · Edinburgh · Hybrid",
    outcomeId: "in-progress",
    writtenOn: "2026-07-21",
    hasCoverLetter: true,
    hasCv: true,
    cvMode: "shared",
    greeting: "Dear Hiring Manager,",
    paragraphs: [
      "I'm applying for the UX Designer 12-month role in Edinburgh. I'm based here already, and the brief matches the kind of work I do best. Complex products, real customer journeys, and enough stakeholder pressure that the design has to hold up in the room as well as on the screen.",
      "For the last two years I was a Product Designer at Arbnco on a decarbonisation platform for commercial buildings. A lot of it was dense, technical stuff. Energy data, carbon reporting, consent. People only acted once they could trust what they were looking at. I owned the interaction design end to end, and I worked inside a shared design system with engineering so we were not inventing a new pattern every sprint. We got Figma and the live components matching properly in under six months.",
      "Before that I was a UX Consultant at User Vision. Research was a big part of the job. Interviews, usability tests, workshops, then turning what we heard into journey changes and prototypes developers could build. One navigation change stuck with me. The flow was getting in people's way, we simplified it, and task success went up by about 40%. I'm used to presenting that kind of work to stakeholders, taking the challenge, and changing the design when the evidence says so.",
      "Earlier on I designed digital campaign work for financial services clients at The&Partnership, including RBS, NatWest, and Ulster Bank. Regulated brand rules and business audiences are not new to me. Accessibility sits in the same place for me as clarity. If someone of a different age, background, or confidence level cannot use it, the journey is not finished.",
      "I prototype mainly in Figma. I'm comfortable working with dedicated research teams, and I'm happy to push back when a requirement would make things harder for the customer, as long as I can show why.",
      "I'd welcome a conversation about the role. My CV and portfolio are at www.shaunleishmanportfolio.com.",
    ],
    closing: "Yours sincerely,",
  },
  {
    slug: "waracle-product-designer-ftc",
    company: "Waracle",
    jobTitle: "Product Designer",
    sectorId: "agency",
    roleMeta: "Fixed-term · Glasgow or Dundee · Hybrid",
    outcomeId: "in-progress",
    writtenOn: "2026-08-06",
    hasCoverLetter: true,
    hasCv: true,
    cvMode: "shared",
    greeting: "Dear Hiring Manager,",
    paragraphs: [
      "I'm applying for the Product Designer role at Waracle. I'm based in Edinburgh, and the hybrid Glasgow or Dundee setup works for me. What drew me in is the blend of consultancy pace and feature-level ownership. Mapping happy paths, error states, and the awkward bits in between, then handing that to engineering in a form they can trust.",
      "For the last two years I was a Product Designer at Arbnco on a decarbonisation platform for commercial buildings. A lot of it was dense, technical stuff. Energy data, carbon reporting, consent. People only acted once they could trust what they were looking at. I owned interaction design for features end to end, and I worked inside a shared design system with engineering so we were not inventing a new pattern every sprint. We got Figma and the live components matching properly in under six months.",
      "Before that I was a UX Consultant at User Vision. Research and testing were a big part of the job. Interviews, usability tests, workshops, then turning what we heard into journey changes and prototypes developers could build. I write clear hypotheses and success criteria before a test, and I change the design when the evidence says so. One navigation change stuck with me. The flow was getting in people's way, we simplified it, and task success went up by about 40%.",
      "Inclusive design sits in the same place for me as clarity. I apply WCAG patterns as I go, not as a late checklist, and I care about language and testing that widen who can use the product. Responsive work and CMS-shaped templates are familiar from earlier agency projects, including regulated financial services campaigns at The&Partnership for RBS, NatWest, and Ulster Bank.",
      "I prototype mainly in Figma, and I'm comfortable documenting interaction expectations for delivery teams. I work well with developers, BAs, copywriters, and stakeholders, and I'm happy to push back when a requirement would make things harder for the user, as long as I can show why.",
      "I'd welcome a conversation about the role. My CV and portfolio are at www.shaunleishmanportfolio.com.",
    ],
    closing: "Yours sincerely,",
  },
  {
    slug: "olly-fs-ux-ui-product-designer",
    company: "Financial services client",
    jobTitle: "UX/UI & Product Designer",
    sectorId: "financial-services",
    roleMeta: "Via recruiter (Olly) · Confirm company and contract",
    outcomeId: "in-progress",
    writtenOn: "2026-08-16",
    hasCoverLetter: false,
    hasCv: true,
    cvMode: "tailored",
    learningNote:
      "Recruiter asked for hybrid UX/UI/Product positioning, Figma and design systems forward, Abrdn research detail, FS digital vs research distinction, and stakeholder presentation made explicit. Public site CV left unchanged.",
  },
];

export function getApplicationBySlug(slug: string) {
  return applications.find((application) => application.slug === slug);
}

export function getApplicationsBySector(sectorId: ApplicationSectorId | "all") {
  if (sectorId === "all") return applications;
  return applications.filter((application) => application.sectorId === sectorId);
}

/** @deprecated Use APPLICATION_SECTORS */
export const COVER_LETTER_SECTORS = APPLICATION_SECTORS;
/** @deprecated Use APPLICATION_OUTCOMES */
export const COVER_LETTER_OUTCOMES = APPLICATION_OUTCOMES;
/** @deprecated Use ApplicationSectorId */
export type CoverLetterSectorId = ApplicationSectorId;
/** @deprecated Use ApplicationOutcomeId */
export type CoverLetterOutcomeId = ApplicationOutcomeId;
/** @deprecated Use Application */
export type CoverLetter = Application;
/** @deprecated Use applications */
export const coverLetters = applications;
/** @deprecated Use applicationContact */
export const coverLetterContact = applicationContact;
/** @deprecated Use getApplicationSector */
export const getCoverLetterSector = getApplicationSector;
/** @deprecated Use getApplicationOutcome */
export const getCoverLetterOutcome = getApplicationOutcome;
/** @deprecated Use getApplicationBySlug */
export const getCoverLetterBySlug = getApplicationBySlug;
/** @deprecated Use getApplicationsBySector */
export const getCoverLettersBySector = getApplicationsBySector;
