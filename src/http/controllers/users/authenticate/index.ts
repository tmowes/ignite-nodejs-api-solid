import { FastifyReply, FastifyRequest } from 'fastify'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials'
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case'

import { authenticateBodySchema } from './schema'

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const authenticateUseCase = makeAuthenticateUseCase()
    const { user } = await authenticateUseCase.execute({ email, password })

    const signJwt = { sub: user.id }
    const token = await reply.jwtSign({ role: user.role }, { sign: signJwt })

    const refreshSign = { sub: user.id, expiresIn: '7d' }
    const refreshToken = await reply.jwtSign({ role: user.role }, { sign: refreshSign })

    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({ token })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
