import { HttpRequest } from "@/lib/http";
import { WishList } from "@/types/wishlists";

export async function getByUser(id: string): Promise<WishList[]> {
  return await new HttpRequest().get(`wishlists/user/${id}`).then(res => res.data)
}