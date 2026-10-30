const CV_PDF_MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

/**
 * Download filename for the portfolio CV.
 * Lives outside `content/cv` so the download button does not pull the CV essay
 * or the project catalog into the browser bundle.
 * Month names match `en-GB` long months. `getMonth()` follows local time, same
 * as `toLocaleString` without a time zone.
 */
export function getCvPdfFilename(date = new Date()) {
  const month = CV_PDF_MONTHS[date.getMonth()];
  const year = date.getFullYear();
  return `Shaun-Leishman-UX-Designer-CV-${month}-${year}.pdf`;
}
