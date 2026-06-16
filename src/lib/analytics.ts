import type { AnalyticsPeriod } from "@/lib/analytics-period";
import { eventInPeriod, getPeriodLabel } from "@/lib/analytics-period";
import {
  getEventTypeBreakdown,
  getHeatmapPagePaths,
  getHourlyActivity,
  getTotalDwellMs,
} from "@/lib/analytics-heatmap";
import {
  getImprovementAreaDisplayLabel,
  getQualityLabel,
} from "@/lib/feedback-config";
import { isArticlePath } from "@/lib/analytics-paths";
import {
  appendAnalyticsEvent,
  appendAnalyticsEvents,
  readAnalyticsEvents,
} from "@/lib/analytics-store";

export type { AnalyticsEvent, AnalyticsSummary } from "@/lib/analytics-types";
import type { AnalyticsEvent, AnalyticsSummary } from "@/lib/analytics-types";

export async function readEventsAsync(): Promise<AnalyticsEvent[]> {
  return readAnalyticsEvents();
}

export async function writeEventAsync(event: AnalyticsEvent): Promise<void> {
  await appendAnalyticsEvent(event);
}

export async function writeEventsAsync(batch: AnalyticsEvent[]): Promise<void> {
  await appendAnalyticsEvents(batch);
}

function filterEvents(
  events: AnalyticsEvent[],
  filterPath?: string | null,
  filterPeriod: AnalyticsPeriod = "all",
) {
  let filtered = events;
  if (filterPeriod !== "all") {
    filtered = filtered.filter((event) => eventInPeriod(event.timestamp, filterPeriod));
  }
  if (filterPath) {
    filtered = filtered.filter((event) => event.path === filterPath);
  }
  return filtered;
}

export function buildAnalyticsSummary(
  allEvents: AnalyticsEvent[],
  filterPath?: string | null,
  filterPeriod: AnalyticsPeriod = "all",
): AnalyticsSummary {
  const events = filterEvents(allEvents, filterPath, filterPeriod);
  const periodEvents = filterEvents(allEvents, null, filterPeriod);
  const pageviews = events.filter((e) => e.type === "pageview");
  const sessions = new Set(events.map((e) => e.sessionId));
  const totalDwellMs = getTotalDwellMs(allEvents, filterPath, filterPeriod);

  const pageCounts = new Map<string, number>();
  (filterPath ? pageviews : periodEvents.filter((e) => e.type === "pageview")).forEach((e) => {
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
  const qualityCounts = new Map<string, number>();
  const improvementCounts = new Map<string, { count: number; contentType: string | null }>();
  const contentTypeCounts = new Map<string, number>();
  const reasonCounts = new Map<string, number>();
  const pageScores = new Map<string, { total: number; count: number; contentType: string }>();
  const otherComments: { path: string; comment: string; timestamp: string }[] = [];
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

    const quality = e.metadata?.quality;
    if (quality && typeof quality === "string") {
      qualityCounts.set(quality, (qualityCounts.get(quality) ?? 0) + 1);
    }

    const contentType =
      typeof e.metadata?.contentType === "string"
        ? e.metadata.contentType
        : isArticlePath(e.path)
          ? "article"
          : "case-study";
    contentTypeCounts.set(contentType, (contentTypeCounts.get(contentType) ?? 0) + 1);

    const improvementArea = e.metadata?.improvementArea;
    if (improvementArea && typeof improvementArea === "string") {
      const existing = improvementCounts.get(improvementArea) ?? { count: 0, contentType: null };
      improvementCounts.set(improvementArea, {
        count: existing.count + 1,
        contentType: existing.contentType ?? contentType,
      });
    }

    const improvementOther = e.metadata?.improvementOther;
    if (improvementOther && typeof improvementOther === "string" && improvementOther.trim()) {
      otherComments.push({
        path: e.path,
        comment: improvementOther.trim(),
        timestamp: e.timestamp,
      });
    }

    const reason = e.metadata?.reason;
    if (reason && typeof reason === "string" && reason !== "null") {
      reasonCounts.set(reason, (reasonCounts.get(reason) ?? 0) + 1);
    }

    const existingPage = pageScores.get(e.path) ?? {
      total: 0,
      count: 0,
      contentType,
    };
    if (Number.isFinite(score)) {
      existingPage.total += score;
      existingPage.count += 1;
    }
    pageScores.set(e.path, existingPage);
  });

  const qualityOrder = ["excellent", "strong", "solid", "needs_work", "poor"];
  const byQuality = [...qualityCounts.entries()]
    .sort(
      (a, b) =>
        (qualityOrder.indexOf(a[0]) === -1 ? 99 : qualityOrder.indexOf(a[0])) -
        (qualityOrder.indexOf(b[0]) === -1 ? 99 : qualityOrder.indexOf(b[0])),
    )
    .map(([quality, count]) => ({
      quality,
      label: getQualityLabel(quality),
      count,
    }));

  const byImprovementArea = [...improvementCounts.entries()]
    .sort((a, b) => b[1].count - a[1].count)
    .map(([area, value]) => ({
      area,
      label: getImprovementAreaDisplayLabel(area, value.contentType),
      count: value.count,
    }));

  const byPage = [...pageScores.entries()]
    .filter(([, value]) => value.count > 0)
    .sort((a, b) => b[1].count - a[1].count)
    .map(([pathKey, value]) => ({
      path: pathKey,
      count: value.count,
      averageScore: Math.round((value.total / value.count) * 10) / 10,
      contentType: value.contentType,
    }));

  const dailyCounts = new Map<string, number>();
  pageviews.forEach((e) => {
    const date = e.timestamp.slice(0, 10);
    dailyCounts.set(date, (dailyCounts.get(date) ?? 0) + 1);
  });

  let dailyPageviews = [...dailyCounts.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([date, count]) => ({ date, count }));

  if (filterPeriod === "12m") {
    const monthly = new Map<string, number>();
    dailyPageviews.forEach(({ date, count }) => {
      const key = date.slice(0, 7);
      monthly.set(key, (monthly.get(key) ?? 0) + count);
    });
    dailyPageviews = [...monthly.entries()]
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([date, count]) => ({ date, count }));
  } else if (filterPeriod === "all") {
    dailyPageviews = dailyPageviews.slice(-14);
  } else if (filterPeriod === "24h") {
    dailyPageviews = dailyPageviews.slice(-1);
  }

  return {
    filterPath: filterPath ?? null,
    filterPeriod,
    filterPeriodLabel: getPeriodLabel(filterPeriod),
    paths: getHeatmapPagePaths(allEvents),
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
    hourlyActivity: getHourlyActivity(allEvents, filterPath, filterPeriod),
    eventTypes: getEventTypeBreakdown(allEvents, filterPath, filterPeriod),
    feedback: {
      total: feedbackEvents.length,
      averageScore: scoreCount > 0 ? Math.round((scoreSum / scoreCount) * 10) / 10 : 0,
      byBucket: [...bucketCounts.entries()]
        .sort((a, b) => b[1] - a[1])
        .map(([bucket, count]) => ({ bucket, count })),
      byQuality,
      byImprovementArea,
      byContentType: [...contentTypeCounts.entries()]
        .sort((a, b) => b[1] - a[1])
        .map(([contentType, count]) => ({ contentType, count })),
      byPage,
      otherComments: otherComments.sort((a, b) => b.timestamp.localeCompare(a.timestamp)).slice(0, 20),
      byCaseStudy: byPage
        .filter((row) => row.contentType === "case-study")
        .map(({ path, count, averageScore }) => ({ path, count, averageScore })),
      topReasons: [...reasonCounts.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8)
        .map(([reason, count]) => ({ reason, count })),
    },
    dailyPageviews,
    recentEvents: events.slice(-30).reverse(),
  };
}

export async function getAnalyticsSummary(
  filterPath?: string | null,
  filterPeriod: AnalyticsPeriod = "all",
): Promise<AnalyticsSummary> {
  const allEvents = await readAnalyticsEvents();
  return buildAnalyticsSummary(allEvents, filterPath, filterPeriod);
}
