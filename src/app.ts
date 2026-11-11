import fastify from 'fastify';
import fastifyCookie from '@fastify/cookie';
import { ZodError } from 'zod';
import {env} from "./env"
import fastifyJwt from '@fastify/jwt';
import { usersRoutes } from './http/controllers/users/routes';
import { emailsRoutes } from './http/controllers/emails/routes';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import fastifyMultipart, { ajvFilePlugin } from '@fastify/multipart';
import cors from '@fastify/cors'
import fastifyStatic from '@fastify/static';
import path from 'node:path';
import fs from 'node:fs'
import { IMG_DIR, BASE_URL } from './config';

export const app = fastify({
  ajv: {plugins: [ajvFilePlugin]}
})
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: '2h'
  }
})
app.register(fastifyCookie)
app.register(cors, {
  origin: true,
})
app.register(fastifySwagger, {
  openapi: {
    openapi: '3.0.3',
    info: {
      title: 'Sistema de email',
      description: 'Um sistema que permite o cadastro de usuarios e o envio de emails e a visualizacao deles',
      version: '1.0.0'
    },
    servers: [{url: 'http://localhost:3333'}],
    components: {
      securitySchemes: {
        bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      }
    }
  }
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

app.register(fastifyMultipart, {
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 1,
  },
})

fs.mkdirSync(IMG_DIR, {recursive: true})
app.register(fastifyStatic, {
  root: IMG_DIR,
  prefix: '/imgs/'
})
app.register(usersRoutes)
app.register(emailsRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV != 'production') {
    console.error(error)
  }
  
  return reply.status(500).send({ message: 'Internal server error.' })
})