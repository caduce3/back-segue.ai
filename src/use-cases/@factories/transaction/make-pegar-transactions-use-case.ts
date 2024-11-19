import { PrismaTransactionRepository } from "@/repositories/prisma/prisma-transaction-repository";
import { PegarTransactionsUseCase } from "@/use-cases/transaction/pegar-transactions";
import { PrismaIgrejaRepository } from "@/repositories/prisma/prisma-igreja-repository";

export function makePegarTransactionsUseCase() {
  const transactionRepository = new PrismaTransactionRepository();
  const igrejaRepository = new PrismaIgrejaRepository();
  const pegarTransactionsUseCase = new PegarTransactionsUseCase(
    transactionRepository,
    igrejaRepository
  );

  return pegarTransactionsUseCase;
}
