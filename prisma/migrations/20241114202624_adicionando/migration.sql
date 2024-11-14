/*
  Warnings:

  - You are about to drop the column `status` on the `Igreja` table. All the data in the column will be lost.
  - You are about to drop the column `pasta` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "TipoFicha" AS ENUM ('PADRE', 'FINANCAS', 'MONTAGEM', 'POS', 'PALESTRA', 'FICHAS');

-- AlterTable
ALTER TABLE "Igreja" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "pasta";

-- DropEnum
DROP TYPE "TipoPasta";
