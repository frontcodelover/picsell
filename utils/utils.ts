// src/lib/utils.ts (ou utils.js si tu utilises JS)

import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ClassValue } from '@/types/utils'; // Assure-toi que ce type existe

// Fonction pour combiner les classes conditionnelles et fusionner les classes Tailwind
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
