import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeDeleteEmailUseCase } from "../../../use-cases/factories/make-delete-email-use-case";
import { EmailNotFoundError } from "../../../use-cases/errors/email-not-found-error";
import { NotAuthorizedError } from "../../../use-cases/errors/not-authorized-error";

export async function deleteEmail(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const deleteEmailParamsBodySchema = z.object({
        emailId: z.uuid()
    })

    const {emailId} = deleteEmailParamsBodySchema.parse(request.params)

    try {
        const deleteEmailUseCase = makeDeleteEmailUseCase()

        deleteEmailUseCase.execute({emailId, userId: request.user.id})

        return reply.status(200).send()
    } catch (err) {
        if (err instanceof EmailNotFoundError){
            return reply.status(404).send({message: err.message})
        } else if (err instanceof NotAuthorizedError){
            return reply.status(401).send({message: err.message})
        }

        throw err
    }
    


    
    
}