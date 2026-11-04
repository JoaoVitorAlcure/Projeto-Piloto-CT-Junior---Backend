import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../../../app";
import { createAndAuthenticateUser } from '../../../utils/create-and-authenticate-user';

describe('Get Received Emails (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to fetch all received emails', async () => {
        const {token} = await createAndAuthenticateUser(app)

        const response = await request(app.server).get('/my-emails').set('Authorization', `Bearer ${token}`).send()

        expect(response.statusCode).toEqual(200)
        expect(response.body.emails).toHaveLength(0)
    })
})