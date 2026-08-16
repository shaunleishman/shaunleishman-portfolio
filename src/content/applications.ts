import { siteConfig } from "@/content/projects";

/**
 * Sectors you own. Add or rename here when you want new application categories.
 * Applications reference a sector by `id`.
 */
export const APPLICATION_SECTORS = [
  { id: "financial-services", label: "Financial services" },
  { id: "healthcare", label: "Healthcare" },
  { id: "energy", label: "Energy and sustainability" },
  { id: "saas", label: "SaaS and product" },
  { id: "government", label: "Government and public sector" },
  { id: "agency", label: "Agency and consultancy" },
] as const;

export type ApplicationSectorId = (typeof APPLICATION_SECTORS)[number]["id"];

/**
 * Application outcomes. Update these as you hear back,
 * and use `learningNote` to capture what to keep or change next time.
 */
export const APPLICATION_OUTCOMES = [
  { id: "in-progress", label: "In progress", tone: "neutral" },
  { id: "interviewing", label: "Interviewing", tone: "active" },
  { id: "offered", label: "Offered", tone: "success" },
  { id: "rejected", label: "Unsuccessful", tone: "danger" },
  { id: "withdrawn", label: "Withdrawn", tone: "muted" },
] as const;

export type ApplicationOutcomeId = (typeof APPLICATION_OUTCOMES)[number]["id"];

export type ApplicationCvMode = "shared" | "tailored";

export type ApplicationDocumentKind = "cv" | "cover-letter";

export type Application = {
  /** URL and PDF key, e.g. lloyds-ux-designer-ftc */
  slug: string;
  /** Employer or organisation */
  company: string;
  /** Job title on the advert */
  jobTitle: string;
  /** Sector category from APPLICATION_SECTORS */
  sectorId: ApplicationSectorId;
  /** Short line under the job title, e.g. location and contract */
  roleMeta: string;
  /** Where the application stands right now */
  outcomeId: ApplicationOutcomeId;
  /** Optional date the pack was written, ISO date */
  writtenOn?: string;
  /**
   * What you learned after the outcome. What worked, what to change,
   * or what you would do differently on the next application.
   */
  learningNote?: string;
  /** Tailored cover letter available to download */
  hasCoverLetter: boolean;
  /** Tailored (or shared) CV available to download */
  hasCv: boolean;
  /** How the CV is produced when hasCv is true */
  cvMode?: ApplicationCvMode;
  /** Cover letter body when hasCoverLetter is true */
  greeting?: string;
  paragraphs?: string[];
  closing?: string;
};

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

export function getApplicationSector(sectorId: ApplicationSectorId) {
  return APPLICATION_SECTORS.find((sector) => sector.id === sectorId);
}

export function getApplicationOutcome(outcomeId: ApplicationOutcomeId) {
  return APPLICATION_OUTCOMES.find((outcome) => outcome.id === outcomeId);
}

export function getApplicationBySlug(slug: string) {
  return applications.find((application) => application.slug === slug);
}

export function getApplicationsBySector(sectorId: ApplicationSectorId | "all") {
  if (sectorId === "all") return applications;
  return applications.filter((application) => application.sectorId === sectorId);
}

export function getAvailableDocuments(application: Application): ApplicationDocumentKind[] {
  const docs: ApplicationDocumentKind[] = [];
  if (application.hasCv) docs.push("cv");
  if (application.hasCoverLetter) docs.push("cover-letter");
  return docs;
}

export function getCoverLetterPdfFilename(application: Application, date = new Date()) {
  const month = date.toLocaleString("en-GB", { month: "long" });
  const year = date.getFullYear();
  const company = application.company.replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "");
  const role = application.jobTitle.replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "");
  return `Shaun-Leishman-${company}-${role}-Cover-Letter-${month}-${year}.pdf`;
}

export function getApplicationCvPdfFilename(application: Application, date = new Date()) {
  const month = date.toLocaleString("en-GB", { month: "long" });
  const year = date.getFullYear();
  const company = application.company.replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "");
  const role = application.jobTitle.replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "");
  return `Shaun-Leishman-${company}-${role}-CV-${month}-${year}.pdf`;
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
