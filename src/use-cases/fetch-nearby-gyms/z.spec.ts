import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { expect, describe, it, beforeEach } from 'vitest'

import { FetchNearbyGymsUseCase } from '.'

const gymNearExample = {
  id: 'gym-01',
  title: 'Near Gym',
  description: '',
  phone: '',
  latitude: -26.8906869,
  longitude: -49.080458,
}

const gymFarExample = {
  id: 'gym-02',
  title: 'Far Gym',
  description: '',
  phone: '',
  latitude: -26.7539634,
  longitude: -49.0049467,
}

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create(gymNearExample)

    await gymsRepository.create(gymFarExample)

    const { gyms } = await sut.execute({
      userLatitude: gymNearExample.latitude,
      userLongitude: gymNearExample.longitude,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: gymNearExample.title })])
  })
})
