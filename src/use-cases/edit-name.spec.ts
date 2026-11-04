import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { EditNameUseCase } from './edit-name'

let userRepository = new InMemoryUsersRepository
let editNameUseCase = new EditNameUseCase(userRepository)

describe('Edit Name Use Case', () => {
    beforeEach(() => {
        userRepository = new InMemoryUsersRepository
        editNameUseCase = new EditNameUseCase(userRepository)
    })
    
    it('should be able to change the username', async () => {
        const user = await userRepository.create({
            nome: 'John Doe',
            email: 'johndoe@example.com',
            senha: await hash('123456', 6),
        })

        const response = await editNameUseCase.execute({nome: 'Fulano', userId: user.id})
        expect(response.nome).toEqual(expect.any(String))

    })
})