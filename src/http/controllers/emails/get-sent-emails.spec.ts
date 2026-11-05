import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../../../app";
import { createAndAuthenticateUser } from '../../../utils/create-and-authenticate-user';
import { prisma } from '../../../lib/prisma';

describe('Get Sent Emails (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to fetch all sent emails', async () => {
        const {token} = await createAndAuthenticateUser(app)

        const user = await prisma.user.findFirstOrThrow()

        await request(app.server).post('/email')
        .set('Authorization', `Bearer ${token}`)
        .send({
            emailDeDestinatario:'johndoe@example.com',
            title:'Email 1',
            content: 'Conteudo'
        })

        const response = await request(app.server).get('/sent-emails')
        .set('Authorization', `Bearer ${token}`)
        .send()

        expect(response.statusCode).toEqual(200)
        expect(response.body.emails).toHaveLength(1)
    })
})