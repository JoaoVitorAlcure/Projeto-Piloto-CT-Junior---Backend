import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeEditProfilePictureUseCase } from "../../../use-cases/factories/make-edit-profile-picture-use-case";

export async function editProfilePicture(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const editProfilePictureSchema = z.object({
        linkPhoto: z.string()
    })

    const {linkPhoto} = editProfilePictureSchema.parse(request.body)

    const editProfilePictureUseCase = makeEditProfilePictureUseCase()

    await editProfilePictureUseCase.execute({linkPhoto, userId: request.user.id})

    return reply.status(200).send()
}