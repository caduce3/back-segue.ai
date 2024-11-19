import { PrismaTransactionRepository } from "@/repositories/prisma/prisma-transaction-repository";
import { PegarTransactionsUseCase } from "@/use-cases/transaction/pegar-transactions";
import { PrismaIgrejaRepository } from "@/repositories/prisma/prisma-igreja-repository";
import { PrismaEquipeDirigenteRepository } from "@/repositories/prisma/prisma-equipe-dirigente-repository";

export function makePegarTransactionsUseCase() {
  const transactionRepository = new PrismaTransactionRepository();
  const igrejaRepository = new PrismaIgrejaRepository();
  const equipeDirigenteRepository = new PrismaEquipeDirigenteRepository();
  const pegarTransactionsUseCase = new PegarTransactionsUseCase(
    transactionRepository,
    igrejaRepository,
    equipeDirigenteRepository
  );

  return pegarTransactionsUseCase;
}
