import { Gym } from '@prisma/client'

export type SearchGymsUseCaseRequest = {
  query: string
  page: number
}

export type SearchGymsUseCaseResponse = {
  gyms: Gym[]
}
