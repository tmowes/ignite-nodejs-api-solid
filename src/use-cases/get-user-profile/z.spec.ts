import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found'

import { GetUserProfileUseCase } from '.'

const johnDoe = {
  name: 'John Doe',
  email: 'johndoe@example.com',
  password: '123456',
}

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(usersRepository)
  })

  it('should be able to get user profile', async () => {
    const createdUser = await usersRepository.create({
      ...johnDoe,
      password_hash: await hash(johnDoe.password, 6),
    })

    const { user } = await sut.execute({ userId: createdUser.id })

    expect(user.name).toEqual(johnDoe.name)
  })

  it('should not be able to get user profile with wrong id', async () => {
    await expect(() => sut.execute({ userId: 'non-existing-id' })).rejects.toBeInstanceOf(
      ResourceNotFoundError,
    )
  })
})
