"use client";

import { useMemo, useState, useTransition } from "react";
import Link from "next/link";
import type { BlogPost } from "@/lib/blog";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FilterChip } from "@/components/ui/FilterChip";
import { Skeleton, SkeletonText } from "@/components/ui/Skeleton";
import { Reveal } from "@/components/ui/Reveal";

const FILTERS = ["All", "UX", "UI", "Research", "AI", "Product Design"] as const;

type BlogPostListProps = {
  posts: BlogPost[];
};

function formatReadingTime(text: string) {
  return text.replace(/^less than a minute read$/i, "1 min read");
}

export function BlogPostList({ posts }: BlogPostListProps) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [pending, startTransition] = useTransition();

  const filtered = useMemo(() => {
    if (filter === "All") return posts;
    return posts.filter((post) =>
      post.tags.some((tag) => tag.toLowerCase() === filter.toLowerCase()),
    );
  }, [posts, filter]);

  function selectFilter(topic: (typeof FILTERS)[number]) {
    startTransition(() => setFilter(topic));
  }

  if (posts.length === 0) {
    return (
      <p className="text-body-lg text-[var(--color-text-secondary)]">No posts yet. Check back soon.</p>
    );
  }

  return (
    <>
      <Reveal immediate>
        <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Filter articles by topic">
          {FILTERS.map((topic) => (
            <FilterChip
              key={topic}
              label={topic}
              selected={filter === topic}
              onClick={() => selectFilter(topic)}
              aria-pressed={filter === topic}
            />
          ))}
        </div>
      </Reveal>

      {pending ? (
        <div className="space-y-8 motion-safe:animate-[fade-in_0.2s_ease-out]" aria-busy="true" aria-label="Loading articles">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="py-4 space-y-3">
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-7 w-4/5" />
              <SkeletonText lines={2} />
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <p className="text-body text-[var(--color-text-muted)] motion-safe:animate-[fade-in_0.25s_ease-out]">
          No articles match this filter yet.
        </p>
      ) : (
        <ul className="divide-y divide-[var(--color-border)]">
          {filtered.map((post, index) => (
            <li key={post.slug} className="py-8 first:pt-0">
              <Reveal delay={index * 60}>
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
                    {formatReadingTime(post.readingTime)}
                  </SectionLabel>
                  <h2 className="text-h3 font-semibold mb-3">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:text-[var(--color-accent)] transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-body text-[var(--color-text-secondary)] mb-4">{post.description}</p>
                  <ul className="flex flex-wrap gap-2" aria-label="Tags">
                    {post.tags.map((tag) => (
                      <li key={tag} className="text-body-sm text-[var(--color-text-muted)]">
                        #{tag}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
