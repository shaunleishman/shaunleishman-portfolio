type RadioButtonProps = {
  className?: string;
  radioButton?: "Off-pushed" | "On-pushed" | "On" | "On-hover" | "On-disabled" | "Off-inactive" | "Off-hover";
};

export default function RadioButton({ className, radioButton = "On" }: RadioButtonProps) {
  const isOffHoverOrOffPushed = ["Off-hover", "Off-pushed"].includes(radioButton);
  return (
    <div className={className || `relative rounded-[16px] size-[16px] ${radioButton === "Off-inactive" ? "" : "content-stretch flex items-center justify-center p-[2px]"}`}>
      <div aria-hidden className={`absolute border border-solid inset-0 pointer-events-none rounded-[16px] ${["On-disabled", "Off-inactive", "Off-hover", "Off-pushed"].includes(radioButton) ? "border-[#aab6b4]" : "border-[#00a7b5]"}`} />
      {["On", "On-hover", "On-pushed", "On-disabled", "Off-hover", "Off-pushed"].includes(radioButton) && (
        <div className={`relative shrink-0 ${isOffHoverOrOffPushed ? "mix-blend-multiply size-[32px]" : "size-[8px]"}`}>
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox={isOffHoverOrOffPushed ? "0 0 32 32" : "0 0 8 8"}>
            {["On", "On-hover", "On-pushed", "On-disabled"].includes(radioButton) && <circle cx="4" cy="4" fill={radioButton === "On-disabled" ? "var(--fill-0, #AAB6B4)" : "var(--fill-0, #00A7B5)"} id="Ellipse 1102" r="4" />}
            {isOffHoverOrOffPushed && (
              <g id="Ellipse 1102" style={{ mixBlendMode: "multiply" }}>
                <circle cx="16" cy="16" fill={radioButton === "Off-pushed" ? "var(--fill-0, #B2EBF2)" : "var(--fill-0, #E0F7FA)"} r="16" />
              </g>
            )}
          </svg>
        </div>
      )}
      {["On-hover", "On-pushed"].includes(radioButton) && (
        <div className="absolute left-[-8px] mix-blend-multiply size-[32px] top-[-8px]">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
            <g id="Ellipse 1103" style={{ mixBlendMode: "multiply" }}>
              <circle cx="16" cy="16" fill={radioButton === "On-pushed" ? "var(--fill-0, #B2EBF2)" : "var(--fill-0, #E0F7FA)"} r="16" />
            </g>
          </svg>
        </div>
      )}
    </div>
  );
}