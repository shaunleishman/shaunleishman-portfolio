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
import {
  getCachedMetricsTrackingExcluded,
  isMetricsTrackingExcluded,
} from "@/lib/metrics-tracking-exclusion-client";
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
  if (await isMetricsTrackingExcluded()) return { ok: false };

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

const articleViewChain = new Map<string, Promise<BlogEngagementStats | null>>();

function articleViewStorageKey(slug: string): string {
  return `blog_view_${slug}`;
}

function articleViewMirrorKey(slug: string): string {
  return `blog_view_mirrored_${slug}`;
}

async function postBlogArticleView(slug: string): Promise<BlogEngagementStats | null> {
  if (await isMetricsTrackingExcluded()) return null;

  const analyticsConsent = isAnalyticsAllowed();
  const viewed = sessionStorage.getItem(articleViewStorageKey(slug)) === "1";
  const mirrored = sessionStorage.getItem(articleViewMirrorKey(slug)) === "1";
  if (viewed && (!analyticsConsent || mirrored)) return null;

  const sessionId = getAnalyticsSessionId();
  if (!sessionId) return null;

  try {
    const res = await fetch("/api/blog/engagement", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, action: "view", sessionId, analyticsConsent }),
      keepalive: true,
    });

    if (!res.ok) return null;

    sessionStorage.setItem(articleViewStorageKey(slug), "1");
    if (analyticsConsent) sessionStorage.setItem(articleViewMirrorKey(slug), "1");
    const data = (await res.json()) as { stats?: BlogEngagementStats };
    return data.stats ?? null;
  } catch {
    return null;
  }
}

/**
 * Count one public article view per tab, and copy it into analytics only when
 * analytics consent is on. Calls for the same slug run one after another so a
 * second effect pass cannot double-count. Call again after consent is granted:
 * the public count stays put and the analytics pageview is sent once.
 */
export function recordBlogArticleView(slug: string): Promise<BlogEngagementStats | null> {
  if (typeof window === "undefined") return Promise.resolve(null);

  const previous = articleViewChain.get(slug) ?? Promise.resolve(null);
  const next = previous.then(
    () => postBlogArticleView(slug),
    () => postBlogArticleView(slug),
  );
  articleViewChain.set(slug, next);
  return next;
}

export function isPassiveAnalyticsAllowed(): boolean {
  return isAnalyticsAllowed() && !getCachedMetricsTrackingExcluded();
}

export function hasLikedBlogPost(slug: string): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(`blog_like_${slug}`) === "1";
}

export function markBlogPostLiked(slug: string) {
  sessionStorage.setItem(`blog_like_${slug}`, "1");
}
