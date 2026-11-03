/**
 * JSON GET for the metrics dashboard.
 * An aborted request must not clear or replace the data already on screen.
 */
export async function fetchMetricsJson<T>(
  url: string,
  signal: AbortSignal,
): Promise<{ aborted: true } | { aborted: false; data: T | null }> {
  try {
    const response = await fetch(url, { credentials: "include", signal });
    if (signal.aborted) return { aborted: true };
    if (!response.ok) return { aborted: false, data: null };
    const data = (await response.json()) as T;
    if (signal.aborted) return { aborted: true };
    return { aborted: false, data };
  } catch (error) {
    if (signal.aborted || (error instanceof Error && error.name === "AbortError")) {
      return { aborted: true };
    }
    return { aborted: false, data: null };
  }
}
