import type { EvaluationScope } from "@/content/heuristic-evaluations/types";

export type CaseStudyDownloadKind = "report" | "deck";

const SAFE_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const INDIVIDUAL_HEURISTIC = /^H\d{2}\b/;

/**
 * Filename shared by the download control and the PDF response.
 * An empty `download` attribute lets some browsers save the file as `pdf` or
 * `deck` (the last path segment) instead of this name.
 */
export function caseStudyDownloadFilename(slug: string, kind: CaseStudyDownloadKind): string {
  const safe = SAFE_SLUG.test(slug) ? slug : "case-study";
  return kind === "deck" ? `${safe}-summary-deck.pdf` : `${safe}-heuristic-evaluation.pdf`;
}

/** Public, unlisted report. The deck's closing button opens this, not the site home. */
export function caseStudyPublicReportUrl(siteUrl: string, slug: string): string {
  const base = siteUrl.replace(/\/+$/, "");
  return `${base}/case-studies/${encodeURIComponent(slug)}`;
}

/**
 * One sentence for the deck's method slide.
 * A single descriptive entry such as "Nielsen Norman Group H01–H10" is the set,
 * not a count of one. Devices are included only when the limitations say so.
 * `timeSpent` may already end with a full stop; the sentence adds one only if needed.
 */
export function caseStudyDeckApproachLine(scope: EvaluationScope): string {
  const entries = scope.heuristicsUsed.map((entry) => entry.trim()).filter(Boolean);
  const listedOneByOne =
    entries.length > 0 && entries.every((entry) => INDIVIDUAL_HEURISTIC.test(entry));
  const heuristicText = listedOneByOne
    ? `${entries.length} usability ${entries.length === 1 ? "heuristic" : "heuristics"}`
    : entries.join(", ");

  const devices = statedReviewDevices(scope.limitations);
  const time = scope.timeSpent?.trim().replace(/\.+$/, "");
  const lead = [heuristicText, devices].filter(Boolean).join(" ");
  if (!lead) {
    return time ? `${time.charAt(0).toUpperCase()}${time.slice(1)}.` : "";
  }

  const withTime = time ? `${lead}, ${time.charAt(0).toLowerCase()}${time.slice(1)}` : lead;
  return withTime.endsWith(".") ? withTime : `${withTime}.`;
}

function statedReviewDevices(limitations: readonly string[]): string | null {
  const notes = limitations.join("\n");
  if (/desktop and mobile/i.test(notes)) return "on desktop and mobile";
  if (/mobile only/i.test(notes)) return "on mobile";
  if (/desktop only|desktop review only/i.test(notes)) return "on desktop";
  return null;
}
