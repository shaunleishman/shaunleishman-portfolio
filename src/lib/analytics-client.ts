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
import type { BlogEngagementStats } from "@/lib/blog-engagement-shared";

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
): Promise<{ ok: boolean; stats?: BlogEngagementStats }> {
  const sessionId = getAnalyticsSessionId();
  if (!sessionId) return { ok: false };

  const slug =
    typeof metadata?.slug === "string"
      ? metadata.slug
      : path.startsWith("/blog/")
        ? path.slice("/blog/".length)
        : null;

  if (!slug) return { ok: false };

  try {
    const res = await fetch("/api/blog/engagement", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slug,
        action: type === "blog_like" ? "like" : "share",
        sessionId,
      }),
      keepalive: true,
    });

    if (!res.ok) return { ok: false };

    const data = (await res.json()) as { stats?: BlogEngagementStats };
    return { ok: true, stats: data.stats };
  } catch {
    return { ok: false };
  }
}

export async function recordBlogArticleView(slug: string): Promise<BlogEngagementStats | null> {
  if (typeof window === "undefined") return null;
  if (sessionStorage.getItem(`blog_view_${slug}`) === "1") return null;

  const sessionId = getAnalyticsSessionId();
  if (!sessionId) return null;

  try {
    const res = await fetch("/api/blog/engagement", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, action: "view", sessionId }),
      keepalive: true,
    });

    if (!res.ok) return null;

    sessionStorage.setItem(`blog_view_${slug}`, "1");
    const data = (await res.json()) as { stats?: BlogEngagementStats };
    return data.stats ?? null;
  } catch {
    return null;
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
