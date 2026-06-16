import { NextRequest, NextResponse } from "next/server";
import { writeEventAsync, writeEventsAsync, getAnalyticsSummary, readEventsAsync } from "@/lib/analytics";
import { METRICS_COOKIE_NAME } from "@/lib/metrics-config";
import { verifyMetricsPassword, verifyMetricsSessionToken } from "@/lib/metrics-auth";
import { isMetricsOwnerRequest } from "@/lib/metrics-tracking-exclusion";
import crypto from "crypto";

const VALID_TYPES = [
  "pageview",
  "scroll",
  "section_view",
  "click",
  "exit",
  "heatmap_dwell",
  "page_meta",
  "scroll_band",
  "blog_like",
  "blog_share",
] as const;

function normalizeEvent(raw: Record<string, unknown>) {
  const { sessionId, type, path, metadata } = raw;
  if (typeof sessionId !== "string" || typeof type !== "string" || typeof path !== "string") {
    return null;
  }
  if (!VALID_TYPES.includes(type as (typeof VALID_TYPES)[number])) {
    return null;
  }

  return {
    id: crypto.randomUUID(),
    sessionId,
    type: type as (typeof VALID_TYPES)[number],
    path,
    timestamp: new Date().toISOString(),
    metadata: metadata as Record<string, string | number> | undefined,
  };
}

export async function POST(request: NextRequest) {
  try {
    if (isMetricsOwnerRequest(request)) {
      return NextResponse.json({ ok: true, skipped: true, reason: "metrics_owner" });
    }

    const body = await request.json();

    if (Array.isArray(body.events)) {
      const batch = body.events
        .map((event: Record<string, unknown>) =>
          normalizeEvent({
            sessionId: body.sessionId,
            path: body.path,
            type: event.type,
            metadata: event.metadata,
          }),
        )
        .filter(Boolean);

      if (batch.length === 0) {
        return NextResponse.json({ error: "Invalid batch" }, { status: 400 });
      }

      await writeEventsAsync(batch as NonNullable<ReturnType<typeof normalizeEvent>>[]);
      return NextResponse.json({ ok: true, count: batch.length });
    }

    const event = normalizeEvent(body);
    if (!event) {
      return NextResponse.json({ error: "Missing or invalid fields" }, { status: 400 });
    }

    if (event.type === "blog_like") {
      const events = await readEventsAsync();
      const alreadyLiked = events.some(
        (existing) =>
          existing.type === "blog_like" &&
          existing.path === event.path &&
          existing.sessionId === event.sessionId,
      );
      if (alreadyLiked) {
        return NextResponse.json({ ok: true, duplicate: true });
      }
    }

    await writeEventAsync(event);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const cookieToken = request.cookies.get(METRICS_COOKIE_NAME)?.value;
  const authHeader = request.headers.get("authorization");
  const bearerPassword = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

  const authorized =
    verifyMetricsSessionToken(cookieToken) ||
    (bearerPassword ? verifyMetricsPassword(bearerPassword) : false);

  if (!authorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json(await getAnalyticsSummary());
}
