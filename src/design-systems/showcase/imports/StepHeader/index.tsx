import svgPaths from "./svg-6izxm2qkk3";
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
type StepHeaderProps = {
  className?: string;
  showProgressBar?: boolean;
  stepperHeader?: "Current" | "Incomplete" | "complete" | "complete-hover" | "Partial" | "Disabled" | "Not applicable active";
};

export default function StepHeader({ className, showProgressBar = true, stepperHeader = "complete" }: StepHeaderProps) {
  const isCompleteOrCompleteHover = ["complete", "complete-hover"].includes(stepperHeader);
  const isCurrent = stepperHeader === "Current";
  const isDisabled = stepperHeader === "Disabled";
  const isIncomplete = stepperHeader === "Incomplete";
  const isNotApplicableActive = stepperHeader === "Not applicable active";
  const isPartial = stepperHeader === "Partial";
  return (
    <div className={className || `content-stretch flex gap-[16px] items-center justify-center p-[16px] relative rounded-[16px] w-[257px] ${stepperHeader === "complete-hover" ? "bg-[#f5f6f6]" : ""}`}>
      <div aria-hidden={isNotApplicableActive ? true : undefined} className={isIncomplete ? "bg-[#e5e8e7] content-stretch flex items-center justify-center p-[8px] relative rounded-[24px] shrink-0" : isCurrent ? "bg-[#00a7b5] content-stretch flex items-center justify-center p-[8px] relative rounded-[24px] shrink-0" : isNotApplicableActive ? "absolute border border-[#aab6b4] border-solid inset-0 pointer-events-none rounded-[16px]" : isDisabled ? "bg-[#aab6b4] content-stretch flex items-center justify-center p-[8px] relative rounded-[24px] shrink-0" : isPartial ? "bg-[#f5a50d] content-stretch flex items-center justify-center p-[8px] relative rounded-[24px] shrink-0" : "bg-[#4ca843] content-stretch flex items-center justify-center p-[8px] relative rounded-[24px] shrink-0"}>
        {isCompleteOrCompleteHover && (
          <div className="relative shrink-0 size-[16px]" data-name="check">
            <div className="absolute bottom-1/4 left-[12.5%] right-[12.5%] top-[20.83%]" data-name="Icon (Stroke)">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 8.66667">
                <path clipRule="evenodd" d={svgPaths.pfa54200} fill="var(--fill-0, white)" fillRule="evenodd" id="Icon (Stroke)" />
              </svg>
            </div>
          </div>
        )}
        {["Partial", "Current"].includes(stepperHeader) && (
          <div className="relative shrink-0 size-[16px]" data-name="edit-02">
            <div className={`absolute ${isCurrent ? "inset-[4.88%_4.88%_6.25%_6.25%]" : "inset-[4.29%]"}`} data-name="Icon (Stroke)">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox={isCurrent ? "0 0 14.219 14.219" : "0 0 14.6283 14.6283"}>
                <path clipRule="evenodd" d={isCurrent ? svgPaths.p3738b800 : svgPaths.p7c25b70} fill="var(--fill-0, white)" fillRule="evenodd" id="Icon (Stroke)" />
              </svg>
            </div>
          </div>
        )}
        {isDisabled && (
          <div className="relative shrink-0 size-[16px]" data-name="slash-circle-01">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6667 14.6667">
                <path clipRule="evenodd" d={svgPaths.p2f782c40} fill="var(--fill-0, white)" fillRule="evenodd" id="Solid" />
              </svg>
            </div>
          </div>
        )}
        {isIncomplete && (
          <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 size-[16px] text-[#4a5453] text-[14px] text-center tracking-[-0.1px]">
            <p className="leading-[20px]">1</p>
          </div>
        )}
      </div>
      <div className={`flex justify-center relative shrink-0 ${isNotApplicableActive ? "bg-[#aab6b4] content-stretch items-center p-[8px] rounded-[24px]" : '[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-col font-["Open_Sans:semi-bold",sans-serif] leading-[0] not-italic text-[#4a5453] text-[14px] text-center tracking-[-0.1px] whitespace-nowrap'}`}>
        {["complete", "Partial", "complete-hover", "Disabled", "Current", "Incomplete"].includes(stepperHeader) && <p className="leading-[20px]">{isDisabled ? "Not applicable" : ["Partial", "complete-hover", "Current", "Incomplete"].includes(stepperHeader) ? "Add section" : "Add section"}</p>}
        {isNotApplicableActive && (
          <div className="relative shrink-0 size-[16px]" data-name="slash-circle-01">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6667 14.6667">
                <path clipRule="evenodd" d={svgPaths.p2f782c40} fill="var(--fill-0, white)" fillRule="evenodd" id="Solid" />
              </svg>
            </div>
          </div>
        )}
      </div>
      {isCompleteOrCompleteHover && showProgressBar && <ProgressBar className="bg-[#e5e8e7] content-stretch flex flex-col h-[3px] items-start relative rounded-[8px] shrink-0 w-[48px]" progressBar="Full" />}
      {isPartial && showProgressBar && (
        <div className="bg-[#e5e8e7] content-stretch flex flex-col h-[3px] items-start relative rounded-[8px] shrink-0 w-[48px]" data-name="Progress bar">
          <div className="bg-[#f5a50d] flex-[1_0_0] min-h-px relative rounded-[8px] w-full" />
        </div>
      )}
      {isDisabled && showProgressBar && (
        <div className="bg-[#e5e8e7] content-stretch flex flex-col h-[3px] items-start relative rounded-[8px] shrink-0 w-[48px]" data-name="Progress bar">
          <div className="bg-[#aab6b4] flex-[1_0_0] min-h-px relative rounded-[8px] w-full" />
        </div>
      )}
      {isNotApplicableActive && (
        <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] text-center tracking-[-0.1px] whitespace-nowrap">
          <p className="leading-[20px]">Not applicable</p>
        </div>
      )}
      {isNotApplicableActive && showProgressBar && (
        <div className="bg-[#e5e8e7] content-stretch flex flex-col h-[3px] items-start relative rounded-[8px] shrink-0 w-[48px]" data-name="Progress bar">
          <div className="bg-[#aab6b4] flex-[1_0_0] min-h-px relative rounded-[8px] w-full" />
        </div>
      )}
      {isCurrent && showProgressBar && (
        <div className="bg-[#e5e8e7] content-stretch flex flex-col items-start pr-[24px] relative rounded-[8px] shrink-0 w-[48px]" data-name="Progress bar">
          <div className="bg-[#00a7b5] h-[3px] relative rounded-[8px] shrink-0 w-full" />
        </div>
      )}
      {isIncomplete && showProgressBar && <ProgressBar className="bg-[#e5e8e7] content-stretch flex flex-col h-[3px] items-start pr-[24px] relative rounded-[8px] shrink-0 w-[48px]" showProgress={false} />}
    </div>
  );
}