export function normalizeAnalyticsPath(path: string): string {
  if (path.length > 1 && path.endsWith("/")) {
    return path.slice(0, -1);
  }
  return path;
}

export function isProjectPath(path: string): boolean {
  const normalized = normalizeAnalyticsPath(path);
  return normalized.startsWith("/work/") && normalized.length > "/work/".length;
}

export function isArticlePath(path: string): boolean {
  const normalized = normalizeAnalyticsPath(path);
  return normalized.startsWith("/blog/") && normalized.length > "/blog/".length;
}

export function slugFromPath(path: string, prefix: "/work/" | "/blog/"): string {
  return normalizeAnalyticsPath(path).slice(prefix.length);
}

export function formatPathLabel(path: string): string {
  if (isProjectPath(path)) {
    return slugFromPath(path, "/work/")
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  }
  if (isArticlePath(path)) {
    return slugFromPath(path, "/blog/")
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  }
  return path;
}
