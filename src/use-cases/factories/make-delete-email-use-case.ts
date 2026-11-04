import { PrismaEmailsRepository } from "../../repositories/prisma/prisma-emails-repository";
import { DeleteEmailUseCase } from "../delete-email";

export function makeDeleteEmailUseCase(){
    const emailRepository = new PrismaEmailsRepository()
    const deleteEmailUseCase = new DeleteEmailUseCase(emailRepository)

    return deleteEmailUseCase
}