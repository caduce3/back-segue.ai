/*
  Warnings:

  - You are about to drop the column `horario` on the `Evento` table. All the data in the column will be lost.
  - Added the required column `horarioFim` to the `Evento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `horarioInicio` to the `Evento` table without a default value. This is not possible if the table is not empty.
  - Made the column `descricao` on table `Evento` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Evento" DROP COLUMN "horario",
ADD COLUMN     "avaliacao" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "horarioFim" INTEGER NOT NULL,
ADD COLUMN     "horarioInicio" INTEGER NOT NULL,
ALTER COLUMN "descricao" SET NOT NULL;
