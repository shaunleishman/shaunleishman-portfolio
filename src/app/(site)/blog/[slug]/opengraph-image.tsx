import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/blog";
import { siteConfig } from "@/content/projects";

export const alt = "Blog article preview";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return new Response("Not found", { status: 404 });
  }

  if (post.thumbnail) {
    const filePath = join(process.cwd(), "public", post.thumbnail.replace(/^\//, ""));
    if (existsSync(filePath)) {
      const data = await readFile(filePath);
      const isPng = post.thumbnail.toLowerCase().endsWith(".png");
      return new Response(data, {
        headers: {
          "Content-Type": isPng ? "image/png" : "image/jpeg",
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    }
  }

  const tagLine = post.tags.slice(0, 3).join(" · ");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(145deg, #0f172a 0%, #1e293b 55%, #111827 100%)",
          color: "#ffffff",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 999,
              background: "#3b66f5",
            }}
          />
          <span style={{ fontSize: 28, fontWeight: 600, letterSpacing: "-0.02em" }}>
            {siteConfig.brand}
          </span>
          <span style={{ fontSize: 24, color: "#94a3b8" }}>Blog</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 980 }}>
          <div
            style={{
              fontSize: 56,
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
            }}
          >
            {post.title}
          </div>
          <div
            style={{
              fontSize: 28,
              lineHeight: 1.45,
              color: "#cbd5e1",
            }}
          >
            {post.description}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 24, color: "#94a3b8" }}>{siteConfig.name}</span>
          {tagLine ? (
            <span style={{ fontSize: 22, color: "#64748b" }}>{tagLine}</span>
          ) : null}
        </div>
      </div>
    ),
    { ...size },
  );
}
