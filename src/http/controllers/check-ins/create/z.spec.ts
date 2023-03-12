import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/libs/prisma'

const gymToCheckInExample = {
  title: 'Typescript Gym',
  description: '',
  phone: '',
  latitude: -26.8906869,
  longitude: -49.080458,
}

describe('Create Check-in (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a check-in', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const gym = await prisma.gym.create({ data: { ...gymToCheckInExample } })

    const response = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: gymToCheckInExample.latitude,
        longitude: gymToCheckInExample.longitude,
      })

    expect(response.statusCode).toEqual(201)
  })
})
