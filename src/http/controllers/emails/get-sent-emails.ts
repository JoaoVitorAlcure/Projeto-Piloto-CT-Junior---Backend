import type { FastifyReply, FastifyRequest } from "fastify";
import { makeGetSentEmailsUseCase } from "../../../use-cases/factories/make-get-sent-emails-use-case";

export async function getSentEmails(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const getSentEmailsUseCase = makeGetSentEmailsUseCase()
    const emails = await getSentEmailsUseCase.execute({userId: request.user.id})
    return reply.status(200).send(emails)
}