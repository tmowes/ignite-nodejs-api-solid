import { FastifyReply, FastifyRequest } from 'fastify'
import { makeCheckInUseCase } from '@/use-cases/factories/make-check-in-use.case'

import { createCheckInParamsSchema, createCheckInBodySchema } from './schema'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const { gymId } = createCheckInParamsSchema.parse(request.params)
  const { latitude, longitude } = createCheckInBodySchema.parse(request.body)

  const checkInUseCase = makeCheckInUseCase()

  await checkInUseCase.execute({
    gymId,
    userId: request.user.sub,
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(201).send()
}
