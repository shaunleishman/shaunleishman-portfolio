import { NextRequest, NextResponse } from "next/server";
import { getBlogEngagementForSlug, getBlogEngagementMap } from "@/lib/blog-engagement";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("slug");

  if (slug) {
    return NextResponse.json(
      { stats: getBlogEngagementForSlug(slug) },
      { headers: { "Cache-Control": "no-store" } },
    );
  }

  return NextResponse.json(
    { posts: getBlogEngagementMap() },
    { headers: { "Cache-Control": "no-store" } },
  );
}
