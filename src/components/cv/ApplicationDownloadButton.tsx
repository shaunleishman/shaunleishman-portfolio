"use client";

import { Download, FileText, X } from "lucide-react";
import { useCallback, useEffect, useId, useState, type MouseEvent } from "react";
import { downloadApplicationCvPdf } from "@/components/cv/downloadApplicationCvPdf";
import { downloadCoverLetterPdf } from "@/components/cv/downloadCoverLetterPdf";
import {
  getAvailableDocuments,
  type Application,
  type ApplicationDocumentKind,
} from "@/content/applications";
import { cn } from "@/lib/utils";

type ApplicationDownloadButtonProps = {
  application: Application;
  className?: string;
};

type PreparingKind = ApplicationDocumentKind | "primary" | null;

const DOC_LABELS: Record<ApplicationDocumentKind, string> = {
  cv: "CV",
  "cover-letter": "Cover letter",
};

async function downloadDocument(kind: ApplicationDocumentKind, slug: string) {
  if (kind === "cv") {
    await downloadApplicationCvPdf(slug);
    return;
  }
  await downloadCoverLetterPdf(slug);
}

export function ApplicationDownloadButton({
  application,
  className,
}: ApplicationDownloadButtonProps) {
  const docs = getAvailableDocuments(application);
  const [modalOpen, setModalOpen] = useState(false);
  const [preparing, setPreparing] = useState<PreparingKind>(null);
  const titleId = useId();

  const runDownload = useCallback(
    async (kind: ApplicationDocumentKind, preparingKey: PreparingKind = kind) => {
      setPreparing(preparingKey);
      try {
        await downloadDocument(kind, application.slug);
      } finally {
        setPreparing(null);
      }
    },
    [application.slug],
  );

  const handlePrimaryClick = useCallback(
    async (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      event.stopPropagation();
      if (docs.length === 0) return;
      if (docs.length === 1) {
        await runDownload(docs[0], "primary");
        return;
      }
      setModalOpen(true);
    },
    [docs, runDownload],
  );

  useEffect(() => {
    if (!modalOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setModalOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [modalOpen]);

  if (docs.length === 0) {
    return null;
  }

  const primaryBusy = preparing === "primary";

  return (
    <>
      <button
        type="button"
        onClick={(event) => void handlePrimaryClick(event)}
        disabled={primaryBusy}
        aria-busy={primaryBusy}
        aria-haspopup={docs.length > 1 ? "dialog" : undefined}
        className={cn(
          "inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2 rounded-full border border-[var(--color-border)] bg-white text-body-sm font-medium text-[var(--color-text-secondary)] transition-colors",
          primaryBusy
            ? "cursor-wait opacity-70"
            : "hover:border-[var(--color-accent)]/40 hover:text-[var(--color-accent)]",
          className,
        )}
      >
        <Download className="size-4 shrink-0" aria-hidden />
        {primaryBusy ? "Preparing PDF…" : "Download"}
      </button>

      {modalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="presentation">
          <button
            type="button"
            aria-label="Close dialog"
            className="absolute inset-0 bg-black/40"
            onClick={() => setModalOpen(false)}
          />
          <div
            className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white shadow-lg"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3 border-b border-[var(--color-border)] px-5 py-4">
              <div className="min-w-0">
                <h2
                  id={titleId}
                  className="text-h4 font-semibold text-[var(--color-text-primary)]"
                >
                  Download files
                </h2>
                <p className="mt-1 text-body-sm text-[var(--color-text-muted)]">
                  {application.jobTitle} at {application.company}. Pick each file you want.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="inline-flex size-10 shrink-0 items-center justify-center rounded-full text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-bg)] hover:text-[var(--color-text-primary)]"
                aria-label="Close"
              >
                <X className="size-4" aria-hidden />
              </button>
            </div>

            <ul className="space-y-3 p-5">
              {docs.map((kind) => {
                const busy = preparing === kind;
                return (
                  <li
                    key={kind}
                    className="flex items-center justify-between gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)]/60 px-4 py-3"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-white text-[var(--color-accent)]">
                        <FileText className="size-4" aria-hidden />
                      </span>
                      <div className="min-w-0">
                        <p className="text-body-sm font-medium text-[var(--color-text-primary)]">
                          {DOC_LABELS[kind]}
                        </p>
                        <p className="text-label text-[var(--color-text-muted)]">PDF</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => void runDownload(kind)}
                      disabled={busy}
                      aria-busy={busy}
                      className={cn(
                        "inline-flex shrink-0 items-center justify-center gap-2 min-h-[40px] px-3.5 py-1.5 rounded-full border border-[var(--color-border)] bg-white text-body-sm font-medium text-[var(--color-text-secondary)] transition-colors",
                        busy
                          ? "cursor-wait opacity-70"
                          : "hover:border-[var(--color-accent)]/40 hover:text-[var(--color-accent)]",
                      )}
                    >
                      <Download className="size-3.5 shrink-0" aria-hidden />
                      {busy ? "Preparing…" : "Download"}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      ) : null}
    </>
  );
}
