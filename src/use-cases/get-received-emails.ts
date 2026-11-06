import type { EmailRepository } from "../repositories/email-repository"

interface GetReceivedEmailsRequest{
    userId: string
}

interface GetReceivedEmailsResponse{
    emails: Object[]
}

export class GetReceivedEmailsUseCase {
    constructor(private emailsRepository: EmailRepository) {}

    async execute({userId}:GetReceivedEmailsRequest): Promise<GetReceivedEmailsResponse>{
        
        let emails = await this.emailsRepository.fetchReceivedEmails(userId)

        return {emails}
    }
}