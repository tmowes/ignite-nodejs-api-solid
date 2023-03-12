/* eslint-disable import/no-extraneous-dependencies */
import { prisma } from '@/libs/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

const johnDoe = {
  name: 'John Doe',
  email: 'johndoe@example.com',
  password: '123456',
}

export async function createAndAuthenticateUser(app: FastifyInstance, isAdmin = false) {
  if (isAdmin) {
    await prisma.user.create({
      data: {
        name: johnDoe.name,
        email: johnDoe.email,
        password_hash: await hash(johnDoe.password, 6),
        role: isAdmin ? 'ADMIN' : 'MEMBER',
      },
    })
  } else {
    await request(app.server).post('/users').send(johnDoe)
  }

  const authResponse = await request(app.server).post('/sessions').send({
    email: johnDoe.email,
    password: johnDoe.password,
  })

  const { token } = authResponse.body

  return { token }
}
