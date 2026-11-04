import { PrismaEmailsRepository } from "../../repositories/prisma/prisma-emails-repository";
import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository";
import { SendEmailUseCase } from "../send-email";

export function makeDeleteEmailUseCase(){
    const userRepository = new PrismaUsersRepository()
    const emailRepository = new PrismaEmailsRepository()
    const sendEmailUseCase = new SendEmailUseCase(emailRepository, userRepository)

    return sendEmailUseCase
}