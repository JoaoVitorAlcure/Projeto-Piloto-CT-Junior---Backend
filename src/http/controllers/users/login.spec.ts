import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../../../app";

describe('Login (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to login', async () => {
        await request(app.server).post('/user').send({
            nome: 'John Doe',
            email: 'johndoe@example.com',
            senha: '123456',
        })

        const response = await request(app.server).post('/login').send({
            email: 'johndoe@example.com',
            senha: '123456',
        })

        expect(response.status).toEqual(200)
        expect(response.body).toEqual({
            token: expect.any(String)
        })
    })
})