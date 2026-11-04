import { PrismaEmailsRepository } from "../../repositories/prisma/prisma-emails-repository";
import { GetReceivedEmailsUseCase } from "../get-received-emails";

export function makeGetReceivedEmailsUseCase(){
    const emailsRepository = new PrismaEmailsRepository()
    const getReceivedEmailsUseCase = new GetReceivedEmailsUseCase(emailsRepository)

    return getReceivedEmailsUseCase
}