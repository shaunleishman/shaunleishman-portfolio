/**
 * Download names for application packs.
 *
 * Month names are the English list, which matches `en-GB` long months.
 * Do not switch this back to `toLocaleString`: a small ICU build can format
 * the same instant differently on the server and in the browser, so the
 * Content-Disposition name and the saved file would disagree.
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

function monthYear(date: Date) {
  return {
    month: MONTHS[date.getMonth()],
    year: date.getFullYear(),
  };
}

export function getCoverLetterPdfFilename(application: NamedRole, date = new Date()) {
  const { month, year } = monthYear(date);
  const company = slugPart(application.company);
  const role = slugPart(application.jobTitle);
  return `Shaun-Leishman-${company}-${role}-Cover-Letter-${month}-${year}.pdf`;
}

export function getApplicationCvPdfFilename(application: NamedRole, date = new Date()) {
  const { month, year } = monthYear(date);
  const company = slugPart(application.company);
  const role = slugPart(application.jobTitle);
  return `Shaun-Leishman-${company}-${role}-CV-${month}-${year}.pdf`;
}
