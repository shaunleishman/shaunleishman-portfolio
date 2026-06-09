import svgPaths from "./svg-ralb3m0ohc";
type CheckBoxProps = {
  className?: string;
  checkBox?: "On" | "Disabled-on" | "Hover off" | "Off" | "Disabled-off" | "Indeterminate";
  comp?: boolean;
  swapComp?: React.ReactNode | null;
};

export default function CheckBox({ className, checkBox = "Off", comp = true, swapComp = null }: CheckBoxProps) {
  const isHoverOff = checkBox === "Hover off";
  return (
    <div className={className || `content-stretch flex items-center justify-center p-[2px] relative rounded-[4px] size-[16px] ${checkBox === "Disabled-on" ? "bg-[#aab6b4]" : checkBox === "Disabled-off" ? "bg-[#e5e8e7]" : ["On", "Indeterminate"].includes(checkBox) ? "bg-[#00a7b5]" : isHoverOff ? "bg-[#e0f7fa]" : "bg-white"}`}>
      {["Off", "Hover off", "Disabled-off"].includes(checkBox) && <div aria-hidden className="absolute border border-[#aab6b4] border-solid inset-0 pointer-events-none rounded-[4px]" />}
      {["On", "Indeterminate", "Disabled-off", "Disabled-on"].includes(checkBox) && (
        <div className="content-stretch flex items-center relative shrink-0 size-[12px]" data-name="Icons">
          {["On", "Disabled-off", "Disabled-on"].includes(checkBox) && (
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="check">
              <div className="absolute inset-[21.74%_12.5%]" data-name="Icon (Stroke)">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 6.78261">
                  <path clipRule="evenodd" d={svgPaths.p2729a800} fill="var(--fill-0, white)" fillRule="evenodd" id="Icon (Stroke)" />
                </svg>
              </div>
            </div>
          )}
          {checkBox === "Indeterminate" && (
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="minus">
              <div className="absolute inset-[45.83%_16.67%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 1">
                  <path clipRule="evenodd" d={svgPaths.p39f7cd80} fill="var(--fill-0, white)" fillRule="evenodd" id="Solid" />
                </svg>
              </div>
            </div>
          )}
        </div>
      )}
      {checkBox === "Off" &&
        comp &&
        (swapComp || (
          <div className="flex-[1_0_0] h-full min-w-px overflow-clip relative" data-name="check">
            <div className="absolute bottom-1/4 left-[12.5%] right-[12.5%] top-[20.83%]" data-name="Icon (Stroke)">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 6.5">
                <path clipRule="evenodd" d={svgPaths.p26ce6000} fill="var(--fill-0, white)" fillRule="evenodd" id="Icon (Stroke)" />
              </svg>
            </div>
          </div>
        ))}
      {isHoverOff &&
        comp &&
        (swapComp || (
          <div className="flex-[1_0_0] h-full min-w-px overflow-clip relative" data-name="check">
            <div className="absolute bottom-1/4 left-[12.5%] right-[12.5%] top-[20.83%]" data-name="Icon (Stroke)">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 6.5">
                <path clipRule="evenodd" d={svgPaths.p26ce6000} fill="var(--fill-0, #E0F7FA)" fillRule="evenodd" id="Icon (Stroke)" />
              </svg>
            </div>
          </div>
        ))}
    </div>
  );
}