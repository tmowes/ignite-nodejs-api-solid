import { Gym, Prisma } from '@prisma/client'

import { Coordinate } from '../utils/get-distance-between-coordinates'

export type FindManyNearbyParams = Coordinate

export interface GymsRepository {
  findById(id: string): Promise<Gym | null>
  findManyNearby(params: FindManyNearbyParams): Promise<Gym[]>
  searchMany(query: string, page: number): Promise<Gym[]>
  create(data: Prisma.GymCreateInput): Promise<Gym>
}
