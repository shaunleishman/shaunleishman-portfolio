import svgPaths from "./svg-1u8mf0xh0z";
type ChipProps = {
  className?: string;
  colour?: "Default" | "Dark" | "Grey" | "Error" | "Success" | "Caution" | "Purple";
  iconBefore?: boolean;
  showIcons?: boolean;
  showText?: boolean;
  size?: "Tiny" | "Small" | "Medium" | "Large";
  type?: "Outlined" | "Fill";
};

export default function Chip({ className, colour = "Default", iconBefore = true, showIcons = true, showText = true, size = "Tiny", type = "Fill" }: ChipProps) {
  if (size === "Small" && colour === "Default" && type === "Fill") {
    return (
      <div className={className || "bg-[#e0f7fa] content-stretch flex gap-[6px] items-center justify-center px-[8px] py-[6px] relative rounded-[8px]"} data-name="Size=Small, Colour=Default, Type=Fill">
        {iconBefore && (
          <div className="content-stretch flex items-center relative shrink-0 size-[16px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="user-02">
              <div className="absolute inset-[8.33%_11.01%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.4764 13.3333">
                  <g id="Solid">
                    <path clipRule="evenodd" d={svgPaths.p2fb5fa00} fill="var(--fill-0, #106C7A)" fillRule="evenodd" />
                    <path clipRule="evenodd" d={svgPaths.p34bb4700} fill="var(--fill-0, #106C7A)" fillRule="evenodd" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        )}
        {showText && (
          <div className="content-stretch flex h-[16px] items-center justify-center relative shrink-0">
            <div className="[word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#106c7a] text-[12px] text-center tracking-[-0.1px] whitespace-nowrap">
              <p className="leading-[16px]">Small chip</p>
            </div>
          </div>
        )}
        {showIcons && (
          <div className="content-stretch flex items-center relative shrink-0 size-[16px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="x-close">
              <div className="absolute inset-[20.83%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33333 9.33333">
                  <path d={svgPaths.p34f6d300} fill="var(--fill-0, #106C7A)" id="Solid" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (size === "Medium" && colour === "Default" && type === "Fill") {
    return (
      <div className={className || "bg-[#e0f7fa] content-stretch flex gap-[8px] items-center justify-center px-[10px] py-[6px] relative rounded-[8px]"} data-name="Size=Medium, Colour=Default, Type=Fill">
        {iconBefore && (
          <div className="content-stretch flex items-center relative shrink-0 size-[20px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="user-02">
              <div className="absolute inset-[8.33%_11.01%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.5955 16.6667">
                  <g id="Solid">
                    <path clipRule="evenodd" d={svgPaths.p2ab7bbf0} fill="var(--fill-0, #106C7A)" fillRule="evenodd" />
                    <path clipRule="evenodd" d={svgPaths.p26531900} fill="var(--fill-0, #106C7A)" fillRule="evenodd" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        )}
        {showText && (
          <div className="content-stretch flex h-[20px] items-center justify-center relative shrink-0">
            <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#106c7a] text-[14px] text-center tracking-[-0.1px] whitespace-nowrap">
              <p className="leading-[20px]">Medium chip</p>
            </div>
          </div>
        )}
        {showIcons && (
          <div className="content-stretch flex items-center relative shrink-0 size-[20px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="x-close">
              <div className="absolute inset-[20.83%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 11.6667">
                  <path d={svgPaths.p3000be80} fill="var(--fill-0, #106C7A)" id="Solid" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (size === "Large" && colour === "Default" && type === "Fill") {
    return (
      <div className={className || "bg-[#e0f7fa] content-stretch flex gap-[10px] items-center justify-center px-[12px] py-[8px] relative rounded-[8px]"} data-name="Size=Large, Colour=Default, Type=Fill">
        {iconBefore && (
          <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="user-02">
              <div className="absolute inset-[8.33%_11.01%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.7146 20">
                  <g id="Solid">
                    <path clipRule="evenodd" d={svgPaths.p37c7d200} fill="var(--fill-0, #106C7A)" fillRule="evenodd" />
                    <path clipRule="evenodd" d={svgPaths.p5d00500} fill="var(--fill-0, #106C7A)" fillRule="evenodd" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        )}
        {showText && (
          <div className="content-stretch flex h-[24px] items-center justify-center relative shrink-0">
            <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#106c7a] text-[16px] text-center tracking-[-0.1px] whitespace-nowrap">
              <p className="leading-[24px]">Large chip</p>
            </div>
          </div>
        )}
        {showIcons && (
          <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="x-close">
              <div className="absolute inset-[20.83%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
                  <path d={svgPaths.p371efd00} fill="var(--fill-0, #106C7A)" id="Solid" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (size === "Tiny" && colour === "Dark" && type === "Fill") {
    return (
      <div className={className || "bg-[#106c7a] content-stretch flex gap-[4px] items-center justify-center px-[6px] py-[4px] relative rounded-[8px]"} data-name="Size=Tiny, Colour=Dark, Type=Fill">
        {iconBefore && (
          <div className="content-stretch flex items-center relative shrink-0 size-[12px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="user-02">
              <div className="absolute inset-[8.33%_11.01%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.35728 10">
                  <g id="Solid">
                    <path clipRule="evenodd" d={svgPaths.p2f36a300} fill="var(--fill-0, white)" fillRule="evenodd" />
                    <path clipRule="evenodd" d={svgPaths.p31444400} fill="var(--fill-0, white)" fillRule="evenodd" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        )}
        {showText && (
          <div className="content-stretch flex h-[12px] items-center justify-center relative shrink-0">
            <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-center text-white tracking-[-0.1px] whitespace-nowrap">
              <p className="leading-[16px]">Tiny chip</p>
            </div>
          </div>
        )}
        {showIcons && (
          <div className="content-stretch flex items-center relative shrink-0 size-[12px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="x-close">
              <div className="absolute inset-[20.83%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 7">
                  <path d={svgPaths.p10c97f80} fill="var(--fill-0, white)" id="Solid" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (size === "Small" && colour === "Dark" && type === "Fill") {
    return (
      <div className={className || "bg-[#106c7a] content-stretch flex gap-[6px] items-center justify-center px-[8px] py-[6px] relative rounded-[8px]"} data-name="Size=Small, Colour=Dark, Type=Fill">
        {iconBefore && (
          <div className="content-stretch flex items-center relative shrink-0 size-[16px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="user-02">
              <div className="absolute inset-[8.33%_11.01%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.4764 13.3333">
                  <g id="Solid">
                    <path clipRule="evenodd" d={svgPaths.p2fb5fa00} fill="var(--fill-0, white)" fillRule="evenodd" />
                    <path clipRule="evenodd" d={svgPaths.p34bb4700} fill="var(--fill-0, white)" fillRule="evenodd" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        )}
        {showText && (
          <div className="content-stretch flex h-[16px] items-center justify-center relative shrink-0">
            <div className="[word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-center text-white tracking-[-0.1px] whitespace-nowrap">
              <p className="leading-[16px]">Small chip</p>
            </div>
          </div>
        )}
        {showIcons && (
          <div className="content-stretch flex items-center relative shrink-0 size-[16px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="x-close">
              <div className="absolute inset-[20.83%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33333 9.33333">
                  <path d={svgPaths.p34f6d300} fill="var(--fill-0, white)" id="Solid" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (size === "Medium" && colour === "Dark" && type === "Fill") {
    return (
      <div className={className || "bg-[#106c7a] content-stretch flex gap-[8px] items-center justify-center px-[10px] py-[6px] relative rounded-[8px]"} data-name="Size=Medium, Colour=Dark, Type=Fill">
        {iconBefore && (
          <div className="content-stretch flex items-center relative shrink-0 size-[20px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="user-02">
              <div className="absolute inset-[8.33%_11.01%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.5955 16.6667">
                  <g id="Solid">
                    <path clipRule="evenodd" d={svgPaths.p2ab7bbf0} fill="var(--fill-0, white)" fillRule="evenodd" />
                    <path clipRule="evenodd" d={svgPaths.p26531900} fill="var(--fill-0, white)" fillRule="evenodd" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        )}
        {showText && (
          <div className="content-stretch flex h-[20px] items-center justify-center relative shrink-0">
            <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white tracking-[-0.1px] whitespace-nowrap">
              <p className="leading-[20px]">Medium chip</p>
            </div>
          </div>
        )}
        {showIcons && (
          <div className="content-stretch flex items-center relative shrink-0 size-[20px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="x-close">
              <div className="absolute inset-[20.83%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 11.6667">
                  <path d={svgPaths.p3000be80} fill="var(--fill-0, white)" id="Solid" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (size === "Large" && colour === "Dark" && type === "Fill") {
    return (
      <div className={className || "bg-[#106c7a] content-stretch flex gap-[10px] items-center justify-center px-[12px] py-[8px] relative rounded-[8px]"} data-name="Size=Large, Colour=Dark, Type=Fill">
        {iconBefore && (
          <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="user-02">
              <div className="absolute inset-[8.33%_11.01%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.7146 20">
                  <g id="Solid">
                    <path clipRule="evenodd" d={svgPaths.p37c7d200} fill="var(--fill-0, white)" fillRule="evenodd" />
                    <path clipRule="evenodd" d={svgPaths.p5d00500} fill="var(--fill-0, white)" fillRule="evenodd" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        )}
        {showText && (
          <div className="content-stretch flex h-[24px] items-center justify-center relative shrink-0">
            <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-center text-white tracking-[-0.1px] whitespace-nowrap">
              <p className="leading-[24px]">Large chip</p>
            </div>
          </div>
        )}
        {showIcons && (
          <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="x-close">
              <div className="absolute inset-[20.83%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
                  <path d={svgPaths.p371efd00} fill="var(--fill-0, white)" id="Solid" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (size === "Tiny" && colour === "Dark" && type === "Outlined") {
    return (
      <div className={className || "bg-white content-stretch flex gap-[4px] items-center justify-center px-[6px] py-[4px] relative rounded-[8px]"} data-name="Size=Tiny, Colour=Dark, Type=Outlined">
        <div aria-hidden className="absolute border border-[#106c7a] border-solid inset-[-0.5px] pointer-events-none rounded-[8.5px]" />
        {iconBefore && (
          <div className="content-stretch flex items-center relative shrink-0 size-[12px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="user-02">
              <div className="absolute inset-[8.33%_11.01%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.35728 10">
                  <g id="Solid">
                    <path clipRule="evenodd" d={svgPaths.p2f36a300} fill="var(--fill-0, #106C7A)" fillRule="evenodd" />
                    <path clipRule="evenodd" d={svgPaths.p31444400} fill="var(--fill-0, #106C7A)" fillRule="evenodd" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        )}
        {showText && (
          <div className="content-stretch flex h-[12px] items-center justify-center relative shrink-0">
            <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#106c7a] text-[10px] text-center tracking-[-0.1px] whitespace-nowrap">
              <p className="leading-[16px]">Tiny chip</p>
            </div>
          </div>
        )}
        {showIcons && (
          <div className="content-stretch flex items-center relative shrink-0 size-[12px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="x-close">
              <div className="absolute inset-[20.83%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 7">
                  <path d={svgPaths.p10c97f80} fill="var(--fill-0, #106C7A)" id="Solid" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (size === "Small" && colour === "Dark" && type === "Outlined") {
    return (
      <div className={className || "bg-white content-stretch flex gap-[6px] items-center justify-center px-[8px] py-[6px] relative rounded-[8px]"} data-name="Size=Small, Colour=Dark, Type=Outlined">
        <div aria-hidden className="absolute border border-[#106c7a] border-solid inset-[-0.5px] pointer-events-none rounded-[8.5px]" />
        {iconBefore && (
          <div className="content-stretch flex items-center relative shrink-0 size-[16px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="user-02">
              <div className="absolute inset-[8.33%_11.01%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.4764 13.3333">
                  <g id="Solid">
                    <path clipRule="evenodd" d={svgPaths.p2fb5fa00} fill="var(--fill-0, #106C7A)" fillRule="evenodd" />
                    <path clipRule="evenodd" d={svgPaths.p34bb4700} fill="var(--fill-0, #106C7A)" fillRule="evenodd" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        )}
        {showText && (
          <div className="content-stretch flex h-[16px] items-center justify-center relative shrink-0">
            <div className="[word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#106c7a] text-[12px] text-center tracking-[-0.1px] whitespace-nowrap">
              <p className="leading-[16px]">Small chip</p>
            </div>
          </div>
        )}
        {showIcons && (
          <div className="content-stretch flex items-center relative shrink-0 size-[16px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="x-close">
              <div className="absolute inset-[20.83%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33333 9.33333">
                  <path d={svgPaths.p34f6d300} fill="var(--fill-0, #106C7A)" id="Solid" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (size === "Medium" && colour === "Dark" && type === "Outlined") {
    return (
      <div className={className || "bg-white content-stretch flex gap-[8px] items-center justify-center px-[10px] py-[6px] relative rounded-[8px]"} data-name="Size=Medium, Colour=Dark, Type=Outlined">
        <div aria-hidden className="absolute border border-[#106c7a] border-solid inset-[-0.5px] pointer-events-none rounded-[8.5px]" />
        {iconBefore && (
          <div className="content-stretch flex items-center relative shrink-0 size-[20px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="user-02">
              <div className="absolute inset-[8.33%_11.01%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.5955 16.6667">
                  <g id="Solid">
                    <path clipRule="evenodd" d={svgPaths.p2ab7bbf0} fill="var(--fill-0, #106C7A)" fillRule="evenodd" />
                    <path clipRule="evenodd" d={svgPaths.p26531900} fill="var(--fill-0, #106C7A)" fillRule="evenodd" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        )}
        {showText && (
          <div className="content-stretch flex h-[20px] items-center justify-center relative shrink-0">
            <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#106c7a] text-[14px] text-center tracking-[-0.1px] whitespace-nowrap">
              <p className="leading-[20px]">Medium chip</p>
            </div>
          </div>
        )}
        {showIcons && (
          <div className="content-stretch flex items-center relative shrink-0 size-[20px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="x-close">
              <div className="absolute inset-[20.83%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 11.6667">
                  <path d={svgPaths.p3000be80} fill="var(--fill-0, #106C7A)" id="Solid" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (size === "Large" && colour === "Dark" && type === "Outlined") {
    return (
      <div className={className || "bg-white content-stretch flex gap-[10px] items-center justify-center px-[12px] py-[8px] relative rounded-[8px]"} data-name="Size=Large, Colour=Dark, Type=Outlined">
        <div aria-hidden className="absolute border border-[#106c7a] border-solid inset-[-0.5px] pointer-events-none rounded-[8.5px]" />
        {iconBefore && (
          <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="user-02">
              <div className="absolute inset-[8.33%_11.01%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.7146 20">
                  <g id="Solid">
                    <path clipRule="evenodd" d={svgPaths.p37c7d200} fill="var(--fill-0, #106C7A)" fillRule="evenodd" />
                    <path clipRule="evenodd" d={svgPaths.p5d00500} fill="var(--fill-0, #106C7A)" fillRule="evenodd" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        )}
        {showText && (
          <div className="content-stretch flex h-[24px] items-center justify-center relative shrink-0">
            <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#106c7a] text-[16px] text-center tracking-[-0.1px] whitespace-nowrap">
              <p className="leading-[24px]">Large chip</p>
            </div>
          </div>
        )}
        {showIcons && (
          <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="x-close">
              <div className="absolute inset-[20.83%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
                  <path d={svgPaths.p371efd00} fill="var(--fill-0, #106C7A)" id="Solid" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (size === "Tiny" && colour === "Grey" && type === "Fill") {
    return (
      <div className={className || "bg-[#e5e8e7] content-stretch flex gap-[4px] items-center justify-center px-[6px] py-[4px] relative rounded-[8px]"} data-name="Size=Tiny, Colour=Grey, Type=Fill">
        {iconBefore && (
          <div className="content-stretch flex items-center relative shrink-0 size-[12px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="user-02">
              <div className="absolute inset-[8.33%_11.01%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.35728 10">
                  <g id="Solid">
                    <path clipRule="evenodd" d={svgPaths.p2f36a300} fill="var(--fill-0, #4A5453)" fillRule="evenodd" />
                    <path clipRule="evenodd" d={svgPaths.p31444400} fill="var(--fill-0, #4A5453)" fillRule="evenodd" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        )}
        {showText && (
          <div className="content-stretch flex h-[12px] items-center justify-center relative shrink-0">
            <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[10px] text-center tracking-[-0.1px] whitespace-nowrap">
              <p className="leading-[16px]">Tiny chip</p>
            </div>
          </div>
        )}
        {showIcons && (
          <div className="content-stretch flex items-center relative shrink-0 size-[12px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="x-close">
              <div className="absolute inset-[20.83%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 7">
                  <path d={svgPaths.p10c97f80} fill="var(--fill-0, #4A5453)" id="Solid" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (size === "Small" && colour === "Grey" && type === "Fill") {
    return (
      <div className={className || "bg-[#e5e8e7] content-stretch flex gap-[6px] items-center justify-center px-[8px] py-[6px] relative rounded-[8px]"} data-name="Size=Small, Colour=Grey, Type=Fill">
        {iconBefore && (
          <div className="content-stretch flex items-center relative shrink-0 size-[16px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="user-02">
              <div className="absolute inset-[8.33%_11.01%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.4764 13.3333">
                  <g id="Solid">
                    <path clipRule="evenodd" d={svgPaths.p2fb5fa00} fill="var(--fill-0, #4A5453)" fillRule="evenodd" />
                    <path clipRule="evenodd" d={svgPaths.p34bb4700} fill="var(--fill-0, #4A5453)" fillRule="evenodd" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        )}
        {showText && (
          <div className="content-stretch flex h-[16px] items-center justify-center relative shrink-0">
            <div className="[word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[12px] text-center tracking-[-0.1px] whitespace-nowrap">
              <p className="leading-[16px]">Small chip</p>
            </div>
          </div>
        )}
        {showIcons && (
          <div className="content-stretch flex items-center relative shrink-0 size-[16px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="x-close">
              <div className="absolute inset-[20.83%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33333 9.33333">
                  <path d={svgPaths.p34f6d300} fill="var(--fill-0, #4A5453)" id="Solid" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (size === "Medium" && colour === "Grey" && type === "Fill") {
    return (
      <div className={className || "bg-[#e5e8e7] content-stretch flex gap-[8px] items-center justify-center px-[10px] py-[6px] relative rounded-[8px]"} data-name="Size=Medium, Colour=Grey, Type=Fill">
        {iconBefore && (
          <div className="content-stretch flex items-center relative shrink-0 size-[20px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="user-02">
              <div className="absolute inset-[8.33%_11.01%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.5955 16.6667">
                  <g id="Solid">
                    <path clipRule="evenodd" d={svgPaths.p2ab7bbf0} fill="var(--fill-0, #4A5453)" fillRule="evenodd" />
                    <path clipRule="evenodd" d={svgPaths.p26531900} fill="var(--fill-0, #4A5453)" fillRule="evenodd" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        )}
        {showText && (
          <div className="content-stretch flex h-[20px] items-center justify-center relative shrink-0">
            <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] text-center tracking-[-0.1px] whitespace-nowrap">
              <p className="leading-[20px]">Medium chip</p>
            </div>
          </div>
        )}
        {showIcons && (
          <div className="content-stretch flex items-center relative shrink-0 size-[20px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="x-close">
              <div className="absolute inset-[20.83%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 11.6667">
                  <path d={svgPaths.p3000be80} fill="var(--fill-0, #4A5453)" id="Solid" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (size === "Large" && colour === "Grey" && type === "Fill") {
    return (
      <div className={className || "bg-[#e5e8e7] content-stretch flex gap-[10px] items-center justify-center px-[12px] py-[8px] relative rounded-[8px]"} data-name="Size=Large, Colour=Grey, Type=Fill">
        {iconBefore && (
          <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="user-02">
              <div className="absolute inset-[8.33%_11.01%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.7146 20">
                  <g id="Solid">
                    <path clipRule="evenodd" d={svgPaths.p37c7d200} fill="var(--fill-0, #4A5453)" fillRule="evenodd" />
                    <path clipRule="evenodd" d={svgPaths.p5d00500} fill="var(--fill-0, #4A5453)" fillRule="evenodd" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        )}
        {showText && (
          <div className="content-stretch flex h-[24px] items-center justify-center relative shrink-0">
            <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[16px] text-center tracking-[-0.1px] whitespace-nowrap">
              <p className="leading-[24px]">Large chip</p>
            </div>
          </div>
        )}
        {showIcons && (
          <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="x-close">
              <div className="absolute inset-[20.83%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
                  <path d={svgPaths.p371efd00} fill="var(--fill-0, #4A5453)" id="Solid" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (size === "Tiny" && colour === "Grey" && type === "Outlined") {
    return (
      <div className={className || "bg-white content-stretch flex gap-[4px] items-center justify-center px-[6px] py-[4px] relative rounded-[8px]"} data-name="Size=Tiny, Colour=Grey, Type=Outlined">
        <div aria-hidden className="absolute border border-[#4a5453] border-solid inset-[-0.5px] pointer-events-none rounded-[8.5px]" />
        {iconBefore && (
          <div className="content-stretch flex items-center relative shrink-0 size-[12px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="user-02">
              <div className="absolute inset-[8.33%_11.01%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.35728 10">
                  <g id="Solid">
                    <path clipRule="evenodd" d={svgPaths.p2f36a300} fill="var(--fill-0, #4A5453)" fillRule="evenodd" />
                    <path clipRule="evenodd" d={svgPaths.p31444400} fill="var(--fill-0, #4A5453)" fillRule="evenodd" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        )}
        {showText && (
          <div className="content-stretch flex h-[12px] items-center justify-center relative shrink-0">
            <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[10px] text-center tracking-[-0.1px] whitespace-nowrap">
              <p className="leading-[16px]">Tiny chip</p>
            </div>
          </div>
        )}
        {showIcons && (
          <div className="content-stretch flex items-center relative shrink-0 size-[12px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="x-close">
              <div className="absolute inset-[20.83%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 7">
                  <path d={svgPaths.p10c97f80} fill="var(--fill-0, #4A5453)" id="Solid" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (size === "Small" && colour === "Grey" && type === "Outlined") {
    return (
      <div className={className || "bg-white content-stretch flex gap-[6px] items-center justify-center px-[8px] py-[6px] relative rounded-[8px]"} data-name="Size=Small, Colour=Grey, Type=Outlined">
        <div aria-hidden className="absolute border border-[#4a5453] border-solid inset-[-0.5px] pointer-events-none rounded-[8.5px]" />
        {iconBefore && (
          <div className="content-stretch flex items-center relative shrink-0 size-[16px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="user-02">
              <div className="absolute inset-[8.33%_11.01%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.4764 13.3333">
                  <g id="Solid">
                    <path clipRule="evenodd" d={svgPaths.p2fb5fa00} fill="var(--fill-0, #4A5453)" fillRule="evenodd" />
                    <path clipRule="evenodd" d={svgPaths.p34bb4700} fill="var(--fill-0, #4A5453)" fillRule="evenodd" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        )}
        {showText && (
          <div className="content-stretch flex h-[16px] items-center justify-center relative shrink-0">
            <div className="[word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[12px] text-center tracking-[-0.1px] whitespace-nowrap">
              <p className="leading-[16px]">Small chip</p>
            </div>
          </div>
        )}
        {showIcons && (
          <div className="content-stretch flex items-center relative shrink-0 size-[16px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="x-close">
              <div className="absolute inset-[20.83%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33333 9.33333">
                  <path d={svgPaths.p34f6d300} fill="var(--fill-0, #4A5453)" id="Solid" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (size === "Medium" && colour === "Grey" && type === "Outlined") {
    return (
      <div className={className || "bg-white content-stretch flex gap-[8px] items-center justify-center px-[10px] py-[6px] relative rounded-[8px]"} data-name="Size=Medium, Colour=Grey, Type=Outlined">
        <div aria-hidden className="absolute border border-[#4a5453] border-solid inset-[-0.5px] pointer-events-none rounded-[8.5px]" />
        {iconBefore && (
          <div className="content-stretch flex items-center relative shrink-0 size-[20px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="user-02">
              <div className="absolute inset-[8.33%_11.01%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.5955 16.6667">
                  <g id="Solid">
                    <path clipRule="evenodd" d={svgPaths.p2ab7bbf0} fill="var(--fill-0, #4A5453)" fillRule="evenodd" />
                    <path clipRule="evenodd" d={svgPaths.p26531900} fill="var(--fill-0, #4A5453)" fillRule="evenodd" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        )}
        {showText && (
          <div className="content-stretch flex h-[20px] items-center justify-center relative shrink-0">
            <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] text-center tracking-[-0.1px] whitespace-nowrap">
              <p className="leading-[20px]">Medium chip</p>
            </div>
          </div>
        )}
        {showIcons && (
          <div className="content-stretch flex items-center relative shrink-0 size-[20px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="x-close">
              <div className="absolute inset-[20.83%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 11.6667">
                  <path d={svgPaths.p3000be80} fill="var(--fill-0, #4A5453)" id="Solid" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (size === "Large" && colour === "Grey" && type === "Outlined") {
    return (
      <div className={className || "bg-white content-stretch flex gap-[10px] items-center justify-center px-[12px] py-[8px] relative rounded-[8px]"} data-name="Size=Large, Colour=Grey, Type=Outlined">
        <div aria-hidden className="absolute border border-[#4a5453] border-solid inset-[-0.5px] pointer-events-none rounded-[8.5px]" />
        {iconBefore && (
          <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="user-02">
              <div className="absolute inset-[8.33%_11.01%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.7146 20">
                  <g id="Solid">
                    <path clipRule="evenodd" d={svgPaths.p37c7d200} fill="var(--fill-0, #4A5453)" fillRule="evenodd" />
                    <path clipRule="evenodd" d={svgPaths.p5d00500} fill="var(--fill-0, #4A5453)" fillRule="evenodd" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        )}
        {showText && (
          <div className="content-stretch flex h-[24px] items-center justify-center relative shrink-0">
            <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[16px] text-center tracking-[-0.1px] whitespace-nowrap">
              <p className="leading-[24px]">Large chip</p>
            </div>
          </div>
        )}
        {showIcons && (
          <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="x-close">
              <div className="absolute inset-[20.83%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
                  <path d={svgPaths.p371efd00} fill="var(--fill-0, #4A5453)" id="Solid" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (size === "Tiny" && colour === "Error" && type === "Fill") {
    return (
      <div className={className || "bg-[#ffe6e1] content-stretch flex gap-[4px] items-center justify-center px-[6px] py-[4px] relative rounded-[8px]"} data-name="Size=Tiny, Colour=Error, Type=Fill">
        {iconBefore && (
          <div className="content-stretch flex items-center relative shrink-0 size-[12px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="user-02">
              <div className="absolute inset-[8.33%_11.01%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.35728 10">
                  <g id="Solid">
                    <path clipRule="evenodd" d={svgPaths.p2f36a300} fill="var(--fill-0, #D04A21)" fillRule="evenodd" />
                    <path clipRule="evenodd" d={svgPaths.p31444400} fill="var(--fill-0, #D04A21)" fillRule="evenodd" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        )}
        {showText && (
          <div className="content-stretch flex h-[12px] items-center justify-center relative shrink-0">
            <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#d04a21] text-[10px] text-center tracking-[-0.1px] whitespace-nowrap">
              <p className="leading-[16px]">Tiny chip</p>
            </div>
          </div>
        )}
        {showIcons && (
          <div className="content-stretch flex items-center relative shrink-0 size-[12px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="x-close">
              <div className="absolute inset-[20.83%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 7">
                  <path d={svgPaths.p10c97f80} fill="var(--fill-0, #D04A21)" id="Solid" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (size === "Small" && colour === "Error" && type === "Fill") {
    return (
      <div className={className || "bg-[#ffe6e1] content-stretch flex gap-[6px] items-center justify-center px-[8px] py-[6px] relative rounded-[8px]"} data-name="Size=Small, Colour=Error, Type=Fill">
        {iconBefore && (
          <div className="content-stretch flex items-center relative shrink-0 size-[16px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="user-02">
              <div className="absolute inset-[8.33%_11.01%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.4764 13.3333">
                  <g id="Solid">
                    <path clipRule="evenodd" d={svgPaths.p2fb5fa00} fill="var(--fill-0, #D04A21)" fillRule="evenodd" />
                    <path clipRule="evenodd" d={svgPaths.p34bb4700} fill="var(--fill-0, #D04A21)" fillRule="evenodd" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        )}
        {showText && (
          <div className="content-stretch flex h-[16px] items-center justify-center relative shrink-0">
            <div className="[word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#d04a21] text-[12px] text-center tracking-[-0.1px] whitespace-nowrap">
              <p className="leading-[16px]">Small chip</p>
            </div>
          </div>
        )}
        {showIcons && (
          <div className="content-stretch flex items-center relative shrink-0 size-[16px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="x-close">
              <div className="absolute inset-[20.83%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33333 9.33333">
                  <path d={svgPaths.p34f6d300} fill="var(--fill-0, #D04A21)" id="Solid" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (size === "Medium" && colour === "Error" && type === "Fill") {
    return (
      <div className={className || "bg-[#ffe6e1] content-stretch flex gap-[8px] items-center justify-center px-[10px] py-[6px] relative rounded-[8px]"} data-name="Size=Medium, Colour=Error, Type=Fill">
        {iconBefore && (
          <div className="content-stretch flex items-center relative shrink-0 size-[20px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="user-02">
              <div className="absolute inset-[8.33%_11.01%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.5955 16.6667">
                  <g id="Solid">
                    <path clipRule="evenodd" d={svgPaths.p2ab7bbf0} fill="var(--fill-0, #D04A21)" fillRule="evenodd" />
                    <path clipRule="evenodd" d={svgPaths.p26531900} fill="var(--fill-0, #D04A21)" fillRule="evenodd" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        )}
        {showText && (
          <div className="content-stretch flex h-[20px] items-center justify-center relative shrink-0">
            <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#d04a21] text-[14px] text-center tracking-[-0.1px] whitespace-nowrap">
              <p className="leading-[20px]">Medium chip</p>
            </div>
          </div>
        )}
        {showIcons && (
          <div className="content-stretch flex items-center relative shrink-0 size-[20px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="x-close">
              <div className="absolute inset-[20.83%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 11.6667">
                  <path d={svgPaths.p3000be80} fill="var(--fill-0, #D04A21)" id="Solid" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (size === "Large" && colour === "Error" && type === "Fill") {
    return (
      <div className={className || "bg-[#ffe6e1] content-stretch flex gap-[10px] items-center justify-center px-[12px] py-[8px] relative rounded-[8px]"} data-name="Size=Large, Colour=Error, Type=Fill">
        {iconBefore && (
          <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="user-02">
              <div className="absolute inset-[8.33%_11.01%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.7146 20">
                  <g id="Solid">
                    <path clipRule="evenodd" d={svgPaths.p37c7d200} fill="var(--fill-0, #D04A21)" fillRule="evenodd" />
                    <path clipRule="evenodd" d={svgPaths.p5d00500} fill="var(--fill-0, #D04A21)" fillRule="evenodd" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        )}
        {showText && (
          <div className="content-stretch flex h-[24px] items-center justify-center relative shrink-0">
            <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#d04a21] text-[16px] text-center tracking-[-0.1px] whitespace-nowrap">
              <p className="leading-[24px]">Large chip</p>
            </div>
          </div>
        )}
        {showIcons && (
          <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="x-close">
              <div className="absolute inset-[20.83%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
                  <path d={svgPaths.p371efd00} fill="var(--fill-0, #D04A21)" id="Solid" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (size === "Tiny" && colour === "Error" && type === "Outlined") {
    return (
      <div className={className || "bg-white content-stretch flex gap-[4px] items-center justify-center px-[6px] py-[4px] relative rounded-[8px]"} data-name="Size=Tiny, Colour=Error, Type=Outlined">
        <div aria-hidden className="absolute border border-[#d04a21] border-solid inset-[-0.5px] pointer-events-none rounded-[8.5px]" />
        {iconBefore && (
          <div className="content-stretch flex items-center relative shrink-0 size-[12px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="user-02">
              <div className="absolute inset-[8.33%_11.01%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.35728 10">
                  <g id="Solid">
                    <path clipRule="evenodd" d={svgPaths.p2f36a300} fill="var(--fill-0, #D04A21)" fillRule="evenodd" />
                    <path clipRule="evenodd" d={svgPaths.p31444400} fill="var(--fill-0, #D04A21)" fillRule="evenodd" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        )}
        {showText && (
          <div className="content-stretch flex h-[12px] items-center justify-center relative shrink-0">
            <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#d04a21] text-[10px] text-center tracking-[-0.1px] whitespace-nowrap">
              <p className="leading-[16px]">Tiny chip</p>
            </div>
          </div>
        )}
        {showIcons && (
          <div className="content-stretch flex items-center relative shrink-0 size-[12px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="x-close">
              <div className="absolute inset-[20.83%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 7">
                  <path d={svgPaths.p10c97f80} fill="var(--fill-0, #D04A21)" id="Solid" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (size === "Small" && colour === "Error" && type === "Outlined") {
    return (
      <div className={className || "bg-white content-stretch flex gap-[6px] items-center justify-center px-[8px] py-[6px] relative rounded-[8px]"} data-name="Size=Small, Colour=Error, Type=Outlined">
        <div aria-hidden className="absolute border border-[#d04a21] border-solid inset-[-0.5px] pointer-events-none rounded-[8.5px]" />
        {iconBefore && (
          <div className="content-stretch flex items-center relative shrink-0 size-[16px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="user-02">
              <div className="absolute inset-[8.33%_11.01%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.4764 13.3333">
                  <g id="Solid">
                    <path clipRule="evenodd" d={svgPaths.p2fb5fa00} fill="var(--fill-0, #D04A21)" fillRule="evenodd" />
                    <path clipRule="evenodd" d={svgPaths.p34bb4700} fill="var(--fill-0, #D04A21)" fillRule="evenodd" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        )}
        {showText && (
          <div className="content-stretch flex h-[16px] items-center justify-center relative shrink-0">
            <div className="[word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#d04a21] text-[12px] text-center tracking-[-0.1px] whitespace-nowrap">
              <p className="leading-[16px]">Small chip</p>
            </div>
          </div>
        )}
        {showIcons && (
          <div className="content-stretch flex items-center relative shrink-0 size-[16px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="x-close">
              <div className="absolute inset-[20.83%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33333 9.33333">
                  <path d={svgPaths.p34f6d300} fill="var(--fill-0, #D04A21)" id="Solid" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (size === "Medium" && colour === "Error" && type === "Outlined") {
    return (
      <div className={className || "bg-white content-stretch flex gap-[8px] items-center justify-center px-[10px] py-[6px] relative rounded-[8px]"} data-name="Size=Medium, Colour=Error, Type=Outlined">
        <div aria-hidden className="absolute border border-[#d04a21] border-solid inset-[-0.5px] pointer-events-none rounded-[8.5px]" />
        {iconBefore && (
          <div className="content-stretch flex items-center relative shrink-0 size-[20px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="user-02">
              <div className="absolute inset-[8.33%_11.01%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.5955 16.6667">
                  <g id="Solid">
                    <path clipRule="evenodd" d={svgPaths.p2ab7bbf0} fill="var(--fill-0, #D04A21)" fillRule="evenodd" />
                    <path clipRule="evenodd" d={svgPaths.p26531900} fill="var(--fill-0, #D04A21)" fillRule="evenodd" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        )}
        {showText && (
          <div className="content-stretch flex h-[20px] items-center justify-center relative shrink-0">
            <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#d04a21] text-[14px] text-center tracking-[-0.1px] whitespace-nowrap">
              <p className="leading-[20px]">Medium chip</p>
            </div>
          </div>
        )}
        {showIcons && (
          <div className="content-stretch flex items-center relative shrink-0 size-[20px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="x-close">
              <div className="absolute inset-[20.83%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 11.6667">
                  <path d={svgPaths.p3000be80} fill="var(--fill-0, #D04A21)" id="Solid" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (size === "Large" && colour === "Error" && type === "Outlined") {
    return (
      <div className={className || "bg-white content-stretch flex gap-[10px] items-center justify-center px-[12px] py-[8px] relative rounded-[8px]"} data-name="Size=Large, Colour=Error, Type=Outlined">
        <div aria-hidden className="absolute border border-[#d04a21] border-solid inset-[-0.5px] pointer-events-none rounded-[8.5px]" />
        {iconBefore && (
          <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="user-02">
              <div className="absolute inset-[8.33%_11.01%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.7146 20">
                  <g id="Solid">
                    <path clipRule="evenodd" d={svgPaths.p37c7d200} fill="var(--fill-0, #D04A21)" fillRule="evenodd" />
                    <path clipRule="evenodd" d={svgPaths.p5d00500} fill="var(--fill-0, #D04A21)" fillRule="evenodd" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        )}
        {showText && (
          <div className="content-stretch flex h-[24px] items-center justify-center relative shrink-0">
            <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#d04a21] text-[16px] text-center tracking-[-0.1px] whitespace-nowrap">
              <p className="leading-[24px]">Large chip</p>
            </div>
          </div>
        )}
        {showIcons && (
          <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="x-close">
              <div className="absolute inset-[20.83%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
                  <path d={svgPaths.p371efd00} fill="var(--fill-0, #D04A21)" id="Solid" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (size === "Tiny" && colour === "Caution" && type === "Fill") {
    return (
      <div className={className || "bg-[#fff4e5] content-stretch flex gap-[4px] items-center justify-center px-[6px] py-[4px] relative rounded-[8px]"} data-name="Size=Tiny, Colour=Caution, Type=Fill">
        {iconBefore && (
          <div className="content-stretch flex items-center relative shrink-0 size-[12px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="user-02">
              <div className="absolute inset-[8.33%_11.01%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.35728 10">
                  <g id="Solid">
                    <path clipRule="evenodd" d={svgPaths.p2f36a300} fill="var(--fill-0, #F5A50D)" fillRule="evenodd" />
                    <path clipRule="evenodd" d={svgPaths.p31444400} fill="var(--fill-0, #F5A50D)" fillRule="evenodd" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        )}
        {showText && (
          <div className="content-stretch flex h-[12px] items-center justify-center relative shrink-0">
            <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#f5a50d] text-[10px] text-center tracking-[-0.1px] whitespace-nowrap">
              <p className="leading-[16px]">Tiny chip</p>
            </div>
          </div>
        )}
        {showIcons && (
          <div className="content-stretch flex items-center relative shrink-0 size-[12px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="x-close">
              <div className="absolute inset-[20.83%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 7">
                  <path d={svgPaths.p10c97f80} fill="var(--fill-0, #F5A50D)" id="Solid" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (size === "Small" && colour === "Caution" && type === "Fill") {
    return (
      <div className={className || "bg-[#fff4e5] content-stretch flex gap-[6px] items-center justify-center px-[8px] py-[6px] relative rounded-[8px]"} data-name="Size=Small, Colour=Caution, Type=Fill">
        {iconBefore && (
          <div className="content-stretch flex items-center relative shrink-0 size-[16px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="user-02">
              <div className="absolute inset-[8.33%_11.01%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.4764 13.3333">
                  <g id="Solid">
                    <path clipRule="evenodd" d={svgPaths.p2fb5fa00} fill="var(--fill-0, #F5A50D)" fillRule="evenodd" />
                    <path clipRule="evenodd" d={svgPaths.p34bb4700} fill="var(--fill-0, #F5A50D)" fillRule="evenodd" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        )}
        {showText && (
          <div className="content-stretch flex h-[16px] items-center justify-center relative shrink-0">
            <div className="[word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#f5a50d] text-[12px] text-center tracking-[-0.1px] whitespace-nowrap">
              <p className="leading-[16px]">Small chip</p>
            </div>
          </div>
        )}
        {showIcons && (
          <div className="content-stretch flex items-center relative shrink-0 size-[16px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="x-close">
              <div className="absolute inset-[20.83%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33333 9.33333">
                  <path d={svgPaths.p34f6d300} fill="var(--fill-0, #F5A50D)" id="Solid" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (size === "Medium" && colour === "Caution" && type === "Fill") {
    return (
      <div className={className || "bg-[#fff4e5] content-stretch flex gap-[8px] items-center justify-center px-[10px] py-[6px] relative rounded-[8px]"} data-name="Size=Medium, Colour=Caution, Type=Fill">
        {iconBefore && (
          <div className="content-stretch flex items-center relative shrink-0 size-[20px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="user-02">
              <div className="absolute inset-[8.33%_11.01%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.5955 16.6667">
                  <g id="Solid">
                    <path clipRule="evenodd" d={svgPaths.p2ab7bbf0} fill="var(--fill-0, #F5A50D)" fillRule="evenodd" />
                    <path clipRule="evenodd" d={svgPaths.p26531900} fill="var(--fill-0, #F5A50D)" fillRule="evenodd" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        )}
        {showText && (
          <div className="content-stretch flex h-[20px] items-center justify-center relative shrink-0">
            <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#f5a50d] text-[14px] text-center tracking-[-0.1px] whitespace-nowrap">
              <p className="leading-[20px]">Medium chip</p>
            </div>
          </div>
        )}
        {showIcons && (
          <div className="content-stretch flex items-center relative shrink-0 size-[20px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="x-close">
              <div className="absolute inset-[20.83%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 11.6667">
                  <path d={svgPaths.p3000be80} fill="var(--fill-0, #F5A50D)" id="Solid" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (size === "Large" && colour === "Caution" && type === "Fill") {
    return (
      <div className={className || "bg-[#fff4e5] content-stretch flex gap-[10px] items-center justify-center px-[12px] py-[8px] relative rounded-[8px]"} data-name="Size=Large, Colour=Caution, Type=Fill">
        {iconBefore && (
          <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="user-02">
              <div className="absolute inset-[8.33%_11.01%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.7146 20">
                  <g id="Solid">
                    <path clipRule="evenodd" d={svgPaths.p37c7d200} fill="var(--fill-0, #F5A50D)" fillRule="evenodd" />
                    <path clipRule="evenodd" d={svgPaths.p5d00500} fill="var(--fill-0, #F5A50D)" fillRule="evenodd" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        )}
        {showText && (
          <div className="content-stretch flex h-[24px] items-center justify-center relative shrink-0">
            <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#f5a50d] text-[16px] text-center tracking-[-0.1px] whitespace-nowrap">
              <p className="leading-[24px]">Large chip</p>
            </div>
          </div>
        )}
        {showIcons && (
          <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="x-close">
              <div className="absolute inset-[20.83%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
                  <path d={svgPaths.p371efd00} fill="var(--fill-0, #F5A50D)" id="Solid" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (size === "Tiny" && colour === "Caution" && type === "Outlined") {
    return (
      <div className={className || "bg-white content-stretch flex gap-[4px] items-center justify-center px-[6px] py-[4px] relative rounded-[8px]"} data-name="Size=Tiny, Colour=Caution, Type=Outlined">
        <div aria-hidden className="absolute border border-[#f5a50d] border-solid inset-[-0.5px] pointer-events-none rounded-[8.5px]" />
        {iconBefore && (
          <div className="content-stretch flex items-center relative shrink-0 size-[12px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="user-02">
              <div className="absolute inset-[8.33%_11.01%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.35728 10">
                  <g id="Solid">
                    <path clipRule="evenodd" d={svgPaths.p2f36a300} fill="var(--fill-0, #F5A50D)" fillRule="evenodd" />
                    <path clipRule="evenodd" d={svgPaths.p31444400} fill="var(--fill-0, #F5A50D)" fillRule="evenodd" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        )}
        {showText && (
          <div className="content-stretch flex h-[12px] items-center justify-center relative shrink-0">
            <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#f5a50d] text-[10px] text-center tracking-[-0.1px] whitespace-nowrap">
              <p className="leading-[16px]">Tiny chip</p>
            </div>
          </div>
        )}
        {showIcons && (
          <div className="content-stretch flex items-center relative shrink-0 size-[12px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="x-close">
              <div className="absolute inset-[20.83%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 7">
                  <path d={svgPaths.p10c97f80} fill="var(--fill-0, #F5A50D)" id="Solid" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (size === "Small" && colour === "Caution" && type === "Outlined") {
    return (
      <div className={className || "bg-white content-stretch flex gap-[6px] items-center justify-center px-[8px] py-[6px] relative rounded-[8px]"} data-name="Size=Small, Colour=Caution, Type=Outlined">
        <div aria-hidden className="absolute border border-[#f5a50d] border-solid inset-[-0.5px] pointer-events-none rounded-[8.5px]" />
        {iconBefore && (
          <div className="content-stretch flex items-center relative shrink-0 size-[16px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="user-02">
              <div className="absolute inset-[8.33%_11.01%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.4764 13.3333">
                  <g id="Solid">
                    <path clipRule="evenodd" d={svgPaths.p2fb5fa00} fill="var(--fill-0, #F5A50D)" fillRule="evenodd" />
                    <path clipRule="evenodd" d={svgPaths.p34bb4700} fill="var(--fill-0, #F5A50D)" fillRule="evenodd" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        )}
        {showText && (
          <div className="content-stretch flex h-[16px] items-center justify-center relative shrink-0">
            <div className="[word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#f5a50d] text-[12px] text-center tracking-[-0.1px] whitespace-nowrap">
              <p className="leading-[16px]">Small chip</p>
            </div>
          </div>
        )}
        {showIcons && (
          <div className="content-stretch flex items-center relative shrink-0 size-[16px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="x-close">
              <div className="absolute inset-[20.83%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33333 9.33333">
                  <path d={svgPaths.p34f6d300} fill="var(--fill-0, #F5A50D)" id="Solid" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (size === "Medium" && colour === "Caution" && type === "Outlined") {
    return (
      <div className={className || "bg-white content-stretch flex gap-[8px] items-center justify-center px-[10px] py-[6px] relative rounded-[8px]"} data-name="Size=Medium, Colour=Caution, Type=Outlined">
        <div aria-hidden className="absolute border border-[#f5a50d] border-solid inset-[-0.5px] pointer-events-none rounded-[8.5px]" />
        {iconBefore && (
          <div className="content-stretch flex items-center relative shrink-0 size-[20px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="user-02">
              <div className="absolute inset-[8.33%_11.01%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.5955 16.6667">
                  <g id="Solid">
                    <path clipRule="evenodd" d={svgPaths.p2ab7bbf0} fill="var(--fill-0, #F5A50D)" fillRule="evenodd" />
                    <path clipRule="evenodd" d={svgPaths.p26531900} fill="var(--fill-0, #F5A50D)" fillRule="evenodd" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        )}
        {showText && (
          <div className="content-stretch flex h-[20px] items-center justify-center relative shrink-0">
            <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#f5a50d] text-[14px] text-center tracking-[-0.1px] whitespace-nowrap">
              <p className="leading-[20px]">Medium chip</p>
            </div>
          </div>
        )}
        {showIcons && (
          <div className="content-stretch flex items-center relative shrink-0 size-[20px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="x-close">
              <div className="absolute inset-[20.83%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 11.6667">
                  <path d={svgPaths.p3000be80} fill="var(--fill-0, #F5A50D)" id="Solid" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (size === "Large" && colour === "Caution" && type === "Outlined") {
    return (
      <div className={className || "bg-white content-stretch flex gap-[10px] items-center justify-center px-[12px] py-[8px] relative rounded-[8px]"} data-name="Size=Large, Colour=Caution, Type=Outlined">
        <div aria-hidden className="absolute border border-[#f5a50d] border-solid inset-[-0.5px] pointer-events-none rounded-[8.5px]" />
        {iconBefore && (
          <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="user-02">
              <div className="absolute inset-[8.33%_11.01%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.7146 20">
                  <g id="Solid">
                    <path clipRule="evenodd" d={svgPaths.p37c7d200} fill="var(--fill-0, #F5A50D)" fillRule="evenodd" />
                    <path clipRule="evenodd" d={svgPaths.p5d00500} fill="var(--fill-0, #F5A50D)" fillRule="evenodd" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        )}
        {showText && (
          <div className="content-stretch flex h-[24px] items-center justify-center relative shrink-0">
            <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#f5a50d] text-[16px] text-center tracking-[-0.1px] whitespace-nowrap">
              <p className="leading-[24px]">Large chip</p>
            </div>
          </div>
        )}
        {showIcons && (
          <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="x-close">
              <div className="absolute inset-[20.83%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
                  <path d={svgPaths.p371efd00} fill="var(--fill-0, #F5A50D)" id="Solid" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (size === "Tiny" && colour === "Success" && type === "Fill") {
    return (
      <div className={className || "bg-[#ecffea] content-stretch flex gap-[4px] items-center justify-center px-[6px] py-[4px] relative rounded-[8px]"} data-name="Size=Tiny, Colour=Success, Type=Fill">
        {iconBefore && (
          <div className="content-stretch flex items-center relative shrink-0 size-[12px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="user-02">
              <div className="absolute inset-[8.33%_11.01%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.35728 10">
                  <g id="Solid">
                    <path clipRule="evenodd" d={svgPaths.p2f36a300} fill="var(--fill-0, #4CA843)" fillRule="evenodd" />
                    <path clipRule="evenodd" d={svgPaths.p31444400} fill="var(--fill-0, #4CA843)" fillRule="evenodd" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        )}
        {showText && (
          <div className="content-stretch flex h-[12px] items-center justify-center relative shrink-0">
            <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4ca843] text-[10px] text-center tracking-[-0.1px] whitespace-nowrap">
              <p className="leading-[16px]">Tiny chip</p>
            </div>
          </div>
        )}
        {showIcons && (
          <div className="content-stretch flex items-center relative shrink-0 size-[12px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="x-close">
              <div className="absolute inset-[20.83%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 7">
                  <path d={svgPaths.p10c97f80} fill="var(--fill-0, #4CA843)" id="Solid" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (size === "Small" && colour === "Success" && type === "Fill") {
    return (
      <div className={className || "bg-[#ecffea] content-stretch flex gap-[6px] items-center justify-center px-[8px] py-[6px] relative rounded-[8px]"} data-name="Size=Small, Colour=Success, Type=Fill">
        {iconBefore && (
          <div className="content-stretch flex items-center relative shrink-0 size-[16px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="user-02">
              <div className="absolute inset-[8.33%_11.01%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.4764 13.3333">
                  <g id="Solid">
                    <path clipRule="evenodd" d={svgPaths.p2fb5fa00} fill="var(--fill-0, #4CA843)" fillRule="evenodd" />
                    <path clipRule="evenodd" d={svgPaths.p34bb4700} fill="var(--fill-0, #4CA843)" fillRule="evenodd" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        )}
        {showText && (
          <div className="content-stretch flex h-[16px] items-center justify-center relative shrink-0">
            <div className="[word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4ca843] text-[12px] text-center tracking-[-0.1px] whitespace-nowrap">
              <p className="leading-[16px]">Small chip</p>
            </div>
          </div>
        )}
        {showIcons && (
          <div className="content-stretch flex items-center relative shrink-0 size-[16px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="x-close">
              <div className="absolute inset-[20.83%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33333 9.33333">
                  <path d={svgPaths.p34f6d300} fill="var(--fill-0, #4CA843)" id="Solid" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (size === "Medium" && colour === "Success" && type === "Fill") {
    return (
      <div className={className || "bg-[#ecffea] content-stretch flex gap-[8px] items-center justify-center px-[10px] py-[6px] relative rounded-[8px]"} data-name="Size=Medium, Colour=Success, Type=Fill">
        {iconBefore && (
          <div className="content-stretch flex items-center relative shrink-0 size-[20px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="user-02">
              <div className="absolute inset-[8.33%_11.01%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.5955 16.6667">
                  <g id="Solid">
                    <path clipRule="evenodd" d={svgPaths.p2ab7bbf0} fill="var(--fill-0, #4CA843)" fillRule="evenodd" />
                    <path clipRule="evenodd" d={svgPaths.p26531900} fill="var(--fill-0, #4CA843)" fillRule="evenodd" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        )}
        {showText && (
          <div className="content-stretch flex h-[20px] items-center justify-center relative shrink-0">
            <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4ca843] text-[14px] text-center tracking-[-0.1px] whitespace-nowrap">
              <p className="leading-[20px]">Medium chip</p>
            </div>
          </div>
        )}
        {showIcons && (
          <div className="content-stretch flex items-center relative shrink-0 size-[20px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="x-close">
              <div className="absolute inset-[20.83%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 11.6667">
                  <path d={svgPaths.p3000be80} fill="var(--fill-0, #4CA843)" id="Solid" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (size === "Large" && colour === "Success" && type === "Fill") {
    return (
      <div className={className || "bg-[#ecffea] content-stretch flex gap-[10px] items-center justify-center px-[12px] py-[8px] relative rounded-[8px]"} data-name="Size=Large, Colour=Success, Type=Fill">
        {iconBefore && (
          <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="user-02">
              <div className="absolute inset-[8.33%_11.01%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.7146 20">
                  <g id="Solid">
                    <path clipRule="evenodd" d={svgPaths.p37c7d200} fill="var(--fill-0, #4CA843)" fillRule="evenodd" />
                    <path clipRule="evenodd" d={svgPaths.p5d00500} fill="var(--fill-0, #4CA843)" fillRule="evenodd" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        )}
        {showText && (
          <div className="content-stretch flex h-[24px] items-center justify-center relative shrink-0">
            <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4ca843] text-[16px] text-center tracking-[-0.1px] whitespace-nowrap">
              <p className="leading-[24px]">Large chip</p>
            </div>
          </div>
        )}
        {showIcons && (
          <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="x-close">
              <div className="absolute inset-[20.83%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
                  <path d={svgPaths.p371efd00} fill="var(--fill-0, #4CA843)" id="Solid" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (size === "Tiny" && colour === "Success" && type === "Outlined") {
    return (
      <div className={className || "bg-white content-stretch flex gap-[4px] items-center justify-center px-[6px] py-[4px] relative rounded-[8px]"} data-name="Size=Tiny, Colour=Success, Type=Outlined">
        <div aria-hidden className="absolute border border-[#4ca843] border-solid inset-[-0.5px] pointer-events-none rounded-[8.5px]" />
        {iconBefore && (
          <div className="content-stretch flex items-center relative shrink-0 size-[12px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="user-02">
              <div className="absolute inset-[8.33%_11.01%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.35728 10">
                  <g id="Solid">
                    <path clipRule="evenodd" d={svgPaths.p2f36a300} fill="var(--fill-0, #4CA843)" fillRule="evenodd" />
                    <path clipRule="evenodd" d={svgPaths.p31444400} fill="var(--fill-0, #4CA843)" fillRule="evenodd" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        )}
        {showText && (
          <div className="content-stretch flex h-[12px] items-center justify-center relative shrink-0">
            <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4ca843] text-[10px] text-center tracking-[-0.1px] whitespace-nowrap">
              <p className="leading-[16px]">Tiny chip</p>
            </div>
          </div>
        )}
        {showIcons && (
          <div className="content-stretch flex items-center relative shrink-0 size-[12px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="x-close">
              <div className="absolute inset-[20.83%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 7">
                  <path d={svgPaths.p10c97f80} fill="var(--fill-0, #4CA843)" id="Solid" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (size === "Small" && colour === "Success" && type === "Outlined") {
    return (
      <div className={className || "bg-white content-stretch flex gap-[6px] items-center justify-center px-[8px] py-[6px] relative rounded-[8px]"} data-name="Size=Small, Colour=Success, Type=Outlined">
        <div aria-hidden className="absolute border border-[#4ca843] border-solid inset-[-0.5px] pointer-events-none rounded-[8.5px]" />
        {iconBefore && (
          <div className="content-stretch flex items-center relative shrink-0 size-[16px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="user-02">
              <div className="absolute inset-[8.33%_11.01%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.4764 13.3333">
                  <g id="Solid">
                    <path clipRule="evenodd" d={svgPaths.p2fb5fa00} fill="var(--fill-0, #4CA843)" fillRule="evenodd" />
                    <path clipRule="evenodd" d={svgPaths.p34bb4700} fill="var(--fill-0, #4CA843)" fillRule="evenodd" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        )}
        {showText && (
          <div className="content-stretch flex h-[16px] items-center justify-center relative shrink-0">
            <div className="[word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4ca843] text-[12px] text-center tracking-[-0.1px] whitespace-nowrap">
              <p className="leading-[16px]">Small chip</p>
            </div>
          </div>
        )}
        {showIcons && (
          <div className="content-stretch flex items-center relative shrink-0 size-[16px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="x-close">
              <div className="absolute inset-[20.83%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33333 9.33333">
                  <path d={svgPaths.p34f6d300} fill="var(--fill-0, #4CA843)" id="Solid" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (size === "Medium" && colour === "Success" && type === "Outlined") {
    return (
      <div className={className || "bg-white content-stretch flex gap-[8px] items-center justify-center px-[10px] py-[6px] relative rounded-[8px]"} data-name="Size=Medium, Colour=Success, Type=Outlined">
        <div aria-hidden className="absolute border border-[#4ca843] border-solid inset-[-0.5px] pointer-events-none rounded-[8.5px]" />
        {iconBefore && (
          <div className="content-stretch flex items-center relative shrink-0 size-[20px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="user-02">
              <div className="absolute inset-[8.33%_11.01%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.5955 16.6667">
                  <g id="Solid">
                    <path clipRule="evenodd" d={svgPaths.p2ab7bbf0} fill="var(--fill-0, #4CA843)" fillRule="evenodd" />
                    <path clipRule="evenodd" d={svgPaths.p26531900} fill="var(--fill-0, #4CA843)" fillRule="evenodd" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        )}
        {showText && (
          <div className="content-stretch flex h-[20px] items-center justify-center relative shrink-0">
            <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4ca843] text-[14px] text-center tracking-[-0.1px] whitespace-nowrap">
              <p className="leading-[20px]">Medium chip</p>
            </div>
          </div>
        )}
        {showIcons && (
          <div className="content-stretch flex items-center relative shrink-0 size-[20px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="x-close">
              <div className="absolute inset-[20.83%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 11.6667">
                  <path d={svgPaths.p3000be80} fill="var(--fill-0, #4CA843)" id="Solid" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (size === "Large" && colour === "Success" && type === "Outlined") {
    return (
      <div className={className || "bg-white content-stretch flex gap-[10px] items-center justify-center px-[12px] py-[8px] relative rounded-[8px]"} data-name="Size=Large, Colour=Success, Type=Outlined">
        <div aria-hidden className="absolute border border-[#4ca843] border-solid inset-[-0.5px] pointer-events-none rounded-[8.5px]" />
        {iconBefore && (
          <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="user-02">
              <div className="absolute inset-[8.33%_11.01%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.7146 20">
                  <g id="Solid">
                    <path clipRule="evenodd" d={svgPaths.p37c7d200} fill="var(--fill-0, #4CA843)" fillRule="evenodd" />
                    <path clipRule="evenodd" d={svgPaths.p5d00500} fill="var(--fill-0, #4CA843)" fillRule="evenodd" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        )}
        {showText && (
          <div className="content-stretch flex h-[24px] items-center justify-center relative shrink-0">
            <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4ca843] text-[16px] text-center tracking-[-0.1px] whitespace-nowrap">
              <p className="leading-[24px]">Large chip</p>
            </div>
          </div>
        )}
        {showIcons && (
          <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="x-close">
              <div className="absolute inset-[20.83%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
                  <path d={svgPaths.p371efd00} fill="var(--fill-0, #4CA843)" id="Solid" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (size === "Tiny" && colour === "Purple" && type === "Fill") {
    return (
      <div className={className || "bg-[#fbebff] content-stretch flex gap-[4px] items-center justify-center px-[6px] py-[4px] relative rounded-[8px]"} data-name="Size=Tiny, Colour=Purple, Type=Fill">
        {iconBefore && (
          <div className="content-stretch flex items-center relative shrink-0 size-[12px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="user-02">
              <div className="absolute inset-[8.33%_11.01%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.35728 10">
                  <g id="Solid">
                    <path clipRule="evenodd" d={svgPaths.p2f36a300} fill="var(--fill-0, #9131A8)" fillRule="evenodd" />
                    <path clipRule="evenodd" d={svgPaths.p31444400} fill="var(--fill-0, #9131A8)" fillRule="evenodd" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        )}
        {showText && (
          <div className="content-stretch flex h-[12px] items-center justify-center relative shrink-0">
            <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9131a8] text-[10px] text-center tracking-[-0.1px] whitespace-nowrap">
              <p className="leading-[16px]">Tiny chip</p>
            </div>
          </div>
        )}
        {showIcons && (
          <div className="content-stretch flex items-center relative shrink-0 size-[12px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="x-close">
              <div className="absolute inset-[20.83%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 7">
                  <path d={svgPaths.p10c97f80} fill="var(--fill-0, #9131A8)" id="Solid" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (size === "Small" && colour === "Purple" && type === "Fill") {
    return (
      <div className={className || "bg-[#fbebff] content-stretch flex gap-[6px] items-center justify-center px-[8px] py-[6px] relative rounded-[8px]"} data-name="Size=Small, Colour=Purple, Type=Fill">
        {iconBefore && (
          <div className="content-stretch flex items-center relative shrink-0 size-[16px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="user-02">
              <div className="absolute inset-[8.33%_11.01%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.4764 13.3333">
                  <g id="Solid">
                    <path clipRule="evenodd" d={svgPaths.p2fb5fa00} fill="var(--fill-0, #9131A8)" fillRule="evenodd" />
                    <path clipRule="evenodd" d={svgPaths.p34bb4700} fill="var(--fill-0, #9131A8)" fillRule="evenodd" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        )}
        {showText && (
          <div className="content-stretch flex h-[16px] items-center justify-center relative shrink-0">
            <div className="[word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9131a8] text-[12px] text-center tracking-[-0.1px] whitespace-nowrap">
              <p className="leading-[16px]">Small chip</p>
            </div>
          </div>
        )}
        {showIcons && (
          <div className="content-stretch flex items-center relative shrink-0 size-[16px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="x-close">
              <div className="absolute inset-[20.83%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33333 9.33333">
                  <path d={svgPaths.p34f6d300} fill="var(--fill-0, #9131A8)" id="Solid" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (size === "Medium" && colour === "Purple" && type === "Fill") {
    return (
      <div className={className || "bg-[#fbebff] content-stretch flex gap-[8px] items-center justify-center px-[10px] py-[6px] relative rounded-[8px]"} data-name="Size=Medium, Colour=Purple, Type=Fill">
        {iconBefore && (
          <div className="content-stretch flex items-center relative shrink-0 size-[20px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="user-02">
              <div className="absolute inset-[8.33%_11.01%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.5955 16.6667">
                  <g id="Solid">
                    <path clipRule="evenodd" d={svgPaths.p2ab7bbf0} fill="var(--fill-0, #9131A8)" fillRule="evenodd" />
                    <path clipRule="evenodd" d={svgPaths.p26531900} fill="var(--fill-0, #9131A8)" fillRule="evenodd" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        )}
        {showText && (
          <div className="content-stretch flex h-[20px] items-center justify-center relative shrink-0">
            <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9131a8] text-[14px] text-center tracking-[-0.1px] whitespace-nowrap">
              <p className="leading-[20px]">Medium chip</p>
            </div>
          </div>
        )}
        {showIcons && (
          <div className="content-stretch flex items-center relative shrink-0 size-[20px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="x-close">
              <div className="absolute inset-[20.83%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 11.6667">
                  <path d={svgPaths.p3000be80} fill="var(--fill-0, #9131A8)" id="Solid" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (size === "Large" && colour === "Purple" && type === "Fill") {
    return (
      <div className={className || "bg-[#fbebff] content-stretch flex gap-[10px] items-center justify-center px-[12px] py-[8px] relative rounded-[8px]"} data-name="Size=Large, Colour=Purple, Type=Fill">
        {iconBefore && (
          <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="user-02">
              <div className="absolute inset-[8.33%_11.01%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.7146 20">
                  <g id="Solid">
                    <path clipRule="evenodd" d={svgPaths.p37c7d200} fill="var(--fill-0, #9131A8)" fillRule="evenodd" />
                    <path clipRule="evenodd" d={svgPaths.p5d00500} fill="var(--fill-0, #9131A8)" fillRule="evenodd" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        )}
        {showText && (
          <div className="content-stretch flex h-[24px] items-center justify-center relative shrink-0">
            <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9131a8] text-[16px] text-center tracking-[-0.1px] whitespace-nowrap">
              <p className="leading-[24px]">Large chip</p>
            </div>
          </div>
        )}
        {showIcons && (
          <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="x-close">
              <div className="absolute inset-[20.83%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
                  <path d={svgPaths.p371efd00} fill="var(--fill-0, #9131A8)" id="Solid" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (size === "Tiny" && colour === "Purple" && type === "Outlined") {
    return (
      <div className={className || "bg-white content-stretch flex gap-[4px] items-center justify-center px-[6px] py-[4px] relative rounded-[8px]"} data-name="Size=Tiny, Colour=Purple, Type=Outlined">
        <div aria-hidden className="absolute border border-[#9131a8] border-solid inset-[-0.5px] pointer-events-none rounded-[8.5px]" />
        {iconBefore && (
          <div className="content-stretch flex items-center relative shrink-0 size-[12px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="user-02">
              <div className="absolute inset-[8.33%_11.01%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.35728 10">
                  <g id="Solid">
                    <path clipRule="evenodd" d={svgPaths.p2f36a300} fill="var(--fill-0, #9131A8)" fillRule="evenodd" />
                    <path clipRule="evenodd" d={svgPaths.p31444400} fill="var(--fill-0, #9131A8)" fillRule="evenodd" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        )}
        {showText && (
          <div className="content-stretch flex h-[12px] items-center justify-center relative shrink-0">
            <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9131a8] text-[10px] text-center tracking-[-0.1px] whitespace-nowrap">
              <p className="leading-[16px]">Tiny chip</p>
            </div>
          </div>
        )}
        {showIcons && (
          <div className="content-stretch flex items-center relative shrink-0 size-[12px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="x-close">
              <div className="absolute inset-[20.83%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 7">
                  <path d={svgPaths.p10c97f80} fill="var(--fill-0, #9131A8)" id="Solid" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (size === "Small" && colour === "Purple" && type === "Outlined") {
    return (
      <div className={className || "bg-white content-stretch flex gap-[6px] items-center justify-center px-[8px] py-[6px] relative rounded-[8px]"} data-name="Size=Small, Colour=Purple, Type=Outlined">
        <div aria-hidden className="absolute border border-[#9131a8] border-solid inset-[-0.5px] pointer-events-none rounded-[8.5px]" />
        {iconBefore && (
          <div className="content-stretch flex items-center relative shrink-0 size-[16px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="user-02">
              <div className="absolute inset-[8.33%_11.01%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.4764 13.3333">
                  <g id="Solid">
                    <path clipRule="evenodd" d={svgPaths.p2fb5fa00} fill="var(--fill-0, #9131A8)" fillRule="evenodd" />
                    <path clipRule="evenodd" d={svgPaths.p34bb4700} fill="var(--fill-0, #9131A8)" fillRule="evenodd" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        )}
        {showText && (
          <div className="content-stretch flex h-[16px] items-center justify-center relative shrink-0">
            <div className="[word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9131a8] text-[12px] text-center tracking-[-0.1px] whitespace-nowrap">
              <p className="leading-[16px]">Small chip</p>
            </div>
          </div>
        )}
        {showIcons && (
          <div className="content-stretch flex items-center relative shrink-0 size-[16px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="x-close">
              <div className="absolute inset-[20.83%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33333 9.33333">
                  <path d={svgPaths.p34f6d300} fill="var(--fill-0, #9131A8)" id="Solid" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (size === "Medium" && colour === "Purple" && type === "Outlined") {
    return (
      <div className={className || "bg-white content-stretch flex gap-[8px] items-center justify-center px-[10px] py-[6px] relative rounded-[8px]"} data-name="Size=Medium, Colour=Purple, Type=Outlined">
        <div aria-hidden className="absolute border border-[#9131a8] border-solid inset-[-0.5px] pointer-events-none rounded-[8.5px]" />
        {iconBefore && (
          <div className="content-stretch flex items-center relative shrink-0 size-[20px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="user-02">
              <div className="absolute inset-[8.33%_11.01%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.5955 16.6667">
                  <g id="Solid">
                    <path clipRule="evenodd" d={svgPaths.p2ab7bbf0} fill="var(--fill-0, #9131A8)" fillRule="evenodd" />
                    <path clipRule="evenodd" d={svgPaths.p26531900} fill="var(--fill-0, #9131A8)" fillRule="evenodd" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        )}
        {showText && (
          <div className="content-stretch flex h-[20px] items-center justify-center relative shrink-0">
            <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9131a8] text-[14px] text-center tracking-[-0.1px] whitespace-nowrap">
              <p className="leading-[20px]">Medium chip</p>
            </div>
          </div>
        )}
        {showIcons && (
          <div className="content-stretch flex items-center relative shrink-0 size-[20px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="x-close">
              <div className="absolute inset-[20.83%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 11.6667">
                  <path d={svgPaths.p3000be80} fill="var(--fill-0, #9131A8)" id="Solid" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (size === "Large" && colour === "Purple" && type === "Outlined") {
    return (
      <div className={className || "bg-white content-stretch flex gap-[10px] items-center justify-center px-[12px] py-[8px] relative rounded-[8px]"} data-name="Size=Large, Colour=Purple, Type=Outlined">
        <div aria-hidden className="absolute border border-[#9131a8] border-solid inset-[-0.5px] pointer-events-none rounded-[8.5px]" />
        {iconBefore && (
          <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="user-02">
              <div className="absolute inset-[8.33%_11.01%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.7146 20">
                  <g id="Solid">
                    <path clipRule="evenodd" d={svgPaths.p37c7d200} fill="var(--fill-0, #9131A8)" fillRule="evenodd" />
                    <path clipRule="evenodd" d={svgPaths.p5d00500} fill="var(--fill-0, #9131A8)" fillRule="evenodd" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        )}
        {showText && (
          <div className="content-stretch flex h-[24px] items-center justify-center relative shrink-0">
            <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9131a8] text-[16px] text-center tracking-[-0.1px] whitespace-nowrap">
              <p className="leading-[24px]">Large chip</p>
            </div>
          </div>
        )}
        {showIcons && (
          <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
            <div className="flex-[1_0_0] h-full min-w-px relative" data-name="x-close">
              <div className="absolute inset-[20.83%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
                  <path d={svgPaths.p371efd00} fill="var(--fill-0, #9131A8)" id="Solid" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  return (
    <div className={className || "bg-[#e0f7fa] content-stretch flex gap-[4px] items-center justify-center px-[6px] py-[4px] relative rounded-[8px]"} data-name="Size=Tiny, Colour=Default, Type=Fill">
      {iconBefore && (
        <div className="content-stretch flex items-center relative shrink-0 size-[12px]" data-name="Icons">
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="user-02">
            <div className="absolute inset-[8.33%_11.01%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.35728 10">
                <g id="Solid">
                  <path clipRule="evenodd" d={svgPaths.p2f36a300} fill="var(--fill-0, #106C7A)" fillRule="evenodd" />
                  <path clipRule="evenodd" d={svgPaths.p31444400} fill="var(--fill-0, #106C7A)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      )}
      {showText && (
        <div className="content-stretch flex h-[12px] items-center justify-center relative shrink-0">
          <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#106c7a] text-[10px] text-center tracking-[-0.1px] whitespace-nowrap">
            <p className="leading-[16px]">Tiny chip</p>
          </div>
        </div>
      )}
      {showIcons && (
        <div className="content-stretch flex items-center relative shrink-0 size-[12px]" data-name="Icons">
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="x-close">
            <div className="absolute inset-[20.83%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 7">
                <path d={svgPaths.p10c97f80} fill="var(--fill-0, #106C7A)" id="Solid" />
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}