import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { RegisterUseCase } from './register'
import { UserAlreadyExists } from './errors/user-already-exists-error'
import { PasswordLessThanSixCharactersError } from './errors/password-less-than-six-characters-error'

let usersRepository = new InMemoryUsersRepository
let registerUseCase = new RegisterUseCase(usersRepository)

describe('Register Use Case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository
        registerUseCase = new RegisterUseCase(usersRepository)
    })
    
    it('should be able to register', async () => {
        const { user } = await registerUseCase.execute({
            nome: 'John Doe',
            email: 'johndoe@example.com',
            senha: '123456',
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it('should not be able to register with same email', async () => {
        await usersRepository.create({
            nome: 'John Doe',
            email: 'johndoe@example.com',
            senha: '123456',
        })

        await expect(() => registerUseCase.execute({
            nome: 'John Doe',
            email: 'johndoe@example.com',
            senha: '123456',
        })).rejects.toBeInstanceOf(UserAlreadyExists)
    })

    it('should not be able to register with password with less than 6 characters', async () => {
        await expect(() => registerUseCase.execute({
            nome: 'John Doe',
            email: 'johndoe@example.com',
            senha: '12345',
        })).rejects.toBeInstanceOf(PasswordLessThanSixCharactersError)
    })
})