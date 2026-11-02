const SESSION_STORAGE_KEY = "analytics_session";

/** One id per tab session, shared by pageviews, heatmaps, and feedback. */
export function getAnalyticsSessionId(): string {
  if (typeof window === "undefined") return "";
  let id = sessionStorage.getItem(SESSION_STORAGE_KEY);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(SESSION_STORAGE_KEY, id);
  }
  return id;
}
