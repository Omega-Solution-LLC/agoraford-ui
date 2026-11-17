import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * The library's custom text sizes (title, body, ...) would otherwise be read as
 * colors and dropped next to `text-foreground`. Teach the merger about them.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["title", "section", "subtitle", "body", "control", "small", "caption"] }],
    },
  },
});

/** Merge class names, resolving Tailwind conflicts. Use for every component. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
