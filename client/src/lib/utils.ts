import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
export function getNamedDays(input?: number) {
  if (!input) return;
  return days[input - 1];
}
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Des",
];

export function getNamedMonth(input?: number) {
  if (!input) return;
  return months[input - 1];
}

export function formatDate(date?: Date) {
  if (!date) return undefined;
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
}
