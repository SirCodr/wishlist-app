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

type AuthUserToken = {
  access_token: string
  refresh_token: string
}

export function getAuthTokenFromUser(): AuthUserToken {
    try {
      const response = localStorage.getItem('authStore') ?? '';
      const { state } = JSON.parse(response);
      const { access_token, refresh_token } = state.session;

      if (!access_token || !refresh_token) throw Error('No session data found')

      return { access_token, refresh_token };
    } catch (error) {
      console.error('Error trying to get session data', error);
      throw new Error('Failed to retrieve auth tokens');
    }
}
