"use client";

import { useState } from "react";
import Chip from "../../../imports/Chip";
import Counter from "../../../imports/Counter";
import { ConnectedChip } from "../ConnectedChip";
import { useComponentSectionCode } from "../ComponentSectionContext";
import { ComponentVariantToolbar, VariantPreviewFrame } from "../ComponentVariantToolbar";

type BadgeKind = "counter" | "chip";

const COUNTER_SIZES = ["Small", "Medium", "Large", "Actionable", "Disabled"] as const;
const CHIP_SIZES = ["Tiny", "Small", "Medium", "Large"] as const;
const CHIP_COLOURS = ["Default", "Dark", "Grey", "Error", "Success", "Caution", "Purple"] as const;
const CHIP_TYPES = ["Fill", "Outlined"] as const;

function ConnectedCounterPreview({ initialSize }: { initialSize: (typeof COUNTER_SIZES)[number] }) {
  const [sizeIndex, setSizeIndex] = useState(() => COUNTER_SIZES.indexOf(initialSize));
  const size = COUNTER_SIZES[sizeIndex];

  return (
    <button
      type="button"
      onClick={() => setSizeIndex((current) => (current + 1) % COUNTER_SIZES.length)}
      className="flex flex-col items-center gap-2 border-0 bg-transparent p-0"
    >
      <Counter counter={size} />
      <span className="text-xs text-[var(--colour-labels-disabled)]">{size}</span>
    </button>
  );
}

function ConnectedChipPreview({
  initialLabel,
  chipProps,
}: {
  initialLabel: string;
  chipProps: { size: (typeof CHIP_SIZES)[number]; colour: (typeof CHIP_COLOURS)[number]; type: (typeof CHIP_TYPES)[number] };
}) {
  const [visible, setVisible] = useState(true);

  if (!visible) {
    return (
      <button
        type="button"
        onClick={() => setVisible(true)}
        className="text-xs text-[#00a7b5] underline"
      >
        Restore {initialLabel}
      </button>
    );
  }

  if (chipProps.type === "Fill" && chipProps.colour === "Default" && chipProps.size === "Small") {
    return <ConnectedChip label={initialLabel} onRemove={() => setVisible(false)} />;
  }

  return <Chip {...chipProps} />;
}

export function InteractiveBadgesDemo() {
  const [kind, setKind] = useState<BadgeKind>("chip");
  const [counterSize, setCounterSize] = useState<(typeof COUNTER_SIZES)[number]>("Small");
  const [chipSize, setChipSize] = useState<(typeof CHIP_SIZES)[number]>("Small");
  const [chipColour, setChipColour] = useState<(typeof CHIP_COLOURS)[number]>("Default");
  const [chipType, setChipType] = useState<(typeof CHIP_TYPES)[number]>("Fill");
  const [showAll, setShowAll] = useState(false);
  const [chipVisible, setChipVisible] = useState(true);
  const [counterIndex, setCounterIndex] = useState(0);

  const filters =
    kind === "counter"
      ? [
          {
            id: "kind",
            label: "Component",
            value: kind,
            onChange: (value: string) => setKind(value as BadgeKind),
            options: [
              { value: "counter", label: "Counter badge" },
              { value: "chip", label: "Chip" },
            ],
          },
          {
            id: "size",
            label: "Size",
            value: counterSize,
            onChange: (value: string) => setCounterSize(value as (typeof COUNTER_SIZES)[number]),
            options: COUNTER_SIZES.map((size) => ({ value: size, label: size })),
          },
        ]
      : [
          {
            id: "kind",
            label: "Component",
            value: kind,
            onChange: (value: string) => setKind(value as BadgeKind),
            options: [
              { value: "counter", label: "Counter badge" },
              { value: "chip", label: "Chip" },
            ],
          },
          {
            id: "size",
            label: "Size",
            value: chipSize,
            onChange: (value: string) => setChipSize(value as (typeof CHIP_SIZES)[number]),
            options: CHIP_SIZES.map((size) => ({ value: size, label: size })),
          },
          {
            id: "colour",
            label: "Colour",
            value: chipColour,
            onChange: (value: string) => setChipColour(value as (typeof CHIP_COLOURS)[number]),
            options: CHIP_COLOURS.map((colour) => ({ value: colour, label: colour })),
          },
          {
            id: "type",
            label: "Style",
            value: chipType,
            onChange: (value: string) => setChipType(value as (typeof CHIP_TYPES)[number]),
            options: CHIP_TYPES.map((type) => ({ value: type, label: type })),
          },
        ];

  const liveCode =
    kind === "counter"
      ? `import Counter from './imports/Counter';

<Counter counter="${counterSize}" />`
      : chipType === "Fill" && chipColour === "Default"
        ? `import { ConnectedChip } from './ConnectedChip';

<ConnectedChip label="Small chip" onRemove={() => setVisible(false)} />`
        : `import Chip from './imports/Chip';

<Chip size="${chipSize}" colour="${chipColour}" type="${chipType}" />`;

  const label =
    kind === "counter"
      ? `Counter · ${counterSize}`
      : `Chip · ${chipSize} · ${chipColour} · ${chipType}`;

  useComponentSectionCode(liveCode, !showAll);

  const focusedPreview =
    kind === "counter" ? (
      <button
        type="button"
        onClick={() => setCounterIndex((current) => (current + 1) % COUNTER_SIZES.length)}
        className="border-0 bg-transparent p-0"
      >
        <Counter counter={COUNTER_SIZES[counterIndex]} />
      </button>
    ) : chipVisible && chipType === "Fill" && chipColour === "Default" ? (
      <ConnectedChip label="Small chip" onRemove={() => setChipVisible(false)} />
    ) : chipVisible ? (
      <Chip size={chipSize} colour={chipColour} type={chipType} />
    ) : (
      <button type="button" onClick={() => setChipVisible(true)} className="text-sm text-[#00a7b5] underline">
        Restore chip
      </button>
    );

  return (
    <div>
      <ComponentVariantToolbar showAll={showAll} onShowAllChange={setShowAll} filters={filters} />

      {showAll ? (
        <div className="space-y-8">
          <div>
            <h3 className="mb-4 text-base font-semibold text-[var(--colour-labels-neutral)]">Counter badges</h3>
            <div className="flex flex-wrap items-center gap-6">
              {COUNTER_SIZES.map((size) => (
                <ConnectedCounterPreview key={size} initialSize={size} />
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-base font-semibold text-[var(--colour-labels-neutral)]">Chips</h3>
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-4">
                {CHIP_SIZES.map((size) => (
                  <ConnectedChipPreview
                    key={size}
                    initialLabel={`${size} chip`}
                    chipProps={{ size, colour: "Default", type: "Fill" }}
                  />
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-4">
                {CHIP_COLOURS.map((colour) => (
                  <ConnectedChipPreview
                    key={colour}
                    initialLabel={colour}
                    chipProps={{ size: "Small", colour, type: "Fill" }}
                  />
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-4">
                {(["Default", "Dark", "Grey"] as const).map((colour) => (
                  <ConnectedChipPreview
                    key={colour}
                    initialLabel={`${colour} outlined`}
                    chipProps={{ size: "Small", colour, type: "Outlined" }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <VariantPreviewFrame label={label}>{focusedPreview}</VariantPreviewFrame>
          <p className="mt-4 text-xs text-[var(--colour-labels-disabled)]">
            {kind === "counter"
              ? "Click the counter to cycle through sizes."
              : "Default fill chips use ConnectedChip — click × to remove. Other variants use the Figma Chip export."}
          </p>
        </>
      )}
    </div>
  );
}
