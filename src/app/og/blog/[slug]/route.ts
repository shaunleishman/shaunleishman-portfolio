import { getPostBySlug } from "@/lib/blog";
import { readBlogShareImage } from "@/lib/blog-share-image";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function GET(_request: Request, { params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post?.thumbnail) {
    return new Response("Not found", { status: 404 });
  }

  const image = readBlogShareImage(post);
  if (!image) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(Uint8Array.from(image.data), {
    headers: {
        "Content-Type": image.type,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
