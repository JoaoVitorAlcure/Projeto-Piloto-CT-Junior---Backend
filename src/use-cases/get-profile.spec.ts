import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryEmailsRepository } from '../repositories/in-memory/in-memory-emails-repository'
import { GetReceivedEmailsUseCase } from './get-received-emails'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { GetProfileUseCase } from './get-profile'
import { UserNotFoundError } from './errors/user-not-found-error'

let userRepository = new InMemoryUsersRepository
let getProfileUseCase = new GetProfileUseCase(userRepository)

describe('Get Received Emails Use Case', () => {
    beforeEach(() => {
        userRepository = new InMemoryUsersRepository
        getProfileUseCase = new GetProfileUseCase(userRepository)
    })
    
    it('should be able to get profile', async () => {
        const user = await userRepository.create({
            nome: 'John Doe',
            email: 'johndoe@example.com',
            senha: await hash('123456', 6),
        })

        const response = await getProfileUseCase.execute({userId: user.id})

        expect(response.user).toEqual(expect.objectContaining({
            email: 'johndoe@example.com'
        }))
    })

    it('should not be able to get profile of an unexisting profile', async () => {
        await expect(() => getProfileUseCase.execute({userId: 'unexisting-id'})).rejects.toBeInstanceOf(UserNotFoundError)
    })
})