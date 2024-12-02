/*
  Warnings:

  - Added the required column `AnoEncontro` to the `Fichas` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Equipes" AS ENUM ('ANIMACAO', 'VIGILIA_PAROQUIAL', 'LITURGIA', 'CANTO', 'ESTACIONAMENTO', 'TAXI', 'LANCHE', 'COZINHA', 'SALA', 'FAXINA', 'ED_PALESTRA', 'ED_POS', 'ED_MONTAGEM', 'ED_FINANCAS', 'ED_FICHAS');

-- CreateEnum
CREATE TYPE "FuncaoEquipe" AS ENUM ('COORDENADOR', 'EQUIPISTA', 'ED');

-- CreateEnum
CREATE TYPE "AvaliacaoEquipe" AS ENUM ('NEGATIVO', 'NORMAL', 'POSITIVO');

-- AlterTable
ALTER TABLE "Fichas" ADD COLUMN     "AnoEncontro" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "FichaEquipe" (
    "id" TEXT NOT NULL,
    "equipe" "Equipes" NOT NULL,
    "ano" TEXT NOT NULL,
    "funcao" "FuncaoEquipe" NOT NULL,
    "avaliacao" "AvaliacaoEquipe" NOT NULL,
    "observacoes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "fichaId" TEXT NOT NULL,

    CONSTRAINT "FichaEquipe_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FichaEquipe" ADD CONSTRAINT "FichaEquipe_fichaId_fkey" FOREIGN KEY ("fichaId") REFERENCES "Fichas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
