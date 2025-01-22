/*
  Warnings:

  - You are about to drop the `Fichas` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FichaEquipe" DROP CONSTRAINT "FichaEquipe_fichaId_fkey";

-- DropForeignKey
ALTER TABLE "Fichas" DROP CONSTRAINT "Fichas_igrejaId_fkey";

-- DropTable
DROP TABLE "Fichas";

-- CreateTable
CREATE TABLE "Ficha" (
    "id" TEXT NOT NULL,
    "nomePastaFichas" TEXT NOT NULL,
    "dataRecebimento" TIMESTAMP(3) NOT NULL,
    "nomeJovem" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "Endereco" TEXT NOT NULL,
    "dataNascimento" TIMESTAMP(3) NOT NULL,
    "Naturalidade" TEXT NOT NULL,
    "FiliacaoPai" TEXT NOT NULL,
    "FiliacaoMae" TEXT NOT NULL,
    "Escolaridade" "Escolaridade" NOT NULL,
    "Religiao" TEXT,
    "IgrejaFrequenta" TEXT,
    "Sacramentos" "Sacramentos" NOT NULL,
    "Pastoral" "Pastoral" NOT NULL,
    "NomeConvidadoPor" TEXT,
    "TelefoneConvidadoPor" TEXT,
    "EnderecoConvidadoPor" TEXT,
    "Observacoes" TEXT,
    "AnoEncontro" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "igrejaId" TEXT NOT NULL,

    CONSTRAINT "Ficha_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Ficha" ADD CONSTRAINT "Ficha_igrejaId_fkey" FOREIGN KEY ("igrejaId") REFERENCES "Igreja"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FichaEquipe" ADD CONSTRAINT "FichaEquipe_fichaId_fkey" FOREIGN KEY ("fichaId") REFERENCES "Ficha"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
