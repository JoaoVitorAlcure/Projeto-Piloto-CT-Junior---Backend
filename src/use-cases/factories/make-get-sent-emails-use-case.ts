import { PrismaEmailsRepository } from "../../repositories/prisma/prisma-emails-repository";
import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository";
import { GetSentEmailsUseCase } from "../get-sent-emails";

export function makeGetSentEmailsUseCase(){
    const emailsRepository = new PrismaEmailsRepository()
    const userRepository = new PrismaUsersRepository()
    const getSentEmailsUseCase = new GetSentEmailsUseCase(emailsRepository, userRepository)

    return getSentEmailsUseCase
}