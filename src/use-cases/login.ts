import type { User } from "@prisma/client"
import type { UserRepository } from "../repositories/user-repository"
import { InvalidCredentialsError } from "./errors/invalid-credentials-error"
import { compare } from "bcryptjs"

interface LoginUseCaseRequest{
    email: string,
    senha: string
}

interface LoginUseCaseResponse{
    user: User
}

export class LoginUseCase {
    constructor(private usersRepository: UserRepository) {}

    async execute({email,senha}:LoginUseCaseRequest): Promise<LoginUseCaseResponse>{
        const user = await this.usersRepository.findByEmail(email)

        if (!user){
            throw new InvalidCredentialsError()
        }

        const ehSenhaCorreta = await compare(senha, user.senha)
        
        if (!ehSenhaCorreta){
            throw new InvalidCredentialsError()
        }
        
        return {user}
    }
}