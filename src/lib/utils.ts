import { twMerge } from 'tailwind-merge';
import { type ClassValue, clsx } from 'clsx';
import { FieldError } from 'react-hook-form';
import { format } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function inputStyle(fieldError: FieldError | undefined) {
  if (fieldError) {
    return 'dark:border-red-500 border-red-500 outline-0';
  }
}

export function capitalizeFirstLetter(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatDate(date: Date) {
  return format(date, 'do MMMM, yyyy');
}

export function formatTime(date: Date) {
  return format(date, 'HH:mm');
}

export function formatTimePeriod(date: Date) {
  return format(date, 'BBBB');
}
