import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { getBlogShareImageUrl, getBlogShareImageMeta } from "@/lib/blog-images";
import { getBlogCategory } from "@/lib/blog-categories";
import { getBlogEngagementForSlug } from "@/lib/blog-engagement";
import { siteConfig } from "@/content/projects";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CaseStudyFeedback } from "@/components/projects/CaseStudyFeedback";
import { BlogContent } from "@/components/blog/BlogContent";
import {
  BlogPostEngagement,
  BlogPostEngagementStats,
  BlogPostEngagementToolbar,
} from "@/components/blog/BlogPostEngagement";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";

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

  const imageUrl = getBlogShareImageUrl(post, siteConfig.siteUrl);
  const imageMeta = getBlogShareImageMeta(post);

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      url: `${siteConfig.siteUrl}/blog/${post.slug}`,
      siteName: siteConfig.name,
      images: [
        {
          url: imageUrl,
          secureUrl: imageUrl,
          width: imageMeta.width,
          height: imageMeta.height,
          type: imageMeta.type,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [imageUrl],
    },
  };
}


export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post || !post.published) notFound();

  const shareUrl = `${siteConfig.siteUrl}/blog/${post.slug}`;
  const engagement = getBlogEngagementForSlug(post.slug);
  const category = getBlogCategory(post.category);

  return (
    <BlogPostEngagement
      slug={post.slug}
      title={post.title}
      shareUrl={shareUrl}
      initialStats={engagement}
    >
      <>
      <section className="grid-bg text-white section-padding pb-12">
        <PageHero>
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
            <span
              className="mr-2 inline-block size-2 rounded-full align-middle"
              style={{ backgroundColor: category.thumbnailBg }}
              aria-hidden
            />
            {category.label}
            {" · "}
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
          <p className="text-body-lg text-neutral-300 mb-6">{post.description}</p>
          <BlogPostEngagementStats variant="dark" className="mb-5" />
          <BlogPostEngagementToolbar variant="dark" />
        </PageHero>
      </section>

      <article className="section-padding bg-white">
        <div className="container-site max-w-3xl prose prose-neutral prose-lg">
          <BlogContent content={post.content} />
        </div>

        <Reveal delay={80} className="container-site max-w-3xl mt-12 pt-8 border-t border-[var(--color-border)]">
          <BlogPostEngagementToolbar />
        </Reveal>

        <div className="container-site max-w-3xl">
          <CaseStudyFeedback variant="article" feedbackPath={`/blog/${post.slug}`} />
        </div>
      </article>
      </>
    </BlogPostEngagement>
  );
}
