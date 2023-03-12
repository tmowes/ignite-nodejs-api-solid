import { FastifyReply, FastifyRequest } from 'fastify'
import { makeSearchGymsUseCase } from '@/use-cases/factories/make-search-gyms-use-case'

import { searchGymsQuerySchema } from './schema'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const { q, page } = searchGymsQuerySchema.parse(request.query)

  const searchGymsUseCase = makeSearchGymsUseCase()

  const { gyms } = await searchGymsUseCase.execute({ query: q, page })

  return reply.status(200).send({ gyms })
}
