import type { Email } from "@prisma/client"
import type { EmailRepository } from "../repositories/email-repository"
import type { UserRepository } from "../repositories/user-repository"
import { UserNotFoundError } from "./errors/user-not-found-error"

interface SendEmailRequest{
    emailDestinatario: string,
    title: string,
    content: string,
    userId: string,
}

interface SendEmailResponse{
    email: Email
}

export class SendEmailUseCase {
    constructor(private emailsRepository: EmailRepository, private userRepository: UserRepository) {}

    async execute({emailDestinatario, title, content, userId}:SendEmailRequest): Promise<SendEmailResponse>{
        
        const user = await this.userRepository.findByEmail(emailDestinatario)

        if (!user){
            throw new UserNotFoundError()
        }

        const email = await this.emailsRepository.create({title, content, idDeQuemRecebeu:user.id, idDeQuemEnviou:userId})

        return {email}
    }
}