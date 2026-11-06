import { expect, describe, it, beforeEach, vi } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryEmailsRepository } from '../repositories/in-memory/in-memory-emails-repository'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { GetSentEmailsUseCase } from './get-sent-emails'
import { randomUUID } from 'node:crypto'
import { afterEach } from 'node:test'

let userRepository = new InMemoryUsersRepository()
let emailRepository = new InMemoryEmailsRepository()
let getSentEmailsUseCase = new GetSentEmailsUseCase(emailRepository, userRepository)

describe('Get Sended Emails Use Case', () => {
    beforeEach(() => {
        userRepository = new InMemoryUsersRepository()
        emailRepository = new InMemoryEmailsRepository()
        getSentEmailsUseCase = new GetSentEmailsUseCase(emailRepository, userRepository)
        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })
    
    it('should be able to fetch Sended emails', async () => {
        vi.setSystemTime(new Date(2026, 0, 1, 12, 0o0))
        const user = await userRepository.create({
            nome: 'John Doe',
            email: 'johndoe@example.com',
            senha: await hash('123456', 6),
        })
        const cincoMinutosEmMs= 5 * 60 * 1000
        for(let i=1;i<=3;i++){
            await emailRepository.create({title: `Email ${i}`,content: `Conteudo do email ${i}`,idDeQuemEnviou: user.id,idDeQuemRecebeu: randomUUID()})
            vi.advanceTimersByTime(cincoMinutosEmMs)
        }
        const emails = await getSentEmailsUseCase.execute({userId: user.id})
        console.log(emails)
        expect(emails.emails).toHaveLength(3)
        expect(emails.emails[0]).toEqual(expect.objectContaining({
            titulo: 'Email 3'
        }))
    })
})