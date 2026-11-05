import type { FastifyReply, FastifyRequest } from "fastify";
import { makeGetReceivedEmailsUseCase } from "../../../use-cases/factories/make-get-received-use-case";

export async function getReceivedEmails(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const getReceivedEmailsUseCase = makeGetReceivedEmailsUseCase()
    const emails = await getReceivedEmailsUseCase.execute({userId: request.user.id})
    return reply.status(200).send(emails)
}