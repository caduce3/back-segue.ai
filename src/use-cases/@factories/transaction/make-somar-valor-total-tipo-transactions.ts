import { PrismaTransactionRepository } from "@/repositories/prisma/prisma-transaction-repository";
import { SomarTotalTipoTransactionUseCase } from "@/use-cases/transaction/somar-total-tipo-transaction";
import { PrismaIgrejaRepository } from "@/repositories/prisma/prisma-igreja-repository";
import { PrismaEquipeDirigenteRepository } from "@/repositories/prisma/prisma-equipe-dirigente-repository";

export function makeSomarTotalTipoTransactionUseCase() {
  const transactionRepository = new PrismaTransactionRepository();
  const igrejaRepository = new PrismaIgrejaRepository();
  const equipeDirigenteRepository = new PrismaEquipeDirigenteRepository();
  const somarTotalTipoTransactionUseCase = new SomarTotalTipoTransactionUseCase(
    transactionRepository,
    igrejaRepository,
    equipeDirigenteRepository
  );

  return somarTotalTipoTransactionUseCase;
}
