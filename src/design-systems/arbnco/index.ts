export { ArbncoDesignSystemRoot } from "./ArbncoDesignSystemRoot";
export { ARBNCO_DS_ID, ARBNCO_DS_VERSION } from "./version";
export {
  PRIMITIVE_TOKEN_GROUPS,
  SEMANTIC_TOKEN_GROUPS,
  PRIMITIVE_TOKEN_COUNT,
  SEMANTIC_TOKEN_COUNT,
} from "./tokens-data";
export type { TokenEntry, TokenGroup } from "./tokens-data";
export * from "./components";
export { ARBNCO_PROTOTYPE_INTEGRATION_NOTES } from "./prototype-integration.notes";

/**
 * Component previews stay in `./catalog/component-catalog`.
 * Re-exporting that module here pulled every preview into prototype bundles.
 */

/** Import path for use in prototypes and case studies. */
export const ARBNCO_DS_IMPORT_PATH = "@/design-systems/arbnco";
