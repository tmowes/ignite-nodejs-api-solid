import { CheckIn } from '@prisma/client'

export type FetchUserCheckInsHistoryUseCaseRequest = {
  userId: string
  page: number
}

export type FetchUserCheckInsHistoryUseCaseResponse = {
  checkIns: CheckIn[]
}
