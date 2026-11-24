/**
 * Fields the applications gallery and download buttons need in the browser.
 * Letter bodies and the project catalog stay in `applications.ts` (server only).
 * Client code imports this module, not `@/content/applications`.
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
  /** Cover letter body when hasCoverLetter is true. Server only. Do not pass these into a client component. */
  greeting?: string;
  paragraphs?: string[];
  closing?: string;
};

/** Card and download fields. No greeting, paragraphs, or closing. */
export type ApplicationSummary = Pick<
  Application,
  | "slug"
  | "company"
  | "jobTitle"
  | "sectorId"
  | "roleMeta"
  | "outcomeId"
  | "learningNote"
  | "hasCoverLetter"
  | "hasCv"
  | "cvMode"
>;

export function getApplicationSector(sectorId: ApplicationSectorId) {
  return APPLICATION_SECTORS.find((sector) => sector.id === sectorId);
}

export function getApplicationOutcome(outcomeId: ApplicationOutcomeId) {
  return APPLICATION_OUTCOMES.find((outcome) => outcome.id === outcomeId);
}

export function getAvailableDocuments(
  application: Pick<Application, "hasCv" | "hasCoverLetter">,
): ApplicationDocumentKind[] {
  const docs: ApplicationDocumentKind[] = [];
  if (application.hasCv) docs.push("cv");
  if (application.hasCoverLetter) docs.push("cover-letter");
  return docs;
}
