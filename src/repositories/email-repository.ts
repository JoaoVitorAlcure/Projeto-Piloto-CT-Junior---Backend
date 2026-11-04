import type { Email, Prisma, User } from "@prisma/client";

export interface EmailRepository{
    fetchReceivedEmails(userId: string): Promise<Email[]>
    create(data: Prisma.EmailCreateInput): Promise<Email>
    findById(emailId: string): Promise<Email | null>
}