/**
 * Public CV download name.
 * Lives outside `content/cv` so the contact (and CV page) download buttons
 * do not pull the CV body into the client bundle.
 */
export function getCvPdfFilename(date = new Date()) {
  const month = date.toLocaleString("en-GB", { month: "long" });
  const year = date.getFullYear();
  return `Shaun-Leishman-UX-Designer-CV-${month}-${year}.pdf`;
}
