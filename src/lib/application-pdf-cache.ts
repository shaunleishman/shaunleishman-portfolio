/**
 * In-process PDF buffer cache for application packs.
 *
 * The stamp must include every field drawn into the document, including
 * `siteConfig.quote` on tailored CVs. The download filename's month is not
 * part of the PDF body, so callers still build Content-Disposition per request.
 * A failed render is evicted so the next request can try again.
 */

const pdfBuffers = new Map<string, Promise<Buffer>>();

export function getCachedPdfBuffer(
  stamp: string,
  render: () => Promise<Buffer>,
): Promise<Buffer> {
  const cached = pdfBuffers.get(stamp);
  if (cached) return cached;

  const pending = Promise.resolve()
    .then(render)
    .catch((error: unknown) => {
      pdfBuffers.delete(stamp);
      throw error;
    });
  pdfBuffers.set(stamp, pending);
  return pending;
}
