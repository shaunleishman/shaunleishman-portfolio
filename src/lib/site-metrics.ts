import { getAllPosts } from "@/lib/blog";
import { projects } from "@/content/projects";
import { readEvents, type AnalyticsEvent } from "@/lib/analytics";
import {
  type AnalyticsPeriod,
  eventInPeriod,
  getPeriodLabel,
  METRICS_HOME_PERIOD,
} from "@/lib/analytics-period";
import { formatPathLabel, isArticlePath, isProjectPath, slugFromPath } from "@/lib/analytics-paths";
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

function filterByPeriod(events: AnalyticsEvent[], period: AnalyticsPeriod): AnalyticsEvent[] {
  if (period === "all") return events;
  return events.filter((e) => eventInPeriod(e.timestamp, period));
}

function countPageviews(events: AnalyticsEvent[], matcher: (path: string) => boolean): number {
  return events.filter((e) => e.type === "pageview" && matcher(e.path)).length;
}

function buildContentCatalog(): { projects: ContentRow[]; articles: ContentRow[] } {
  const projectRows: ContentRow[] = projects.map((p, index) => ({
    path: `/work/${p.slug}`,
    slug: p.slug,
    title: p.title,
    views: 0,
    listeners: 0,
    likes: 0,
    shares: 0,
    sortDate: String(1000 - index),
  }));

  const articleRows: ContentRow[] = getAllPosts().map((post) => ({
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

function applyEventStats(rows: Map<string, ContentRow>, events: AnalyticsEvent[]) {
  const listenersByPath = new Map<string, Set<string>>();

  events.forEach((event) => {
    if (event.type === "pageview") {
      const row = rows.get(event.path);
      if (row) row.views += 1;
      const set = listenersByPath.get(event.path) ?? new Set();
      set.add(event.sessionId);
      listenersByPath.set(event.path, set);
    }
    if (event.type === "blog_like") {
      const row = rows.get(event.path);
      if (row) row.likes += 1;
    }
    if (event.type === "blog_share") {
      const row = rows.get(event.path);
      if (row) row.shares += 1;
    }
  });

  listenersByPath.forEach((sessions, path) => {
    const row = rows.get(path);
    if (row) row.listeners = sessions.size;
  });
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
  if (period === "12m" || period === "all") return timestamp.slice(0, 7);
  return timestamp.slice(0, 10);
}

function buildTrend(events: AnalyticsEvent[], period: AnalyticsPeriod): TimeSeriesPoint[] {
  const counts = new Map<string, number>();
  events
    .filter((e) => e.type === "pageview")
    .forEach((e) => {
      const key = bucketKey(e.timestamp, period);
      counts.set(key, (counts.get(key) ?? 0) + 1);
    });

  return [...counts.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([date, value]) => ({ date, value }));
}

function getActiveVisitors(allEvents: AnalyticsEvent[], now = new Date()): ActiveVisitor[] {
  const cutoff = now.getTime() - ACTIVE_WINDOW_MS;
  const latestBySession = new Map<string, AnalyticsEvent>();

  allEvents.forEach((event) => {
    const ts = new Date(event.timestamp).getTime();
    if (ts < cutoff) return;
    const existing = latestBySession.get(event.sessionId);
    if (!existing || ts > new Date(existing.timestamp).getTime()) {
      latestBySession.set(event.sessionId, event);
    }
  });

  return [...latestBySession.values()]
    .map((event) => ({
      sessionId: event.sessionId,
      path: event.path,
      lastSeen: event.timestamp,
    }))
    .sort((a, b) => b.lastSeen.localeCompare(a.lastSeen));
}

function computeAudienceSeries(
  events: AnalyticsEvent[],
  period: AnalyticsPeriod,
  metric: AudienceMetricKey,
): { series: TimeSeriesPoint[]; summary: number } {
  const buckets = new Map<string, { pageviews: number; sessions: Set<string>; projectViews: number; articleViews: number; shares: number }>();

  const ensure = (key: string) => {
    if (!buckets.has(key)) {
      buckets.set(key, {
        pageviews: 0,
        sessions: new Set(),
        projectViews: 0,
        articleViews: 0,
        shares: 0,
      });
    }
    return buckets.get(key)!;
  };

  events.forEach((event) => {
    const key = bucketKey(event.timestamp, period);
    const bucket = ensure(key);
    bucket.sessions.add(event.sessionId);

    if (event.type === "pageview") {
      bucket.pageviews += 1;
      if (isProjectPath(event.path)) bucket.projectViews += 1;
      if (isArticlePath(event.path)) bucket.articleViews += 1;
    }
    if (event.type === "blog_share") bucket.shares += 1;
  });

  const series = [...buckets.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([date, bucket]) => {
      let value = 0;
      switch (metric) {
        case "active_viewers":
          value = bucket.sessions.size;
          break;
        case "project_views":
          value = bucket.projectViews;
          break;
        case "article_views":
          value = bucket.articleViews;
          break;
        case "views_per_viewer":
          value =
            bucket.sessions.size > 0 ? Math.round((bucket.pageviews / bucket.sessions.size) * 10) / 10 : 0;
          break;
        case "shares":
          value = bucket.shares;
          break;
      }
      return { date, value };
    });

  const sessions = new Set(events.map((e) => e.sessionId));
  const pageviews = events.filter((e) => e.type === "pageview").length;
  const projectViews = events.filter((e) => e.type === "pageview" && isProjectPath(e.path)).length;
  const articleViews = events.filter((e) => e.type === "pageview" && isArticlePath(e.path)).length;
  const shares = events.filter((e) => e.type === "blog_share").length;

  let summary = 0;
  switch (metric) {
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
      summary = shares;
      break;
  }

  return { series, summary };
}

export function getAnalyticsDashboard(options: {
  period?: AnalyticsPeriod;
  contentSort?: ContentSortKey;
  audienceMetric?: AudienceMetricKey;
}): AnalyticsDashboard {
  const period = options.period ?? METRICS_HOME_PERIOD;
  const contentSort = options.contentSort ?? "views";
  const audienceMetric = options.audienceMetric ?? "active_viewers";

  const allEvents = readEvents();
  const events = filterByPeriod(allEvents, period);
  const sessions = new Set(events.map((e) => e.sessionId));
  const feedbackSubmissions = events.filter((e) => e.type === "click" && e.metadata?.feedback).length;

  const catalog = buildContentCatalog();
  const rowMap = new Map<string, ContentRow>();
  [...catalog.projects, ...catalog.articles].forEach((row) => rowMap.set(row.path, { ...row }));

  applyEventStats(rowMap, events);

  const unknownProjects = new Map<string, ContentRow>();
  const unknownArticles = new Map<string, ContentRow>();

  events.forEach((event) => {
    if (event.type !== "pageview" && event.type !== "blog_like" && event.type !== "blog_share") return;
    const path = event.path;
    if (isProjectPath(path) && !rowMap.has(path)) {
      const slug = slugFromPath(path, "/work/");
      if (!unknownProjects.has(path)) {
        unknownProjects.set(path, {
          path,
          slug,
          title: formatPathLabel(path),
          views: 0,
          listeners: 0,
          likes: 0,
          shares: 0,
          sortDate: "0",
        });
      }
    }
    if (isArticlePath(path) && !rowMap.has(path)) {
      if (!unknownArticles.has(path)) {
        unknownArticles.set(path, {
          path,
          slug: slugFromPath(path, "/blog/"),
          title: formatPathLabel(path),
          views: 0,
          listeners: 0,
          likes: 0,
          shares: 0,
          sortDate: "0",
        });
      }
    }
  });

  applyEventStats(unknownProjects, events);
  applyEventStats(unknownArticles, events);

  const projectRows = sortContentRows(
    [...catalog.projects, ...unknownProjects.values()],
    contentSort,
  );
  const articleRows = sortContentRows(
    [...catalog.articles, ...unknownArticles.values()],
    contentSort,
  );

  const audience = computeAudienceSeries(events, period, audienceMetric);
  const activeVisitors = getActiveVisitors(allEvents);

  return {
    period,
    periodLabel: getPeriodLabel(period),
    overview: {
      pageviews: events.filter((e) => e.type === "pageview").length,
      uniqueSessions: sessions.size,
      projectViews: countPageviews(events, isProjectPath),
      articleViews: countPageviews(events, isArticlePath),
      blogLikes: events.filter((e) => e.type === "blog_like").length,
      blogShares: events.filter((e) => e.type === "blog_share").length,
      cvViews: countPageviews(events, (p) => p === "/cv" || p.startsWith("/cv")),
      contactViews: countPageviews(events, (p) => p === "/contact"),
      feedbackSubmissions,
    },
    activeNow: {
      count: activeVisitors.length,
      visitors: activeVisitors.slice(0, 8),
    },
    topProjects: sortContentRows(projectRows, "views").slice(0, 5),
    topArticles: sortContentRows(articleRows, "views").slice(0, 5),
    trend: buildTrend(events, period),
    content: { projects: projectRows, articles: articleRows },
    audience: {
      metric: audienceMetric,
      metricLabel: getAudienceMetricLabel(audienceMetric),
      series: audience.series,
      summary: audience.summary,
    },
  };
}
