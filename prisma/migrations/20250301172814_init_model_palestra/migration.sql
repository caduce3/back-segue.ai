-- CreateTable
CREATE TABLE "Palestra" (
    "id" TEXT NOT NULL,
    "nomePalestrante" TEXT NOT NULL,
    "temaPalestra" TEXT NOT NULL,
    "descricaoPalestra" TEXT NOT NULL,
    "duracaoPalestra" INTEGER NOT NULL,
    "dataPalestra" TIMESTAMP(3) NOT NULL,
    "notaPalestra" INTEGER NOT NULL DEFAULT 0,
    "observacoes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userIdCreatedAt" TEXT NOT NULL,
    "userIdUpdatedAt" TEXT NOT NULL,
    "igrejaId" TEXT NOT NULL,

    CONSTRAINT "Palestra_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Palestra" ADD CONSTRAINT "Palestra_igrejaId_fkey" FOREIGN KEY ("igrejaId") REFERENCES "Igreja"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
