/*
  Warnings:

  - You are about to drop the column `AnoEncontro` on the `Ficha` table. All the data in the column will be lost.
  - You are about to drop the column `CorCirculoOrigem` on the `Ficha` table. All the data in the column will be lost.
  - You are about to drop the column `Endereco` on the `Ficha` table. All the data in the column will be lost.
  - You are about to drop the column `EnderecoConvidadoPor` on the `Ficha` table. All the data in the column will be lost.
  - You are about to drop the column `Escolaridade` on the `Ficha` table. All the data in the column will be lost.
  - You are about to drop the column `FiliacaoMae` on the `Ficha` table. All the data in the column will be lost.
  - You are about to drop the column `FiliacaoPai` on the `Ficha` table. All the data in the column will be lost.
  - You are about to drop the column `IgrejaFrequenta` on the `Ficha` table. All the data in the column will be lost.
  - You are about to drop the column `Naturalidade` on the `Ficha` table. All the data in the column will be lost.
  - You are about to drop the column `NomeConvidadoPor` on the `Ficha` table. All the data in the column will be lost.
  - You are about to drop the column `Observacoes` on the `Ficha` table. All the data in the column will be lost.
  - You are about to drop the column `Pastoral` on the `Ficha` table. All the data in the column will be lost.
  - You are about to drop the column `Religiao` on the `Ficha` table. All the data in the column will be lost.
  - You are about to drop the column `Sacramentos` on the `Ficha` table. All the data in the column will be lost.
  - You are about to drop the column `TelefoneConvidadoPor` on the `Ficha` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Ficha` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `anoEncontro` to the `Ficha` table without a default value. This is not possible if the table is not empty.
  - Added the required column `corCirculoOrigem` to the `Ficha` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Ficha` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endereco` to the `Ficha` table without a default value. This is not possible if the table is not empty.
  - Added the required column `escolaridade` to the `Ficha` table without a default value. This is not possible if the table is not empty.
  - Added the required column `filiacaoMae` to the `Ficha` table without a default value. This is not possible if the table is not empty.
  - Added the required column `filiacaoPai` to the `Ficha` table without a default value. This is not possible if the table is not empty.
  - Added the required column `naturalidade` to the `Ficha` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pastoral` to the `Ficha` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sacramentos` to the `Ficha` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ficha" DROP COLUMN "AnoEncontro",
DROP COLUMN "CorCirculoOrigem",
DROP COLUMN "Endereco",
DROP COLUMN "EnderecoConvidadoPor",
DROP COLUMN "Escolaridade",
DROP COLUMN "FiliacaoMae",
DROP COLUMN "FiliacaoPai",
DROP COLUMN "IgrejaFrequenta",
DROP COLUMN "Naturalidade",
DROP COLUMN "NomeConvidadoPor",
DROP COLUMN "Observacoes",
DROP COLUMN "Pastoral",
DROP COLUMN "Religiao",
DROP COLUMN "Sacramentos",
DROP COLUMN "TelefoneConvidadoPor",
ADD COLUMN     "anoEncontro" TEXT NOT NULL,
ADD COLUMN     "corCirculoOrigem" "CoresCirculos" NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "endereco" TEXT NOT NULL,
ADD COLUMN     "enderecoConvidadoPor" TEXT,
ADD COLUMN     "escolaridade" "Escolaridade" NOT NULL,
ADD COLUMN     "filiacaoMae" TEXT NOT NULL,
ADD COLUMN     "filiacaoPai" TEXT NOT NULL,
ADD COLUMN     "igrejaFrequenta" TEXT,
ADD COLUMN     "naturalidade" TEXT NOT NULL,
ADD COLUMN     "nomeConvidadoPor" TEXT,
ADD COLUMN     "observacoes" TEXT,
ADD COLUMN     "pastoral" "Pastoral" NOT NULL,
ADD COLUMN     "religiao" TEXT,
ADD COLUMN     "sacramentos" "Sacramentos" NOT NULL,
ADD COLUMN     "telefoneConvidadoPor" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Ficha_email_key" ON "Ficha"("email");
