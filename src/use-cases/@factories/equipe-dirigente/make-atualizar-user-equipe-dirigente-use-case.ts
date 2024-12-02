import { AtualizarUserEquipeDirigenteUseCase } from "@/use-cases/equipe-dirigente/atualizar-user-equipe-dirigente";
import { PrismaIgrejaRepository } from "@/repositories/prisma/prisma-igreja-repository";
import { PrismaEquipeDirigenteRepository } from "@/repositories/prisma/prisma-equipe-dirigente-repository";

export function makeAtualizarUserEquipeDirigenteUseCase() {
  const igrejaRepository = new PrismaIgrejaRepository();
  const equipeDirigenteRepository = new PrismaEquipeDirigenteRepository();
  const atualizarUserEquipeDirigenteUseCase =
    new AtualizarUserEquipeDirigenteUseCase(
      igrejaRepository,
      equipeDirigenteRepository
    );

  return atualizarUserEquipeDirigenteUseCase;
}
