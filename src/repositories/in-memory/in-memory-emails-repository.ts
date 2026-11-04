import type { User, Email, Prisma } from "@prisma/client";
import type { EmailRepository } from "../email-repository";

export class InMemoryEmailsRepository implements EmailRepository{
    
    public items: Email[] = []
    async fetchReceivedEmails(userId: string){
        const emails = this.items.filter((item) => item.idDeQuemRecebeu == userId)

        emails.sort((a,b) => b.data.getTime() - a.data.getTime())
        
        return emails
    }
    create(data: Prisma.EmailCreateInput): Promise<Email> {
        throw new Error("Method not implemented.");
    }
    async findById(emailId: string){
        
        const email = this.items.find((item) => item.id === emailId)

        if (!email){
            return null
        }

        return email
    }
}