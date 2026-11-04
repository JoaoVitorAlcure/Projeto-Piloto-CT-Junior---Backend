import type { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import request from 'supertest'
import { hash } from "bcryptjs";

export async function createAndAuthenticateUser(app: FastifyInstance){
    await prisma.user.create({
        data: {
            nome: 'John Doe',
            email: 'johndoe@example.com',
            senha: await hash('123456',6),
        }
    })

    const loginResponse = await request(app.server).post('/login').send({
        email: 'johndoe@example.com',
        senha: '123456',
    })

    const token = loginResponse.body
    return token
}