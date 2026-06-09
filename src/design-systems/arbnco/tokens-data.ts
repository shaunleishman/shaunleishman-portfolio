export type TokenEntry = {
  name: string;
  value: string;
  usage?: string;
  swatch?: boolean;
};

export type TokenGroup = {
  id: string;
  title: string;
  description?: string;
  tokens: TokenEntry[];
};

export const PRIMITIVE_TOKEN_GROUPS: TokenGroup[] = [
  {
    id: "blue",
    title: "Blue palette",
    description: "Primary brand scale from light tints to deep teal.",
    tokens: [
      { name: "--blue-p50", value: "#ebfffd", swatch: true },
      { name: "--blue-p100", value: "#e0f7fa", swatch: true },
      { name: "--blue-p200", value: "#b2ebf2", swatch: true },
      { name: "--blue-p300", value: "#80deea", swatch: true },
      { name: "--blue-p400", value: "#26c6da", swatch: true },
      { name: "--blue-p500", value: "#00a7b5", swatch: true, usage: "Primary brand" },
      { name: "--blue-p600", value: "#088391", swatch: true },
      { name: "--blue-p700", value: "#106c7a", swatch: true },
      { name: "--blue-p800", value: "#125a67", swatch: true },
      { name: "--blue-p900", value: "#053c47", swatch: true },
    ],
  },
  {
    id: "grey",
    title: "Grey neutral",
    tokens: [
      { name: "--grey-n0", value: "#ffffff", swatch: true },
      { name: "--grey-n50", value: "#f5f6f6", swatch: true },
      { name: "--grey-n100", value: "#e5e8e7", swatch: true },
      { name: "--grey-n200", value: "#cdd4d3", swatch: true },
      { name: "--grey-n300", value: "#aab6b4", swatch: true },
      { name: "--grey-n400", value: "#7f918f", swatch: true },
      { name: "--grey-n500", value: "#647674", swatch: true },
      { name: "--grey-n600", value: "#4a5453", swatch: true, usage: "Body text" },
      { name: "--grey-n700", value: "#414949", swatch: true },
      { name: "--grey-n800", value: "#394040", swatch: true },
      { name: "--grey-n900", value: "#232828", swatch: true },
    ],
  },
  {
    id: "states",
    title: "State colours",
    tokens: [
      { name: "--colour-states-success", value: "#4ca843", swatch: true },
      { name: "--colour-states-success-bg", value: "#ecffea", swatch: true },
      { name: "--colour-states-warning", value: "#f5a50d", swatch: true },
      { name: "--colour-states-warning-bg", value: "#fff4e5", swatch: true },
      { name: "--colour-states-error", value: "#d04a21", swatch: true },
      { name: "--colour-states-error-bg", value: "#ffe6e1", swatch: true },
    ],
  },
  {
    id: "accents",
    title: "Accents",
    tokens: [
      { name: "--accents-ribbon", value: "#ff4671", swatch: true },
      { name: "--accents-ribbon-2", value: "#ffe1e8", swatch: true },
      { name: "--accents-innovation", value: "#9131a8", swatch: true },
      { name: "--accents-innovation-2", value: "#fbebff", swatch: true },
      { name: "--accents-hydro", value: "#3697ff", swatch: true },
      { name: "--accents-hydro-2", value: "#e9f3ff", swatch: true },
      { name: "--accents-growth", value: "#14a35c", swatch: true },
      { name: "--accents-growth-2", value: "#ebfff5", swatch: true },
    ],
  },
  {
    id: "british-gas",
    title: "British Gas",
    tokens: [
      { name: "--british-gas-blue", value: "#004ecb", swatch: true },
      { name: "--british-gas-black", value: "#111518", swatch: true },
      { name: "--british-gas-light-blue", value: "#ebf7ff", swatch: true },
      { name: "--british-gas-white", value: "#ffffff", swatch: true },
      { name: "--british-gas-grey", value: "#445360", swatch: true },
    ],
  },
  {
    id: "spacing",
    title: "Spacing scale",
    description: "Pixel-based spacing primitives.",
    tokens: [
      { name: "--pixels-0", value: "0px" },
      { name: "--pixels-1", value: "4px" },
      { name: "--pixels-2", value: "8px" },
      { name: "--pixels-3", value: "12px" },
      { name: "--pixels-4", value: "16px" },
      { name: "--pixels-5", value: "20px" },
      { name: "--pixels-6", value: "24px" },
      { name: "--pixels-7", value: "28px" },
      { name: "--pixels-8", value: "36px" },
      { name: "--pixels-9", value: "40px" },
      { name: "--pixels-10", value: "44px" },
      { name: "--pixels-11", value: "48px" },
      { name: "--pixels-12", value: "52px" },
      { name: "--pixels-13", value: "56px" },
      { name: "--pixels-14", value: "60px" },
      { name: "--pixels-15", value: "64px" },
    ],
  },
  {
    id: "radius",
    title: "Border radius",
    tokens: [
      { name: "--radius-small-radius", value: "4px", usage: "Checkboxes, chips" },
      { name: "--radius-medium-radius", value: "8px", usage: "Buttons, inputs" },
      { name: "--radius-large-radius", value: "16px", usage: "Cards, panels" },
    ],
  },
];

export const SEMANTIC_TOKEN_GROUPS: TokenGroup[] = [
  {
    id: "surfaces",
    title: "Surfaces",
    tokens: [
      { name: "--colour-surfaces-primary", value: "var(--blue-p500)", swatch: true },
      { name: "--colour-surfaces-primary-hover", value: "var(--blue-p400)", swatch: true },
      { name: "--colour-surfaces-primary-pushed", value: "var(--blue-p700)", swatch: true },
      { name: "--colour-surfaces-secondary-hover", value: "var(--blue-p100)", swatch: true },
      { name: "--colour-surfaces-secondary-pushed", value: "var(--blue-p200)", swatch: true },
      { name: "--colour-surfaces-tertiary-hover", value: "var(--grey-n50)", swatch: true },
      { name: "--colour-surfaces-tertiary-pushed", value: "var(--grey-n100)", swatch: true },
      { name: "--colour-surfaces-neutral", value: "var(--grey-n0)", swatch: true },
      { name: "--colour-surfaces-disabled", value: "var(--grey-n100)", swatch: true },
      { name: "--colour-surfaces-bg", value: "var(--grey-n50)", swatch: true },
    ],
  },
  {
    id: "labels",
    title: "Labels",
    tokens: [
      { name: "--colour-labels-primary", value: "var(--blue-p500)", swatch: true },
      { name: "--colour-labels-neutral", value: "var(--grey-n600)", swatch: true },
      { name: "--colour-labels-reverse", value: "var(--grey-n0)", swatch: true },
      { name: "--colour-labels-disabled", value: "var(--grey-n300)", swatch: true },
      { name: "--colour-labels-pushed", value: "var(--blue-p700)", swatch: true },
    ],
  },
  {
    id: "outlines",
    title: "Outlines",
    tokens: [
      { name: "--colour-outlines-neutral", value: "var(--grey-n300)", swatch: true },
      { name: "--colour-outlines-selected", value: "var(--blue-p500)", swatch: true },
      { name: "--colour-outlines-hover", value: "var(--blue-p400)", swatch: true },
      { name: "--colour-outlines-pushed", value: "var(--blue-p700)", swatch: true },
      { name: "--colour-outlines-focused", value: "var(--grey-n600)", swatch: true },
    ],
  },
  {
    id: "measurement-spacing",
    title: "Spacing (semantic)",
    tokens: [
      { name: "--measurement-spacing-none", value: "var(--pixels-0)" },
      { name: "--measurement-spacing-xxs", value: "var(--pixels-1)" },
      { name: "--measurement-spacing-xs", value: "var(--pixels-2)" },
      { name: "--measurement-spacing-sm", value: "var(--pixels-3)" },
      { name: "--measurement-spacing-md", value: "var(--pixels-4)" },
      { name: "--measurement-spacing-lg", value: "var(--pixels-6)" },
      { name: "--measurement-spacing-xl", value: "var(--pixels-8)" },
      { name: "--measurement-spacing-xxl", value: "var(--pixels-11)" },
    ],
  },
  {
    id: "measurement-height",
    title: "Heights",
    tokens: [
      { name: "--measurement-height-xxs", value: "var(--pixels-3)" },
      { name: "--measurement-height-xs", value: "var(--pixels-4)" },
      { name: "--measurement-height-sm", value: "var(--pixels-6)" },
      { name: "--measurement-height-md", value: "var(--pixels-9)" },
      { name: "--measurement-height-lg", value: "var(--pixels-12)" },
      { name: "--measurement-height-xl", value: "var(--pixels-14)" },
      { name: "--measurement-height-xxl", value: "var(--pixels-15)" },
    ],
  },
  {
    id: "measurement-icons",
    title: "Icon sizes",
    tokens: [
      { name: "--measurement-icons-icon-sm", value: "var(--pixels-4)" },
      { name: "--measurement-icons-icon-md", value: "var(--pixels-6)" },
      { name: "--measurement-icons-icon-lg", value: "var(--pixels-8)" },
    ],
  },
  {
    id: "typography",
    title: "Typography",
    tokens: [
      { name: "--typography-font-family-body", value: '"Open Sans", sans-serif' },
      { name: "--typography-font-family-headline", value: '"Open Sans", sans-serif' },
      { name: "--typography-font-weight-regular", value: "400" },
      { name: "--typography-font-weight-semi-bold", value: "600" },
      { name: "--typography-font-weight-bold", value: "700" },
      { name: "--typography-font-size-xxs", value: "10px" },
      { name: "--typography-font-size-xs", value: "14px" },
      { name: "--typography-font-size-sm", value: "var(--pixels-4)" },
      { name: "--typography-font-size-md", value: "18px" },
      { name: "--typography-font-size-lg", value: "var(--pixels-6)" },
      { name: "--typography-font-size-xl", value: "var(--pixels-7)" },
      { name: "--typography-font-size-xxl", value: "var(--pixels-8)" },
      { name: "--typography-line-height-xxs", value: "var(--pixels-4)" },
      { name: "--typography-line-height-xs", value: "var(--pixels-5)" },
      { name: "--typography-line-height-sm", value: "var(--pixels-6)" },
      { name: "--typography-line-height-md", value: "var(--pixels-7)" },
      { name: "--typography-line-height-lg", value: "var(--pixels-8)" },
      { name: "--typography-line-height-xl", value: "var(--pixels-9)" },
      { name: "--typography-line-height-xxl", value: "var(--pixels-10)" },
      { name: "--typography-letter-spacing-sm", value: "-0.1px" },
      { name: "--typography-letter-spacing-md", value: "-0.2px" },
      { name: "--typography-letter-spacing-lg", value: "-0.3px" },
    ],
  },
];

export const PRIMITIVE_TOKEN_COUNT = PRIMITIVE_TOKEN_GROUPS.reduce((n, g) => n + g.tokens.length, 0);
export const SEMANTIC_TOKEN_COUNT = SEMANTIC_TOKEN_GROUPS.reduce((n, g) => n + g.tokens.length, 0);
