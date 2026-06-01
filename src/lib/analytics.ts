import fs from "fs";
import path from "path";

export type AnalyticsEvent = {
  id: string;
  sessionId: string;
  type: "pageview" | "scroll" | "section_view" | "click" | "exit";
  path: string;
  timestamp: string;
  metadata?: Record<string, string | number>;
};

export type AnalyticsSummary = {
  totalPageviews: number;
  uniqueSessions: number;
  topPages: { path: string; views: number }[];
  topSections: { section: string; views: number }[];
  scrollDepth: { depth: string; count: number }[];
  exitPages: { path: string; count: number }[];
  recentEvents: AnalyticsEvent[];
};

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "analytics.json");

function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([]));
  }
}

export function readEvents(): AnalyticsEvent[] {
  ensureDataFile();
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
  } catch {
    return [];
  }
}

export function writeEvent(event: AnalyticsEvent) {
  const events = readEvents();
  events.push(event);
  // Keep last 10k events
  const trimmed = events.slice(-10000);
  fs.writeFileSync(DATA_FILE, JSON.stringify(trimmed, null, 2));
}

export function getAnalyticsSummary(): AnalyticsSummary {
  const events = readEvents();
  const pageviews = events.filter((e) => e.type === "pageview");
  const sessions = new Set(events.map((e) => e.sessionId));

  const pageCounts = new Map<string, number>();
  pageviews.forEach((e) => {
    pageCounts.set(e.path, (pageCounts.get(e.path) ?? 0) + 1);
  });

  const sectionCounts = new Map<string, number>();
  events
    .filter((e) => e.type === "section_view")
    .forEach((e) => {
      const section = String(e.metadata?.section ?? "unknown");
      sectionCounts.set(section, (sectionCounts.get(section) ?? 0) + 1);
    });

  const scrollCounts = new Map<string, number>();
  events
    .filter((e) => e.type === "scroll")
    .forEach((e) => {
      const depth = String(e.metadata?.depth ?? "unknown");
      scrollCounts.set(depth, (scrollCounts.get(depth) ?? 0) + 1);
    });

  const exitCounts = new Map<string, number>();
  events
    .filter((e) => e.type === "exit")
    .forEach((e) => {
      exitCounts.set(e.path, (exitCounts.get(e.path) ?? 0) + 1);
    });

  return {
    totalPageviews: pageviews.length,
    uniqueSessions: sessions.size,
    topPages: [...pageCounts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([path, views]) => ({ path, views })),
    topSections: [...sectionCounts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([section, views]) => ({ section, views })),
    scrollDepth: [...scrollCounts.entries()]
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([depth, count]) => ({ depth, count })),
    exitPages: [...exitCounts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([path, count]) => ({ path, count })),
    recentEvents: events.slice(-20).reverse(),
  };
}
