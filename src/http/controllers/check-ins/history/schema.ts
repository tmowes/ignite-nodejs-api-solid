import { z } from 'zod'

export const checkInHistoryQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
})
