import { listPublishedPosts } from "@/lib/blog";
import { projects } from "@/content/projects";
import { readAnalyticsEvents } from "@/lib/analytics-store";
import type { AnalyticsEvent } from "@/lib/analytics-types";
import {
  type AnalyticsPeriod,
  getPeriodLabel,
  getPeriodStart,
  METRICS_HOME_PERIOD,
} from "@/lib/analytics-period";
import { formatPathLabel, isArticlePath, isProjectPath, normalizeAnalyticsPath, slugFromPath } from "@/lib/analytics-paths";
import {
  type ActiveVisitor,
  type AnalyticsDashboard,
  type AudienceMetricKey,
  type ContentRow,
  type ContentSortKey,
  getAudienceMetricLabel,
  type TimeSeriesPoint,
} from "@/lib/analytics-metrics-types";

const ACTIVE_WINDOW_MS = 5 * 60 * 1000;

/** Fixed width so catalog order sorts as text. "999" would otherwise rank above "1000". */
function projectCatalogSortKey(index: number): string {
  return String(1_000_000 - index).padStart(7, "0");
}

function buildContentCatalog(): { projects: ContentRow[]; articles: ContentRow[] } {
  const projectRows: ContentRow[] = projects.map((project, index) => ({
    path: `/work/${project.slug}`,
    slug: project.slug,
    title: project.title,
    views: 0,
    listeners: 0,
    likes: 0,
    shares: 0,
    sortDate: projectCatalogSortKey(index),
  }));

  const articleRows: ContentRow[] = listPublishedPosts().map((post) => ({
    path: `/blog/${post.slug}`,
    slug: post.slug,
    title: post.title,
    views: 0,
    listeners: 0,
    likes: 0,
    shares: 0,
    sortDate: post.date,
  }));

  return { projects: projectRows, articles: articleRows };
}

function unknownContentRow(path: string, prefix: "/work/" | "/blog/"): ContentRow {
  return {
    path,
    slug: slugFromPath(path, prefix),
    title: formatPathLabel(path),
    views: 0,
    listeners: 0,
    likes: 0,
    shares: 0,
    sortDate: "0",
  };
}

function sortContentRows(rows: ContentRow[], sort: ContentSortKey): ContentRow[] {
  const sorted = [...rows];
  switch (sort) {
    case "listeners":
      return sorted.sort((a, b) => b.listeners - a.listeners || b.views - a.views);
    case "likes":
      return sorted.sort((a, b) => b.likes - a.likes || b.views - a.views);
    case "shares":
      return sorted.sort((a, b) => b.shares - a.shares || b.views - a.views);
    case "date":
      return sorted.sort((a, b) => b.sortDate.localeCompare(a.sortDate));
    default:
      return sorted.sort((a, b) => b.views - a.views || b.listeners - a.listeners);
  }
}

function bucketKey(timestamp: string, period: AnalyticsPeriod): string {
  if (period === "24h") return timestamp.slice(0, 13);
  if (period === "12m") return timestamp.slice(0, 7);
  return timestamp.slice(0, 10);
}

type AudienceBucket = {
  pageviews: number;
  sessions: Set<string>;
  projectViews: number;
  articleViews: number;
  shares: number;
};

function audienceValue(bucket: AudienceBucket, metric: AudienceMetricKey): number {
  switch (metric) {
    case "active_viewers":
      return bucket.sessions.size;
    case "project_views":
      return bucket.projectViews;
    case "article_views":
      return bucket.articleViews;
    case "views_per_viewer":
      return bucket.sessions.size > 0
        ? Math.round((bucket.pageviews / bucket.sessions.size) * 10) / 10
        : 0;
    case "shares":
      return bucket.shares;
  }
}

export function buildAnalyticsDashboard(
  allEvents: AnalyticsEvent[],
  options: {
    period?: AnalyticsPeriod;
    contentSort?: ContentSortKey;
    audienceMetric?: AudienceMetricKey;
  } = {},
  now: Date = new Date(),
): AnalyticsDashboard {
  const period = options.period ?? METRICS_HOME_PERIOD;
  const contentSort = options.contentSort ?? "views";
  const audienceMetric = options.audienceMetric ?? "active_viewers";
  const periodStartIso = getPeriodStart(period, now).toISOString();
  const activeCutoff = now.getTime() - ACTIVE_WINDOW_MS;

  const catalog = buildContentCatalog();
  const rowMap = new Map<string, ContentRow>();
  for (const row of [...catalog.projects, ...catalog.articles]) {
    rowMap.set(row.path, { ...row });
  }

  const unknownProjects = new Map<string, ContentRow>();
  const unknownArticles = new Map<string, ContentRow>();
  const listenersByPath = new Map<string, Set<string>>();
  const audienceBuckets = new Map<string, AudienceBucket>();
  const trendCounts = new Map<string, number>();
  const sessions = new Set<string>();
  const latestBySession = new Map<string, AnalyticsEvent>();

  let pageviews = 0;
  let projectViews = 0;
  let articleViews = 0;
  let blogLikes = 0;
  let blogShares = 0;
  let cvViews = 0;
  let contactViews = 0;
  let feedbackSubmissions = 0;
  let lastSeen: string | null = null;

  const contentRow = (path: string): ContentRow | undefined => {
    const known = rowMap.get(path);
    if (known) return known;
    if (isProjectPath(path)) {
      let row = unknownProjects.get(path);
      if (!row) {
        row = unknownContentRow(path, "/work/");
        unknownProjects.set(path, row);
      }
      return row;
    }
    if (isArticlePath(path)) {
      let row = unknownArticles.get(path);
      if (!row) {
        row = unknownContentRow(path, "/blog/");
        unknownArticles.set(path, row);
      }
      return row;
    }
    return undefined;
  };

  for (const event of allEvents) {
    if (lastSeen === null || event.timestamp > lastSeen) lastSeen = event.timestamp;

    const seenAt = new Date(event.timestamp).getTime();
    // A non-numeric timestamp is not less than the cutoff, so it still counts as active.
    if (!(seenAt < activeCutoff)) {
      const existing = latestBySession.get(event.sessionId);
      if (!existing || seenAt > new Date(existing.timestamp).getTime()) {
        latestBySession.set(event.sessionId, event);
      }
    }

    if (event.timestamp < periodStartIso) continue;

    sessions.add(event.sessionId);
    const path = normalizeAnalyticsPath(event.path);
    const key = bucketKey(event.timestamp, period);
    let audience = audienceBuckets.get(key);
    if (!audience) {
      audience = {
        pageviews: 0,
        sessions: new Set(),
        projectViews: 0,
        articleViews: 0,
        shares: 0,
      };
      audienceBuckets.set(key, audience);
    }
    audience.sessions.add(event.sessionId);

    if (event.type === "pageview") {
      pageviews += 1;
      trendCounts.set(key, (trendCounts.get(key) ?? 0) + 1);
      audience.pageviews += 1;
      if (isProjectPath(path)) {
        projectViews += 1;
        audience.projectViews += 1;
      }
      if (isArticlePath(path)) {
        articleViews += 1;
        audience.articleViews += 1;
      }
      if (path === "/cv" || path.startsWith("/cv")) cvViews += 1;
      if (path === "/contact") contactViews += 1;

      const row = contentRow(path);
      if (row) row.views += 1;
      const listeners = listenersByPath.get(path) ?? new Set<string>();
      listeners.add(event.sessionId);
      listenersByPath.set(path, listeners);
    } else if (event.type === "blog_like") {
      blogLikes += 1;
      const row = contentRow(path);
      if (row) row.likes += 1;
    } else if (event.type === "blog_share") {
      blogShares += 1;
      audience.shares += 1;
      const row = contentRow(path);
      if (row) row.shares += 1;
    } else if (event.type === "click" && event.metadata?.feedback) {
      feedbackSubmissions += 1;
    }
  }

  const applyListeners = (rows: Map<string, ContentRow>) => {
    listenersByPath.forEach((listenerSessions, path) => {
      const row = rows.get(path);
      if (row) row.listeners = listenerSessions.size;
    });
  };
  applyListeners(rowMap);
  applyListeners(unknownProjects);
  applyListeners(unknownArticles);

  const projectRows = sortContentRows(
    [...catalog.projects.map((row) => rowMap.get(row.path)!), ...unknownProjects.values()],
    contentSort,
  );
  const articleRows = sortContentRows(
    [...catalog.articles.map((row) => rowMap.get(row.path)!), ...unknownArticles.values()],
    contentSort,
  );

  const activeVisitors: ActiveVisitor[] = [...latestBySession.values()]
    .map((event) => ({
      sessionId: event.sessionId,
      path: event.path,
      lastSeen: event.timestamp,
    }))
    .sort((a, b) => b.lastSeen.localeCompare(a.lastSeen));

  const trend: TimeSeriesPoint[] = [...trendCounts.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([date, value]) => ({ date, value }));

  const series = [...audienceBuckets.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([date, bucket]) => ({ date, value: audienceValue(bucket, audienceMetric) }));

  let summary = 0;
  switch (audienceMetric) {
    case "active_viewers":
      summary = sessions.size;
      break;
    case "project_views":
      summary = projectViews;
      break;
    case "article_views":
      summary = articleViews;
      break;
    case "views_per_viewer":
      summary = sessions.size > 0 ? Math.round((pageviews / sessions.size) * 10) / 10 : 0;
      break;
    case "shares":
      summary = blogShares;
      break;
  }

  return {
    period,
    periodLabel: getPeriodLabel(period),
    overview: {
      pageviews,
      uniqueSessions: sessions.size,
      projectViews,
      articleViews,
      blogLikes,
      blogShares,
      cvViews,
      contactViews,
      feedbackSubmissions,
    },
    activeNow: {
      count: activeVisitors.length,
      visitors: activeVisitors.slice(0, 8),
      lastSeen,
    },
    topProjects: sortContentRows(projectRows, "views").slice(0, 5),
    topArticles: sortContentRows(articleRows, "views").slice(0, 5),
    trend,
    content: { projects: projectRows, articles: articleRows },
    audience: {
      metric: audienceMetric,
      metricLabel: getAudienceMetricLabel(audienceMetric),
      series,
      summary,
    },
  };
}

export async function getAnalyticsDashboard(options: {
  period?: AnalyticsPeriod;
  contentSort?: ContentSortKey;
  audienceMetric?: AudienceMetricKey;
}): Promise<AnalyticsDashboard> {
  return buildAnalyticsDashboard(await readAnalyticsEvents(), options);
}
