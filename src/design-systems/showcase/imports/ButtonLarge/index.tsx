import svgPaths from "./svg-gjy4ehrs13";
type ButtonLargeProps = {
  className?: string;
  buttonText?: string;
  iconLeft?: React.ReactNode | null;
  iconLeftVis?: boolean;
  iconRight?: React.ReactNode | null;
  iconRightVis?: boolean;
  iconTextLeft?: boolean;
  size?: "Large";
  state?: "Enabled" | "Hover" | "Pressed" | "Focus" | "Disabled";
  style?: "Primary" | "Secondary" | "Tertiary";
  textVis?: boolean;
};

export default function ButtonLarge({ className, buttonText = "Button", iconLeft = null, iconLeftVis = true, iconRight = null, iconRightVis = true, iconTextLeft = true, size = "Large", state = "Enabled", style = "Primary", textVis = true }: ButtonLargeProps) {
  const isLargeAndDisabledAndPrimary = size === "Large" && state === "Disabled" && style === "Primary";
  const isLargeAndFocusAndIsSecondaryOrTertiary = size === "Large" && state === "Focus" && ["Secondary", "Tertiary"].includes(style);
  const isLargeAndFocusAndPrimary = size === "Large" && state === "Focus" && style === "Primary";
  const isLargeAndFocusAndSecondary = size === "Large" && state === "Focus" && style === "Secondary";
  const isLargeAndFocusAndTertiary = size === "Large" && state === "Focus" && style === "Tertiary";
  const isLargeAndPressedAndSecondary = size === "Large" && state === "Pressed" && style === "Secondary";
  const isLargeAndPrimaryAndIsEnabledOrHoverOrPressed = size === "Large" && style === "Primary" && ["Enabled", "Hover", "Pressed"].includes(state);
  const isLargeAndSecondaryAndIsEnabledOrHover = size === "Large" && style === "Secondary" && ["Enabled", "Hover"].includes(state);
  const isLargeAndTertiaryAndIsEnabledOrHoverOrPressed = size === "Large" && style === "Tertiary" && ["Enabled", "Hover", "Pressed"].includes(state);
  return (
    <div className={className || `content-stretch flex h-[52px] items-center justify-center relative rounded-[16px] ${size === "Large" && ((state === "Pressed" && style === "Tertiary") || (state === "Disabled" && style === "Primary")) ? "bg-[#e5e8e7] gap-[8px] p-[16px]" : size === "Large" && state === "Hover" && style === "Tertiary" ? "bg-[#f5f6f6] gap-[8px] p-[16px]" : isLargeAndFocusAndIsSecondaryOrTertiary ? "bg-white p-[4px] w-[149px]" : isLargeAndPressedAndSecondary ? "bg-[#b2ebf2] gap-[8px] p-[16px]" : size === "Large" && state === "Hover" && style === "Secondary" ? "bg-[#e0f7fa] gap-[8px] p-[16px]" : size === "Large" && state === "Enabled" && ["Secondary", "Tertiary"].includes(style) ? "bg-white gap-[8px] p-[16px]" : isLargeAndFocusAndPrimary ? "bg-[#00a7b5] p-[4px] w-[149px]" : size === "Large" && state === "Pressed" && style === "Primary" ? "bg-[#106c7a] gap-[8px] p-[16px]" : size === "Large" && state === "Hover" && style === "Primary" ? "bg-[#26c6da] gap-[8px] p-[16px]" : "bg-[#00a7b5] gap-[8px] p-[16px]"}`}>
      {size === "Large" && (state === "Focus" || (state === "Enabled" && style === "Secondary") || (state === "Hover" && style === "Secondary") || (state === "Pressed" && style === "Secondary") || (state === "Enabled" && style === "Tertiary") || (state === "Hover" && style === "Tertiary") || (state === "Pressed" && style === "Tertiary")) && (
        <div aria-hidden={size === "Large" && ((state === "Enabled" && style === "Secondary") || (state === "Hover" && style === "Secondary") || (state === "Pressed" && style === "Secondary") || (state === "Focus" && style === "Secondary") || (state === "Enabled" && style === "Tertiary") || (state === "Hover" && style === "Tertiary") || (state === "Pressed" && style === "Tertiary") || (state === "Focus" && style === "Tertiary")) ? true : undefined} className={size === "Large" && style === "Tertiary" && ["Enabled", "Hover", "Pressed", "Focus"].includes(state) ? "absolute border border-[#aab6b4] border-solid inset-0 pointer-events-none rounded-[16px]" : isLargeAndPressedAndSecondary ? "absolute border border-[#106c7a] border-solid inset-0 pointer-events-none rounded-[16px]" : size === "Large" && style === "Secondary" && ["Enabled", "Hover", "Focus"].includes(state) ? "absolute border border-[#00a7b5] border-solid inset-0 pointer-events-none rounded-[16px]" : "content-stretch flex flex-[1_0_0] gap-[8px] h-full items-center justify-center min-w-px relative rounded-[12px]"}>
          {isLargeAndFocusAndPrimary && <div aria-hidden className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[12px]" />}
          {isLargeAndFocusAndPrimary && iconTextLeft && (
            <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Button-text-icon">
              {iconLeftVis &&
                (iconLeft || (
                  <div className="overflow-clip relative shrink-0 size-[24px]" data-name="plus">
                    <div className="absolute inset-[16.67%]" data-name="Icon (Stroke)">
                      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                        <path clipRule="evenodd" d={svgPaths.p16b5cf80} fill="var(--fill-0, white)" fillRule="evenodd" id="Icon (Stroke)" />
                      </svg>
                    </div>
                  </div>
                ))}
              {textVis && (
                <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-center text-white tracking-[-0.1px] whitespace-nowrap">
                  <p className="leading-[24px]">{buttonText}</p>
                </div>
              )}
            </div>
          )}
          {isLargeAndFocusAndPrimary &&
            iconRightVis &&
            (iconRight || (
              <div className="overflow-clip relative shrink-0 size-[24px]" data-name="plus icon">
                <div className="absolute inset-[16.67%]" data-name="Icon (Stroke)">
                  <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                    <path clipRule="evenodd" d={svgPaths.p16b5cf80} fill="var(--fill-0, white)" fillRule="evenodd" id="Icon (Stroke)" />
                  </svg>
                </div>
              </div>
            ))}
        </div>
      )}
      {isLargeAndPrimaryAndIsEnabledOrHoverOrPressed && iconTextLeft && (
        <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Button-text-icon">
          {iconLeftVis &&
            (iconLeft || (
              <div className="overflow-clip relative shrink-0 size-[24px]" data-name="plus">
                <div className="absolute inset-[16.67%]" data-name="Icon (Stroke)">
                  <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                    <path clipRule="evenodd" d={svgPaths.p16b5cf80} fill="var(--fill-0, white)" fillRule="evenodd" id="Icon (Stroke)" />
                  </svg>
                </div>
              </div>
            ))}
          {textVis && (
            <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-center text-white tracking-[-0.1px] whitespace-nowrap">
              <p className="leading-[24px]">{buttonText}</p>
            </div>
          )}
        </div>
      )}
      {isLargeAndPrimaryAndIsEnabledOrHoverOrPressed &&
        iconRightVis &&
        (iconRight || (
          <div className="overflow-clip relative shrink-0 size-[24px]" data-name="plus icon">
            <div className="absolute inset-[16.67%]" data-name="Icon (Stroke)">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                <path clipRule="evenodd" d={svgPaths.p16b5cf80} fill="var(--fill-0, white)" fillRule="evenodd" id="Icon (Stroke)" />
              </svg>
            </div>
          </div>
        ))}
      {isLargeAndTertiaryAndIsEnabledOrHoverOrPressed && iconTextLeft && (
        <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Button-text-icon">
          {iconLeftVis &&
            (iconLeft || (
              <div className="overflow-clip relative shrink-0 size-[24px]" data-name="plus">
                <div className="absolute inset-[16.67%]" data-name="Icon (Stroke)">
                  <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                    <path clipRule="evenodd" d={svgPaths.p16b5cf80} fill="var(--fill-0, #4A5453)" fillRule="evenodd" id="Icon (Stroke)" />
                  </svg>
                </div>
              </div>
            ))}
          {textVis && (
            <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[16px] text-center tracking-[-0.1px] whitespace-nowrap">
              <p className="leading-[24px]">{buttonText}</p>
            </div>
          )}
        </div>
      )}
      {isLargeAndTertiaryAndIsEnabledOrHoverOrPressed &&
        iconRightVis &&
        (iconRight || (
          <div className="overflow-clip relative shrink-0 size-[24px]" data-name="plus icon">
            <div className="absolute inset-[16.67%]" data-name="Icon (Stroke)">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                <path clipRule="evenodd" d={svgPaths.p16b5cf80} fill="var(--fill-0, #4A5453)" fillRule="evenodd" id="Icon (Stroke)" />
              </svg>
            </div>
          </div>
        ))}
      {isLargeAndSecondaryAndIsEnabledOrHover && iconTextLeft && (
        <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Button-text-icon">
          {iconLeftVis &&
            (iconLeft || (
              <div className="overflow-clip relative shrink-0 size-[24px]" data-name="plus">
                <div className="absolute inset-[16.67%]" data-name="Icon (Stroke)">
                  <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                    <path clipRule="evenodd" d={svgPaths.p16b5cf80} fill="var(--fill-0, #00A7B5)" fillRule="evenodd" id="Icon (Stroke)" />
                  </svg>
                </div>
              </div>
            ))}
          {textVis && (
            <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#00a7b5] text-[16px] text-center tracking-[-0.1px] whitespace-nowrap">
              <p className="leading-[24px]">{buttonText}</p>
            </div>
          )}
        </div>
      )}
      {isLargeAndSecondaryAndIsEnabledOrHover &&
        iconRightVis &&
        (iconRight || (
          <div className="overflow-clip relative shrink-0 size-[24px]" data-name="plus icon">
            <div className="absolute inset-[16.67%]" data-name="Icon (Stroke)">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                <path clipRule="evenodd" d={svgPaths.p16b5cf80} fill="var(--fill-0, #00A7B5)" fillRule="evenodd" id="Icon (Stroke)" />
              </svg>
            </div>
          </div>
        ))}
      {isLargeAndFocusAndIsSecondaryOrTertiary && (
        <div className="content-stretch flex flex-[1_0_0] gap-[8px] h-full items-center justify-center min-w-px relative rounded-[12px]">
          <div aria-hidden className={`absolute border border-solid inset-0 pointer-events-none rounded-[12px] ${isLargeAndFocusAndTertiary ? "border-[#aab6b4]" : "border-[#00a7b5]"}`} />
          {isLargeAndFocusAndSecondary && iconTextLeft && (
            <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Button-text-icon">
              {iconLeftVis &&
                (iconLeft || (
                  <div className="overflow-clip relative shrink-0 size-[24px]" data-name="plus">
                    <div className="absolute inset-[16.67%]" data-name="Icon (Stroke)">
                      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                        <path clipRule="evenodd" d={svgPaths.p16b5cf80} fill="var(--fill-0, #00A7B5)" fillRule="evenodd" id="Icon (Stroke)" />
                      </svg>
                    </div>
                  </div>
                ))}
              {textVis && (
                <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#00a7b5] text-[16px] text-center tracking-[-0.1px] whitespace-nowrap">
                  <p className="leading-[24px]">{buttonText}</p>
                </div>
              )}
            </div>
          )}
          {isLargeAndFocusAndSecondary &&
            iconRightVis &&
            (iconRight || (
              <div className="overflow-clip relative shrink-0 size-[24px]" data-name="plus icon">
                <div className="absolute inset-[16.67%]" data-name="Icon (Stroke)">
                  <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                    <path clipRule="evenodd" d={svgPaths.p16b5cf80} fill="var(--fill-0, #00A7B5)" fillRule="evenodd" id="Icon (Stroke)" />
                  </svg>
                </div>
              </div>
            ))}
          {isLargeAndFocusAndTertiary && iconTextLeft && (
            <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Button-text-icon">
              {iconLeftVis &&
                (iconLeft || (
                  <div className="overflow-clip relative shrink-0 size-[24px]" data-name="plus">
                    <div className="absolute inset-[16.67%]" data-name="Icon (Stroke)">
                      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                        <path clipRule="evenodd" d={svgPaths.p16b5cf80} fill="var(--fill-0, #4A5453)" fillRule="evenodd" id="Icon (Stroke)" />
                      </svg>
                    </div>
                  </div>
                ))}
              {textVis && (
                <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[16px] text-center tracking-[-0.1px] whitespace-nowrap">
                  <p className="leading-[24px]">{buttonText}</p>
                </div>
              )}
            </div>
          )}
          {isLargeAndFocusAndTertiary &&
            iconRightVis &&
            (iconRight || (
              <div className="overflow-clip relative shrink-0 size-[24px]" data-name="plus icon">
                <div className="absolute inset-[16.67%]" data-name="Icon (Stroke)">
                  <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                    <path clipRule="evenodd" d={svgPaths.p16b5cf80} fill="var(--fill-0, #4A5453)" fillRule="evenodd" id="Icon (Stroke)" />
                  </svg>
                </div>
              </div>
            ))}
        </div>
      )}
      {isLargeAndPressedAndSecondary && iconTextLeft && (
        <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Button-text-icon">
          {iconLeftVis &&
            (iconLeft || (
              <div className="overflow-clip relative shrink-0 size-[24px]" data-name="plus">
                <div className="absolute inset-[16.67%]" data-name="Icon (Stroke)">
                  <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                    <path clipRule="evenodd" d={svgPaths.p16b5cf80} fill="var(--fill-0, #106C7A)" fillRule="evenodd" id="Icon (Stroke)" />
                  </svg>
                </div>
              </div>
            ))}
          {textVis && (
            <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#106c7a] text-[16px] text-center tracking-[-0.1px] whitespace-nowrap">
              <p className="leading-[24px]">{buttonText}</p>
            </div>
          )}
        </div>
      )}
      {isLargeAndPressedAndSecondary &&
        iconRightVis &&
        (iconRight || (
          <div className="overflow-clip relative shrink-0 size-[24px]" data-name="plus icon">
            <div className="absolute inset-[16.67%]" data-name="Icon (Stroke)">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                <path clipRule="evenodd" d={svgPaths.p16b5cf80} fill="var(--fill-0, #106C7A)" fillRule="evenodd" id="Icon (Stroke)" />
              </svg>
            </div>
          </div>
        ))}
      {isLargeAndDisabledAndPrimary && iconTextLeft && (
        <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Button-text-icon">
          {iconLeftVis &&
            (iconLeft || (
              <div className="overflow-clip relative shrink-0 size-[24px]" data-name="plus">
                <div className="absolute inset-[16.67%]" data-name="Icon (Stroke)">
                  <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                    <path clipRule="evenodd" d={svgPaths.p16b5cf80} fill="var(--fill-0, #AAB6B4)" fillRule="evenodd" id="Icon (Stroke)" />
                  </svg>
                </div>
              </div>
            ))}
          {textVis && (
            <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#aab6b4] text-[16px] text-center tracking-[-0.1px] whitespace-nowrap">
              <p className="leading-[24px]">{buttonText}</p>
            </div>
          )}
        </div>
      )}
      {isLargeAndDisabledAndPrimary &&
        iconRightVis &&
        (iconRight || (
          <div className="overflow-clip relative shrink-0 size-[24px]" data-name="plus icon">
            <div className="absolute inset-[16.67%]" data-name="Icon (Stroke)">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                <path clipRule="evenodd" d={svgPaths.p16b5cf80} fill="var(--fill-0, #AAB6B4)" fillRule="evenodd" id="Icon (Stroke)" />
              </svg>
            </div>
          </div>
        ))}
    </div>
  );
}