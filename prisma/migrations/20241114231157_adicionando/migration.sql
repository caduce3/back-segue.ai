/*
  Warnings:

  - A unique constraint covering the columns `[cnpj]` on the table `Igreja` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Igreja` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Igreja" ALTER COLUMN "status" SET DEFAULT 'ATIVO';

-- CreateIndex
CREATE UNIQUE INDEX "Igreja_cnpj_key" ON "Igreja"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "Igreja_email_key" ON "Igreja"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
