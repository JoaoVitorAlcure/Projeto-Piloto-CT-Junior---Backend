import type { Email, Prisma } from "@prisma/client";

export interface EmailRepository{
    fetchReceivedEmails(userId: string): Promise<Email[]>
    create(data: Prisma.EmailUncheckedCreateInput): Promise<Email>
    deleteEmail(emailId: string): Promise<void>
    findById(emailId: string): Promise<Email | null>
    fetchSendedEmails(userId: string): Promise<Email[]>
    viewEmail(email: Email, userId: string): Promise<Email | null>
}