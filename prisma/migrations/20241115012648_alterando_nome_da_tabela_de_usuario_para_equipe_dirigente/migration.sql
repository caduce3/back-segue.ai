/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_igrejaId_fkey";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "EquipeDirigente" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "igrejaId" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'INATIVO',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "pasta" "TipoPasta" NOT NULL,

    CONSTRAINT "EquipeDirigente_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EquipeDirigente_email_key" ON "EquipeDirigente"("email");

-- AddForeignKey
ALTER TABLE "EquipeDirigente" ADD CONSTRAINT "EquipeDirigente_igrejaId_fkey" FOREIGN KEY ("igrejaId") REFERENCES "Igreja"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
