import fs from "fs";
import path from "path";
import { hasBlobStorage, readJsonFromBlob, writeJsonToBlob } from "@/lib/blob-storage";

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

function trimSessions(record: BlogEngagementRecord): BlogEngagementRecord {
  return {
    ...record,
    viewedSessions: record.viewedSessions.slice(-MAX_SESSION_IDS),
    likedSessions: record.likedSessions.slice(-MAX_SESSION_IDS),
  };
}

function normalizeStore(raw: unknown): BlogEngagementStore {
  if (!raw || typeof raw !== "object") return {};

  const store: BlogEngagementStore = {};
  for (const [key, value] of Object.entries(raw as Record<string, unknown>)) {
    if (!value || typeof value !== "object") continue;
    const entry = value as Partial<BlogEngagementRecord>;
    store[key] = trimSessions({
      views: Number(entry.views) || 0,
      likes: Number(entry.likes) || 0,
      shares: Number(entry.shares) || 0,
      viewedSessions: Array.isArray(entry.viewedSessions)
        ? entry.viewedSessions.filter((id): id is string => typeof id === "string")
        : [],
      likedSessions: Array.isArray(entry.likedSessions)
        ? entry.likedSessions.filter((id): id is string => typeof id === "string")
        : [],
    });
  }
  return store;
}

async function readStoreFromBlob(): Promise<BlogEngagementStore | null> {
  if (!hasBlobStorage()) return null;

  const raw = await readJsonFromBlob(BLOB_PATHNAME);
  if (raw === null) return null;
  return normalizeStore(raw);
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
  const blobStore = await readStoreFromBlob();
  if (blobStore) return blobStore;
  return readStoreFromLocalSync();
}

async function writeBlogEngagementStore(store: BlogEngagementStore) {
  const wroteBlob = await writeStoreToBlob(store);
  if (!wroteBlob) {
    writeStoreToLocalSync(store);
  }
}

export type BlogEngagementAction = "view" | "like" | "share";

export async function incrementBlogEngagement(
  blogPath: string,
  action: BlogEngagementAction,
  sessionId: string,
): Promise<{ record: BlogEngagementRecord; changed: boolean }> {
  const store = await readBlogEngagementStore();
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

export function getBlogEngagementRecord(
  store: BlogEngagementStore,
  blogPath: string,
): BlogEngagementRecord {
  return store[blogPath] ?? emptyRecord();
}
