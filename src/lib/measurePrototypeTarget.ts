import type { PrototypeHighlightRegion } from "@/components/projects/PrototypeDesignCallout";

export function measurePrototypeTarget(
  root: HTMLElement,
  selector: string,
  designWidth: number,
): PrototypeHighlightRegion | null {
  const nodes = root.querySelectorAll(selector);
  if (!nodes.length) return null;

  const rootBox = root.getBoundingClientRect();
  const scale = rootBox.width / designWidth;
  if (scale <= 0) return null;

  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  nodes.forEach((node) => {
    const box = node.getBoundingClientRect();
    const x = (box.left - rootBox.left) / scale;
    const y = (box.top - rootBox.top) / scale;
    const right = x + box.width / scale;
    const bottom = y + box.height / scale;
    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
    maxX = Math.max(maxX, right);
    maxY = Math.max(maxY, bottom);
  });

  const pad = 4;

  return {
    x: minX - pad,
    y: minY - pad,
    width: maxX - minX + pad * 2,
    height: maxY - minY + pad * 2,
  };
}

export function highlightCenter(highlight: PrototypeHighlightRegion) {
  return {
    x: highlight.x + highlight.width / 2,
    y: highlight.y + highlight.height / 2,
  };
}
