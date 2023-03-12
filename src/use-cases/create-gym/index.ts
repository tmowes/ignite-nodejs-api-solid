import { GymsRepository } from '@/repositories/gyms-repository'

import { CreateGymUseCaseRequest, CreateGymUseCaseResponse } from './types'

export class CreateGymUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute(request: CreateGymUseCaseRequest): Promise<CreateGymUseCaseResponse> {
    const { title, description, phone, latitude, longitude } = request
    const gym = await this.gymsRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude,
    })

    return { gym }
  }
}
