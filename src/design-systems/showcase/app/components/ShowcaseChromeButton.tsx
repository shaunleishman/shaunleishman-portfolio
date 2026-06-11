"use client";

type ShowcaseChromeButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
};

const VARIANT_CLASS = {
  primary:
    "border border-[#00a7b5] bg-[#00a7b5] text-white hover:bg-[#088391] active:bg-[#106c7a]",
  secondary:
    "border border-[#00a7b5] bg-[#e0f7fa] text-[#00a7b5] hover:bg-[#b2ebf2] active:bg-[#80deea]",
  ghost:
    "border border-transparent bg-transparent text-[#4a5453] hover:bg-[#f5f6f6] active:bg-[#e5e8e7]",
} as const;

/** Native button for showcase chrome: avoids invisible Figma export text-box-trim issues. */
export function ShowcaseChromeButton({
  children,
  variant = "ghost",
  onClick,
  disabled,
  type = "button",
}: ShowcaseChromeButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={[
        "inline-flex min-h-[40px] items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition-colors",
        "disabled:cursor-not-allowed disabled:opacity-50",
        VARIANT_CLASS[variant],
      ].join(" ")}
    >
      {children}
    </button>
  );
}
