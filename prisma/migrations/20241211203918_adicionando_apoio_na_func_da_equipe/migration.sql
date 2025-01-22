/*
  Warnings:

  - The values [NEGATIVO,NORMAL,POSITIVO] on the enum `AvaliacaoEquipe` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AvaliacaoEquipe_new" AS ENUM ('NEGATIVA', 'POSITIVA', 'NEUTRA');
ALTER TABLE "FichaEquipe" ALTER COLUMN "avaliacao" TYPE "AvaliacaoEquipe_new" USING ("avaliacao"::text::"AvaliacaoEquipe_new");
ALTER TYPE "AvaliacaoEquipe" RENAME TO "AvaliacaoEquipe_old";
ALTER TYPE "AvaliacaoEquipe_new" RENAME TO "AvaliacaoEquipe";
DROP TYPE "AvaliacaoEquipe_old";
COMMIT;

-- AlterEnum
ALTER TYPE "FuncaoEquipe" ADD VALUE 'APOIO';
