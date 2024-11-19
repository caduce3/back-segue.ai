import { PrismaTransactionRepository } from "@/repositories/prisma/prisma-transaction-repository";
import { DeletarTransactionUseCase } from "@/use-cases/transaction/deletar-transaction";
import { PrismaEquipeDirigenteRepository } from "@/repositories/prisma/prisma-equipe-dirigente-repository";

export function makeDeletarTransactionUseCase() {
  const transactionRepository = new PrismaTransactionRepository();
  const equipeDirigenteRepository = new PrismaEquipeDirigenteRepository();
  const deletarTransactionUseCase = new DeletarTransactionUseCase(
    transactionRepository,
    equipeDirigenteRepository
  );

  return deletarTransactionUseCase;
}
