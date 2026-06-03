import fs from "fs";
import path from "path";
import {
  getEventTypeBreakdown,
  getHeatmapPagePaths,
  getHourlyActivity,
  getTotalDwellMs,
} from "@/lib/analytics-heatmap";

export type AnalyticsEvent = {
  id: string;
  sessionId: string;
  type:
    | "pageview"
    | "scroll"
    | "section_view"
    | "click"
    | "exit"
    | "heatmap_dwell"
    | "page_meta"
    | "scroll_band"
    | "blog_like"
    | "blog_share";
  path: string;
  timestamp: string;
  metadata?: Record<string, string | number>;
};

export type AnalyticsSummary = {
  filterPath: string | null;
  paths: string[];
  totalPageviews: number;
  uniqueSessions: number;
  totalDwellMs: number;
  avgDwellPerSession: number;
  topPages: { path: string; views: number }[];
  topSections: { section: string; views: number }[];
  scrollDepth: { depth: string; count: number }[];
  exitPages: { path: string; count: number }[];
  hourlyActivity: { hour: string; count: number }[];
  eventTypes: { type: string; count: number }[];
  feedback: {
    total: number;
    averageScore: number;
    byBucket: { bucket: string; count: number }[];
    byCaseStudy: { path: string; count: number; averageScore: number }[];
    topReasons: { reason: string; count: number }[];
  };
  dailyPageviews: { date: string; count: number }[];
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
  const trimmed = events.slice(-20000);
  fs.writeFileSync(DATA_FILE, JSON.stringify(trimmed, null, 2));
}

export function writeEvents(batch: AnalyticsEvent[]) {
  if (batch.length === 0) return;
  const events = readEvents();
  events.push(...batch);
  const trimmed = events.slice(-20000);
  fs.writeFileSync(DATA_FILE, JSON.stringify(trimmed, null, 2));
}

function filterEvents(events: AnalyticsEvent[], filterPath?: string | null) {
  if (!filterPath) return events;
  return events.filter((event) => event.path === filterPath);
}

export function getAnalyticsSummary(filterPath?: string | null): AnalyticsSummary {
  const allEvents = readEvents();
  const events = filterEvents(allEvents, filterPath);
  const pageviews = events.filter((e) => e.type === "pageview");
  const sessions = new Set(events.map((e) => e.sessionId));
  const totalDwellMs = getTotalDwellMs(filterPath);

  const pageCounts = new Map<string, number>();
  (filterPath ? pageviews : allEvents.filter((e) => e.type === "pageview")).forEach((e) => {
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

  const feedbackEvents = events.filter((e) => e.type === "click" && e.metadata?.feedback);
  const bucketCounts = new Map<string, number>();
  const reasonCounts = new Map<string, number>();
  const caseStudyScores = new Map<string, { total: number; count: number }>();
  let scoreSum = 0;
  let scoreCount = 0;

  feedbackEvents.forEach((e) => {
    const bucket = String(e.metadata?.feedback ?? "unknown");
    bucketCounts.set(bucket, (bucketCounts.get(bucket) ?? 0) + 1);

    const score = Number(e.metadata?.score);
    if (Number.isFinite(score)) {
      scoreSum += score;
      scoreCount += 1;
    }

    const reason = e.metadata?.reason;
    if (reason && typeof reason === "string" && reason !== "null") {
      reasonCounts.set(reason, (reasonCounts.get(reason) ?? 0) + 1);
    }

    const existing = caseStudyScores.get(e.path) ?? { total: 0, count: 0 };
    if (Number.isFinite(score)) {
      existing.total += score;
      existing.count += 1;
    }
    caseStudyScores.set(e.path, existing);
  });

  const dailyCounts = new Map<string, number>();
  pageviews.forEach((e) => {
    const date = e.timestamp.slice(0, 10);
    dailyCounts.set(date, (dailyCounts.get(date) ?? 0) + 1);
  });

  const dailyPageviews = [...dailyCounts.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .slice(-14)
    .map(([date, count]) => ({ date, count }));

  return {
    filterPath: filterPath ?? null,
    paths: getHeatmapPagePaths(),
    totalPageviews: pageviews.length,
    uniqueSessions: sessions.size,
    totalDwellMs,
    avgDwellPerSession: sessions.size > 0 ? Math.round(totalDwellMs / sessions.size) : 0,
    topPages: [...pageCounts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([pathKey, views]) => ({ path: pathKey, views })),
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
      .map(([pathKey, count]) => ({ path: pathKey, count })),
    hourlyActivity: getHourlyActivity(filterPath),
    eventTypes: getEventTypeBreakdown(filterPath),
    feedback: {
      total: feedbackEvents.length,
      averageScore: scoreCount > 0 ? Math.round((scoreSum / scoreCount) * 10) / 10 : 0,
      byBucket: [...bucketCounts.entries()]
        .sort((a, b) => b[1] - a[1])
        .map(([bucket, count]) => ({ bucket, count })),
      byCaseStudy: [...caseStudyScores.entries()]
        .filter(([, value]) => value.count > 0)
        .sort((a, b) => b[1].count - a[1].count)
        .map(([pathKey, value]) => ({
          path: pathKey,
          count: value.count,
          averageScore: Math.round((value.total / value.count) * 10) / 10,
        })),
      topReasons: [...reasonCounts.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8)
        .map(([reason, count]) => ({ reason, count })),
    },
    dailyPageviews,
    recentEvents: events.slice(-30).reverse(),
  };
}
