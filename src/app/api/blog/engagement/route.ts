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
import { clientIpFromRequest, rateLimit } from "@/lib/rate-limit";

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
    // Article pageviews are written only from here. AnalyticsProvider skips them
    // so a consenting visitor is not counted twice. Callers must already have
    // checked analytics consent for views.
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
    const ip = clientIpFromRequest(request);
    if (!rateLimit(`blog-engagement:${ip}`, 60, 60_000)) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

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
    // Views update the public counter either way. The analytics pageview is a
    // separate write and only happens when this browser says analytics is allowed.
    // Likes and shares stay explicit actions: the public count and the analytics
    // copy both follow a successful increment.
    const analyticsConsent = action === "view" && body.analyticsConsent === true;
    const { changed, mirroredView } = await incrementBlogEngagement(blogPath, action, sessionId, {
      mirrorAnalyticsView: analyticsConsent,
    });
    if (action === "view" ? mirroredView : changed) {
      await mirrorToAnalytics(blogPath, action, sessionId, slug);
    }

    const stats = await getBlogEngagementForSlugAsync(slug);
    // Session id lists stay on the server. `stats` is the public counts only.
    return NextResponse.json({ ok: true, stats, changed });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
