import { NextRequest, NextResponse } from "next/server";
import { getBlogEngagementForSlug, getBlogEngagementMap } from "@/lib/blog-engagement";

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("slug");

  if (slug) {
    return NextResponse.json({ stats: getBlogEngagementForSlug(slug) });
  }

  return NextResponse.json({ posts: getBlogEngagementMap() });
}
