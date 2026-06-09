"use client";

import { useId, useMemo, useRef, useState } from "react";
import Modal, { ModalBody, ModalDropZone, UploadStatus } from "../../../imports/Modal";
import Notification from "../../../imports/Notification";
import { useComponentSectionCode } from "../ComponentSectionContext";
import { ComponentVariantToolbar, VariantPreviewFrame } from "../ComponentVariantToolbar";

type SectionView = "upload" | "notifications";
type UploadState = "Inactive" | "Default" | "Complete";
type NotificationVariant = "Success" | "Warning" | "Error" | "Info" | "White";

const NOTIFICATION_VARIANTS: NotificationVariant[] = [
  "Success",
  "Warning",
  "Error",
  "Info",
  "White",
];

const UPLOAD_STATES: UploadState[] = ["Inactive", "Default", "Complete"];

function StaticUploadModal({ uploadStatus }: { uploadStatus: UploadState }) {
  return (
    <Modal title="Upload file">
      <ModalBody>
        <div className="relative h-10 w-full shrink-0 rounded-[8px] bg-white" data-name="Button-medium">
          <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[8px] border border-solid border-[#aab6b4]" />
          <div className="flex h-full items-center justify-between px-3">
            <span className="font-['Open_Sans:semi-bold',sans-serif] text-[14px] leading-[20px] text-[#4a5453]">
              Add template
            </span>
            <span className="text-[#4a5453]">+</span>
          </div>
        </div>
        <UploadStatus uploadStatus={uploadStatus} className="relative w-full max-w-none shrink-0 rounded-[4px] bg-[#f5f6f6] p-4" />
        <ModalDropZone />
      </ModalBody>
    </Modal>
  );
}

function ConnectedUploadModal({ onStatus }: { onStatus: (message: string) => void }) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploadStatus, setUploadStatus] = useState<UploadState>("Inactive");
  const [fileName, setFileName] = useState<string | null>(null);

  const reset = () => {
    setUploadStatus("Inactive");
    setFileName(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    setFileName(file.name);
    setUploadStatus("Default");
    onStatus(`Selected ${file.name}`);
  };

  return (
    <>
      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept=".csv,.txt,text/csv,text/plain"
        className="sr-only"
        onChange={(event) => handleFile(event.target.files?.[0])}
      />
      <Modal
        title="Upload file"
        onClose={() => onStatus("Modal closed")}
        onCancel={() => {
          reset();
          onStatus("Upload cancelled — selection cleared");
        }}
        onImport={() => {
          if (!fileName) {
            onStatus("Choose a CSV or TXT file before importing");
            return;
          }
          setUploadStatus("Complete");
          onStatus(`Imported ${fileName}`);
        }}
      >
        <ModalBody>
          <button
            type="button"
            className="relative flex h-10 w-full shrink-0 cursor-pointer items-center justify-between rounded-[8px] bg-white px-3"
            onClick={() => onStatus("Add template action")}
            data-name="Button-medium"
          >
            <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[8px] border border-solid border-[#aab6b4]" />
            <span className="font-['Open_Sans:semi-bold',sans-serif] text-[14px] leading-[20px] text-[#4a5453]">
              Add template
            </span>
            <span className="text-[#4a5453]">+</span>
          </button>
          <UploadStatus
            uploadStatus={uploadStatus}
            className="relative w-full max-w-none shrink-0 rounded-[4px] bg-[#f5f6f6] p-4"
          />
          <ModalDropZone
            inputId={inputId}
            onChooseFile={() => inputRef.current?.click()}
          />
        </ModalBody>
      </Modal>
    </>
  );
}

function ConnectedNotification({ variant }: { variant: NotificationVariant }) {
  const [visible, setVisible] = useState(true);

  if (!visible) {
    return (
      <button type="button" onClick={() => setVisible(true)} className="text-sm text-[#00a7b5] underline">
        Show {variant} notification
      </button>
    );
  }

  return <Notification notification={variant} onDismiss={() => setVisible(false)} />;
}

export function InteractiveModalsDemo() {
  const [view, setView] = useState<SectionView>("upload");
  const [notification, setNotification] = useState<NotificationVariant>("Success");
  const [showAll, setShowAll] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const liveCode = useMemo(() => {
    if (view === "notifications") {
      return `import Notification from './imports/Notification';

<Notification notification="${notification}" />`;
    }

    return `import Modal, { ModalBody, ModalDropZone, UploadStatus } from './imports/Modal';

<Modal title="Upload file" onClose={close} onCancel={reset} onImport={save}>
  <ModalBody>
    <UploadStatus uploadStatus={uploadStatus} />
    <ModalDropZone inputId={inputId} onChooseFile={() => inputRef.current?.click()} />
  </ModalBody>
</Modal>`;
  }, [view, notification]);

  useComponentSectionCode(liveCode, !showAll);

  const filters =
    view === "upload"
      ? [
          {
            id: "view",
            label: "Component",
            value: view,
            onChange: (value: string) => {
              setView(value as SectionView);
              setStatus(null);
            },
            options: [
              { value: "upload", label: "Upload modal" },
              { value: "notifications", label: "Notifications" },
            ],
          },
        ]
      : [
          {
            id: "view",
            label: "Component",
            value: view,
            onChange: (value: string) => {
              setView(value as SectionView);
              setStatus(null);
            },
            options: [
              { value: "upload", label: "Upload modal" },
              { value: "notifications", label: "Notifications" },
            ],
          },
          {
            id: "notification",
            label: "Type",
            value: notification,
            onChange: (value: string) => setNotification(value as NotificationVariant),
            options: NOTIFICATION_VARIANTS.map((variant) => ({ value: variant, label: variant })),
          },
        ];

  const uploadPreview = <ConnectedUploadModal onStatus={setStatus} />;

  return (
    <div>
      <ComponentVariantToolbar
        showAll={showAll}
        onShowAllChange={setShowAll}
        expandLabel="Expand all views"
        collapseLabel="Show focused view"
        filters={filters}
      />

      {showAll ? (
        <div className="space-y-10">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase text-[var(--colour-labels-disabled)]">
              Connected upload modal
            </p>
            <div className="showcase-modal-preview flex justify-center">
              <ConnectedUploadModal onStatus={setStatus} />
            </div>
          </div>
          {UPLOAD_STATES.map((state) => (
            <div key={state}>
              <p className="mb-3 text-xs font-semibold uppercase text-[var(--colour-labels-disabled)]">
                Upload — {state === "Default" ? "Uploading" : state}
              </p>
              <div className="showcase-modal-preview flex justify-center">
                <StaticUploadModal uploadStatus={state} />
              </div>
            </div>
          ))}
          {NOTIFICATION_VARIANTS.map((variant) => (
            <div key={variant}>
              <p className="mb-3 text-xs font-semibold uppercase text-[var(--colour-labels-disabled)]">
                {variant} notification
              </p>
              <ConnectedNotification variant={variant} />
            </div>
          ))}
        </div>
      ) : (
        <>
          <VariantPreviewFrame
            label={view === "upload" ? "Upload modal" : `${notification} notification`}
            align={view === "upload" ? "stretch" : "center"}
          >
            <div className={view === "upload" ? "showcase-modal-preview flex w-full justify-center" : ""}>
              {view === "upload" ? uploadPreview : <ConnectedNotification variant={notification} />}
            </div>
          </VariantPreviewFrame>
          {status && view === "upload" && (
            <p className="mt-4 text-sm text-[#4a5453]" role="status">
              {status}
            </p>
          )}
          <p className="mt-4 text-xs text-[var(--colour-labels-disabled)]">
            {view === "upload"
              ? "UploadStatus and ModalDropZone are composed inside Modal — choose a file, then Import to complete the flow."
              : "Use the Type filter to preview each notification variant."}
          </p>
        </>
      )}
    </div>
  );
}
