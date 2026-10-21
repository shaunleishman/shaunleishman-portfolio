import { getPostBySlug } from "@/lib/blog";
import { readBlogShareImage } from "@/lib/blog-share-image";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function GET(_request: Request, { params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post?.published || !post.thumbnail) {
    return new Response("Not found", { status: 404 });
  }

  const image = readBlogShareImage(post.thumbnail);
  if (!image) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(new Uint8Array(image.data), {
    headers: {
      "Content-Type": image.mime,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
