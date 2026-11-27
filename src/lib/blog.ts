import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { type BlogCategoryId, resolveBlogCategoryId } from "@/lib/blog-categories";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export type BlogCollaborator = {
  name: string;
  role: string;
  /** Portrait under /public, e.g. /images/blog/arron-leishman.png */
  image: string;
  linkedInUrl?: string;
};

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
  /** Optional collaborator credit shown on the article. */
  collaboration?: BlogCollaborator;
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

export type PublishedPostMeta = {
  slug: string;
  title: string;
  date: string;
};

type PublishedCatalogCache = {
  key: string;
  posts: PublishedPostMeta[];
};

let publishedCatalogCache: PublishedCatalogCache | null = null;

function blogCatalogStamp(): string {
  if (!fs.existsSync(BLOG_DIR)) return "";
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const stats = fs.statSync(path.join(BLOG_DIR, file));
      return `${file}:${stats.mtimeMs}:${stats.size}`;
    })
    .sort()
    .join("|");
}

function publishedPostDate(value: unknown): string {
  if (typeof value === "string") return value;
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }
  return "";
}

/**
 * Published posts for catalogues that only need the title and date.
 * Reads frontmatter, caches by file mtime and size, and skips reading time.
 * Order matches `getAllPosts`: newest date first.
 */
export function listPublishedPosts(): PublishedPostMeta[] {
  const key = blogCatalogStamp();
  if (publishedCatalogCache?.key === key) return publishedCatalogCache.posts;

  if (!fs.existsSync(BLOG_DIR)) {
    publishedCatalogCache = { key, posts: [] };
    return publishedCatalogCache.posts;
  }

  const posts = fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(BLOG_DIR, `${slug}.md`), "utf-8");
      const { data } = matter(raw);
      if (!(data.published ?? true)) return null;
      return {
        slug,
        title: typeof data.title === "string" ? data.title : "",
        date: publishedPostDate(data.date),
      };
    })
    .filter((post): post is PublishedPostMeta => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  publishedCatalogCache = { key, posts };
  return posts;
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const stats = readingTime(content);
  const collaboration = parseCollaboration(data.collaboration);

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
    collaboration,
    content,
    readingTime: stats.text,
  };
}

function parseCollaboration(value: unknown): BlogCollaborator | undefined {
  if (!value || typeof value !== "object") return undefined;
  const raw = value as Record<string, unknown>;
  if (
    typeof raw.name !== "string" ||
    typeof raw.role !== "string" ||
    typeof raw.image !== "string"
  ) {
    return undefined;
  }

  return {
    name: raw.name,
    role: raw.role,
    image: raw.image,
    linkedInUrl: typeof raw.linkedInUrl === "string" ? raw.linkedInUrl : undefined,
  };
}
