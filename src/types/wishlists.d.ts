export type WishList = {
  id: string
  name: string
  items: number
  description: string
}

export type WishlistCreateDto = {
  name: string
  description: string
  user_id: string
}