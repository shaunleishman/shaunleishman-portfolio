/**
 * Saved PDF names for application packs.
 * Month names are the English list, which matches `en-GB` long months.
 * The client does not build this string. The download uses the response
 * `Content-Disposition`, so the browser and the route cannot disagree.
 */

const MONTHS = [
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

type NamedRole = {
  company: string;
  jobTitle: string;
};

function slugPart(value: string) {
  return value.replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function getCoverLetterPdfFilename(application: NamedRole, date = new Date()) {
  const month = MONTHS[date.getMonth()];
  const year = date.getFullYear();
  const company = slugPart(application.company);
  const role = slugPart(application.jobTitle);
  return `Shaun-Leishman-${company}-${role}-Cover-Letter-${month}-${year}.pdf`;
}

export function getApplicationCvPdfFilename(application: NamedRole, date = new Date()) {
  const month = MONTHS[date.getMonth()];
  const year = date.getFullYear();
  const company = slugPart(application.company);
  const role = slugPart(application.jobTitle);
  return `Shaun-Leishman-${company}-${role}-CV-${month}-${year}.pdf`;
}
