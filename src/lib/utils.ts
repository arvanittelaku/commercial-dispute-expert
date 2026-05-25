import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPhoneTel(phone: string): string {
  if (phone.startsWith("+")) return phone.replace(/\s/g, "");
  return phone.replace(/[^\d+]/g, "");
}
