import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../../../app";
import { createAndAuthenticateUser } from '../../../utils/create-and-authenticate-user';

describe('Edit Name (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to edit the user name', async () => {
        const {token, user} = await createAndAuthenticateUser(app)

        const response = await request(app.server).patch('/my-name').set('Authorization', `Bearer ${token}`).send({nome:'Fulano'})
        
        expect(response.statusCode).toEqual(200)
        expect(response.text).toEqual(expect.any(String))
    })
})