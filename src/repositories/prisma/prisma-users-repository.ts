import type { Prisma, User } from "@prisma/client"
import { prisma } from "../../lib/prisma"
import type { UserRepository } from "../user-repository"

export class PrismaUsersRepository implements UserRepository {
  async findById(userId: string) {
    const user = prisma.user.findUnique({
      where: {
        id: userId,
      },
    })

    return user
  }
  
  async changeName(nome: string, userId: string) {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        nome,
      },
    })

    return
  }

  async changeProfilePicture(linkPhoto: string, userId: string) {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        fotoDePerfil: linkPhoto,
      },
    })

    return
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = await prisma.user.create({
      data,
    })

    return user
  }
}
