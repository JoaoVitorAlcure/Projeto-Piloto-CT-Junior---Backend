
import type { Prisma, User } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import type { UserRepository } from "../user-repository";

export class PrismaUsersRepository implements UserRepository{
    async findByEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: {
                email,
            }
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