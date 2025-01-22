/*
  Warnings:

  - Added the required column `CorCirculoOrigem` to the `Ficha` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CoresCirculos" AS ENUM ('VERDE', 'AMARELO', 'VERMELHO', 'AZUL', 'ROSA', 'LARANJA');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Equipes" ADD VALUE 'CIRCULO';
ALTER TYPE "Equipes" ADD VALUE 'GRAFICA';
ALTER TYPE "Equipes" ADD VALUE 'MINI_MERCADO';

-- AlterTable
ALTER TABLE "Ficha" ADD COLUMN     "CorCirculoOrigem" "CoresCirculos" NOT NULL;
