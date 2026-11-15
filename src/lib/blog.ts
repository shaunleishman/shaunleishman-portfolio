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

/** Fields the blog index renders. Article markdown stays on the server. */
export type BlogPostSummary = Pick<
  BlogPost,
  | "slug"
  | "title"
  | "description"
  | "date"
  | "category"
  | "thumbnail"
  | "audioUrl"
  | "readingTime"
>;

export function toBlogPostSummary(post: BlogPost): BlogPostSummary {
  return {
    slug: post.slug,
    title: post.title,
    description: post.description,
    date: post.date,
    category: post.category,
    thumbnail: post.thumbnail,
    audioUrl: post.audioUrl,
    readingTime: post.readingTime,
  };
}

type PostCacheEntry = {
  mtimeMs: number;
  size: number;
  post: BlogPost;
};

/** Parsed posts, reused until the markdown file's mtime or size changes. */
const postCache = new Map<string, PostCacheEntry>();

function isSafeSlug(slug: string): boolean {
  return slug.length > 0 && !slug.includes("/") && !slug.includes("\\") && !slug.includes("..");
}

/** Quoted `YYYY-MM-DD` stays as written. An unquoted YAML date keeps its UTC calendar day. */
function dateStamp(value: unknown): string {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    const year = value.getUTCFullYear();
    const month = String(value.getUTCMonth() + 1).padStart(2, "0");
    const day = String(value.getUTCDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  return typeof value === "string" ? value : "";
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => getPostBySlug(file.replace(/\.md$/, "")))
    .filter((post): post is BlogPost => post !== null && post.published)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

export function getPublishedPostSummaries(): BlogPostSummary[] {
  return getAllPosts().map(toBlogPostSummary);
}

export function getPostBySlug(slug: string): BlogPost | null {
  if (!isSafeSlug(slug)) return null;

  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const stat = fs.statSync(filePath);
  const cached = postCache.get(filePath);
  if (cached && cached.mtimeMs === stat.mtimeMs && cached.size === stat.size) {
    return cached.post;
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const stats = readingTime(content);
  const collaboration = parseCollaboration(data.collaboration);

  const post: BlogPost = {
    slug,
    title: data.title,
    description: data.description,
    date: dateStamp(data.date),
    published: data.published ?? true,
    category: resolveBlogCategoryId(data.category, data.tags ?? []),
    tags: data.tags ?? [],
    thumbnail: data.thumbnail,
    audioUrl: data.audioUrl,
    collaboration,
    content,
    readingTime: stats.text,
  };
  postCache.set(filePath, { mtimeMs: stat.mtimeMs, size: stat.size, post });
  return post;
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
