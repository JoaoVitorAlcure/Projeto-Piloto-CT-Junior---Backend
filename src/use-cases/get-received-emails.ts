import type { EmailRepository } from "../repositories/email-repository"
import type { UserRepository } from "../repositories/user-repository"

interface GetReceivedEmailsRequest{
    userId: string
}

interface GetReceivedEmailsResponse{
    emails: Object[]
}

export class GetReceivedEmailsUseCase {
    constructor(private emailsRepository: EmailRepository, private userRepository: UserRepository) {}

    async execute({userId}:GetReceivedEmailsRequest): Promise<GetReceivedEmailsResponse>{
        
        const emails = await this.emailsRepository.fetchReceivedEmails(userId)

        let emailsRefatorados = []
        for(var email of emails){
            const user = await this.userRepository.findById(email.idDeQuemEnviou)

            emailsRefatorados.push({
                titulo: email.title,
                enviado_por: user?.nome,
                jaVisto: email.jaVisto,
                email_id: email.id,
            })
        }
        return {emails:emailsRefatorados}
    }
}