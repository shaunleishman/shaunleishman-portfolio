/**
 * Internal notes for applying the Arbnco design system to admin prototypes.
 * Not linked from the showcase UI — reference when wiring half-hourly or other demos.
 *
 * 1. Tokens: `ArbncoDesignSystemRoot` imports `tokens.css` and sets the Open Sans scope.
 *    Half-hourly does not use that root. It repeats the `arbnco-ds` class so it can also
 *    load Raleway for `.hh-display`, and it imports `tokens.css` itself.
 * 2. `dropdown.css` and `input-field.css` are not imported by the root. Dropdown, Select,
 *    and Input need those stylesheets on the prototype layout or the fields lose their
 *    focus, width, and menu rules.
 * 3. Import components from `@/design-systems/arbnco`. Import the preview catalog from
 *    `@/design-systems/arbnco/catalog/component-catalog`, not from the barrel.
 * 4. Enhance does not use this design system. Half-hourly does.
 */
export const ARBNCO_PROTOTYPE_INTEGRATION_NOTES = {
  importPath: "@/design-systems/arbnco",
  rootComponent: "ArbncoDesignSystemRoot",
  stylesheets: ["tokens.css", "dropdown.css", "input-field.css"] as const,
  catalogImportPath: "@/design-systems/arbnco/catalog/component-catalog",
  prototypeSlugs: ["half-hourly"] as const,
} as const;
