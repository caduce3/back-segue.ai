import { PrismaTransactionRepository } from "@/repositories/prisma/prisma-transaction-repository";
import { GastosPorCategoriaTransactionUseCase } from "@/use-cases/transaction/gastos-por-categoria-transaction";
import { PrismaIgrejaRepository } from "@/repositories/prisma/prisma-igreja-repository";
import { PrismaEquipeDirigenteRepository } from "@/repositories/prisma/prisma-equipe-dirigente-repository";

export function makeGastosPorCategoriaTransactionUseCase() {
  const transactionRepository = new PrismaTransactionRepository();
  const igrejaRepository = new PrismaIgrejaRepository();
  const equipeDirigenteRepository = new PrismaEquipeDirigenteRepository();
  const gastosPorCategoriaTransactionUseCase =
    new GastosPorCategoriaTransactionUseCase(
      transactionRepository,
      igrejaRepository,
      equipeDirigenteRepository
    );

  return gastosPorCategoriaTransactionUseCase;
}
