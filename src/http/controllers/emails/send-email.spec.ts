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


        await request(app.server).post('/user').send({
                    nome: 'Fulano',
                    email: 'fulano@example.com',
                    senha: '123456',
                })


        const response1 = await request(app.server)
                                .post('/email')
                                .set('Authorization', `Bearer ${token}`)
                                .send({emailDeDestinatario:'fulano@example.com',title:'Titulo',content: 'Conteudo'})

        const response2 = await request(app.server)
                                .post('/email')
                                .set('Authorization', `Bearer ${token}`)
                                .send({emailDeDestinatario:'fulano@example.com',title:'Titulo',content: 'Conteudo'})

        expect(response1.statusCode).toEqual(200)
        expect(response2.statusCode).toEqual(200)
    })
})