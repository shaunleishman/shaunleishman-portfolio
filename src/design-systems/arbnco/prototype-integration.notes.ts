/**
 * Internal notes for applying the Arbnco design system to admin prototypes.
 * Not linked from the showcase UI — reference when wiring half-hourly or other demos.
 *
 * 1. Wrap prototype layout: import { ArbncoDesignSystemRoot } from "@/design-systems/arbnco"
 * 2. Import path for tokens/components: @/design-systems/arbnco
 * 3. Prototype slugs: half-hourly, enhance
 */
export const ARBNCO_PROTOTYPE_INTEGRATION_NOTES = {
  importPath: "@/design-systems/arbnco",
  rootComponent: "ArbncoDesignSystemRoot",
  prototypeSlugs: ["half-hourly", "enhance"] as const,
} as const;
