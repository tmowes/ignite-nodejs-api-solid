import { CheckIn } from '@prisma/client'

export type ValidateCheckInUseCaseRequest = {
  checkInId: string
}

export type ValidateCheckInUseCaseResponse = {
  checkIn: CheckIn
}
