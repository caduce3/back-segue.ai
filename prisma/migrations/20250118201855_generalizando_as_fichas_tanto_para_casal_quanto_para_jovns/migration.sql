/*
  Warnings:

  - You are about to drop the column `dataNascimento` on the `Ficha` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Ficha` table. All the data in the column will be lost.
  - You are about to drop the column `enderecoConvidadoPor` on the `Ficha` table. All the data in the column will be lost.
  - You are about to drop the column `escolaridade` on the `Ficha` table. All the data in the column will be lost.
  - You are about to drop the column `filiacaoMae` on the `Ficha` table. All the data in the column will be lost.
  - You are about to drop the column `filiacaoPai` on the `Ficha` table. All the data in the column will be lost.
  - You are about to drop the column `naturalidade` on the `Ficha` table. All the data in the column will be lost.
  - You are about to drop the column `nomeConvidadoPor` on the `Ficha` table. All the data in the column will be lost.
  - You are about to drop the column `nomeJovem` on the `Ficha` table. All the data in the column will be lost.
  - You are about to drop the column `religiao` on the `Ficha` table. All the data in the column will be lost.
  - You are about to drop the column `sacramentos` on the `Ficha` table. All the data in the column will be lost.
  - You are about to drop the column `telefone` on the `Ficha` table. All the data in the column will be lost.
  - You are about to drop the column `telefoneConvidadoPor` on the `Ficha` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[emailPrincipal]` on the table `Ficha` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[emailSecundario]` on the table `Ficha` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `dataNascimentoPrincipal` to the `Ficha` table without a default value. This is not possible if the table is not empty.
  - Added the required column `naturalidadePrincipal` to the `Ficha` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nomePrincipal` to the `Ficha` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telefonePrincipal` to the `Ficha` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TipoFicha" AS ENUM ('JOVEM', 'CASAL');

-- DropIndex
DROP INDEX "Ficha_email_key";

-- AlterTable
ALTER TABLE "Ficha" DROP COLUMN "dataNascimento",
DROP COLUMN "email",
DROP COLUMN "enderecoConvidadoPor",
DROP COLUMN "escolaridade",
DROP COLUMN "filiacaoMae",
DROP COLUMN "filiacaoPai",
DROP COLUMN "naturalidade",
DROP COLUMN "nomeConvidadoPor",
DROP COLUMN "nomeJovem",
DROP COLUMN "religiao",
DROP COLUMN "sacramentos",
DROP COLUMN "telefone",
DROP COLUMN "telefoneConvidadoPor",
ADD COLUMN     "dataNascimentoPrincipal" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "dataNascimentoSecundario" TIMESTAMP(3),
ADD COLUMN     "emailPrincipal" TEXT,
ADD COLUMN     "emailSecundario" TEXT,
ADD COLUMN     "naturalidadePrincipal" TEXT NOT NULL,
ADD COLUMN     "naturalidadeSecundario" TEXT,
ADD COLUMN     "nomePrincipal" TEXT NOT NULL,
ADD COLUMN     "nomeSecundario" TEXT,
ADD COLUMN     "telefonePrincipal" TEXT NOT NULL,
ADD COLUMN     "telefoneSecundario" TEXT,
ADD COLUMN     "tipoFicha" "TipoFicha" NOT NULL DEFAULT 'JOVEM';

-- CreateIndex
CREATE UNIQUE INDEX "Ficha_emailPrincipal_key" ON "Ficha"("emailPrincipal");

-- CreateIndex
CREATE UNIQUE INDEX "Ficha_emailSecundario_key" ON "Ficha"("emailSecundario");
