import { CheckInsRepository } from '@/repositories/check-ins-repository'

import { GetUserMetricsUseCaseRequest, GetUserMetricsUseCaseResponse } from './types'

export class GetUserMetricsUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute(request: GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseResponse> {
    const { userId } = request
    const checkInsCount = await this.checkInsRepository.countByUserId(userId)

    return { checkInsCount }
  }
}
