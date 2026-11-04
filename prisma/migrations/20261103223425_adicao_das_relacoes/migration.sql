-- AddForeignKey
ALTER TABLE "emails" ADD CONSTRAINT "emails_idDeQuemEnviou_fkey" FOREIGN KEY ("idDeQuemEnviou") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "emails" ADD CONSTRAINT "emails_idDeQuemRecebeu_fkey" FOREIGN KEY ("idDeQuemRecebeu") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
