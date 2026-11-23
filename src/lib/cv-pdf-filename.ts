/**
 * Saved CV name. The month is en-GB so the file does not follow the
 * machine locale. Client code imports this file, not `@/content/cv`.
 */
export function getCvPdfFilename(date = new Date()) {
  const month = date.toLocaleString("en-GB", { month: "long" });
  const year = date.getFullYear();
  return `Shaun-Leishman-UX-Designer-CV-${month}-${year}.pdf`;
}
