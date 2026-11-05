import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeSendEmailUseCase } from "../../../use-cases/factories/make-send-email-use-case";
import { UserNotFoundError } from "../../../use-cases/errors/user-not-found-error";

export async function sendEmail(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const sendEmailBodySchema = z.object({
        emailDeDestinatario: z.email(),
        title: z.string(),
        content: z.string()
    })

    const {emailDeDestinatario, title, content} = sendEmailBodySchema.parse(request.body)

    try {
        const sendEmailUseCase = makeSendEmailUseCase()

        sendEmailUseCase.execute({emailDeDestinatario, title, content, userId: request.user.id})

        return reply.status(200).send()
    } catch (err) {

        console.log("chegou aqui")
        if (err instanceof UserNotFoundError){
            return reply.status(404).send({message: err.message})
        }

    }
    


    
    
}