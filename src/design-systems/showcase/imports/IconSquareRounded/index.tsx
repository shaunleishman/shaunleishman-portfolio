import svgPaths from "./svg-qluq4i3is";
type IconSquareRoundedProps = {
  className?: string;
  icon?: "Square" | "Circle" | "Icon3" | "Icon4";
};

export default function IconSquareRounded({ className, icon = "Square" }: IconSquareRoundedProps) {
  const isIcon3OrIcon4 = ["Icon3", "Icon4"].includes(icon);
  return (
    <div className={className || `bg-[#00a7b5] content-stretch flex items-center justify-center p-[12px] relative ${icon === "Icon4" ? "rounded-[8px] size-[36px]" : icon === "Icon3" ? "rounded-[57px] size-[36px]" : icon === "Circle" ? "rounded-[57px] size-[52px]" : "rounded-[8px] size-[52px]"}`}>
      <div className={`overflow-clip relative shrink-0 ${isIcon3OrIcon4 ? "size-[16px]" : "size-[24px]"}`} data-name="alert-circle">
        <div className="absolute inset-[4.17%]" data-name="Icon (Stroke)">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox={isIcon3OrIcon4 ? "0 0 14.6667 14.6667" : "0 0 22 22"}>
            <path clipRule="evenodd" d={isIcon3OrIcon4 ? svgPaths.p8767800 : svgPaths.pfeca300} fill="var(--fill-0, white)" fillRule="evenodd" id="Icon (Stroke)" />
          </svg>
        </div>
      </div>
    </div>
  );
}