const blogDateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

/**
 * Blog dates are calendar days (`YYYY-MM-DD`), shared by the index and the article.
 * `new Date("YYYY-MM-DD")` is UTC midnight, so `toLocaleDateString` moves the day
 * west of UTC and the index can hydrate a different string than the server HTML.
 */
export function formatBlogDate(date: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(date.trim());
  if (!match) return date;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const stamp = new Date(Date.UTC(year, month - 1, day, 12));
  if (
    stamp.getUTCFullYear() !== year ||
    stamp.getUTCMonth() !== month - 1 ||
    stamp.getUTCDate() !== day
  ) {
    return date;
  }

  return blogDateFormat.format(stamp);
}
