import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { InMemoryEmailsRepository } from '../repositories/in-memory/in-memory-emails-repository'
import { DeleteEmailUseCase } from './delete-email'
import { EmailNotFoundError } from './errors/email-not-found-error'
import { randomUUID } from 'node:crypto'
import { NotAuthorizedError } from './errors/not-authorized-error'

let userRepository = new InMemoryUsersRepository
let emailRepository = new InMemoryEmailsRepository
let deleteEmailUseCase = new DeleteEmailUseCase(emailRepository)

describe('Delete email Use Case', () => {
    beforeEach(() => {
        userRepository = new InMemoryUsersRepository
        emailRepository = new InMemoryEmailsRepository
        deleteEmailUseCase = new DeleteEmailUseCase(emailRepository)
    })

    it('should be able to delete an email', async () => {
        const user = await userRepository.create({
            nome: 'John Doe',
            email: 'johndoe@example.com',
            senha: await hash('123456', 6),
        })

        const email = await emailRepository.create({
            title:'Titulo',
            content: 'Conteudo',
            idDeQuemEnviou: user.id,
            idDeQuemRecebeu: randomUUID(),
        })

        const response = await deleteEmailUseCase.execute({emailId:email.id, userId:user.id})
        
        expect(response.emails).toHaveLength(0)
        expect(response.emails).toEqual([])
    })
    
    it('should not be able to delete an email without being the sender', async () => {
        const user = await userRepository.create({
            nome: 'John Doe',
            email: 'johndoe@example.com',
            senha: await hash('123456', 6),
        })

        const email = await emailRepository.create({
            title:'Titulo',
            content: 'Conteudo',
            idDeQuemEnviou: randomUUID(),
            idDeQuemRecebeu: randomUUID(),
        })

        await expect(() => deleteEmailUseCase.execute({emailId:email.id, userId:user.id})).rejects.toBeInstanceOf(NotAuthorizedError)
    })

    it('should not be able to delete an unexisting email', async () => {
        const user = await userRepository.create({
            nome: 'John Doe',
            email: 'johndoe@example.com',
            senha: await hash('123456', 6),
        })

        expect(() => deleteEmailUseCase.execute({emailId:'unexisting-id', userId:user.id})).rejects.toBeInstanceOf(EmailNotFoundError)

    })
})