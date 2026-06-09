"use client";

import { useEffect, useState } from "react";
import { ShowcaseButton } from "./ShowcaseButton";
import type { ButtonSize, ButtonState, ButtonStyle } from "./interactive/button-variants";

type ConnectedShowcaseButtonProps = {
  size: ButtonSize;
  style: ButtonStyle;
  state: ButtonState;
  onClick?: () => void;
};

export function ConnectedShowcaseButton({ size, style, state, onClick }: ConnectedShowcaseButtonProps) {
  const [visualState, setVisualState] = useState<ButtonState>(state);
  const disabled = state === "Disabled";
  const isStaticPreview = state !== "Enabled";

  useEffect(() => {
    setVisualState(state);
  }, [state]);

  if (isStaticPreview) {
    return (
      <button
        type="button"
        disabled={disabled}
        onClick={onClick}
        className="cursor-pointer border-0 bg-transparent p-0 disabled:cursor-not-allowed"
      >
        <ShowcaseButton size={size} style={style} state={state} />
      </button>
    );
  }

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setVisualState("Hover")}
      onMouseLeave={() => setVisualState("Enabled")}
      onMouseDown={() => setVisualState("Pressed")}
      onMouseUp={() => setVisualState("Hover")}
      onFocus={() => setVisualState("Focus")}
      onBlur={() => setVisualState("Enabled")}
      className="cursor-pointer border-0 bg-transparent p-0 disabled:cursor-not-allowed"
    >
      <ShowcaseButton size={size} style={style} state={visualState} />
    </button>
  );
}
