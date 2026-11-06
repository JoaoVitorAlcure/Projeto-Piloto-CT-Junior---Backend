import type { Email, Prisma } from "@prisma/client"
import type { EmailRepository } from "../email-repository"
import { prisma } from "../../lib/prisma"

export class PrismaEmailsRepository implements EmailRepository {
  async fetchReceivedEmails(userId: string) {
    const emails = await prisma.email.findMany({
      where: {
        idDeQuemRecebeu: userId,
      },
    })

    emails.sort((a, b) => b.data.getTime() - a.data.getTime())

    return emails
  }
  async create(data: Prisma.EmailUncheckedCreateInput) {
    const email = await prisma.email.create({
      data,
    })

    return email
  }
  async deleteEmail(emailId: string) {
    await prisma.email.delete({
      where: {
        id: emailId,
      },
    })
  }
  async findById(emailId: string) {
    const email = await prisma.email.findUnique({
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
    const emails = await prisma.email.findMany({
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
      await prisma.email.update({
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
