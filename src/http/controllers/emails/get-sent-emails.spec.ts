import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../../../app";
import { createAndAuthenticateUser } from '../../../utils/create-and-authenticate-user';

describe('Get Sent Emails (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to fetch all sent emails', async () => {
        const {token} = await createAndAuthenticateUser(app)
        
        await request(app.server).post('/user').send({
            nome: 'Fulano',
            email: 'fulano@example.com',
            senha: '123456',
        })

        await request(app.server).post('/email')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    emailDeDestinatario:'fulano@example.com',
                    title:'Titulo 1',
                    content: 'Conteudo 1',
                })


        await request(app.server).post('/email')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    emailDeDestinatario:'fulano@example.com',
                    title:'Titulo 2',
                    content: 'Conteudo 2',
                })

        
        const response = await request(app.server)
                                .get('/sent-emails')
                                .set('Authorization', `Bearer ${token}`)
                                .send()
        
        expect(response.statusCode).toEqual(200)
        expect(response.body.emails).toHaveLength(2)
    })
})