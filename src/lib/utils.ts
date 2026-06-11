import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/** Custom type scale classes (globals.css) must stay in font-size group so twMerge does not drop them for text-[color]. */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        "text-display",
        "text-h1",
        "text-h2",
        "text-h3",
        "text-h4",
        "text-body-lg",
        "text-body",
        "text-body-sm",
        "text-label",
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
