import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { getBlogEngagementForSlug } from "@/lib/blog-engagement";
import { siteConfig } from "@/content/projects";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CaseStudyFeedback } from "@/components/projects/CaseStudyFeedback";
import { BlogContent } from "@/components/blog/BlogContent";
import { LinkedInShare } from "@/components/blog/LinkedInShare";
import { BlogEngagementActions } from "@/components/blog/BlogEngagementActions";
import { BlogEngagementStatsDisplay } from "@/components/blog/BlogEngagementStats";
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


export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post || !post.published) notFound();

  const shareUrl = `${siteConfig.siteUrl}/blog/${post.slug}`;
  const engagement = getBlogEngagementForSlug(post.slug);

  return (
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
          <BlogEngagementStatsDisplay stats={engagement} dark className="mt-6" />
        </PageHero>
      </section>

      <article className="section-padding bg-white">
        <div className="container-site max-w-3xl prose prose-neutral prose-lg">
          <BlogContent content={post.content} />
        </div>

        <Reveal delay={80} className="container-site max-w-3xl mt-12 pt-8 border-t border-[var(--color-border)] space-y-6">
          <BlogEngagementActions slug={post.slug} initialStats={engagement} />
          <LinkedInShare
            url={shareUrl}
            title={post.title}
            slug={post.slug}
            initialShareCount={engagement.shares}
          />
        </Reveal>

        <Reveal delay={100} className="container-site max-w-3xl mt-10">
          <CaseStudyFeedback
            feedbackPath={`/blog/${post.slug}`}
            question="How strong does this article come across?"
            submittedDescription="Thanks — it helps me understand what's working in my writing."
            sectionLead="An optional rating helps me understand whether this article is useful, clear, and worth sharing."
          />
        </Reveal>
      </article>
    </>
  );
}
