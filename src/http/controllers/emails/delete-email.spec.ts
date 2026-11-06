import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../../../app";
import { createAndAuthenticateUser } from '../../../utils/create-and-authenticate-user';
import { prisma } from '../../../lib/prisma';
import { randomUUID } from 'node:crypto';

describe('Delete email (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to delete an email', async () => {
        const {token} = await createAndAuthenticateUser(app)

        const user = await prisma.user.findFirstOrThrow()

        const email = await prisma.email.create({
            data:{
                title:'Titulo',
                content: 'Conteudo',
                idDeQuemEnviou: user.id,
                idDeQuemRecebeu: user.id,
            }
        })

        const response = await request(app.server).delete(`/email/${email.id}`).set('Authorization', `Bearer ${token}`).send()
        expect(response.statusCode).toEqual(200)
    })
})