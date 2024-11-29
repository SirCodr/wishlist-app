import { HttpRequest } from "@/lib/http";
import { WishList, WishlistCreateDto } from "@/types/wishlists";

export async function getByUser(id: string): Promise<WishList[]> {
  return await new HttpRequest().get(`wishlists/user/${id}`).then(res => res.data)
}

export async function create(wishlists: WishlistCreateDto[]) {
  return await new HttpRequest().post('wishlists', wishlists)
}

export async function share(id: string, emails: string[]) {
  return await new HttpRequest().post(`wishlists/share/${id}`, emails)
}