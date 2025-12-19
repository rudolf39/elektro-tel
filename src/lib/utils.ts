import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class names into a single string, handling conditional classes
 * and merging conflicting Tailwind CSS classes intelligently.
 * 
 * @param inputs - A list of class values (strings, objects, arrays, etc.)
 * @returns A merged string of class names
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
