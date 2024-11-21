import { z } from 'zod'

export const wishlistCreateSchema = z.object({
  name: z.string().max(200).min(1, { message: 'Name is required' }),
  description: z.string().max(200).optional(),
  user_id: z.string()
})