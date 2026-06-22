"use client";

import { useMemo, useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { Headphones } from "lucide-react";
import type { BlogPost } from "@/lib/blog";
import { getBlogThumbnailSrc } from "@/lib/blog-images";
import {
  BLOG_CATEGORY_FILTER_OPTIONS,
  type BlogCategoryFilter,
  getBlogCategory,
  getBlogCategoryByLabel,
} from "@/lib/blog-categories";
import type { BlogEngagementStats } from "@/lib/blog-engagement-shared";
import { BlogEngagementStatsDisplay } from "@/components/blog/BlogEngagementStats";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FilterChip } from "@/components/ui/FilterChip";
import { Skeleton, SkeletonText } from "@/components/ui/Skeleton";
import { Reveal } from "@/components/ui/Reveal";

const FILTERS = BLOG_CATEGORY_FILTER_OPTIONS;

type BlogPostListProps = {
  posts: BlogPost[];
  engagement: Record<string, BlogEngagementStats>;
};

function formatReadingTime(text: string) {
  return text.replace(/^less than a minute read$/i, "1 min read");
}

export function BlogPostList({ posts, engagement }: BlogPostListProps) {
  const [filter, setFilter] = useState<BlogCategoryFilter>("All");
  const [pending, startTransition] = useTransition();

  const filtered = useMemo(() => {
    if (filter === "All") return posts;
    const category = getBlogCategoryByLabel(filter);
    if (!category) return posts;
    return posts.filter((post) => post.category === category.id);
  }, [posts, filter]);

  function selectFilter(topic: BlogCategoryFilter) {
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
        <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Filter articles by category">
          {FILTERS.map((topic) => {
            const category = topic === "All" ? null : getBlogCategoryByLabel(topic);

            return (
              <FilterChip
                key={topic}
                label={topic}
                selected={filter === topic}
                onClick={() => selectFilter(topic)}
                aria-pressed={filter === topic}
                accentColor={category?.accentColor}
              />
            );
          })}
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
          {filtered.map((post, index) => {
            const category = getBlogCategory(post.category);

            return (
            <li key={post.slug} className="py-8 first:pt-0">
              <Reveal delay={index * 60}>
                <article className="grid grid-cols-1 gap-5 sm:grid-cols-[14rem_1fr] sm:items-stretch sm:gap-8">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="relative block aspect-[16/9] overflow-hidden rounded-xl border border-[var(--color-border)] sm:aspect-auto sm:h-full sm:min-h-[10.5rem]"
                    aria-hidden
                    tabIndex={-1}
                  >
                    <Image
                      src={getBlogThumbnailSrc(post)}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 14rem"
                      loading="lazy"
                    />
                  </Link>
                  <div className="min-w-0 flex flex-col justify-center">
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
                    {post.audioUrl && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-accent)]/10 px-2 py-0.5 text-[var(--color-accent)]">
                        <Headphones className="size-3" aria-hidden />
                        Audio
                      </span>
                    )}
                  </SectionLabel>
                  <BlogEngagementStatsDisplay
                    stats={
                      engagement[post.slug] ?? {
                        slug: post.slug,
                        views: 0,
                        likes: 0,
                        shares: 0,
                      }
                    }
                    compact
                    className="mb-3"
                  />
                  <h2 className="text-h3 font-semibold mb-3">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:text-[var(--color-accent)] transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-body text-[var(--color-text-secondary)] mb-4">{post.description}</p>
                  <p className="text-body-sm text-[var(--color-text-muted)]">
                    <span
                      className="mr-2 inline-block size-2.5 rounded-full align-middle"
                      style={{ backgroundColor: category.thumbnailBg }}
                      aria-hidden
                    />
                    {category.label}
                  </p>
                  </div>
                </article>
              </Reveal>
            </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
