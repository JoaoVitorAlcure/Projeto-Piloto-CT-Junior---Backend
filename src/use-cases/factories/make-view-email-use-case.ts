import { PrismaEmailsRepository } from "../../repositories/prisma/prisma-emails-repository";
import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository";
import { ViewEmailUseCase } from '../view-email'

export function makeViewEmailUseCase(){
    const emailsRepository = new PrismaEmailsRepository()
    const userRepository = new PrismaUsersRepository()
    const viewEmailUseCase = new ViewEmailUseCase(emailsRepository, userRepository)

    return viewEmailUseCase
}