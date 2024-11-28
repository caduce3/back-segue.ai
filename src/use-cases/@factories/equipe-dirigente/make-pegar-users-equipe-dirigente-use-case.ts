import { PegarUsersEquipeDirigenteUseCase } from "@/use-cases/equipe-dirigente/pegar-users-equipe-dirigente";
import { PrismaIgrejaRepository } from "@/repositories/prisma/prisma-igreja-repository";
import { PrismaEquipeDirigenteRepository } from "@/repositories/prisma/prisma-equipe-dirigente-repository";

export function makePegarUsersEquipeDirigenteUseCase() {
  const igrejaRepository = new PrismaIgrejaRepository();
  const equipeDirigenteRepository = new PrismaEquipeDirigenteRepository();
  const pegarUsersEquipeDirigenteUseCase = new PegarUsersEquipeDirigenteUseCase(
    igrejaRepository,
    equipeDirigenteRepository
  );

  return pegarUsersEquipeDirigenteUseCase;
}
