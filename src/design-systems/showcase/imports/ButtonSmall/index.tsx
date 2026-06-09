import svgPaths from "./svg-jd3dmrum61";
type ButtonSmallProps = {
  className?: string;
  buttonSm?: "Primary" | "Tertiary" | "Primary-pushed" | "Secondary-hover" | "Disabled" | "Tertiary hover" | "Secondary" | "Primary hover" | "Tertiary pushed" | "Secondary pushed" | "Focused";
  buttonText?: string;
  iconLeft?: React.ReactNode | null;
  iconLeftVis?: boolean;
  iconRight?: React.ReactNode | null;
  iconRightVis?: boolean;
  iconTextLeft?: boolean;
  textVis?: boolean;
};

export default function ButtonSmall({ className, buttonSm = "Primary", buttonText = "Button", iconLeft = null, iconLeftVis = true, iconRight = null, iconRightVis = true, iconTextLeft = true, textVis = true }: ButtonSmallProps) {
  const isDisabled = buttonSm === "Disabled";
  const isFocused = buttonSm === "Focused";
  const isPrimaryOrPrimaryHoverOrPrimaryPushed = ["Primary", "Primary hover", "Primary-pushed"].includes(buttonSm);
  const isSecondaryOrSecondaryHover = ["Secondary", "Secondary-hover"].includes(buttonSm);
  const isSecondaryPushed = buttonSm === "Secondary pushed";
  const isTertiaryOrTertiaryHoverOrTertiaryPushed = ["Tertiary", "Tertiary hover", "Tertiary pushed"].includes(buttonSm);
  return (
    <div className={className || `content-stretch flex h-[24px] items-center justify-center relative rounded-[4px] ${isFocused ? "bg-[#00a7b5] p-[2px] w-[89px]" : ["Tertiary pushed", "Disabled"].includes(buttonSm) ? "bg-[#e5e8e7] gap-[8px] p-[8px]" : buttonSm === "Tertiary hover" ? "bg-[#f5f6f6] gap-[8px] p-[8px]" : isSecondaryPushed ? "bg-[#b2ebf2] gap-[8px] p-[8px]" : buttonSm === "Secondary-hover" ? "bg-[#e0f7fa] gap-[8px] p-[8px]" : ["Secondary", "Tertiary"].includes(buttonSm) ? "bg-white gap-[8px] p-[8px]" : buttonSm === "Primary-pushed" ? "bg-[#106c7a] gap-[8px] p-[8px]" : buttonSm === "Primary hover" ? "bg-[#26c6da] gap-[8px] p-[8px]" : "bg-[#00a7b5] gap-[8px] p-[8px]"}`}>
      {["Secondary", "Secondary-hover", "Secondary pushed", "Tertiary", "Tertiary hover", "Tertiary pushed", "Focused"].includes(buttonSm) && (
        <div aria-hidden={["Secondary", "Secondary-hover", "Secondary pushed", "Tertiary", "Tertiary hover", "Tertiary pushed"].includes(buttonSm) ? true : undefined} className={isFocused ? "bg-[#00a7b5] flex-[1_0_0] h-full min-w-px relative rounded-[3px]" : isTertiaryOrTertiaryHoverOrTertiaryPushed ? "absolute border border-[#aab6b4] border-solid inset-0 pointer-events-none rounded-[4px]" : isSecondaryPushed ? "absolute border border-[#106c7a] border-solid inset-0 pointer-events-none rounded-[4px]" : "absolute border border-[#00a7b5] border-solid inset-0 pointer-events-none rounded-[4px]"}>
          {isFocused && (
            <>
              <div aria-hidden className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[3px]" />
              <div className="flex flex-row items-center justify-center size-full">
                <div className="content-stretch flex gap-[8px] items-center justify-center p-[8px] relative size-full">
                  {iconTextLeft && (
                    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Button-text-icon">
                      {iconLeftVis &&
                        (iconLeft || (
                          <div className="overflow-clip relative shrink-0 size-[12px]" data-name="plus">
                            <div className="absolute inset-[16.67%]" data-name="Icon (Stroke)">
                              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
                                <path clipRule="evenodd" d={svgPaths.pdccda00} fill="var(--fill-0, white)" fillRule="evenodd" id="Icon (Stroke)" />
                              </svg>
                            </div>
                          </div>
                        ))}
                      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-center text-white tracking-[-0.1px] whitespace-nowrap">
                        <p className="leading-[16px]">{buttonText}</p>
                      </div>
                    </div>
                  )}
                  {iconRightVis &&
                    (iconRight || (
                      <div className="overflow-clip relative shrink-0 size-[12px]" data-name="plus icon">
                        <div className="absolute inset-[16.67%]" data-name="Icon (Stroke)">
                          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
                            <path clipRule="evenodd" d={svgPaths.pdccda00} fill="var(--fill-0, white)" fillRule="evenodd" id="Icon (Stroke)" />
                          </svg>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </>
          )}
        </div>
      )}
      {isPrimaryOrPrimaryHoverOrPrimaryPushed && iconTextLeft && (
        <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Button-text-icon">
          {iconLeftVis &&
            (iconLeft || (
              <div className="overflow-clip relative shrink-0 size-[12px]" data-name="plus">
                <div className="absolute inset-[16.67%]" data-name="Icon (Stroke)">
                  <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
                    <path clipRule="evenodd" d={svgPaths.pdccda00} fill="var(--fill-0, white)" fillRule="evenodd" id="Icon (Stroke)" />
                  </svg>
                </div>
              </div>
            ))}
          {textVis && (
            <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-center text-white tracking-[-0.1px] whitespace-nowrap">
              <p className="leading-[16px]">{buttonText}</p>
            </div>
          )}
        </div>
      )}
      {isPrimaryOrPrimaryHoverOrPrimaryPushed &&
        iconRightVis &&
        (iconRight || (
          <div className="overflow-clip relative shrink-0 size-[12px]" data-name="plus icon">
            <div className="absolute inset-[16.67%]" data-name="Icon (Stroke)">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
                <path clipRule="evenodd" d={svgPaths.pdccda00} fill="var(--fill-0, white)" fillRule="evenodd" id="Icon (Stroke)" />
              </svg>
            </div>
          </div>
        ))}
      {isTertiaryOrTertiaryHoverOrTertiaryPushed && iconTextLeft && (
        <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Button-text-icon">
          {iconLeftVis &&
            (iconLeft || (
              <div className="overflow-clip relative shrink-0 size-[12px]" data-name="plus">
                <div className="absolute inset-[16.67%]" data-name="Icon (Stroke)">
                  <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
                    <path clipRule="evenodd" d={svgPaths.pdccda00} fill="var(--fill-0, #4A5453)" fillRule="evenodd" id="Icon (Stroke)" />
                  </svg>
                </div>
              </div>
            ))}
          {textVis && (
            <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[10px] text-center tracking-[-0.1px] whitespace-nowrap">
              <p className="leading-[16px]">{buttonText}</p>
            </div>
          )}
        </div>
      )}
      {isTertiaryOrTertiaryHoverOrTertiaryPushed &&
        iconRightVis &&
        (iconRight || (
          <div className="overflow-clip relative shrink-0 size-[12px]" data-name="plus icon">
            <div className="absolute inset-[16.67%]" data-name="Icon (Stroke)">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
                <path clipRule="evenodd" d={svgPaths.pdccda00} fill="var(--fill-0, #4A5453)" fillRule="evenodd" id="Icon (Stroke)" />
              </svg>
            </div>
          </div>
        ))}
      {isSecondaryOrSecondaryHover && iconTextLeft && (
        <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Button-text-icon">
          {iconLeftVis &&
            (iconLeft || (
              <div className="overflow-clip relative shrink-0 size-[12px]" data-name="plus">
                <div className="absolute inset-[16.67%]" data-name="Icon (Stroke)">
                  <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
                    <path clipRule="evenodd" d={svgPaths.pdccda00} fill="var(--fill-0, #00A7B5)" fillRule="evenodd" id="Icon (Stroke)" />
                  </svg>
                </div>
              </div>
            ))}
          {textVis && (
            <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#00a7b5] text-[10px] text-center tracking-[-0.1px] whitespace-nowrap">
              <p className="leading-[16px]">{buttonText}</p>
            </div>
          )}
        </div>
      )}
      {isSecondaryOrSecondaryHover &&
        iconRightVis &&
        (iconRight || (
          <div className="overflow-clip relative shrink-0 size-[12px]" data-name="plus icon">
            <div className="absolute inset-[16.67%]" data-name="Icon (Stroke)">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
                <path clipRule="evenodd" d={svgPaths.pdccda00} fill="var(--fill-0, #00A7B5)" fillRule="evenodd" id="Icon (Stroke)" />
              </svg>
            </div>
          </div>
        ))}
      {isSecondaryPushed && iconTextLeft && (
        <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Button-text-icon">
          {iconLeftVis &&
            (iconLeft || (
              <div className="overflow-clip relative shrink-0 size-[12px]" data-name="plus">
                <div className="absolute inset-[16.67%]" data-name="Icon (Stroke)">
                  <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
                    <path clipRule="evenodd" d={svgPaths.pdccda00} fill="var(--fill-0, #106C7A)" fillRule="evenodd" id="Icon (Stroke)" />
                  </svg>
                </div>
              </div>
            ))}
          {textVis && (
            <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#106c7a] text-[10px] text-center tracking-[-0.1px] whitespace-nowrap">
              <p className="leading-[16px]">{buttonText}</p>
            </div>
          )}
        </div>
      )}
      {isSecondaryPushed &&
        iconRightVis &&
        (iconRight || (
          <div className="overflow-clip relative shrink-0 size-[12px]" data-name="plus icon">
            <div className="absolute inset-[16.67%]" data-name="Icon (Stroke)">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
                <path clipRule="evenodd" d={svgPaths.pdccda00} fill="var(--fill-0, #106C7A)" fillRule="evenodd" id="Icon (Stroke)" />
              </svg>
            </div>
          </div>
        ))}
      {isDisabled && iconTextLeft && (
        <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Button-text-icon">
          {iconLeftVis &&
            (iconLeft || (
              <div className="overflow-clip relative shrink-0 size-[12px]" data-name="plus">
                <div className="absolute inset-[16.67%]" data-name="Icon (Stroke)">
                  <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
                    <path clipRule="evenodd" d={svgPaths.pdccda00} fill="var(--fill-0, #AAB6B4)" fillRule="evenodd" id="Icon (Stroke)" />
                  </svg>
                </div>
              </div>
            ))}
          {textVis && (
            <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#aab6b4] text-[10px] text-center tracking-[-0.1px] whitespace-nowrap">
              <p className="leading-[16px]">{buttonText}</p>
            </div>
          )}
        </div>
      )}
      {isDisabled &&
        iconRightVis &&
        (iconRight || (
          <div className="overflow-clip relative shrink-0 size-[12px]" data-name="plus icon">
            <div className="absolute inset-[16.67%]" data-name="Icon (Stroke)">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
                <path clipRule="evenodd" d={svgPaths.pdccda00} fill="var(--fill-0, #AAB6B4)" fillRule="evenodd" id="Icon (Stroke)" />
              </svg>
            </div>
          </div>
        ))}
    </div>
  );
}