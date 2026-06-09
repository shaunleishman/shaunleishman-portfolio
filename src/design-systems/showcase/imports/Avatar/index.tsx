import svgPaths from "./svg-ke40nu2fud";
type AvatarProps = {
  className?: string;
  colour?: "Disabled" | "Primary" | "Dark" | "Reverse" | "Pushed";
  shape?: "Square" | "Circle" | "Circl" | "Rounded";
  size?: "Small" | "Large" | "Medium" | "x-small";
  type?: "Text" | "Icon";
};

export default function Avatar({ className, colour = "Primary", shape = "Circle", size = "x-small", type = "Text" }: AvatarProps) {
  if (colour === "Primary" && size === "Small" && type === "Text" && shape === "Circle") {
    return (
      <div className={className || "bg-[#00a7b5] content-stretch flex flex-col items-center justify-center p-[10px] relative rounded-[50px] size-[40px]"} data-name="Colour=Primary, Size=Small, Type=Text, Shape=Circle">
        <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white tracking-[-0.1px] whitespace-nowrap">
          <p className="leading-[20px]">VJ</p>
        </div>
      </div>
    );
  }
  if (colour === "Primary" && size === "Medium" && type === "Text" && shape === "Circle") {
    return (
      <div className={className || "bg-[#00a7b5] content-stretch flex flex-col items-center justify-center p-[10px] relative rounded-[50px] size-[48px]"} data-name="Colour=Primary, Size=Medium, Type=Text, Shape=Circle">
        <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white tracking-[-0.1px] whitespace-nowrap">
          <p className="leading-[20px]">VJ</p>
        </div>
      </div>
    );
  }
  if (colour === "Primary" && size === "Large" && type === "Text" && shape === "Circle") {
    return (
      <div className={className || "bg-[#00a7b5] content-stretch flex flex-col items-center justify-center p-[10px] relative rounded-[50px] size-[64px]"} data-name="Colour=Primary, Size=Large, Type=Text, Shape=Circle">
        <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white tracking-[-0.1px] whitespace-nowrap">
          <p className="leading-[20px]">VJ</p>
        </div>
      </div>
    );
  }
  if (colour === "Primary" && size === "x-small" && type === "Icon" && shape === "Circl") {
    return (
      <div className={className || "bg-[#00a7b5] content-stretch flex flex-col items-center justify-center p-[10px] relative rounded-[50px] size-[32px]"} data-name="Colour=Primary, Size=x-small, Type=Icon, Shape=Circl">
        <div className="content-stretch flex items-center relative shrink-0 size-[16px]" data-name="Icons">
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6667 14.6667">
                <g id="Solid">
                  <path d={svgPaths.p2fc1a700} fill="var(--fill-0, white)" />
                  <path clipRule="evenodd" d={svgPaths.p15dbaa00} fill="var(--fill-0, white)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (colour === "Primary" && size === "Small" && type === "Icon" && shape === "Circl") {
    return (
      <div className={className || "bg-[#00a7b5] content-stretch flex flex-col items-center justify-center p-[10px] relative rounded-[50px] size-[40px]"} data-name="Colour=Primary, Size=Small, Type=Icon, Shape=Circl">
        <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
                <g id="Solid">
                  <path d={svgPaths.p12731a00} fill="var(--fill-0, white)" />
                  <path clipRule="evenodd" d={svgPaths.p3d996e00} fill="var(--fill-0, white)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (colour === "Primary" && size === "Medium" && type === "Icon" && shape === "Circl") {
    return (
      <div className={className || "bg-[#00a7b5] content-stretch flex flex-col items-center justify-center p-[10px] relative rounded-[50px] size-[48px]"} data-name="Colour=Primary, Size=Medium, Type=Icon, Shape=Circl">
        <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
                <g id="Solid">
                  <path d={svgPaths.p12731a00} fill="var(--fill-0, white)" />
                  <path clipRule="evenodd" d={svgPaths.p3d996e00} fill="var(--fill-0, white)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (colour === "Primary" && size === "Large" && type === "Icon" && shape === "Circl") {
    return (
      <div className={className || "bg-[#00a7b5] content-stretch flex flex-col items-center justify-center p-[10px] relative rounded-[50px] size-[64px]"} data-name="Colour=Primary, Size=Large, Type=Icon, Shape=Circl">
        <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
                <g id="Solid">
                  <path d={svgPaths.p12731a00} fill="var(--fill-0, white)" />
                  <path clipRule="evenodd" d={svgPaths.p3d996e00} fill="var(--fill-0, white)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (colour === "Primary" && size === "x-small" && type === "Text" && shape === "Rounded") {
    return (
      <div className={className || "bg-[#00a7b5] content-stretch flex flex-col items-center justify-center p-[10px] relative rounded-[8px] size-[32px]"} data-name="Colour=Primary, Size=x-small, Type=Text, Shape=Rounded">
        <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-center text-white tracking-[-0.1px] whitespace-nowrap">
          <p className="leading-[16px]">VJ</p>
        </div>
      </div>
    );
  }
  if (colour === "Primary" && size === "Small" && type === "Text" && shape === "Rounded") {
    return (
      <div className={className || "bg-[#00a7b5] content-stretch flex flex-col items-center justify-center p-[10px] relative rounded-[8px] size-[40px]"} data-name="Colour=Primary, Size=Small, Type=Text, Shape=Rounded">
        <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white tracking-[-0.1px] whitespace-nowrap">
          <p className="leading-[20px]">VJ</p>
        </div>
      </div>
    );
  }
  if (colour === "Primary" && size === "Medium" && type === "Text" && shape === "Rounded") {
    return (
      <div className={className || "bg-[#00a7b5] content-stretch flex flex-col items-center justify-center p-[10px] relative rounded-[8px] size-[48px]"} data-name="Colour=Primary, Size=Medium, Type=Text, Shape=Rounded">
        <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white tracking-[-0.1px] whitespace-nowrap">
          <p className="leading-[20px]">VJ</p>
        </div>
      </div>
    );
  }
  if (colour === "Primary" && size === "Large" && type === "Text" && shape === "Rounded") {
    return (
      <div className={className || "bg-[#00a7b5] content-stretch flex flex-col items-center justify-center p-[10px] relative rounded-[8px] size-[64px]"} data-name="Colour=Primary, Size=Large, Type=Text, Shape=Rounded">
        <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white tracking-[-0.1px] whitespace-nowrap">
          <p className="leading-[20px]">VJ</p>
        </div>
      </div>
    );
  }
  if (colour === "Primary" && size === "x-small" && type === "Icon" && shape === "Rounded") {
    return (
      <div className={className || "bg-[#00a7b5] content-stretch flex flex-col items-center justify-center p-[10px] relative rounded-[8px] size-[32px]"} data-name="Colour=Primary, Size=x-small, Type=Icon, Shape=Rounded">
        <div className="content-stretch flex items-center relative shrink-0 size-[16px]" data-name="Icons">
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6667 14.6667">
                <g id="Solid">
                  <path d={svgPaths.p2fc1a700} fill="var(--fill-0, white)" />
                  <path clipRule="evenodd" d={svgPaths.p15dbaa00} fill="var(--fill-0, white)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (colour === "Primary" && size === "Small" && type === "Icon" && shape === "Rounded") {
    return (
      <div className={className || "bg-[#00a7b5] content-stretch flex flex-col items-center justify-center p-[10px] relative rounded-[8px] size-[40px]"} data-name="Colour=Primary, Size=Small, Type=Icon, Shape=Rounded">
        <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
                <g id="Solid">
                  <path d={svgPaths.p12731a00} fill="var(--fill-0, white)" />
                  <path clipRule="evenodd" d={svgPaths.p3d996e00} fill="var(--fill-0, white)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (colour === "Primary" && size === "Medium" && type === "Icon" && shape === "Rounded") {
    return (
      <div className={className || "bg-[#00a7b5] content-stretch flex flex-col items-center justify-center p-[10px] relative rounded-[8px] size-[48px]"} data-name="Colour=Primary, Size=Medium, Type=Icon, Shape=Rounded">
        <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
                <g id="Solid">
                  <path d={svgPaths.p12731a00} fill="var(--fill-0, white)" />
                  <path clipRule="evenodd" d={svgPaths.p3d996e00} fill="var(--fill-0, white)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (colour === "Primary" && size === "Large" && type === "Icon" && shape === "Rounded") {
    return (
      <div className={className || "bg-[#00a7b5] content-stretch flex flex-col items-center justify-center p-[10px] relative rounded-[8px] size-[64px]"} data-name="Colour=Primary, Size=Large, Type=Icon, Shape=Rounded">
        <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
                <g id="Solid">
                  <path d={svgPaths.p12731a00} fill="var(--fill-0, white)" />
                  <path clipRule="evenodd" d={svgPaths.p3d996e00} fill="var(--fill-0, white)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (colour === "Primary" && size === "x-small" && type === "Text" && shape === "Square") {
    return (
      <div className={className || "bg-[#00a7b5] content-stretch flex flex-col items-center justify-center p-[10px] relative size-[32px]"} data-name="Colour=Primary, Size=x-small, Type=Text, Shape=Square">
        <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-center text-white tracking-[-0.1px] whitespace-nowrap">
          <p className="leading-[16px]">VJ</p>
        </div>
      </div>
    );
  }
  if (colour === "Primary" && size === "Small" && type === "Text" && shape === "Square") {
    return (
      <div className={className || "bg-[#00a7b5] content-stretch flex flex-col items-center justify-center p-[10px] relative size-[40px]"} data-name="Colour=Primary, Size=Small, Type=Text, Shape=Square">
        <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white tracking-[-0.1px] whitespace-nowrap">
          <p className="leading-[20px]">VJ</p>
        </div>
      </div>
    );
  }
  if (colour === "Primary" && size === "Medium" && type === "Text" && shape === "Square") {
    return (
      <div className={className || "bg-[#00a7b5] content-stretch flex flex-col items-center justify-center p-[10px] relative size-[48px]"} data-name="Colour=Primary, Size=Medium, Type=Text, Shape=Square">
        <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white tracking-[-0.1px] whitespace-nowrap">
          <p className="leading-[20px]">VJ</p>
        </div>
      </div>
    );
  }
  if (colour === "Primary" && size === "Large" && type === "Text" && shape === "Square") {
    return (
      <div className={className || "bg-[#00a7b5] content-stretch flex flex-col items-center justify-center p-[10px] relative size-[64px]"} data-name="Colour=Primary, Size=Large, Type=Text, Shape=Square">
        <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white tracking-[-0.1px] whitespace-nowrap">
          <p className="leading-[20px]">VJ</p>
        </div>
      </div>
    );
  }
  if (colour === "Primary" && size === "x-small" && type === "Icon" && shape === "Square") {
    return (
      <div className={className || "bg-[#00a7b5] content-stretch flex flex-col items-center justify-center p-[10px] relative size-[32px]"} data-name="Colour=Primary, Size=x-small, Type=Icon, Shape=Square">
        <div className="content-stretch flex items-center relative shrink-0 size-[16px]" data-name="Icons">
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6667 14.6667">
                <g id="Solid">
                  <path d={svgPaths.p2fc1a700} fill="var(--fill-0, white)" />
                  <path clipRule="evenodd" d={svgPaths.p15dbaa00} fill="var(--fill-0, white)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (colour === "Primary" && size === "Small" && type === "Icon" && shape === "Square") {
    return (
      <div className={className || "bg-[#00a7b5] content-stretch flex flex-col items-center justify-center p-[10px] relative size-[40px]"} data-name="Colour=Primary, Size=Small, Type=Icon, Shape=Square">
        <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
                <g id="Solid">
                  <path d={svgPaths.p12731a00} fill="var(--fill-0, white)" />
                  <path clipRule="evenodd" d={svgPaths.p3d996e00} fill="var(--fill-0, white)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (colour === "Primary" && size === "Medium" && type === "Icon" && shape === "Square") {
    return (
      <div className={className || "bg-[#00a7b5] content-stretch flex flex-col items-center justify-center p-[10px] relative size-[48px]"} data-name="Colour=Primary, Size=Medium, Type=Icon, Shape=Square">
        <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
                <g id="Solid">
                  <path d={svgPaths.p12731a00} fill="var(--fill-0, white)" />
                  <path clipRule="evenodd" d={svgPaths.p3d996e00} fill="var(--fill-0, white)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (colour === "Primary" && size === "Large" && type === "Icon" && shape === "Square") {
    return (
      <div className={className || "bg-[#00a7b5] content-stretch flex flex-col items-center justify-center p-[10px] relative size-[64px]"} data-name="Colour=Primary, Size=Large, Type=Icon, Shape=Square">
        <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
                <g id="Solid">
                  <path d={svgPaths.p12731a00} fill="var(--fill-0, white)" />
                  <path clipRule="evenodd" d={svgPaths.p3d996e00} fill="var(--fill-0, white)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (colour === "Dark" && size === "x-small" && type === "Text" && shape === "Circle") {
    return (
      <div className={className || "bg-[#4a5453] content-stretch flex flex-col items-center justify-center p-[10px] relative rounded-[50px] size-[32px]"} data-name="Colour=Dark, Size=x-small, Type=Text, Shape=Circle">
        <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-center text-white tracking-[-0.1px] whitespace-nowrap">
          <p className="leading-[16px]">VJ</p>
        </div>
      </div>
    );
  }
  if (colour === "Dark" && size === "Small" && type === "Text" && shape === "Circle") {
    return (
      <div className={className || "bg-[#4a5453] content-stretch flex flex-col items-center justify-center p-[10px] relative rounded-[50px] size-[40px]"} data-name="Colour=Dark, Size=Small, Type=Text, Shape=Circle">
        <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white tracking-[-0.1px] whitespace-nowrap">
          <p className="leading-[20px]">VJ</p>
        </div>
      </div>
    );
  }
  if (colour === "Dark" && size === "Medium" && type === "Text" && shape === "Circle") {
    return (
      <div className={className || "bg-[#4a5453] content-stretch flex flex-col items-center justify-center p-[10px] relative rounded-[50px] size-[48px]"} data-name="Colour=Dark, Size=Medium, Type=Text, Shape=Circle">
        <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white tracking-[-0.1px] whitespace-nowrap">
          <p className="leading-[20px]">VJ</p>
        </div>
      </div>
    );
  }
  if (colour === "Dark" && size === "Large" && type === "Text" && shape === "Circle") {
    return (
      <div className={className || "bg-[#4a5453] content-stretch flex flex-col items-center justify-center p-[10px] relative rounded-[50px] size-[64px]"} data-name="Colour=Dark, Size=Large, Type=Text, Shape=Circle">
        <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white tracking-[-0.1px] whitespace-nowrap">
          <p className="leading-[20px]">VJ</p>
        </div>
      </div>
    );
  }
  if (colour === "Dark" && size === "x-small" && type === "Icon" && shape === "Circl") {
    return (
      <div className={className || "bg-[#4a5453] content-stretch flex flex-col items-center justify-center p-[10px] relative rounded-[50px] size-[32px]"} data-name="Colour=Dark, Size=x-small, Type=Icon, Shape=Circl">
        <div className="content-stretch flex items-center relative shrink-0 size-[16px]" data-name="Icons">
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6667 14.6667">
                <g id="Solid">
                  <path d={svgPaths.p2fc1a700} fill="var(--fill-0, white)" />
                  <path clipRule="evenodd" d={svgPaths.p15dbaa00} fill="var(--fill-0, white)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (colour === "Dark" && size === "Small" && type === "Icon" && shape === "Circl") {
    return (
      <div className={className || "bg-[#4a5453] content-stretch flex flex-col items-center justify-center p-[10px] relative rounded-[50px] size-[40px]"} data-name="Colour=Dark, Size=Small, Type=Icon, Shape=Circl">
        <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
                <g id="Solid">
                  <path d={svgPaths.p12731a00} fill="var(--fill-0, white)" />
                  <path clipRule="evenodd" d={svgPaths.p3d996e00} fill="var(--fill-0, white)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (colour === "Dark" && size === "Medium" && type === "Icon" && shape === "Circl") {
    return (
      <div className={className || "bg-[#4a5453] content-stretch flex flex-col items-center justify-center p-[10px] relative rounded-[50px] size-[48px]"} data-name="Colour=Dark, Size=Medium, Type=Icon, Shape=Circl">
        <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
                <g id="Solid">
                  <path d={svgPaths.p12731a00} fill="var(--fill-0, white)" />
                  <path clipRule="evenodd" d={svgPaths.p3d996e00} fill="var(--fill-0, white)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (colour === "Dark" && size === "Large" && type === "Icon" && shape === "Circl") {
    return (
      <div className={className || "bg-[#4a5453] content-stretch flex flex-col items-center justify-center p-[10px] relative rounded-[50px] size-[64px]"} data-name="Colour=Dark, Size=Large, Type=Icon, Shape=Circl">
        <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
                <g id="Solid">
                  <path d={svgPaths.p12731a00} fill="var(--fill-0, white)" />
                  <path clipRule="evenodd" d={svgPaths.p3d996e00} fill="var(--fill-0, white)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (colour === "Dark" && size === "x-small" && type === "Text" && shape === "Rounded") {
    return (
      <div className={className || "bg-[#4a5453] content-stretch flex flex-col items-center justify-center p-[10px] relative rounded-[8px] size-[32px]"} data-name="Colour=Dark, Size=x-small, Type=Text, Shape=Rounded">
        <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-center text-white tracking-[-0.1px] whitespace-nowrap">
          <p className="leading-[16px]">VJ</p>
        </div>
      </div>
    );
  }
  if (colour === "Dark" && size === "Small" && type === "Text" && shape === "Rounded") {
    return (
      <div className={className || "bg-[#4a5453] content-stretch flex flex-col items-center justify-center p-[10px] relative rounded-[8px] size-[40px]"} data-name="Colour=Dark, Size=Small, Type=Text, Shape=Rounded">
        <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white tracking-[-0.1px] whitespace-nowrap">
          <p className="leading-[20px]">VJ</p>
        </div>
      </div>
    );
  }
  if (colour === "Dark" && size === "Medium" && type === "Text" && shape === "Rounded") {
    return (
      <div className={className || "bg-[#4a5453] content-stretch flex flex-col items-center justify-center p-[10px] relative rounded-[8px] size-[48px]"} data-name="Colour=Dark, Size=Medium, Type=Text, Shape=Rounded">
        <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white tracking-[-0.1px] whitespace-nowrap">
          <p className="leading-[20px]">VJ</p>
        </div>
      </div>
    );
  }
  if (colour === "Dark" && size === "Large" && type === "Text" && shape === "Rounded") {
    return (
      <div className={className || "bg-[#4a5453] content-stretch flex flex-col items-center justify-center p-[10px] relative rounded-[8px] size-[64px]"} data-name="Colour=Dark, Size=Large, Type=Text, Shape=Rounded">
        <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white tracking-[-0.1px] whitespace-nowrap">
          <p className="leading-[20px]">VJ</p>
        </div>
      </div>
    );
  }
  if (colour === "Dark" && size === "x-small" && type === "Icon" && shape === "Rounded") {
    return (
      <div className={className || "bg-[#4a5453] content-stretch flex flex-col items-center justify-center p-[10px] relative rounded-[8px] size-[32px]"} data-name="Colour=Dark, Size=x-small, Type=Icon, Shape=Rounded">
        <div className="content-stretch flex items-center relative shrink-0 size-[16px]" data-name="Icons">
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6667 14.6667">
                <g id="Solid">
                  <path d={svgPaths.p2fc1a700} fill="var(--fill-0, white)" />
                  <path clipRule="evenodd" d={svgPaths.p15dbaa00} fill="var(--fill-0, white)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (colour === "Dark" && size === "Small" && type === "Icon" && shape === "Rounded") {
    return (
      <div className={className || "bg-[#4a5453] content-stretch flex flex-col items-center justify-center p-[10px] relative rounded-[8px] size-[40px]"} data-name="Colour=Dark, Size=Small, Type=Icon, Shape=Rounded">
        <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
                <g id="Solid">
                  <path d={svgPaths.p12731a00} fill="var(--fill-0, white)" />
                  <path clipRule="evenodd" d={svgPaths.p3d996e00} fill="var(--fill-0, white)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (colour === "Dark" && size === "Medium" && type === "Icon" && shape === "Rounded") {
    return (
      <div className={className || "bg-[#4a5453] content-stretch flex flex-col items-center justify-center p-[10px] relative rounded-[8px] size-[48px]"} data-name="Colour=Dark, Size=Medium, Type=Icon, Shape=Rounded">
        <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
                <g id="Solid">
                  <path d={svgPaths.p12731a00} fill="var(--fill-0, white)" />
                  <path clipRule="evenodd" d={svgPaths.p3d996e00} fill="var(--fill-0, white)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (colour === "Dark" && size === "Large" && type === "Icon" && shape === "Rounded") {
    return (
      <div className={className || "bg-[#4a5453] content-stretch flex flex-col items-center justify-center p-[10px] relative rounded-[8px] size-[64px]"} data-name="Colour=Dark, Size=Large, Type=Icon, Shape=Rounded">
        <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
                <g id="Solid">
                  <path d={svgPaths.p12731a00} fill="var(--fill-0, white)" />
                  <path clipRule="evenodd" d={svgPaths.p3d996e00} fill="var(--fill-0, white)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (colour === "Dark" && size === "x-small" && type === "Text" && shape === "Square") {
    return (
      <div className={className || "bg-[#4a5453] content-stretch flex flex-col items-center justify-center p-[10px] relative size-[32px]"} data-name="Colour=Dark, Size=x-small, Type=Text, Shape=Square">
        <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-center text-white tracking-[-0.1px] whitespace-nowrap">
          <p className="leading-[16px]">VJ</p>
        </div>
      </div>
    );
  }
  if (colour === "Dark" && size === "Small" && type === "Text" && shape === "Square") {
    return (
      <div className={className || "bg-[#4a5453] content-stretch flex flex-col items-center justify-center p-[10px] relative size-[40px]"} data-name="Colour=Dark, Size=Small, Type=Text, Shape=Square">
        <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white tracking-[-0.1px] whitespace-nowrap">
          <p className="leading-[20px]">VJ</p>
        </div>
      </div>
    );
  }
  if (colour === "Dark" && size === "Medium" && type === "Text" && shape === "Square") {
    return (
      <div className={className || "bg-[#4a5453] content-stretch flex flex-col items-center justify-center p-[10px] relative size-[48px]"} data-name="Colour=Dark, Size=Medium, Type=Text, Shape=Square">
        <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white tracking-[-0.1px] whitespace-nowrap">
          <p className="leading-[20px]">VJ</p>
        </div>
      </div>
    );
  }
  if (colour === "Dark" && size === "Large" && type === "Text" && shape === "Square") {
    return (
      <div className={className || "bg-[#4a5453] content-stretch flex flex-col items-center justify-center p-[10px] relative size-[64px]"} data-name="Colour=Dark, Size=Large, Type=Text, Shape=Square">
        <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white tracking-[-0.1px] whitespace-nowrap">
          <p className="leading-[20px]">VJ</p>
        </div>
      </div>
    );
  }
  if (colour === "Dark" && size === "x-small" && type === "Icon" && shape === "Square") {
    return (
      <div className={className || "bg-[#4a5453] content-stretch flex flex-col items-center justify-center p-[10px] relative size-[32px]"} data-name="Colour=Dark, Size=x-small, Type=Icon, Shape=Square">
        <div className="content-stretch flex items-center relative shrink-0 size-[16px]" data-name="Icons">
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6667 14.6667">
                <g id="Solid">
                  <path d={svgPaths.p2fc1a700} fill="var(--fill-0, white)" />
                  <path clipRule="evenodd" d={svgPaths.p15dbaa00} fill="var(--fill-0, white)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (colour === "Dark" && size === "Small" && type === "Icon" && shape === "Square") {
    return (
      <div className={className || "bg-[#4a5453] content-stretch flex flex-col items-center justify-center p-[10px] relative size-[40px]"} data-name="Colour=Dark, Size=Small, Type=Icon, Shape=Square">
        <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
                <g id="Solid">
                  <path d={svgPaths.p12731a00} fill="var(--fill-0, white)" />
                  <path clipRule="evenodd" d={svgPaths.p3d996e00} fill="var(--fill-0, white)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (colour === "Dark" && size === "Medium" && type === "Icon" && shape === "Square") {
    return (
      <div className={className || "bg-[#4a5453] content-stretch flex flex-col items-center justify-center p-[10px] relative size-[48px]"} data-name="Colour=Dark, Size=Medium, Type=Icon, Shape=Square">
        <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
                <g id="Solid">
                  <path d={svgPaths.p12731a00} fill="var(--fill-0, white)" />
                  <path clipRule="evenodd" d={svgPaths.p3d996e00} fill="var(--fill-0, white)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (colour === "Dark" && size === "Large" && type === "Icon" && shape === "Square") {
    return (
      <div className={className || "bg-[#4a5453] content-stretch flex flex-col items-center justify-center p-[10px] relative size-[64px]"} data-name="Colour=Dark, Size=Large, Type=Icon, Shape=Square">
        <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
                <g id="Solid">
                  <path d={svgPaths.p12731a00} fill="var(--fill-0, white)" />
                  <path clipRule="evenodd" d={svgPaths.p3d996e00} fill="var(--fill-0, white)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (colour === "Reverse" && size === "x-small" && type === "Text" && shape === "Circle") {
    return (
      <div className={className || "bg-white content-stretch flex flex-col items-center justify-center p-[10px] relative rounded-[50px] size-[32px]"} data-name="Colour=Reverse, Size=x-small, Type=Text, Shape=Circle">
        <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#aab6b4] text-[10px] text-center tracking-[-0.1px] whitespace-nowrap">
          <p className="leading-[16px]">VJ</p>
        </div>
      </div>
    );
  }
  if (colour === "Reverse" && size === "Small" && type === "Text" && shape === "Circle") {
    return (
      <div className={className || "bg-white content-stretch flex flex-col items-center justify-center p-[10px] relative rounded-[50px] size-[40px]"} data-name="Colour=Reverse, Size=Small, Type=Text, Shape=Circle">
        <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#aab6b4] text-[14px] text-center tracking-[-0.1px] whitespace-nowrap">
          <p className="leading-[20px]">VJ</p>
        </div>
      </div>
    );
  }
  if (colour === "Reverse" && size === "Medium" && type === "Text" && shape === "Circle") {
    return (
      <div className={className || "bg-white content-stretch flex flex-col items-center justify-center p-[10px] relative rounded-[50px] size-[48px]"} data-name="Colour=Reverse, Size=Medium, Type=Text, Shape=Circle">
        <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#aab6b4] text-[14px] text-center tracking-[-0.1px] whitespace-nowrap">
          <p className="leading-[20px]">VJ</p>
        </div>
      </div>
    );
  }
  if (colour === "Reverse" && size === "Large" && type === "Text" && shape === "Circle") {
    return (
      <div className={className || "bg-white content-stretch flex flex-col items-center justify-center p-[10px] relative rounded-[50px] size-[64px]"} data-name="Colour=Reverse, Size=Large, Type=Text, Shape=Circle">
        <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#aab6b4] text-[14px] text-center tracking-[-0.1px] whitespace-nowrap">
          <p className="leading-[20px]">VJ</p>
        </div>
      </div>
    );
  }
  if (colour === "Reverse" && size === "x-small" && type === "Icon" && shape === "Circl") {
    return (
      <div className={className || "bg-white content-stretch flex flex-col items-center justify-center p-[10px] relative rounded-[50px] size-[32px]"} data-name="Colour=Reverse, Size=x-small, Type=Icon, Shape=Circl">
        <div className="content-stretch flex items-center relative shrink-0 size-[16px]" data-name="Icons">
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6667 14.6667">
                <g id="Solid">
                  <path d={svgPaths.p2fc1a700} fill="var(--fill-0, #AAB6B4)" />
                  <path clipRule="evenodd" d={svgPaths.p15dbaa00} fill="var(--fill-0, #AAB6B4)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (colour === "Reverse" && size === "Small" && type === "Icon" && shape === "Circl") {
    return (
      <div className={className || "bg-white content-stretch flex flex-col items-center justify-center p-[10px] relative rounded-[50px] size-[40px]"} data-name="Colour=Reverse, Size=Small, Type=Icon, Shape=Circl">
        <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
                <g id="Solid">
                  <path d={svgPaths.p12731a00} fill="var(--fill-0, #AAB6B4)" />
                  <path clipRule="evenodd" d={svgPaths.p3d996e00} fill="var(--fill-0, #AAB6B4)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (colour === "Reverse" && size === "Medium" && type === "Icon" && shape === "Circl") {
    return (
      <div className={className || "bg-white content-stretch flex flex-col items-center justify-center p-[10px] relative rounded-[50px] size-[48px]"} data-name="Colour=Reverse, Size=Medium, Type=Icon, Shape=Circl">
        <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
                <g id="Solid">
                  <path d={svgPaths.p12731a00} fill="var(--fill-0, #AAB6B4)" />
                  <path clipRule="evenodd" d={svgPaths.p3d996e00} fill="var(--fill-0, #AAB6B4)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (colour === "Reverse" && size === "Large" && type === "Icon" && shape === "Circl") {
    return (
      <div className={className || "bg-white content-stretch flex flex-col items-center justify-center p-[10px] relative rounded-[50px] size-[64px]"} data-name="Colour=Reverse, Size=Large, Type=Icon, Shape=Circl">
        <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
                <g id="Solid">
                  <path d={svgPaths.p12731a00} fill="var(--fill-0, #AAB6B4)" />
                  <path clipRule="evenodd" d={svgPaths.p3d996e00} fill="var(--fill-0, #AAB6B4)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (colour === "Reverse" && size === "x-small" && type === "Text" && shape === "Rounded") {
    return (
      <div className={className || "bg-white content-stretch flex flex-col items-center justify-center p-[10px] relative rounded-[8px] size-[32px]"} data-name="Colour=Reverse, Size=x-small, Type=Text, Shape=Rounded">
        <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#aab6b4] text-[10px] text-center tracking-[-0.1px] whitespace-nowrap">
          <p className="leading-[16px]">VJ</p>
        </div>
      </div>
    );
  }
  if (colour === "Reverse" && size === "Small" && type === "Text" && shape === "Rounded") {
    return (
      <div className={className || "bg-white content-stretch flex flex-col items-center justify-center p-[10px] relative rounded-[8px] size-[40px]"} data-name="Colour=Reverse, Size=Small, Type=Text, Shape=Rounded">
        <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#aab6b4] text-[14px] text-center tracking-[-0.1px] whitespace-nowrap">
          <p className="leading-[20px]">VJ</p>
        </div>
      </div>
    );
  }
  if (colour === "Reverse" && size === "Medium" && type === "Text" && shape === "Rounded") {
    return (
      <div className={className || "bg-white content-stretch flex flex-col items-center justify-center p-[10px] relative rounded-[8px] size-[48px]"} data-name="Colour=Reverse, Size=Medium, Type=Text, Shape=Rounded">
        <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#aab6b4] text-[14px] text-center tracking-[-0.1px] whitespace-nowrap">
          <p className="leading-[20px]">VJ</p>
        </div>
      </div>
    );
  }
  if (colour === "Reverse" && size === "Large" && type === "Text" && shape === "Rounded") {
    return (
      <div className={className || "bg-white content-stretch flex flex-col items-center justify-center p-[10px] relative rounded-[8px] size-[64px]"} data-name="Colour=Reverse, Size=Large, Type=Text, Shape=Rounded">
        <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#aab6b4] text-[14px] text-center tracking-[-0.1px] whitespace-nowrap">
          <p className="leading-[20px]">VJ</p>
        </div>
      </div>
    );
  }
  if (colour === "Reverse" && size === "x-small" && type === "Icon" && shape === "Rounded") {
    return (
      <div className={className || "bg-white content-stretch flex flex-col items-center justify-center p-[10px] relative rounded-[8px] size-[32px]"} data-name="Colour=Reverse, Size=x-small, Type=Icon, Shape=Rounded">
        <div className="content-stretch flex items-center relative shrink-0 size-[16px]" data-name="Icons">
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6667 14.6667">
                <g id="Solid">
                  <path d={svgPaths.p2fc1a700} fill="var(--fill-0, #AAB6B4)" />
                  <path clipRule="evenodd" d={svgPaths.p15dbaa00} fill="var(--fill-0, #AAB6B4)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (colour === "Reverse" && size === "Small" && type === "Icon" && shape === "Rounded") {
    return (
      <div className={className || "bg-white content-stretch flex flex-col items-center justify-center p-[10px] relative rounded-[8px] size-[40px]"} data-name="Colour=Reverse, Size=Small, Type=Icon, Shape=Rounded">
        <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
                <g id="Solid">
                  <path d={svgPaths.p12731a00} fill="var(--fill-0, #AAB6B4)" />
                  <path clipRule="evenodd" d={svgPaths.p3d996e00} fill="var(--fill-0, #AAB6B4)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (colour === "Reverse" && size === "Medium" && type === "Icon" && shape === "Rounded") {
    return (
      <div className={className || "bg-white content-stretch flex flex-col items-center justify-center p-[10px] relative rounded-[8px] size-[48px]"} data-name="Colour=Reverse, Size=Medium, Type=Icon, Shape=Rounded">
        <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
                <g id="Solid">
                  <path d={svgPaths.p12731a00} fill="var(--fill-0, #AAB6B4)" />
                  <path clipRule="evenodd" d={svgPaths.p3d996e00} fill="var(--fill-0, #AAB6B4)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (colour === "Reverse" && size === "Large" && type === "Icon" && shape === "Rounded") {
    return (
      <div className={className || "bg-white content-stretch flex flex-col items-center justify-center p-[10px] relative rounded-[8px] size-[64px]"} data-name="Colour=Reverse, Size=Large, Type=Icon, Shape=Rounded">
        <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
                <g id="Solid">
                  <path d={svgPaths.p12731a00} fill="var(--fill-0, #AAB6B4)" />
                  <path clipRule="evenodd" d={svgPaths.p3d996e00} fill="var(--fill-0, #AAB6B4)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (colour === "Reverse" && size === "x-small" && type === "Text" && shape === "Square") {
    return (
      <div className={className || "bg-white content-stretch flex flex-col items-center justify-center p-[10px] relative size-[32px]"} data-name="Colour=Reverse, Size=x-small, Type=Text, Shape=Square">
        <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#aab6b4] text-[10px] text-center tracking-[-0.1px] whitespace-nowrap">
          <p className="leading-[16px]">VJ</p>
        </div>
      </div>
    );
  }
  if (colour === "Reverse" && size === "Small" && type === "Text" && shape === "Square") {
    return (
      <div className={className || "bg-white content-stretch flex flex-col items-center justify-center p-[10px] relative size-[40px]"} data-name="Colour=Reverse, Size=Small, Type=Text, Shape=Square">
        <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#aab6b4] text-[14px] text-center tracking-[-0.1px] whitespace-nowrap">
          <p className="leading-[20px]">VJ</p>
        </div>
      </div>
    );
  }
  if (colour === "Reverse" && size === "Medium" && type === "Text" && shape === "Square") {
    return (
      <div className={className || "bg-white content-stretch flex flex-col items-center justify-center p-[10px] relative size-[48px]"} data-name="Colour=Reverse, Size=Medium, Type=Text, Shape=Square">
        <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#aab6b4] text-[14px] text-center tracking-[-0.1px] whitespace-nowrap">
          <p className="leading-[20px]">VJ</p>
        </div>
      </div>
    );
  }
  if (colour === "Reverse" && size === "Large" && type === "Text" && shape === "Square") {
    return (
      <div className={className || "bg-white content-stretch flex flex-col items-center justify-center p-[10px] relative size-[64px]"} data-name="Colour=Reverse, Size=Large, Type=Text, Shape=Square">
        <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#aab6b4] text-[14px] text-center tracking-[-0.1px] whitespace-nowrap">
          <p className="leading-[20px]">VJ</p>
        </div>
      </div>
    );
  }
  if (colour === "Reverse" && size === "x-small" && type === "Icon" && shape === "Square") {
    return (
      <div className={className || "bg-white content-stretch flex flex-col items-center justify-center p-[10px] relative size-[32px]"} data-name="Colour=Reverse, Size=x-small, Type=Icon, Shape=Square">
        <div className="content-stretch flex items-center relative shrink-0 size-[16px]" data-name="Icons">
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6667 14.6667">
                <g id="Solid">
                  <path d={svgPaths.p2fc1a700} fill="var(--fill-0, #AAB6B4)" />
                  <path clipRule="evenodd" d={svgPaths.p15dbaa00} fill="var(--fill-0, #AAB6B4)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (colour === "Reverse" && size === "Small" && type === "Icon" && shape === "Square") {
    return (
      <div className={className || "bg-white content-stretch flex flex-col items-center justify-center p-[10px] relative size-[40px]"} data-name="Colour=Reverse, Size=Small, Type=Icon, Shape=Square">
        <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
                <g id="Solid">
                  <path d={svgPaths.p12731a00} fill="var(--fill-0, #AAB6B4)" />
                  <path clipRule="evenodd" d={svgPaths.p3d996e00} fill="var(--fill-0, #AAB6B4)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (colour === "Reverse" && size === "Medium" && type === "Icon" && shape === "Square") {
    return (
      <div className={className || "bg-white content-stretch flex flex-col items-center justify-center p-[10px] relative size-[48px]"} data-name="Colour=Reverse, Size=Medium, Type=Icon, Shape=Square">
        <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
                <g id="Solid">
                  <path d={svgPaths.p12731a00} fill="var(--fill-0, #AAB6B4)" />
                  <path clipRule="evenodd" d={svgPaths.p3d996e00} fill="var(--fill-0, #AAB6B4)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (colour === "Reverse" && size === "Large" && type === "Icon" && shape === "Square") {
    return (
      <div className={className || "bg-white content-stretch flex flex-col items-center justify-center p-[10px] relative size-[64px]"} data-name="Colour=Reverse, Size=Large, Type=Icon, Shape=Square">
        <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
                <g id="Solid">
                  <path d={svgPaths.p12731a00} fill="var(--fill-0, #AAB6B4)" />
                  <path clipRule="evenodd" d={svgPaths.p3d996e00} fill="var(--fill-0, #AAB6B4)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (colour === "Pushed" && size === "x-small" && type === "Text" && shape === "Circle") {
    return (
      <div className={className || "bg-[#106c7a] content-stretch flex flex-col items-center justify-center p-[10px] relative rounded-[50px] size-[32px]"} data-name="Colour=Pushed, Size=x-small, Type=Text, Shape=Circle">
        <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-center text-white tracking-[-0.1px] whitespace-nowrap">
          <p className="leading-[16px]">VJ</p>
        </div>
      </div>
    );
  }
  if (colour === "Pushed" && size === "Small" && type === "Text" && shape === "Circle") {
    return (
      <div className={className || "bg-[#106c7a] content-stretch flex flex-col items-center justify-center p-[10px] relative rounded-[50px] size-[40px]"} data-name="Colour=Pushed, Size=Small, Type=Text, Shape=Circle">
        <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white tracking-[-0.1px] whitespace-nowrap">
          <p className="leading-[20px]">VJ</p>
        </div>
      </div>
    );
  }
  if (colour === "Pushed" && size === "Medium" && type === "Text" && shape === "Circle") {
    return (
      <div className={className || "bg-[#106c7a] content-stretch flex flex-col items-center justify-center p-[10px] relative rounded-[50px] size-[48px]"} data-name="Colour=Pushed, Size=Medium, Type=Text, Shape=Circle">
        <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white tracking-[-0.1px] whitespace-nowrap">
          <p className="leading-[20px]">VJ</p>
        </div>
      </div>
    );
  }
  if (colour === "Pushed" && size === "Large" && type === "Text" && shape === "Circle") {
    return (
      <div className={className || "bg-[#106c7a] content-stretch flex flex-col items-center justify-center p-[10px] relative rounded-[50px] size-[64px]"} data-name="Colour=Pushed, Size=Large, Type=Text, Shape=Circle">
        <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white tracking-[-0.1px] whitespace-nowrap">
          <p className="leading-[20px]">VJ</p>
        </div>
      </div>
    );
  }
  if (colour === "Pushed" && size === "x-small" && type === "Icon" && shape === "Circl") {
    return (
      <div className={className || "bg-[#106c7a] content-stretch flex flex-col items-center justify-center p-[10px] relative rounded-[50px] size-[32px]"} data-name="Colour=Pushed, Size=x-small, Type=Icon, Shape=Circl">
        <div className="content-stretch flex items-center relative shrink-0 size-[16px]" data-name="Icons">
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6667 14.6667">
                <g id="Solid">
                  <path d={svgPaths.p2fc1a700} fill="var(--fill-0, white)" />
                  <path clipRule="evenodd" d={svgPaths.p15dbaa00} fill="var(--fill-0, white)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (colour === "Pushed" && size === "Small" && type === "Icon" && shape === "Circl") {
    return (
      <div className={className || "bg-[#106c7a] content-stretch flex flex-col items-center justify-center p-[10px] relative rounded-[50px] size-[40px]"} data-name="Colour=Pushed, Size=Small, Type=Icon, Shape=Circl">
        <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
                <g id="Solid">
                  <path d={svgPaths.p12731a00} fill="var(--fill-0, white)" />
                  <path clipRule="evenodd" d={svgPaths.p3d996e00} fill="var(--fill-0, white)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (colour === "Pushed" && size === "Medium" && type === "Icon" && shape === "Circl") {
    return (
      <div className={className || "bg-[#106c7a] content-stretch flex flex-col items-center justify-center p-[10px] relative rounded-[50px] size-[48px]"} data-name="Colour=Pushed, Size=Medium, Type=Icon, Shape=Circl">
        <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
                <g id="Solid">
                  <path d={svgPaths.p12731a00} fill="var(--fill-0, white)" />
                  <path clipRule="evenodd" d={svgPaths.p3d996e00} fill="var(--fill-0, white)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (colour === "Pushed" && size === "Large" && type === "Icon" && shape === "Circl") {
    return (
      <div className={className || "bg-[#106c7a] content-stretch flex flex-col items-center justify-center p-[10px] relative rounded-[50px] size-[64px]"} data-name="Colour=Pushed, Size=Large, Type=Icon, Shape=Circl">
        <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
                <g id="Solid">
                  <path d={svgPaths.p12731a00} fill="var(--fill-0, white)" />
                  <path clipRule="evenodd" d={svgPaths.p3d996e00} fill="var(--fill-0, white)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (colour === "Pushed" && size === "x-small" && type === "Text" && shape === "Rounded") {
    return (
      <div className={className || "bg-[#106c7a] content-stretch flex flex-col items-center justify-center p-[10px] relative rounded-[8px] size-[32px]"} data-name="Colour=Pushed, Size=x-small, Type=Text, Shape=Rounded">
        <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-center text-white tracking-[-0.1px] whitespace-nowrap">
          <p className="leading-[16px]">VJ</p>
        </div>
      </div>
    );
  }
  if (colour === "Pushed" && size === "Small" && type === "Text" && shape === "Rounded") {
    return (
      <div className={className || "bg-[#106c7a] content-stretch flex flex-col items-center justify-center p-[10px] relative rounded-[8px] size-[40px]"} data-name="Colour=Pushed, Size=Small, Type=Text, Shape=Rounded">
        <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white tracking-[-0.1px] whitespace-nowrap">
          <p className="leading-[20px]">VJ</p>
        </div>
      </div>
    );
  }
  if (colour === "Pushed" && size === "Medium" && type === "Text" && shape === "Rounded") {
    return (
      <div className={className || "bg-[#106c7a] content-stretch flex flex-col items-center justify-center p-[10px] relative rounded-[8px] size-[48px]"} data-name="Colour=Pushed, Size=Medium, Type=Text, Shape=Rounded">
        <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white tracking-[-0.1px] whitespace-nowrap">
          <p className="leading-[20px]">VJ</p>
        </div>
      </div>
    );
  }
  if (colour === "Pushed" && size === "Large" && type === "Text" && shape === "Rounded") {
    return (
      <div className={className || "bg-[#106c7a] content-stretch flex flex-col items-center justify-center p-[10px] relative rounded-[8px] size-[64px]"} data-name="Colour=Pushed, Size=Large, Type=Text, Shape=Rounded">
        <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white tracking-[-0.1px] whitespace-nowrap">
          <p className="leading-[20px]">VJ</p>
        </div>
      </div>
    );
  }
  if (colour === "Pushed" && size === "x-small" && type === "Icon" && shape === "Rounded") {
    return (
      <div className={className || "bg-[#106c7a] content-stretch flex flex-col items-center justify-center p-[10px] relative rounded-[8px] size-[32px]"} data-name="Colour=Pushed, Size=x-small, Type=Icon, Shape=Rounded">
        <div className="content-stretch flex items-center relative shrink-0 size-[16px]" data-name="Icons">
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6667 14.6667">
                <g id="Solid">
                  <path d={svgPaths.p2fc1a700} fill="var(--fill-0, white)" />
                  <path clipRule="evenodd" d={svgPaths.p15dbaa00} fill="var(--fill-0, white)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (colour === "Pushed" && size === "Small" && type === "Icon" && shape === "Rounded") {
    return (
      <div className={className || "bg-[#106c7a] content-stretch flex flex-col items-center justify-center p-[10px] relative rounded-[8px] size-[40px]"} data-name="Colour=Pushed, Size=Small, Type=Icon, Shape=Rounded">
        <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
                <g id="Solid">
                  <path d={svgPaths.p12731a00} fill="var(--fill-0, white)" />
                  <path clipRule="evenodd" d={svgPaths.p3d996e00} fill="var(--fill-0, white)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (colour === "Pushed" && size === "Medium" && type === "Icon" && shape === "Rounded") {
    return (
      <div className={className || "bg-[#106c7a] content-stretch flex flex-col items-center justify-center p-[10px] relative rounded-[8px] size-[48px]"} data-name="Colour=Pushed, Size=Medium, Type=Icon, Shape=Rounded">
        <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
                <g id="Solid">
                  <path d={svgPaths.p12731a00} fill="var(--fill-0, white)" />
                  <path clipRule="evenodd" d={svgPaths.p3d996e00} fill="var(--fill-0, white)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (colour === "Pushed" && size === "Large" && type === "Icon" && shape === "Rounded") {
    return (
      <div className={className || "bg-[#106c7a] content-stretch flex flex-col items-center justify-center p-[10px] relative rounded-[8px] size-[64px]"} data-name="Colour=Pushed, Size=Large, Type=Icon, Shape=Rounded">
        <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
                <g id="Solid">
                  <path d={svgPaths.p12731a00} fill="var(--fill-0, white)" />
                  <path clipRule="evenodd" d={svgPaths.p3d996e00} fill="var(--fill-0, white)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (colour === "Pushed" && size === "x-small" && type === "Text" && shape === "Square") {
    return (
      <div className={className || "bg-[#106c7a] content-stretch flex flex-col items-center justify-center p-[10px] relative size-[32px]"} data-name="Colour=Pushed, Size=x-small, Type=Text, Shape=Square">
        <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-center text-white tracking-[-0.1px] whitespace-nowrap">
          <p className="leading-[16px]">VJ</p>
        </div>
      </div>
    );
  }
  if (colour === "Pushed" && size === "Small" && type === "Text" && shape === "Square") {
    return (
      <div className={className || "bg-[#106c7a] content-stretch flex flex-col items-center justify-center p-[10px] relative size-[40px]"} data-name="Colour=Pushed, Size=Small, Type=Text, Shape=Square">
        <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white tracking-[-0.1px] whitespace-nowrap">
          <p className="leading-[20px]">VJ</p>
        </div>
      </div>
    );
  }
  if (colour === "Pushed" && size === "Medium" && type === "Text" && shape === "Square") {
    return (
      <div className={className || "bg-[#106c7a] content-stretch flex flex-col items-center justify-center p-[10px] relative size-[48px]"} data-name="Colour=Pushed, Size=Medium, Type=Text, Shape=Square">
        <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white tracking-[-0.1px] whitespace-nowrap">
          <p className="leading-[20px]">VJ</p>
        </div>
      </div>
    );
  }
  if (colour === "Pushed" && size === "Large" && type === "Text" && shape === "Square") {
    return (
      <div className={className || "bg-[#106c7a] content-stretch flex flex-col items-center justify-center p-[10px] relative size-[64px]"} data-name="Colour=Pushed, Size=Large, Type=Text, Shape=Square">
        <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white tracking-[-0.1px] whitespace-nowrap">
          <p className="leading-[20px]">VJ</p>
        </div>
      </div>
    );
  }
  if (colour === "Pushed" && size === "x-small" && type === "Icon" && shape === "Square") {
    return (
      <div className={className || "bg-[#106c7a] content-stretch flex flex-col items-center justify-center p-[10px] relative size-[32px]"} data-name="Colour=Pushed, Size=x-small, Type=Icon, Shape=Square">
        <div className="content-stretch flex items-center relative shrink-0 size-[16px]" data-name="Icons">
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6667 14.6667">
                <g id="Solid">
                  <path d={svgPaths.p2fc1a700} fill="var(--fill-0, white)" />
                  <path clipRule="evenodd" d={svgPaths.p15dbaa00} fill="var(--fill-0, white)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (colour === "Pushed" && size === "Small" && type === "Icon" && shape === "Square") {
    return (
      <div className={className || "bg-[#106c7a] content-stretch flex flex-col items-center justify-center p-[10px] relative size-[40px]"} data-name="Colour=Pushed, Size=Small, Type=Icon, Shape=Square">
        <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
                <g id="Solid">
                  <path d={svgPaths.p12731a00} fill="var(--fill-0, white)" />
                  <path clipRule="evenodd" d={svgPaths.p3d996e00} fill="var(--fill-0, white)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (colour === "Pushed" && size === "Medium" && type === "Icon" && shape === "Square") {
    return (
      <div className={className || "bg-[#106c7a] content-stretch flex flex-col items-center justify-center p-[10px] relative size-[48px]"} data-name="Colour=Pushed, Size=Medium, Type=Icon, Shape=Square">
        <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
                <g id="Solid">
                  <path d={svgPaths.p12731a00} fill="var(--fill-0, white)" />
                  <path clipRule="evenodd" d={svgPaths.p3d996e00} fill="var(--fill-0, white)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (colour === "Pushed" && size === "Large" && type === "Icon" && shape === "Square") {
    return (
      <div className={className || "bg-[#106c7a] content-stretch flex flex-col items-center justify-center p-[10px] relative size-[64px]"} data-name="Colour=Pushed, Size=Large, Type=Icon, Shape=Square">
        <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
                <g id="Solid">
                  <path d={svgPaths.p12731a00} fill="var(--fill-0, white)" />
                  <path clipRule="evenodd" d={svgPaths.p3d996e00} fill="var(--fill-0, white)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (colour === "Disabled" && size === "x-small" && type === "Text" && shape === "Circle") {
    return (
      <div className={className || "bg-[#aab6b4] content-stretch flex flex-col items-center justify-center p-[10px] relative rounded-[50px] size-[32px]"} data-name="Colour=Disabled, Size=x-small, Type=Text, Shape=Circle">
        <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-center text-white tracking-[-0.1px] whitespace-nowrap">
          <p className="leading-[16px]">VJ</p>
        </div>
      </div>
    );
  }
  if (colour === "Disabled" && size === "Small" && type === "Text" && shape === "Circle") {
    return (
      <div className={className || "bg-[#aab6b4] content-stretch flex flex-col items-center justify-center p-[10px] relative rounded-[50px] size-[40px]"} data-name="Colour=Disabled, Size=Small, Type=Text, Shape=Circle">
        <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white tracking-[-0.1px] whitespace-nowrap">
          <p className="leading-[20px]">VJ</p>
        </div>
      </div>
    );
  }
  if (colour === "Disabled" && size === "Medium" && type === "Text" && shape === "Circle") {
    return (
      <div className={className || "bg-[#aab6b4] content-stretch flex flex-col items-center justify-center p-[10px] relative rounded-[50px] size-[48px]"} data-name="Colour=Disabled, Size=Medium, Type=Text, Shape=Circle">
        <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white tracking-[-0.1px] whitespace-nowrap">
          <p className="leading-[20px]">VJ</p>
        </div>
      </div>
    );
  }
  if (colour === "Disabled" && size === "Large" && type === "Text" && shape === "Circle") {
    return (
      <div className={className || "bg-[#aab6b4] content-stretch flex flex-col items-center justify-center p-[10px] relative rounded-[50px] size-[64px]"} data-name="Colour=Disabled, Size=Large, Type=Text, Shape=Circle">
        <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white tracking-[-0.1px] whitespace-nowrap">
          <p className="leading-[20px]">VJ</p>
        </div>
      </div>
    );
  }
  if (colour === "Disabled" && size === "x-small" && type === "Icon" && shape === "Circl") {
    return (
      <div className={className || "bg-[#aab6b4] content-stretch flex flex-col items-center justify-center p-[10px] relative rounded-[50px] size-[32px]"} data-name="Colour=Disabled, Size=x-small, Type=Icon, Shape=Circl">
        <div className="content-stretch flex items-center relative shrink-0 size-[16px]" data-name="Icons">
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6667 14.6667">
                <g id="Solid">
                  <path d={svgPaths.p2fc1a700} fill="var(--fill-0, white)" />
                  <path clipRule="evenodd" d={svgPaths.p15dbaa00} fill="var(--fill-0, white)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (colour === "Disabled" && size === "Small" && type === "Icon" && shape === "Circl") {
    return (
      <div className={className || "bg-[#aab6b4] content-stretch flex flex-col items-center justify-center p-[10px] relative rounded-[50px] size-[40px]"} data-name="Colour=Disabled, Size=Small, Type=Icon, Shape=Circl">
        <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
                <g id="Solid">
                  <path d={svgPaths.p12731a00} fill="var(--fill-0, white)" />
                  <path clipRule="evenodd" d={svgPaths.p3d996e00} fill="var(--fill-0, white)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (colour === "Disabled" && size === "Medium" && type === "Icon" && shape === "Circl") {
    return (
      <div className={className || "bg-[#aab6b4] content-stretch flex flex-col items-center justify-center p-[10px] relative rounded-[50px] size-[48px]"} data-name="Colour=Disabled, Size=Medium, Type=Icon, Shape=Circl">
        <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
                <g id="Solid">
                  <path d={svgPaths.p12731a00} fill="var(--fill-0, white)" />
                  <path clipRule="evenodd" d={svgPaths.p3d996e00} fill="var(--fill-0, white)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (colour === "Disabled" && size === "Large" && type === "Icon" && shape === "Circl") {
    return (
      <div className={className || "bg-[#aab6b4] content-stretch flex flex-col items-center justify-center p-[10px] relative rounded-[50px] size-[64px]"} data-name="Colour=Disabled, Size=Large, Type=Icon, Shape=Circl">
        <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
                <g id="Solid">
                  <path d={svgPaths.p12731a00} fill="var(--fill-0, white)" />
                  <path clipRule="evenodd" d={svgPaths.p3d996e00} fill="var(--fill-0, white)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (colour === "Disabled" && size === "x-small" && type === "Text" && shape === "Rounded") {
    return (
      <div className={className || "bg-[#aab6b4] content-stretch flex flex-col items-center justify-center p-[10px] relative rounded-[8px] size-[32px]"} data-name="Colour=Disabled, Size=x-small, Type=Text, Shape=Rounded">
        <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-center text-white tracking-[-0.1px] whitespace-nowrap">
          <p className="leading-[16px]">VJ</p>
        </div>
      </div>
    );
  }
  if (colour === "Disabled" && size === "Small" && type === "Text" && shape === "Rounded") {
    return (
      <div className={className || "bg-[#aab6b4] content-stretch flex flex-col items-center justify-center p-[10px] relative rounded-[8px] size-[40px]"} data-name="Colour=Disabled, Size=Small, Type=Text, Shape=Rounded">
        <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white tracking-[-0.1px] whitespace-nowrap">
          <p className="leading-[20px]">VJ</p>
        </div>
      </div>
    );
  }
  if (colour === "Disabled" && size === "Medium" && type === "Text" && shape === "Rounded") {
    return (
      <div className={className || "bg-[#aab6b4] content-stretch flex flex-col items-center justify-center p-[10px] relative rounded-[8px] size-[48px]"} data-name="Colour=Disabled, Size=Medium, Type=Text, Shape=Rounded">
        <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white tracking-[-0.1px] whitespace-nowrap">
          <p className="leading-[20px]">VJ</p>
        </div>
      </div>
    );
  }
  if (colour === "Disabled" && size === "Large" && type === "Text" && shape === "Rounded") {
    return (
      <div className={className || "bg-[#aab6b4] content-stretch flex flex-col items-center justify-center p-[10px] relative rounded-[8px] size-[64px]"} data-name="Colour=Disabled, Size=Large, Type=Text, Shape=Rounded">
        <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white tracking-[-0.1px] whitespace-nowrap">
          <p className="leading-[20px]">VJ</p>
        </div>
      </div>
    );
  }
  if (colour === "Disabled" && size === "x-small" && type === "Icon" && shape === "Rounded") {
    return (
      <div className={className || "bg-[#aab6b4] content-stretch flex flex-col items-center justify-center p-[10px] relative rounded-[8px] size-[32px]"} data-name="Colour=Disabled, Size=x-small, Type=Icon, Shape=Rounded">
        <div className="content-stretch flex items-center relative shrink-0 size-[16px]" data-name="Icons">
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6667 14.6667">
                <g id="Solid">
                  <path d={svgPaths.p2fc1a700} fill="var(--fill-0, white)" />
                  <path clipRule="evenodd" d={svgPaths.p15dbaa00} fill="var(--fill-0, white)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (colour === "Disabled" && size === "Small" && type === "Icon" && shape === "Rounded") {
    return (
      <div className={className || "bg-[#aab6b4] content-stretch flex flex-col items-center justify-center p-[10px] relative rounded-[8px] size-[40px]"} data-name="Colour=Disabled, Size=Small, Type=Icon, Shape=Rounded">
        <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
                <g id="Solid">
                  <path d={svgPaths.p12731a00} fill="var(--fill-0, white)" />
                  <path clipRule="evenodd" d={svgPaths.p3d996e00} fill="var(--fill-0, white)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (colour === "Disabled" && size === "Medium" && type === "Icon" && shape === "Rounded") {
    return (
      <div className={className || "bg-[#aab6b4] content-stretch flex flex-col items-center justify-center p-[10px] relative rounded-[8px] size-[48px]"} data-name="Colour=Disabled, Size=Medium, Type=Icon, Shape=Rounded">
        <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
                <g id="Solid">
                  <path d={svgPaths.p12731a00} fill="var(--fill-0, white)" />
                  <path clipRule="evenodd" d={svgPaths.p3d996e00} fill="var(--fill-0, white)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (colour === "Disabled" && size === "Large" && type === "Icon" && shape === "Rounded") {
    return (
      <div className={className || "bg-[#aab6b4] content-stretch flex flex-col items-center justify-center p-[10px] relative rounded-[8px] size-[64px]"} data-name="Colour=Disabled, Size=Large, Type=Icon, Shape=Rounded">
        <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
                <g id="Solid">
                  <path d={svgPaths.p12731a00} fill="var(--fill-0, white)" />
                  <path clipRule="evenodd" d={svgPaths.p3d996e00} fill="var(--fill-0, white)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (colour === "Disabled" && size === "x-small" && type === "Text" && shape === "Square") {
    return (
      <div className={className || "bg-[#aab6b4] content-stretch flex flex-col items-center justify-center p-[10px] relative size-[32px]"} data-name="Colour=Disabled, Size=x-small, Type=Text, Shape=Square">
        <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-center text-white tracking-[-0.1px] whitespace-nowrap">
          <p className="leading-[16px]">VJ</p>
        </div>
      </div>
    );
  }
  if (colour === "Disabled" && size === "Small" && type === "Text" && shape === "Square") {
    return (
      <div className={className || "bg-[#aab6b4] content-stretch flex flex-col items-center justify-center p-[10px] relative size-[40px]"} data-name="Colour=Disabled, Size=Small, Type=Text, Shape=Square">
        <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white tracking-[-0.1px] whitespace-nowrap">
          <p className="leading-[20px]">VJ</p>
        </div>
      </div>
    );
  }
  if (colour === "Disabled" && size === "Medium" && type === "Text" && shape === "Square") {
    return (
      <div className={className || "bg-[#aab6b4] content-stretch flex flex-col items-center justify-center p-[10px] relative size-[48px]"} data-name="Colour=Disabled, Size=Medium, Type=Text, Shape=Square">
        <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white tracking-[-0.1px] whitespace-nowrap">
          <p className="leading-[20px]">VJ</p>
        </div>
      </div>
    );
  }
  if (colour === "Disabled" && size === "Large" && type === "Text" && shape === "Square") {
    return (
      <div className={className || "bg-[#aab6b4] content-stretch flex flex-col items-center justify-center p-[10px] relative size-[64px]"} data-name="Colour=Disabled, Size=Large, Type=Text, Shape=Square">
        <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white tracking-[-0.1px] whitespace-nowrap">
          <p className="leading-[20px]">VJ</p>
        </div>
      </div>
    );
  }
  if (colour === "Disabled" && size === "x-small" && type === "Icon" && shape === "Square") {
    return (
      <div className={className || "bg-[#aab6b4] content-stretch flex flex-col items-center justify-center p-[10px] relative size-[32px]"} data-name="Colour=Disabled, Size=x-small, Type=Icon, Shape=Square">
        <div className="content-stretch flex items-center relative shrink-0 size-[16px]" data-name="Icons">
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6667 14.6667">
                <g id="Solid">
                  <path d={svgPaths.p2fc1a700} fill="var(--fill-0, white)" />
                  <path clipRule="evenodd" d={svgPaths.p15dbaa00} fill="var(--fill-0, white)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (colour === "Disabled" && size === "Small" && type === "Icon" && shape === "Square") {
    return (
      <div className={className || "bg-[#aab6b4] content-stretch flex flex-col items-center justify-center p-[10px] relative size-[40px]"} data-name="Colour=Disabled, Size=Small, Type=Icon, Shape=Square">
        <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
                <g id="Solid">
                  <path d={svgPaths.p12731a00} fill="var(--fill-0, white)" />
                  <path clipRule="evenodd" d={svgPaths.p3d996e00} fill="var(--fill-0, white)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (colour === "Disabled" && size === "Medium" && type === "Icon" && shape === "Square") {
    return (
      <div className={className || "bg-[#aab6b4] content-stretch flex flex-col items-center justify-center p-[10px] relative size-[48px]"} data-name="Colour=Disabled, Size=Medium, Type=Icon, Shape=Square">
        <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
                <g id="Solid">
                  <path d={svgPaths.p12731a00} fill="var(--fill-0, white)" />
                  <path clipRule="evenodd" d={svgPaths.p3d996e00} fill="var(--fill-0, white)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (colour === "Disabled" && size === "Large" && type === "Icon" && shape === "Square") {
    return (
      <div className={className || "bg-[#aab6b4] content-stretch flex flex-col items-center justify-center p-[10px] relative size-[64px]"} data-name="Colour=Disabled, Size=Large, Type=Icon, Shape=Square">
        <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
                <g id="Solid">
                  <path d={svgPaths.p12731a00} fill="var(--fill-0, white)" />
                  <path clipRule="evenodd" d={svgPaths.p3d996e00} fill="var(--fill-0, white)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={className || "bg-[#00a7b5] content-stretch flex flex-col items-center justify-center p-[10px] relative rounded-[50px] size-[32px]"} data-name="Colour=Primary, Size=x-small, Type=Text, Shape=Circle">
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-center text-white tracking-[-0.1px] whitespace-nowrap">
        <p className="leading-[16px]">VJ</p>
      </div>
    </div>
  );
}