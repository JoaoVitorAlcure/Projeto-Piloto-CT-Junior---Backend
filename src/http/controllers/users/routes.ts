import { EditNameUseCase } from "../../../use-cases/edit-name"
import { verifyJWT } from "../../middlewares/verify-jwt"
import { editName } from "./edit-name"
import { editProfilePicture } from "./edit-profile-picture"
import { getReceivedEmails } from "../emails/get-received-emails"
import { login } from "./login"
import { register } from "./register"
import type { FastifyInstance } from 'fastify'

export async function usersRoutes(app: FastifyInstance){
    app.post('/login', login)
    app.post('/user', register)
    
    //Logado
    app.patch('/my-image', {onRequest: [verifyJWT]}, editProfilePicture)
    app.patch('/my-name', {onRequest: [verifyJWT]}, editName)
}