import type { Email, Prisma, User } from "@prisma/client";

export interface EmailRepository{
    fetchReceivedEmails(userId: string): Promise<Object[]>
    create(data: Prisma.EmailUncheckedCreateInput): Promise<Email>
    deleteEmail(emailId: string): Promise<void>
    findById(emailId: string): Promise<Email | null>
    fetchSendedEmails(userId: string): Promise<Object[]>
    viewEmail(email: Email, userId: string): Promise<Email | null>
}