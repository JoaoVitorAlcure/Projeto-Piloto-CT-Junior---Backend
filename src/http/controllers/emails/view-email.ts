import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { EmailNotFoundError } from "../../../use-cases/errors/email-not-found-error";
import { NotAuthorizedError } from "../../../use-cases/errors/not-authorized-error";
import { makeViewEmailUseCase } from "../../../use-cases/factories/make-view-email-use-case";

export async function viewEmail(
    request: FastifyRequest,
    reply: FastifyReply
) {
    
    const viewEmailParamsBodySchema = z.object({
        emailId: z.uuid()
    })

    
    const {emailId} = viewEmailParamsBodySchema.parse(request.params)

    
    try {
        const viewEmailUseCase = makeViewEmailUseCase()

        const email = await viewEmailUseCase.execute({emailId, userId: request.user.id})

        return reply.status(400).send(email)
    } catch (err) {

        if (err instanceof EmailNotFoundError){
            return reply.status(404).send({message: err.message})
        } else if (err instanceof NotAuthorizedError){
            return reply.status(401).send({message: err.message})
        }

    }
    


    
    
}