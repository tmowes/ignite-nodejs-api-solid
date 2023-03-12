import { z } from 'zod'

export const nearbyGymsQuerySchema = z.object({
  latitude: z.coerce.number().refine((value) => Math.abs(value) <= 90),
  longitude: z.coerce.number().refine((value) => Math.abs(value) <= 180),
})
