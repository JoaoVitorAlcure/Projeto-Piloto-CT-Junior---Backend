import type { Email, User } from "@prisma/client"
import type { UserRepository } from "../repositories/user-repository"
import { hash } from "bcryptjs"
import { UserAlreadyExists } from "./errors/user-already-exists-error"
import { PasswordLessThanSixCharactersError } from "./errors/password-less-than-six-characters-error"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"
import { email } from "zod"

interface GetEmailsRequest{
    userId: string
}

interface GetEmailsResponse{
    emails: Email[]
}

export class GetEmails {
    constructor(private usersRepository: UserRepository) {}

    async execute({userId}:GetEmailsRequest): Promise<GetEmailsResponse>{
        
        const user = await this.usersRepository.findById(userId)
    
        if (!user){
            throw new ResourceNotFoundError()
        }

        const emailsRecebidos = await this.usersRepository.fetchReceivedEmails(user)


        return emailsRecebidos
    }
}