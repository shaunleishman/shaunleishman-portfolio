export function getAnalyticsSessionId(): string {
  if (typeof window === "undefined") return "";
  let id = sessionStorage.getItem("analytics_session");
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem("analytics_session", id);
  }
  return id;
}

import { isAnalyticsAllowed } from "@/lib/consent";

export async function trackAnalyticsEvent(
  type: "blog_like" | "blog_share",
  path: string,
  metadata?: Record<string, string | number>,
) {
  return trackBlogEngagement(type, path, metadata);
}

/** Explicit like/share actions — not gated on analytics consent. */
export async function trackBlogEngagement(
  type: "blog_like" | "blog_share",
  path: string,
  metadata?: Record<string, string | number>,
) {
  const sessionId = getAnalyticsSessionId();
  if (!sessionId) return false;

  try {
    const res = await fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId, type, path, metadata }),
      keepalive: true,
    });

    return res.ok;
  } catch {
    return false;
  }
}

export function isPassiveAnalyticsAllowed(): boolean {
  return isAnalyticsAllowed();
}

export function hasLikedBlogPost(slug: string): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(`blog_like_${slug}`) === "1";
}

export function markBlogPostLiked(slug: string) {
  sessionStorage.setItem(`blog_like_${slug}`, "1");
}
