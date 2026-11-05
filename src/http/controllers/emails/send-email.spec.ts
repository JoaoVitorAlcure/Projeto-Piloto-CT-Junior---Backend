import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../../../app";
import { createAndAuthenticateUser } from '../../../utils/create-and-authenticate-user';

describe('Send email (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to send an email', async () => {
        const {token} = await createAndAuthenticateUser(app)

        const response = await request(app.server).post('/email')
        .set('Authorization', `Bearer ${token}`)
        .send({emailDeDestinatario:'johndoe@example.com',title:'Titulo',content: 'Conteudo'})

        expect(response.statusCode).toEqual(200)
    })
})