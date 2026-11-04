import type { EmailRepository } from "../repositories/email-repository"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"

interface DeleteEmailRequest{
    emailId: string,
    userId: string
}

export class DeleteEmailUseCase {
    constructor(private emailsRepository: EmailRepository) {}

    async execute({emailId, userId}:DeleteEmailRequest): Promise<void>{
        
        const email = await this.emailsRepository.findById(emailId)

        if (!email){
            throw new ResourceNotFoundError()
        }
        //TODO: colocar a mensagem de email não encontrado e terminar o resto do use-case
    }
}