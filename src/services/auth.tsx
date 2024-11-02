import { HttpRequest } from "@/lib/http";
import { UserProps } from "@/types/auth";
import { AuthTokenResponsePassword } from "@supabase/supabase-js";

export async function login(user: UserProps): Promise<AuthTokenResponsePassword> {
  return await new HttpRequest().post('auth/login', user)
}