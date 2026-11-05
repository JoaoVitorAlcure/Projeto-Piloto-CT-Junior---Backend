import { verifyJWT } from "../../middlewares/verify-jwt"
import { getReceivedEmails } from "../emails/get-received-emails"
import type { FastifyInstance } from 'fastify'
import { deleteEmail } from "./delete-email"
import { sendEmail } from "./send-email"
import { getSentEmails } from "./get-sent-emails"

export async function emailsRoutes(app: FastifyInstance){
    // Logado
    app.delete('/email/:emailId', {onRequest: [verifyJWT]}, deleteEmail)
    app.get('/my-emails', {onRequest: [verifyJWT]} ,getReceivedEmails)
    app.post('/email', {onRequest: [verifyJWT]}, sendEmail)
    app.get('/sent-emails', {onRequest: [verifyJWT]}, getSentEmails)
}