import type { User } from "@prisma/client"
import type { UserRepository } from "../repositories/user-repository"
import { hash } from "bcryptjs"
import { UserAlreadyExists } from "./errors/user-already-exists-error"
import { PasswordLessThanSixCharactersError } from "./errors/password-less-than-six-characters-error"

interface RegisterUseCaseRequest{
    nome: string,
    email: string,
    senha: string
}

interface RegisterUseCaseResponse{
    user: User
}

export class RegisterUseCase {
    constructor(private usersRepository: UserRepository) {}

    async execute({nome,email,senha}:RegisterUseCaseRequest): Promise<RegisterUseCaseResponse>{
        
        if (senha.length < 6){
            throw new PasswordLessThanSixCharactersError()
        }
        const senhaCriptografada = await hash(senha, 6)
        
        const usuarioComMesmaSenha = await this.usersRepository.findByEmail(email)

        if (usuarioComMesmaSenha){
            throw new UserAlreadyExists()
        }
        
        const user = await this.usersRepository.create({
            nome,
            email,
            senha: senhaCriptografada,
        })
    
        return {user}
    }
}