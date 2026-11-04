import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryEmailsRepository } from '../repositories/in-memory/in-memory-emails-repository'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { GetSendedEmailsUseCase } from './get-sended-emails'

let userRepository = new InMemoryUsersRepository
let emailRepository = new InMemoryEmailsRepository
let getSendedEmailsUseCase = new GetSendedEmailsUseCase(emailRepository)

describe('Get Sended Emails Use Case', () => {
    beforeEach(() => {
        userRepository = new InMemoryUsersRepository
        emailRepository = new InMemoryEmailsRepository
        getSendedEmailsUseCase = new GetSendedEmailsUseCase(emailRepository)
    })
    
    it('should be able to fetch Sended emails', async () => {
        const user = await userRepository.create({
            nome: 'John Doe',
            email: 'johndoe@example.com',
            senha: await hash('123456', 6),
        })

        await emailRepository.create({title: 'titulo',content: '',idDeQuemEnviou: user.id,idDeQuemRecebeu: user.id})

        await emailRepository.create({title: 'email enviado 2',content: '',idDeQuemEnviou: user.id,idDeQuemRecebeu: user.id})


        const emails = await getSendedEmailsUseCase.execute({userId: user.id})

        expect(emails.emails).toHaveLength(2)
        expect(emails.emails).toContainEqual(expect.objectContaining({
            title: 'titulo'
        }))
        expect(emails.emails).toContainEqual(expect.objectContaining({
            title: 'email enviado 2'
        }))
    })
})