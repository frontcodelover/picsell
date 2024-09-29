import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

type ClassValue = string | number | null | undefined | ClassValue[];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
