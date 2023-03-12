import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found'
import dayjs from 'dayjs'

import { LateCheckInValidationError } from '../errors/late-check-in-validation'
import { ValidateCheckInUseCaseRequest, ValidateCheckInUseCaseResponse } from './types'

export class ValidateCheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute(request: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
    const { checkInId } = request
    const checkIn = await this.checkInsRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFoundError()
    }

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(checkIn.created_at, 'minutes')

    if (distanceInMinutesFromCheckInCreation > 20) {
      throw new LateCheckInValidationError()
    }

    checkIn.validated_at = new Date()

    await this.checkInsRepository.save(checkIn)

    return { checkIn }
  }
}
