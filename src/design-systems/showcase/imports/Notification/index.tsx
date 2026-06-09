import svgPaths from "./svg-bor53b3jgr";

type DismissTone = "on-color" | "on-light" | "on-white";

function NotificationDismissButton({
  label = "Dismiss",
  onDismiss,
  tone,
}: {
  label?: string;
  onDismiss?: () => void;
  tone: DismissTone;
}) {
  const toneStyles: Record<DismissTone, { border: string; text: string; fill: string }> = {
    "on-color": { border: "border-white", text: "text-white", fill: "white" },
    "on-light": { border: "border-[#232828]", text: "text-[#232828]", fill: "#232828" },
    "on-white": { border: "border-[#4a5453]", text: "text-[#4a5453]", fill: "#4A5453" },
  };
  const styles = toneStyles[tone];
  const shellClass =
    "content-stretch flex gap-[8px] h-[24px] items-center justify-center p-[8px] relative rounded-[4px] shrink-0";

  const content = (
    <>
      <div
        aria-hidden
        className={`absolute inset-0 rounded-[4px] border border-solid pointer-events-none ${styles.border}`}
      />
      <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Button-text-icon">
        <div
          className={`flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center not-italic relative shrink-0 text-[10px] text-center tracking-[-0.1px] whitespace-nowrap ${styles.text}`}
        >
          <p className="leading-[16px]">{label}</p>
        </div>
      </div>
      <div className="overflow-clip relative shrink-0 size-[12px]" data-name="plus icon" aria-hidden>
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 7">
          <path clipRule="evenodd" d={svgPaths.p36a7c230} fill={styles.fill} fillRule="evenodd" />
        </svg>
      </div>
    </>
  );

  if (onDismiss) {
    return (
      <button
        type="button"
        onClick={onDismiss}
        aria-label={label}
        className={`${shellClass} cursor-pointer border-0 bg-transparent`}
        data-name="Icon-small"
      >
        {content}
      </button>
    );
  }

  return (
    <div className={shellClass} data-name="Icon-small">
      {content}
    </div>
  );
}

type NotificationProps = {
  className?: string;
  close?: boolean;
  closeLabel?: string;
  onDismiss?: () => void;
  description?: boolean;
  notification?: "Success" | "Warning" | "Info" | "Error" | "Warning more" | "Error more" | "Info more" | "White expanded" | "White";
  undo?: boolean;
};

export default function Notification({
  className,
  close = true,
  closeLabel = "Dismiss",
  onDismiss,
  description = true,
  notification = "Success",
  undo = true,
}: NotificationProps) {
  const isError = notification === "Error";
  const isErrorMore = notification === "Error more";
  const isInfo = notification === "Info";
  const isInfoMore = notification === "Info more";
  const isSuccess = notification === "Success";
  const isWarning = notification === "Warning";
  const isWarningMore = notification === "Warning more";
  const isWhite = notification === "White";
  const isWhiteExpanded = notification === "White expanded";
  const isWhiteOrWhiteExpanded = ["White", "White expanded"].includes(notification);
  return (
    <div className={className || `content-stretch flex gap-[8px] items-start p-[24px] relative rounded-[8px] w-[843px] ${isWhiteOrWhiteExpanded ? "bg-white" : ["Info", "Info more"].includes(notification) ? "bg-[#106c7a]" : ["Error", "Error more"].includes(notification) ? "bg-[#d04a21]" : ["Warning", "Warning more"].includes(notification) ? "bg-[#f5a50d]" : "bg-[#4ca843]"}`}>
      {isWhiteOrWhiteExpanded && <div aria-hidden className="absolute border border-[#aab6b4] border-solid inset-0 pointer-events-none rounded-[8px]" />}
      {isSuccess && description && (
        <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-w-px relative" data-name="Text-icon">
          <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon-small">
            <div className="absolute inset-[4.17%]" data-name="Icon (Stroke)">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
                <path clipRule="evenodd" d={svgPaths.p33855a80} fill="var(--fill-0, white)" fillRule="evenodd" id="Icon (Stroke)" />
              </svg>
            </div>
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Open_Sans:semi-bold',sans-serif] leading-[24px] min-w-px not-italic relative text-[18px] text-white tracking-[-0.2px]">Upload successful</p>
        </div>
      )}
      {isSuccess && (
        <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
          {undo && (
            <div className="content-stretch flex gap-[8px] h-[24px] items-center justify-center p-[8px] relative rounded-[4px] shrink-0" data-name="Icon-small">
              <div aria-hidden className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[4px]" />
              <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Button-text-icon">
                <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-center text-white tracking-[-0.1px] whitespace-nowrap">
                  <p className="leading-[16px]">Undo</p>
                </div>
              </div>
              <div className="overflow-clip relative shrink-0 size-[12px]" data-name="plus icon">
                <div className="absolute inset-[8.33%_12.5%_16.67%_12.5%]" data-name="Icon (Stroke)">
                  <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 9">
                    <path clipRule="evenodd" d={svgPaths.p33175100} fill="var(--fill-0, white)" fillRule="evenodd" id="Icon (Stroke)" />
                  </svg>
                </div>
              </div>
            </div>
          )}
          {close && (
            <NotificationDismissButton tone="on-color" label={closeLabel} onDismiss={onDismiss} />
          )}
        </div>
      )}
      {isWarning && description && (
        <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-w-px relative" data-name="Text-icon">
          <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon-small">
            <div className="absolute inset-[4.17%]" data-name="Icon (Stroke)">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
                <path clipRule="evenodd" d={svgPaths.pfeca300} fill="var(--fill-0, #232828)" fillRule="evenodd" id="Icon (Stroke)" />
              </svg>
            </div>
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Open_Sans:semi-bold',sans-serif] leading-[24px] min-w-px not-italic relative text-[#232828] text-[18px] tracking-[-0.2px]">Failed to upload</p>
        </div>
      )}
      {isWarning && (
        <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
          {undo && (
            <div className="h-[24px] relative rounded-[4px] shrink-0" data-name="Icon-small">
              <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip p-[8px] relative rounded-[inherit] size-full">
                <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Button-text-icon">
                  <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#232828] text-[10px] text-center tracking-[-0.1px] whitespace-nowrap">
                    <p className="leading-[16px]">More info</p>
                  </div>
                </div>
              </div>
              <div aria-hidden className="absolute border border-[#232828] border-solid inset-0 pointer-events-none rounded-[4px]" />
            </div>
          )}
          {close && (
            <NotificationDismissButton tone="on-light" label={closeLabel} onDismiss={onDismiss} />
          )}
        </div>
      )}
      {isWarningMore && description && (
        <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Text-icon">
          <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon-small">
            <div className="absolute inset-[4.17%]" data-name="Icon (Stroke)">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
                <path clipRule="evenodd" d={svgPaths.pfeca300} fill="var(--fill-0, #232828)" fillRule="evenodd" id="Icon (Stroke)" />
              </svg>
            </div>
          </div>
          <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col font-['Open_Sans:semi-bold',sans-serif] gap-[16px] items-start min-w-px not-italic relative text-[#232828]">
            <p className="leading-[24px] min-w-full relative shrink-0 text-[18px] tracking-[-0.2px] w-[min-content]">Failed to upload</p>
            <p className="leading-[16px] relative shrink-0 text-[12px] tracking-[-0.1px] whitespace-nowrap">Error 1</p>
            <p className="leading-[16px] relative shrink-0 text-[12px] tracking-[-0.1px] whitespace-nowrap">Error 2</p>
            <p className="leading-[16px] relative shrink-0 text-[12px] tracking-[-0.1px] whitespace-nowrap">Error 2</p>
          </div>
        </div>
      )}
      {isWarningMore && (
        <div className="content-stretch flex items-center relative shrink-0">
          {close && (
            <NotificationDismissButton tone="on-light" label={closeLabel} onDismiss={onDismiss} />
          )}
        </div>
      )}
      {isError && description && (
        <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-w-px relative" data-name="Text-icon">
          <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon-small">
            <div className="absolute inset-[4.17%]" data-name="Icon (Stroke)">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
                <path clipRule="evenodd" d={svgPaths.pfeca300} fill="var(--fill-0, white)" fillRule="evenodd" id="Icon (Stroke)" />
              </svg>
            </div>
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Open_Sans:semi-bold',sans-serif] leading-[24px] min-w-px not-italic relative text-[18px] text-white tracking-[-0.2px]">Failed to upload</p>
        </div>
      )}
      {isError && (
        <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
          {undo && (
            <div className="h-[24px] relative rounded-[4px] shrink-0" data-name="Icon-small">
              <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip p-[8px] relative rounded-[inherit] size-full">
                <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Button-text-icon">
                  <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-center text-white tracking-[-0.1px] whitespace-nowrap">
                    <p className="leading-[16px]">More info</p>
                  </div>
                </div>
              </div>
              <div aria-hidden className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[4px]" />
            </div>
          )}
          {close && (
            <NotificationDismissButton tone="on-color" label={closeLabel} onDismiss={onDismiss} />
          )}
        </div>
      )}
      {isErrorMore && description && (
        <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Text-icon">
          <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon-small">
            <div className="absolute inset-[4.17%]" data-name="Icon (Stroke)">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
                <path clipRule="evenodd" d={svgPaths.pfeca300} fill="var(--fill-0, white)" fillRule="evenodd" id="Icon (Stroke)" />
              </svg>
            </div>
          </div>
          <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col font-['Open_Sans:semi-bold',sans-serif] gap-[16px] items-start min-w-px not-italic relative text-white">
            <p className="leading-[24px] min-w-full relative shrink-0 text-[18px] tracking-[-0.2px] w-[min-content]">Failed to upload</p>
            <p className="leading-[16px] relative shrink-0 text-[12px] tracking-[-0.1px] whitespace-nowrap">Error 1</p>
            <p className="leading-[16px] relative shrink-0 text-[12px] tracking-[-0.1px] whitespace-nowrap">Error 2</p>
            <p className="leading-[16px] relative shrink-0 text-[12px] tracking-[-0.1px] whitespace-nowrap">Error 2</p>
          </div>
        </div>
      )}
      {isErrorMore && (
        <div className="content-stretch flex items-center relative shrink-0">
          {close && (
            <NotificationDismissButton tone="on-color" label={closeLabel} onDismiss={onDismiss} />
          )}
        </div>
      )}
      {isInfo && description && (
        <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-w-px relative" data-name="Text-icon">
          <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon-small">
            <div className="absolute inset-[4.17%]" data-name="Icon (Stroke)">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
                <path clipRule="evenodd" d={svgPaths.p18417e00} fill="var(--fill-0, white)" fillRule="evenodd" id="Icon (Stroke)" />
              </svg>
            </div>
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Open_Sans:semi-bold',sans-serif] leading-[24px] min-w-px not-italic relative text-[18px] text-white tracking-[-0.2px]">Your data export has been emailed to you</p>
        </div>
      )}
      {isInfo && (
        <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
          {undo && (
            <div className="h-[24px] relative rounded-[4px] shrink-0" data-name="Icon-small">
              <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip p-[8px] relative rounded-[inherit] size-full">
                <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Button-text-icon">
                  <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-center text-white tracking-[-0.1px] whitespace-nowrap">
                    <p className="leading-[16px]">Open inbox</p>
                  </div>
                </div>
                <div className="overflow-clip relative shrink-0 size-[12px]" data-name="plus icon">
                  <div className="absolute inset-[8.33%]" data-name="Icon (Stroke)">
                    <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
                      <path clipRule="evenodd" d={svgPaths.p1d223c80} fill="var(--fill-0, white)" fillRule="evenodd" id="Icon (Stroke)" />
                    </svg>
                  </div>
                </div>
              </div>
              <div aria-hidden className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[4px]" />
            </div>
          )}
          {close && (
            <NotificationDismissButton tone="on-color" label={closeLabel} onDismiss={onDismiss} />
          )}
        </div>
      )}
      {isInfoMore && description && (
        <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Text-icon">
          <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon-small">
            <div className="absolute inset-[4.17%]" data-name="Icon (Stroke)">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
                <path clipRule="evenodd" d={svgPaths.p18417e00} fill="var(--fill-0, white)" fillRule="evenodd" id="Icon (Stroke)" />
              </svg>
            </div>
          </div>
          <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col font-['Open_Sans:semi-bold',sans-serif] gap-[16px] items-start min-w-px not-italic relative text-white">
            <p className="leading-[24px] min-w-full relative shrink-0 text-[18px] tracking-[-0.2px] w-[min-content]">Your data export has been emailed to you</p>
            <p className="leading-[16px] relative shrink-0 text-[12px] tracking-[-0.1px] whitespace-nowrap">Error 1</p>
            <p className="leading-[16px] relative shrink-0 text-[12px] tracking-[-0.1px] whitespace-nowrap">Error 2</p>
            <p className="leading-[16px] relative shrink-0 text-[12px] tracking-[-0.1px] whitespace-nowrap">Error 2</p>
          </div>
        </div>
      )}
      {isInfoMore && (
        <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
          {undo && (
            <div className="h-[24px] relative rounded-[4px] shrink-0" data-name="Icon-small">
              <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip p-[8px] relative rounded-[inherit] size-full">
                <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Button-text-icon">
                  <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-center text-white tracking-[-0.1px] whitespace-nowrap">
                    <p className="leading-[16px]">Open inbox</p>
                  </div>
                </div>
                <div className="overflow-clip relative shrink-0 size-[12px]" data-name="plus icon">
                  <div className="absolute inset-[8.33%]" data-name="Icon (Stroke)">
                    <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
                      <path clipRule="evenodd" d={svgPaths.p1d223c80} fill="var(--fill-0, white)" fillRule="evenodd" id="Icon (Stroke)" />
                    </svg>
                  </div>
                </div>
              </div>
              <div aria-hidden className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[4px]" />
            </div>
          )}
          {close && (
            <NotificationDismissButton tone="on-color" label={closeLabel} onDismiss={onDismiss} />
          )}
        </div>
      )}
      {isWhite && description && (
        <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-w-px relative" data-name="Text-icon">
          <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon-small">
            <div className="absolute inset-[4.17%]" data-name="Icon (Stroke)">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
                <path clipRule="evenodd" d={svgPaths.p18417e00} fill="var(--fill-0, #4A5453)" fillRule="evenodd" id="Icon (Stroke)" />
              </svg>
            </div>
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Open_Sans:semi-bold',sans-serif] leading-[24px] min-w-px not-italic relative text-[#4a5453] text-[18px] tracking-[-0.2px]">Your data export has been emailed to you</p>
        </div>
      )}
      {isWhite && (
        <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
          {undo && (
            <div className="h-[24px] relative rounded-[4px] shrink-0" data-name="Icon-small">
              <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip p-[8px] relative rounded-[inherit] size-full">
                <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Button-text-icon">
                  <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[10px] text-center tracking-[-0.1px] whitespace-nowrap">
                    <p className="leading-[16px]">Open inbox</p>
                  </div>
                </div>
                <div className="overflow-clip relative shrink-0 size-[12px]" data-name="plus icon">
                  <div className="absolute inset-[8.33%]" data-name="Icon (Stroke)">
                    <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
                      <path clipRule="evenodd" d={svgPaths.p1d223c80} fill="var(--fill-0, #4A5453)" fillRule="evenodd" id="Icon (Stroke)" />
                    </svg>
                  </div>
                </div>
              </div>
              <div aria-hidden className="absolute border border-[#4a5453] border-solid inset-0 pointer-events-none rounded-[4px]" />
            </div>
          )}
          {close && (
            <NotificationDismissButton tone="on-white" label={closeLabel} onDismiss={onDismiss} />
          )}
        </div>
      )}
      {isWhiteExpanded && description && (
        <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Text-icon">
          <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon-small">
            <div className="absolute inset-[4.17%]" data-name="Icon (Stroke)">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
                <path clipRule="evenodd" d={svgPaths.p18417e00} fill="var(--fill-0, #4A5453)" fillRule="evenodd" id="Icon (Stroke)" />
              </svg>
            </div>
          </div>
          <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col font-['Open_Sans:semi-bold',sans-serif] gap-[16px] items-start min-w-px not-italic relative text-[#4a5453]">
            <p className="leading-[24px] min-w-full relative shrink-0 text-[18px] tracking-[-0.2px] w-[min-content]">Your data export has been emailed to you</p>
            <p className="leading-[16px] relative shrink-0 text-[12px] tracking-[-0.1px] whitespace-nowrap">Error 1</p>
            <p className="leading-[16px] relative shrink-0 text-[12px] tracking-[-0.1px] whitespace-nowrap">Error 2</p>
            <p className="leading-[16px] relative shrink-0 text-[12px] tracking-[-0.1px] whitespace-nowrap">Error 2</p>
          </div>
        </div>
      )}
      {isWhiteExpanded && (
        <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
          {undo && (
            <div className="h-[24px] relative rounded-[4px] shrink-0" data-name="Icon-small">
              <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip p-[8px] relative rounded-[inherit] size-full">
                <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Button-text-icon">
                  <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[10px] text-center tracking-[-0.1px] whitespace-nowrap">
                    <p className="leading-[16px]">Open inbox</p>
                  </div>
                </div>
                <div className="overflow-clip relative shrink-0 size-[12px]" data-name="plus icon">
                  <div className="absolute inset-[8.33%]" data-name="Icon (Stroke)">
                    <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
                      <path clipRule="evenodd" d={svgPaths.p1d223c80} fill="var(--fill-0, #4A5453)" fillRule="evenodd" id="Icon (Stroke)" />
                    </svg>
                  </div>
                </div>
              </div>
              <div aria-hidden className="absolute border border-[#4a5453] border-solid inset-0 pointer-events-none rounded-[4px]" />
            </div>
          )}
          {close && (
            <NotificationDismissButton tone="on-white" label={closeLabel} onDismiss={onDismiss} />
          )}
        </div>
      )}
    </div>
  );
}