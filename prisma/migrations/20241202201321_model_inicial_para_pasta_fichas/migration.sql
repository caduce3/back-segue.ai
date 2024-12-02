-- CreateEnum
CREATE TYPE "Escolaridade" AS ENUM ('ENSINO_FUNDAMENTAL', 'ENSINO_FUNDAMENTAL_INCOMPLETO', 'ENSINO_MEDIO', 'ENSINO_MEDIO_INCOMPLETO', 'ENSINO_SUPERIOR_INCOMPLETO', 'ENSINO_SUPERIOR_COMPLETO', 'POS_GRADUACAO', 'MESTRADO', 'DOUTORADO', 'POS_DOUTORADO');

-- CreateEnum
CREATE TYPE "Sacramentos" AS ENUM ('BATISMO', 'CRISMA', 'EUCARISTIA', 'NENHUM');

-- CreateEnum
CREATE TYPE "Pastoral" AS ENUM ('CATEQUESE', 'LITURGIA', 'MUSICA', 'JOVENS', 'FAMILIA', 'SAUDE', 'COMUNICACAO', 'CARIDADE', 'POVO_DA_RUA', 'OUTRO');

-- CreateTable
CREATE TABLE "Fichas" (
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
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "igrejaId" TEXT NOT NULL,

    CONSTRAINT "Fichas_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Fichas" ADD CONSTRAINT "Fichas_igrejaId_fkey" FOREIGN KEY ("igrejaId") REFERENCES "Igreja"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
