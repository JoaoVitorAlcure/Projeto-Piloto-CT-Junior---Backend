import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryEmailsRepository } from '../repositories/in-memory/in-memory-emails-repository'
import { GetReceivedEmailsUseCase } from './get-received-emails'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { randomUUID } from 'node:crypto'

let userRepository = new InMemoryUsersRepository
let emailRepository = new InMemoryEmailsRepository
let getReceivedEmailsUseCase = new GetReceivedEmailsUseCase(emailRepository,userRepository)

describe('Get Received Emails Use Case', () => {
    beforeEach(() => {
        userRepository = new InMemoryUsersRepository
        emailRepository = new InMemoryEmailsRepository
        getReceivedEmailsUseCase = new GetReceivedEmailsUseCase(emailRepository,userRepository)
    })
    
    it('should be able to fetch received emails', async () => {
        const user = await userRepository.create({
            nome: 'John Doe',
            email: 'johndoe@example.com',
            senha: await hash('123456', 6),
        })

        for(let i=1;i<=3;i++){
            await emailRepository.create({title: `Email ${i}`,content: `Conteudo do email ${i}`,idDeQuemEnviou: randomUUID(),idDeQuemRecebeu: user.id})
        }

        const emails = await getReceivedEmailsUseCase.execute({userId: user.id})

        expect(emails.emails).toHaveLength(3)
        expect(emails.emails).toContainEqual(expect.objectContaining({
            titulo: 'Email 2'
        }))
    })


    it('should be able to fetch received emails sorted by most recent', async () => {
        vi.useFakeTimers()
        vi.setSystemTime(new Date(2026, 0, 1, 12, 0o0))
        const user = await userRepository.create({
            nome: 'John Doe',
            email: 'johndoe@example.com',
            senha: await hash('123456', 6),
        })

        const cincoMinutosEmMs= 5 * 60 * 1000
        for(let i=1;i<=3;i++){
            await emailRepository.create({title: `Email ${i}`,content: `Conteudo do email ${i}`,idDeQuemEnviou: randomUUID(),idDeQuemRecebeu: user.id})
            vi.advanceTimersByTime(cincoMinutosEmMs)
        }
        vi.useRealTimers()

        const emails = await getReceivedEmailsUseCase.execute({userId: user.id})

        expect(emails.emails).toHaveLength(3)
        expect(emails.emails[0]).toEqual(expect.objectContaining({
            titulo: 'Email 3'
        }))
    })
})