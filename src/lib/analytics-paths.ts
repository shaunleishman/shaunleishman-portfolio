export function isProjectPath(path: string): boolean {
  return path.startsWith("/work/") && path.length > "/work/".length;
}

export function isArticlePath(path: string): boolean {
  return path.startsWith("/blog/") && path.length > "/blog/".length;
}

export function slugFromPath(path: string, prefix: "/work/" | "/blog/"): string {
  return path.slice(prefix.length);
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
