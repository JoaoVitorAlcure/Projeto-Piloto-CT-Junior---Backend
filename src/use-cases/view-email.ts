import type { Email } from "@prisma/client"
import type { EmailRepository } from "../repositories/email-repository"
import type { UserRepository } from "../repositories/user-repository"
import { UserNotFoundError } from "./errors/user-not-found-error"
import { EmailNotFoundError } from "./errors/email-not-found-error"
import { NotAuthorizedError } from "./errors/not-authorized-error"

interface ViewEmailRequest{
    emailId: string,
    userId: string
}

interface ViewEmailResponse{
    email: Email
}

export class ViewEmailUseCase {
    constructor(private emailsRepository: EmailRepository) {}

    async execute({emailId, userId}:ViewEmailRequest): Promise<ViewEmailResponse>{
        
        const email = await this.emailsRepository.findById(emailId)

        if (!email){
            throw new EmailNotFoundError()
        }

        const responseEmail = await this.emailsRepository.viewEmail(email, userId)

        if (!responseEmail){
            throw new NotAuthorizedError()
        }

        return {email:responseEmail}
    }
}