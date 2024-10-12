import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(input: string): string {
  const year = input.substring(0, 4);
  const month = input.substring(4, 6);
  const day = input.substring(6, 8);

  return `${year}년 ${parseInt(month)}월 ${parseInt(day)}일`;
}
