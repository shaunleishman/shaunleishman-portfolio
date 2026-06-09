type ToggleProps = {
  className?: string;
  toggle?: "On" | "Off" | "Disabled";
};

export default function Toggle({ className, toggle = "On" }: ToggleProps) {
  const isDisabled = toggle === "Disabled";
  return (
    <div className={className || "content-stretch flex flex-col items-start relative"}>
      <div className="h-[20px] relative shrink-0 w-[40px]" data-name="Toggle">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 20">
          <g id="Toggle">
            <rect fill={isDisabled ? "var(--fill-0, #AAB6B4)" : toggle === "Off" ? "var(--fill-0, #E5E8E7)" : "var(--fill-0, #00A7B5)"} height="20" rx="10" width="40" />
            <circle cx={["Off", "Disabled"].includes(toggle) ? "10" : "30"} cy="10" fill={isDisabled ? "var(--fill-0, #E5E8E7)" : "var(--fill-0, white)"} id="Ellipse 1101" r="8" />
          </g>
        </svg>
      </div>
    </div>
  );
}