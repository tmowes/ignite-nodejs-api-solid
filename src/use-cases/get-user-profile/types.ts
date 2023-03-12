import { User } from '@prisma/client'

export type GetUserProfileUseCaseRequest = {
  userId: string
}

export type GetUserProfileUseCaseResponse = {
  user: User
}
