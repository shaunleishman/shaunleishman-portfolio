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
export { COMPONENT_CATALOG, COMPONENT_CATEGORIES, COMPONENT_COUNT } from "./catalog/component-catalog";
export type { ComponentCatalogEntry } from "./catalog/component-catalog";
export { ARBNCO_PROTOTYPE_INTEGRATION_NOTES } from "./prototype-integration.notes";

/** Import path for use in prototypes and case studies. */
export const ARBNCO_DS_IMPORT_PATH = "@/design-systems/arbnco";
