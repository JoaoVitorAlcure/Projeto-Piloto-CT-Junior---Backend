
import type { FastifyReply, FastifyRequest } from "fastify";
import { randomUUID } from "node:crypto";
import { createWriteStream } from "node:fs";
import { unlink } from "node:fs/promises";
import path from "node:path";
import { pipeline } from "node:stream/promises";
import z from "zod";
import { InvalidFileError } from "../../../use-cases/errors/invalid-file-error";
import { env } from "../../../env";
import { BASE_URL, IMG_DIR } from "../../../config";

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
        pasta = path.join(IMG_DIR, nome)
        await pipeline(data.file, createWriteStream(pasta))
    
        const url = `${BASE_URL}:${env.PORT}/imgs/${nome}`
        return reply.status(201).send({ url })
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