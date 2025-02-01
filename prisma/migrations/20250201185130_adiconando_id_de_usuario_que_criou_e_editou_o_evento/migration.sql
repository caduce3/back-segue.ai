/*
  Warnings:

  - You are about to drop the column `dataFim` on the `Evento` table. All the data in the column will be lost.
  - You are about to drop the column `dataInicio` on the `Evento` table. All the data in the column will be lost.
  - Added the required column `data` to the `Evento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userIdCreatedAt` to the `Evento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userIdUpdatedAt` to the `Evento` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Evento" DROP COLUMN "dataFim",
DROP COLUMN "dataInicio",
ADD COLUMN     "data" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userIdCreatedAt" TEXT NOT NULL,
ADD COLUMN     "userIdUpdatedAt" TEXT NOT NULL;
