import { PrismaTransactionRepository } from "@/repositories/prisma/prisma-transaction-repository";
import { AtualizarTransactionUseCase } from "@/use-cases/transaction/atualizar-transaction";
import { PrismaIgrejaRepository } from "@/repositories/prisma/prisma-igreja-repository";
import { PrismaEquipeDirigenteRepository } from "@/repositories/prisma/prisma-equipe-dirigente-repository";

export function makeAtualizarTransactionUseCase() {
  const transactionRepository = new PrismaTransactionRepository();
  const igrejaRepository = new PrismaIgrejaRepository();
  const equipeDirigenteRepository = new PrismaEquipeDirigenteRepository();
  const atualizarTransactionUseCase = new AtualizarTransactionUseCase(
    transactionRepository,
    igrejaRepository,
    equipeDirigenteRepository
  );

  return atualizarTransactionUseCase;
}
