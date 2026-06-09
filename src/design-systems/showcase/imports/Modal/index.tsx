import svgPaths from "./svg-k323i3tpjp";
import type { ReactNode } from "react";

function HelpCircle({ className }: { className?: string }) {
  return (
    <div className={className || "relative size-[24px]"} data-name="help-circle">
      <div className="absolute inset-[4.17%]" data-name="Icon (Stroke)">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
          <path clipRule="evenodd" d={svgPaths.p178d6b00} fill="var(--fill-0, #4A5453)" fillRule="evenodd" id="Icon (Stroke)" />
        </svg>
      </div>
    </div>
  );
}
type UploadStatusProps = {
  className?: string;
  compAfter2?: boolean;
  compAfter3?: boolean;
  compBefore1?: boolean;
  progressBar?: boolean;
  uploadStatus?: "Default" | "Inactive" | "Hover" | "Complete";
};

export function UploadStatus({ className, compAfter2 = true, compAfter3 = true, compBefore1 = true, progressBar = true, uploadStatus = "Inactive" }: UploadStatusProps) {
  const isComplete = uploadStatus === "Complete";
  const isDefaultOrHover = ["Default", "Hover"].includes(uploadStatus);
  const isDefaultOrHoverOrComplete = ["Default", "Hover", "Complete"].includes(uploadStatus);
  return (
    <div className={className || `bg-[#f5f6f6] content-stretch flex flex-col items-start justify-center p-[16px] relative rounded-[4px] w-[490px] ${isDefaultOrHover ? "gap-[8px]" : ""}`}>
      <div aria-hidden className={`absolute inset-0 pointer-events-none rounded-[4px] ${["Hover", "Complete"].includes(uploadStatus) ? "border border-[#aab6b4] border-solid" : "border-0 border-[#26c6da] border-dashed"}`} />
      <div className={`content-stretch flex items-center relative shrink-0 w-full ${isDefaultOrHoverOrComplete ? "gap-[8px]" : ""}`}>
        {isDefaultOrHoverOrComplete && compBefore1 && (
          <div className="content-stretch flex items-center relative shrink-0 size-[36px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px overflow-clip relative" data-name="file-06">
              <div className="absolute inset-[4.17%_12.5%]" data-name="Icon (Stroke)">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 22">
                  <path clipRule="evenodd" d={svgPaths.p395d35f0} fill="var(--fill-0, #4A5453)" fillRule="evenodd" id="Icon (Stroke)" />
                </svg>
              </div>
            </div>
          </div>
        )}
        <div className={`content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-w-px relative ${isDefaultOrHoverOrComplete ? "gap-[8px]" : ""}`}>
          <div className={`content-stretch flex items-center relative shrink-0 w-full ${isDefaultOrHoverOrComplete ? "justify-between" : "justify-center"}`}>
            <div className={`[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-["Open_Sans:semi-bold",sans-serif] justify-center leading-[0] not-italic relative text-[#4a5453] text-[14px] tracking-[-0.1px] ${isDefaultOrHoverOrComplete ? "shrink-0 text-center whitespace-nowrap" : "flex-[1_0_0] min-w-px"}`}>
              <p className="leading-[20px]">{isDefaultOrHoverOrComplete ? "Universal-file-package.zip" : "No files have been added yet."}</p>
            </div>
            {isDefaultOrHoverOrComplete && (
              <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
                {compAfter2 && (
                  <div className="content-stretch flex items-center relative shrink-0 size-[16px]" data-name="Icons">
                    <div className="flex-[1_0_0] h-full min-w-px relative" data-name="download-02">
                      <div className="absolute inset-[8.33%]" data-name="Solid">
                        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                          <g id="Solid">
                            <path d={svgPaths.p3030680} fill="var(--fill-0, #4A5453)" />
                            <path d={svgPaths.p1276aa00} fill="var(--fill-0, #4A5453)" />
                          </g>
                        </svg>
                      </div>
                    </div>
                  </div>
                )}
                {compAfter3 && (
                  <div className="content-stretch flex items-center relative shrink-0 size-[16px]" data-name="Icons">
                    <div className="flex-[1_0_0] h-full min-w-px relative" data-name="x-close">
                      <div className="absolute inset-[20.83%]" data-name="Solid">
                        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
                          <path d={svgPaths.p371efd00} fill="var(--fill-0, #4A5453)" id="Solid" />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          {isDefaultOrHoverOrComplete && (
            <div className="[word-break:break-word] content-stretch flex font-['Open_Sans:semi-bold',sans-serif] items-center justify-between leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[12px] text-center tracking-[-0.1px] w-full whitespace-nowrap">
              <div className="content-stretch flex flex-[1_0_0] gap-[4px] items-center min-w-px relative">
                <div className="flex flex-col justify-center relative shrink-0">
                  <p className="leading-[16px]">CSV or TXT</p>
                </div>
                <div className="flex flex-col justify-center relative shrink-0">
                  <ul>
                    <li className="list-disc ms-[18px]">
                      <span className="leading-[16px] text-[12px]">​</span>
                    </li>
                  </ul>
                </div>
                <div className="flex flex-col justify-center relative shrink-0">
                  <p className="leading-[16px]">{isComplete ? "12KB" : isDefaultOrHover ? "2 seconds left" : ""}</p>
                </div>
              </div>
              <div className="flex flex-col justify-center relative shrink-0">
                <p className="leading-[16px]">{isComplete ? "Done" : isDefaultOrHover ? "95%" : ""}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      {isDefaultOrHover && progressBar && (
        <div className="bg-[#e5e8e7] relative rounded-[8px] shrink-0 w-full" data-name="Progress bar">
          <div className="content-stretch flex flex-col items-start pr-[24px] relative size-full">
            <div className="bg-[#4ca843] h-[3px] relative rounded-[8px] shrink-0 w-full" />
          </div>
        </div>
      )}
    </div>
  );
}

function XClose({ className }: { className?: string }) {
  return (
    <div className={className || "overflow-clip relative size-[24px]"} data-name="x-close">
      <div className="absolute inset-[20.83%]" data-name="Icon (Stroke)">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
          <path clipRule="evenodd" d={svgPaths.p34ceb700} fill="var(--fill-0, black)" fillRule="evenodd" id="Icon (Stroke)" />
        </svg>
      </div>
    </div>
  );
}
export function ModalDropZone({
  onChooseFile,
  inputId,
}: {
  onChooseFile?: () => void;
  inputId?: string;
}) {
  const content = (
    <>
      <div className="relative size-6 shrink-0 overflow-clip" data-name="upload-01">
        <div className="absolute inset-[8.33%]" data-name="Icon (Stroke)">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
            <path clipRule="evenodd" d={svgPaths.p38d0ea80} fill="var(--fill-0, #4A5453)" fillRule="evenodd" id="Icon (Stroke)" />
          </svg>
        </div>
      </div>
      <p className="w-full text-center font-['Open_Sans:semi-bold',sans-serif] text-[14px] leading-[20px] tracking-[-0.1px] text-[#4a5453]">
        {`Drag & drop or `}
        {onChooseFile && inputId ? (
          <span className="cursor-pointer text-[#00a7b5] underline-offset-2 hover:underline">choose file</span>
        ) : (
          <span className="text-[#00a7b5]">choose file</span>
        )}
        {` to upload`}
      </p>
      <p className="w-full text-center font-['Open_Sans:semi-bold',sans-serif] text-[12px] leading-[16px] tracking-[-0.1px] text-[#aab6b4]">
        CSV or TXT
      </p>
    </>
  );

  return (
    <div className="relative h-[153px] w-full shrink-0 rounded-[4px]" data-name="Drop box">
      <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[4px] border border-dashed border-[#aab6b4]" />
      {onChooseFile && inputId ? (
        <label
          htmlFor={inputId}
          className="relative flex h-full w-full cursor-pointer flex-col items-center justify-center gap-2 p-6"
        >
          {content}
        </label>
      ) : (
        <div className="relative flex h-full w-full flex-col items-center justify-center gap-2 p-6">
          {content}
        </div>
      )}
    </div>
  );
}

export function ModalBody({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

type ModalProps = {
  className?: string;
  children?: ReactNode | null;
  title?: string;
  onClose?: () => void;
  onCancel?: () => void;
  onImport?: () => void;
  importLabel?: string;
};

export default function Modal({
  className,
  children = null,
  title = "Modal title",
  onClose,
  onCancel,
  onImport,
  importLabel = "Import",
}: ModalProps) {
  return (
    <div
      className={
        className ||
        "relative isolate flex w-[530px] max-w-full flex-col items-stretch drop-shadow-[0px_8px_12px_rgba(28,42,42,0.05)]"
      }
      data-name="Modal"
    >
      <div className="bg-white relative rounded-tl-[16px] rounded-tr-[16px] shrink-0 w-full z-[3]" data-name="Modal header">
        <div className="flex flex-col justify-center size-full">
          <div className="content-stretch flex flex-col items-start justify-center pb-[8px] pt-[24px] px-[24px] relative size-full">
            <div className="content-stretch flex gap-[24px] items-center relative shrink-0 w-full">
              <div className="[word-break:break-word] flex flex-[1_0_0] flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] min-w-px not-italic relative text-[#4a5453] text-[18px] tracking-[-0.2px]">
                <p className="leading-[24px]">{title}</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="relative flex h-[40px] shrink-0 cursor-pointer items-center justify-center gap-3 rounded-[8px] bg-white p-3"
                data-name="Button-medium"
              >
                <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[8px] border border-solid border-[#aab6b4]" />
                <XClose className="relative shrink-0 size-[24px]" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="relative z-[2] flex w-full shrink-0 flex-col items-stretch gap-5 bg-white p-5"
        data-name="Upload modal"
      >
        {children ?? (
          <>
            <div className="relative h-10 w-full shrink-0 rounded-[8px] bg-white" data-name="Button-medium">
              <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[8px] border border-solid border-[#aab6b4]" />
              <div className="flex h-full w-full flex-row items-center justify-center">
                <div className="relative flex size-full items-center justify-between p-3">
                  <div className="flex shrink-0 items-center gap-3" data-name="Button-text-icon">
                    <span className="font-['Open_Sans:semi-bold',sans-serif] text-[14px] leading-[20px] tracking-[-0.1px] text-[#4a5453]">
                      Button
                    </span>
                  </div>
                  <div className="relative size-4 shrink-0 overflow-clip" data-name="plus icon">
                    <div className="absolute inset-[16.67%]" data-name="Icon (Stroke)">
                      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.6667 10.6667">
                        <path clipRule="evenodd" d={svgPaths.p1a739400} fill="var(--fill-0, #4A5453)" fillRule="evenodd" id="Icon (Stroke)" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <UploadStatus className="relative w-full max-w-none shrink-0 rounded-[4px] bg-[#f5f6f6] p-4" />
            <ModalDropZone />
          </>
        )}
      </div>
      <div className="relative z-[1] w-full shrink-0 rounded-bl-[16px] rounded-br-[16px] bg-white" data-name="Modal footer">
        <div className="px-6 pb-6 pt-3">
          <div className="flex w-full items-center justify-between gap-3">
            <button
              type="button"
              className="relative flex h-10 w-fit shrink-0 cursor-pointer items-center justify-center gap-3 rounded-[8px] bg-white px-3 py-3"
              data-name="Button-medium"
            >
              <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[8px] border-0 border-solid border-[#aab6b4]" />
              <HelpCircle className="relative shrink-0 size-[24px]" />
              <span className="font-['Open_Sans:semi-bold',sans-serif] text-[14px] leading-[20px] tracking-[-0.1px] text-[#4a5453]">
                Help
              </span>
            </button>
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={onCancel}
                className="relative flex h-10 shrink-0 cursor-pointer items-center justify-center rounded-[8px] bg-white px-3 py-3"
                data-name="Button-medium"
              >
                <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[8px] border border-solid border-[#00a7b5]" />
                <span className="font-['Open_Sans:semi-bold',sans-serif] text-[14px] leading-[20px] tracking-[-0.1px] text-[#00a7b5]">
                  Cancel
                </span>
              </button>
              <button
                type="button"
                onClick={onImport}
                className="relative flex h-10 shrink-0 cursor-pointer items-center justify-center rounded-[8px] bg-[#00a7b5] px-3 py-3"
                data-name="Button-medium"
              >
                <span className="font-['Open_Sans:semi-bold',sans-serif] text-[14px] leading-[20px] tracking-[-0.1px] text-white">
                  {importLabel}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}