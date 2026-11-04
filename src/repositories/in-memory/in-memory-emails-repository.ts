import type { Email, Prisma } from "@prisma/client"
import type { EmailRepository } from "../email-repository"
import { randomUUID } from "node:crypto"

export class InMemoryEmailsRepository implements EmailRepository {
  public items: Email[] = []

  async fetchReceivedEmails(userId: string) {
    const emails = this.items.filter((item) => item.idDeQuemRecebeu == userId)

    emails.sort((a, b) => b.data.getTime() - a.data.getTime())

    return emails
  }
  async create(data: Prisma.EmailUncheckedCreateInput) {
    const email = {
      id: randomUUID(),
      title: data.title,
      data: new Date(),
      content: data.content,
      jaVisto: false,
      idDeQuemEnviou: data.idDeQuemEnviou,
      idDeQuemRecebeu: data.idDeQuemRecebeu,
    }

    this.items.push(email)

    return email
  }
  async deleteEmail(emailId: string) {
    const novaLista = this.items.filter((item) => item.id != emailId)

    return novaLista
  }

  async findById(emailId: string) {
    const email = this.items.find((item) => item.id === emailId)

    if (!email) {
      return null
    }

    return email
  }

  async fetchSendedEmails(userId: string){
    const emails = this.items.filter((item) => item.idDeQuemEnviou === userId)

    return emails
  }

  async viewEmail(email: Email, userId: string){

    if (email.idDeQuemEnviou != userId && email.idDeQuemRecebeu != userId){
      return null
    }

    if (email.idDeQuemRecebeu == userId){
      email.jaVisto = true
    }

    return email
  }
}
