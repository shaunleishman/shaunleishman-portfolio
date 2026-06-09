import { ShowcaseButton } from "../ShowcaseButton";
import type { ButtonSize, ButtonState, ButtonStyle } from "./button-variants";

function VariantRow({
  size,
  style,
  states,
}: {
  size: ButtonSize;
  style: ButtonStyle;
  states: ButtonState[];
}) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      {states.map((state) => (
        <ShowcaseButton key={state} size={size} style={style} state={state} />
      ))}
    </div>
  );
}

export function ButtonsAllVariants() {
  return (
    <div className="space-y-6">
      <div className="rounded-[var(--radius-medium-radius)] bg-white p-4">
        <h3 className="mb-4 text-base font-semibold text-[#4a5453]">Large buttons</h3>
        <div className="space-y-6">
          {(["Primary", "Secondary", "Tertiary"] as const).map((style) => (
            <div key={style}>
              <p className="mb-3 text-xs font-semibold uppercase text-[#aab6b4]">{style}</p>
              <VariantRow
                size="Large"
                style={style}
                states={
                  style === "Primary"
                    ? ["Enabled", "Hover", "Pressed", "Focus", "Disabled"]
                    : ["Enabled", "Hover", "Pressed", "Focus"]
                }
              />
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-[var(--radius-medium-radius)] bg-white p-4">
        <h3 className="mb-4 text-base font-semibold text-[#4a5453]">Medium buttons</h3>
        <div className="space-y-6">
          {(["Primary", "Secondary", "Tertiary"] as const).map((style) => (
            <div key={style}>
              <p className="mb-3 text-xs font-semibold uppercase text-[#aab6b4]">{style}</p>
              <VariantRow
                size="Medium"
                style={style}
                states={
                  style === "Primary"
                    ? ["Enabled", "Hover", "Pressed", "Focus", "Disabled"]
                    : ["Enabled", "Hover", "Pressed"]
                }
              />
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-[var(--radius-medium-radius)] bg-white p-4">
        <h3 className="mb-4 text-base font-semibold text-[#4a5453]">Small buttons</h3>
        <div className="space-y-6">
          {(["Primary", "Secondary", "Tertiary"] as const).map((style) => (
            <div key={style}>
              <p className="mb-3 text-xs font-semibold uppercase text-[#aab6b4]">{style}</p>
              <VariantRow
                size="Small"
                style={style}
                states={
                  style === "Primary"
                    ? ["Enabled", "Hover", "Pressed", "Focus", "Disabled"]
                    : ["Enabled", "Hover", "Pressed"]
                }
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
