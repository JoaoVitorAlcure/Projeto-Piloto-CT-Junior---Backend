import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryEmailsRepository } from '../repositories/in-memory/in-memory-emails-repository'
import { GetReceivedEmailsUseCase } from './get-received-emails'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'

let userRepository = new InMemoryUsersRepository
let emailRepository = new InMemoryEmailsRepository
let getReceivedEmailsUseCase = new GetReceivedEmailsUseCase(emailRepository)

describe('Get Received Emails Use Case', () => {
    beforeEach(() => {
        userRepository = new InMemoryUsersRepository
        emailRepository = new InMemoryEmailsRepository
        getReceivedEmailsUseCase = new GetReceivedEmailsUseCase(emailRepository)
    })
    
    it('should be able to fetch received emails', async () => {
        const user = await userRepository.create({
            nome: 'John Doe',
            email: 'johndoe@example.com',
            senha: await hash('123456', 6),
        })

        const emails = await getReceivedEmailsUseCase.execute({userId: user.id})

        expect(emails.emails).toHaveLength(0)
    })
})