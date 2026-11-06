import { Prisma, type Email, type User } from "@prisma/client"
import type { UserRepository } from "../user-repository"
import { randomUUID } from "node:crypto"

export class InMemoryUsersRepository implements UserRepository {
  public items: User[] = []

  async changeProfilePicture(linkPhoto: string, userId: string) {
    const user = this.items.find((item) => item.id === userId)

    if (!user) {
      return
    }

    user.fotoDePerfil = linkPhoto
    return
  }

  async changeName(nome: string, userId: string) {
    const user = this.items.find((item) => item.id === userId)

    if (!user) {
      return
    }

    user.nome = nome

    return
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }
  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = {
      id: randomUUID(),
      nome: data.nome,
      email: data.email,
      senha: data.senha,
      fotoDePerfil: null,
    }

    this.items.push(user)

    return user
  }

  async findById(userId: string) {
    const user = this.items.find((item) => item.id === userId)

    if (!user) {
      return null
    }

    return user
  }
}
