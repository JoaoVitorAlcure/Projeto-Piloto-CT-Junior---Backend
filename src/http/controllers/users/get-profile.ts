import type { FastifyReply, FastifyRequest } from "fastify";
import { makeGetProfileUseCase } from "../../../use-cases/factories/make-get-profile-use-case";
import { UserNotFoundError } from "../../../use-cases/errors/user-not-found-error";

export async function getProfile(
    request: FastifyRequest,
    reply: FastifyReply
) {
    try {
        const getProfileUseCase = makeGetProfileUseCase()
        
        const {user} = await getProfileUseCase.execute({userId: request.user.id})

        
        return reply.status(200).send({
            ...user,
            senha: undefined,
        })
    } catch(err){
        if (err instanceof UserNotFoundError){
            return reply.status(404).send({message: err.message})
        }
    }
}