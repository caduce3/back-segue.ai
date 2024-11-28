import { PrismaEquipeDirigenteRepository } from "@/repositories/prisma/prisma-equipe-dirigente-repository";
import { PrismaIgrejaRepository } from "@/repositories/prisma/prisma-igreja-repository";
import { DeletarUserEquipeDirigenteUseCase } from "@/use-cases/equipe-dirigente/deletar-user-equipe-dirigente";

export function makeDeletarUserEquipeDirigenteUseCase() {
  const equipeDirigenteRepository = new PrismaEquipeDirigenteRepository();
  const igrejaRepository = new PrismaIgrejaRepository();
  const deletarUserEquipeDirigenteUseCase =
    new DeletarUserEquipeDirigenteUseCase(
      equipeDirigenteRepository,
      igrejaRepository
    );

  return deletarUserEquipeDirigenteUseCase;
}
