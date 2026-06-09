import svgPaths from "./svg-1bdq81bsr0";
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
type DrawerProps = {
  className?: string;
  children?: ReactNode | null;
  drawer?: "Editable";
  title?: string;
  onClose?: () => void;
  onCancel?: () => void;
  onImport?: () => void;
  importLabel?: string;
};

export function DrawerBody({ children }: { children: ReactNode }) {
  return (
    <div className="h-full min-h-0 overflow-x-clip overflow-y-auto">
      <div className="flex flex-col items-start p-[24px] w-full">
        <div
          className="flex w-full flex-col gap-[16px] items-start pb-6"
          data-name="Stacked components"
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default function Drawer({
  className,
  children = null,
  drawer = "Editable",
  title = "Edit",
  onClose,
  onCancel,
  onImport,
  importLabel = "Import",
}: DrawerProps) {
  return (
    <div
      className={
        className ||
        "relative flex h-[653px] max-h-[min(653px,80vh)] w-full max-w-[443px] min-h-0 flex-col overflow-hidden drop-shadow-[0px_9px_12px_rgba(28,42,42,0.05)]"
      }
    >
      <div className="w-full shrink-0 bg-white" data-name="Modal header">
        <div className="flex flex-col justify-center size-full">
          <div className="content-stretch flex flex-col items-start justify-center pb-[8px] pt-[24px] px-[24px] relative size-full">
            <div className="content-stretch flex gap-[24px] items-center relative shrink-0 w-full">
              <div className="[word-break:break-word] flex flex-[1_0_0] flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] min-w-px not-italic relative text-[#4a5453] text-[18px] tracking-[-0.2px]">
                <p className="leading-[24px]">{title}</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close drawer"
                className="bg-white content-stretch flex gap-[12px] h-[40px] items-center justify-center p-[12px] relative rounded-[8px] shrink-0 cursor-pointer"
                data-name="Button-medium"
              >
                <div aria-hidden className="absolute border border-[#aab6b4] border-solid inset-0 pointer-events-none rounded-[8px]" />
                <XClose className="overflow-clip relative shrink-0 size-[24px]" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="relative min-h-0 w-full flex-1 overflow-hidden bg-white" data-name="Edit drawer content">
        {children ?? (
          <DrawerBody>
                <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Input field">
                  <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full">
                    <div className="content-stretch flex gap-[4px] h-[11px] items-center relative shrink-0" data-name="label-required-icon">
                      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Open_Sans:regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#4a5453] text-[14px] tracking-[-0.1px] whitespace-nowrap">Disabled</p>
                    </div>
                  </div>
                  <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
                    <div className="bg-[#e5e8e7] h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Field-all-icons">
                      <div className="flex flex-row items-center size-full">
                        <div className="content-stretch flex gap-[8px] items-center p-[12px] relative size-full">
                          <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-w-px relative">
                            <div className="content-stretch flex flex-[1_0_0] items-center min-w-px overflow-clip relative">
                              <p className="[word-break:break-word] font-['Open_Sans:regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#aab6b4] text-[14px] tracking-[-0.1px] whitespace-nowrap">Column content goes here</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Input field">
                  <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full">
                    <div className="content-stretch flex gap-[4px] h-[11px] items-center relative shrink-0" data-name="label-required-icon">
                      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Open_Sans:regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#4a5453] text-[14px] tracking-[-0.1px] whitespace-nowrap">Default</p>
                    </div>
                  </div>
                  <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
                    <div className="bg-white h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Field-all-icons">
                      <div aria-hidden className="absolute border border-[#aab6b4] border-solid inset-0 pointer-events-none rounded-[8px]" />
                      <div className="flex flex-row items-center size-full">
                        <div className="content-stretch flex gap-[8px] items-center p-[12px] relative size-full">
                          <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-w-px relative">
                            <div className="content-stretch flex flex-[1_0_0] items-center min-w-px overflow-clip relative">
                              <p className="[word-break:break-word] font-['Open_Sans:regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#aab6b4] text-[14px] tracking-[-0.1px] whitespace-nowrap">Column content goes here</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Input field">
                  <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full">
                    <div className="content-stretch flex gap-[4px] h-[11px] items-center relative shrink-0" data-name="label-required-icon">
                      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Open_Sans:regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#4a5453] text-[14px] tracking-[-0.1px] whitespace-nowrap">Selected</p>
                    </div>
                  </div>
                  <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
                    <div className="bg-white h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Field-all-icons">
                      <div aria-hidden className="absolute border-2 border-[#00a7b5] border-solid inset-[-2px] pointer-events-none rounded-[10px]" />
                      <div className="flex flex-row items-center size-full">
                        <div className="content-stretch flex gap-[8px] items-center p-[12px] relative size-full">
                          <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-w-px relative">
                            <div className="content-stretch flex flex-[1_0_0] items-center min-w-px overflow-clip relative">
                              <p className="[word-break:break-word] font-['Open_Sans:regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#4a5453] text-[14px] tracking-[-0.1px] whitespace-nowrap">Column content goes here</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Input field">
                  <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full">
                    <div className="content-stretch flex gap-[4px] h-[11px] items-center relative shrink-0" data-name="label-required-icon">
                      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Open_Sans:regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#4a5453] text-[14px] tracking-[-0.1px] whitespace-nowrap">Inputted</p>
                    </div>
                  </div>
                  <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
                    <div className="bg-white h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Field-all-icons">
                      <div aria-hidden className="absolute border border-[#aab6b4] border-solid inset-0 pointer-events-none rounded-[8px]" />
                      <div className="flex flex-row items-center size-full">
                        <div className="content-stretch flex gap-[8px] items-center p-[12px] relative size-full">
                          <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-w-px relative">
                            <div className="content-stretch flex flex-[1_0_0] items-center min-w-px overflow-clip relative">
                              <p className="[word-break:break-word] font-['Open_Sans:regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#4a5453] text-[14px] tracking-[-0.1px] whitespace-nowrap">Column content goes here</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
          </DrawerBody>
        )}
      </div>
      <div
        className="w-full shrink-0 border-t border-[#e5e8e7] bg-white shadow-[0_-4px_12px_rgba(28,42,42,0.04)]"
        data-name="Modal footer"
      >
        <div className="px-[24px] pb-[24px] pt-[12px]">
          <div className="flex w-full min-w-0 items-center justify-between gap-3">
            <button
              type="button"
              className="relative flex h-[40px] min-w-0 shrink cursor-pointer items-center justify-center gap-[12px] rounded-[8px] bg-white p-[12px]"
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
                className="relative flex h-[40px] shrink-0 cursor-pointer items-center justify-center rounded-[8px] bg-white px-[12px] py-[12px]"
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
                className="relative flex h-[40px] shrink-0 cursor-pointer items-center justify-center rounded-[8px] bg-[#00a7b5] px-[12px] py-[12px]"
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