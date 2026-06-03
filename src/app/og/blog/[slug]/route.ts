import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { getPostBySlug } from "@/lib/blog";

type Props = {
  params: Promise<{ slug: string }>;
};

function thumbnailContentType(thumbnailPath: string, data: Buffer): string {
  if (data.length >= 3 && data[0] === 0xff && data[1] === 0xd8 && data[2] === 0xff) {
    return "image/jpeg";
  }

  if (
    data.length >= 8 &&
    data[0] === 0x89 &&
    data[1] === 0x50 &&
    data[2] === 0x4e &&
    data[3] === 0x47
  ) {
    return "image/png";
  }

  if (thumbnailPath.toLowerCase().match(/\.jpe?g$/)) return "image/jpeg";
  if (thumbnailPath.toLowerCase().endsWith(".png")) return "image/png";
  return "application/octet-stream";
}

export async function GET(_request: Request, { params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post?.thumbnail) {
    return new Response("Not found", { status: 404 });
  }

  const candidates = [
    post.thumbnail.replace(/(\.[a-z]+)$/i, "-og$1"),
    post.thumbnail,
  ];

  for (const candidate of candidates) {
    const filePath = join(process.cwd(), "public", candidate.replace(/^\//, ""));
    if (!existsSync(filePath)) continue;

    const data = await readFile(filePath);
    return new Response(data, {
      headers: {
        "Content-Type": thumbnailContentType(candidate, data),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  }

  return new Response("Not found", { status: 404 });
}
