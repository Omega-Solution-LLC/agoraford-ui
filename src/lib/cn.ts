import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge class names, resolving Tailwind conflicts. Use for every component. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
