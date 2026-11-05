import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryEmailsRepository } from '../repositories/in-memory/in-memory-emails-repository'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { GetSentEmailsUseCase } from './get-sent-emails'

let userRepository = new InMemoryUsersRepository
let emailRepository = new InMemoryEmailsRepository
let getSentEmailsUseCase = new GetSentEmailsUseCase(emailRepository)

describe('Get Sended Emails Use Case', () => {
    beforeEach(() => {
        userRepository = new InMemoryUsersRepository
        emailRepository = new InMemoryEmailsRepository
        getSentEmailsUseCase = new GetSentEmailsUseCase(emailRepository)
    })
    
    it('should be able to fetch Sended emails', async () => {
        const user = await userRepository.create({
            nome: 'John Doe',
            email: 'johndoe@example.com',
            senha: await hash('123456', 6),
        })

        await emailRepository.create({title: 'titulo',content: '',idDeQuemEnviou: user.id,idDeQuemRecebeu: user.id})

        await emailRepository.create({title: 'email enviado 2',content: '',idDeQuemEnviou: user.id,idDeQuemRecebeu: user.id})


        const emails = await getSentEmailsUseCase.execute({userId: user.id})

        expect(emails.emails).toHaveLength(2)
        expect(emails.emails).toContainEqual(expect.objectContaining({
            title: 'titulo'
        }))
        expect(emails.emails).toContainEqual(expect.objectContaining({
            title: 'email enviado 2'
        }))
    })
})