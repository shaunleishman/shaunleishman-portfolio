import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { SectionLabel } from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "Blog",
  description: "UX/UI design insights and learnings — shareable on LinkedIn.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <section className="grid-bg text-white section-padding pb-12">
        <div className="container-site max-w-3xl">
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
            Short insights from my design work — written to share on LinkedIn and
            spark conversations with other designers and hiring teams.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-site max-w-3xl">
          {posts.length === 0 ? (
            <p className="text-body-lg text-[var(--color-text-secondary)]">
              No posts yet. Check back soon.
            </p>
          ) : (
            <ul className="divide-y divide-[var(--color-border)]">
              {posts.map((post) => (
                <li key={post.slug} className="py-8 first:pt-0">
                  <article>
                    <SectionLabel>
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
                    <h2 className="text-h3 font-semibold mb-3">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="hover:text-[var(--color-accent)] transition-colors"
                      >
                        {post.title}
                      </Link>
                    </h2>
                    <p className="text-body text-[var(--color-text-secondary)] mb-4">
                      {post.description}
                    </p>
                    <ul className="flex flex-wrap gap-2" aria-label="Tags">
                      {post.tags.map((tag) => (
                        <li
                          key={tag}
                          className="text-body-sm text-[var(--color-text-muted)]"
                        >
                          #{tag}
                        </li>
                      ))}
                    </ul>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
