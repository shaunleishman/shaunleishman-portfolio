"use client";

import { useState } from "react";
import ButtonMedium from "../../imports/ButtonMedium";

type ButtonMdVisual = "Tertiary" | "Tertiary hover" | "Tertiary pushed" | "Disabled";

type ConnectedButtonMediumProps = {
  buttonText?: string;
  disabled?: boolean;
  onClick?: () => void;
  iconLeftVis?: boolean;
  iconRightVis?: boolean;
  className?: string;
};

export function ConnectedButtonMedium({
  buttonText = "Button",
  disabled = false,
  onClick,
  iconLeftVis = false,
  iconRightVis = true,
  className,
}: ConnectedButtonMediumProps) {
  const [visual, setVisual] = useState<ButtonMdVisual>("Tertiary");

  const buttonMd: ButtonMdVisual = disabled ? "Disabled" : visual;

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => !disabled && setVisual("Tertiary hover")}
      onMouseLeave={() => !disabled && setVisual("Tertiary")}
      onMouseDown={() => !disabled && setVisual("Tertiary pushed")}
      onMouseUp={() => !disabled && setVisual("Tertiary hover")}
      className="shrink-0 cursor-pointer border-0 bg-transparent p-0 disabled:cursor-not-allowed"
    >
      <ButtonMedium
        buttonMd={buttonMd}
        buttonText={buttonText}
        iconLeftVis={iconLeftVis}
        iconRightVis={iconRightVis}
        className={className}
      />
    </button>
  );
}
