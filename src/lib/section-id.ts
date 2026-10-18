/** DOM id for a section title. Strips punctuation so the id is a usable fragment. */
export function sectionDomId(title: string): string {
  return title
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
