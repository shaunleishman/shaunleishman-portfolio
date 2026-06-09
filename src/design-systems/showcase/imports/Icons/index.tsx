import svgPaths from "./svg-ymb93ssewu";
type IconsProps = {
  className?: string;
  icon?: "Dark" | "Reverse" | "Disabled" | "Primary" | "Pushed" | "Error" | "Caution" | "Success";
  iconChange?: React.ReactNode | null;
  size?: "Tiny" | "xs" | "Small" | "Medium" | "Large" | "xl";
};

export default function Icons({ className, icon = "Dark", iconChange = null, size = "Tiny" }: IconsProps) {
  if (icon === "Dark" && size === "xs") {
    return (
      <div className={className || "content-stretch flex items-center relative size-[16px]"} data-name="Icon=Dark, Size=xs">
        {iconChange || (
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6667 14.6667">
                <g id="Solid">
                  <path d={svgPaths.p2fc1a700} fill="var(--fill-0, #4A5453)" />
                  <path clipRule="evenodd" d={svgPaths.p15dbaa00} fill="var(--fill-0, #4A5453)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (icon === "Dark" && size === "Small") {
    return (
      <div className={className || "content-stretch flex items-center relative size-[20px]"} data-name="Icon=Dark, Size=Small">
        {iconChange || (
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.3333 18.3333">
                <g id="Solid">
                  <path d={svgPaths.p36d77000} fill="var(--fill-0, #4A5453)" />
                  <path clipRule="evenodd" d={svgPaths.pa0b2f00} fill="var(--fill-0, #4A5453)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (icon === "Dark" && size === "Medium") {
    return (
      <div className={className || "content-stretch flex items-center relative size-[24px]"} data-name="Icon=Dark, Size=Medium">
        {iconChange || (
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
                <g id="Solid">
                  <path d={svgPaths.p12731a00} fill="var(--fill-0, #4A5453)" />
                  <path clipRule="evenodd" d={svgPaths.p3d996e00} fill="var(--fill-0, #4A5453)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (icon === "Dark" && size === "Large") {
    return (
      <div className={className || "content-stretch flex items-center relative size-[36px]"} data-name="Icon=Dark, Size=Large">
        {iconChange || (
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 33 33">
                <g id="Solid">
                  <path d={svgPaths.p2d9759f0} fill="var(--fill-0, #4A5453)" />
                  <path clipRule="evenodd" d={svgPaths.p3a428480} fill="var(--fill-0, #4A5453)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (icon === "Dark" && size === "xl") {
    return (
      <div className={className || "content-stretch flex items-center relative size-[40px]"} data-name="Icon=Dark, Size=xl">
        {iconChange || (
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36.6667 36.6667">
                <g id="Solid">
                  <path d={svgPaths.p2f988680} fill="var(--fill-0, #4A5453)" />
                  <path clipRule="evenodd" d={svgPaths.p1b790480} fill="var(--fill-0, #4A5453)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (icon === "Reverse" && size === "Tiny") {
    return (
      <div className={className || "content-stretch flex items-center relative size-[12px]"} data-name="Icon=Reverse, Size=Tiny">
        {iconChange || (
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 11">
                <g id="Solid">
                  <path d={svgPaths.p2765c080} fill="var(--fill-0, white)" />
                  <path clipRule="evenodd" d={svgPaths.p1eecbbf0} fill="var(--fill-0, white)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (icon === "Reverse" && size === "xs") {
    return (
      <div className={className || "content-stretch flex items-center relative size-[16px]"} data-name="Icon=Reverse, Size=xs">
        {iconChange || (
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
        )}
      </div>
    );
  }
  if (icon === "Reverse" && size === "Small") {
    return (
      <div className={className || "content-stretch flex items-center relative size-[20px]"} data-name="Icon=Reverse, Size=Small">
        {iconChange || (
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.3333 18.3333">
                <g id="Solid">
                  <path d={svgPaths.p36d77000} fill="var(--fill-0, white)" />
                  <path clipRule="evenodd" d={svgPaths.pa0b2f00} fill="var(--fill-0, white)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (icon === "Reverse" && size === "Medium") {
    return (
      <div className={className || "content-stretch flex items-center relative size-[24px]"} data-name="Icon=Reverse, Size=Medium">
        {iconChange || (
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
        )}
      </div>
    );
  }
  if (icon === "Reverse" && size === "Large") {
    return (
      <div className={className || "content-stretch flex items-center relative size-[36px]"} data-name="Icon=Reverse, Size=Large">
        {iconChange || (
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 33 33">
                <g id="Solid">
                  <path d={svgPaths.p2d9759f0} fill="var(--fill-0, white)" />
                  <path clipRule="evenodd" d={svgPaths.p3a428480} fill="var(--fill-0, white)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (icon === "Reverse" && size === "xl") {
    return (
      <div className={className || "content-stretch flex items-center relative size-[40px]"} data-name="Icon=Reverse, Size=xl">
        {iconChange || (
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36.6667 36.6667">
                <g id="Solid">
                  <path d={svgPaths.p2f988680} fill="var(--fill-0, white)" />
                  <path clipRule="evenodd" d={svgPaths.p1b790480} fill="var(--fill-0, white)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (icon === "Disabled" && size === "Tiny") {
    return (
      <div className={className || "content-stretch flex items-center relative size-[12px]"} data-name="Icon=Disabled, Size=Tiny">
        {iconChange || (
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 11">
                <g id="Solid">
                  <path d={svgPaths.p2765c080} fill="var(--fill-0, #AAB6B4)" />
                  <path clipRule="evenodd" d={svgPaths.p1eecbbf0} fill="var(--fill-0, #AAB6B4)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (icon === "Disabled" && size === "xs") {
    return (
      <div className={className || "content-stretch flex items-center relative size-[16px]"} data-name="Icon=Disabled, Size=xs">
        {iconChange || (
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
        )}
      </div>
    );
  }
  if (icon === "Disabled" && size === "Small") {
    return (
      <div className={className || "content-stretch flex items-center relative size-[20px]"} data-name="Icon=Disabled, Size=Small">
        {iconChange || (
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.3333 18.3333">
                <g id="Solid">
                  <path d={svgPaths.p36d77000} fill="var(--fill-0, #AAB6B4)" />
                  <path clipRule="evenodd" d={svgPaths.pa0b2f00} fill="var(--fill-0, #AAB6B4)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (icon === "Disabled" && size === "Medium") {
    return (
      <div className={className || "content-stretch flex items-center relative size-[24px]"} data-name="Icon=Disabled, Size=Medium">
        {iconChange || (
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
        )}
      </div>
    );
  }
  if (icon === "Disabled" && size === "Large") {
    return (
      <div className={className || "content-stretch flex items-center relative size-[36px]"} data-name="Icon=Disabled, Size=Large">
        {iconChange || (
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 33 33">
                <g id="Solid">
                  <path d={svgPaths.p2d9759f0} fill="var(--fill-0, #AAB6B4)" />
                  <path clipRule="evenodd" d={svgPaths.p3a428480} fill="var(--fill-0, #AAB6B4)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (icon === "Disabled" && size === "xl") {
    return (
      <div className={className || "content-stretch flex items-center relative size-[40px]"} data-name="Icon=Disabled, Size=xl">
        {iconChange || (
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36.6667 36.6667">
                <g id="Solid">
                  <path d={svgPaths.p2f988680} fill="var(--fill-0, #AAB6B4)" />
                  <path clipRule="evenodd" d={svgPaths.p1b790480} fill="var(--fill-0, #AAB6B4)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (icon === "Primary" && size === "Tiny") {
    return (
      <div className={className || "content-stretch flex items-center relative size-[12px]"} data-name="Icon=Primary, Size=Tiny">
        {iconChange || (
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 11">
                <g id="Solid">
                  <path d={svgPaths.p2765c080} fill="var(--fill-0, #00A7B5)" />
                  <path clipRule="evenodd" d={svgPaths.p1eecbbf0} fill="var(--fill-0, #00A7B5)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (icon === "Primary" && size === "xs") {
    return (
      <div className={className || "content-stretch flex items-center relative size-[16px]"} data-name="Icon=Primary, Size=xs">
        {iconChange || (
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6667 14.6667">
                <g id="Solid">
                  <path d={svgPaths.p2fc1a700} fill="var(--fill-0, #00A7B5)" />
                  <path clipRule="evenodd" d={svgPaths.p15dbaa00} fill="var(--fill-0, #00A7B5)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (icon === "Primary" && size === "Small") {
    return (
      <div className={className || "content-stretch flex items-center relative size-[20px]"} data-name="Icon=Primary, Size=Small">
        {iconChange || (
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.3333 18.3333">
                <g id="Solid">
                  <path d={svgPaths.p36d77000} fill="var(--fill-0, #00A7B5)" />
                  <path clipRule="evenodd" d={svgPaths.pa0b2f00} fill="var(--fill-0, #00A7B5)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (icon === "Primary" && size === "Medium") {
    return (
      <div className={className || "content-stretch flex items-center relative size-[24px]"} data-name="Icon=Primary, Size=Medium">
        {iconChange || (
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
                <g id="Solid">
                  <path d={svgPaths.p12731a00} fill="var(--fill-0, #00A7B5)" />
                  <path clipRule="evenodd" d={svgPaths.p3d996e00} fill="var(--fill-0, #00A7B5)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (icon === "Primary" && size === "Large") {
    return (
      <div className={className || "content-stretch flex items-center relative size-[36px]"} data-name="Icon=Primary, Size=Large">
        {iconChange || (
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 33 33">
                <g id="Solid">
                  <path d={svgPaths.p2d9759f0} fill="var(--fill-0, #00A7B5)" />
                  <path clipRule="evenodd" d={svgPaths.p3a428480} fill="var(--fill-0, #00A7B5)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (icon === "Primary" && size === "xl") {
    return (
      <div className={className || "content-stretch flex items-center relative size-[40px]"} data-name="Icon=Primary, Size=xl">
        {iconChange || (
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36.6667 36.6667">
                <g id="Solid">
                  <path d={svgPaths.p2f988680} fill="var(--fill-0, #00A7B5)" />
                  <path clipRule="evenodd" d={svgPaths.p1b790480} fill="var(--fill-0, #00A7B5)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (icon === "Pushed" && size === "Tiny") {
    return (
      <div className={className || "content-stretch flex items-center relative size-[12px]"} data-name="Icon=Pushed, Size=Tiny">
        {iconChange || (
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 11">
                <g id="Solid">
                  <path d={svgPaths.p2765c080} fill="var(--fill-0, #106C7A)" />
                  <path clipRule="evenodd" d={svgPaths.p1eecbbf0} fill="var(--fill-0, #106C7A)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (icon === "Pushed" && size === "xs") {
    return (
      <div className={className || "content-stretch flex items-center relative size-[16px]"} data-name="Icon=Pushed, Size=xs">
        {iconChange || (
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6667 14.6667">
                <g id="Solid">
                  <path d={svgPaths.p2fc1a700} fill="var(--fill-0, #106C7A)" />
                  <path clipRule="evenodd" d={svgPaths.p15dbaa00} fill="var(--fill-0, #106C7A)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (icon === "Pushed" && size === "Small") {
    return (
      <div className={className || "content-stretch flex items-center relative size-[20px]"} data-name="Icon=Pushed, Size=Small">
        {iconChange || (
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.3333 18.3333">
                <g id="Solid">
                  <path d={svgPaths.p36d77000} fill="var(--fill-0, #106C7A)" />
                  <path clipRule="evenodd" d={svgPaths.pa0b2f00} fill="var(--fill-0, #106C7A)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (icon === "Pushed" && size === "Medium") {
    return (
      <div className={className || "content-stretch flex items-center relative size-[24px]"} data-name="Icon=Pushed, Size=Medium">
        {iconChange || (
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
                <g id="Solid">
                  <path d={svgPaths.p12731a00} fill="var(--fill-0, #106C7A)" />
                  <path clipRule="evenodd" d={svgPaths.p3d996e00} fill="var(--fill-0, #106C7A)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (icon === "Pushed" && size === "Large") {
    return (
      <div className={className || "content-stretch flex items-center relative size-[36px]"} data-name="Icon=Pushed, Size=Large">
        {iconChange || (
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 33 33">
                <g id="Solid">
                  <path d={svgPaths.p2d9759f0} fill="var(--fill-0, #106C7A)" />
                  <path clipRule="evenodd" d={svgPaths.p3a428480} fill="var(--fill-0, #106C7A)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (icon === "Pushed" && size === "xl") {
    return (
      <div className={className || "content-stretch flex items-center relative size-[40px]"} data-name="Icon=Pushed, Size=xl">
        {iconChange || (
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36.6667 36.6667">
                <g id="Solid">
                  <path d={svgPaths.p2f988680} fill="var(--fill-0, #106C7A)" />
                  <path clipRule="evenodd" d={svgPaths.p1b790480} fill="var(--fill-0, #106C7A)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (icon === "Error" && size === "Tiny") {
    return (
      <div className={className || "content-stretch flex items-center relative size-[12px]"} data-name="Icon=Error, Size=Tiny">
        {iconChange || (
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 11">
                <g id="Solid">
                  <path d={svgPaths.p2765c080} fill="var(--fill-0, #D04A21)" />
                  <path clipRule="evenodd" d={svgPaths.p1eecbbf0} fill="var(--fill-0, #D04A21)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (icon === "Error" && size === "xs") {
    return (
      <div className={className || "content-stretch flex items-center relative size-[16px]"} data-name="Icon=Error, Size=xs">
        {iconChange || (
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6667 14.6667">
                <g id="Solid">
                  <path d={svgPaths.p2fc1a700} fill="var(--fill-0, #D04A21)" />
                  <path clipRule="evenodd" d={svgPaths.p15dbaa00} fill="var(--fill-0, #D04A21)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (icon === "Error" && size === "Small") {
    return (
      <div className={className || "content-stretch flex items-center relative size-[20px]"} data-name="Icon=Error, Size=Small">
        {iconChange || (
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.3333 18.3333">
                <g id="Solid">
                  <path d={svgPaths.p36d77000} fill="var(--fill-0, #D04A21)" />
                  <path clipRule="evenodd" d={svgPaths.pa0b2f00} fill="var(--fill-0, #D04A21)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (icon === "Error" && size === "Medium") {
    return (
      <div className={className || "content-stretch flex items-center relative size-[24px]"} data-name="Icon=Error, Size=Medium">
        {iconChange || (
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
                <g id="Solid">
                  <path d={svgPaths.p12731a00} fill="var(--fill-0, #D04A21)" />
                  <path clipRule="evenodd" d={svgPaths.p3d996e00} fill="var(--fill-0, #D04A21)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (icon === "Error" && size === "Large") {
    return (
      <div className={className || "content-stretch flex items-center relative size-[36px]"} data-name="Icon=Error, Size=Large">
        {iconChange || (
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 33 33">
                <g id="Solid">
                  <path d={svgPaths.p2d9759f0} fill="var(--fill-0, #D04A21)" />
                  <path clipRule="evenodd" d={svgPaths.p3a428480} fill="var(--fill-0, #D04A21)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (icon === "Error" && size === "xl") {
    return (
      <div className={className || "content-stretch flex items-center relative size-[40px]"} data-name="Icon=Error, Size=xl">
        {iconChange || (
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36.6667 36.6667">
                <g id="Solid">
                  <path d={svgPaths.p2f988680} fill="var(--fill-0, #D04A21)" />
                  <path clipRule="evenodd" d={svgPaths.p1b790480} fill="var(--fill-0, #D04A21)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (icon === "Caution" && size === "Tiny") {
    return (
      <div className={className || "content-stretch flex items-center relative size-[12px]"} data-name="Icon=Caution, Size=Tiny">
        {iconChange || (
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 11">
                <g id="Solid">
                  <path d={svgPaths.p2765c080} fill="var(--fill-0, #F5A50D)" />
                  <path clipRule="evenodd" d={svgPaths.p1eecbbf0} fill="var(--fill-0, #F5A50D)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (icon === "Caution" && size === "xs") {
    return (
      <div className={className || "content-stretch flex items-center relative size-[16px]"} data-name="Icon=Caution, Size=xs">
        {iconChange || (
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6667 14.6667">
                <g id="Solid">
                  <path d={svgPaths.p2fc1a700} fill="var(--fill-0, #F5A50D)" />
                  <path clipRule="evenodd" d={svgPaths.p15dbaa00} fill="var(--fill-0, #F5A50D)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (icon === "Caution" && size === "Small") {
    return (
      <div className={className || "content-stretch flex items-center relative size-[20px]"} data-name="Icon=Caution, Size=Small">
        {iconChange || (
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.3333 18.3333">
                <g id="Solid">
                  <path d={svgPaths.p36d77000} fill="var(--fill-0, #F5A50D)" />
                  <path clipRule="evenodd" d={svgPaths.pa0b2f00} fill="var(--fill-0, #F5A50D)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (icon === "Caution" && size === "Medium") {
    return (
      <div className={className || "content-stretch flex items-center relative size-[24px]"} data-name="Icon=Caution, Size=Medium">
        {iconChange || (
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
                <g id="Solid">
                  <path d={svgPaths.p12731a00} fill="var(--fill-0, #F5A50D)" />
                  <path clipRule="evenodd" d={svgPaths.p3d996e00} fill="var(--fill-0, #F5A50D)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (icon === "Caution" && size === "Large") {
    return (
      <div className={className || "content-stretch flex items-center relative size-[36px]"} data-name="Icon=Caution, Size=Large">
        {iconChange || (
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 33 33">
                <g id="Solid">
                  <path d={svgPaths.p2d9759f0} fill="var(--fill-0, #F5A50D)" />
                  <path clipRule="evenodd" d={svgPaths.p3a428480} fill="var(--fill-0, #F5A50D)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (icon === "Caution" && size === "xl") {
    return (
      <div className={className || "content-stretch flex items-center relative size-[40px]"} data-name="Icon=Caution, Size=xl">
        {iconChange || (
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36.6667 36.6667">
                <g id="Solid">
                  <path d={svgPaths.p2f988680} fill="var(--fill-0, #F5A50D)" />
                  <path clipRule="evenodd" d={svgPaths.p1b790480} fill="var(--fill-0, #F5A50D)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (icon === "Success" && size === "Tiny") {
    return (
      <div className={className || "content-stretch flex items-center relative size-[12px]"} data-name="Icon=Success, Size=Tiny">
        {iconChange || (
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 11">
                <g id="Solid">
                  <path d={svgPaths.p2765c080} fill="var(--fill-0, #4CA843)" />
                  <path clipRule="evenodd" d={svgPaths.p1eecbbf0} fill="var(--fill-0, #4CA843)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (icon === "Success" && size === "xs") {
    return (
      <div className={className || "content-stretch flex items-center relative size-[16px]"} data-name="Icon=Success, Size=xs">
        {iconChange || (
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6667 14.6667">
                <g id="Solid">
                  <path d={svgPaths.p2fc1a700} fill="var(--fill-0, #4CA843)" />
                  <path clipRule="evenodd" d={svgPaths.p15dbaa00} fill="var(--fill-0, #4CA843)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (icon === "Success" && size === "Small") {
    return (
      <div className={className || "content-stretch flex items-center relative size-[20px]"} data-name="Icon=Success, Size=Small">
        {iconChange || (
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.3333 18.3333">
                <g id="Solid">
                  <path d={svgPaths.p36d77000} fill="var(--fill-0, #4CA843)" />
                  <path clipRule="evenodd" d={svgPaths.pa0b2f00} fill="var(--fill-0, #4CA843)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (icon === "Success" && size === "Medium") {
    return (
      <div className={className || "content-stretch flex items-center relative size-[24px]"} data-name="Icon=Success, Size=Medium">
        {iconChange || (
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
                <g id="Solid">
                  <path d={svgPaths.p12731a00} fill="var(--fill-0, #4CA843)" />
                  <path clipRule="evenodd" d={svgPaths.p3d996e00} fill="var(--fill-0, #4CA843)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (icon === "Success" && size === "Large") {
    return (
      <div className={className || "content-stretch flex items-center relative size-[36px]"} data-name="Icon=Success, Size=Large">
        {iconChange || (
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 33 33">
                <g id="Solid">
                  <path d={svgPaths.p2d9759f0} fill="var(--fill-0, #4CA843)" />
                  <path clipRule="evenodd" d={svgPaths.p3a428480} fill="var(--fill-0, #4CA843)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (icon === "Success" && size === "xl") {
    return (
      <div className={className || "content-stretch flex items-center relative size-[40px]"} data-name="Icon=Success, Size=xl">
        {iconChange || (
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
            <div className="absolute inset-[4.17%]" data-name="Solid">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36.6667 36.6667">
                <g id="Solid">
                  <path d={svgPaths.p2f988680} fill="var(--fill-0, #4CA843)" />
                  <path clipRule="evenodd" d={svgPaths.p1b790480} fill="var(--fill-0, #4CA843)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        )}
      </div>
    );
  }
  return (
    <div className={className || "content-stretch flex items-center relative size-[12px]"} data-name="Icon=Dark, Size=Tiny">
      {iconChange || (
        <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
          <div className="absolute inset-[4.17%]" data-name="Solid">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 11">
              <g id="Solid">
                <path d={svgPaths.p2765c080} fill="var(--fill-0, #4A5453)" />
                <path clipRule="evenodd" d={svgPaths.p1eecbbf0} fill="var(--fill-0, #4A5453)" fillRule="evenodd" />
              </g>
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}