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

export function formatDateToKorean(dateStr: string) {
  const date = new Date(dateStr);
  
  return date.toLocaleDateString("ko-KR", {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}


export function formatTimeToISOString(time:Date) {
  const date = new Date(time);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}

export function truncateText(text:string, maxLength = 100) {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}

export const parseGratuityValue = (gratuity: number, missingAnimalStatus: "SEARCHING" | "FOUND" | "SEEN") => {
  if(missingAnimalStatus === "FOUND"){
    return "-"
  }
  if(gratuity === -1){
    return "협의"
  }
  if(gratuity === 0){
    return "없음"
  }
  return gratuity+"만원"
}

