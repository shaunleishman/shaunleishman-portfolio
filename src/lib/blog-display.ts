const BLOG_MONTHS = [
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
 * Blog dates are calendar days (`YYYY-MM-DD`), not timestamps.
 * `new Date("2026-06-01")` is UTC midnight, so formatting that instant in a
 * timezone west of UTC shows the previous day. The index renders in the
 * browser and the article renders on the server, so both build the label
 * from the date parts and stay on the published day.
 */
export function formatBlogDate(value: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(value);
  if (!match) return value;
  const day = Number(match[3]);
  const month = BLOG_MONTHS[Number(match[2]) - 1];
  if (!month || day < 1 || day > 31) return value;
  return `${day} ${month} ${match[1]}`;
}

/**
 * `reading-time` currently returns "N min read". Older versions used
 * "less than a minute read" for a short piece. The index and the article
 * share this so those two surfaces cannot drift apart.
 */
export function formatBlogReadingTime(text: string): string {
  return text.replace(/^less than a minute read$/i, "1 min read");
}
