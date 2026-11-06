import fastify from 'fastify';
import fastifyCookie from '@fastify/cookie';
import { ZodError } from 'zod';
import { env } from '../env';
import fastifyJwt from '@fastify/jwt';
import { usersRoutes } from './http/controllers/users/routes';
import { emailsRoutes } from './http/controllers/emails/routes';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';

export const app = fastify()
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: '2h'
  }
})
app.register(fastifyCookie)
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