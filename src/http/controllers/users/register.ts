import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeRegisterUseCase } from "../../../use-cases/factories/make-register-use-case";
import { UserAlreadyExists } from "../../../use-cases/errors/user-already-exists-error";

export async function register(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const registerBodySchema = z.object({
        nome: z.string(),
        email: z.email(),
        senha: z.string().min(6),
    })

    const {nome, email, senha} = registerBodySchema.parse(request.body)

    try {
        const registerUseCase = makeRegisterUseCase()

        await registerUseCase.execute({
            nome,
            email,
            senha,
        })

        return reply.status(201).send()
    } catch (err){
        if (err instanceof UserAlreadyExists){
            return reply.status(409).send({message: err.message})
        }
    }
}