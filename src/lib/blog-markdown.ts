/**
 * Inline markdown used by article body copy.
 *
 * Supported: `**bold**` and `[label](href)` for site-relative paths, hashes,
 * http(s), and mailto. Anything else is shown as text. Markup is escaped
 * before it is wrapped, and the link target is escaped once so an ampersand
 * in the URL is not turned into `&amp;amp;`.
 */
const INLINE_MARKDOWN = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function isSafeHref(href: string) {
  return (
    href.startsWith("/") ||
    href.startsWith("#") ||
    href.startsWith("https://") ||
    href.startsWith("http://") ||
    href.startsWith("mailto:")
  );
}

export function renderInlineHtml(raw: string): string {
  INLINE_MARKDOWN.lastIndex = 0;
  let html = "";
  let last = 0;

  for (const match of raw.matchAll(INLINE_MARKDOWN)) {
    const index = match.index ?? 0;
    html += escapeHtml(raw.slice(last, index));

    if (match[1] !== undefined) {
      html += `<strong>${escapeHtml(match[1])}</strong>`;
    } else {
      const label = match[2] ?? "";
      const href = match[3] ?? "";
      if (!isSafeHref(href)) {
        html += escapeHtml(label);
      } else {
        html += `<a href="${escapeHtml(href)}" class="text-[var(--color-accent)] hover:underline" rel="noopener noreferrer">${escapeHtml(label)}</a>`;
      }
    }

    last = index + match[0].length;
  }

  html += escapeHtml(raw.slice(last));
  return html;
}
