import { User } from '@prisma/client'

export type AuthenticateUseCaseRequest = {
  email: string
  password: string
}

export type AuthenticateUseCaseResponse = {
  user: User
}
