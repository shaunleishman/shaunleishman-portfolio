import { NextResponse } from "next/server";
import type { HeuristicEvaluation } from "@/content/heuristic-evaluations/types";
import { caseStudyDownloadFilename, type CaseStudyDownloadKind } from "@/lib/case-study-report";

const MAX_CACHED_PDFS = 12;

type CachedPdf = {
  etag: string;
  body: Uint8Array;
};

const renderedPdfs = new Map<string, CachedPdf>();

/**
 * Case study PDFs are static for a process. Repeat downloads reuse the buffer
 * instead of running react-pdf again. The key includes a content hash, so an
 * edited study renders again without a restart.
 */
export async function respondWithCaseStudyPdf({
  request,
  kind,
  evaluation,
  render,
  errorMessage,
}: {
  request: Request;
  kind: CaseStudyDownloadKind;
  evaluation: HeuristicEvaluation;
  render: () => Promise<Buffer>;
  errorMessage: string;
}): Promise<NextResponse> {
  const filename = caseStudyDownloadFilename(evaluation.slug, kind);
  const key = `${kind}:${evaluation.slug}:${fingerprint(evaluation)}`;
  let cached = renderedPdfs.get(key);

  if (!cached) {
    try {
      const body = new Uint8Array(await render());
      cached = { etag: `W/"${key}"`, body };
      renderedPdfs.set(key, cached);
      while (renderedPdfs.size > MAX_CACHED_PDFS) {
        const oldest = renderedPdfs.keys().next().value;
        if (oldest === undefined) break;
        renderedPdfs.delete(oldest);
      }
    } catch {
      return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
  } else {
    renderedPdfs.delete(key);
    renderedPdfs.set(key, cached);
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/pdf",
    "Content-Disposition": `attachment; filename="${filename}"`,
    "Cache-Control": "private, no-cache",
    ETag: cached.etag,
  };

  if (request.headers.get("if-none-match") === cached.etag) {
    return new NextResponse(null, { status: 304, headers });
  }

  headers["Content-Length"] = String(cached.body.byteLength);
  return new NextResponse(Buffer.from(cached.body), { headers });
}

function fingerprint(evaluation: HeuristicEvaluation): string {
  const json = JSON.stringify(evaluation);
  let hash = 5381;
  for (let i = 0; i < json.length; i += 1) {
    hash = (hash * 33) ^ json.charCodeAt(i);
  }
  return (hash >>> 0).toString(36);
}
