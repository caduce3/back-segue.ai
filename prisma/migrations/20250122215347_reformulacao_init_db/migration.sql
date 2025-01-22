-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ATIVO', 'INATIVO');

-- CreateEnum
CREATE TYPE "TipoPasta" AS ENUM ('PAROQUIA', 'PADRE', 'FINANCAS', 'MONTAGEM', 'POS', 'PALESTRA', 'FICHAS');

-- CreateEnum
CREATE TYPE "TipoTransacao" AS ENUM ('DEPOSITO', 'DESPESA', 'INVESTIMENTO');

-- CreateEnum
CREATE TYPE "CategoriaTransacao" AS ENUM ('COMIDA', 'TRANSPORTE', 'PATROCINIO', 'DOACAO', 'BINGO', 'OUTRO');

-- CreateEnum
CREATE TYPE "MetodoPagamentoTransacao" AS ENUM ('DINHEIRO', 'CARTAO_CREDITO', 'CARTAO_DEBITO', 'PIX', 'TRANSFERENCIA_BANCARIA', 'BOLETO_BANCARIO', 'OUTRO');

-- CreateEnum
CREATE TYPE "Escolaridade" AS ENUM ('ENSINO_FUNDAMENTAL', 'ENSINO_FUNDAMENTAL_INCOMPLETO', 'ENSINO_MEDIO', 'ENSINO_MEDIO_INCOMPLETO', 'ENSINO_SUPERIOR_INCOMPLETO', 'ENSINO_SUPERIOR_COMPLETO', 'POS_GRADUACAO', 'MESTRADO', 'DOUTORADO', 'POS_DOUTORADO');

-- CreateEnum
CREATE TYPE "Sacramentos" AS ENUM ('BATISMO', 'CRISMA', 'EUCARISTIA', 'NENHUM');

-- CreateEnum
CREATE TYPE "Pastoral" AS ENUM ('CATEQUESE', 'LITURGIA', 'MUSICA', 'JOVENS', 'FAMILIA', 'SAUDE', 'COMUNICACAO', 'CARIDADE', 'POVO_DA_RUA', 'OUTRO');

-- CreateEnum
CREATE TYPE "Equipes" AS ENUM ('ANIMACAO', 'VIGILIA_PAROQUIAL', 'LITURGIA', 'CANTO', 'ESTACIONAMENTO', 'VISITACAO', 'LANCHE', 'COZINHA', 'SALA', 'FAXINA', 'ED_PALESTRA', 'ED_POS', 'ED_MONTAGEM', 'ED_FINANCAS', 'ED_FICHAS', 'CIRCULO', 'GRAFICA', 'MINI_MERCADO', 'CARAVANA', 'NENHUMA', 'CG', 'ESPIRITUALIZADORA', 'PROVER');

-- CreateEnum
CREATE TYPE "TipoEcontro" AS ENUM ('PRIMEIRA_ETAPA', 'SEGUNDA_ETAPA', 'CARAVANA');

-- CreateEnum
CREATE TYPE "FuncaoEquipe" AS ENUM ('COORDENADOR', 'EQUIPISTA', 'ED', 'APOIO');

-- CreateEnum
CREATE TYPE "AvaliacaoEquipe" AS ENUM ('NEGATIVA', 'POSITIVA', 'NEUTRA');

-- CreateEnum
CREATE TYPE "CoresCirculos" AS ENUM ('VERDE', 'AMARELO', 'VERMELHO', 'AZUL', 'ROSA', 'LARANJA');

-- CreateEnum
CREATE TYPE "TipoFicha" AS ENUM ('JOVEM', 'CASAL');

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "tipo" "TipoTransacao" NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "categoria" "CategoriaTransacao" NOT NULL,
    "descricao" TEXT,
    "metodoPagamento" "MetodoPagamentoTransacao" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "igrejaId" TEXT NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ficha" (
    "id" TEXT NOT NULL,
    "nomePastaFichas" TEXT NOT NULL,
    "dataRecebimento" TIMESTAMP(3) NOT NULL,
    "endereco" TEXT NOT NULL,
    "igrejaFrequenta" TEXT,
    "pastoral" TEXT,
    "observacoes" TEXT,
    "anoEncontro" TEXT NOT NULL,
    "corCirculoOrigem" "CoresCirculos" NOT NULL,
    "nomePrincipal" TEXT NOT NULL,
    "emailPrincipal" TEXT NOT NULL,
    "telefonePrincipal" TEXT NOT NULL,
    "dataNascimentoPrincipal" TIMESTAMP(3) NOT NULL,
    "naturalidadePrincipal" TEXT NOT NULL,
    "apelidoPrincipal" TEXT,
    "filiacaoPai" TEXT,
    "filiacaoMae" TEXT,
    "escolaridade" "Escolaridade",
    "sacramentos" "Sacramentos",
    "nomeSecundario" TEXT,
    "emailSecundario" TEXT,
    "telefoneSecundario" TEXT,
    "dataNascimentoSecundario" TIMESTAMP(3),
    "naturalidadeSecundario" TEXT,
    "apelidoSecundario" TEXT,
    "status" "Status" NOT NULL DEFAULT 'ATIVO',
    "equipeAtual" "Equipes" NOT NULL DEFAULT 'NENHUMA',
    "funcaoEquipeAtual" "FuncaoEquipe" NOT NULL DEFAULT 'EQUIPISTA',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "igrejaId" TEXT NOT NULL,
    "tipoFicha" "TipoFicha" NOT NULL,

    CONSTRAINT "Ficha_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FichaEquipe" (
    "id" TEXT NOT NULL,
    "equipe" "Equipes" NOT NULL,
    "ano" TEXT NOT NULL,
    "funcao" "FuncaoEquipe" NOT NULL,
    "avaliacao" "AvaliacaoEquipe" NOT NULL,
    "tipoEncontro" "TipoEcontro" NOT NULL DEFAULT 'PRIMEIRA_ETAPA',
    "observacoes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "fichaId" TEXT NOT NULL,

    CONSTRAINT "FichaEquipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Igreja" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'ATIVO',
    "pasta" "TipoPasta" NOT NULL DEFAULT 'PAROQUIA',

    CONSTRAINT "Igreja_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EquipeDirigente" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "ano" TEXT NOT NULL,
    "igrejaId" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'INATIVO',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "pasta" "TipoPasta" NOT NULL,

    CONSTRAINT "EquipeDirigente_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Ficha_emailPrincipal_key" ON "Ficha"("emailPrincipal");

-- CreateIndex
CREATE UNIQUE INDEX "Ficha_emailSecundario_key" ON "Ficha"("emailSecundario");

-- CreateIndex
CREATE UNIQUE INDEX "Igreja_cnpj_key" ON "Igreja"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "Igreja_email_key" ON "Igreja"("email");

-- CreateIndex
CREATE UNIQUE INDEX "EquipeDirigente_email_key" ON "EquipeDirigente"("email");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_igrejaId_fkey" FOREIGN KEY ("igrejaId") REFERENCES "Igreja"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ficha" ADD CONSTRAINT "Ficha_igrejaId_fkey" FOREIGN KEY ("igrejaId") REFERENCES "Igreja"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FichaEquipe" ADD CONSTRAINT "FichaEquipe_fichaId_fkey" FOREIGN KEY ("fichaId") REFERENCES "Ficha"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquipeDirigente" ADD CONSTRAINT "EquipeDirigente_igrejaId_fkey" FOREIGN KEY ("igrejaId") REFERENCES "Igreja"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
