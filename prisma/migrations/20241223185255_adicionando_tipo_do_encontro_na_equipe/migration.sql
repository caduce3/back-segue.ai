/*
  Warnings:

  - Added the required column `tipoEncontro` to the `FichaEquipe` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TipoEcontro" AS ENUM ('PRIMEIRA_ETAPA', 'SEGUNDA_ETAPA', 'CARAVANA');

-- AlterEnum
ALTER TYPE "Equipes" ADD VALUE 'CARAVANA';

-- AlterTable
ALTER TABLE "FichaEquipe" ADD COLUMN     "tipoEncontro" "TipoEcontro" NOT NULL;
