import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { writeEventAsync } from "@/lib/analytics";
import {
  getBlogEngagementForSlugAsync,
  getBlogEngagementMapAsync,
} from "@/lib/blog-engagement";
import { blogPostPath } from "@/lib/blog-engagement-shared";
import {
  incrementBlogEngagement,
  type BlogEngagementAction,
} from "@/lib/blog-engagement-store";
import { isMetricsOwnerRequest } from "@/lib/metrics-tracking-exclusion";

export const dynamic = "force-dynamic";

function isValidAction(value: unknown): value is BlogEngagementAction {
  return value === "view" || value === "like" || value === "share";
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
  const slug = request.nextUrl.searchParams.get("slug");

  if (slug) {
    return NextResponse.json(
      { stats: await getBlogEngagementForSlugAsync(slug) },
      { headers: { "Cache-Control": "no-store" } },
    );
  }

  return NextResponse.json(
    { posts: await getBlogEngagementMapAsync() },
    { headers: { "Cache-Control": "no-store" } },
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const slug = typeof body.slug === "string" ? body.slug : null;
    const action = body.action;
    const sessionId = typeof body.sessionId === "string" ? body.sessionId : null;

    if (!slug || !isValidAction(action) || !sessionId) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
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

    const stats = await getBlogEngagementForSlugAsync(slug);
    return NextResponse.json({ ok: true, stats, record, changed });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
