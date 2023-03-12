import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

const gymNotFoundExample = {
  title: 'Far Gym',
  description: '',
  phone: '',
  latitude: -26.7539634,
  longitude: -49.0049467,
}

const gymFoundExample = {
  ...gymNotFoundExample,
  title: 'Near Gym',
  latitude: -26.8906869,
  longitude: -49.080458,
}

describe('Nearby Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able list nearby gyms', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send(gymNotFoundExample)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send(gymFoundExample)

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: gymFoundExample.latitude,
        longitude: gymFoundExample.longitude,
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([expect.objectContaining({ title: gymFoundExample.title })])
  })
})
