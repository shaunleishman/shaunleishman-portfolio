import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { BlogPostList } from "@/components/blog/BlogPostList";
import { PageHero } from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "Blog",
  description: "UX/UI design insights and learnings, shareable on LinkedIn.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <section className="grid-bg text-white section-padding pb-12">
        <PageHero>
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex gap-2 text-body-sm text-neutral-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">→</li>
              <li aria-current="page" className="text-white">
                Blog
              </li>
            </ol>
          </nav>
          <h1 className="text-h1 font-semibold mb-4">Blog</h1>
          <p className="text-body-lg text-neutral-300">
            Insights from my design work, written to share ideas and spark conversations with other
            designers and hiring teams.
          </p>
        </PageHero>
      </section>

      <section className="section-padding bg-white">
        <div className="container-site max-w-3xl">
          <BlogPostList posts={posts} />
        </div>
      </section>
    </>
  );
}
