import fs from "fs";
import path from "path";
import { hasBlobStorage, readBlobJson, writeJsonToBlob } from "@/lib/blob-storage";
import { normalizeEngagementCount } from "@/lib/blog-engagement-shared";

/**
 * Public view, like, and share counts.
 *
 * Blob is the source of truth when `BLOB_READ_WRITE_TOKEN` is set. The sync
 * reader only sees the local file (`data/` in dev, ephemeral `/tmp` on
 * Vercel), so static pages must refresh from `GET /api/blog/engagement`.
 *
 * A failed blob read throws. Falling through to the local file and writing
 * that back would replace the live counts with an empty store.
 *
 * Mutations are queued in this process so two overlapping requests cannot
 * both read the same snapshot and drop one increment. Separate serverless
 * isolates can still race; the queue covers remounts and double-clicks.
 *
 * `viewedSessions` and `likedSessions` are dedupe keys, not public data.
 * Do not return them from the API.
 */

const BLOB_PATHNAME = "blog-engagement.json";

const LOCAL_DIR = path.join(process.cwd(), "data");
const LOCAL_FILE = path.join(LOCAL_DIR, "blog-engagement.json");
const TMP_DIR = path.join("/tmp", "portfolio-data");
const TMP_FILE = path.join(TMP_DIR, "blog-engagement.json");

const MAX_SESSION_IDS = 5000;

export type BlogEngagementRecord = {
  views: number;
  likes: number;
  shares: number;
  viewedSessions: string[];
  likedSessions: string[];
};

export type BlogEngagementStore = Record<string, BlogEngagementRecord>;

function emptyRecord(): BlogEngagementRecord {
  return { views: 0, likes: 0, shares: 0, viewedSessions: [], likedSessions: [] };
}

function localFilePath(): string {
  return process.env.VERCEL ? TMP_FILE : LOCAL_FILE;
}

function ensureLocalFile(filePath: string) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify({}));
  }
}

function sessionIds(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  const ids = value.filter(
    (id): id is string => typeof id === "string" && id.length > 0 && id.length <= 64,
  );
  return uniqueRecent(ids);
}

/** Keep the newest unique ids so a trimmed list still blocks a repeat count. */
function uniqueRecent(ids: string[]): string[] {
  const seen = new Set<string>();
  const unique: string[] = [];

  for (let index = ids.length - 1; index >= 0 && unique.length < MAX_SESSION_IDS; index -= 1) {
    const id = ids[index];
    if (seen.has(id)) continue;
    seen.add(id);
    unique.push(id);
  }

  unique.reverse();
  return unique;
}

function trimSessions(record: BlogEngagementRecord): BlogEngagementRecord {
  return {
    ...record,
    viewedSessions: uniqueRecent(record.viewedSessions),
    likedSessions: uniqueRecent(record.likedSessions),
  };
}

function normalizeStore(raw: unknown): BlogEngagementStore {
  if (!raw || typeof raw !== "object") return {};

  const store: BlogEngagementStore = {};
  for (const [key, value] of Object.entries(raw as Record<string, unknown>)) {
    if (!value || typeof value !== "object") continue;
    const entry = value as Partial<BlogEngagementRecord>;
    store[key] = trimSessions({
      views: normalizeEngagementCount(entry.views),
      likes: normalizeEngagementCount(entry.likes),
      shares: normalizeEngagementCount(entry.shares),
      viewedSessions: sessionIds(entry.viewedSessions),
      likedSessions: sessionIds(entry.likedSessions),
    });
  }
  return store;
}

async function readStoreForUpdate(): Promise<BlogEngagementStore> {
  if (!hasBlobStorage()) return readStoreFromLocalSync();

  const result = await readBlobJson(BLOB_PATHNAME);
  if (!result.ok) {
    if (result.reason === "missing") return readStoreFromLocalSync();
    throw new Error("Blog engagement blob could not be read");
  }

  return normalizeStore(result.data);
}

function readStoreFromLocalSync(): BlogEngagementStore {
  const filePath = localFilePath();
  ensureLocalFile(filePath);
  try {
    return normalizeStore(JSON.parse(fs.readFileSync(filePath, "utf-8")));
  } catch {
    return {};
  }
}

async function writeStoreToBlob(store: BlogEngagementStore): Promise<boolean> {
  if (!hasBlobStorage()) return false;
  return writeJsonToBlob(BLOB_PATHNAME, store);
}

function writeStoreToLocalSync(store: BlogEngagementStore) {
  const filePath = localFilePath();
  ensureLocalFile(filePath);
  fs.writeFileSync(filePath, JSON.stringify(store, null, 2));
}

export function readBlogEngagementStoreSync(): BlogEngagementStore {
  return readStoreFromLocalSync();
}

export async function readBlogEngagementStore(): Promise<BlogEngagementStore> {
  return readStoreForUpdate();
}

async function writeBlogEngagementStore(store: BlogEngagementStore) {
  const wroteBlob = await writeStoreToBlob(store);
  if (!wroteBlob) {
    if (hasBlobStorage() && process.env.VERCEL) {
      console.warn(
        "[blog-engagement] Blob write failed; falling back to ephemeral /tmp storage",
      );
    }
    writeStoreToLocalSync(store);
  }
}

export type BlogEngagementAction = "view" | "like" | "share";

let mutationQueue: Promise<void> = Promise.resolve();

function enqueueMutation<T>(task: () => Promise<T>): Promise<T> {
  const run = mutationQueue.then(task, task);
  mutationQueue = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

async function incrementBlogEngagementNow(
  blogPath: string,
  action: BlogEngagementAction,
  sessionId: string,
): Promise<{ record: BlogEngagementRecord; changed: boolean }> {
  const store = await readStoreForUpdate();
  const current = store[blogPath] ?? emptyRecord();
  const next = { ...current };
  let changed = false;

  if (action === "view") {
    if (!next.viewedSessions.includes(sessionId)) {
      next.views += 1;
      next.viewedSessions = [...next.viewedSessions, sessionId];
      changed = true;
    }
  }

  if (action === "like") {
    if (!next.likedSessions.includes(sessionId)) {
      next.likes += 1;
      next.likedSessions = [...next.likedSessions, sessionId];
      changed = true;
    }
  }

  if (action === "share") {
    next.shares += 1;
    changed = true;
  }

  const trimmed = trimSessions(next);
  if (changed) {
    store[blogPath] = trimmed;
    await writeBlogEngagementStore(store);
  }

  return { record: trimmed, changed };
}

export function incrementBlogEngagement(
  blogPath: string,
  action: BlogEngagementAction,
  sessionId: string,
): Promise<{ record: BlogEngagementRecord; changed: boolean }> {
  return enqueueMutation(() => incrementBlogEngagementNow(blogPath, action, sessionId));
}

export function getBlogEngagementRecord(
  store: BlogEngagementStore,
  blogPath: string,
): BlogEngagementRecord {
  return store[blogPath] ?? emptyRecord();
}
