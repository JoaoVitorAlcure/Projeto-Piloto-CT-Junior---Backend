import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../../../app";
import { createAndAuthenticateUser } from '../../../utils/create-and-authenticate-user';
import { prisma } from '../../../lib/prisma';

describe('Edit Profile Picture (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to edit profile picture', async () => {
        const {token} = await createAndAuthenticateUser(app)

        const response = await request(app.server).patch('/my-image').set('Authorization', `Bearer ${token}`).send({linkPhoto:'https://linkteste.com.br'})
        
        expect(response.statusCode).toEqual(200)
    })
})