import { compare } from 'bcryptjs'
import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

import { UserAlreadyExistsError } from '../errors/user-already-exists'

import { RegisterUseCase } from '.'

const johnDoe = {
  name: 'John Doe',
  email: 'johndoe@example.com',
  password: '123456',
}

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should do new user register', async () => {
    const { user } = await sut.execute(johnDoe)

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute(johnDoe)
    const isPasswordCorrectlyHashed = await compare(johnDoe.password, user.password_hash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    await sut.execute(johnDoe)

    await expect(() => sut.execute({ ...johnDoe, email: johnDoe.email })).rejects.toBeInstanceOf(
      UserAlreadyExistsError,
    )
  })
})
