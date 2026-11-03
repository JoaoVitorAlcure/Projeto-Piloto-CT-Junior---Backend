import { Prisma, type User } from "@prisma/client";
import type { UserRepository } from "../user-repository";
import { randomUUID } from "node:crypto";

export class InMemoryUsersRepository implements UserRepository {
    public items: User[] = []
    async findByEmail(email: string){
        const user = this.items.find((item) => item.email === email)

        if (!user){
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
}