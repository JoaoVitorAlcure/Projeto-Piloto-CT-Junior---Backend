import type { FastifyReply, FastifyRequest } from "fastify";
import { makeGetReceivedEmailsUseCase } from "../../../use-cases/factories/make-get-received-use-case";
import z from "zod";

export async function getReceivedEmails(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const getReceivedEmailsUseCase = makeGetReceivedEmailsUseCase()
    console.log(request.body)
    const emails = await getReceivedEmailsUseCase.execute({userId: request.user.id})
    return reply.status(200).send(emails)
}