import { NextRequest, NextResponse } from "next/server";
import { writeEventAsync, writeEventsAsync, getAnalyticsSummary } from "@/lib/analytics";
import { normalizeAnalyticsPath } from "@/lib/analytics-paths";
import { METRICS_COOKIE_NAME } from "@/lib/metrics-config";
import { verifyMetricsPassword, verifyMetricsSessionToken } from "@/lib/metrics-auth";
import { isMetricsOwnerRequest } from "@/lib/metrics-tracking-exclusion";
import { clientIpFromRequest, rateLimit } from "@/lib/rate-limit";
import crypto from "crypto";

const VALID_TYPES = [
  "pageview",
  "scroll",
  "section_view",
  "click",
  "exit",
  "heatmap_dwell",
  "click_map",
  "page_meta",
  "scroll_band",
  "blog_like",
  "blog_share",
] as const;

const MAX_SESSION_ID_LENGTH = 128;
const MAX_PATH_LENGTH = 512;
const MAX_METADATA_KEYS = 32;
const MAX_METADATA_KEY_LENGTH = 64;
const MAX_METADATA_STRING = 4000;

function sanitizeMetadata(metadata: unknown): Record<string, string | number> | undefined {
  if (!metadata || typeof metadata !== "object" || Array.isArray(metadata)) return undefined;

  const clean: Record<string, string | number> = {};
  for (const [key, value] of Object.entries(metadata)) {
    if (Object.keys(clean).length >= MAX_METADATA_KEYS) break;
    if (key.length === 0 || key.length > MAX_METADATA_KEY_LENGTH) continue;
    if (typeof value === "string") {
      if (value.length === 0) continue;
      clean[key] = value.length > MAX_METADATA_STRING ? value.slice(0, MAX_METADATA_STRING) : value;
    } else if (typeof value === "number" && Number.isFinite(value)) {
      clean[key] = value;
    }
  }

  return Object.keys(clean).length > 0 ? clean : undefined;
}

function normalizeEvent(raw: Record<string, unknown>) {
  const { sessionId, type, path, metadata } = raw;
  if (typeof sessionId !== "string" || typeof type !== "string" || typeof path !== "string") {
    return null;
  }
  if (
    sessionId.length === 0 ||
    sessionId.length > MAX_SESSION_ID_LENGTH ||
    path.length === 0 ||
    path.length > MAX_PATH_LENGTH
  ) {
    return null;
  }
  if (!VALID_TYPES.includes(type as (typeof VALID_TYPES)[number])) {
    return null;
  }

  return {
    id: crypto.randomUUID(),
    sessionId,
    type: type as (typeof VALID_TYPES)[number],
    path: normalizeAnalyticsPath(path),
    timestamp: new Date().toISOString(),
    metadata: sanitizeMetadata(metadata),
  };
}

export async function POST(request: NextRequest) {
  try {
    const ip = clientIpFromRequest(request);
    if (!rateLimit(`analytics:${ip}`, 120, 60_000)) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

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

    const { duplicate } = await writeEventAsync(event);
    if (duplicate) {
      return NextResponse.json({ ok: true, duplicate: true });
    }
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
