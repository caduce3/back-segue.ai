/*
  Warnings:

  - Added the required column `pasta` to the `Igreja` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senha` to the `Igreja` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Igreja` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pasta` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TipoPasta" AS ENUM ('PAROQUIA', 'PADRE', 'FINANCAS', 'MONTAGEM', 'POS', 'PALESTRA', 'FICHAS');

-- AlterTable
ALTER TABLE "Igreja" ADD COLUMN     "pasta" "TipoPasta" NOT NULL,
ADD COLUMN     "senha" TEXT NOT NULL,
ADD COLUMN     "status" "Status" NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "pasta" "TipoPasta" NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'INATIVO';

-- DropEnum
DROP TYPE "TipoFicha";
