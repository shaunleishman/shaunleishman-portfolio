import svgPaths from "./svg-zeeykhlm45";
type ButtonMediumProps = {
  className?: string;
  buttonMd?: "Primary" | "Tertiary" | "Primary-pushed" | "Secondary-hover" | "Disabled" | "Tertiary hover" | "Secondary" | "Primary hover" | "Tertiary pushed" | "Secondary pushed" | "Focused";
  buttonText?: string;
  iconLeft?: React.ReactNode | null;
  iconLeftVis?: boolean;
  iconRight?: React.ReactNode | null;
  iconRightVis?: boolean;
  iconTextLeft?: boolean;
  textVis?: boolean;
};

export default function ButtonMedium({ className, buttonMd = "Primary", buttonText = "Button", iconLeft = null, iconLeftVis = true, iconRight = null, iconRightVis = true, iconTextLeft = true, textVis = true }: ButtonMediumProps) {
  const isDisabled = buttonMd === "Disabled";
  const isFocused = buttonMd === "Focused";
  const isPrimaryOrPrimaryHoverOrPrimaryPushed = ["Primary", "Primary hover", "Primary-pushed"].includes(buttonMd);
  const isSecondaryOrSecondaryHover = ["Secondary", "Secondary-hover"].includes(buttonMd);
  const isSecondaryPushed = buttonMd === "Secondary pushed";
  const isTertiaryOrTertiaryHoverOrTertiaryPushed = ["Tertiary", "Tertiary hover", "Tertiary pushed"].includes(buttonMd);
  return (
    <div className={className || `content-stretch flex h-[40px] items-center justify-center relative rounded-[8px] ${isFocused ? "bg-[#00a7b5] p-[2px] w-[127px]" : ["Tertiary pushed", "Disabled"].includes(buttonMd) ? "bg-[#e5e8e7] gap-[12px] p-[12px]" : buttonMd === "Tertiary hover" ? "bg-[#f5f6f6] gap-[12px] p-[12px]" : isSecondaryPushed ? "bg-[#b2ebf2] gap-[12px] p-[12px]" : buttonMd === "Secondary-hover" ? "bg-[#e0f7fa] gap-[12px] p-[12px]" : ["Secondary", "Tertiary"].includes(buttonMd) ? "bg-white gap-[12px] p-[12px]" : buttonMd === "Primary-pushed" ? "bg-[#106c7a] gap-[12px] p-[12px]" : buttonMd === "Primary hover" ? "bg-[#26c6da] gap-[12px] p-[12px]" : "bg-[#00a7b5] gap-[12px] p-[12px]"}`}>
      {["Secondary", "Secondary-hover", "Secondary pushed", "Tertiary", "Tertiary hover", "Tertiary pushed", "Focused"].includes(buttonMd) && <div aria-hidden className={`absolute border-solid inset-0 pointer-events-none rounded-[8px] ${isFocused ? "border-0 border-[#4a5453]" : isTertiaryOrTertiaryHoverOrTertiaryPushed ? "border border-[#aab6b4]" : isSecondaryPushed ? "border border-[#106c7a]" : "border border-[#00a7b5]"}`} />}
      {isPrimaryOrPrimaryHoverOrPrimaryPushed && iconTextLeft && (
        <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Button-text-icon">
          {iconLeftVis &&
            (iconLeft || (
              <div className="overflow-clip relative shrink-0 size-[16px]" data-name="plus">
                <div className="absolute inset-[16.67%]" data-name="Icon (Stroke)">
                  <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.6667 10.6667">
                    <path clipRule="evenodd" d={svgPaths.p1a739400} fill="var(--fill-0, white)" fillRule="evenodd" id="Icon (Stroke)" />
                  </svg>
                </div>
              </div>
            ))}
          {textVis && (
            <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white tracking-[-0.1px] whitespace-nowrap">
              <p className="leading-[20px]">{buttonText}</p>
            </div>
          )}
        </div>
      )}
      {isPrimaryOrPrimaryHoverOrPrimaryPushed &&
        iconRightVis &&
        (iconRight || (
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="plus icon">
            <div className="absolute inset-[16.67%]" data-name="Icon (Stroke)">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.6667 10.6667">
                <path clipRule="evenodd" d={svgPaths.p1a739400} fill="var(--fill-0, white)" fillRule="evenodd" id="Icon (Stroke)" />
              </svg>
            </div>
          </div>
        ))}
      {isTertiaryOrTertiaryHoverOrTertiaryPushed && iconTextLeft && (
        <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Button-text-icon">
          {iconLeftVis &&
            (iconLeft || (
              <div className="overflow-clip relative shrink-0 size-[16px]" data-name="plus">
                <div className="absolute inset-[16.67%]" data-name="Icon (Stroke)">
                  <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.6667 10.6667">
                    <path clipRule="evenodd" d={svgPaths.p1a739400} fill="var(--fill-0, #4A5453)" fillRule="evenodd" id="Icon (Stroke)" />
                  </svg>
                </div>
              </div>
            ))}
          {textVis && (
            <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] text-center tracking-[-0.1px] whitespace-nowrap">
              <p className="leading-[20px]">{buttonText}</p>
            </div>
          )}
        </div>
      )}
      {isTertiaryOrTertiaryHoverOrTertiaryPushed &&
        iconRightVis &&
        (iconRight || (
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="plus icon">
            <div className="absolute inset-[16.67%]" data-name="Icon (Stroke)">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.6667 10.6667">
                <path clipRule="evenodd" d={svgPaths.p1a739400} fill="var(--fill-0, #4A5453)" fillRule="evenodd" id="Icon (Stroke)" />
              </svg>
            </div>
          </div>
        ))}
      {isSecondaryOrSecondaryHover && iconTextLeft && (
        <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Button-text-icon">
          {iconLeftVis &&
            (iconLeft || (
              <div className="overflow-clip relative shrink-0 size-[16px]" data-name="plus">
                <div className="absolute inset-[16.67%]" data-name="Icon (Stroke)">
                  <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.6667 10.6667">
                    <path clipRule="evenodd" d={svgPaths.p1a739400} fill="var(--fill-0, #00A7B5)" fillRule="evenodd" id="Icon (Stroke)" />
                  </svg>
                </div>
              </div>
            ))}
          {textVis && (
            <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#00a7b5] text-[14px] text-center tracking-[-0.1px] whitespace-nowrap">
              <p className="leading-[20px]">{buttonText}</p>
            </div>
          )}
        </div>
      )}
      {isSecondaryOrSecondaryHover &&
        iconRightVis &&
        (iconRight || (
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="plus icon">
            <div className="absolute inset-[16.67%]" data-name="Icon (Stroke)">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.6667 10.6667">
                <path clipRule="evenodd" d={svgPaths.p1a739400} fill="var(--fill-0, #00A7B5)" fillRule="evenodd" id="Icon (Stroke)" />
              </svg>
            </div>
          </div>
        ))}
      {isSecondaryPushed && iconTextLeft && (
        <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Button-text-icon">
          {iconLeftVis &&
            (iconLeft || (
              <div className="overflow-clip relative shrink-0 size-[16px]" data-name="plus">
                <div className="absolute inset-[16.67%]" data-name="Icon (Stroke)">
                  <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.6667 10.6667">
                    <path clipRule="evenodd" d={svgPaths.p1a739400} fill="var(--fill-0, #106C7A)" fillRule="evenodd" id="Icon (Stroke)" />
                  </svg>
                </div>
              </div>
            ))}
          {textVis && (
            <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#106c7a] text-[14px] text-center tracking-[-0.1px] whitespace-nowrap">
              <p className="leading-[20px]">{buttonText}</p>
            </div>
          )}
        </div>
      )}
      {isSecondaryPushed &&
        iconRightVis &&
        (iconRight || (
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="plus icon">
            <div className="absolute inset-[16.67%]" data-name="Icon (Stroke)">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.6667 10.6667">
                <path clipRule="evenodd" d={svgPaths.p1a739400} fill="var(--fill-0, #106C7A)" fillRule="evenodd" id="Icon (Stroke)" />
              </svg>
            </div>
          </div>
        ))}
      {isDisabled && iconTextLeft && (
        <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Button-text-icon">
          {iconLeftVis &&
            (iconLeft || (
              <div className="overflow-clip relative shrink-0 size-[16px]" data-name="plus">
                <div className="absolute inset-[16.67%]" data-name="Icon (Stroke)">
                  <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.6667 10.6667">
                    <path clipRule="evenodd" d={svgPaths.p1a739400} fill="var(--fill-0, #AAB6B4)" fillRule="evenodd" id="Icon (Stroke)" />
                  </svg>
                </div>
              </div>
            ))}
          {textVis && (
            <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#aab6b4] text-[14px] text-center tracking-[-0.1px] whitespace-nowrap">
              <p className="leading-[20px]">{buttonText}</p>
            </div>
          )}
        </div>
      )}
      {isDisabled &&
        iconRightVis &&
        (iconRight || (
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="plus icon">
            <div className="absolute inset-[16.67%]" data-name="Icon (Stroke)">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.6667 10.6667">
                <path clipRule="evenodd" d={svgPaths.p1a739400} fill="var(--fill-0, #AAB6B4)" fillRule="evenodd" id="Icon (Stroke)" />
              </svg>
            </div>
          </div>
        ))}
      {isFocused && (
        <div className="bg-[#00a7b5] content-stretch flex flex-[1_0_0] gap-[8px] h-full items-center justify-center min-w-px relative rounded-[6px]">
          <div aria-hidden className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[6px]" />
          {iconTextLeft && (
            <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Button-text-icon">
              {iconLeftVis &&
                (iconLeft || (
                  <div className="overflow-clip relative shrink-0 size-[16px]" data-name="plus">
                    <div className="absolute inset-[16.67%]" data-name="Icon (Stroke)">
                      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.6667 10.6667">
                        <path clipRule="evenodd" d={svgPaths.p1a739400} fill="var(--fill-0, white)" fillRule="evenodd" id="Icon (Stroke)" />
                      </svg>
                    </div>
                  </div>
                ))}
              <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white tracking-[-0.1px] whitespace-nowrap">
                <p className="leading-[20px]">{buttonText}</p>
              </div>
            </div>
          )}
          {iconRightVis &&
            (iconRight || (
              <div className="overflow-clip relative shrink-0 size-[16px]" data-name="plus icon">
                <div className="absolute inset-[16.67%]" data-name="Icon (Stroke)">
                  <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.6667 10.6667">
                    <path clipRule="evenodd" d={svgPaths.p1a739400} fill="var(--fill-0, white)" fillRule="evenodd" id="Icon (Stroke)" />
                  </svg>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}