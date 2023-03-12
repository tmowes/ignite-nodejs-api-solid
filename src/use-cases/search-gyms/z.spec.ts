import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { expect, describe, it, beforeEach } from 'vitest'

import { SearchGymsUseCase } from '.'

const gymNotFoundExample = {
  title: 'Typescript Gym',
  description: '',
  phone: '',
  latitude: -26.8906869,
  longitude: -49.080458,
}

const gymFoundExample = {
  ...gymNotFoundExample,
  title: 'JavaScript Gym',
}

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.create(gymNotFoundExample)

    await gymsRepository.create(gymFoundExample)

    const { gyms } = await sut.execute({ query: 'JavaScript', page: 1 })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: gymFoundExample.title })])
  })

  it('should be able to fetch paginated gym search', async () => {
    for (let i = 1; i <= 22; i++) {
      // eslint-disable-next-line no-await-in-loop
      await gymsRepository.create({
        ...gymFoundExample,
        title: `${gymFoundExample.title} ${i}`,
      })
    }

    const { gyms } = await sut.execute({ query: 'JavaScript', page: 2 })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: `${gymFoundExample.title} 21` }),
      expect.objectContaining({ title: `${gymFoundExample.title} 22` }),
    ])
  })
})
