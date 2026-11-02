import { isAnalyticsAllowed } from "@/lib/consent";
import { getAnalyticsSessionId } from "@/lib/analytics-session";
import {
  getCachedMetricsTrackingExcluded,
  isMetricsTrackingExcluded,
} from "@/lib/metrics-tracking-exclusion-client";
import type { BlogEngagementStats } from "@/lib/blog-engagement-shared";

export { getAnalyticsSessionId };

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

const articleViewTails = new Map<string, Promise<void>>();

function enqueueArticleView(
  slug: string,
  task: () => Promise<BlogEngagementStats | null>,
): Promise<BlogEngagementStats | null> {
  const previous = articleViewTails.get(slug) ?? Promise.resolve();
  const run = previous.then(task, task);
  articleViewTails.set(
    slug,
    run.then(
      () => undefined,
      () => undefined,
    ),
  );
  return run;
}

async function sendBlogArticleView(
  slug: string,
  analyticsConsent: boolean,
): Promise<BlogEngagementStats | null> {
  if (typeof window === "undefined") return null;
  if (await isMetricsTrackingExcluded()) return null;

  const viewedKey = `blog_view_${slug}`;
  const analyticsKey = `blog_view_analytics_${slug}`;
  const alreadyViewed = sessionStorage.getItem(viewedKey) === "1";
  const alreadyMirrored = sessionStorage.getItem(analyticsKey) === "1";

  // The public view is once per session. A later consenting call still posts
  // so the analytics copy can be recorded without incrementing the public count.
  if (alreadyViewed && (!analyticsConsent || alreadyMirrored)) return null;

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

    sessionStorage.setItem(viewedKey, "1");
    if (analyticsConsent) sessionStorage.setItem(analyticsKey, "1");
    const data = (await res.json()) as { stats?: BlogEngagementStats };
    return data.stats ?? null;
  } catch {
    return null;
  }
}

export function recordBlogArticleView(
  slug: string,
  analyticsConsent = isAnalyticsAllowed(),
): Promise<BlogEngagementStats | null> {
  return enqueueArticleView(slug, () => sendBlogArticleView(slug, analyticsConsent));
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
