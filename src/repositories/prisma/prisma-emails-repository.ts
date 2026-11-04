import type { Email, Prisma } from "@prisma/client";
import type { EmailRepository } from "../email-repository";
import { prisma } from "../../lib/prisma";

export class PrismaEmailsRepository implements EmailRepository{
    findById(emailId: string): Promise<Email | null> {
        throw new Error("Method not implemented.");
    }
    async fetchReceivedEmails(userId: string){
        const emails = await prisma.email.findMany({
            where: {
                idDeQuemEnviou: userId,
            }
        })

        emails.sort((a,b) => b.data.getTime() - a.data.getTime())

        return emails
    }
    create(data: Prisma.EmailCreateInput): Promise<Email> {
        throw new Error("Method not implemented.");
    }
}