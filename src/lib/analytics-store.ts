import fs from "fs";
import path from "path";
import type { AnalyticsEvent } from "@/lib/analytics-types";
import { hasBlobStorage, readJsonFromBlob, writeJsonToBlob } from "@/lib/blob-storage";

const BLOB_PATHNAME = "analytics-events.json";

const LOCAL_DIR = path.join(process.cwd(), "data");
const LOCAL_FILE = path.join(LOCAL_DIR, "analytics.json");
const TMP_DIR = path.join("/tmp", "portfolio-data");
const TMP_FILE = path.join(TMP_DIR, "analytics.json");

/** Safety cap — raised for long-term retention; oldest events drop only above this. */
const MAX_EVENTS = 500_000;

/**
 * Appends share one in-process queue. Overlapping read-modify-write cycles
 * (pageview, dwell flush, feedback, article mirror) otherwise drop events.
 * Do not call the unlocked reader from outside this queue.
 */
let writeQueue: Promise<unknown> = Promise.resolve();

function enqueue<T>(task: () => Promise<T>): Promise<T> {
  const run = writeQueue.then(task, task);
  writeQueue = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
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
    fs.writeFileSync(filePath, JSON.stringify([]));
  }
}

function normalizeEvents(raw: unknown): AnalyticsEvent[] {
  if (!Array.isArray(raw)) return [];

  return raw.filter((entry): entry is AnalyticsEvent => {
    if (!entry || typeof entry !== "object") return false;
    const event = entry as Partial<AnalyticsEvent>;
    return (
      typeof event.id === "string" &&
      typeof event.sessionId === "string" &&
      typeof event.type === "string" &&
      typeof event.path === "string" &&
      typeof event.timestamp === "string"
    );
  });
}

function trimEvents(events: AnalyticsEvent[]): AnalyticsEvent[] {
  if (events.length <= MAX_EVENTS) return events;
  return events.slice(-MAX_EVENTS);
}

function readStoreFromLocalSync(): AnalyticsEvent[] {
  const filePath = localFilePath();
  ensureLocalFile(filePath);
  try {
    return normalizeEvents(JSON.parse(fs.readFileSync(filePath, "utf-8")));
  } catch {
    return [];
  }
}

function writeStoreToLocalSync(events: AnalyticsEvent[]) {
  const filePath = localFilePath();
  ensureLocalFile(filePath);
  // Compact JSON. Pretty-printing the full log blocks the process as it grows.
  fs.writeFileSync(filePath, JSON.stringify(trimEvents(events)));
}

async function readStoreFromBlob(): Promise<AnalyticsEvent[] | null> {
  if (!hasBlobStorage()) return null;

  const raw = await readJsonFromBlob(BLOB_PATHNAME);
  if (raw === null) return null;
  return normalizeEvents(raw);
}

async function writeStoreToBlob(events: AnalyticsEvent[]): Promise<boolean> {
  if (!hasBlobStorage()) return false;
  return writeJsonToBlob(BLOB_PATHNAME, trimEvents(events));
}

async function mergeLegacyLocalEvents(events: AnalyticsEvent[]): Promise<AnalyticsEvent[]> {
  const local = readStoreFromLocalSync();
  if (local.length === 0) return events;
  if (events.length >= local.length) return events;

  const seen = new Set(events.map((event) => event.id));
  const merged = [...events];
  local.forEach((event) => {
    if (!seen.has(event.id)) merged.push(event);
  });
  merged.sort((a, b) => a.timestamp.localeCompare(b.timestamp));
  return trimEvents(merged);
}

async function writeAnalyticsEvents(events: AnalyticsEvent[]) {
  const trimmed = trimEvents(events);
  const wroteBlob = await writeStoreToBlob(trimmed);
  if (!wroteBlob) {
    if (hasBlobStorage() && process.env.VERCEL) {
      console.warn(
        "[analytics] Blob write failed; falling back to ephemeral /tmp storage",
      );
    }
    writeStoreToLocalSync(trimmed);
  }
}

async function readAnalyticsEventsUnlocked(): Promise<AnalyticsEvent[]> {
  const blobEvents = await readStoreFromBlob();
  if (blobEvents !== null) {
    const merged = await mergeLegacyLocalEvents(blobEvents);
    if (merged.length > blobEvents.length) {
      await writeAnalyticsEvents(merged);
    }
    return merged;
  }

  return readStoreFromLocalSync();
}

export async function readAnalyticsEvents(): Promise<AnalyticsEvent[]> {
  return enqueue(() => readAnalyticsEventsUnlocked());
}

/** Local file only. This does not wait for the write queue. */
export function readAnalyticsEventsSync(): AnalyticsEvent[] {
  return readStoreFromLocalSync();
}

async function persistAppend(batch: AnalyticsEvent[]): Promise<void> {
  if (batch.length === 0) return;
  const events = await readAnalyticsEventsUnlocked();
  events.push(...batch);
  await writeAnalyticsEvents(events);
}

export async function appendAnalyticsEvents(batch: AnalyticsEvent[]): Promise<void> {
  if (batch.length === 0) return;
  await enqueue(() => persistAppend(batch));
}

export async function appendAnalyticsEvent(
  event: AnalyticsEvent,
): Promise<{ duplicate: boolean }> {
  return enqueue(async () => {
    const events = await readAnalyticsEventsUnlocked();
    if (
      event.type === "blog_like" &&
      events.some(
        (existing) =>
          existing.type === "blog_like" &&
          existing.path === event.path &&
          existing.sessionId === event.sessionId,
      )
    ) {
      return { duplicate: true };
    }

    events.push(event);
    await writeAnalyticsEvents(events);
    return { duplicate: false };
  });
}
