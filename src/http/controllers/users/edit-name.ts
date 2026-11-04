import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeEditNameUseCase } from "../../../use-cases/factories/make-edit-name-use-case";

export async function editName(
    request: FastifyRequest,
    reply: FastifyReply
) {
    console.log("chegou aqui")
    const editNameSchema = z.object({
        nome: z.string()
    })

    const {nome} = editNameSchema.parse(request.body)

    const editNameUseCase = makeEditNameUseCase()
    
    const response = editNameUseCase.execute({nome, userId: request.user.id})

    return reply.status(200).send(response)
}