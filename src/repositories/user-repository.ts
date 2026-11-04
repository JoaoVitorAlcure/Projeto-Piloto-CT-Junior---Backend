import type { Prisma, User } from "@prisma/client";

export interface UserRepository{
    findByEmail(email: string): Promise<User | null>
    create(data: Prisma.UserCreateInput): Promise<User>
    changeProfilePicture(linkPhoto: string, userId: string): Promise<void>
    changeName(nome: string, userId: string): Promise<void>
    findById(userId: string): Promise<User | null>
}