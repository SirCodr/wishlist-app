export type WishList = {
  id: string
  name: string
  items: number
  description: string
  is_shared: boolean
}

export type SharedWishList = {
  id: string
  name: string
  items: number
  owner: string
  description: string
}

export type WishlistCreateDto = {
  name: string
  description: string
  user_id: string
}