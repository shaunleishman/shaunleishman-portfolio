import { NextRequest, NextResponse } from "next/server";
import { getMetricsGateKey, getMetricsPath } from "@/lib/metrics-config";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { key?: string; gesture?: string };

    const keyMatch =
      typeof body.key === "string" && body.key.trim().toLowerCase() === getMetricsGateKey();
    const gestureMatch = body.gesture === "logo";

    if (!keyMatch && !gestureMatch) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ path: getMetricsPath() });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
