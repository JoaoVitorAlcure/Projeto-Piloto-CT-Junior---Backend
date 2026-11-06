import type { EmailRepository } from "../repositories/email-repository"
import { EmailNotFoundError } from "./errors/email-not-found-error"
import { NotAuthorizedError } from "./errors/not-authorized-error"
import type { UserRepository } from "../repositories/user-repository"

interface ViewEmailRequest{
    emailId: string,
    userId: string
}

interface ViewEmailResponse{
    email: Object
}

export class ViewEmailUseCase {
    constructor(private emailsRepository: EmailRepository, private userRepository: UserRepository) {}

    async execute({emailId, userId}:ViewEmailRequest): Promise<ViewEmailResponse>{
        
        const email = await this.emailsRepository.findById(emailId) 
        
        if (!email){
            throw new EmailNotFoundError()
        }

        const user = await this.userRepository.findById(email.idDeQuemEnviou)

        if (!user){
            throw new NotAuthorizedError()
        }

        const responseEmail = await this.emailsRepository.viewEmail(email, userId)

        if (!responseEmail){
            throw new NotAuthorizedError()
        }

        const emailRefatorado = {
            titulo: email.title,
            content: email.content,
            enviado_por: user.email
        }

        return {email: emailRefatorado}
    }
}