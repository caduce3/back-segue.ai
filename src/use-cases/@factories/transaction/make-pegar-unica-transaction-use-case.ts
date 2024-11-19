import { PrismaTransactionRepository } from "@/repositories/prisma/prisma-transaction-repository";
import { PegarUnicaTransactionUseCase } from "@/use-cases/transaction/pegar-unica-transaction";
import { PrismaIgrejaRepository } from "@/repositories/prisma/prisma-igreja-repository";
import { PrismaEquipeDirigenteRepository } from "@/repositories/prisma/prisma-equipe-dirigente-repository";

export function makePegarUnicaTransactionUseCase() {
  const transactionRepository = new PrismaTransactionRepository();
  const igrejaRepository = new PrismaIgrejaRepository();
  const equipeDirigenteRepository = new PrismaEquipeDirigenteRepository();
  const pegarUnicaTransactionUseCase = new PegarUnicaTransactionUseCase(
    transactionRepository,
    igrejaRepository,
    equipeDirigenteRepository
  );

  return pegarUnicaTransactionUseCase;
}
