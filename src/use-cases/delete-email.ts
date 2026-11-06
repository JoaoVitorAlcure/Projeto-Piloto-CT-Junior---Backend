import type { Email } from "@prisma/client"
import type { EmailRepository } from "../repositories/email-repository"
import { EmailNotFoundError } from "./errors/email-not-found-error"
import { NotAuthorizedError } from "./errors/not-authorized-error"
import { EmailAlreadySeenError } from "./errors/email-already-seen-error"

interface DeleteEmailRequest{
    emailId: string,
    userId: string
}

export class DeleteEmailUseCase {
    constructor(private emailsRepository: EmailRepository) {}

    async execute({emailId, userId}:DeleteEmailRequest): Promise<void>{
        
        const email = await this.emailsRepository.findById(emailId)

        if (!email){
            throw new EmailNotFoundError()
        }

        if (email.jaVisto){
            throw new EmailAlreadySeenError()
        }

        if (email.idDeQuemEnviou != userId){
            throw new NotAuthorizedError()
        }

        await this.emailsRepository.deleteEmail(emailId)
    }
}