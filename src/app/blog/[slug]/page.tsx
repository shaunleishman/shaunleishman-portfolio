import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CTASection } from "@/components/sections/CTASection";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
    },
  };
}

function renderMarkdown(content: string) {
  return content
    .split("\n\n")
    .map((block, i) => {
      if (block.startsWith("## ")) {
        return (
          <h2 key={i} className="text-h3 font-semibold mt-10 mb-4">
            {block.replace("## ", "")}
          </h2>
        );
      }
      if (block.startsWith("- ")) {
        const items = block.split("\n").filter((l) => l.startsWith("- "));
        return (
          <ul key={i} className="list-disc pl-5 space-y-2 my-4">
            {items.map((item, j) => (
              <li key={j}>{item.replace("- ", "")}</li>
            ))}
          </ul>
        );
      }
      const withLinks = block.replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        '<a href="$2" class="text-[var(--color-accent)] hover:underline">$1</a>',
      );
      return (
        <p
          key={i}
          className="text-body-lg text-[var(--color-text-secondary)] my-4"
          dangerouslySetInnerHTML={{ __html: withLinks }}
        />
      );
    });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post || !post.published) notFound();

  return (
    <>
      <section className="grid-bg text-white section-padding pb-12">
        <div className="container-site max-w-3xl">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap gap-2 text-body-sm text-neutral-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">→</li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li aria-hidden="true">→</li>
              <li aria-current="page" className="text-white line-clamp-1">
                {post.title}
              </li>
            </ol>
          </nav>

          <SectionLabel dark>
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
            {" · "}
            {post.readingTime}
          </SectionLabel>
          <h1 className="text-h1 font-semibold mb-4">{post.title}</h1>
          <p className="text-body-lg text-neutral-300">{post.description}</p>
        </div>
      </section>

      <article className="section-padding bg-white">
        <div className="container-site max-w-3xl prose prose-neutral prose-lg">
          {renderMarkdown(post.content)}
        </div>

        <div className="container-site max-w-3xl mt-12 pt-8 border-t border-[var(--color-border)]">
          <p className="text-body-sm text-[var(--color-text-muted)] mb-4">
            Share this on LinkedIn — copy the link below:
          </p>
          <p className="text-body font-mono bg-[var(--color-bg-muted)] p-4 rounded-lg break-all">
            /blog/{post.slug}
          </p>
        </div>
      </article>

      <CTASection dark={false} />
    </>
  );
}
