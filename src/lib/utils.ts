import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getInitialsFromEmail(email: string) {
  if (!email || typeof email !== 'string' || !email.includes('@')) {
    throw new Error('Invalid email');
  }
  
  const username = email.split('@')[0];
  const initials = username.slice(0, 2).toUpperCase();

  return initials;
}