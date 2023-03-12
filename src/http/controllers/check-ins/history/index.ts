import { FastifyReply, FastifyRequest } from 'fastify'
import { makeFetchUserCheckInsHistoryUseCase } from '@/use-cases/factories/make-fetch-user-check-ins-history-use-case'

import { checkInHistoryQuerySchema } from './schema'

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const { page } = checkInHistoryQuerySchema.parse(request.query)

  const fetchUserCheckInsHistoryUseCase = makeFetchUserCheckInsHistoryUseCase()

  const { checkIns } = await fetchUserCheckInsHistoryUseCase.execute({
    page,
    userId: request.user.sub,
  })

  return reply.status(200).send({ checkIns })
}
