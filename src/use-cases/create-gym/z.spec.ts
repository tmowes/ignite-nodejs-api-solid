import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { expect, describe, it, beforeEach } from 'vitest'

import { CreateGymUseCase } from '.'

const gymExample = {
  id: 'gym-01',
  title: 'Typescript Gym',
  description: '',
  phone: '',
  latitude: -26.8906869,
  longitude: -49.080458,
}

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  it('should to create gym', async () => {
    const { gym } = await sut.execute(gymExample)

    expect(gym.id).toEqual(expect.any(String))
  })
})
