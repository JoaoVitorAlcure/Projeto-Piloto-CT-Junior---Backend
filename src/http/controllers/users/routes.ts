import { verifyJWT } from "../../middlewares/verify-jwt"
import { editName } from "./edit-name"
import { editProfilePicture } from "./edit-profile-picture"
import { login } from "./login"
import { register } from "./register"
import type { FastifyInstance } from "fastify"
import { getProfile } from "./get-profile"
import { randomUUID } from "node:crypto"
import { editProfilePictureFile } from "./edit-profile-picture-file"

export async function usersRoutes(app: FastifyInstance) {
  app.post("/login",
    {
      schema: {
        tags: ["Users"],
        summary: "Login do usuário",
        body: {
          type: "object",
          required: ["email", "senha"],
          properties: {
            email: { type: "string", format:"email"},
            senha: { type: "string" },
          },
        },
        response: {
          200: {
            description: "Login realizado com sucesso",
            type: "object",
            properties: {
                token: {type: 'string',}
            }
          },
          400: {
            description: "Credenciais inválidas",
            type: "object",
            properties: {
              message: { type: "string" },
            },
          },
        },
      },
    },
    login,)
  app.post("/user",
    {
      schema: {
        tags: ["Users"],
        summary: "Cadastro do usuário",
        body: {
          type: "object",
          required: ["nome", "email", "senha"],
          properties: {
            nome: { type: "string"},
            email: { type: "string", format:"email" },
            senha: { type: "string"},
          },
        },
        response: {
          201: { 
            description: "Cadastro feito com sucesso",
            type: "null"
          },
          409: {
            description: "Usuário já existe",
            type: "object",
            properties: {
              message: { type: "string" },
            },
          },
          400: {
            description: "Senha com menos de 6 caracteres",
            type: "object",
            properties: {
              message: { type: "string" },
            },
          }
        },
      },
    },register,)

  //Logado
  app.patch("/my-image",
    {
      onRequest: [verifyJWT],
      schema: {
        tags: ["Users"],
        summary: "Atualiza a foto de perfil do usuário",
        security: [{ bearerAuth: [] }],
        body: {
          required: ["linkPhoto"],
          type: "object",
          properties: {
            linkPhoto: {type: "string", examples:["https://exemplolink.com.br"]}
          }
        },
        response: {
          200: {
            description: "Atualização da foto de perfil feita com sucesso",
            type: "null",
          },
          401: {
            description: "Usuário não autorizado",
            type: "object",
            properties: {
              message: { type: "string" },
            },
          },
        },
      },
    },editProfilePicture,)

  app.patch("/my-image-file",
    {
      onRequest: [verifyJWT],
      schema: {
        tags: ["Users"],
        summary: "Atualiza a foto de perfil do usuário com um arquivo",
        security: [{ bearerAuth: [] }],
        consumes: ['multipart/form-data'],
        body: {
          required: ['file'],
          type: "object",
          properties: {
            file: {isFile: true},
          }
        },
        response: {
          201: {
            description: "Atualização da foto de perfil feita com sucesso",
            type: "null",
          },
          400: {
            description: "Tipo do arquivo invalido",
            type: "object",
            properties: {
              message: { type: "string" },
            },
          },
        },
      },
    },editProfilePictureFile,)
  app.patch("/my-name", {
      onRequest: [verifyJWT],
      schema: {
        tags: ["Users"],
        summary: "Atualiza o nome do usuário",
        security: [{ bearerAuth: [] }],
        body: {
          type: "object",
          required: ["nome"],
          properties: {
            nome: {type: "string", examples: ["Fulano"]}
          }
        },
        response: {
          200: { 
            description: "Atualização do nome do usuário feita com sucesso",
            type: "null",
          },
          401: {
            description: "Usuário não autorizado",
            type: "object",
            properties: {
              message: { type: "string" },
            },
          },
        },
      },
    }, editName)
  app.get("/me", {
      onRequest: [verifyJWT],
      schema: {
        tags: ["Users"],
        summary: "Retorna o perfil do usuário",
        security: [{ bearerAuth: [] }],
        response: {
          200: {
            description: "Retorno do perfil do usuário feito com sucesso",
            type: "object",
            properties: {
              id: {type: "string", format:"uuid", examples:[randomUUID()]},
              nome: {type: "string", examples:["Fulano"]},
              email: {type: "string", format:"email"},
              fotoDePerfil: {type: ["string", "null"], format:"uri", examples:["https://fotos/joao.png"]}
            }
          },
          404: {
            description: "Usuário não encontrado",
            type: "object",
            properties: {
              message: { type: "string" },
            },
          },
          401: {
            description: "Usuário não autorizado",
            type: "object",
            properties: {
              message: { type: "string" },
            },
          },
        },
      },
    }, getProfile)
}
