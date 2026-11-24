/**
 * Start a PDF save from a same-origin response.
 * The object URL and the off-screen anchor stay for BLOB_URL_LIFETIME_MS.
 * Do not revoke in the same turn as the click, do not await that timer,
 * and do not use display:none. Waiting would hold the button on "Preparing…".
 * Repeat clicks while a save is running share the same request.
 */

const BLOB_URL_LIFETIME_MS = 1000;

const inflight = new Map<string, Promise<void>>();

function filenameFromContentDisposition(header: string | null) {
  if (!header) return null;
  const encoded = /filename\*=UTF-8''([^;]+)/i.exec(header);
  if (encoded?.[1]) {
    try {
      return decodeURIComponent(encoded[1].trim());
    } catch {
      return null;
    }
  }
  const quoted = /filename="([^"]+)"/i.exec(header);
  if (quoted?.[1]) return quoted[1];
  const bare = /filename=([^;]+)/i.exec(header);
  return bare?.[1]?.trim() || null;
}

async function fetchAndSave(path: string) {
  const response = await fetch(path, { cache: "no-store" });
  if (!response.ok) {
    throw new Error("PDF generation failed");
  }

  const filename = filenameFromContentDisposition(response.headers.get("Content-Disposition"));
  if (!filename) {
    throw new Error("PDF generation failed");
  }

  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.tabIndex = -1;
  link.setAttribute("aria-hidden", "true");
  link.style.position = "fixed";
  link.style.left = "-9999px";
  document.body.appendChild(link);
  link.click();
  window.setTimeout(() => {
    link.remove();
    URL.revokeObjectURL(url);
  }, BLOB_URL_LIFETIME_MS);
}

export function savePdfBlob(path: string) {
  const existing = inflight.get(path);
  if (existing) return existing;

  const pending = fetchAndSave(path).finally(() => {
    inflight.delete(path);
  });
  inflight.set(path, pending);
  return pending;
}
