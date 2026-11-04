import type { UserRepository } from "../repositories/user-repository"

interface EditNameUseCaseRequest{
    nome: string
    userId: string
}

interface EditNameUseCaseResponse{
    nome: string
}
export class EditNameUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute({nome, userId}:EditNameUseCaseRequest): Promise<EditNameUseCaseResponse>{
        
        await this.userRepository.changeName(nome, userId)

        return {nome}
    }
}