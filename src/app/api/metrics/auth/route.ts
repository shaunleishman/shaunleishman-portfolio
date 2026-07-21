import { NextRequest, NextResponse } from "next/server";
import {
  METRICS_COOKIE_MAX_AGE_SECONDS,
  METRICS_COOKIE_NAME,
  getMetricsPassword,
} from "@/lib/metrics-config";
import { createMetricsSessionToken, verifyMetricsPassword, verifyMetricsSessionToken } from "@/lib/metrics-auth";
import { clientIpFromRequest, rateLimit } from "@/lib/rate-limit";

function cookieOptions(secure: boolean) {
  return {
    httpOnly: true,
    secure,
    sameSite: "strict" as const,
    path: "/",
    maxAge: METRICS_COOKIE_MAX_AGE_SECONDS,
  };
}

export async function POST(request: NextRequest) {
  const ip = clientIpFromRequest(request);
  if (!rateLimit(`metrics-auth:${ip}`, 10, 60_000)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  if (!getMetricsPassword()) {
    return NextResponse.json({ error: "Metrics password not configured" }, { status: 503 });
  }

  let password = "";
  try {
    const body = await request.json();
    password = String(body.password ?? "");
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!verifyMetricsPassword(password)) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const token = createMetricsSessionToken();
  if (!token) {
    return NextResponse.json({ error: "Metrics secret not configured" }, { status: 503 });
  }

  const response = NextResponse.json({ ok: true });
  const secure = request.nextUrl.protocol === "https:";
  response.cookies.set(METRICS_COOKIE_NAME, token, cookieOptions(secure));
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(METRICS_COOKIE_NAME, "", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });
  return response;
}

export async function GET(request: NextRequest) {
  const token = request.cookies.get(METRICS_COOKIE_NAME)?.value;
  return NextResponse.json({
    authenticated: verifyMetricsSessionToken(token),
    configured: Boolean(getMetricsPassword()),
  });
}
