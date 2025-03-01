import { PrismaPalestraRepository } from "@/repositories/prisma/prisma-palestra-repository";
import { PrismaIgrejaRepository } from "@/repositories/prisma/prisma-igreja-repository";
import { PrismaEquipeDirigenteRepository } from "@/repositories/prisma/prisma-equipe-dirigente-repository";
import { AtualizarPalestraUseCase } from "@/use-cases/palestra/atualizar-palestra";

export function makeAtualizarPalestraUseCase() {
  const palestraRepository = new PrismaPalestraRepository();
  const igrejaRepository = new PrismaIgrejaRepository();
  const equipeDirigenteRepository = new PrismaEquipeDirigenteRepository();
  const atualizarPalestraUseCase = new AtualizarPalestraUseCase(
    palestraRepository,
    igrejaRepository,
    equipeDirigenteRepository
  );

  return atualizarPalestraUseCase;
}
