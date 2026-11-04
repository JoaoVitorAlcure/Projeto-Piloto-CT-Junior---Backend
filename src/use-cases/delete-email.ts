import type { Email } from "@prisma/client"
import type { EmailRepository } from "../repositories/email-repository"
import { EmailNotFoundError } from "./errors/email-not-found-error"
import { NotAuthorizedError } from "./errors/not-authorized-error"

interface DeleteEmailRequest{
    emailId: string,
    userId: string
}

interface DeleteEmailResponse{
    emails: Email[]
}

export class DeleteEmailUseCase {
    constructor(private emailsRepository: EmailRepository) {}

    async execute({emailId, userId}:DeleteEmailRequest): Promise<DeleteEmailResponse>{
        
        const email = await this.emailsRepository.findById(emailId)

        if (!email){
            throw new EmailNotFoundError()
        }

        if (email.jaVisto){
            throw new NotAuthorizedError()
        }

        if (email.idDeQuemEnviou != userId){
            throw new NotAuthorizedError()
        }

        const novaListaEmails = await this.emailsRepository.deleteEmail(emailId)

        return {emails: novaListaEmails}
    }
}