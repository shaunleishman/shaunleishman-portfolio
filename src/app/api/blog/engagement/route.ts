import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { writeEventAsync } from "@/lib/analytics";
import {
  blogEngagementStatsFromRecord,
  getBlogEngagementForSlugAsync,
  getBlogEngagementMapAsync,
  isPublishedBlogSlug,
} from "@/lib/blog-engagement";
import { blogPostPath } from "@/lib/blog-engagement-shared";
import {
  incrementBlogEngagement,
  type BlogEngagementAction,
} from "@/lib/blog-engagement-store";
import { isMetricsOwnerRequest } from "@/lib/metrics-tracking-exclusion";
import { clientIpFromRequest, rateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

function isValidAction(value: unknown): value is BlogEngagementAction {
  return value === "view" || value === "like" || value === "share";
}

/** Matches `crypto.randomUUID()` and rejects oversized client-supplied ids. */
const SESSION_ID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function isValidSessionId(value: unknown): value is string {
  return typeof value === "string" && SESSION_ID.test(value);
}

async function mirrorToAnalytics(
  blogPath: string,
  action: BlogEngagementAction,
  sessionId: string,
  slug: string,
) {
  try {
    // Views become pageviews here so the dashboard counts them once. AnalyticsProvider
    // skips article pageviews to avoid a second write for consenting visitors.
    const type = action === "like" ? "blog_like" : action === "share" ? "blog_share" : "pageview";
    await writeEventAsync({
      id: crypto.randomUUID(),
      sessionId,
      type,
      path: blogPath,
      timestamp: new Date().toISOString(),
      metadata: action === "view" ? undefined : { slug },
    });
  } catch {
    /* non-blocking — engagement store is the source of truth for public counts */
  }
}

export async function GET(request: NextRequest) {
  try {
    const slug = request.nextUrl.searchParams.get("slug");

    if (slug) {
      if (!isPublishedBlogSlug(slug)) {
        return NextResponse.json({ error: "Unknown article" }, { status: 404 });
      }

      return NextResponse.json(
        { stats: await getBlogEngagementForSlugAsync(slug) },
        { headers: { "Cache-Control": "no-store" } },
      );
    }

    return NextResponse.json(
      { posts: await getBlogEngagementMapAsync() },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const ip = clientIpFromRequest(request);
    if (!rateLimit(`blog-engagement:${ip}`, 60, 60_000)) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const body = await request.json();
    const slug = typeof body.slug === "string" ? body.slug : null;
    const action = body.action;
    const sessionId = body.sessionId;

    if (!slug || !isValidAction(action) || !isValidSessionId(sessionId)) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    if (!isPublishedBlogSlug(slug)) {
      return NextResponse.json({ error: "Unknown article" }, { status: 404 });
    }

    if (isMetricsOwnerRequest(request)) {
      const stats = await getBlogEngagementForSlugAsync(slug);
      return NextResponse.json({ ok: true, skipped: true, reason: "metrics_owner", stats, changed: false });
    }

    const blogPath = blogPostPath(slug);
    const { record, changed } = await incrementBlogEngagement(blogPath, action, sessionId);
    if (changed) {
      await mirrorToAnalytics(blogPath, action, sessionId, slug);
    }

    // `record` includes session id lists. Public clients only need `stats`.
    const stats = blogEngagementStatsFromRecord(slug, record);
    return NextResponse.json({ ok: true, stats, changed });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
