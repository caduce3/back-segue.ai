import { PrismaPalestraRepository } from "@/repositories/prisma/prisma-palestra-repository";
import { PrismaEquipeDirigenteRepository } from "@/repositories/prisma/prisma-equipe-dirigente-repository";
import { DeletarPalestraUseCase } from "@/use-cases/palestra/deletar-palestra";

export function makeDeletarPalestraUseCase() {
  const palestraRepository = new PrismaPalestraRepository();
  const equipeDirigenteRepository = new PrismaEquipeDirigenteRepository();
  const deletarPalestraUseCase = new DeletarPalestraUseCase(
    palestraRepository,
    equipeDirigenteRepository
  );

  return deletarPalestraUseCase;
}
