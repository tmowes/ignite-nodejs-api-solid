import { CheckInsRepository } from '@/repositories/check-ins-repository'

import {
  FetchUserCheckInsHistoryUseCaseRequest,
  FetchUserCheckInsHistoryUseCaseResponse,
} from './types'

export class FetchUserCheckInsHistoryUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute(
    request: FetchUserCheckInsHistoryUseCaseRequest,
  ): Promise<FetchUserCheckInsHistoryUseCaseResponse> {
    const { userId, page } = request

    const checkIns = await this.checkInsRepository.findManyByUserId(userId, page)

    return { checkIns }
  }
}
