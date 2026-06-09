import svgPaths from "./svg-oo2qodsfds";
type AccordianProps = {
  className?: string;
  open?: boolean;
  state?: "Default" | "Selected" | "Disabled";
};

export default function Accordian({ className, open = true, state = "Selected" }: AccordianProps) {
  const isDefaultOrDisabled = ["Default", "Disabled"].includes(state);
  const isOpen = open;
  return (
    <div className={className || `relative flex w-full flex-col items-stretch justify-center gap-4 rounded-[16px] p-4 ${state === "Disabled" ? "bg-[#e5e8e7]" : "bg-white"}`}>
      <div aria-hidden className={`absolute border-solid inset-0 pointer-events-none rounded-[16px] ${isDefaultOrDisabled ? "border border-[#aab6b4]" : "border-2 border-[#00a7b5]"}`} />
      <div className="relative flex w-full min-w-0 items-start gap-4">
        <div
          className={`relative flex size-4 shrink-0 items-center justify-center rounded-[4px] p-0.5 ${isDefaultOrDisabled ? "bg-white" : "bg-[#00a7b5]"}`}
          data-name="Check box"
        >
          {isDefaultOrDisabled && (
            <>
              <div aria-hidden className="absolute border border-[#aab6b4] border-solid inset-0 pointer-events-none rounded-[4px]" />
              <div className="flex-[1_0_0] h-full min-w-px overflow-clip relative" data-name="check">
                <div className="absolute bottom-1/4 left-[12.5%] right-[12.5%] top-[20.83%]" data-name="Icon (Stroke)">
                  <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 6.5">
                    <path clipRule="evenodd" d={svgPaths.p26ce6000} fill="var(--fill-0, white)" fillRule="evenodd" id="Icon (Stroke)" />
                  </svg>
                </div>
              </div>
            </>
          )}
          {state === "Selected" && (
            <div className="content-stretch flex items-center relative shrink-0 size-[12px]" data-name="Icons">
              <div className="flex-[1_0_0] h-full min-w-px relative" data-name="check">
                <div className="absolute inset-[21.74%_12.5%]" data-name="Icon (Stroke)">
                  <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 6.78261">
                    <path clipRule="evenodd" d={svgPaths.p2729a800} fill="var(--fill-0, white)" fillRule="evenodd" id="Icon (Stroke)" />
                  </svg>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1" data-name="Heading-three-caption-medium">
          <div className="flex min-w-0 flex-col gap-2">
            <div className="flex min-w-0 items-start justify-between gap-3">
              <p className="min-w-0 flex-1 break-words font-['Open_Sans:semi-bold',sans-serif] text-[18px] leading-[24px] tracking-[-0.2px] text-[#4a5453]">
                9 Church Lane, Leeds
              </p>
              <p className="shrink-0 font-['Open_Sans:regular',sans-serif] text-[14px] leading-[20px] tracking-[-0.1px] text-[#4a5453]">
                100kWh
              </p>
            </div>
            <div className="flex min-w-0 items-start justify-between gap-3">
              <p className="min-w-0 font-['Open_Sans:regular',sans-serif] text-[14px] leading-[20px] tracking-[-0.1px] text-[#4a5453]">
                Electric • Active
              </p>
              <p className="shrink-0 text-right font-['Open_Sans:semi-bold',sans-serif] text-[11px] leading-[16px] tracking-[-0.1px] text-[#aab6b4]">
                Last reading: 43 days ago
              </p>
            </div>
          </div>
        </div>

        <div className="relative flex size-6 shrink-0 items-center justify-center" data-name="Icons">
          {(isOpen || (state === "Default" && !open) || (state === "Disabled" && !open)) && (
            <div className="flex-[1_0_0] h-full min-w-px overflow-clip relative" data-name="chevron-up">
              <div className="absolute inset-[33.33%_20.83%]" data-name="Icon (Stroke)">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 8">
                  <path clipRule="evenodd" d={svgPaths.p12b6ab00} fill="var(--fill-0, #4A5453)" fillRule="evenodd" id="Icon (Stroke)" />
                </svg>
              </div>
            </div>
          )}
          {state === "Selected" && !open && (
            <div className="flex-[1_0_0] h-full min-w-px overflow-clip relative" data-name="chevron-down">
              <div className="absolute inset-[33.33%_20.83%]" data-name="Icon (Stroke)">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 8">
                  <path clipRule="evenodd" d={svgPaths.pc0a6900} fill="var(--fill-0, #4A5453)" fillRule="evenodd" id="Icon (Stroke)" />
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>
      {isOpen && (
        <div className="relative w-full shrink-0 rounded-[4px] bg-[#f5f6f6]" data-name="Upload status">
          <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[4px] border-0 border-dashed border-[#26c6da]" />
          <div className="p-4">
            <p className="font-['Open_Sans:semi-bold',sans-serif] text-[14px] leading-[20px] tracking-[-0.1px] text-[#4a5453]">
              Insert content here
            </p>
          </div>
        </div>
      )}
    </div>
  );
}