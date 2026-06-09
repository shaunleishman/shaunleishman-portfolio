"use client";

import ButtonLarge from "../../imports/ButtonLarge";
import ButtonMedium from "../../imports/ButtonMedium";
import ButtonSmall from "../../imports/ButtonSmall";
import {
  getButtonText,
  mediumSmallVariant,
  type ButtonSize,
  type ButtonState,
  type ButtonStyle,
} from "./interactive/button-variants";

type ShowcaseButtonProps = {
  size: ButtonSize;
  style: ButtonStyle;
  state: ButtonState;
};

/** Renders the same Figma button exports used in the expand-all variants grid. */
export function ShowcaseButton({ size, style, state }: ShowcaseButtonProps) {
  const buttonText = getButtonText(size, style, state);

  if (size === "Large") {
    return <ButtonLarge style={style} state={state} buttonText={buttonText} />;
  }

  if (size === "Medium") {
    return (
      <ButtonMedium buttonMd={mediumSmallVariant(style, state)} buttonText={buttonText} />
    );
  }

  return <ButtonSmall buttonSm={mediumSmallVariant(style, state)} buttonText={buttonText} />;
}
