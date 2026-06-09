import svgPaths from "./svg-s84veo8ajw";
type NavigationItemSectionProps = {
  className?: string;
  behaviour?: boolean;
  level?: "Menu" | "Sub-menu";
  type?: "Expande" | "Collapsed" | "Expanded";
};

export default function NavigationItemSection({ className, behaviour = true, level = "Menu", type = "Expanded" }: NavigationItemSectionProps) {
  const isBehaviourAndIsExpandedOrCollapsed = behaviour && ["Expanded", "Collapsed"].includes(type);
  const isCollapsedAndBehaviour = type === "Collapsed" && behaviour;
  const isCollapsedAndBehaviourAndMenu = type === "Collapsed" && behaviour && level === "Menu";
  const isCollapsedAndBehaviourAndSubMenu = type === "Collapsed" && behaviour && level === "Sub-menu";
  const isExpandedAndBehaviourAndSubMenu = type === "Expanded" && behaviour && level === "Sub-menu";
  return (
    <div className={className || `content-stretch flex flex-col items-start relative ${!behaviour && ["Expande", "Collapsed"].includes(type) ? "" : "cursor-pointer gap-[4px]"}`}>
      <div className={`content-stretch flex items-center p-[12px] relative rounded-[8px] shrink-0 ${type === "Collapsed" && !behaviour && level === "Sub-menu" ? "bg-[#394040] cursor-pointer gap-[16px]" : type === "Collapsed" && !behaviour && level === "Menu" ? "bg-[#232828] cursor-pointer gap-[16px]" : isCollapsedAndBehaviourAndSubMenu ? "bg-[#394040] gap-[16px]" : isCollapsedAndBehaviourAndMenu ? "bg-[#232828] gap-[16px]" : type === "Expande" && !behaviour && level === "Sub-menu" ? "bg-[#394040] cursor-pointer justify-between w-[278px]" : type === "Expande" && !behaviour && level === "Menu" ? "bg-[#232828] cursor-pointer justify-between w-[278px]" : isExpandedAndBehaviourAndSubMenu ? "bg-[#394040] justify-between w-[278px]" : "bg-[#232828] justify-between w-[278px]"}`} data-name="Menu-item">
        <div className={`content-stretch flex gap-[8px] items-center relative ${type === "Collapsed" ? "shrink-0" : "flex-[1_0_0] min-w-px"}`} data-name="Icon-menu-text">
          <div className="flex flex-row items-center self-stretch">
            <div className="bg-[#aab6b4] h-full relative rounded-[4px] shrink-0 w-[2px]" />
          </div>
          <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="plus-circle">
              <div className="absolute inset-[4.17%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
                  <path clipRule="evenodd" d={svgPaths.p2d0cd300} fill="var(--fill-0, #AAB6B4)" fillRule="evenodd" id="Solid" />
                </svg>
              </div>
            </div>
          </div>
          <div className="content-stretch flex h-[24px] items-center relative shrink-0 w-[118px]">
            <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-[1_0_0] flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] min-w-px not-italic overflow-hidden relative text-[#aab6b4] text-[14px] text-ellipsis tracking-[-0.1px] whitespace-nowrap">
              <p className="leading-[20px] overflow-hidden text-ellipsis">Menu item 1</p>
            </div>
          </div>
        </div>
        <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Double-icon">
          <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="info-circle">
              <div className="absolute inset-[4.17%]" data-name="Icon (Stroke)">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
                  <path clipRule="evenodd" d={svgPaths.p18417e00} fill="var(--fill-0, #AAB6B4)" fillRule="evenodd" id="Icon (Stroke)" />
                </svg>
              </div>
            </div>
          </div>
          <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px overflow-clip relative" data-name="chevron-up">
              <div className="absolute inset-[33.33%_20.83%]" data-name="Icon (Stroke)">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 8">
                  <path clipRule="evenodd" d={svgPaths.p12b6ab00} fill="var(--fill-0, #AAB6B4)" fillRule="evenodd" id="Icon (Stroke)" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isBehaviourAndIsExpandedOrCollapsed && (
        <>
          <div className={`content-stretch flex items-center p-[12px] relative rounded-[8px] shrink-0 ${isCollapsedAndBehaviourAndSubMenu ? "bg-[#394040] gap-[16px]" : isCollapsedAndBehaviourAndMenu ? "bg-[#232828] gap-[16px]" : isExpandedAndBehaviourAndSubMenu ? "bg-[#394040] justify-between w-[278px]" : "bg-[#232828] justify-between w-[278px]"}`} data-name="Menu-item">
            <div className={`content-stretch flex gap-[8px] items-center relative ${isCollapsedAndBehaviour ? "shrink-0" : "flex-[1_0_0] min-w-px"}`} data-name="Icon-menu-text">
              <div className="flex flex-row items-center self-stretch">
                <div className="bg-[#aab6b4] h-full relative rounded-[4px] shrink-0 w-[2px]" />
              </div>
              <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
                <div className="flex-[1_0_0] h-full min-w-px relative" data-name="plus-circle">
                  <div className="absolute inset-[4.17%]" data-name="Solid">
                    <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
                      <path clipRule="evenodd" d={svgPaths.p2d0cd300} fill="var(--fill-0, #AAB6B4)" fillRule="evenodd" id="Solid" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex h-[24px] items-center relative shrink-0 w-[118px]">
                <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-[1_0_0] flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] min-w-px not-italic overflow-hidden relative text-[#aab6b4] text-[14px] text-ellipsis tracking-[-0.1px] whitespace-nowrap">
                  <p className="leading-[20px] overflow-hidden text-ellipsis">Menu item 1</p>
                </div>
              </div>
            </div>
            <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Double-icon">
              <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
                <div className="flex-[1_0_0] h-full min-w-px relative" data-name="info-circle">
                  <div className="absolute inset-[4.17%]" data-name="Icon (Stroke)">
                    <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
                      <path clipRule="evenodd" d={svgPaths.p18417e00} fill="var(--fill-0, #AAB6B4)" fillRule="evenodd" id="Icon (Stroke)" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
                <div className="flex-[1_0_0] h-full min-w-px overflow-clip relative" data-name="chevron-up">
                  <div className="absolute inset-[33.33%_20.83%]" data-name="Icon (Stroke)">
                    <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 8">
                      <path clipRule="evenodd" d={svgPaths.p12b6ab00} fill="var(--fill-0, #AAB6B4)" fillRule="evenodd" id="Icon (Stroke)" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={`content-stretch flex items-center p-[12px] relative rounded-[8px] shrink-0 ${isCollapsedAndBehaviourAndSubMenu ? "bg-[#394040] gap-[16px]" : isCollapsedAndBehaviourAndMenu ? "bg-[#232828] gap-[16px]" : isExpandedAndBehaviourAndSubMenu ? "bg-[#394040] justify-between w-[278px]" : "bg-[#232828] justify-between w-[278px]"}`} data-name="Menu-item">
            <div className={`content-stretch flex gap-[8px] items-center relative ${isCollapsedAndBehaviour ? "shrink-0" : "flex-[1_0_0] min-w-px"}`} data-name="Icon-menu-text">
              <div className="flex flex-row items-center self-stretch">
                <div className="bg-[#aab6b4] h-full relative rounded-[4px] shrink-0 w-[2px]" />
              </div>
              <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
                <div className="flex-[1_0_0] h-full min-w-px relative" data-name="plus-circle">
                  <div className="absolute inset-[4.17%]" data-name="Solid">
                    <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
                      <path clipRule="evenodd" d={svgPaths.p2d0cd300} fill="var(--fill-0, #AAB6B4)" fillRule="evenodd" id="Solid" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex h-[24px] items-center relative shrink-0 w-[118px]">
                <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-[1_0_0] flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] min-w-px not-italic overflow-hidden relative text-[#aab6b4] text-[14px] text-ellipsis tracking-[-0.1px] whitespace-nowrap">
                  <p className="leading-[20px] overflow-hidden text-ellipsis">Menu item 1</p>
                </div>
              </div>
            </div>
            <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Double-icon">
              <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
                <div className="flex-[1_0_0] h-full min-w-px relative" data-name="info-circle">
                  <div className="absolute inset-[4.17%]" data-name="Icon (Stroke)">
                    <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
                      <path clipRule="evenodd" d={svgPaths.p18417e00} fill="var(--fill-0, #AAB6B4)" fillRule="evenodd" id="Icon (Stroke)" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
                <div className="flex-[1_0_0] h-full min-w-px overflow-clip relative" data-name="chevron-up">
                  <div className="absolute inset-[33.33%_20.83%]" data-name="Icon (Stroke)">
                    <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 8">
                      <path clipRule="evenodd" d={svgPaths.p12b6ab00} fill="var(--fill-0, #AAB6B4)" fillRule="evenodd" id="Icon (Stroke)" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={`content-stretch flex items-center p-[12px] relative rounded-[8px] shrink-0 ${isCollapsedAndBehaviourAndSubMenu ? "bg-[#394040] gap-[16px]" : isCollapsedAndBehaviourAndMenu ? "bg-[#232828] gap-[16px]" : isExpandedAndBehaviourAndSubMenu ? "bg-[#394040] justify-between w-[278px]" : "bg-[#232828] justify-between w-[278px]"}`} data-name="Menu-item">
            <div className={`content-stretch flex gap-[8px] items-center relative ${isCollapsedAndBehaviour ? "shrink-0" : "flex-[1_0_0] min-w-px"}`} data-name="Icon-menu-text">
              <div className="flex flex-row items-center self-stretch">
                <div className="bg-[#aab6b4] h-full relative rounded-[4px] shrink-0 w-[2px]" />
              </div>
              <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
                <div className="flex-[1_0_0] h-full min-w-px relative" data-name="plus-circle">
                  <div className="absolute inset-[4.17%]" data-name="Solid">
                    <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
                      <path clipRule="evenodd" d={svgPaths.p2d0cd300} fill="var(--fill-0, #AAB6B4)" fillRule="evenodd" id="Solid" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex h-[24px] items-center relative shrink-0 w-[118px]">
                <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-[1_0_0] flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] min-w-px not-italic overflow-hidden relative text-[#aab6b4] text-[14px] text-ellipsis tracking-[-0.1px] whitespace-nowrap">
                  <p className="leading-[20px] overflow-hidden text-ellipsis">Menu item 1</p>
                </div>
              </div>
            </div>
            <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Double-icon">
              <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
                <div className="flex-[1_0_0] h-full min-w-px relative" data-name="info-circle">
                  <div className="absolute inset-[4.17%]" data-name="Icon (Stroke)">
                    <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
                      <path clipRule="evenodd" d={svgPaths.p18417e00} fill="var(--fill-0, #AAB6B4)" fillRule="evenodd" id="Icon (Stroke)" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
                <div className="flex-[1_0_0] h-full min-w-px overflow-clip relative" data-name="chevron-up">
                  <div className="absolute inset-[33.33%_20.83%]" data-name="Icon (Stroke)">
                    <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 8">
                      <path clipRule="evenodd" d={svgPaths.p12b6ab00} fill="var(--fill-0, #AAB6B4)" fillRule="evenodd" id="Icon (Stroke)" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={`content-stretch flex items-center p-[12px] relative rounded-[8px] shrink-0 ${isCollapsedAndBehaviourAndSubMenu ? "bg-[#394040] gap-[16px]" : isCollapsedAndBehaviourAndMenu ? "bg-[#232828] gap-[16px]" : isExpandedAndBehaviourAndSubMenu ? "bg-[#394040] justify-between w-[278px]" : "bg-[#232828] justify-between w-[278px]"}`} data-name="Menu-item">
            <div className={`content-stretch flex gap-[8px] items-center relative ${isCollapsedAndBehaviour ? "shrink-0" : "flex-[1_0_0] min-w-px"}`} data-name="Icon-menu-text">
              <div className="flex flex-row items-center self-stretch">
                <div className="bg-[#aab6b4] h-full relative rounded-[4px] shrink-0 w-[2px]" />
              </div>
              <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
                <div className="flex-[1_0_0] h-full min-w-px relative" data-name="plus-circle">
                  <div className="absolute inset-[4.17%]" data-name="Solid">
                    <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
                      <path clipRule="evenodd" d={svgPaths.p2d0cd300} fill="var(--fill-0, #AAB6B4)" fillRule="evenodd" id="Solid" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex h-[24px] items-center relative shrink-0 w-[118px]">
                <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-[1_0_0] flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] min-w-px not-italic overflow-hidden relative text-[#aab6b4] text-[14px] text-ellipsis tracking-[-0.1px] whitespace-nowrap">
                  <p className="leading-[20px] overflow-hidden text-ellipsis">Menu item 1</p>
                </div>
              </div>
            </div>
            <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Double-icon">
              <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
                <div className="flex-[1_0_0] h-full min-w-px relative" data-name="info-circle">
                  <div className="absolute inset-[4.17%]" data-name="Icon (Stroke)">
                    <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
                      <path clipRule="evenodd" d={svgPaths.p18417e00} fill="var(--fill-0, #AAB6B4)" fillRule="evenodd" id="Icon (Stroke)" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
                <div className="flex-[1_0_0] h-full min-w-px overflow-clip relative" data-name="chevron-up">
                  <div className="absolute inset-[33.33%_20.83%]" data-name="Icon (Stroke)">
                    <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 8">
                      <path clipRule="evenodd" d={svgPaths.p12b6ab00} fill="var(--fill-0, #AAB6B4)" fillRule="evenodd" id="Icon (Stroke)" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={`content-stretch flex items-center p-[12px] relative rounded-[8px] shrink-0 ${isCollapsedAndBehaviourAndSubMenu ? "bg-[#394040] gap-[16px]" : isCollapsedAndBehaviourAndMenu ? "bg-[#232828] gap-[16px]" : isExpandedAndBehaviourAndSubMenu ? "bg-[#394040] justify-between w-[278px]" : "bg-[#232828] justify-between w-[278px]"}`} data-name="Menu-item">
            <div className={`content-stretch flex gap-[8px] items-center relative ${isCollapsedAndBehaviour ? "shrink-0" : "flex-[1_0_0] min-w-px"}`} data-name="Icon-menu-text">
              <div className="flex flex-row items-center self-stretch">
                <div className="bg-[#aab6b4] h-full relative rounded-[4px] shrink-0 w-[2px]" />
              </div>
              <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
                <div className="flex-[1_0_0] h-full min-w-px relative" data-name="plus-circle">
                  <div className="absolute inset-[4.17%]" data-name="Solid">
                    <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
                      <path clipRule="evenodd" d={svgPaths.p2d0cd300} fill="var(--fill-0, #AAB6B4)" fillRule="evenodd" id="Solid" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex h-[24px] items-center relative shrink-0 w-[118px]">
                <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-[1_0_0] flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] min-w-px not-italic overflow-hidden relative text-[#aab6b4] text-[14px] text-ellipsis tracking-[-0.1px] whitespace-nowrap">
                  <p className="leading-[20px] overflow-hidden text-ellipsis">Menu item 1</p>
                </div>
              </div>
            </div>
            <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Double-icon">
              <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
                <div className="flex-[1_0_0] h-full min-w-px relative" data-name="info-circle">
                  <div className="absolute inset-[4.17%]" data-name="Icon (Stroke)">
                    <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
                      <path clipRule="evenodd" d={svgPaths.p18417e00} fill="var(--fill-0, #AAB6B4)" fillRule="evenodd" id="Icon (Stroke)" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
                <div className="flex-[1_0_0] h-full min-w-px overflow-clip relative" data-name="chevron-up">
                  <div className="absolute inset-[33.33%_20.83%]" data-name="Icon (Stroke)">
                    <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 8">
                      <path clipRule="evenodd" d={svgPaths.p12b6ab00} fill="var(--fill-0, #AAB6B4)" fillRule="evenodd" id="Icon (Stroke)" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}