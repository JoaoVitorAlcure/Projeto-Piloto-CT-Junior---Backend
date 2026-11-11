
import type { FastifyReply, FastifyRequest } from "fastify";
import { randomUUID } from "node:crypto";
import { createWriteStream } from "node:fs";
import { unlink } from "node:fs/promises";
import path from "node:path";
import { pipeline } from "node:stream/promises";
import z from "zod";
import { InvalidFileError } from "../../../use-cases/errors/invalid-file-error";

export async function editProfilePictureFile(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const fileBodySchema = z.object({
        ext: z.enum(['.jpg','.png','.jpeg']),
        mimetype: z.enum(['image/jpeg', 'image/png']),
    })

    const data = await request.file()

    if (!data){
        return reply.status(400).send({message: "Arquivo não encontrado"})
    }

    let pasta: string | undefined

    try {
        const arquivo = fileBodySchema.safeParse({
            ext: path.extname(data.filename).toLowerCase(),
            mimetype: data.mimetype,
        })
        
        if (!arquivo.success){
            data.file.resume()
            throw new InvalidFileError()
        }
        const nome = randomUUID() + arquivo.data.ext
        pasta = path.join('imgs', nome)
        await pipeline(data.file, createWriteStream(pasta))

        return reply.status(201).send()
    } catch (err) {
        if (pasta){
            await unlink(pasta).catch(() => {})
        }
        if (err instanceof InvalidFileError){
            
            return reply.status(400).send({message: err.message})
        }
        throw err
    }
}