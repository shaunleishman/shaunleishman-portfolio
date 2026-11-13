/** Download filename shared by the report-page link and the PDF response header. */
export function caseStudyDownloadFilename(slug: string, kind: "report" | "deck"): string {
  return kind === "deck" ? `${slug}-summary-deck.pdf` : `${slug}-heuristic-evaluation.pdf`;
}
