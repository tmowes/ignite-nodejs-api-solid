import { GymsRepository } from '@/repositories/gyms-repository'

import { SearchGymsUseCaseRequest, SearchGymsUseCaseResponse } from './types'

export class SearchGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute(request: SearchGymsUseCaseRequest): Promise<SearchGymsUseCaseResponse> {
    const { query, page } = request
    const gyms = await this.gymsRepository.searchMany(query, page)

    return { gyms }
  }
}
