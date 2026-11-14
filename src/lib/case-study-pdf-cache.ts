import { createHash } from "node:crypto";
import { Font } from "@react-pdf/renderer";
import { siteConfig } from "@/content/projects";
import type { HeuristicEvaluation } from "@/content/heuristic-evaluations/types";
import type { CaseStudyDownloadKind } from "@/lib/case-study-download";

type CacheEntry = {
  stamp: string;
  buffer: Buffer;
};

const cache = new Map<string, CacheEntry>();
const inflight = new Map<string, { stamp: string; promise: Promise<Buffer> }>();
const latestStamp = new Map<string, string>();
const stampByEvaluation = new WeakMap<HeuristicEvaluation, Map<CaseStudyDownloadKind, string>>();

let renderQueue: Promise<void> = Promise.resolve();

/** Keep each word intact. Same callback the documents used to register at import. */
const wholeWord = (word: string) => [word];

/**
 * Stamp covers everything that changes the PDF bytes: the evaluation, which
 * file is being built, and the site fields printed in the footer and title.
 * The stamp is memoized per evaluation object. A content edit replaces that
 * object, so the next request renders again.
 */
function stampFor(kind: CaseStudyDownloadKind, evaluation: HeuristicEvaluation): string {
  let byKind = stampByEvaluation.get(evaluation);
  const cached = byKind?.get(kind);
  if (cached) return cached;

  const stamp = createHash("sha256")
    .update(kind)
    .update("\0")
    .update(siteConfig.name)
    .update("\0")
    .update(siteConfig.brand)
    .update("\0")
    .update(siteConfig.domain)
    .update("\0")
    .update(siteConfig.siteUrl)
    .update("\0")
    .update(JSON.stringify(evaluation))
    .digest("hex");

  if (!byKind) {
    byKind = new Map();
    stampByEvaluation.set(evaluation, byKind);
  }
  byKind.set(kind, stamp);
  return stamp;
}

/**
 * `Font.registerHyphenationCallback` is process-wide. Register the whole-word
 * callback only while this document lays out, then put the previous callback
 * back — including `null`, which is the built-in hyphenation other PDFs use.
 * Renders run one at a time so a CV render cannot start in the middle.
 */
function renderWithWholeWords(render: () => Promise<Buffer>): Promise<Buffer> {
  const run = renderQueue.then(async () => {
    const previous = Font.getHyphenationCallback();
    Font.registerHyphenationCallback(wholeWord);
    try {
      return await render();
    } finally {
      Font.hyphenationCallback = previous;
    }
  });

  renderQueue = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

/**
 * Reuse one rendered buffer per process for a case study PDF or deck.
 * The returned buffer is shared. Callers must copy it into the response.
 * A failed render is not stored.
 */
export function getCachedCaseStudyPdf(
  kind: CaseStudyDownloadKind,
  evaluation: HeuristicEvaluation,
  render: () => Promise<Buffer>,
): Promise<Buffer> {
  const key = `${kind}:${evaluation.slug}`;
  const stamp = stampFor(kind, evaluation);
  latestStamp.set(key, stamp);

  const hit = cache.get(key);
  if (hit?.stamp === stamp) return Promise.resolve(hit.buffer);

  const pending = inflight.get(key);
  if (pending?.stamp === stamp) return pending.promise;

  const promise = renderWithWholeWords(render).then(
    (buffer) => {
      if (inflight.get(key)?.promise === promise) inflight.delete(key);
      if (latestStamp.get(key) === stamp) cache.set(key, { stamp, buffer });
      return buffer;
    },
    (error: unknown) => {
      if (inflight.get(key)?.promise === promise) inflight.delete(key);
      throw error;
    },
  );

  inflight.set(key, { stamp, promise });
  return promise;
}
