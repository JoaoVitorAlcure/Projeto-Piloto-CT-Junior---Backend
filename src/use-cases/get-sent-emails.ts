import type { Email } from "@prisma/client"
import type { EmailRepository } from "../repositories/email-repository"

interface GetSentEmailsRequest{
    userId: string
}

interface GetSentEmailsResponse{
    emails: Email[]
}

export class GetSentEmailsUseCase {
    constructor(private emailsRepository: EmailRepository) {}

    async execute({userId}:GetSentEmailsRequest): Promise<GetSentEmailsResponse>{
        
        const emails = await this.emailsRepository.fetchSendedEmails(userId)

        return {emails}
    }
}