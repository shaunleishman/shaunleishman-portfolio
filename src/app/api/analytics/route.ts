import { NextRequest, NextResponse } from "next/server";
import { writeEvent, getAnalyticsSummary } from "@/lib/analytics";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId, type, path, metadata } = body;

    if (!sessionId || !type || !path) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const validTypes = ["pageview", "scroll", "section_view", "click", "exit"];
    if (!validTypes.includes(type)) {
      return NextResponse.json({ error: "Invalid event type" }, { status: 400 });
    }

    writeEvent({
      id: crypto.randomUUID(),
      sessionId,
      type,
      path,
      timestamp: new Date().toISOString(),
      metadata,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const password = process.env.ADMIN_PASSWORD;

  if (!password || authHeader !== `Bearer ${password}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json(getAnalyticsSummary());
}
