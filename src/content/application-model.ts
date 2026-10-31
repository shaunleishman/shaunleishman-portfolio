/**
 * Client-safe application labels and the summary the admin list renders.
 *
 * Cover-letter bodies and contact details live in `@/content/applications`.
 * That module also imports the project catalog. Client components must import
 * this file instead, and take an `ApplicationSummary` from a Server Component.
 */

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

/** Fields the admin list, chips, and download button actually render. */
export type ApplicationSummary = {
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
};

export type Application = ApplicationSummary & {
  /** Optional date the pack was written, ISO date */
  writtenOn?: string;
  /** Cover letter body when hasCoverLetter is true */
  greeting?: string;
  paragraphs?: string[];
  closing?: string;
};

export function getApplicationSector(sectorId: ApplicationSectorId) {
  return APPLICATION_SECTORS.find((sector) => sector.id === sectorId);
}

export function getApplicationOutcome(outcomeId: ApplicationOutcomeId) {
  return APPLICATION_OUTCOMES.find((outcome) => outcome.id === outcomeId);
}

export function getAvailableDocuments(application: {
  hasCv: boolean;
  hasCoverLetter: boolean;
}): ApplicationDocumentKind[] {
  const docs: ApplicationDocumentKind[] = [];
  if (application.hasCv) docs.push("cv");
  if (application.hasCoverLetter) docs.push("cover-letter");
  return docs;
}

/** Drops letter bodies so a client component never receives them as props. */
export function toApplicationSummary(application: Application): ApplicationSummary {
  return {
    slug: application.slug,
    company: application.company,
    jobTitle: application.jobTitle,
    sectorId: application.sectorId,
    roleMeta: application.roleMeta,
    outcomeId: application.outcomeId,
    learningNote: application.learningNote,
    hasCoverLetter: application.hasCoverLetter,
    hasCv: application.hasCv,
    cvMode: application.cvMode,
  };
}
