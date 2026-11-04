import type { Email, Prisma } from "@prisma/client"
import type { EmailRepository } from "../email-repository"
import { prisma } from "../../lib/prisma"

export class PrismaEmailsRepository implements EmailRepository {
  async fetchReceivedEmails(userId: string) {
    const emails = await prisma.email.findMany({
      where: {
        idDeQuemEnviou: userId,
      },
    })

    emails.sort((a, b) => b.data.getTime() - a.data.getTime())

    return emails
  }
  async create(data: Prisma.EmailUncheckedCreateInput) {
    const email = prisma.email.create({
      data,
    })

    return email
  }
  async deleteEmail(emailId: string) {
    prisma.email.delete({
      where: {
        id: emailId,
      },
    })

    const novaLista = prisma.email.findMany()

    return novaLista
  }
  async findById(emailId: string) {
    const email = prisma.email.findUnique({
      where: {
        id: emailId,
      },
    })

    if (!email) {
      return null
    }

    return email
  }
  async fetchSendedEmails(userId: string) {
    const emails = prisma.email.findMany({
      where: {
        idDeQuemEnviou: userId,
      },
    })

    return emails
  }
  async viewEmail(email: Email, userId: string) {
    if (email.idDeQuemEnviou != userId && email.idDeQuemRecebeu != userId) {
      return null
    }

    if (email.idDeQuemRecebeu == userId) {
      prisma.email.update({
        where: {
          id: email.id,
        },
        data: {
          jaVisto: true,
        },
      })
    }

    return email
  }
}
