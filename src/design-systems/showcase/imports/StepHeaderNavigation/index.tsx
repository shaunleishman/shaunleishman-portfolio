import svgPaths from "./svg-ey42xntbzl";
type ProgressBarProps = {
  className?: string;
  progressBar?: "Half" | "Full" | "Progress medium";
  showProgress?: boolean;
};

function ProgressBar({ className, progressBar = "Half", showProgress = true }: ProgressBarProps) {
  return (
    <div className={className || `bg-[#e5e8e7] content-stretch flex flex-col items-start relative rounded-[8px] w-[48px] ${progressBar === "Progress medium" ? "h-[8px] pr-[24px]" : progressBar === "Full" ? "h-[3px]" : "pr-[24px]"}`}>
      {["Full", "Progress medium"].includes(progressBar) && showProgress && <div className="bg-[#4ca843] flex-[1_0_0] min-h-px relative rounded-[8px] w-full" />}
      {progressBar === "Half" && showProgress && <div className="bg-[#4ca843] h-[3px] relative rounded-[8px] shrink-0 w-full" />}
    </div>
  );
}
type StepHeaderNavigationProps = {
  className?: string;
  stepHeader?: "1" | "3" | "4" | "5" | "2";
};

export default function StepHeaderNavigation({ className, stepHeader = "1" }: StepHeaderNavigationProps) {
  const is1 = stepHeader === "1";
  const is1Or2 = ["1", "2"].includes(stepHeader);
  const is1Or2Or3 = ["1", "2", "3"].includes(stepHeader);
  const is2 = stepHeader === "2";
  const is2Or3Or4Or5 = ["2", "3", "4", "5"].includes(stepHeader);
  const is3 = stepHeader === "3";
  const is3Or4Or5 = ["3", "4", "5"].includes(stepHeader);
  const is4 = stepHeader === "4";
  const is4Or5 = ["4", "5"].includes(stepHeader);
  const is5 = stepHeader === "5";
  return (
    <div className={className || "content-stretch flex items-start justify-center relative w-[1176px]"}>
      <div className="content-stretch flex gap-[16px] items-center justify-center p-[16px] relative rounded-[16px] shrink-0" data-name="Step header">
        <div className={`content-stretch flex items-center justify-center p-[8px] relative rounded-[24px] shrink-0 ${is2Or3Or4Or5 ? "bg-[#4ca843]" : "bg-[#00a7b5]"}`}>
          {is2Or3Or4Or5 && (
            <div className="relative shrink-0 size-[16px]" data-name="check">
              <div className="absolute bottom-1/4 left-[12.5%] right-[12.5%] top-[20.83%]" data-name="Icon (Stroke)">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 8.66667">
                  <path clipRule="evenodd" d={svgPaths.pfa54200} fill="var(--fill-0, white)" fillRule="evenodd" id="Icon (Stroke)" />
                </svg>
              </div>
            </div>
          )}
          {is1 && (
            <div className="relative shrink-0 size-[16px]" data-name="edit-02">
              <div className="absolute inset-[4.88%_4.88%_6.25%_6.25%]" data-name="Icon (Stroke)">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.219 14.219">
                  <path clipRule="evenodd" d={svgPaths.p3738b800} fill="var(--fill-0, white)" fillRule="evenodd" id="Icon (Stroke)" />
                </svg>
              </div>
            </div>
          )}
        </div>
        <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] text-center tracking-[-0.1px] whitespace-nowrap">
          <p className="leading-[20px]">Select meters</p>
        </div>
        {is2Or3Or4Or5 && <ProgressBar className="bg-[#e5e8e7] content-stretch flex flex-col h-[3px] items-start relative rounded-[8px] shrink-0 w-[48px]" progressBar="Full" />}
        {is1 && (
          <div className="bg-[#e5e8e7] content-stretch flex flex-col items-start pr-[24px] relative rounded-[8px] shrink-0 w-[48px]" data-name="Progress bar">
            <div className="bg-[#00a7b5] h-[3px] relative rounded-[8px] shrink-0 w-full" />
          </div>
        )}
      </div>
      <div className="content-stretch flex gap-[16px] items-center justify-center p-[16px] relative rounded-[16px] shrink-0" data-name="Step header">
        <div className={`content-stretch flex items-center justify-center p-[8px] relative rounded-[24px] shrink-0 ${is3Or4Or5 ? "bg-[#4ca843]" : is2 ? "bg-[#00a7b5]" : "bg-[#e5e8e7]"}`}>
          {is3Or4Or5 && (
            <div className="relative shrink-0 size-[16px]" data-name="check">
              <div className="absolute bottom-1/4 left-[12.5%] right-[12.5%] top-[20.83%]" data-name="Icon (Stroke)">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 8.66667">
                  <path clipRule="evenodd" d={svgPaths.pfa54200} fill="var(--fill-0, white)" fillRule="evenodd" id="Icon (Stroke)" />
                </svg>
              </div>
            </div>
          )}
          {is1 && (
            <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 size-[16px] text-[#4a5453] text-[14px] text-center tracking-[-0.1px]">
              <p className="leading-[20px]">2</p>
            </div>
          )}
          {is2 && (
            <div className="relative shrink-0 size-[16px]" data-name="edit-02">
              <div className="absolute inset-[4.88%_4.88%_6.25%_6.25%]" data-name="Icon (Stroke)">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.219 14.219">
                  <path clipRule="evenodd" d={svgPaths.p3738b800} fill="var(--fill-0, white)" fillRule="evenodd" id="Icon (Stroke)" />
                </svg>
              </div>
            </div>
          )}
        </div>
        <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] text-center tracking-[-0.1px] whitespace-nowrap">
          <p className="leading-[20px]">Asset allocation</p>
        </div>
        {["1", "3", "4", "5"].includes(stepHeader) && <ProgressBar className={`bg-[#e5e8e7] content-stretch flex flex-col h-[3px] items-start relative rounded-[8px] shrink-0 w-[48px] ${is3Or4Or5 ? "" : "pr-[24px]"}`} progressBar={is3Or4Or5 ? "Full" : undefined} showProgress={is1 ? false : undefined} />}
        {is2 && (
          <div className="bg-[#e5e8e7] content-stretch flex flex-col items-start pr-[24px] relative rounded-[8px] shrink-0 w-[48px]" data-name="Progress bar">
            <div className="bg-[#00a7b5] h-[3px] relative rounded-[8px] shrink-0 w-full" />
          </div>
        )}
      </div>
      <div className="content-stretch flex gap-[16px] items-center justify-center p-[16px] relative rounded-[16px] shrink-0" data-name="Step header">
        <div className={`content-stretch flex items-center justify-center p-[8px] relative rounded-[24px] shrink-0 ${is4Or5 ? "bg-[#4ca843]" : is3 ? "bg-[#00a7b5]" : "bg-[#e5e8e7]"}`}>
          {is1Or2 && (
            <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 size-[16px] text-[#4a5453] text-[14px] text-center tracking-[-0.1px]">
              <p className="leading-[20px]">3</p>
            </div>
          )}
          {is4Or5 && (
            <div className="relative shrink-0 size-[16px]" data-name="check">
              <div className="absolute bottom-1/4 left-[12.5%] right-[12.5%] top-[20.83%]" data-name="Icon (Stroke)">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 8.66667">
                  <path clipRule="evenodd" d={svgPaths.pfa54200} fill="var(--fill-0, white)" fillRule="evenodd" id="Icon (Stroke)" />
                </svg>
              </div>
            </div>
          )}
          {is3 && (
            <div className="relative shrink-0 size-[16px]" data-name="edit-02">
              <div className="absolute inset-[4.88%_4.88%_6.25%_6.25%]" data-name="Icon (Stroke)">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.219 14.219">
                  <path clipRule="evenodd" d={svgPaths.p3738b800} fill="var(--fill-0, white)" fillRule="evenodd" id="Icon (Stroke)" />
                </svg>
              </div>
            </div>
          )}
        </div>
        <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] text-center tracking-[-0.1px] whitespace-nowrap">
          <p className="leading-[20px]">Edit customer consent</p>
        </div>
        {["1", "2", "4", "5"].includes(stepHeader) && <ProgressBar className={`bg-[#e5e8e7] content-stretch flex flex-col h-[3px] items-start relative rounded-[8px] shrink-0 w-[48px] ${is4Or5 ? "" : "pr-[24px]"}`} progressBar={is4Or5 ? "Full" : undefined} showProgress={is1Or2 ? false : undefined} />}
        {is3 && (
          <div className="bg-[#e5e8e7] content-stretch flex flex-col items-start pr-[24px] relative rounded-[8px] shrink-0 w-[48px]" data-name="Progress bar">
            <div className="bg-[#00a7b5] h-[3px] relative rounded-[8px] shrink-0 w-full" />
          </div>
        )}
      </div>
      <div className="content-stretch flex gap-[16px] items-center justify-center p-[16px] relative rounded-[16px] shrink-0" data-name="Step header">
        <div className={`content-stretch flex items-center justify-center p-[8px] relative rounded-[24px] shrink-0 ${is5 ? "bg-[#4ca843]" : is4 ? "bg-[#00a7b5]" : "bg-[#e5e8e7]"}`}>
          {is1Or2Or3 && (
            <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 size-[16px] text-[#4a5453] text-[14px] text-center tracking-[-0.1px]">
              <p className="leading-[20px]">4</p>
            </div>
          )}
          {is4 && (
            <div className="relative shrink-0 size-[16px]" data-name="edit-02">
              <div className="absolute inset-[4.88%_4.88%_6.25%_6.25%]" data-name="Icon (Stroke)">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.219 14.219">
                  <path clipRule="evenodd" d={svgPaths.p3738b800} fill="var(--fill-0, white)" fillRule="evenodd" id="Icon (Stroke)" />
                </svg>
              </div>
            </div>
          )}
          {is5 && (
            <div className="relative shrink-0 size-[16px]" data-name="check">
              <div className="absolute bottom-1/4 left-[12.5%] right-[12.5%] top-[20.83%]" data-name="Icon (Stroke)">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 8.66667">
                  <path clipRule="evenodd" d={svgPaths.pfa54200} fill="var(--fill-0, white)" fillRule="evenodd" id="Icon (Stroke)" />
                </svg>
              </div>
            </div>
          )}
        </div>
        <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] text-center tracking-[-0.1px] whitespace-nowrap">
          <p className="leading-[20px]">Add unit reference</p>
        </div>
        {["1", "2", "3", "5"].includes(stepHeader) && <ProgressBar className={`bg-[#e5e8e7] content-stretch flex flex-col h-[3px] items-start relative rounded-[8px] shrink-0 w-[48px] ${is5 ? "" : "pr-[24px]"}`} progressBar={is5 ? "Full" : undefined} showProgress={is1Or2Or3 ? false : undefined} />}
        {is4 && (
          <div className="bg-[#e5e8e7] content-stretch flex flex-col items-start pr-[24px] relative rounded-[8px] shrink-0 w-[48px]" data-name="Progress bar">
            <div className="bg-[#00a7b5] h-[3px] relative rounded-[8px] shrink-0 w-full" />
          </div>
        )}
      </div>
      <div className="content-stretch flex gap-[16px] items-center justify-center p-[16px] relative rounded-[16px] shrink-0" data-name="Step header">
        <div className={`content-stretch flex items-center justify-center p-[8px] relative rounded-[24px] shrink-0 ${is5 ? "bg-[#00a7b5]" : "bg-[#e5e8e7]"}`}>
          {["1", "2", "3", "4"].includes(stepHeader) && (
            <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 size-[16px] text-[#4a5453] text-[14px] text-center tracking-[-0.1px]">
              <p className="leading-[20px]">5</p>
            </div>
          )}
          {is5 && (
            <div className="relative shrink-0 size-[16px]" data-name="edit-02">
              <div className="absolute inset-[4.88%_4.88%_6.25%_6.25%]" data-name="Icon (Stroke)">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.219 14.219">
                  <path clipRule="evenodd" d={svgPaths.p3738b800} fill="var(--fill-0, white)" fillRule="evenodd" id="Icon (Stroke)" />
                </svg>
              </div>
            </div>
          )}
        </div>
        <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] text-center tracking-[-0.1px] whitespace-nowrap">
          <p className="leading-[20px]">Review</p>
        </div>
      </div>
    </div>
  );
}