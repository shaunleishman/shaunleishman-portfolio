import { cn } from "@/lib/utils";

type SliderComponentProps = {
  className?: string;
  slider?: "Active" | "Disabled";
  value?: number;
  onChange?: (value: number) => void;
};

function clampValue(value: number) {
  return Math.min(100, Math.max(0, Math.round(value)));
}

export default function SliderComponent({
  className,
  slider = "Active",
  value = 13,
  onChange,
}: SliderComponentProps) {
  const isDisabled = slider === "Disabled";
  const isInteractive = !isDisabled && onChange != null;
  const displayValue = clampValue(value);

  function setValue(next: number) {
    if (!onChange || isDisabled) return;
    onChange(clampValue(next));
  }

  return (
    <div className={cn("relative flex w-full max-w-[311px] items-end gap-4", className)}>
      <div className="relative flex min-w-0 flex-1 flex-col gap-[21px]">
        <div
          className={`flex w-full items-center justify-between text-[14px] leading-[20px] tracking-[-0.1px] ${
            isDisabled ? "text-[#aab6b4]" : "text-[#4a5453]"
          }`}
        >
          <span>0%</span>
          <span>100%</span>
        </div>

        <div className="relative h-3 w-full" data-name="Slider">
          <div className="absolute inset-0 rounded-[8px] bg-[#e5e8e7]" />

          <div
            className={`absolute left-0 top-0 h-3 rounded-[8px] ${isDisabled ? "bg-[#aab6b4]" : "bg-[#00a7b5]"}`}
            style={{ width: `max(12px, ${displayValue}%)` }}
            aria-hidden
          />

          <div
            className={`pointer-events-none absolute top-1/2 size-6 -translate-x-1/2 -translate-y-1/2 rounded-full ${
              isDisabled ? "bg-[#aab6b4]" : "bg-[#00a7b5]"
            }`}
            style={{ left: `${displayValue}%` }}
            aria-hidden
          />

          {isInteractive && (
            <input
              type="range"
              min={0}
              max={100}
              value={displayValue}
              onChange={(event) => setValue(Number(event.target.value))}
              className="absolute inset-0 z-[1] h-full w-full cursor-pointer opacity-0"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={displayValue}
              aria-label="Slider value"
            />
          )}
        </div>
      </div>

      <div className="relative w-[53px] shrink-0" data-name="Input field">
        <div
          className={`relative h-10 w-full rounded-[8px] ${isDisabled ? "bg-[#e5e8e7]" : "bg-white"}`}
          data-name="Field-all-icons"
        >
          {!isDisabled && (
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[8px] border border-solid border-[#aab6b4]"
            />
          )}
          {isInteractive ? (
            <input
              type="number"
              min={0}
              max={100}
              value={displayValue}
              onChange={(event) => {
                const parsed = Number(event.target.value);
                if (Number.isFinite(parsed)) setValue(parsed);
              }}
              className="relative h-full w-full border-0 bg-transparent px-3 text-center font-['Open_Sans:regular',sans-serif] text-[14px] leading-[20px] tracking-[-0.1px] text-[#4a5453] outline-none"
            />
          ) : (
            <div className="flex h-full items-center justify-center px-3">
              <span className="font-['Open_Sans:regular',sans-serif] text-[14px] leading-[20px] tracking-[-0.1px] text-[#4a5453]">
                {displayValue}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
