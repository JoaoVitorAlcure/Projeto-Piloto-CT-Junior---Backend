import { verifyJWT } from "../../middlewares/verify-jwt"
import { getReceivedEmails } from "../emails/get-received-emails"
import type { FastifyInstance } from 'fastify'
import { deleteEmail } from "./delete-email"
import { sendEmail } from "./send-email"
import { getSentEmails } from "./get-sent-emails"
import { viewEmail } from "./view-email"
import { randomUUID } from "node:crypto"

export async function emailsRoutes(app: FastifyInstance){
    app.addHook('onRequest', verifyJWT)
    // Logado
    app.delete('/email/:emailId', {
      schema: {
        tags: ["Emails"],
        summary: "Deleta um email",
        description: "Deleta caso o usuário que mande a requisição seja o remetente",
        params: {
            type: "object",
            required: ["emailId"],
            properties: {
              emailId: {type:"string", format:"uuid"}
            }
        },
        security: [{ bearerAuth: [] }],
        response: {
          200: {
            description: "O email foi apagado com sucesso",
            type: "null",
          },
          404: {
            description: "Email não encontrado",
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
          }
        },
      },
    }, deleteEmail)



    app.get('/my-emails',{
      schema: {
        tags: ["Emails"],
        summary: "Ver todos emails recebidos",
        security: [{ bearerAuth: [] }],
        response: {
          200: {
            description: "Todos emails recebidos foram retornados com sucesso",
            type: "object",
            properties: {
              emails: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    titulo: {type: "string", examples:["Titulo"]},
                    enviado_por: {type: "string"},
                    jaVisto: {type: "boolean"},
                    email_id: {type: "string", format:"uuid"},
                  }
                }
              },
            },
          },
          401: {
            description: "Usuário não autorizado",
            type: "object",
            properties: {
              message: { type: "string", examples: ["Não autorizado"]},
            },
          }
        },
      },
    },getReceivedEmails)



    app.post('/email',{
      schema: {
        tags: ["Emails"],
        summary: "Enviar email",
        security: [{ bearerAuth: [] }],
        body: {
            type: "object",
            required: ["emailDeDestinatario", "title", "content"],
            properties: {
                emailDeDestinatario: {type: "string", format:"email"},
                title: {type: "string", examples:["Reunião amanhã?"]},
                content: {type: "string", examples:["Olá Sodré queria marcar uma reunião contigo amanhã às 8:00. Aguardo sua resposta. Conrado."]}
            }
        },
        response: {
          200: {
            description: "Email enviado com sucesso",
            type: "null",
          },
          401: {
            description: "Usuário não autorizado",
            type: "object",
            properties: {
              message: { type: "string" },
            },
          },
          404: {
            description: "Destinatario não encontrado",
            type: "object",
            properties: {
              message: { type: "string" },
            },
          }
        },
      },
    }, sendEmail)




    app.get('/sent-emails',{
      schema: {
        tags: ["Emails"],
        summary: "Retornar emails enviados",
        security: [{ bearerAuth: [] }],
        response: {
          200: {
            description: "O retorno foi feito com sucesso",
            type: "object",
            properties: {
              emails: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    titulo: {type: "string", examples:["Titulo"]},
                    enviado_para: {type: "string", format:"email"},
                    jaVisto: {type: "boolean"},
                    email_id: {type: "string", format: "uuid", examples:[randomUUID()]}
                  }
                }
              },
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
    }, getSentEmails)




    app.get('/email/:emailId',{
      schema: {
        tags: ["Emails"],
        summary: "Visualizar um email",
        description: "Se o usuário for o destinatário o jaVisto será atualizado",
        security: [{ bearerAuth: [] }],
        params: {
          required: ["emailId"],
            properties: {
              id: {
                type:"string",
                format:"uuid",
                description:"ID do **email** que se deseja **visualizar**",
                examples:[randomUUID()]}
            }
        },
        response: {
          200: {
            description: "Email visualizado com sucesso",
            type: "object",
            properties: {
              titulo: {type: "string", examples:["Titulo"]},
              content: {type: "string"},
              enviado_por: {type: "string", format:"email"},
            },
          },
          401: {
            description: "Usuário não autorizado",
            type: "object",
            properties: {
              message: { type: "string" },
            },
          },
          404: {
            description: "Email não encontrado",
            type: "object",
            properties: {
              message: { type: "string" },
            },
          }
        },
      },
    }, viewEmail)
}