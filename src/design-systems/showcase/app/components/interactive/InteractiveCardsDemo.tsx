"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import LargeCardDesignNew from "../../../imports/LargeCardDesignNew";
import LargeTileDesignNew from "../../../imports/LargeTileDesignNew";
import MediumTileDesignNew from "../../../imports/MediumTileDesignNew";
import { ConnectedInputField } from "../ConnectedInputField";
import { LargeTileSlotList } from "../LargeTileSlotList";
import { ShowcaseChevron } from "../ShowcaseChevron";
import { useComponentSectionCode } from "../ComponentSectionContext";
import { ComponentVariantToolbar, VariantPreviewFrame } from "../ComponentVariantToolbar";

type ComponentType = "tile" | "card";
type ComponentSize = "large" | "medium";
type TileState = "Default" | "Hover" | "Disabled";
type LargeCardState = "Default" | "Selected";

const TILE_STATES: TileState[] = ["Default", "Hover", "Disabled"];
const LARGE_CARD_STATES: LargeCardState[] = ["Default", "Selected"];

const TILE_SIZE_OPTIONS = [
  { value: "large", label: "Large" },
  { value: "medium", label: "Medium" },
] as const;

const CARD_SIZE_OPTIONS = [{ value: "large", label: "Large" }] as const;

function getSizeOptions(type: ComponentType) {
  return type === "tile" ? TILE_SIZE_OPTIONS : CARD_SIZE_OPTIONS;
}

function isMediumTile(type: ComponentType, size: ComponentSize) {
  return type === "tile" && size === "medium";
}

function isLargeCard(type: ComponentType, size: ComponentSize) {
  return type === "card" && size === "large";
}

function toLargeTileState(state: TileState) {
  return state === "Disabled" ? "Card-lg3" : state;
}

function CardPreviewShell({ children }: { children: ReactNode }) {
  return (
    <div className="showcase-card-preview flex w-full justify-center overflow-x-auto">
      <div className="inline-flex max-w-full shrink-0">{children}</div>
    </div>
  );
}

function ConnectedLargeTile({
  state,
  heading,
  description,
  onNavigate,
  onStatus,
}: {
  state: TileState;
  heading: string;
  description: string;
  onNavigate: () => void;
  onStatus?: (message: string) => void;
}) {
  const disabled = state === "Disabled";

  return (
    <LargeTileDesignNew
      cardLg={toLargeTileState(state)}
      hText={heading}
      dText={description}
      swapCompRight={
        <button
          type="button"
          aria-label="Open tile details"
          disabled={disabled}
          onClick={onNavigate}
          className="relative flex shrink-0 cursor-pointer items-center justify-center border-0 bg-transparent p-0 disabled:cursor-not-allowed"
        >
          <ShowcaseChevron direction="right" size="md" />
        </button>
      }
    >
      <LargeTileSlotList
        disabled={disabled}
        muted={disabled}
        onRowButtonClick={(row) => onStatus?.(`Row ${row} button clicked`)}
        onRowAddClick={(row) => onStatus?.(`Row ${row} add clicked`)}
      />
    </LargeTileDesignNew>
  );
}

function ConnectedMediumTile({
  state,
  onNavigate,
}: {
  state: TileState;
  onNavigate: () => void;
}) {
  const disabled = state === "Disabled";

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onNavigate}
      className="cursor-pointer border-0 bg-transparent p-0 text-left disabled:cursor-not-allowed"
    >
      <MediumTileDesignNew cardMd={state} />
    </button>
  );
}

function ConnectedLargeCard({
  state,
  heading,
  description,
  onToggleSelected,
}: {
  state: LargeCardState;
  heading: string;
  description: string;
  onToggleSelected: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggleSelected}
      aria-pressed={state === "Selected"}
      className="cursor-pointer border-0 bg-transparent p-0 text-left"
    >
      <LargeCardDesignNew cardMd={state}>
        <p className="font-['Open_Sans:bold',sans-serif] text-[14px] leading-[20px] tracking-[-0.1px] text-[#4a5453]">
          {heading}
        </p>
        <p className="font-['Open_Sans:bold',sans-serif] text-[36px] leading-[40px] tracking-[-0.3px] text-[#4a5453]">
          20%
        </p>
        <p className="font-['Open_Sans:regular',sans-serif] text-[14px] leading-[20px] tracking-[-0.1px] text-[#4a5453]">
          {description}
        </p>
      </LargeCardDesignNew>
    </button>
  );
}

export function InteractiveCardsDemo() {
  const [componentType, setComponentType] = useState<ComponentType>("tile");
  const [size, setSize] = useState<ComponentSize>("large");
  const [tileState, setTileState] = useState<TileState>("Default");
  const [cardState, setCardState] = useState<LargeCardState>("Default");
  const [heading, setHeading] = useState("Building A");
  const [description, setDescription] = useState("Energy consumption this month");
  const [showAll, setShowAll] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const sizeOptions = useMemo(() => getSizeOptions(componentType), [componentType]);

  useEffect(() => {
    if (!sizeOptions.some((option) => option.value === size)) {
      setSize("large");
    }
  }, [size, sizeOptions]);

  const liveCode = useMemo(() => {
    if (isMediumTile(componentType, size)) {
      return `import MediumTileDesignNew from './imports/MediumTileDesignNew';

<MediumTileDesignNew cardMd="${tileState}" />`;
    }
    if (isLargeCard(componentType, size)) {
      return `import LargeCardDesignNew from './imports/LargeCardDesignNew';

<LargeCardDesignNew cardMd="${cardState}">
  <p>${heading}</p>
  <p>20%</p>
  <p>${description}</p>
</LargeCardDesignNew>`;
    }
    return `import { ConnectedButtonMedium } from './ConnectedButtonMedium';
import { LargeTileSlotList } from './LargeTileSlotList';

<LargeTileDesignNew cardLg="${toLargeTileState(tileState)}" hText="${heading}" dText="${description}">
  <LargeTileSlotList onRowButtonClick={(row) => setStatus(\`Row \${row} button clicked\`)} />
</LargeTileDesignNew>`;
  }, [componentType, size, tileState, cardState, heading, description]);

  useComponentSectionCode(liveCode, !showAll);

  const componentLabel = `${size === "large" ? "Large" : "Medium"} ${componentType === "tile" ? "tile" : "card"}`;

  const stateLabel = isLargeCard(componentType, size) ? cardState : tileState;

  const preview = (() => {
    if (isMediumTile(componentType, size)) {
      return (
        <ConnectedMediumTile
          state={tileState}
          onNavigate={() => setStatus("Opened medium tile")}
        />
      );
    }
    if (isLargeCard(componentType, size)) {
      return (
        <ConnectedLargeCard
          state={cardState}
          heading={heading}
          description={description}
          onToggleSelected={() => {
            setCardState((current) => {
              const next = current === "Selected" ? "Default" : "Selected";
              setStatus(next === "Selected" ? "Card selected" : "Card deselected");
              return next;
            });
          }}
        />
      );
    }
    return (
      <ConnectedLargeTile
        state={tileState}
        heading={heading}
        description={description}
        onNavigate={() => setStatus(`Opened ${heading}`)}
        onStatus={setStatus}
      />
    );
  })();

  const stateFilter = isLargeCard(componentType, size)
    ? {
        id: "cardState",
        label: "State",
        value: cardState,
        onChange: (value: string) => setCardState(value as LargeCardState),
        options: LARGE_CARD_STATES.map((state) => ({ value: state, label: state })),
      }
    : {
        id: "tileState",
        label: "State",
        value: tileState,
        onChange: (value: string) => setTileState(value as TileState),
        options: TILE_STATES.map((state) => ({ value: state, label: state })),
      };

  return (
    <div>
      <ComponentVariantToolbar
        showAll={showAll}
        onShowAllChange={setShowAll}
        expandLabel="Expand all variants"
        collapseLabel="Show focused view"
        filters={[
          {
            id: "componentType",
            label: "Type",
            value: componentType,
            onChange: (value) => {
              setComponentType(value as ComponentType);
              setStatus(null);
            },
            options: [
              { value: "tile", label: "Tile" },
              { value: "card", label: "Card" },
            ],
          },
          {
            id: "size",
            label: "Size",
            value: size,
            onChange: (value) => {
              setSize(value as ComponentSize);
              setStatus(null);
            },
            options: sizeOptions.map((option) => ({ value: option.value, label: option.label })),
          },
          stateFilter,
        ]}
      />

      {!showAll && !isMediumTile(componentType, size) && (
        <div className="mb-4 grid gap-3 sm:grid-cols-2">
          <ConnectedInputField
            label="Heading"
            value={heading}
            onChange={setHeading}
            required={false}
            showTooltip={false}
            placeholder="Tile heading"
            className="!max-w-none w-full"
          />
          <ConnectedInputField
            label="Description"
            value={description}
            onChange={setDescription}
            required={false}
            showTooltip={false}
            placeholder="Tile description"
            className="!max-w-none w-full"
          />
        </div>
      )}

      {showAll ? (
        <div className="space-y-10">
          {TILE_STATES.map((state) => (
            <div key={`large-${state}`}>
              <p className="mb-3 text-xs font-semibold uppercase text-[var(--colour-labels-disabled)]">
                Large tile: {state}
              </p>
              <CardPreviewShell>
                <ConnectedLargeTile
                  state={state}
                  heading="Building A"
                  description="Energy consumption this month"
                  onNavigate={() => setStatus(`Opened large tile (${state})`)}
                  onStatus={setStatus}
                />
              </CardPreviewShell>
            </div>
          ))}
          {TILE_STATES.map((state) => (
            <div key={`medium-${state}`}>
              <p className="mb-3 text-xs font-semibold uppercase text-[var(--colour-labels-disabled)]">
                Medium tile: {state}
              </p>
              <CardPreviewShell>
                <ConnectedMediumTile
                  state={state}
                  onNavigate={() => setStatus(`Opened medium tile (${state})`)}
                />
              </CardPreviewShell>
            </div>
          ))}
          {LARGE_CARD_STATES.map((state) => (
            <div key={`card-${state}`}>
              <p className="mb-3 text-xs font-semibold uppercase text-[var(--colour-labels-disabled)]">
                Large card: {state}
              </p>
              <CardPreviewShell>
                <ConnectedLargeCard
                  state={state}
                  heading="Heading"
                  description="Description"
                  onToggleSelected={() => setStatus(`Toggled large card (${state})`)}
                />
              </CardPreviewShell>
            </div>
          ))}
          {status && (
            <p className="text-sm text-[#4a5453]" role="status">
              {status}
            </p>
          )}
        </div>
      ) : (
        <>
          <VariantPreviewFrame label={`${componentLabel}: ${stateLabel}`} align="center">
            <CardPreviewShell>{preview}</CardPreviewShell>
          </VariantPreviewFrame>
          {status && (
            <p className="mt-4 text-sm text-[#4a5453]" role="status">
              {status}
            </p>
          )}
          <p className="mt-4 text-xs text-[var(--colour-labels-disabled)]">
            Heading and description feed into the tile/card. Row buttons use connected tertiary buttons; chevron, add
            icons, medium tile, and large card clicks update the status below.
          </p>
        </>
      )}
    </div>
  );
}
