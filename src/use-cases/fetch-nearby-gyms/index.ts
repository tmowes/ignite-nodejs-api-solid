import { GymsRepository } from '@/repositories/gyms-repository'

import { FetchNearbyGymsUseCaseRequest, FetchNearbyGymsUseCaseResponse } from './types'

export class FetchNearbyGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute(request: FetchNearbyGymsUseCaseRequest): Promise<FetchNearbyGymsUseCaseResponse> {
    const { userLatitude, userLongitude } = request
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return { gyms }
  }
}
