"use client";

import { useLayoutEffect, useState, type RefObject } from "react";

/** Scale a fixed-width prototype frame to the viewport's content box. */
export function useFitWidthScale(
  viewportRef: RefObject<HTMLDivElement | null>,
  designWidth: number,
) {
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const node = viewportRef.current;
    if (!node) return;

    const update = () => {
      const width = node.clientWidth;
      if (width <= 0) return;
      const next = width / designWidth;
      // ResizeObserver also fires when the width has not changed. A matching
      // scale must keep the same state or the whole prototype re-renders.
      setScale((current) => (current === next ? current : next));
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(node);
    return () => observer.disconnect();
  }, [designWidth, viewportRef]);

  return scale;
}
