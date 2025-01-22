/*
  Warnings:

  - The values [TAXI] on the enum `Equipes` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Equipes_new" AS ENUM ('ANIMACAO', 'VIGILIA_PAROQUIAL', 'LITURGIA', 'CANTO', 'ESTACIONAMENTO', 'VISITACAO', 'LANCHE', 'COZINHA', 'SALA', 'FAXINA', 'ED_PALESTRA', 'ED_POS', 'ED_MONTAGEM', 'ED_FINANCAS', 'ED_FICHAS', 'CIRCULO', 'GRAFICA', 'MINI_MERCADO', 'CARAVANA', 'NENHUMA', 'CG', 'ESPIRITUALIZADORA', 'PROVER');
ALTER TABLE "Ficha" ALTER COLUMN "equipeAtual" DROP DEFAULT;
ALTER TABLE "Ficha" ALTER COLUMN "equipeAtual" TYPE "Equipes_new" USING ("equipeAtual"::text::"Equipes_new");
ALTER TABLE "FichaEquipe" ALTER COLUMN "equipe" TYPE "Equipes_new" USING ("equipe"::text::"Equipes_new");
ALTER TYPE "Equipes" RENAME TO "Equipes_old";
ALTER TYPE "Equipes_new" RENAME TO "Equipes";
DROP TYPE "Equipes_old";
ALTER TABLE "Ficha" ALTER COLUMN "equipeAtual" SET DEFAULT 'NENHUMA';
COMMIT;
