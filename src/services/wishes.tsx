import { HttpRequest } from "@/lib/http"

export async function getAllWishes() {
  return await new HttpRequest().get('wishes').then(res => res.data)
}