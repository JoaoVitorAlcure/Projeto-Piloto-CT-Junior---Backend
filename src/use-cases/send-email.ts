import type { Email } from "@prisma/client"
import type { EmailRepository } from "../repositories/email-repository"
import type { UserRepository } from "../repositories/user-repository"
import { UserNotFoundError } from "./errors/user-not-found-error"

interface SendEmailRequest{
    emailDeDestinatario: string,
    title: string,
    content: string,
    userId: string,
}

interface SendEmailResponse{
    email: Email
}

export class SendEmailUseCase {
    constructor(private emailsRepository: EmailRepository, private userRepository: UserRepository) {}

    async execute({emailDeDestinatario, title, content, userId}:SendEmailRequest): Promise<SendEmailResponse>{
        
        const user = await this.userRepository.findByEmail(emailDeDestinatario)

        if (!user){
            console.log('Não achou o usuario')
            throw new UserNotFoundError()
        }

        const email = await this.emailsRepository.create({title, content, idDeQuemRecebeu:user.id, idDeQuemEnviou:userId})

        return {email}
    }
}