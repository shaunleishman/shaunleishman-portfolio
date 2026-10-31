/** How long the object URL stays alive after the click. Do not await this. */
const BLOB_URL_LIFETIME_MS = 1000;

/**
 * Start a file save without holding the button on "Preparing…".
 * Revoking the object URL in the same turn as the click drops the download
 * in some browsers. `display: none` does the same, so the anchor stays
 * off-screen until the browser has read the blob.
 */
export function savePdfBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.style.position = "fixed";
  link.style.left = "-9999px";
  document.body.appendChild(link);
  link.click();
  window.setTimeout(() => {
    link.remove();
    URL.revokeObjectURL(url);
  }, BLOB_URL_LIFETIME_MS);
}

/** Prefer the server's Content-Disposition name so the saved file matches the header. */
export function filenameFromContentDisposition(header: string | null, fallback: string) {
  if (!header) return fallback;
  const quoted = /filename="([^"]+)"/i.exec(header);
  if (quoted?.[1]) return quoted[1];
  const plain = /filename=([^;]+)/i.exec(header);
  const value = plain?.[1]?.trim();
  return value || fallback;
}
