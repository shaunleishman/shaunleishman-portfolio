export type ButtonSize = "Large" | "Medium" | "Small";
export type ButtonStyle = "Primary" | "Secondary" | "Tertiary";
export type ButtonState = "Enabled" | "Hover" | "Pressed" | "Focus" | "Disabled";

export function getButtonStates(size: ButtonSize, style: ButtonStyle): ButtonState[] {
  if (size === "Large") {
    return style === "Primary"
      ? ["Enabled", "Hover", "Pressed", "Focus", "Disabled"]
      : ["Enabled", "Hover", "Pressed", "Focus"];
  }
  if (style === "Primary") {
    return ["Enabled", "Hover", "Pressed", "Focus", "Disabled"];
  }
  return ["Enabled", "Hover", "Pressed"];
}

type MediumSmallVariant =
  | "Primary"
  | "Primary hover"
  | "Primary-pushed"
  | "Secondary"
  | "Secondary-hover"
  | "Secondary pushed"
  | "Tertiary"
  | "Tertiary hover"
  | "Tertiary pushed"
  | "Focused"
  | "Disabled";

const MEDIUM_SMALL_MAP: Record<ButtonStyle, Partial<Record<ButtonState, MediumSmallVariant>>> = {
  Primary: {
    Enabled: "Primary",
    Hover: "Primary hover",
    Pressed: "Primary-pushed",
    Focus: "Focused",
    Disabled: "Disabled",
  },
  Secondary: {
    Enabled: "Secondary",
    Hover: "Secondary-hover",
    Pressed: "Secondary pushed",
  },
  Tertiary: {
    Enabled: "Tertiary",
    Hover: "Tertiary hover",
    Pressed: "Tertiary pushed",
  },
};

export function getButtonText(size: ButtonSize, style: ButtonStyle, state: ButtonState): string {
  if (size === "Large") return state;
  if (state === "Enabled") return style;
  if (state === "Focus") return "Focused";
  return state;
}

export function getButtonCode(size: ButtonSize, style: ButtonStyle, state: ButtonState): string {
  const buttonText = getButtonText(size, style, state);

  if (size === "Large") {
    return `import ButtonLarge from './imports/ButtonLarge';

<ButtonLarge
  style="${style}"
  state="${state}"
  buttonText="${buttonText}"
/>`;
  }

  const variant = MEDIUM_SMALL_MAP[style][state];
  const component = size === "Medium" ? "ButtonMedium" : "ButtonSmall";
  const prop = size === "Medium" ? "buttonMd" : "buttonSm";

  return `import ${component} from './imports/${component}';

<${component}
  ${prop}="${variant}"
  buttonText="${buttonText}"
/>`;
}

export function buildButtonLabel(size: ButtonSize, style: ButtonStyle, state: ButtonState): string {
  return `${size} · ${style} · ${state}`;
}

export function mediumSmallVariant(style: ButtonStyle, state: ButtonState): MediumSmallVariant {
  return MEDIUM_SMALL_MAP[style][state] ?? "Primary";
}

