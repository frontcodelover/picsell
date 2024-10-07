import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ClassValue } from '@/types/utils';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
