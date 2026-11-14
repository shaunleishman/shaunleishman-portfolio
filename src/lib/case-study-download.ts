export type CaseStudyDownloadKind = "report" | "deck";

/**
 * Filename for a case study PDF or summary deck.
 *
 * The route sends this in `Content-Disposition`, and the download anchor sets
 * the same string. A bare `download` attribute leaves the name empty, so the
 * browser saves the last path segment (`pdf` or `deck`) and drops the
 * extension. Current slugs are `[a-z0-9-]`; stripping quotes and line breaks
 * only guards the header.
 */
export function caseStudyDownloadFilename(slug: string, kind: CaseStudyDownloadKind): string {
  const safeSlug = slug.replace(/["\r\n]/g, "");
  return kind === "deck" ? `${safeSlug}-summary-deck.pdf` : `${safeSlug}-heuristic-evaluation.pdf`;
}

/** Headers for a successful case study PDF response. `Cache-Control` stays `private, no-cache`. */
export function caseStudyPdfHeaders(
  slug: string,
  kind: CaseStudyDownloadKind,
): Record<string, string> {
  return {
    "Content-Type": "application/pdf",
    "Content-Disposition": `attachment; filename="${caseStudyDownloadFilename(slug, kind)}"`,
    "Cache-Control": "private, no-cache",
  };
}
