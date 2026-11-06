import { PrismaEmailsRepository } from "../../repositories/prisma/prisma-emails-repository";
import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository";
import { GetReceivedEmailsUseCase } from "../get-received-emails";

export function makeGetReceivedEmailsUseCase(){
    const emailsRepository = new PrismaEmailsRepository()
    const userRepository = new PrismaUsersRepository()
    const getReceivedEmailsUseCase = new GetReceivedEmailsUseCase(emailsRepository, userRepository)

    return getReceivedEmailsUseCase
}