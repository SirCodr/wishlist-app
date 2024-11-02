import { HttpRequest } from "@/lib/http"

export async function getAll() {
  return await new HttpRequest().get('wishes').then(res => res.data)
}

export async function getByWishlist(id: string) {
  return await new HttpRequest().get(`wishes/wishlist/${id}`).then(res => res.data)
}