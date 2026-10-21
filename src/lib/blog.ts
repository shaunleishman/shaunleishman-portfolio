import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { type BlogCategoryId, resolveBlogCategoryId } from "@/lib/blog-categories";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

/** Filenames only. Rejects path segments so a slug cannot escape the blog directory. */
const BLOG_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

type PostCacheEntry = {
  mtimeMs: number;
  post: BlogPost | null;
};

const postCache = new Map<string, PostCacheEntry>();

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
  /**
   * Card image under /public, e.g. /images/blog/my-post.png.
   * The file may be a JPEG even when the name ends in `.png`. A sibling
   * `name-og.jpg` is used for the social preview when it exists.
   */
  thumbnail?: string;
  /** Optional narrated-audio file under /public, e.g. /audio/my-post.mp3. Renders the article audio player when set. */
  audioUrl?: string;
  /** Optional collaborator credit shown on the article. */
  collaboration?: BlogCollaborator;
  content: string;
  readingTime: string;
};

/** Fields the blog index renders. The article body stays on the server. */
export type BlogPostSummary = Pick<
  BlogPost,
  "slug" | "title" | "description" | "date" | "category" | "thumbnail" | "audioUrl" | "readingTime"
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

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => getPostBySlug(file.slice(0, -3)))
    .filter((post): post is BlogPost => post !== null && post.published)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

export function getPostBySlug(slug: string): BlogPost | null {
  if (!BLOG_SLUG.test(slug)) return null;

  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  let mtimeMs: number;
  try {
    mtimeMs = fs.statSync(filePath).mtimeMs;
  } catch {
    postCache.delete(slug);
    return null;
  }

  const cached = postCache.get(slug);
  if (cached && cached.mtimeMs === mtimeMs) return cached.post;

  const post = readPostFile(slug, filePath);
  postCache.set(slug, { mtimeMs, post });
  return post;
}

function readPostFile(slug: string, filePath: string): BlogPost | null {
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const stats = readingTime(content);
  const collaboration = parseCollaboration(data.collaboration);
  const tags = Array.isArray(data.tags) ? data.tags.filter((tag) => typeof tag === "string") : [];

  return {
    slug,
    title: typeof data.title === "string" ? data.title : slug,
    description: typeof data.description === "string" ? data.description : "",
    date: normalizeBlogDate(data.date),
    published: data.published ?? true,
    category: resolveBlogCategoryId(data.category, tags),
    tags,
    thumbnail: typeof data.thumbnail === "string" ? data.thumbnail : undefined,
    audioUrl: typeof data.audioUrl === "string" ? data.audioUrl : undefined,
    collaboration,
    content,
    readingTime: stats.text,
  };
}

/** Keep a YAML date (quoted string or Date) on the calendar day written in the file. */
function normalizeBlogDate(value: unknown): string {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    const year = value.getUTCFullYear();
    const month = String(value.getUTCMonth() + 1).padStart(2, "0");
    const day = String(value.getUTCDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  if (typeof value === "string") {
    const match = /^(\d{4}-\d{2}-\d{2})/.exec(value.trim());
    return match ? match[1] : value.trim();
  }

  return "";
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
