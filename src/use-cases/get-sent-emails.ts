import type { EmailRepository } from "../repositories/email-repository"
import type { UserRepository } from "../repositories/user-repository"

interface GetSentEmailsRequest{
    userId: string
}

interface GetSentEmailsResponse{
    emails: Object[]
}

export class GetSentEmailsUseCase {
    constructor(private emailsRepository: EmailRepository, private userRepository: UserRepository) {}

    async execute({userId}:GetSentEmailsRequest): Promise<GetSentEmailsResponse>{
        
        const emails = await this.emailsRepository.fetchSendedEmails(userId)

        let emailsRefatorados = []
        for(var email of emails){
            const user = await this.userRepository.findById(email.idDeQuemRecebeu)

            emailsRefatorados.push({
                titulo: email.title,
                enviado_para: user?.nome,
                jaVisto: email.jaVisto,
                email_id: email.id,
            })
        }

        return {emails: emailsRefatorados}
    }
}