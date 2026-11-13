import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { InMemoryEmailsRepository } from '../repositories/in-memory/in-memory-emails-repository'
import { SendEmailUseCase } from './send-email'
import { UserNotFoundError } from './errors/user-not-found-error'

let userRepository = new InMemoryUsersRepository
let emailRepository = new InMemoryEmailsRepository
let sendEmailUseCase = new SendEmailUseCase(emailRepository, userRepository)

describe('Send email Use Case', () => {
    beforeEach(() => {
        userRepository = new InMemoryUsersRepository
        emailRepository = new InMemoryEmailsRepository
        sendEmailUseCase = new SendEmailUseCase(emailRepository, userRepository)
    })

    it('should be able to send an email', async () => {

        const remetente = await userRepository.create({
            nome: 'Fulano',
            email: 'fulano@example.com',
            senha: await hash('123456', 6),
        })

        const response = await sendEmailUseCase
        .execute({emailDeDestinatario:'johndoe@example.com', title: 'Reunião amanhã?', content: '', userId:remetente.id})
        
        expect(response).toEqual(expect.any(Object))
        expect(response.email).toEqual(expect.objectContaining({
            title: 'Reunião amanhã?'
        }))
    })

    it('should be able to send an email to yourself', async () => {
        const user = await userRepository.create({
            nome: 'Fulano',
            email: 'fulano@example.com',
            senha: await hash('123456', 6),
        })

        const response = await sendEmailUseCase
        .execute({emailDeDestinatario:'fulano@example.com', title: 'Reunião amanhã?', content: '', userId:user.id})
        
        expect(response).toEqual(expect.any(Object))
        expect(response.email).toEqual(expect.objectContaining({
            title: 'Reunião amanhã?'
        }))
    })


    it('should not be able to send an email to an unexisting email', async () => {
        const user = await userRepository.create({
            nome: 'Fulano',
            email: 'fulano@example.com',
            senha: await hash('123456', 6),
        })

        expect(() => sendEmailUseCase
        .execute({emailDeDestinatario:'johndoe@example.com', title: 'Reunião amanhã?', content: '', userId:user.id})).rejects.toBeInstanceOf(UserNotFoundError)
    })
})