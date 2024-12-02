import { PegarUnicoUserEquipeDirigenteUseCase } from "@/use-cases/equipe-dirigente/pegar-unico-user-equipe-dirigente";
import { PrismaIgrejaRepository } from "@/repositories/prisma/prisma-igreja-repository";
import { PrismaEquipeDirigenteRepository } from "@/repositories/prisma/prisma-equipe-dirigente-repository";

export function makePegarUnicoUserEquipeDirigenteUseCase() {
  const igrejaRepository = new PrismaIgrejaRepository();
  const equipeDirigenteRepository = new PrismaEquipeDirigenteRepository();
  const pegarUnicoUserEquipeDirigenteUseCase =
    new PegarUnicoUserEquipeDirigenteUseCase(
      igrejaRepository,
      equipeDirigenteRepository
    );

  return pegarUnicoUserEquipeDirigenteUseCase;
}
