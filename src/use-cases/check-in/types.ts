import { CheckIn } from '@prisma/client'

export type CheckInUseCaseRequest = {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}

export type CheckInUseCaseResponse = {
  checkIn: CheckIn
}
