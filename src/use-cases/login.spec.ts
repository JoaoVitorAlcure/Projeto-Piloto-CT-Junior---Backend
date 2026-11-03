import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { LoginUseCase } from './login'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let usersRepository = new InMemoryUsersRepository
let loginUseCase = new LoginUseCase(usersRepository)

describe('Login Use Case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository
        loginUseCase = new LoginUseCase(usersRepository)
    })
    
    it('should be able to login', async () => {
        await usersRepository.create({
            nome: 'John Doe',
            email: 'johndoe@example.com',
            senha: await hash('123456', 6),
        })

        const { user } = await loginUseCase.execute({
            email: 'johndoe@example.com',
            senha: '123456'
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it('should not be able to login with wrong email', async () => {
        await usersRepository.create({
            nome: 'John Doe',
            email: 'johndoe@example.com',
            senha: await hash('123456', 6),
        })

        await expect(() =>
            loginUseCase.execute({
            email: 'invalid-email@example.com',
            senha: '123456'})
        ).rejects.toBeInstanceOf(InvalidCredentialsError)
    })


    it('should not be able to login with wrong password', async () => {
        await usersRepository.create({
            nome: 'John Doe',
            email: 'johndoe@example.com',
            senha: await hash('123456', 6),
        })

        await expect(() =>
            loginUseCase.execute({
            email: 'johndoe@example.com',
            senha: '1234567'})
        ).rejects.toBeInstanceOf(InvalidCredentialsError)
    })
})