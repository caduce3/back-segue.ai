/*
  Warnings:

  - The `pastoral` column on the `Ficha` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Ficha" ADD COLUMN     "apelidoPrincipal" TEXT,
ADD COLUMN     "apelidoSecundario" TEXT,
ADD COLUMN     "escolaridade" "Escolaridade",
ADD COLUMN     "filiacaoMae" TEXT,
ADD COLUMN     "filiacaoPai" TEXT,
ADD COLUMN     "sacramentos" "Sacramentos",
DROP COLUMN "pastoral",
ADD COLUMN     "pastoral" TEXT;
