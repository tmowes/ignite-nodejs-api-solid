import { User } from '@prisma/client'

export type RegisterUseCaseRequest = {
  name: string
  email: string
  password: string
}

export type RegisterUseCaseResponse = {
  user: User
}
