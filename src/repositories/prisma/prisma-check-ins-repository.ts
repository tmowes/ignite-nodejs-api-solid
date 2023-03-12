import dayjs from 'dayjs'
import { CheckIn, Prisma } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { prisma } from '@/libs/prisma'

export class PrismaCheckInsRepository implements CheckInsRepository {
  async findById(id: string) {
    return prisma.checkIn.findUnique({ where: { id } })
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    return prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: dayjs(date).startOf('date').toDate(),
          lte: dayjs(date).endOf('date').toDate(),
        },
      },
    })
  }

  async findManyByUserId(userId: string, page: number) {
    return prisma.checkIn.findMany({
      where: { user_id: userId },
      skip: (page - 1) * 20,
      take: 20,
    })
  }

  async countByUserId(userId: string) {
    return prisma.checkIn.count({ where: { user_id: userId } })
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    return prisma.checkIn.create({ data })
  }

  async save(data: CheckIn) {
    return prisma.checkIn.update({
      where: { id: data.id },
      data,
    })
  }
}
