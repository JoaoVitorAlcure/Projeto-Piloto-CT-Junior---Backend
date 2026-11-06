import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { InMemoryEmailsRepository } from '../repositories/in-memory/in-memory-emails-repository'
import { ViewEmailUseCase } from './view-email'
import { NotAuthorizedError } from './errors/not-authorized-error'
import { EmailNotFoundError } from './errors/email-not-found-error'

let userRepository = new InMemoryUsersRepository
let emailRepository = new InMemoryEmailsRepository
let viewEmailUseCase = new ViewEmailUseCase(emailRepository, userRepository)

describe('View Email Use Case', () => {
    beforeEach(() => {
        userRepository = new InMemoryUsersRepository
        emailRepository = new InMemoryEmailsRepository
        viewEmailUseCase = new ViewEmailUseCase(emailRepository, userRepository)
    })

    it('should be able to view a received email', async () => {
        const remetente = await userRepository.create({
            nome: 'Fulano',
            email: 'fulano@example.com',
            senha: await hash('123456', 6),
        })
        
        
        const destinatario = await userRepository.create({
            nome: 'John Doe',
            email: 'johndoe@example.com',
            senha: await hash('123456', 6),
        })

        const email = await emailRepository.create({title: 'titulo',content: '',idDeQuemEnviou: remetente.id,idDeQuemRecebeu: destinatario.id})

        const response = await viewEmailUseCase.execute({emailId:email.id, userId:destinatario.id})
        
        expect(response).toEqual(expect.any(Object))
        expect(response).toEqual(expect.objectContaining({
            titulo: 'titulo'
        }))
        expect(email.jaVisto).toEqual(true)
    })


    it('should be able to view a sended email', async () => {
        const remetente = await userRepository.create({
            nome: 'Fulano',
            email: 'fulano@example.com',
            senha: await hash('123456', 6),
        })
        
        
        const destinatario = await userRepository.create({
            nome: 'John Doe',
            email: 'johndoe@example.com',
            senha: await hash('123456', 6),
        })

        const email = await emailRepository.create({title: 'titulo',content: '',idDeQuemEnviou: remetente.id,idDeQuemRecebeu: destinatario.id})

        const response = await viewEmailUseCase.execute({emailId:email.id, userId:remetente.id})
        
        expect(response).toEqual(expect.any(Object))
        expect(response).toEqual(expect.objectContaining({
            titulo: 'titulo'
        }))
        expect(email.jaVisto).toEqual(false)
    })

    it('should not be able to view a email withou being sender or receiver', async () => {
        const user = await userRepository.create({
            nome: 'Fulano',
            email: 'fulano@example.com',
            senha: await hash('123456', 6),
        })
        
        
        const randomUser = await userRepository.create({
            nome: 'John Doe',
            email: 'johndoe@example.com',
            senha: await hash('123456', 6),
        })

        const email = await emailRepository.create({title: 'titulo',content: '',idDeQuemEnviou: user.id,idDeQuemRecebeu: user.id})

        expect(() => viewEmailUseCase.execute({emailId:email.id, userId:randomUser.id})).rejects.toBeInstanceOf(NotAuthorizedError) 
    })

    it('should not be able to view an unexisting email', async () => {

        expect(() => viewEmailUseCase.execute({emailId:'unexisting-id', userId:'unexisting-id'})).rejects.toBeInstanceOf(EmailNotFoundError) 
    })
})