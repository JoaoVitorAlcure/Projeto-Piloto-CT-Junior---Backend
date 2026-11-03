import { login } from "./login"
import { register } from "./register"
import type { FastifyInstance } from 'fastify'

export async function usersRoutes(app: FastifyInstance){
    app.post('/login', login)
    app.post('/user', register)
}