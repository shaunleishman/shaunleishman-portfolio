import type { HeuristicEvaluation } from "@/content/heuristic-evaluations/types";

const SHARE_DESCRIPTION_MAX = 160;

/**
 * Document and link-preview description for a case study report.
 * Cuts on a word boundary so share cards do not end mid-word.
 */
export function caseStudyShareDescription(
  evaluation: HeuristicEvaluation,
  max = SHARE_DESCRIPTION_MAX,
): string {
  const text = evaluation.executiveSummary.whatWasEvaluated.replace(/\s+/g, " ").trim();
  if (text.length <= max) return text;

  const window = text.slice(0, max + 1);
  const lastSpace = window.lastIndexOf(" ");
  const cutAt = lastSpace > 40 ? lastSpace : max;
  const cut = text.slice(0, cutAt).replace(/[\s.,;:–—-]+$/u, "");
  return `${cut}…`;
}

/** Browser tab title. The on-page heading stays the evaluation title. */
export function caseStudyDocumentTitle(evaluation: HeuristicEvaluation): string {
  return `${evaluation.title} · Case study`;
}

export type CaseStudyDownloadKind = "report" | "deck";

/**
 * Filename used both by the download link and by the PDF/deck response.
 * An empty `download` attribute makes browsers save the file as `pdf` or
 * `deck`, ignoring Content-Disposition. Keep these two in sync.
 */
export function caseStudyDownloadFilename(slug: string, kind: CaseStudyDownloadKind): string {
  return kind === "deck" ? `${slug}-summary-deck.pdf` : `${slug}-heuristic-evaluation.pdf`;
}

export function caseStudyDownloadHref(slug: string, kind: CaseStudyDownloadKind): string {
  const segment = kind === "deck" ? "deck" : "pdf";
  return `/api/case-studies/${slug}/${segment}`;
}
