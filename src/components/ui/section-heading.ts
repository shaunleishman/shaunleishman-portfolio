/**
 * DOM id for a section heading.
 * The section's `aria-labelledby` must use this value. The heading element is
 * the one that carries it. Pointing the attribute at the section id, or at the
 * unsuffixed slug, names the wrong node.
 */
export function sectionHeadingId(id: string): string {
  return `${id}-heading`;
}
