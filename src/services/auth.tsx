import { HttpRequest } from "@/lib/http";
import { UserProps } from "@/types/auth";
import { AuthError, AuthTokenResponsePassword } from "@supabase/supabase-js";

export async function login(user: UserProps): Promise<AuthTokenResponsePassword> {
  return await new HttpRequest().post('auth/login', user)
}

export async function logout(): Promise<{
  error: AuthError | null
}> {
  return await new HttpRequest().post('auth/logout')
}