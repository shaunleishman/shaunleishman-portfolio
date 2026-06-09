"use client";

import { useEffect, useMemo, useState } from "react";
import { ConnectedShowcaseButton } from "../ConnectedShowcaseButton";
import { useComponentSectionCode } from "../ComponentSectionContext";
import { ComponentVariantToolbar, VariantPreviewFrame } from "../ComponentVariantToolbar";
import { ButtonsAllVariants } from "./ButtonsAllVariants";
import {
  buildButtonLabel,
  getButtonCode,
  getButtonStates,
  type ButtonSize,
  type ButtonState,
  type ButtonStyle,
} from "./button-variants";

export function InteractiveButtonsDemo() {
  const [size, setSize] = useState<ButtonSize>("Medium");
  const [style, setStyle] = useState<ButtonStyle>("Primary");
  const [state, setState] = useState<ButtonState>("Enabled");
  const [showAll, setShowAll] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const stateOptions = useMemo(() => getButtonStates(size, style), [size, style]);

  useEffect(() => {
    if (!stateOptions.includes(state)) {
      setState(stateOptions[0]);
    }
  }, [state, stateOptions]);

  const preview = useMemo(() => {
    if (showAll) {
      return null;
    }

    return (
      <ConnectedShowcaseButton
        size={size}
        style={style}
        state={state}
        onClick={() => setStatus(`${size} ${style} button clicked`)}
      />
    );
  }, [size, style, state, showAll]);

  const liveCode = getButtonCode(size, style, state);
  const label = buildButtonLabel(size, style, state);

  useComponentSectionCode(liveCode, !showAll);

  return (
    <div>
      <ComponentVariantToolbar
        showAll={showAll}
        onShowAllChange={setShowAll}
        filters={[
          {
            id: "size",
            label: "Size",
            value: size,
            onChange: (value) => setSize(value as ButtonSize),
            options: [
              { value: "Large", label: "Large" },
              { value: "Medium", label: "Medium" },
              { value: "Small", label: "Small" },
            ],
          },
          {
            id: "style",
            label: "Type",
            value: style,
            onChange: (value) => setStyle(value as ButtonStyle),
            options: [
              { value: "Primary", label: "Primary" },
              { value: "Secondary", label: "Secondary" },
              { value: "Tertiary", label: "Tertiary" },
            ],
          },
          {
            id: "state",
            label: "State",
            value: state,
            onChange: (value) => setState(value as ButtonState),
            options: stateOptions.map((option) => ({ value: option, label: option })),
          },
        ]}
      />

      {showAll ? (
        <ButtonsAllVariants />
      ) : (
        <>
          <VariantPreviewFrame label={label}>{preview}</VariantPreviewFrame>
          {status && (
            <p className="mt-4 text-sm text-[#4a5453]" role="status">
              {status}
            </p>
          )}
          <p className="mt-4 text-xs text-[var(--colour-labels-disabled)]">
            Hover, press, and focus update the enabled button visual state. Use the State filter to preview disabled
            and static states.
          </p>
        </>
      )}
    </div>
  );
}
