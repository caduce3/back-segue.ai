import { PrismaTransactionRepository } from "@/repositories/prisma/prisma-transaction-repository";
import { CadastrarTransactionUseCase } from "@/use-cases/transaction/cadastrar-transaction";
import { PrismaIgrejaRepository } from "@/repositories/prisma/prisma-igreja-repository";
import { PrismaEquipeDirigenteRepository } from "@/repositories/prisma/prisma-equipe-dirigente-repository";

export function makeCadastrarTransactionUseCase() {
  const transactionRepository = new PrismaTransactionRepository();
  const igrejaRepository = new PrismaIgrejaRepository();
  const equipeDirigenteRepository = new PrismaEquipeDirigenteRepository();
  const cadastrarTransactionUseCase = new CadastrarTransactionUseCase(
    transactionRepository,
    igrejaRepository,
    equipeDirigenteRepository
  );

  return cadastrarTransactionUseCase;
}
