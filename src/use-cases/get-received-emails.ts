import type { Email } from "@prisma/client"
import type { EmailRepository } from "../repositories/email-repository"

interface GetReceivedEmailsRequest{
    userId: string
}

interface GetReceivedEmailsResponse{
    emails: Email[]
}

export class GetReceivedEmailsUseCase {
    constructor(private emailsRepository: EmailRepository) {}

    async execute({userId}:GetReceivedEmailsRequest): Promise<GetReceivedEmailsResponse>{
        
        const emails = await this.emailsRepository.fetchReceivedEmails(userId)

        return {emails}
    }
}