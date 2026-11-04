import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeLoginUseCase } from "../../../use-cases/factories/make-login-use-case";
import { InvalidCredentialsError } from "../../../use-cases/errors/invalid-credentials-error";

export async function login(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const loginBodySchema = z.object({
        email: z.email(),
        senha: z.string().min(6),
    })

    const {email, senha} = loginBodySchema.parse(request.body)

    try {
        const loginUseCase = makeLoginUseCase()

        const { user } = await loginUseCase.execute({
            email,
            senha,
        })

        const token = await reply.jwtSign({
            id: user.id
        })

        return reply.status(200).send({token})
    } catch (err){
        if (err instanceof InvalidCredentialsError){
            return reply.status(400).send({message: err.message})
        }

        throw err
    }
}