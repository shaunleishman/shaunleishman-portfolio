import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { type BlogCategoryId, resolveBlogCategoryId } from "@/lib/blog-categories";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  published: boolean;
  category: BlogCategoryId;
  tags: string[];
  /** Optional share/card image under /public, e.g. /images/blog/my-post.jpg (1200×630 recommended). */
  thumbnail?: string;
  /** Optional narrated-audio file under /public, e.g. /audio/my-post.mp3. Renders the article audio player when set. */
  audioUrl?: string;
  content: string;
  readingTime: string;
};

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      return getPostBySlug(slug)!;
    })
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const stats = readingTime(content);

  return {
    slug,
    title: data.title,
    description: data.description,
    date: data.date,
    published: data.published ?? true,
    category: resolveBlogCategoryId(data.category, data.tags ?? []),
    tags: data.tags ?? [],
    thumbnail: data.thumbnail,
    audioUrl: data.audioUrl,
    content,
    readingTime: stats.text,
  };
}
