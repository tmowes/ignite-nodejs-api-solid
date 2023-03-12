import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { CheckInUseCase } from '@/use-cases/check-in'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

import { MaxDistanceError } from '../errors/max-distance'
import { MaxNumberOfCheckInsError } from '../errors/max-number-of-check-ins'

const checkInExample = {
  gymId: 'gym-01',
  userId: 'user-01',
  userLatitude: -26.8906869,
  userLongitude: -49.080458,
}

const gymCloseExample = {
  id: 'gym-01',
  title: 'Typescript Gym',
  description: '',
  phone: '',
  latitude: -26.8906869,
  longitude: -49.080458,
}

const gymFarExample = {
  id: 'gym-02',
  title: 'Javascript Gym',
  description: '',
  phone: '',
  latitude: -26.8539634,
  longitude: -49.0949467,
}

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    await gymsRepository.create(gymCloseExample)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute(checkInExample)

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    const dayOne = new Date(2022, 0, 20, 8, 0, 0)
    vi.setSystemTime(dayOne)

    await sut.execute(checkInExample)

    await expect(() => sut.execute(checkInExample)).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('should be able to check in twice but in different days', async () => {
    const dayOne = new Date(2022, 0, 20, 8, 0, 0)
    const dayTwo = new Date(2022, 0, 21, 8, 0, 0)

    vi.setSystemTime(dayOne)

    await sut.execute(checkInExample)

    vi.setSystemTime(dayTwo)

    const { checkIn } = await sut.execute(checkInExample)

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distant gym', async () => {
    await gymsRepository.create(gymFarExample)

    await expect(() =>
      sut.execute({ ...checkInExample, gymId: gymFarExample.id }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
