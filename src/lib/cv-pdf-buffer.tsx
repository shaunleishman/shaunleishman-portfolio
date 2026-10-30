import { renderToBuffer } from "@react-pdf/renderer";
import { CvPdfDocument } from "@/components/cv/CvPdfDocument";
import { cvContent } from "@/content/cv";
import { siteConfig } from "@/content/projects";

/**
 * The PDF bytes do not include the month in the filename, but they do include
 * the quote and wordmark. Stamp those with the CV copy so a content edit
 * cannot keep serving the previous render from this process.
 */
function cvPdfStamp() {
  return JSON.stringify({
    content: cvContent,
    name: siteConfig.name,
    quote: siteConfig.quote,
    brand: siteConfig.brand,
  });
}

let cached: { stamp: string; buffer: Buffer } | null = null;
let pending: { stamp: string; promise: Promise<Buffer> } | null = null;

export function getCvPdfBuffer(): Promise<Buffer> {
  const stamp = cvPdfStamp();

  if (cached?.stamp === stamp) {
    return Promise.resolve(cached.buffer);
  }

  if (pending?.stamp === stamp) {
    return pending.promise;
  }

  const promise = renderToBuffer(<CvPdfDocument content={cvContent} />)
    .then((buffer) => {
      const copy = Buffer.from(buffer);
      cached = { stamp, buffer: copy };
      return copy;
    })
    .finally(() => {
      if (pending?.promise === promise) {
        pending = null;
      }
    });

  pending = { stamp, promise };
  return promise;
}
