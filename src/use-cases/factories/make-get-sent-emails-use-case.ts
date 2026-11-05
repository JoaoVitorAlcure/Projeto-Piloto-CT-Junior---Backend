import { PrismaEmailsRepository } from "../../repositories/prisma/prisma-emails-repository";
import { GetSentEmailsUseCase } from "../get-sent-emails";

export function makeGetSentEmailsUseCase(){
    const emailsRepository = new PrismaEmailsRepository()
    const getSentEmailsUseCase = new GetSentEmailsUseCase(emailsRepository)

    return getSentEmailsUseCase
}