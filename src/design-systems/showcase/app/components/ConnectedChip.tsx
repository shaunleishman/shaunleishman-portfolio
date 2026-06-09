"use client";

export const CHIP_SHELL_CLASS =
  "inline-flex h-7 shrink-0 items-center gap-1 rounded-[8px] px-2 font-['Open_Sans:semi-bold',sans-serif] text-[12px] leading-[16px] tracking-[-0.1px]";

export const CHIP_FILLED_CLASS = `${CHIP_SHELL_CLASS} bg-[var(--colour-surfaces-primary-pushed,#106c7a)] text-white`;

export const CHIP_OVERFLOW_CLASS = `${CHIP_SHELL_CLASS} bg-transparent text-[#00a7b5]`;

export function ChipRemoveButton({
  label,
  onRemove,
  tone,
}: {
  label: string;
  onRemove: () => void;
  tone: "filled" | "overflow";
}) {
  const iconClass =
    tone === "filled" ? "text-white hover:bg-white/20" : "text-[#00a7b5] hover:bg-[#e0f7fa]";

  return (
    <span
      role="button"
      tabIndex={-1}
      aria-label={`Remove ${label}`}
      onMouseDown={(event) => {
        event.stopPropagation();
        event.preventDefault();
        onRemove();
      }}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.stopPropagation();
          event.preventDefault();
          onRemove();
        }
      }}
      className={`inline-flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-[4px] ${iconClass}`}
    >
      <svg className="size-2.5" viewBox="0 0 10 10" fill="none" aria-hidden>
        <path
          d="M1.70711 0.292893C1.31658 -0.0976311 0.683417 -0.0976311 0.292893 0.292893C-0.0976311 0.683417 -0.0976311 1.31658 0.292893 1.70711L3.58579 5L0.292893 8.29289C-0.0976311 8.68342 -0.0976311 9.31658 0.292893 9.70711C0.683417 10.0976 1.31658 10.0976 1.70711 9.70711L5 6.41421L8.29289 9.70711C8.68342 10.0976 9.31658 10.0976 9.70711 9.70711C10.0976 9.31658 10.0976 8.68342 9.70711 8.29289L6.41421 5L9.70711 1.70711C10.0976 1.31658 10.0976 0.683417 9.70711 0.292893C9.31658 -0.0976311 8.68342 -0.0976311 8.29289 0.292893L5 3.58579L1.70711 0.292893Z"
          fill="currentColor"
        />
      </svg>
    </span>
  );
}

type ConnectedChipProps = {
  label: string;
  onRemove: () => void;
  removeAriaLabel?: string;
  className?: string;
};

export function ConnectedChip({ label, onRemove, removeAriaLabel, className }: ConnectedChipProps) {
  const removeLabel = removeAriaLabel ?? label;

  return (
    <span className={className ?? CHIP_FILLED_CLASS} data-name="Chip">
      <span className="whitespace-nowrap">{label}</span>
      <ChipRemoveButton label={removeLabel} tone="filled" onRemove={onRemove} />
    </span>
  );
}
