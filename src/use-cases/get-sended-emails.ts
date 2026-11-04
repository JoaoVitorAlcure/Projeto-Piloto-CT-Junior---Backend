import type { Email } from "@prisma/client"
import type { EmailRepository } from "../repositories/email-repository"

interface GetSendedEmailsRequest{
    userId: string
}

interface GetSendedEmailsResponse{
    emails: Email[]
}

export class GetSendedEmailsUseCase {
    constructor(private emailsRepository: EmailRepository) {}

    async execute({userId}:GetSendedEmailsRequest): Promise<GetSendedEmailsResponse>{
        
        const emails = await this.emailsRepository.fetchSendedEmails(userId)

        return {emails}
    }
}