import { renderToBuffer } from "@react-pdf/renderer";
import { CvPdfDocument } from "@/components/cv/CvPdfDocument";
import { cvContent } from "@/content/cv";
import { siteConfig } from "@/content/projects";

/**
 * One rendered portfolio CV per process. The filename month is read on
 * each response and is not part of this stamp. A failed render is not stored.
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

export function getCvPdfBuffer() {
  const stamp = cvPdfStamp();
  if (cached?.stamp === stamp) return Promise.resolve(cached.buffer);
  if (pending?.stamp === stamp) return pending.promise;

  const promise = renderToBuffer(<CvPdfDocument />)
    .then((buffer) => {
      cached = { stamp, buffer };
      return buffer;
    })
    .finally(() => {
      if (pending?.promise === promise) pending = null;
    });

  pending = { stamp, promise };
  return promise;
}
