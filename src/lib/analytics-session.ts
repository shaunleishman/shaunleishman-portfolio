/**
 * Shared analytics session id.
 * The root layout imports this file directly so it does not pull engagement helpers.
 */
const SESSION_KEY = "analytics_session";

export function getAnalyticsSessionId(): string {
  if (typeof window === "undefined") return "";
  let id = sessionStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(SESSION_KEY, id);
  }
  return id;
}
