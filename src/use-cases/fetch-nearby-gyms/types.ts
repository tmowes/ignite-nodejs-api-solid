import { Gym } from '@prisma/client'

export type FetchNearbyGymsUseCaseRequest = {
  userLatitude: number
  userLongitude: number
}

export type FetchNearbyGymsUseCaseResponse = {
  gyms: Gym[]
}
