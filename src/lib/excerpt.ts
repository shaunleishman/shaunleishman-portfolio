/**
 * Preview copy for cards and meta descriptions.
 * Leaves the string unchanged when it already fits. Otherwise breaks on a
 * word boundary, so a card never ends mid-word or adds an ellipsis to a
 * finished sentence.
 */
export function excerpt(text: string, maxLength: number): string {
  const value = text.trim().replace(/\s+/g, " ");
  if (maxLength <= 0) return "";
  if (value.length <= maxLength) return value;

  const head = value.slice(0, maxLength);
  const lastSpace = head.lastIndexOf(" ");
  if (lastSpace <= 0) return `${head.trimEnd()}…`;

  const nextSpace = value.indexOf(" ", lastSpace + 1);
  const wordEnd = nextSpace === -1 ? value.length : nextSpace;
  // The limit fell inside the last word of a sentence that only just overflows.
  if (wordEnd === value.length && wordEnd - maxLength <= 8) return value;

  const cut = value
    .slice(0, lastSpace)
    .replace(/[\s.,;:]+$/, "")
    .replace(/\s+(?:and|or|but)$/i, "")
    .replace(/[\s.,;:]+$/, "");
  return `${cut}…`;
}
