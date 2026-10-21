import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/blog";
import { readBlogShareImage } from "@/lib/blog-share-image";
import { siteConfig } from "@/content/projects";

const GENERATED_SIZE = { width: 1200, height: 630 };

type MetadataProps = {
  params: { slug: string };
};

type Props = {
  params: Promise<{ slug: string }>;
  id: Promise<string | number>;
};

/**
 * Report the real file's type and size. Card images are often JPEGs with a
 * `.png` name, and a static `contentType = "image/png"` made the meta tags
 * disagree with the bytes.
 */
export async function generateImageMetadata({ params }: MetadataProps) {
  const post = getPostBySlug(params.slug);
  const image = post?.published && post.thumbnail ? readBlogShareImage(post.thumbnail) : null;

  if (post?.published && image) {
    return [
      {
        id: "share",
        alt: post.title,
        size: { width: image.width, height: image.height },
        contentType: image.mime,
      },
    ];
  }

  return [
    {
      id: "share",
      alt: post?.title ?? "Blog article preview",
      size: GENERATED_SIZE,
      contentType: "image/png",
    },
  ];
}

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post || !post.published) {
    return new Response("Not found", { status: 404 });
  }

  if (post.thumbnail) {
    const image = readBlogShareImage(post.thumbnail);
    if (image) {
      return new Response(new Uint8Array(image.data), {
        headers: {
          "Content-Type": image.mime,
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
          {tagLine ? <span style={{ fontSize: 22, color: "#64748b" }}>{tagLine}</span> : null}
        </div>
      </div>
    ),
    { ...GENERATED_SIZE },
  );
}
